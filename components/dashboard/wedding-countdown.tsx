// components/dashboard/wedding-countdown.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface WeddingCountdownProps {
  date: Date;
}

export function WeddingCountdown({ date }: WeddingCountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +date - +new Date();
    let timeLeft = {
      dias: 0,
      horas: 0,
      minutos: 0,
    };

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Card className="rounded-[2rem] bg-primary text-primary-foreground text-center border-2 border-border">
      <CardContent className="p-4">
        <p className="text-sm opacity-80">Faltam apenas</p>
        <div className="flex justify-center gap-4 text-3xl font-bold">
          <div>
            {timeLeft.dias} <span className="text-base font-normal">dias</span>
          </div>
          <div>
            {timeLeft.horas}{" "}
            <span className="text-base font-normal">horas</span>
          </div>
          <div>
            {timeLeft.minutos}{" "}
            <span className="text-base font-normal">min</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
