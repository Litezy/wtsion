import { serverError, errorResponse, successResponse } from '../error/errorResponses.js';
import Newsletter from '../models/newsletterModel.js';

// Subscribe to newsletter
export const subscribeToNews = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, 400, 'Email is required');
    }

    const existingSubscriber = await Newsletter.findOne({
      where: { email: email.toLowerCase().trim() }
    });

    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        await existingSubscriber.update({
          status: 'active',
          subscribed_at: new Date(),
          unsubscribed_at: null
        });

        return successResponse(res, 200, 'Welcome back! Your subscription has been reactivated.');
      } else {
        return errorResponse(res, 400, 'Email is already subscribed');
      }
    }

    const subscriber = await Newsletter.create({
      email: email.toLowerCase().trim()
    });

    const subscriberData = {
      id: subscriber.id,
      email: subscriber.email,
      subscribed_at: subscriber.subscribed_at
    };

    return successResponse(res, 201, 'Successfully subscribed to newsletter!', subscriberData);

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return errorResponse(res, 400, 'Invalid email format');
    }

    return serverError(res, error);
  }
};

// Get all subscribers (admin only)
export const getAllSubscribers = async (req, res) => {
  try {
    const { status = 'active' } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const whereCondition = status === 'all' ? {} : { status };

    const { count, rows } = await Newsletter.findAndCountAll({
      where: whereCondition,
      order: [['subscribed_at', 'DESC']],
      limit,
      offset
    });

    const responseData = {
      subscribers: rows,
      pagination: {
        total: count,
        page,
        pages: Math.ceil(count / limit),
        limit
      }
    };

    return successResponse(res, 200, 'Subscribers retrieved successfully', responseData);

  } catch (error) {
    return serverError(res, error);
  }
};

// Unsubscribe
export const unsubscribeFromNews = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, 400, 'Email is required');
    }

    const subscriber = await Newsletter.findOne({
      where: { 
        email: email.toLowerCase().trim(),
        status: 'active'
      }
    });

    if (!subscriber) {
      return errorResponse(res, 404, 'Email not found in our newsletter list');
    }

    await subscriber.update({
      status: 'unsubscribed',
      unsubscribed_at: new Date()
    });

    return successResponse(res, 200, 'Successfully unsubscribed from newsletter');

  } catch (error) {
    return serverError(res, error);
  }
};
