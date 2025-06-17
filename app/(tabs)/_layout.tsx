import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabBarIcon = ({ focused, title, icon }: any) => {
  return (
    <>
      {focused ? (
        <ImageBackground
          className=" mt-4 flex flex-row justify-center items-center w-full min-w-[112] min-h-16 rounded-full overflow-hidden"
          source={images.highlight}
        >
          <Image source={icon} className="size-5" tintColor="#151312" />
          <Text className="text-secondary text-base font-semibold ml-2">
            {title}
          </Text>
        </ImageBackground>
      ) : (
        <View className="size-full justify-center items-center mt-4 rounded-full">
          <Image source={icon} className="size-5" tintColor="#A8B5DB" />
        </View>
      )}
    </>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          marginBottom: 36,
          borderRadius: 50,
          marginHorizontal: 15,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Home" icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Search" icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Saved" icon={icons.save} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Profile" icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
