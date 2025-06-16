export const ZODIAC_SIGNS = {
  ARIES: 'aries',
  TAURUS: 'taurus',
  GEMINI: 'gemini',
  CANCER: 'cancer',
  LEO: 'leo',
  VIRGO: 'virgo',
  LIBRA: 'libra',
  SCORPIO: 'scorpio',
  SAGITTARIUS: 'sagittarius',
  CAPRICORN: 'capricorn',
  AQUARIUS: 'aquarius',
  PISCES: 'pisces',
} as const;

export type ZodiacSign = keyof typeof ZODIAC_SIGNS;

export type ZodiacSignValue = (typeof ZODIAC_SIGNS)[keyof typeof ZODIAC_SIGNS];
