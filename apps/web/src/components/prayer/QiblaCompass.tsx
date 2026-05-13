"use client";

import { useState, useEffect } from "react";
import { calculateQibla } from "@/lib/prayer";
import { cn } from "@/lib/utils";

export function QiblaCompass() {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    // Get location to calculate Qibla angle
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const angle = calculateQibla(pos.coords.latitude, pos.coords.longitude);
          setQiblaAngle(angle);
        },
        () => {
          // Fallback to London
          const angle = calculateQibla(51.5074, -0.1278);
          setQiblaAngle(angle);
        }
      );
    }
  }, []);

  const requestCompassPermission = async () => {
    try {
      // iOS 13+ requires permission for DeviceOrientationEvent
      if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function") {
        const perm = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (perm !== "granted") {
          setError("Compass permission denied");
          return;
        }
      }

      setHasPermission(true);
      window.addEventListener("deviceorientationabsolute", handleOrientation as EventListener);
      window.addEventListener("deviceorientation", handleOrientation as EventListener);
    } catch {
      setError("Compass not available on this device");
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent & { webkitCompassHeading?: number }) => {
    const heading = event.webkitCompassHeading ?? -(event.alpha ?? 0);
    setCompassHeading(((heading % 360) + 360) % 360);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation as EventListener);
      window.removeEventListener("deviceorientation", handleOrientation as EventListener);
    };
  }, []);

  const needleRotation = qiblaAngle !== null ? qiblaAngle - compassHeading : 0;

  return (
    <div className="card p-6 flex flex-col items-center gap-4">
      <h3 className="section-title self-start">Qibla Direction</h3>
      <p className="text-sm text-[var(--text-muted)] self-start -mt-2">اتجاه القبلة</p>

      {/* Compass */}
      <div className="relative w-48 h-48">
        {/* Compass ring */}
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Outer ring */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="var(--border)" strokeWidth="2" />
          <circle cx="100" cy="100" r="85" fill="none" stroke="var(--border)" strokeWidth="0.5" />

          {/* Cardinal directions */}
          {[
            { label: "N", angle: 0 },
            { label: "E", angle: 90 },
            { label: "S", angle: 180 },
            { label: "W", angle: 270 },
          ].map(({ label, angle }) => {
            const rad = ((angle - 90) * Math.PI) / 180;
            const x = 100 + 75 * Math.cos(rad);
            const y = 100 + 75 * Math.sin(rad);
            return (
              <text
                key={label}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={label === "N" ? "var(--primary)" : "var(--text-muted)"}
                fontSize="14"
                fontWeight={label === "N" ? "bold" : "normal"}
              >
                {label}
              </text>
            );
          })}

          {/* Tick marks */}
          {Array.from({ length: 36 }, (_, i) => {
            const angle = i * 10;
            const rad = ((angle - 90) * Math.PI) / 180;
            const isMajor = i % 3 === 0;
            const r1 = isMajor ? 88 : 90;
            const r2 = 95;
            return (
              <line
                key={i}
                x1={100 + r1 * Math.cos(rad)}
                y1={100 + r1 * Math.sin(rad)}
                x2={100 + r2 * Math.cos(rad)}
                y2={100 + r2 * Math.sin(rad)}
                stroke="var(--border)"
                strokeWidth={isMajor ? 1.5 : 0.75}
              />
            );
          })}

          {/* Qibla needle */}
          {qiblaAngle !== null && (
            <g transform={`rotate(${needleRotation}, 100, 100)`}>
              {/* Kaaba icon at needle tip */}
              <polygon
                points="100,20 95,100 100,95 105,100"
                fill="var(--primary)"
              />
              <polygon
                points="100,180 95,100 100,105 105,100"
                fill="var(--text-subtle)"
              />
              <circle cx="100" cy="100" r="6" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2" />
              {/* Kaaba symbol at tip */}
              <text x="100" y="16" textAnchor="middle" fontSize="14">
                🕋
              </text>
            </g>
          )}

          {/* Center dot */}
          <circle cx="100" cy="100" r="4" fill="var(--primary)" />
        </svg>
      </div>

      {/* Angle info */}
      {qiblaAngle !== null && (
        <div className="text-center">
          <p className="text-3xl font-bold text-[var(--primary)]">{qiblaAngle}°</p>
          <p className="text-sm text-[var(--text-muted)]">from North</p>
        </div>
      )}

      {/* Compass activation */}
      {!hasPermission && !error && (
        <button
          onClick={requestCompassPermission}
          className="btn-primary text-sm w-full"
        >
          🧭 Enable Live Compass
        </button>
      )}

      {hasPermission && (
        <p className="text-xs text-emerald-500 text-center">
          ✓ Compass active — rotate your device
        </p>
      )}

      {error && (
        <p className="text-xs text-[var(--text-muted)] text-center">
          {error}. Showing static direction.
        </p>
      )}

      <p className="text-xs text-[var(--text-subtle)] text-center">
        Direction toward Masjid al-Haram, Mecca
      </p>
    </div>
  );
}
