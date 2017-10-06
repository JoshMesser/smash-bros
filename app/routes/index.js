import Ember from 'ember';

const {
	inject: { service }
} = Ember;

export default Ember.Route.extend({
	session: service(),

  model() {
		const session = this.get('session');
		if ( session.get('isAuthenticated') ) {
			return this.get('store').findAll('match');
		}
		return undefined;
	},
	
	actions: {
    transition(route, id) {
			if ( typeof id === 'number' || typeof id === 'string' ) {
				this.transitionTo(route, id);
			} else {
				this.transitionTo(route);
			}
    }
	}
});
