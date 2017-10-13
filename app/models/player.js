import Ember from 'ember';
import DS from 'ember-data';
import utilities from 'smash-bros/utilities';

const {
  round
} = utilities;

const {
  inject: { service },
  computed
} = Ember;

export default DS.Model.extend({
  smash: service(),
  characters: computed.alias('smash.characters'),

  userDisplayName: DS.attr('string'),
  character: DS.attr('string'),
  team: DS.attr('string', { defaultValue: 'None' }), // team color, or none
  kills: DS.attr('number'),
  deaths: DS.attr('number'),

  characterImage: computed('character', {
    get() {
      const characters = this.get('characters');
      const character = this.get('character');
      if ( character ) {
        return Ember.A(characters).findBy('name', character).image;
      }
      return;
    }
  }),

  smallCharacterImage: computed('character', {
    get() {
      const characters = this.get('characters');
      const character = this.get('character');

      if ( character ) {
        return Ember.A(characters).findBy('name', character).imageSm;
      }
      return;
    }
  }),

  score: computed('kills', 'deaths', {
    get() {
      const {
        kills,
        deaths
      } = this.getProperties('kills', 'deaths');

      return parseInt(kills) - parseInt(deaths);
    }
  }),

  ratio: computed('kills', 'deaths', {
    get() {
      const {
        kills,
        deaths
      } = this.getProperties('kills', 'deaths');

      return round( (deaths <= 0 ? kills : kills/deaths) , 2);
    }
  })
});
