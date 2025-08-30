import { deleteImage, uploadImage } from '../config/cloudinary.js';
import { serverError, errorResponse, successResponse } from '../error/errorResponses.js';
import User from '../models/usersModel.js';


export const submitData = async (req, res) => {
  let uploadResult;

  try {
    const { email, amount, wallet_address } = req.body;
    // Get screenshot from FormData
    const screenshot = req.files?.screenshot;

    if (!email || !amount || !wallet_address || !screenshot) {
      return errorResponse(
        res,
        400,
        "Missing required fields: email, amount, wallet_address, screenshot"
      );
    }
    const cleanedAmount = amount.toString().replace(/[,\s]/g, '');
    const parsedAmount = parseFloat(cleanedAmount);
    // Convert buffer to base64 string for Cloudinary
    const base64Image = `data:${screenshot.mimetype};base64,${screenshot.data.toString('base64')}`;

    // Upload image first
    uploadResult = await uploadImage(base64Image);

    if (!uploadResult.success) {
      return errorResponse(res, 500, "Failed to upload screenshot", uploadResult.error);
    }


    // Create DB record
    const user = await User.create({
      email: email.toLowerCase().trim(),
      amount: parsedAmount,
      wallet_address: wallet_address.trim(),
      image: uploadResult.url,
    });

    const userData = {
      id: user.id,
      email: user.email,
      amount: user.amount,
      image: user.image,
      wallet_address: user.wallet_address,
      status: user.status,
      created_at: user.createdAt,
    };

    return successResponse(res, 201, "Submission successful", userData);
  } catch (error) {
    console.error('Controller error:', error);

    // If image was uploaded but DB insert failed, delete it
    if (uploadResult?.public_id) {
      await deleteImage(uploadResult.public_id);
    }

    if (error.name === "SequelizeValidationError") {
      return errorResponse(
        res,
        400,
        "Validation error",
        error.errors.map((e) => e.message)
      );
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return errorResponse(res, 400, "Email already exists");
    }

    return serverError(res, error);
  }
};

// ... rest of your controllers remain the same



// Get all users/submissions
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status;

    const whereCondition = {};
    if (status) {
      whereCondition.status = status;
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });

    const responseData = {
      users: rows,
      pagination: {
        total: count,
        page,
        pages: Math.ceil(count / limit),
        limit
      }
    };

    return successResponse(res, 200, 'Users retrieved successfully', responseData);

  } catch (error) {
    return serverError(res, error);
  }
};
