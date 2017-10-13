import Ember from 'ember';
import utilities from 'smash-bros/utilities';

const { round } = utilities;

const {
	inject: { service },
	get,
	set
} = Ember;

export default Ember.Route.extend({
	store: service(),

	model() {
		const store = this.get('store');

		return store.findAll('player', { reload: true }).then(players => {
			const playerArray = players.toArray();
			const sortedPlayers = playerArray.sortBy('userDisplayName');
			const groupedPlayers = [];

			// Group players by name
			sortedPlayers.forEach( player => {
				const name = get(player, 'userDisplayName');
				const found = groupedPlayers.findBy('name', name);

				if ( found ) {
					get(found, 'history').pushObject( player );
					set(found, 'matches', get(found, 'matches') + 1);
				} else {
					groupedPlayers.pushObject({
						name,
						history: [ player ],
						matches: 1,
						kills: 0,
						deaths: 0,
						score: 0,
						ratio: 0
					})
				}
			});

			// Tally up total scores
			groupedPlayers.forEach(record => {
				get(record, 'history').forEach(h => {
					record.score += parseInt(get(h, 'score') || 0);
					record.kills += parseInt(get(h, 'kills') || 0);
					record.deaths += parseInt(get(h, 'deaths') || 0);
				});

				record.ratio = round( (record.deaths <= 0 ? record.kills : record.kills / record.deaths), 2);
			});

			return groupedPlayers.sortBy('total.score').reverse();
		});
	}
});
