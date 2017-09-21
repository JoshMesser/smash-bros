import Ember from 'ember';

const {
  inject: { service },
  run,
  set,
  get,
  RSVP
} = Ember;

function outputDate( date ) {
  const d = new Date(date);
  const m = d.getMonth();
  const day = d.getDate();
  const y = d.getFullYear();

  return `${m}-${day}-${y}`;
}

export default Ember.Component.extend({
  session: service(),
  store: service(),

  matches: {},

  willInsertElement() {
    run.scheduleOnce('render', this, this.fetchMatches);
  },

  fetchMatches() {
    const store = this.get('store');

    store.query('match', { orderBy: 'created', limitToLast: 25 })
    // reverse the order of this array
    .then(matches => matches.toArray().reverse())
    .then(matchesArray => {
      const matchesObj = get(this, 'matches');
      let isFirst = true;

      matchesArray.forEach(match => {
        const created = outputDate(get(match, 'created'));

        if ( matchesObj[created] ) {
          get(matchesObj, `${created}.matches`).pushObject( match );
        } else {
          set(matchesObj, created, {
            state: { hidden: isFirst ? false : true },
            matches: Ember.A([ match ])
          });
          isFirst = false;
        }
      });

      set(this, 'matches', matchesObj);

    }).catch(() => {
      alert('Failed getting matches! (check console)');
    });
  },

  actions: {

    onCreate( newMatch ) {
      const matches = get(this, 'matches');
      const created = outputDate( get(newMatch, 'created') );

      if ( get(matches, created) ) {
        get(matches, `${created}.matches`).pushObject( newMatch );
      } else {
        set(matches, created, {
          state: { hidden: false },
          matches: Ember.A([ newMatch ])
        });
      }
    },

    deleteMatch( key, match ) {
      this.get(`matches.${key}.matches`).removeObject( match );

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
        this.send('viewDetails', match);
      });
    },

    viewDetails( match ) {
      set(match, 'details', true);
    },

    hideDetails( match ) {
      set(match, 'details', false);
    },

    toggleMatchVisibility( matchState ) {
      set(matchState, 'hidden', 
        !get(matchState, 'hidden')
      );
    },

  }

});
