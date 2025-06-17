import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600*400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
        />

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-sm font-bold text-white mt-2 "
        >
          {title}
        </Text>
        <View className="flex-row items-center gap-x-1 mt-2">
          <Image source={icons.star} />
          <Text className="text-sm font-bold text-white uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <Text className="text-xs font-medium text-white mt-2">
          Action . Movie
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
