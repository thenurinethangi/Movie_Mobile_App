import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ImageBackground, Text, Image, View } from 'react-native';

import highlight from './../../assets/images/highlight.png'
import { icons } from '@/constants/icons';

export default function TabLayout() {

  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: {
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0F0D23',
          borderRadius: 50,
          marginHorizontal: 15,
          marginBottom: 25,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => <TabIcon focused={focused} icon={icons.home} title={'Home'} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => <TabIcon focused={focused} icon={icons.search} title={'Search'} />,
        }}
      />

      <Tabs.Screen
        name="save"
        options={{
          title: 'Save',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => <TabIcon focused={focused} icon={icons.save} title={'Save'} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: () => null,
          tabBarIcon: ({ color, focused }) => <TabIcon focused={focused} icon={icons.person} title={'Profile'} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <ImageBackground
        source={highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}