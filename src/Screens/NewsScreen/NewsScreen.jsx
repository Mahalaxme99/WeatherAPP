import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "e2a4534bd32e4d5dbf7b45bd932fe53d";

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        if (isMounted) {
          setNews(response.data.articles);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Could not fetch news data.');
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        testID="loading-indicator"
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.newsContainer}>
      <Text style={styles.header}>Top Headlines</Text>
      <FlatList
        accessibilityLabel="news-list"
        data={news}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  newsContainer: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  articleContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  articleTitle: {
    fontWeight: 'bold',
  },
});

export default NewsScreen;
