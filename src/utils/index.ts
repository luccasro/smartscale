import { DateFirebase } from 'types';

export const LINKS = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgotPassword',
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string) => {
  return email.length > 0 && emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const validateData = (email: string, password: string) => {
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

  if (!isValidEmail) {
    return 'Invalid email address';
  } else if (!isValidPassword) {
    return 'Password must contain at least 6 characters';
  }

  return;
};

export const status = {
  underWeight: 'Underweight',
  normal: 'Normal weight',
  overweight: 'Overweight ',
  obesity1: 'Obesity I',
  obesity2: 'Obesity II',
  obesity3: 'Obesity III',
};

export function getStatus(bmi: number) {
  let statusWeight;
  let color;
  let background;

  if (bmi < 18.5) {
    statusWeight = status.underWeight;
    color = 'text-blue-500';
    background = 'bg-blue-100';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    statusWeight = status.normal;
    color = 'text-green-500';
    background = 'bg-green-100';
  } else if (bmi >= 25 && bmi <= 29.9) {
    statusWeight = status.overweight;
    color = 'text-yellow-500';
    background = 'bg-yellow-100';
  } else if (bmi >= 30 && bmi <= 34.9) {
    statusWeight = status.obesity1;
    color = 'text-red-500';
    background = 'bg-red-100';
  } else if (bmi >= 35 && bmi <= 39.9) {
    statusWeight = status.obesity2;
    color = 'text-red-600';
    background = 'bg-red-100';
  } else if (bmi >= 40) {
    statusWeight = status.obesity3;
    color = 'text-red-700';
    background = 'bg-red-100';
  }

  return {
    status: statusWeight,
    color,
    background,
    score: bmi.toString(),
  };
}

export const calculateBmi = (weight: number, height: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;
  const result = bmi.toFixed(1);

  return result;
};

export const getDate = (date: DateFirebase) => {
  const milliseconds = date.seconds * 1000 + date.nanoseconds / 1e6;
  const dateConverted = new Date(milliseconds);
  const day = dateConverted.getDate();
  const month = dateConverted.getMonth() + 1;
  const year = dateConverted.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};

export function avgWeight(weights?: string[]) {
  if (!weights || weights?.length === 0) {
    return '0 kg';
  }

  const sum = weights.reduce(
    (acc, weight) => acc + parseFloat(weight || '0'),
    0,
  );
  const avg = Math.round(sum / weights.length);

  return `${avg} kg`;
}

export function avgBmi(bmis?: string[]): number {
  if (!bmis || bmis?.length === 0) {
    return 0;
  }

  const sum = bmis.reduce((acc, bmi) => acc + parseFloat(bmi || '0'), 0);
  const avg = Math.round((sum / bmis.length) * 10) / 10;

  return avg;
}

export function weightLoss(weights?: string[]) {
  if (!weights || weights?.length <= 1) {
    return '0';
  }

  const weightLossValue =
    parseFloat(weights[weights.length - 2]) -
    parseFloat(weights[weights.length - 1]);

  if (weightLossValue <= 0) {
    return '0';
  }

  return `${weightLossValue} kg`;
}

export function lowerWeight(weights?: string[]) {
  if (!weights || weights?.length === 0) {
    return 0;
  }

  const minWeight = Math.min(
    ...weights
      .filter((weight) => weight !== undefined)
      .map((weight) => parseFloat(weight || '0')),
  );

  return minWeight || 0;
}

export function getStatusTable(bmi: number) {
  if (bmi < 18.5) {
    return [status.underWeight];
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    return [status.normal];
  }
  if (bmi >= 25 && bmi <= 29.9) {
    return [status.overweight];
  }
  if (bmi >= 30 && bmi <= 34.9) {
    return [status.obesity1];
  }
  if (bmi >= 35 && bmi <= 39.9) {
    return [status.obesity2];
  }
  if (bmi >= 40) {
    return [status.obesity3];
  }
}
