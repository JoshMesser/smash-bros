import Ember from 'ember';
import DS from 'ember-data';

const {
  inject: { service },
  computed
} = Ember;

export default DS.Model.extend({
  session: service(),

  created: DS.attr(),
  type: DS.attr('string'), // stock , timed
  coop: DS.attr('string'), // coop or ffa
  limit: DS.attr('number', { defaultValue: 5 }),
  stage: DS.attr('string'),
  players: DS.hasMany('player')
});
