import Ember from 'ember';

const {
  inject: { service },
  on,
} = Ember;

export default Ember.Route.extend({
  session: service(),
  audio: service(),

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
