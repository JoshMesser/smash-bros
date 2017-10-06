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
});
