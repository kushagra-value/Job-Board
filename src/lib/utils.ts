import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(salary: string | number | null | undefined): string {
  if (salary === null || salary === undefined) {
    return 'Not Disclosed';
  }
  
  if (typeof salary === 'string') {
    if (salary.toLowerCase() === 'not disclosed') {
      return 'Not Disclosed';
    }
    // Handle ranges like "150000-180000"
    if (salary.includes('-')) {
      const [min, max] = salary.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
      }
    }
    return salary;
  }
  
  if (typeof salary === 'number') {
    return `$${salary.toLocaleString()}`;
  }

  return 'Not Disclosed';
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
} else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
} else {
    const years = Math.floor(diffDays / 365)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
}
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}