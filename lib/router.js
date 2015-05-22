Router.route('/admin', function () {
  this.render('admin_view');
});
Router.route('/admin/questions', function () {
  this.render('questions_view');
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
Router.route('/game', function () {
  this.render('game');
});