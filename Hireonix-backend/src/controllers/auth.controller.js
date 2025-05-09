const { authService } = require("../services");

exports.register = async (req, res, next) => {
  try {
    const data = await authService.registerUser(req.body    );
    res.status(201).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.loginUser(req.body);
    res.status(200).json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
};
