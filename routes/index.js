// handle `GET` requests for the home page

module.exports = function (req, res) {
  res.render('index', { title: 'Rook Game' });
};