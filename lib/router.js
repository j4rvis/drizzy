Router.route('/admin', function () {
  this.render('admin');
});
Router.route('/', function () {
  this.render('client_app');
});
Router.route('/client_wait', function () {
  this.render('client_wait');
});
Router.route('/server', function () {
  this.render('server_app');
});
