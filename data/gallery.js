import hamachiCrudoImg from '../src/assets/images/dish_hamachi_crudo_1794762184629.jpg';
import wagyuTatakiImg from '../src/assets/images/dish_wagyu_tataki_1794762184776.jpg';
import blackCodImg from '../src/assets/images/dish_black_cod_1794762186365.jpg';
import matchaMilleImg from '../src/assets/images/dish_matcha_mille_1794762188248.jpg';
import yuzuElixirImg from '../src/assets/images/dish_yuzu_elixir_1794762186318.jpg';
import diningHallImg from '../src/assets/images/restaurant_dining_hall_1794764176486.jpg';
import omakaseCounterImg from '../src/assets/images/restaurant_omakase_counter_1794764174742.jpg';
import privateSalonImg from '../src/assets/images/restaurant_private_salon_1794764172405.jpg';
import waterfrontTerraceImg from '../src/assets/images/restaurant_waterfront_terrace_1794764177525.jpg';
import teaLoungeImg from '../src/assets/images/restaurant_tea_lounge_1794764173574.jpg';

/**
 * LUNO Qatar — Editable Gallery & Restaurant Space Archive
 * Uses generated demo photographs of LUNO Qatar's interiors, waterfront terrace,
 * omakase counter, and signature culinary creations.
 * Any category with zero items is automatically hidden from the filter bar.
 */

export const galleryData = {
  eyebrow: 'Visual Archive',
  title: 'Gallery',
  subtitle:
    'Studies of architectural shoji stillness, candlelit tables, and seasonal culinary craft at Porto Arabia, The Pearl, Qatar.',

  categories: [
    { id: 'all', label: 'All' },
    { id: 'interior', label: 'Interior' },
    { id: 'atmosphere', label: 'Atmosphere' },
    { id: 'food', label: 'Culinary' },
    { id: 'events', label: 'Events' },
  ],

  ambienceReel: {
    eyebrow: 'Motion Study',
    title: 'Ambience Reel',
    caption:
      'Evening light drifting across translucent shoji screens and marina reflections at Porto Arabia.',
    videoSrc: '',
  },

  instagramStrip: {
    eyebrow: 'Instagram Journal',
    handle: '@luno.qatar',
    href: 'https://instagram.com',
    tiles: [
      { id: 'ig-1', label: 'Dining Room', image: diningHallImg },
      { id: 'ig-2', label: 'Omakase', image: omakaseCounterImg },
      { id: 'ig-3', label: 'Private Salon', image: privateSalonImg },
      { id: 'ig-4', label: 'The Pearl Dusk', image: waterfrontTerraceImg },
    ],
  },

  items: [
    {
      id: 'gal-int-1',
      category: 'interior',
      title: 'The Main Sanctuary & Shoji Screens',
      caption:
        'Deep oxblood-burgundy plaster walls paired with warm dark walnut tables, brushed brass table lamps, and glowing washi latticework.',
      aspect: '4/3',
      image: diningHallImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'wave',
    },
    {
      id: 'gal-int-2',
      category: 'interior',
      title: 'The Hinoki Omakase Counter',
      caption:
        'Intimate chef-led counter seating carved from dark walnut and hinoki timber, framing seasonal nigiri and kaiseki artistry.',
      aspect: '4/3',
      image: omakaseCounterImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'moon',
    },
    {
      id: 'gal-food-1',
      category: 'food',
      title: 'Crescent Hamachi Crudo',
      caption:
        'Hokkaido yellowtail sashimi over chilled yuzu dashi with purple micro shiso and 24k gold leaf.',
      aspect: '3/4',
      image: hamachiCrudoImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'moon',
    },
    {
      id: 'gal-int-3',
      category: 'interior',
      title: 'Kumiko Private Dining Salon',
      caption:
        'Enclosed behind hand-joined Japanese timber screens for unhurried private gatherings and bespoke tasting menus.',
      aspect: '3/4',
      image: privateSalonImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'wave',
    },
    {
      id: 'gal-atm-1',
      category: 'atmosphere',
      title: 'Marina Twilight at Porto Arabia',
      caption:
        'Lantern-lit waterfront tables overlooking calm marina waters and yachts at The Pearl, Qatar.',
      aspect: '4/3',
      image: waterfrontTerraceImg,
      imageClassName: 'object-left',
      isPlaceholder: false,
      motif: 'moon',
    },
    {
      id: 'gal-food-2',
      category: 'food',
      title: 'Miyazaki A5 Wagyu Tataki',
      caption:
        'Binchotan-seared striploin over chilled volcanic slate with black truffle tare and charred negi.',
      aspect: '3/4',
      image: wagyuTatakiImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'moon',
    },
    {
      id: 'gal-atm-2',
      category: 'atmosphere',
      title: 'Ceremonial Tea & Botanical Lounge',
      caption:
        'Backlit brushed brass shelving inside a deep burgundy lacquer alcove serving zero-proof elixirs and Uji teas.',
      aspect: '3/4',
      image: teaLoungeImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'moon',
    },
    {
      id: 'gal-food-3',
      category: 'food',
      title: 'Saikyo Miso Black Cod',
      caption:
        '48-hour Kyoto white miso glaze, crisp lotus root, and pickled myoga ginger blossom.',
      aspect: '3/4',
      image: blackCodImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'wave',
    },
    {
      id: 'gal-food-4',
      category: 'food',
      title: 'Uji Matcha & Black Sesame Mille-Feuille',
      caption:
        'Ceremonial matcha patisserie crowned with a crisp black sesame crescent tuile.',
      aspect: '3/4',
      image: matchaMilleImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'moon',
    },
    {
      id: 'gal-food-5',
      category: 'food',
      title: 'LUNO Yuzu & Shiso Elixir',
      caption:
        'Clarified Japanese yuzu and botanical shiso distillate over a hand-carved crystal ice sphere.',
      aspect: '3/4',
      image: yuzuElixirImg,
      imageClassName: 'object-center',
      isPlaceholder: false,
      motif: 'moon',
    },
  ],
};
