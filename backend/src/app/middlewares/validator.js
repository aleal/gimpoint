export default inputValidator => {
  return (req, res, next) => {
    if (inputValidator) {
      inputValidator()
        .validate(req.body)
        .then(() => {
          return next();
        })
        .catch(e => res.status(400).json({ error: e.message }));
    } else {
      next();
    }
  };
};
