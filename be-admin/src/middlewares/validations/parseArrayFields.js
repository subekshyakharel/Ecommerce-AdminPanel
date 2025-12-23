export const parseArrayFields = (req, res, next) => {
  try {
    if (req.body.size) {
      req.body.size = JSON.parse(req.body.size);
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid array format for size" });
  }
};
