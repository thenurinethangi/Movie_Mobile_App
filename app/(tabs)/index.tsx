import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import bgImage from './../../assets/images/bg.png';
import logo from './../../assets/icons/logo.png';
import search from './../../assets/icons/search.png';

import {
  fetchMovies,
  fetchMoviesByIds,
  getTopSearchedMovies,
} from '@/services/movieService';

import MovieCard from '@/components/MovieCard';
import PupolarMovieCard from '@/components/PopularMovieCard';

export default function HomeScreen() {

  const [latestMovies, setLatestMovies] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadLatestMovies = async () => {
      try {
        setLoading(true);
        const res = await fetchMovies({ query: '' });
        setLatestMovies(res);
      } catch (e) {
        console.log(e);
      }
    };
    loadLatestMovies();
  }, []);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const ids = await getTopSearchedMovies();
        const res = await fetchMoviesByIds(ids);
        setPopularMovies(res);
      } catch (e) {
        console.log(e);
      }
      finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-primary">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* HEADER */}
          <ImageBackground
            source={bgImage}
            className="w-full h-[320px] items-center"
            resizeMode="cover"
          >
            <Image source={logo} className="mt-12 w-12 h-12" />

            <View className="flex-row items-center gap-3 mt-8 bg-[#0F0D23] px-5 py-3 rounded-full w-[90%]">
              <Image source={search} className="w-5 h-5" tintColor="#AB8BFF" />
              <TextInput
                placeholder="Search through 300+ movies online"
                placeholderTextColor="#B39DDB"
                className="flex-1 text-white"
              />
            </View>
          </ImageBackground>

          {/* POPULAR MOVIES */}
          <View className="-translate-y-28">
            <Text className="text-white text-[19px] font-semibold px-5 mb-[18px]">
              Popular movies
            </Text>

            <FlatList
              data={popularMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <PupolarMovieCard movie={item} index={index} />
              )}
              horizontal
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-4" />}
              contentContainerStyle={{ paddingHorizontal: 20 }}
            />
          </View>

          {/* LATEST MOVIES */}
          <View className="px-5 -translate-y-[65]">
            <Text className="text-white text-[19px] font-semibold mb-[18px]">
              Latest movies
            </Text>

            <FlatList
              data={latestMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              scrollEnabled={false}
              columnWrapperStyle={{
                gap: 12,
                marginBottom: 24,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <StatusBar style="light" />
    </>
  );
}
