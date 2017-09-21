import Ember from 'ember';

const {
  inject: { service },
  computed,
  get,
  set
} = Ember;

export default Ember.Component.extend({
  tagName: 'tr',
  constants: service(),
  characters: computed.alias('constants.characters'),

  teamColors: ['None', 'Red', 'Blue', 'Green'],

  actions: {
    toggleSelectCharacter( player ) {
      const cv = get(player, 'selectCharacter');
      if( cv ) {
        set(player, 'selectCharacter', false);
      } else {
        set(player, 'selectCharacter', true);
      }
    },

    save() {
      this.get('player').save();
      return;
    },

    leaveMatch( player, match ) {
      match.get('players').removeObject( player );
      player.destroyRecord();
    }
  }
});
