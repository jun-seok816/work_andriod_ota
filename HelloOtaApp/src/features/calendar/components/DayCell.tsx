import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { CalendarMain } from '../class/CalendarMain';
import type { CalendarDay } from '../types';
import { isSameDate } from '../utils/calendarDates';

type Props = { day: CalendarDay; weekday: number; calendar: CalendarMain };

export function DayCell({ day, weekday, calendar }: Props) {
  const selected = isSameDate(day, calendar.iv_SelectedDate);
  const today = isSameDate(day, calendar.iv_Today);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${day.year}년 ${day.month}월 ${day.day}일`}
      accessibilityState={{ selected }}
      onPress={() => calendar.im_SelectDate(day)}
      style={styles.cell}>
      <Text style={[
        styles.number,
        !day.inCurrentMonth && styles.outside,
        day.inCurrentMonth && weekday === 0 && styles.sunday,
        day.inCurrentMonth && weekday === 6 && styles.saturday,
        today && styles.today,
        selected && styles.selected,
      ]}>{day.day}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: { width: '14.2857%', height: 48, alignItems: 'center', justifyContent: 'center' },
  number: { width: 36, height: 36, textAlign: 'center', textAlignVertical: 'center', borderRadius: 18, overflow: 'hidden', color: '#1F2937', fontSize: 15 },
  outside: { color: '#B6BDC8' },
  sunday: { color: '#DC2626' },
  saturday: { color: '#2563EB' },
  today: { borderWidth: 1, borderColor: '#2563EB' },
  selected: { backgroundColor: '#2563EB', color: '#FFFFFF', borderColor: '#2563EB' },
});
