import Ember from 'ember';

const {
  inject: { service },
  set,
  get,
  computed
} = Ember;

export default Ember.Component.extend({
  store: service(),

  match: {
    type: '',
    coop: '',
    limit: 5,
    stage: ''
  },

  create: false,

  matchTypes: [
    {label: 'Standard'},
    {label: 'Timed'}
  ],

  ffas: [
    {label: 'FFA'},
    {label: 'Co-op'}
  ],

  stages: [
    {label: 'Congo Jungle', image: 'https://www.ssbwiki.com/images/2/2f/SSB4UKongoJungle64.jpg'},
    {label: 'Dream Land', image: 'https://www.ssbwiki.com/images/2/25/SSB4UDreamLand64.png'},
    {label: 'Hyrule Castle', image: 'https://www.ssbwiki.com/images/f/f5/SSBUHyruleCastle64.PNG'},
    {label: 'Mushroom Kingdom', image: 'https://www.ssbwiki.com/images/0/0c/MushroomKingdom64.jpg'},
    {label: "Peach's Castle", image: 'https://www.ssbwiki.com/images/2/2e/SSBUPeach%27sCastle64.PNG'},
    {label: 'Planet Zebes', image: 'https://www.ssbwiki.com/images/4/42/PlanetZebesSSB.png'},
    {label: 'Salfron City', image: 'https://www.ssbwiki.com/images/0/05/SaffronCitySSB.png'},
    {label: 'Sector Z', image: 'https://www.ssbwiki.com/images/7/76/SectorZSSB.png'},
    {label: "Yoshi's Island", image: 'https://www.ssbwiki.com/images/e/e6/YoshisStorySSB.png'}
  ],

  selectedStageImage: computed('match.stage', {
    get() {
      const stage = this.get('match.stage');
      const stageObj = this.get('stages').findBy('label', stage);

      return stageObj ? get(stageObj, 'image') : undefined;
    }
  }),

  actions: {
    toggleCreate() {
      this.toggleProperty('create');
    },

    createMatch() {
      const store = this.get('store');
      const match = this.get('match');

      set(match, 'created', new Date().getTime());

      store.createRecord('match', match).save()
      .then(match => {
        this.set('create', false);
        // this.get('matches').pushObject( match );
        this.sendAction('onCreate', match);
      })
      .catch(() => {
        alert('Failed to create the match!');
      });
    }
  }
  
});
