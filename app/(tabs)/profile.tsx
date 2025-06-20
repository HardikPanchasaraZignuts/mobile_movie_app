import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-light-200 font-semibold">Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
