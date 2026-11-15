import hamachiCrudoImg from '../src/assets/images/dish_hamachi_crudo_1794762184629.jpg';
import wagyuTatakiImg from '../src/assets/images/dish_wagyu_tataki_1794762184776.jpg';
import blackCodImg from '../src/assets/images/dish_black_cod_1794762186365.jpg';
import matchaMilleImg from '../src/assets/images/dish_matcha_mille_1794762188248.jpg';
import yuzuElixirImg from '../src/assets/images/dish_yuzu_elixir_1794762186318.jpg';
import spicyTunaImg from '../src/assets/images/dish_spicy_tuna_crispy_rice_1794765636083.jpg';
import edamameTruffleImg from '../src/assets/images/dish_charred_edamame_truffle_1794765635530.jpg';
import scallopYuzuImg from '../src/assets/images/dish_hokkaido_scallop_yuzu_1794765636275.jpg';
import maitakeDonabeImg from '../src/assets/images/dish_maitake_chestnut_donabe_1794765637037.jpg';
import otoroCaviarImg from '../src/assets/images/dish_otoro_caviar_handroll_1794765637143.jpg';
import yuzuPannaCottaImg from '../src/assets/images/dish_yuzu_rice_pannacotta_1794765638105.jpg';
import gyokuroTeaImg from '../src/assets/images/dish_gyokuro_imperial_tea_1794765638746.jpg';
import hojichaTonicImg from '../src/assets/images/dish_hojicha_espresso_tonic_1794765639492.jpg';

/**
 * LUNO Qatar — Menu Data
 * Each item includes ingredients, QAR price, dietary tags, and dish photography.
 */

