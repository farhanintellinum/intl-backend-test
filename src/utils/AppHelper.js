class AppHelper {
  static resSuccess = (res, status, data) => {
    return res.status(status).json({ ...data, success: true });
  };

  static resError = (res, status, message) => {
    return res.status(status).json({ message, success: false });
  };
}

export default AppHelper;
