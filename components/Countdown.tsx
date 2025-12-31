import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';
import { TARGET_DATE } from '../constants';

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-3 md:mx-6">
      <span className="text-3xl md:text-5xl font-light text-white tabular-nums tracking-tighter">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400 mt-2">
        {label}
      </span>
    </div>
  );

  const isTimeUp = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  useEffect(() => {
    if (isTimeUp) {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Happy New Year 2026! 🎆", {
          body: "The wait is over! Join the celebration.",
          icon: "/ogimage.gif", // Use the gif or any icon handy
          requireInteraction: true
        });
      }
    }
  }, [isTimeUp]);

  if (isTimeUp) {
    return (
      <div className="flex flex-col items-center py-6 px-10 glass-card rounded-2xl border border-amber-500/20 shadow-lg shadow-amber-500/10">
        <h2 className="text-3xl md:text-5xl font-bold text-gradient-gold tracking-tight mb-2 animate-pulse">
          HAPPY NEW YEAR
        </h2>
        <p className="text-xl md:text-2xl text-white font-light tracking-widest uppercase">
          2026
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8 glass-card rounded-2xl px-6 md:px-12 inline-block border border-white/5">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="h-8 w-[1px] bg-white/10"></div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="h-8 w-[1px] bg-white/10"></div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className="h-8 w-[1px] bg-white/10"></div>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
