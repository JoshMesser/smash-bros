import Ember from 'ember';

const {
  inject: { service },
  set,
  get,
  computed
} = Ember;

export default Ember.Component.extend({
  store: service(),
  constants: service(),
  stages: computed.alias('constants.stages'),

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
