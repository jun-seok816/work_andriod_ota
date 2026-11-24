import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { CalendarMain } from '../class/CalendarMain';
import { getMonthDays } from '../utils/calendarDates';
import { DayCell } from './DayCell';

export function MonthGrid({ calendar }: { calendar: CalendarMain }) {
  const days = getMonthDays(calendar.iv_Year, calendar.iv_Month);

  return (
    <View style={styles.grid}>
      {days.map((day, index) => (
        <DayCell key={`${day.year}-${day.month}-${day.day}`} day={day} weekday={index % 7} calendar={calendar} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({ grid: { flexDirection: 'row', flexWrap: 'wrap', paddingTop: 8 } });
