import Ember from 'ember';
import utilities from 'smash-bros/utilities';

const {
  outputDate
} = utilities;

const {
  inject: { service },
  on,
  get,
  set
} = Ember;

export default Ember.Route.extend({
  session: service(),
  audio: service(),

  model() {
    const store = this.get('store');

    return store.query('match', { orderBy: 'created', limitToLast: 25 })
    // reverse the order of this array
    .then(matches => matches.toArray().reverse())
    .then(matchesArray => {
      const matchesObj = {};
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

      return matchesObj;
    }).catch(() => {
      alert('Failed getting matches! (check console)');
    });
  },

  initAudioFile: on('init', function() {
    const audio = this.get('audio');

    audio.load('sounds/19. Character Select.mp3').asSound('background-track');
    audio.load('sounds/Announcer - Title (USA).wav').asSound('startup-music');
  }),

  beforeModel() {
    return this.get('session').fetch().catch(() => {});
  },

  afterModel() {
    const audio = this.get('audio');
    const startup = audio.getSound('startup-music');
    const background = audio.getSound('background-track');

    if ( startup ) {
      startup.play();
    }

    Ember.run.later(() => {
      if ( background ) {
        background.play();
      }
    }, 5000);
  },

  actions: {

    signIn( provider ) {
      this.get('session').open('firebase', { provider }).then(() => {}).catch(() => {
        alert('Failed to create a new session.');
      });
    },

    signOut() {
      this.get('session').close();
    }

  }
});
