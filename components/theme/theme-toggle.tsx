// components/theme/theme-toggle.tsx
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted p-1">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
      >
        <Icon icon="mdi:weather-sunny" className="mr-2 h-4 w-4" />
        Claro
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
      >
        <Icon icon="mdi:weather-night" className="mr-2 h-4 w-4" />
        Escuro
      </Button>
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("system")}
      >
        <Icon icon="mdi:laptop" className="mr-2 h-4 w-4" />
        Sistema
      </Button>
    </div>
  );
}
