import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(salary: string | number): string {
  if (typeof salary === 'string' && salary.toLowerCase() === 'not disclosed') {
    return 'Not Disclosed';
  }
  if (typeof salary === 'number') {
    return `$${salary.toLocaleString()}`;
  }
  // Handle ranges like "150000-180000"
  if (typeof salary === 'string' && salary.includes('-')) {
    const [min, max] = salary.split('-').map(Number);
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }
  return salary.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return "Today"
  } else if (diffDays === 1) {
    return "Yesterday"
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  } else {
    const months = Math.floor(diffDays / 30)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}