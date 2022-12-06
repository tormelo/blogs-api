const errorMap = {
  INVALID_FIELD: 400,
  REQUIRED_FIELD: 400,
  ALREADY_IN_DB: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};
