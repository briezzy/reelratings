module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    res.status(err.status || 500).json({
      error: err.message || 'An unexpected error occurred',
    });
  };
  