export const menuData = {
  status: 'Preview Selection',
  currency: 'QAR',
  subtitle: 'Porto Arabia, The Pearl, Qatar',
  notice:
    'A curated preview of seasonal kaiseki dishes, artisanal plates, and botanical pairings crafted for LUNO Qatar.',
  allergenNotice:
    'Please inform our service team of any food allergies or dietary requirements prior to ordering.',
  pricingNote:
    'All prices are listed in Qatari Riyals (QAR) and include applicable service charges.',
  downloadLabel: 'Download PDF Menu',

  featuredDishes: [
    {
      id: 'dish-01',
      course: 'Starter · Signature',
      stampLabel: 'CHEF SIGNATURE',
      kanjiSeal: '旬',
      name: 'CRESCENT HAMACHI CRUDO',
      note: 'Hokkaido yellowtail sashimi bathed in chilled yuzu white-soy dashi with purple micro shiso, shallots, and 24k gold leaf.',
      ingredients: ['Hokkaido Yellowtail', 'Yuzu White Soy', 'Micro Shiso', 'Gold Leaf'],
      price: 115,
      tiers: [
        { label: 'SMALL', value: '85' },
        { label: 'REGULAR', value: '115' },
        { label: 'SHARING', value: '210' },
      ],
      secondaryHeading: 'WITH BOTANICAL TEA PAIRING',
      secondaryTiers: [
        { label: 'GYOKURO', value: '155' },
        { label: 'YUZU ELIXIR', value: '165' },
      ],
      image: hamachiCrudoImg,
      tag: 'QAR 115',
    },
    {
      id: 'dish-02',
      course: 'Chef Selection',
      stampLabel: 'KAISEKI RESERVE',
      kanjiSeal: '匠',
      name: 'MIYAZAKI A5 WAGYU TATAKI',
      note: 'Binchotan-kissed A5 Miyazaki striploin over chilled slate, glazed in black truffle tare with charred negi and fresh Shizuoka wasabi.',
      ingredients: ['A5 Miyazaki Wagyu', 'Black Truffle Tare', 'Charred Negi', 'Fresh Wasabi'],
      price: 265,
      tiers: [
        { label: '100G', value: '265' },
        { label: '180G', value: '440' },
        { label: 'OMAKASE CUT', value: '590' },
      ],
      secondaryHeading: 'TRUFFLE & CAVIAR FINISH',
      secondaryTiers: [
        { label: 'SHAVED TRUFFLE', value: '335' },
        { label: 'OSCIETRA', value: '485' },
      ],
      image: wagyuTatakiImg,
      tag: 'QAR 265',
    },
    {
      id: 'dish-03',
      course: 'Main Course',
      stampLabel: 'HOUSE FAVORITE',
      kanjiSeal: '火',
      name: 'SAIKYO MISO BLACK COD',
      note: '48-hour Kyoto white miso marinated black cod, flame-caramelized and served with pickled myoga blossom and crisp lotus root.',
      ingredients: ['Alaskan Black Cod', 'Kyoto White Miso', 'Pickled Myoga', 'Lotus Root'],
      price: 195,
      tiers: [
        { label: 'SINGLE', value: '195' },
        { label: 'FOR TWO', value: '370' },
        { label: 'DONABE SET', value: '430' },
      ],
      secondaryHeading: 'WITH FORBIDDEN BLACK RICE',
      secondaryTiers: [
        { label: 'SINGLE', value: '225' },
        { label: 'SHARING', value: '415' },
      ],
      image: blackCodImg,
      tag: 'QAR 195',
    },
  ],

  dietaryLegend: [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'nuts', label: 'Contains Nuts' },
    { id: 'shellfish', label: 'Contains Shellfish' },
    { id: 'dairy', label: 'Contains Dairy' },
    { id: 'spicy', label: 'Spicy' },
  ],

  categories: [
    {
      id: 'starters',
      name: 'Starters',
      subtitle: '先附 · Sakizuke',
      description:
        'Delicate cold and warm openings balancing bright citrus, umami broths, and crisp textures.',
      items: [
        {
          id: 'starter-1',
          name: 'Crescent Hamachi Crudo',
          description:
            'Thinly sliced Hokkaido yellowtail arranged in a lunar crescent over chilled yuzu dashi, pickled shallot rings, and micro shiso.',
          ingredients: [
            'Hokkaido Yellowtail',
            'Yuzu Kosho',
            'Aged White Soy Dashi',
            'Purple Micro Shiso',
            'Shallot',
            'Edible Gold Leaf',
          ],
          price: 115,
          tags: ['gluten-free'],
          isSignature: true,
          isNew: false,
          image: hamachiCrudoImg,
        },
        {
          id: 'starter-2',
          name: 'Crispy Rice & Spicy Tuna',
          description:
            'Seared Koshihikari sushi rice finished with bluefin akami, chili-sesame emulsion, and fresh scallions.',
          ingredients: [
            'Bluefin Tuna Akami',
            'Koshihikari Rice',
            'Togarashi Aioli',
            'Toasted Sesame',
            'Scallion',
          ],
          price: 98,
          tags: ['spicy'],
          isSignature: false,
          isNew: true,
          image: spicyTunaImg,
        },
        {
          id: 'starter-3',
          name: 'Charred Edamame & Truffle Sea Salt',
          description:
            'Blistered young soybeans wok-tossed with roasted garlic oil and black truffle flaky salt.',
          ingredients: [
            'Young Edamame',
            'Black Truffle Salt',
            'Roasted Garlic Oil',
            'Yuzu Zest',
          ],
          price: 48,
          tags: ['vegan', 'vegetarian', 'gluten-free'],
          isSignature: false,
          isNew: false,
          image: edamameTruffleImg,
        },
      ],
    },
    {
      id: 'mains',
      name: 'Mains',
      subtitle: '主菜 · Shusai',
      description:
        'Binchotan-seared meats, slow-glazed seafood, and seasonal hearth preparations.',
      items: [
        {
          id: 'main-1',
          name: 'Saikyo Miso Black Cod',
          description:
            'Fillet marinated 48 hours in sweet Kyoto white miso, caramelized under flame and served over forbidden black rice with pickled ginger blossom.',
          ingredients: [
            'Alaskan Black Cod',
            'Kyoto Saikyo Miso',
            'Forbidden Black Rice',
            'Pickled Myoga Blossom',
            'Crisp Lotus Root',
          ],
          price: 195,
          tags: ['gluten-free'],
          isSignature: true,
          isNew: false,
          image: blackCodImg,
        },
        {
          id: 'main-2',
          name: 'Hokkaido Scallop & Yuzu Butter',
          description:
            'Pan-seared jumbo scallops basted with cultured yuzu butter, roasted cauliflower silk, and toasted hazelnuts.',
          ingredients: [
            'Hokkaido Scallops',
            'Cultured Yuzu Butter',
            'Cauliflower Purée',
            'Toasted Hazelnuts',
            'Chive Oil',
          ],
          price: 175,
          tags: ['shellfish', 'dairy', 'nuts', 'gluten-free'],
          isSignature: false,
          isNew: true,
          image: scallopYuzuImg,
        },
        {
          id: 'main-3',
          name: 'Smoked Maitake & Chestnut Donabe',
          description:
            'Earthenware clay-pot rice steamed with wild maitake mushrooms, roasted chestnuts, and aged kombu dashi.',
          ingredients: [
            'Wild Maitake Mushroom',
            'Roasted Chestnuts',
            'Koshihikari Rice',
            'Kombu Dashi',
            'Mitsuba Herbs',
          ],
          price: 135,
          tags: ['vegan', 'vegetarian', 'nuts', 'gluten-free'],
          isSignature: false,
          isNew: false,
          image: maitakeDonabeImg,
        },
      ],
    },
    {
      id: 'signature',
      name: "Signature / Chef's Selection",
      subtitle: '特選 · Tokusen',
      description:
        'Signature creations showcasing rare provenance, tableside precision, and layered umami.',
      items: [
        {
          id: 'sig-1',
          name: 'Miyazaki A5 Wagyu Tataki',
          description:
            'Flash-seared A5 striploin sliced over chilled volcanic slate, dressed with black truffle tare, charred negi, and freshly grated Shizuoka wasabi.',
          ingredients: [
            'A5 Miyazaki Wagyu Striploin',
            'Black Truffle Tare',
            'Charred Negi',
            'Shizuoka Wasabi',
            'Toasted Sesame',
            'Maldon Sea Salt',
          ],
          price: 265,
          tags: [],
          isSignature: true,
          isNew: false,
          image: wagyuTatakiImg,
        },
        {
          id: 'sig-2',
          name: 'Otoro & Oscietra Caviar Hand Roll',
          description:
            'Crisp Ariake nori cradling diced bluefin belly, warm akazu sushi rice, and crowned with Oscietra caviar.',
          ingredients: [
            'Bluefin Otoro',
            'Oscietra Caviar',
            'Ariake Nori',
            'Akazu Seasoned Rice',
            'Chive',
          ],
          price: 220,
          tags: [],
          isSignature: true,
          isNew: true,
          image: otoroCaviarImg,
        },
      ],
    },
    {
      id: 'desserts',
      name: 'Desserts',
      subtitle: '甘味 · Kanmi',
      description:
        'Refined Japanese patisserie balancing ceremonial tea bitterness, roasted sesame, and delicate crunch.',
      items: [
        {
          id: 'des-1',
          name: 'Uji Matcha & Black Sesame Mille-Feuille',
          description:
            'Layered ceremonial Uji matcha sponge and velvety roasted black sesame ganache, crowned with a crescent sesame tuile and gold leaf.',
          ingredients: [
            'Ceremonial Uji Matcha',
            'Roasted Black Sesame',
            'Mascarpone Cream',
            'Crisp Charcoal Tuile',
            '24k Gold Leaf',
          ],
          price: 78,
          tags: ['vegetarian', 'dairy'],
          isSignature: true,
          isNew: false,
          image: matchaMilleImg,
        },
        {
          id: 'des-2',
          name: 'Yuzu & Roasted Rice Panna Cotta',
          description:
            'Silky plant-based coconut cream infused with Kochi yuzu juice and toasted genmaicha crumble.',
          ingredients: [
            'Kochi Yuzu Juice',
            'Coconut Cream',
            'Toasted Genmaicha',
            'Candied Citrus Peel',
          ],
          price: 65,
          tags: ['vegan', 'vegetarian', 'gluten-free'],
          isSignature: false,
          isNew: true,
          image: yuzuPannaCottaImg,
        },
      ],
    },
    {
      id: 'beverages',
      name: 'Beverages',
      subtitle: '飲物 · Nomimono',
      description:
        'Artisanal zero-proof botanical elixirs, single-estate Japanese teas, and specialty pours.',
      items: [
        {
          id: 'bev-1',
          name: 'LUNO Yuzu & Shiso Elixir',
          description:
            'Clarified Japanese yuzu, aromatic green shiso distillate, and sparkling mountain water poured over a hand-carved crystal ice sphere.',
          ingredients: [
            'Kochi Yuzu',
            'Fresh Green Shiso',
            'Botanical Distillate',
            'Sparkling Spring Water',
            'Citrus Twist',
          ],
          price: 58,
          tags: ['vegan', 'vegetarian', 'gluten-free'],
          isSignature: true,
          isNew: true,
          image: yuzuElixirImg,
        },
        {
          id: 'bev-2',
          name: 'Cold-Brewed Gyokuro Imperial Tea',
          description:
            '14-hour ice-steeped shade-grown Uji green tea offering deep savoury sweetness and zero astringency.',
          ingredients: [
            'Uji Gyokuro Leaves',
            'Soft Filtered Spring Water',
          ],
          price: 52,
          tags: ['vegan', 'vegetarian', 'gluten-free'],
          isSignature: false,
          isNew: false,
          image: gyokuroTeaImg,
        },
        {
          id: 'bev-3',
          name: 'Roasted Hojicha Espresso Tonic',
          description:
            'Kyoto roasted green tea steeped with single-origin espresso essence and dry quinine tonic.',
          ingredients: [
            'Kyoto Hojicha',
            'Single-Origin Espresso',
            'Dry Botanical Tonic',
            'Orange Peel',
          ],
          price: 49,
          tags: ['vegan', 'vegetarian', 'gluten-free'],
          isSignature: false,
          isNew: false,
          image: hojichaTonicImg,
        },
      ],
    },
  ],

  tastingMenu: {
    id: 'tasting',
    name: 'Tasting Menu / Omakase',
    subtitle: 'おまかせ · Five-Course Progression',
    description:
      'An unhurried evening curated by our culinary team, moving from delicate raw beginnings to hearth-seared signatures and ceremonial tea patisserie.',
    pricePerGuest: 590,
    ctaLabel: 'Reserve The Tasting Experience',
    ctaTo: '/reservations',
    courses: [
      {
        id: 'course-1',
        course: 'Course I · Sakizuke',
        name: 'Crescent Hamachi Crudo',
        description:
          'Hokkaido yellowtail, yuzu white-soy dashi, purple micro shiso, edible gold leaf.',
      },
      {
        id: 'course-2',
        course: 'Course II · Hassun',
        name: 'Otoro & Oscietra Caviar Hand Roll',
        description:
          'Ariake toasted nori, akazu warm rice, bluefin belly, Oscietra caviar.',
      },
      {
        id: 'course-3',
        course: 'Course III · Yakimono',
        name: 'Saikyo Miso Black Cod',
        description:
          '48-hour Kyoto white miso glaze, black rice, pickled myoga blossom, crisp lotus root.',
      },
      {
        id: 'course-4',
        course: 'Course IV · Shiizakana',
        name: 'Miyazaki A5 Wagyu Tataki',
        description:
          'Binchotan-seared striploin, black truffle tare, charred negi, fresh Shizuoka wasabi.',
      },
      {
        id: 'course-5',
        course: 'Course V · Kanmi',
        name: 'Uji Matcha & Black Sesame Mille-Feuille',
        description:
          'Ceremonial matcha, roasted black sesame, crescent tuile, paired with LUNO Yuzu & Shiso Elixir.',
      },
    ],
  },
};
