import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
  this.route('register');
  this.route('login');
  this.route('notebooks', function() {
      this.route('view', { path: '/:notebook_id' }, function() {
          this.route('notes', { path: '/notes/:note_id' });
      });
  });
  this.route('employeetypes', function() {
    this.route('view',{ path: '/:employeetype_id' });
  });
  this.route('employees');
});

export default Router;
