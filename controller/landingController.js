function getLandingPage(req, res, next) {
  res.render("index");
}

module.exports = {
  getLandingPage,
};
