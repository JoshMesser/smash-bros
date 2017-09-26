import Ember from 'ember';

const {
	inject: { service },
	get,
	set
} = Ember;

export default Ember.Route.extend({
	store: service(),

	model() {
		const store = this.get('store');

		return store.findAll('player').then(players => {
			const playerArray = players.toArray();
			const sortedPlayers = playerArray.sortBy('userDisplayName');
			const groupedPlayers = [];

			// Group players by name
			sortedPlayers.forEach( player => {
				const name = get(player, 'userDisplayName');
				const found = groupedPlayers.findBy('name', name);

				if ( found ) {
					get(found, 'history').pushObject( player );
				} else {
					groupedPlayers.pushObject({
						name,
						history: [ player ],
						total: {
							kills: 0,
							deaths: 0,
							score: 0,
							ratio: 0
						}
					})
				}
			});

			// Tally up total scores
			groupedPlayers.forEach(record => {
				get(record, 'history').forEach(h => {
					record.total.score += parseInt(get(h, 'score') || 0);
					record.total.kills += parseInt(get(h, 'kills') || 0);
					record.total.deaths += parseInt(get(h, 'deaths') || 0);
				});

				record.total.ratio = record.total.deaths <= 0 ? record.total.kills : record.total.kills / record.total.deaths;
			});

			return groupedPlayers.sortBy('total.score').reverse();
		});
	}
});
