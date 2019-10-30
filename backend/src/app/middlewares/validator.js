export default validator => {
  return (req, res, next) => {
    validator()
      .validate(req.body)
      .then(() => next())
      .catch(e => res.status(400).json(e));
  };
};
