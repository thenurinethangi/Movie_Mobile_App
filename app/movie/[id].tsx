import { icons } from "@/constants/icons";
import {
  fetchMovieDetails,
  getTopSearchedMovies,
  increaseMovieSearchCount,
} from "@/services/movieService";
import { useLocalSearchParams } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import playIcon from "./../../assets/icons/play.png";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-medium text-sm">{label}</Text>
    <Text className="text-light-100 font-normal text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const movieDetails = () => {
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const movieData = async () => {
      try {
        setLoading(true);

        const res = await fetchMovieDetails(id.toString());
        // console.log(res);
        setMovie(res);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    movieData();
  }, []);

  useEffect(() => {
    const increaseSearchedTimes = async () => {
      try {
        await increaseMovieSearchCount(id.toString());
      } catch (e) {
        console.log(e);
      }
    };
    increaseSearchedTimes();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          className="w-full h-[550px] object-cover object-center"
        ></Image>

        <View className="flex-row justify-end pr-10 -translate-y-5">
          <View className="w-[40px] h-[40px] bg-white rounded-full justify-center items-center">
            <Image source={playIcon} className="w-[18px] h-[20px]"></Image>
          </View>
        </View>

        <View className="flex-col items-start justify-center -translate-y-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
        </View>

        <View className="px-5 flex-row">
          <View className="flex-row items-center bg-dark-100 px-2.5 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
        </View>

        <View className="px-5 pb-10">
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000,
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <View className="bg-primary">
        <TouchableOpacity
          onPress={() => navigate("/(tabs)")}
          className="bg-[#AB8BFF] mb-7 mx-5 py-[10.5px] rounded-sm justify-center items-center"
        >
          <Text className="text-black font-semibold text-[13px]">
            Visit Homepage
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default movieDetails;
