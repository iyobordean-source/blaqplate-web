import { useState, useEffect } from 'react';

export function useCountdown(targetDate) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function pad(num) {
  return String(num).padStart(2, '0');
}

export function formatCountdown({ hours, minutes, seconds }) {
  return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}