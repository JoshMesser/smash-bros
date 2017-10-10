import Ember from 'ember';

const {
	inject: { service }
} = Ember;

export default Ember.Route.extend({
	store: service(),

	model({ match_id }) {
		const store = this.get('store');
		return store.find('match', match_id);
	},

	actions: {
		transition( route ) {
			this.transitionTo( route );
		}
	}

});
