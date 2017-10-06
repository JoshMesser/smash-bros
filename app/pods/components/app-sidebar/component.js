import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		signOut() {
			this.sendAction('signOut');
		},

		transition() {
			this.sendAction('transition', ...arguments);
		}
	}
});
