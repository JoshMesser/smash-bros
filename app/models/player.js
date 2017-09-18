import Ember from 'ember';
import DS from 'ember-data';

const {
  computed
} = Ember;

export default DS.Model.extend({
  userDisplayName: DS.attr('string'),
  character: DS.attr('string'),
  team: DS.attr('string', { defaultValue: 'None' }), // team color, or none
  kills: DS.attr('number'),
  deaths: DS.attr('number'),

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

      return deaths <= 0 ? kills : kills/deaths;
    }
  })
});
