import Ember from 'ember';

const {
  inject: { service },
  set
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
    {label: 'Congo Jungle'},
    {label: 'Dream Land'},
    {label: 'Hyrule Castle'},
    {label: 'Mushroom Kingdom'},
    {label: "Peach's Castle"},
    {label: 'Planet Zebes'},
    {label: 'Salfron City'},
    {label: 'Sector Z'},
    {label: "Yoshi's Island"}
  ],

  actions: {
    toggleCreate() {
      this.toggleProperty('create');
    },

    createMatch() {
      const store = this.get('store');
      const match = this.get('match');

      set(match, 'created', new Date().getTime());

      store.createRecord('match', match).save()
      .then((match) => {
        this.set('create', false);
        this.get('matches').pushObject( match );
      })
      .catch(() => {
        alert('Failed to create the match!');
      });
    }
  }
  
});
