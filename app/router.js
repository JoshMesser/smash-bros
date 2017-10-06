import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('leaderboard');

  this.route('match', {
    path: 'match/:match_id'
  });
});

export default Router;
