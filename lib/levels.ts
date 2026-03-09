export const LEVEL_THRESHOLDS = [
  0,     // Level 1
  100,   // Level 2
  250,   // Level 3
  500,   // Level 4
  1000,  // Level 5
  2000,  // Level 6
  3500,  // Level 7
  5500,  // Level 8
  8000,  // Level 9
  12000, // Level 10
];

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

export function getXPForNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  if (currentLevel >= 10) return 0; // Max level
  return LEVEL_THRESHOLDS[currentLevel];
}

export function getLevelBenefits(level: number): {
  shippingSpeed: string;
  couponDiscount: number;
  passTrialDays: number;
} {
  const benefits = {
    shippingSpeed: '5-7 business days',
    couponDiscount: 0,
    passTrialDays: 0,
  };

  if (level >= 3) {
    benefits.shippingSpeed = '3-5 business days';
    benefits.couponDiscount = 5;
  }

  if (level >= 5) {
    benefits.passTrialDays = 7;
  }

  if (level >= 7) {
    benefits.shippingSpeed = '2-3 business days';
    benefits.couponDiscount = 10;
  }

  if (level >= 10) {
    benefits.shippingSpeed = '1-2 business days';
    benefits.couponDiscount = 15;
    benefits.passTrialDays = 14;
  }

  return benefits;
}

export function calculateXPFromPurchase(amount: number): number {
  // 1 XP per dollar spent
  return Math.floor(amount);
}
