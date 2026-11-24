import { Main } from '../../../shared/class/Main';
import type { CalendarDate } from '../types';
import { toCalendarDate } from '../utils/calendarDates';

export class CalendarMain extends Main {
  public iv_Today: CalendarDate;
  public iv_SelectedDate: CalendarDate;
  public iv_Year: number;
  public iv_Month: number;

  constructor(today = new Date()) {
    super();
    this.iv_Today = toCalendarDate(today);
    this.iv_SelectedDate = { ...this.iv_Today };
    this.iv_Year = this.iv_Today.year;
    this.iv_Month = this.iv_Today.month;
  }

  public im_ChangeMonth(offset: number) {
    const date = new Date(this.iv_Year, this.iv_Month - 1 + offset, 1);
    this.iv_Year = date.getFullYear();
    this.iv_Month = date.getMonth() + 1;
    this.im_forceRender();
  }

  public im_SelectDate(date: CalendarDate) {
    this.iv_SelectedDate = { ...date };
    this.iv_Year = date.year;
    this.iv_Month = date.month;
    this.im_forceRender();
  }

  public im_GoToToday() {
    this.iv_Today = toCalendarDate(new Date());
    this.im_SelectDate(this.iv_Today);
  }
}
