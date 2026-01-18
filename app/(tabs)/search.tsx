import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMovies } from '@/services/movieService';
import { SafeAreaView } from 'react-native-safe-area-context';
import bgImage from './../../assets/images/bg.png'
import logo from './../../assets/icons/logo.png'
import searchIcon from './../../assets/icons/search.png'
import { StatusBar } from 'expo-status-bar';
import MovieCard from '@/components/MovieCard';

const search = () => {

  const [movies, setMovies] = useState<any[] | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim() === '' || query.trim().length <= 0) {
        setMovies([]);
        return;
      }
      try {
        const res = await fetchMovies({ query: query.trim() });
        console.log(res);
        setMovies(res);
      }
      catch (e) {
        console.log(e);
      }
    }, 1000);

    return () => clearTimeout(timer);

  }, [query]);


  return (
    <>
      <SafeAreaView className='flex-1 bg-primary'>
        <ScrollView className='flex-1'>
          <ImageBackground source={bgImage} className='w-full h-[337px] justify-start items-center'>
            <View>
              <Image source={logo} className='mt-12' width={20}></Image>
            </View>
            <View className='flex-row items-center gap-2 mt-9 bg-[#0F0D23] px-5 py-1.5 rounded-full w-[90%]'>
              <Image source={searchIcon} tintColor={'#AB8BFF'}></Image>
              <TextInput onChangeText={setQuery} value={query} placeholder='Search through 300+ movies online' className='text-white' placeholderTextColor={'#B39DDB'}></TextInput>
            </View>
          </ImageBackground>

          <FlatList
            data={movies ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard {...item} />
            )}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 12,
              // paddingRight: 5,
              marginBottom: 25,
            }}
            className="px-5 -translate-y-[110px]"
            scrollEnabled={false}
          />

        </ScrollView>

      </SafeAreaView>

      <StatusBar style="light" translucent backgroundColor="transparent" />
    </>
  )
}

export default search