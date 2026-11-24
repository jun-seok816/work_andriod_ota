import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CalendarMain } from '../class/CalendarMain';

export function CalendarHeader({ calendar }: { calendar: CalendarMain }) {
  return (
    <View style={styles.row}>
      <View style={styles.monthControls}>
        <Text style={styles.title}>{calendar.iv_Year}년 {calendar.iv_Month}월</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="이전 달" onPress={() => calendar.im_ChangeMonth(-1)} style={styles.arrow}>
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="다음 달" onPress={() => calendar.im_ChangeMonth(1)} style={styles.arrow}>
          <Text style={styles.arrowText}>›</Text>
        </Pressable>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="오늘로 이동" onPress={() => calendar.im_GoToToday()} style={styles.todayButton}>
        <Text style={styles.todayText}>오늘</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  monthControls: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#1F2937', marginRight: 12 },
  arrow: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  arrowText: { fontSize: 30, color: '#374151', lineHeight: 34 },
  todayButton: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 },
  todayText: { fontSize: 14, color: '#374151', fontWeight: '600' },
});
