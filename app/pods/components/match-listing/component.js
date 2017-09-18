import Ember from 'ember';

const {
  inject: { service },
  run,
  set,
  RSVP
} = Ember;

export default Ember.Component.extend({
  session: service(),
  store: service(),

  matches: Ember.A([]),

  willInsertElement() {
    run.scheduleOnce('render', this, this.fetchMatches);
  },

  fetchMatches() {
    const store = this.get('store');

    store.findAll('match').then(matches => {
      this.get('matches').pushObjects( matches.toArray() );
    }).catch(() => {
      alert('Failed getting matches! (check console)');
    });
  },

  actions: {

    deleteMatch( match ) {
      this.get('matches').removeObject( match );

      // delete all players first
      const promises = match.get('players').map(player => player.destroyRecord());

      RSVP.all(promises).then(() => {
        // after players are done, delete the match
        match.destroyRecord();
      });
    },

    joinMatch( match ) {
      const session = this.get('session');
      const store = this.get('store');
      const displayName = session.get('currentUser.displayName');
      const players = match.get('players');

      if ( players.mapBy('userDisplayName').includes(displayName) ) {
        // user already in match
        alert("Don't fuck with me. You're already in this match.");
        return;
      }

      const player = store.createRecord('player', {
        userDisplayName: session.get('currentUser.displayName')
      });

      player.save().then((newPlayer) => {
        match.get('players').pushObject( newPlayer );
        match.save();
      });
    },

    viewDetails( match ) {
      set(match, 'details', true);
    },

    hideDetails( match ) {
      set(match, 'details', false);
    }

  }

});
