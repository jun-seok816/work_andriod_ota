import type { CalendarDate, CalendarDay } from '../types';

export function toCalendarDate(date: Date): CalendarDate {
  return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}

export function isSameDate(a: CalendarDate, b: CalendarDate): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export function getMonthDays(year: number, month: number): CalendarDay[] {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: cellCount }, (_, index) => {
    const date = toCalendarDate(new Date(year, month - 1, index - firstWeekday + 1));
    return { ...date, inCurrentMonth: date.year === year && date.month === month };
  });
}
