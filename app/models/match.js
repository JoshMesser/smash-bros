import Ember from 'ember';
import DS from 'ember-data';

const stages = [
  {label: 'Congo Jungle', image: 'https://www.ssbwiki.com/images/2/2f/SSB4UKongoJungle64.jpg'},
  {label: 'Dream Land', image: 'https://www.ssbwiki.com/images/2/25/SSB4UDreamLand64.png'},
  {label: 'Hyrule Castle', image: 'https://www.ssbwiki.com/images/f/f5/SSBUHyruleCastle64.PNG'},
  {label: 'Mushroom Kingdom', image: 'https://www.ssbwiki.com/images/0/0c/MushroomKingdom64.jpg'},
  {label: "Peach's Castle", image: 'https://www.ssbwiki.com/images/2/2e/SSBUPeach%27sCastle64.PNG'},
  {label: 'Planet Zebes', image: 'https://www.ssbwiki.com/images/4/42/PlanetZebesSSB.png'},
  {label: 'Salfron City', image: 'https://www.ssbwiki.com/images/0/05/SaffronCitySSB.png'},
  {label: 'Sector Z', image: 'https://www.ssbwiki.com/images/7/76/SectorZSSB.png'},
  {label: "Yoshi's Island", image: 'https://www.ssbwiki.com/images/e/e6/YoshisStorySSB.png'}
];

const {
  computed
} = Ember;

export default DS.Model.extend({
  created: DS.attr(),
  type: DS.attr('string'), // stock , timed
  coop: DS.attr('string'), // coop or ffa
  limit: DS.attr('number', { defaultValue: 5 }),
  stage: DS.attr('string'),
  stageImage: computed('stage', {
    get() {
      const stage = this.get('stage');
      if( stage ) {
        return Ember.A(stages).findBy('label', stage).image;
      }
      return;
    }
  }),
  players: DS.hasMany('player'),
});
