import Ember from 'ember';
import DS from 'ember-data';

const {
  computed
} = Ember;

const characters = [
  {
    name: 'Mario',
    image: 'https://www.ssbwiki.com/images/b/b3/Mario_SSB.png'
  },
  {
    name: 'Donkey Kong',
    image: 'https://www.ssbwiki.com/images/3/3d/Donkey_Kong_SSB.png'
  },
  {
    name: 'Link',
    image: 'https://www.ssbwiki.com/images/6/6e/Link_SSB.png'
  },
  {
    name: 'Samus Aran',
    image: 'https://www.ssbwiki.com/images/1/18/Samus_SSB.png'
  },
  {
    name: 'Yoshi',
    image: 'https://www.ssbwiki.com/images/6/64/Yoshi_SSB.png'
  },
  {
    name: 'Kirby',
    image: 'https://www.ssbwiki.com/images/f/f2/Kirby_SSB.png'
  },
  {
    name: 'Fox McCloud',
    image: 'https://www.ssbwiki.com/images/6/61/Fox_SSB.png'
  },
  {
    name: 'Pikachu',
    image: 'https://www.ssbwiki.com/images/9/92/Pikachu_SSB.png'
  },
  {
    name: 'Luigi',
    image: 'https://www.ssbwiki.com/images/5/52/Luigi_SSB.png'
  },
  {
    name: 'Captain Falcon',
    image: 'https://www.ssbwiki.com/images/0/04/Captain_Falcon_SSB.png'
  },
  {
    name: 'Ness',
    image: 'https://www.ssbwiki.com/images/1/16/Ness_SSB.png'
  },
  {
    name: 'Jigglypuff',
    image: 'https://www.ssbwiki.com/images/d/de/Jigglypuff_SSB.png'
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
