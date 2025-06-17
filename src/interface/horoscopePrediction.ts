export interface HoroscopePrediction {
  message: string;
  additionalInfo: {
    luckyNumber: number;
    luckyColor: string;
    mood: string;
    compatibility: string;
    advice: string;
    element: string;
    planetaryInfluence: string;
    energy: 'high' | 'medium' | 'low';
    focus: string;
  };
}
