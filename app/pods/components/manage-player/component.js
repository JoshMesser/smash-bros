import Ember from 'ember';

const {
  inject: { service },
  computed,
  observer,
  on
} = Ember;

export default Ember.Component.extend({
  smash: service(),
  audio: service(),

  classNames: ['manage-player'],

  characters: computed.alias('smash.characters'),

  teamColors: ['None', 'Red', 'Blue', 'Green'],

  initSounds: on('init', function() {
    const audio = this.get('audio');
    const characters = this.get('characters');
    const colors = this.get('teamColors');

    colors.forEach(color => {
      if ( color !== 'None' ) {
        audio.load(`/sounds/Announcer - ${color} Team.wav`).asSound( color );
      }
    });

    characters.forEach(char => {
      audio.load( char.sound ).asSound( char.name );
    });
  }),

  teamColorObserver: observer('player.team', function() {
    const audio = this.get('audio');
    const team = this.get('player.team');

    if ( team !== 'None' ) {
      const found = audio.getSound( team );
      if( found ) {
        found.play();
      }
    }
  }),

  playerObserver: observer('player.character', function() {
    const audio = this.get('audio');
    const charName = this.get('player.character');
    const found = audio.getSound( charName )
    if ( found ) {
      found.play();
    }
  }),

  actions: {
    rollback( player ) {
      player.rollbackAttributes();
      return;
    },

    save() {
      this.get('player').save();
      return;
    },

    leaveMatch( player, match ) {
      match.get('players').removeObject( player );
      player.destroyRecord().then(() => match.save() );
    }
  }
});
