import Ember from 'ember';
import utilities from 'smash-bros/utilities';

const {
  outputDate
} = utilities;

const {
  inject: { service },
  set,
  get,
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
            origCreated: get(match, 'created'),
            created,
            state: { hidden: true },
            matches: Ember.A([ match ])
          });
        }
      });

      const returnVal = matchesAr.sortBy('origCreated').reverse();
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

    toggleMatchVisibility( matchState ) {
      set(matchState, 'hidden', 
        !get(matchState, 'hidden')
      );
    },

    transition() {
      this.sendAction('transition', ...arguments);
    }

  }

});
