import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMoviewDetails } from "@/services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="item-center justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMoviewDetails(id as string)
  );
  console.log("🚀 ~ MovieDetails ~ movie:", movie);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full bg-white size-14 flex justify-center items-center">
            <Image source={icons.play}
            className="w-6 h-7 ml-1"
            />
          </TouchableOpacity>
        </View>
        <View className="items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl"> {movie?.title}</Text>
          <View className="flex-row item-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-"[0])} •
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime} m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.vote_count} votes
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g : any) => g.name).join(" • ") || "N/A"}
          />
          <View className="flex-row justify-between w-3/4">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 100000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue ?? 0) / 100000} million`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c : any) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={router.back} className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex-row justify-center items-center gap-x-2 " >
        <Image source={icons.arrow} tintColor="#000" className="size-5 rotate-180" />
        <Text className="font-bold text-base" >Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
