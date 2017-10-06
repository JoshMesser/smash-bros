import Ember from 'ember';

const {
  inject: { service },
  computed
} = Ember;

export default Ember.Component.extend({
  tagName: 'table',
  classNames: ['player-table'],
  session: service(),
  sessionPlayer: computed('match.players.[]', 'session.currentUser.displayName', {
    get() {
      const players = this.get('match.players');
      const displayName = this.get('session.currentUser.displayName');

      return players.findBy('userDisplayName', displayName);
    }
  })
});
