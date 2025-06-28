import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { IMAGES } from '../../Constants/images';
import { scaleHeight, scaleWidth, normalizeFont } from '../../Constants/dynamicSize';
import { COLORS } from '../../Constants/colors';

const HEIGHT = Dimensions.get("window").height + (StatusBar.currentHeight || 0);

interface Article {
  title: string;
  description: string;
  [key: string]: any;
}
const NewsScreen: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const API_KEY = "e2a4534bd32e4d5dbf7b45bd932fe53d";

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
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
    <ImageBackground source={IMAGES.newbg} style={styles.backgroundImage} resizeMode='cover' resizeMethod="resize">
      <View style={styles.newsContainer}>

        <Text style={styles.header}>Top Headlines</Text>
        <FlatList
          accessibilityLabel="news-list"
          data={news}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.articleContainer}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <Text style={styles.atitle}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  newsContainer: {
    padding: scaleHeight(10),
    marginTop: '15%',
  },
  header: {
    fontSize: normalizeFont(20),
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: scaleHeight(10),
  },
  articleContainer: {
    margin: scaleHeight(5),
    padding: scaleHeight(10),
    borderRadius: scaleHeight(5),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: scaleHeight(5),
    borderWidth: 1,
    borderColor: COLORS.ASH,
  },
  articleTitle: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  atitle: {
    color: COLORS.WHITE,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: HEIGHT,
  },
  arrow: {
    tintColor: COLORS.WHITE,
    width: scaleWidth(30),
    height: scaleHeight(30),
  },
});

export default NewsScreen;
