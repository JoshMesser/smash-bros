import Ember from 'ember';
import DS from 'ember-data';

const {
  inject: { service },
  computed
} = Ember;

export default DS.Model.extend({
  smash: service(),
  stages: computed.alias('smash.stages'),

  created: DS.attr(),
  type: DS.attr('string'), // stock , timed
  coop: DS.attr('string'), // coop or ffa
  limit: DS.attr('number', { defaultValue: 5 }),
  stage: DS.attr('string'),
  stageImage: computed('stage', {
    get() {
      const stage = this.get('stage');
      const stages = this.get('stages');

      if( stage ) {
        return Ember.A(stages).findBy('label', stage).image;
      }
      return;
    }
  }),
  players: DS.hasMany('player'),
  winner: DS.belongsTo('player'),
  tied: computed('players.isFulfilled', 'players.[]', {
    get() {
      const players = this.get('players');
      let tie = false;

      if ( players.get('isFulfilled') ) {
        const playerScores = players.sortBy('score').reverse();

        let prevPlayer;
        console.groupCollapsed(`${this.get('created')} ${this.get('stage')}`);
        playerScores.forEach(player => {
          if ( player && prevPlayer ) {

            console.log(prevPlayer.get('userDisplayName'), prevPlayer.get('score'));
            console.log(player.get('userDisplayName'), player.get('score'));

            if ( player.get('score') === prevPlayer.get('score') ) {
              // there is a tie
              tie = true;
              return true;
            }

          } else {
            prevPlayer = player;
          }
        });
        console.groupEnd(`${this.get('created')} ${this.get('stage')}`);
      }

      return tie;
    }
  })
});
