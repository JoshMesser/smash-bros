import DS from 'ember-data';

export default DS.Model.extend({
  created: DS.attr(),
  type: DS.attr('string'), // stock , timed
  coop: DS.attr('string'), // coop or ffa
  limit: DS.attr('number', { defaultValue: 5 }),
  stage: DS.attr('string'),
  players: DS.hasMany('player')
});
