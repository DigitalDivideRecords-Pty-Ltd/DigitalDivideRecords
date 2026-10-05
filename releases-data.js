/**
 * Digital Divide Records - Release Data
 * 
 * This file contains all release information in a structured, maintainable format.
 * To add/update releases, simply edit this array. The app will automatically render them.
 * 
 * Structure:
 * - id: unique identifier
 * - title: track title
 * - artist: artist name
 * - image: path to cover art
 * - releaseDate: date in DD/MM/YYYY format
 * - description: short description
 * - genre: genre keyword (used for filtering)
 * - buyUrl: link to purchase/listen
 */

const RELEASES = [
  {
    id: 1,
    title: 'In The Rhythm Of Love',
    artist: 'DJ Jonnas',
    image: 'IMG_20250924_212610_(3000_x_3000_pixel).jpg',
    releaseDate: '24/10/2025',
    description: 'A Distinct Groove, Laced With Sexy Vocals, Designed To Get You Into The Rhythm Of Love.',
    genre: 'tech',
    buyUrl: 'https://www.beatport.com/release/in-the-rhythm-of-love/5446415'
  },
  {
    id: 2,
    title: 'Next Level',
    artist: 'DJ Jonnas',
    image: 'nextlevel.jpg',
    releaseDate: '15/03/2025',
    description: 'Groovy Tech House with sci-fi psychotic rhythms.',
    genre: 'tech',
    buyUrl: 'https://www.beatport.com/release/next-level/4828459'
  },
  {
    id: 3,
    title: 'Growth',
    artist: 'DJ Jonnas',
    image: 'growth.jpg',
    releaseDate: '23/12/2024',
    description: 'Groovy Techno & Tech House tune with a funky filled bassline.',
    genre: 'techno',
    buyUrl: 'https://www.beatport.com/release/growth/4834024'
  },
  {
    id: 4,
    title: 'Heart Giver',
    artist: 'Kru Side',
    image: 'heartgiver.jpg',
    releaseDate: '22/11/2024',
    description: 'Chilled House with hints of Soulful vocals.',
    genre: 'soulful',
    buyUrl: 'https://www.beatport.com/release/heart-giver/4798154'
  },
  {
    id: 5,
    title: 'Afro Dream',
    artist: 'Aquarius',
    image: 'afrodream.jpg',
    releaseDate: '16/12/2022',
    description: 'Deep & Melodic House with hints of Afro House & Electronica.',
    genre: 'afro',
    buyUrl: 'https://www.beatport.com/release/afro-dream/479778'
  },
  {
    id: 6,
    title: 'Laidback',
    artist: 'Kru Side',
    image: 'laidback.jpg',
    releaseDate: '06/05/2022',
    description: 'Chilled Soulful house with a groovy bassline.',
    genre: 'soulful',
    buyUrl: 'https://www.beatport.com/release/laidback/4798170'
  },
  {
    id: 7,
    title: 'Flexxin',
    artist: 'Adam Jesse',
    image: 'flexxin.jpg',
    releaseDate: '13/02/2023',
    description: 'Electrifying Funky Electro House Rhythm to get your body moving.',
    genre: 'electro',
    buyUrl: 'https://www.beatport.com/release/flexxin/4799080'
  },
  {
    id: 8,
    title: 'Bla Bla Bla',
    artist: 'Adam Jesse',
    image: 'blablabla.jpg',
    releaseDate: '20/03/2023',
    description: 'Electrifying Funky House & Electro House Rhythm to get your body moving.',
    genre: 'electro',
    buyUrl: 'https://www.beatport.com/release/bla-bla-bla/4798138'
  },
  {
    id: 9,
    title: 'Jungle',
    artist: 'Aquarius',
    image: 'jungle.jpg',
    releaseDate: '15/04/2023',
    description: 'Deep & Afro House Finely blended.',
    genre: 'afro',
    buyUrl: 'https://www.beatport.com/release/jungle/4798175'
  },
  {
    id: 10,
    title: 'Law Of House',
    artist: 'Adam Jesse',
    image: 'lawofhouse.jpg',
    releaseDate: '05/05/2023',
    description: 'Sensationally sizzling Electro House tune.',
    genre: 'electro',
    buyUrl: 'https://www.beatport.com/release/law-of-house/4799077'
  },
  {
    id: 11,
    title: 'Please Don\'t Go',
    artist: 'Adam Jesse',
    image: 'pleasedontgo.jpg',
    releaseDate: '08/06/2023',
    description: 'Funkdafied Electro Groove.',
    genre: 'electro',
    buyUrl: 'https://www.beatport.com/release/please-dont-go/4798208'
  },
  {
    id: 12,
    title: 'Give It To Me',
    artist: 'Adam Jesse',
    image: 'giveit2me.jpg',
    releaseDate: '16/06/2023',
    description: 'Sexy Female Vocals With A Groovy Electro Rhythm.',
    genre: 'electro',
    buyUrl: 'https://www.beatport.com/release/give-it-to-me/4799095'
  },
  {
    id: 13,
    title: '2 Shot Rule',
    artist: 'Adam Jesse',
    image: '2shotrule.jpg',
    releaseDate: '26/08/2023',
    description: 'Strong punchy & completely complextro (complex electro sounds).',
    genre: 'electro',
    buyUrl: 'https://www.beatport.com/release/2-shot-rule/4798176'
  },
  {
    id: 14,
    title: 'The Back Room',
    artist: 'Adam Jesse',
    image: 'thebackroom.jpg',
    releaseDate: '26/08/2023',
    description: 'Pumping up the pace with this solid groove.',
    genre: 'tech',
    buyUrl: 'https://www.beatport.com/release/the-back-room/4799083'
  },
  {
    id: 15,
    title: 'Headcase',
    artist: 'Adam Jesse',
    image: 'headcase.jpg',
    releaseDate: '08/12/2023',
    description: 'Aggressive synth patterns and one glitchy electro groove.',
    genre: 'electro',
    buyUrl: 'https://www.beatport.com/release/headcase/4799076'
  },
  {
    id: 16,
    title: 'Magic',
    artist: 'Kru Side',
    image: 'magic.jpg',
    releaseDate: '07/10/2022',
    description: 'Sophisticated Soulful House with heartwarming vocals.',
    genre: 'soulful',
    buyUrl: 'https://www.beatport.com/release/magic/4798148'
  },
  {
    id: 17,
    title: 'Got to Go',
    artist: 'Adam Jesse',
    image: 'got2go.jpg',
    releaseDate: '30/09/2022',
    description: 'Electro House with spacey synths and driving basslines for peak-time sets.',
    genre: 'electro',
    buyUrl: 'https://www.beatport.com/release/got-to-go/4798162'
  },
  {
    id: 18,
    title: 'Underwater',
    artist: 'Aquarius',
    image: 'underwater.jpg',
    releaseDate: '09/09/2022',
    description: 'Melodic Deep house featuring lush pads, and organic percussion elements.',
    genre: 'deep',
    buyUrl: 'https://www.beatport.com/release/underwater/4798135'
  },
  {
    id: 19,
    title: 'Distance',
    artist: 'DJ Jonnas',
    image: 'distance.jpg',
    releaseDate: '12/08/2022',
    description: 'Deep House with hypnotically mesmerizing melodies.',
    genre: 'deep',
    buyUrl: 'https://www.beatport.com/release/distance/4799090'
  },
  {
    id: 20,
    title: 'Logos',
    artist: 'K-Elements',
    image: 'logos.jpg',
    releaseDate: '01/08/2022',
    description: 'Melodic House sounds with glitchy textures and experimental sound design.',
    genre: 'deep',
    buyUrl: 'https://www.beatport.com/release/logos/4808386'
  },
  {
    id: 21,
    title: 'Jingle Queen',
    artist: 'Frank NoMore',
    image: 'jinglequeen.jpg',
    releaseDate: '31/05/2022',
    description: 'Disco & Nu-disco House groove with retro synths and funky basslines inspired by 80s aesthetics.',
    genre: 'disco',
    buyUrl: 'https://www.beatport.com/release/jingle-queen/4798137'
  },
  {
    id: 22,
    title: 'Nevermind',
    artist: 'SizBlack',
    image: 'nevermind.jpg',
    releaseDate: '20/05/2022',
    description: 'Chilled Deep House with hypnotic melodies.',
    genre: 'deep',
    buyUrl: 'https://www.beatport.com/release/nevermind/4797720'
  },
  {
    id: 23,
    title: 'First Love',
    artist: 'Kru Side',
    image: 'firstlove.jpg',
    releaseDate: '06/05/2022',
    description: 'Groovy Soulful House with Jazz sounds and meditative progressions.',
    genre: 'soulful',
    buyUrl: 'https://www.beatport.com/release/first-love/4808748'
  },
  {
    id: 24,
    title: 'YOU',
    artist: 'Endjour',
    image: 'you.jpg',
    releaseDate: '29/04/2022',
    description: 'Distinctively deep house rhythms with progressive structures.',
    genre: 'progressive',
    buyUrl: 'https://www.beatport.com/release/you/4808387'
  },
  {
    id: 25,
    title: 'New Balance',
    artist: 'K-Elements',
    image: 'newbalance.jpg',
    releaseDate: '22/04/2022',
    description: 'Chilled & melodic house tunes with ambient samples & groovy basslines.',
    genre: 'deep',
    buyUrl: 'https://www.beatport.com/release/new-balance/4808649'
  },
  {
    id: 26,
    title: 'The Odyssey',
    artist: 'DJ Jonnas',
    image: 'odyssey.jpg',
    releaseDate: '14/04/2022',
    description: 'Forward-thinking deep & tech house with futuristic sound design and dystopian atmospheres.',
    genre: 'tech',
    buyUrl: 'https://www.junodownload.com/products/dj-jonnas-the-odyssey/6845284-02/'
  }
];

/**
 * Export for use in other files
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RELEASES;
}
