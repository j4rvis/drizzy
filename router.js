Router.route('/admin', function () {
  this.render('admin');
});
Router.route('/', function () {
  this.render('client');
});
Router.route('/answer', function () {
  this.render('answer');
});
