import Ember from 'ember';
import DS from 'ember-data';

const {
  computed
} = Ember;

const characters = [
  {
    name: 'Mario',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/6/62/Mario_SSB.gif/revision/latest?cb=20071003034704&path-prefix=en'
  },
  {
    name: 'Donkey Kong',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/a/a2/DK_SSB.PNG/revision/latest?cb=20090113211606&path-prefix=en'
  },
  {
    name: 'Link',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/d/d8/Link_SSB.gif/revision/latest?cb=20071003040250&path-prefix=en'
  },
  {
    name: 'Samus Aran',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/3/30/Samus_SSB.PNG/revision/latest?cb=20120527181837&path-prefix=en'
  },
  {
    name: 'Yoshi',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/f/f2/Yoshi_SSB.gif/revision/latest?cb=20071003045456&path-prefix=en'
  },
  {
    name: 'Kirby',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/b/b2/Kirby_SSB.gif/revision/latest?cb=20071003043702&path-prefix=en'
  },
  {
    name: 'Fox McCloud',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/c/ce/Fox_SSB.gif/revision/latest?cb=20070916042608&path-prefix=en'
  },
  {
    name: 'Pikachu',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/c/cf/Pikachu_SSB.gif/revision/latest?cb=20071003035841&path-prefix=en'
  },
  {
    name: 'Luigi',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/4/44/Luigi_SSB.gif/revision/latest?cb=20090113225102&path-prefix=en'
  },
  {
    name: 'Captain Falcon',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/0/04/CaptainfalconSSB.png/revision/latest?cb=20160215194058&path-prefix=en'
  },
  {
    name: 'Ness',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/3/30/Ness_SSB.gif/revision/latest?cb=20070915074503&path-prefix=en'
  },
  {
    name: 'Jigglypuff',
    image: 'https://vignette.wikia.nocookie.net/nintendo/images/3/39/Jigglypuff_SSB.gif/revision/latest?cb=20090113231659&path-prefix=en'
  },
];

export default DS.Model.extend({
  userDisplayName: DS.attr('string'),
  character: DS.attr('string'),
  team: DS.attr('string', { defaultValue: 'None' }), // team color, or none
  kills: DS.attr('number'),
  deaths: DS.attr('number'),

  characterImage: computed('character', {
    get() {
      const character = this.get('character');
      if ( character ) {
        return Ember.A(characters).findBy('name', character).image;
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

      return deaths <= 0 ? kills : kills/deaths;
    }
  })
});
