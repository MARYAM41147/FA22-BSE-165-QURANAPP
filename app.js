// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetchSurahs from './hooks/useFetchSurahs';

const QuranApp = () => {
  const { surahs, loading, error } = useFetchSurahs();
  const [cachedSurahs, setCachedSurahs] = useState([]);

  // Fetch Surahs from AsyncStorage on startup (for offline mode)
  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const storedSurahs = await AsyncStorage.getItem('surahs');
        if (storedSurahs) {
          setCachedSurahs(JSON.parse(storedSurahs));
        }
      } catch (e) {
        console.error("Failed to load surahs from storage:", e);
      }
    };

    loadSurahs();
  }, []);

  // Cache surahs after fetching from API
  useEffect(() => {
    if (surahs.length > 0) {
      AsyncStorage.setItem('surahs', JSON.stringify(surahs))
        .then(() => console.log('Surahs saved to AsyncStorage'))
        .catch((error) => console.error('Failed to save surahs:', error));
    }
  }, [surahs]);

  const dataToShow = surahs.length > 0 ? surahs : cachedSurahs;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error fetching data: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dataToShow}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.surahName}>{item.number}. {item.englishName}</Text>
            <Text>{item.englishNameTranslation} - {item.ayahs} ayahs</Text>
          </View>
        )}
      />
      <Button title="Clear Cache" onPress={() => AsyncStorage.clear()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
  },
  surahName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuranApp;
