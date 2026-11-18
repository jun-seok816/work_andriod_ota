import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { hotUpdater } from './src/hotUpdater';

type HelloResponse = {
  message: string;
  database: string;
};

function App() {
  const [data, setData] = useState<HelloResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://eedensoft.com/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((result: HelloResponse) => {
        setData(result);
      })
      .catch(err => {
        setError(String(err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Google Play OTA 업데이트 성공!</Text>

      {loading && <ActivityIndicator size="large" />}

      {data && (
        <>
          <Text style={styles.message}>{data.message}</Text>
          <Text>Database: {data.database}</Text>
        </>
      )}

      {error !== '' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111111',
  },
  message: {
    fontSize: 20,
    color: '#333333',
  },
  error: {
    color: 'red',
  },
});

export default hotUpdater.wrap({
  updateStrategy: 'appVersion',

  onProgress: progress => {
    console.log('[OTA] 다운로드:', Math.round(progress * 100) + '%');
  },

  onUpdateProcessCompleted: result => {
    console.log('[OTA] 업데이트 확인:', result.status);
  },
})(App);

