import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Component.extend({
  tagName: 'table',
  classNames: ['player-table'],
  session: service(),
});
