import Ember from 'ember';

const {
  inject: { service },
  computed
} = Ember;

export default Ember.Component.extend({
  classNames: Ember.String.w("layout-column layout-gt-sm-row"),
  session: service(),
  sessionPlayer: computed('match.players.isFulfilled', 'match.players.[]', 'session.currentUser.displayName', {
    get() {
      const players = this.get('match.players');
      const displayName = this.get('session.currentUser.displayName');

      if ( this.get('match.players.isFulfilled') ) {
        return players.findBy('userDisplayName', displayName);
      }

      return;
    }
  })
});
