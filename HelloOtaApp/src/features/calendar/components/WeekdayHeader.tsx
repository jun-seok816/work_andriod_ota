import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

export function WeekdayHeader() {
  return (
    <View style={styles.row}>
      {weekdays.map((day, index) => (
        <Text key={day} style={[styles.day, index === 0 && styles.sunday, index === 6 && styles.saturday]}>{day}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  day: { flex: 1, textAlign: 'center', color: '#6B7280', fontSize: 13, fontWeight: '600' },
  sunday: { color: '#DC2626' },
  saturday: { color: '#2563EB' },
});
