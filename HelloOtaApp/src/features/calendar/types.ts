export type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

export type CalendarDay = CalendarDate & {
  inCurrentMonth: boolean;
};
