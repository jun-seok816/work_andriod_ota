import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMain from '../../shared/hooks/useMain';
import { CalendarMain } from './class/CalendarMain';
import { CalendarHeader } from './components/CalendarHeader';
import { MonthGrid } from './components/MonthGrid';
import { WeekdayHeader } from './components/WeekdayHeader';

export function CalendarScreen() {
  const calendar = useMain(() => new CalendarMain());
  const selected = calendar.iv_SelectedDate;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <CalendarHeader calendar={calendar} />
        <WeekdayHeader />
        <MonthGrid calendar={calendar} />
        <Text style={styles.selection}>선택한 날짜  {selected.year}년 {selected.month}월 {selected.day}일</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { paddingHorizontal: 20, paddingTop: 24 },
  selection: { marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#E5E7EB', fontSize: 15, color: '#374151' },
});
