import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  session: service(),

  beforeModel() {
    return this.get('session').fetch().catch(() => {});
  },

  actions: {

    signIn( provider ) {
      this.get('session').open('firebase', { provider }).then(data => {
        console.log(data.currentUser);
      }).catch(() => {
        alert('Failed to create a new session.');
      });
    },

    signOut() {
      this.get('session').close();
    }

  }
});
