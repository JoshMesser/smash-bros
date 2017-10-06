import Ember from 'ember';

export default Ember.Service.extend({
  characters: [
    {
      name: 'Mario',
      image: 'https://www.ssbwiki.com/images/b/b3/Mario_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/a/aa/MarioHeadSSB.png',
      sound: 'sounds/Announcer - Mario.wav'
    },
    {
      name: 'Donkey Kong',
      image: 'https://www.ssbwiki.com/images/3/3d/Donkey_Kong_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/a/af/DonkeyKongHeadSSB.png',
      sound: 'sounds/Announcer - Donkey Kong.wav'
    },
    {
      name: 'Link',
      image: 'https://www.ssbwiki.com/images/6/6e/Link_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/3/3b/LinkHeadSSB.png',
      sound: 'sounds/Announcer - Link.wav'
    },
    {
      name: 'Samus Aran',
      image: 'https://www.ssbwiki.com/images/1/18/Samus_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/1/14/SamusHeadSSB.png',
      sound: 'sounds/Announcer - Samus.wav'
    },
    {
      name: 'Yoshi',
      image: 'https://www.ssbwiki.com/images/6/64/Yoshi_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/4/44/YoshiHeadSSB.png',
      sound: 'sounds/Announcer - Yoshi.wav'
    },
    {
      name: 'Kirby',
      image: 'https://www.ssbwiki.com/images/f/f2/Kirby_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/e/e0/KirbyHeadSSB.png',
      sound: 'sounds/Announcer - Kirby.wav'
    },
    {
      name: 'Fox McCloud',
      image: 'https://www.ssbwiki.com/images/6/61/Fox_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/8/80/FoxHeadSSB.png',
      sound: 'sounds/Announcer - Fox.wav'
    },
    {
      name: 'Pikachu',
      image: 'https://www.ssbwiki.com/images/9/92/Pikachu_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/8/80/PikachuHeadSSB.png',
      sound: 'sounds/Announcer - Pikachu.wav'
    },
    {
      name: 'Luigi',
      image: 'https://www.ssbwiki.com/images/5/52/Luigi_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/6/69/LuigiHeadSSB.png',
      sound: 'sounds/Announcer - Luigi.wav'
    },
    {
      name: 'Captain Falcon',
      image: 'https://www.ssbwiki.com/images/0/04/Captain_Falcon_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/7/75/CaptainFalconHeadSSB.png',
      sound: 'sounds/Announcer - C Falcon.wav'
    },
    {
      name: 'Ness',
      image: 'https://www.ssbwiki.com/images/1/16/Ness_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/c/cd/NessHeadSSB.png',
      sound: 'sounds/Announcer - Ness.wav'
    },
    {
      name: 'Jigglypuff',
      image: 'https://www.ssbwiki.com/images/d/de/Jigglypuff_SSB.png',
      imageSm: 'https://www.ssbwiki.com/images/8/84/JigglypuffHeadSSB.png',
      sound: 'sounds/Announcer - Jigglypuff.wav'
    },
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
  ]
});
