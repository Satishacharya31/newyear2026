import { Wish, NavItem } from './types';

export const TARGET_DATE = new Date('2026-01-01T00:00:00');

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Wishes', href: '#wishes' },
  { label: 'Vision', href: '#vision' },
];

export const WISHES: Wish[] = [
  {
    id: '1',
    title: 'New Beginnings',
    message: 'May the coming year bring you peace, prosperity, and the courage to chase your dreams. Here is to a fresh start.',
    nepaliMessage: 'आउँदै गरेको नयाँ वर्षले तपाइँको जीवनमा शान्ति, समृद्धि र नयाँ उर्जा ल्याओस्।',
    author: 'Satish'
  },
  {
    id: '2',
    title: 'Global Harmony',
    message: 'Wishing the world a year of healing and unity. Let 2026 be the year we bridge distances.',
    nepaliMessage: 'विश्वमा शान्ति र एकताको कामना। २०२६ मा हामी सबै अझ नजिक हुन सकौं।',
    author: 'Universal Spirit'
  },
  {
    id: '3',
    title: 'Personal Growth',
    message: 'Embrace the journey. Every step you take in 2026 brings you closer to the person you are meant to become.',
    nepaliMessage: 'तपाईंको हरेक पाइलाले सफलताको शिखर चुमोस्। आत्म-विश्वास र लगनशीलता बढिरहोस्।',
    author: 'Mindful Daily'
  }
];

export const HERO_TITLE_EN = "Welcome to 2026";
export const HERO_TITLE_NE = "नयाँ वर्ष २०२६ को शुभकामना";
export const HERO_SUBTITLE = "A celebration of light, hope, and new horizons.";

export const PUBLIC_VAPID_KEY = 'BIUrM4ZOLaH53-6tyHX3B4JNgprFbuSoGXq50Q1okIj-DgoNro2mBJTwNhd_khGS5oyuvEtHnLh5D1DWLv8XSmM';