"use client";

import React from "react";

interface StatProps {
  label: string;
  value: string;
  detail?: string;
}

export default function StatsCounter({ label, value, detail }: StatProps) {
  return (
    <div className="stat-tile">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {detail && <p className="stat-detail">{detail}</p>}
    </div>
  );
}
