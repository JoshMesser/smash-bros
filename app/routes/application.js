import Ember from 'ember';

const {
  inject: { service },
  on
} = Ember;

export default Ember.Route.extend({
  session: service(),
  audio: service(),

  initAudioFile: on('init', function() {
    const audio = this.get('audio');

    audio.load('sounds/Announcer - Title (USA).wav').asSound('startup-music');
  }),

  beforeModel() {
    return this.get('session').fetch().catch(() => {});
  },

  afterModel() {
    const audio = this.get('audio');

    audio.getSound('startup-music').play();
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
