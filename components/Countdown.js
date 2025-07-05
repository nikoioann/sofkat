"use client";
import React, { useState, useEffect } from "react";

const Countdown = () => {
  const WEDDING_DATE = new Date("2025-11-08T13:00:00");
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const difference = +WEDDING_DATE - +new Date();
    let timeLeft = {};

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

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex justify-center items-center space-x-2 md:space-x-6 bg-white bg-opacity-70 rounded-lg p-4 mt-8 backdrop-blur-sm">
        <div className="text-center p-4">
          <div className="text-4xl md:text-5xl font-bold text-gray-700">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      timerComponents.push(
        <div key="finished" className="text-center p-4">
          <div className="text-4xl md:text-6xl font-bold text-gray-800">
            It&apos;s Wedding Day!
          </div>
        </div>
      );
      return;
    }

    timerComponents.push(
      <div key={interval} className="text-center p-2">
        <div className="text-4xl md:text-5xl font-bold text-gray-700">
          {String(timeLeft[interval]).padStart(2, "0")}
        </div>
        <div className="text-sm uppercase tracking-wider text-gray-500">
          {interval}
        </div>
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center space-x-2 md:space-x-6 bg-white bg-opacity-70 rounded-lg p-4 mt-8 backdrop-blur-sm">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <div className="text-center p-4">
          <div className="text-4xl md:text-6xl font-bold text-gray-800">
            The Big Day is Here!
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
