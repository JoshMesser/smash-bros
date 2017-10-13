import Ember from 'ember';

const {
  inject: { service },
  RSVP,
  isEmpty
} = Ember;

export default Ember.Component.extend({
  session: service(),
	store: service(),

	details: true,
  playerList: true,
  
	actions: {

    setMatchWinner(match, player) {
      if ( match.get('tied') && isEmpty(match.get('winner.content')) ) {
        const cont = confirm(`Are you sure you want to make ${player.get('userDisplayName')} the winner?`);

        if ( cont ) {
          match.set('winner', player);
          match.save().then(() => {
            alert(`${player.get('userDisplayName')} has been made the winner!`);
          });
        }
      }
    },

    deleteMatch( key, match ) {
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

      player.save().then(newPlayer => {
        match.get('players').pushObject( newPlayer );
        match.save();
        this.send('transition', 'match', match.id);
      });
    },

    transition() {
      this.sendAction('transition', ...arguments);
		}

	}
});
