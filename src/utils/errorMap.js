const errorMap = {
  INVALID_FIELD: 400,
  REQUIRED_FIELD: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};
