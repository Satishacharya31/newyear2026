export interface Wish {
  id: string;
  title: string;
  message: string;
  author: string;
  nepaliMessage?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface NavbarProps {
  isCelebrating: boolean;
  onToggleCelebration: () => void;
}

export interface VisionProps {
  onCelebrate: () => void;
}
