import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'
import { Link } from 'expo-router';

const MovieCard = ({
    id,
    poster_path,
    title,
    vote_average,
    release_date,
}: Movie) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className="w-[32%]">
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    className="w-full h-[150px] rounded-md"
                    resizeMode="cover"
                />

                <Text className="text-sm font-bold text-white mt-3 tracking-wide" numberOfLines={1}>
                    {title}
                </Text>

                <View className="flex-row items-center justify-start gap-x-1 mt-2">
                    <Image source={icons.star} className="size-3.5" />
                    <Text className="text-xs text-white/80 font-semibold uppercase">
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between mt-1">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {release_date?.split("-")[0]}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;