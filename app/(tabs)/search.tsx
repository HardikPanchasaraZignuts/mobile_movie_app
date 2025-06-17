import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSetsearchQuery] = useState("");

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const fethcMovies = async () => {
        if (searchQuery.trim()) {
          await loadMovies();
        } else {
          reset();
        }
      };

      fethcMovies();
    }, 300);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0])
      updateSearchCount(searchQuery, movies[0]);
  },[movies])

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <View className="mx-5">
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            marginBottom: 20,
          }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListHeaderComponent={
            <>
              <View className="w-full justify-center items-center mt-20">
                <Image source={icons.logo} className="w-12 h-10" />
              </View>

              <View className="my-5">
                <SearchBar
                  placeholder=""
                  value={searchQuery}
                  onChangeText={(text: string) => setSetsearchQuery(text)}
                />
              </View>

              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="my-3"
                />
              )}

              {error && (
                <Text className="text-red-500 my-3">
                  Error; {error.message}
                </Text>
              )}

              {!loading &&
                !error &&
                searchQuery.trim() &&
                movies?.length! > 0 && (
                  <Text className="text-xl text-white font-bold mb-3">
                    Search Result for{" "}
                    <Text className="text-accent">{searchQuery}</Text>
                  </Text>
                )}
            </>
          }
          ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim()
                    ? "No movies found"
                    : "Start typing to search for movies"}
                </Text>
              </View>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default Search;
