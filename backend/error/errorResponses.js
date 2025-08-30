export const serverError = (res, error) => {
  console.error("Server Error:", error);
  return res.status(500).json({
    success: false,
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
  });
};

export const errorResponse = (res, status, msg, data = null) => {
  return res.status(status).json({
    success: false,
    error: msg,
    data,
  });
};

export const successResponse = (res, status, msg, data = null) => {
  return res.status(status).json({
    success: true,
    message: msg,
    data,
  });
};
