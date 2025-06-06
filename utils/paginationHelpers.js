

const paginationHelpers = (req) => {
  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  return { skip, limit, page };
};

module.exports = paginationHelpers;
