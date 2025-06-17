import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import "../global.css";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  return (
    <View className="flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="h-10 w-12 mx-auto mt-20 mb-5 " />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : moviesError || trendingMoviesError ? (
          <Text>
            Error : {moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <>
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search through 300+ movies online"
              />

              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-white font-bold text-lg mb-3 mt-5">
                    trending Movies
                  </Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={trendingMovies}
                    contentContainerStyle={{
                      gap: 26,
                    }}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}

              <>
                <Text className="text-white font-bold text-lg mb-3 mt-5">
                  Latest Movies
                </Text>
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
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
