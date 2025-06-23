"use client";

import React from 'react';
import { Badge } from './badge';

interface AIBadgeProps {
  variant?: 'default' | 'outline' | 'secondary';
  showTooltip?: boolean;
}

export function AIBadge({ variant = 'default', showTooltip = true }: AIBadgeProps) {
  return (
    <Badge variant={variant} className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Gemini 2.5 Flash AI
    </Badge>
  );
} 