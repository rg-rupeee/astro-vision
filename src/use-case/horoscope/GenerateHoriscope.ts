import { HoroscopePrediction } from '@interface/HoroscopePrediction';

const colors = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Purple',
  'Orange',
  'Pink',
  'Black',
];
const moods = [
  'Happy',
  'Thoughtful',
  'Romantic',
  'Adventurous',
  'Calm',
  'Focused',
];
const compatibilities = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];
const advices = [
  'Trust your instincts.',
  'Take a leap of faith.',
  'Be cautious with decisions.',
  'Reconnect with an old friend.',
  'Take time to reflect.',
  'Try something new today.',
];
const elements = ['Fire', 'Earth', 'Air', 'Water'];
const planetaryInfluences = [
  'Mars',
  'Venus',
  'Mercury',
  'Jupiter',
  'Saturn',
  'Neptune',
  'Pluto',
  'Uranus',
];
const energyLevels: Array<'high' | 'medium' | 'low'> = [
  'high',
  'medium',
  'low',
];
const focuses = [
  'Love',
  'Career',
  'Health',
  'Finances',
  'Spirituality',
  'Personal Growth',
];
const messages = [
  'Today is a perfect day to start fresh.',
  'Expect a pleasant surprise from someone close.',
  'You may find answers where you least expect them.',
  'The stars align in your favor today.',
  'Keep your eyes open for new opportunities.',
  'Something beautiful is on the horizon.',
];

export class GenerateHoroscopeUseCase {
  execute(): HoroscopePrediction {
    return {
      message: this.getRandom(messages),
      additionalInfo: {
        luckyNumber: Math.floor(Math.random() * 100) + 1,
        luckyColor: this.getRandom(colors),
        mood: this.getRandom(moods),
        compatibility: this.getRandom(compatibilities),
        advice: this.getRandom(advices),
        element: this.getRandom(elements),
        planetaryInfluence: this.getRandom(planetaryInfluences),
        energy: this.getRandom(energyLevels),
        focus: this.getRandom(focuses),
      },
    };
  }

  getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
