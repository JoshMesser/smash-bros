import Ember from 'ember';
import utilities from 'smash-bros/utilities';

const {
  outputDate
} = utilities;

const {
  inject: { service },
  set,
  get,
  RSVP,
  computed
} = Ember;

export default Ember.Component.extend({
  session: service(),
  store: service(),
  matches: Ember.A([]),

  formattedMatches: computed('matches.[]', {
    get() {
      const matchesArray = this.get('matches').toArray();
      const matchesAr = [];

      matchesArray.forEach(match => {
        const created = outputDate(get(match, 'created'));
        const record = matchesAr.findBy('created', created);

        if ( record )  {
          get(record, 'matches').pushObject( match );
        } else {
          matchesAr.pushObject({
            created,
            state: { hidden: true },
            matches: Ember.A([ match ])
          });
        }
      });

      const returnVal = matchesAr.sortBy('created').reverse();
      returnVal.set('firstObject.state.hidden', false);
      return returnVal;
    }
  }),

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
