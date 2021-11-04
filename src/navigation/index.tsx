import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ROUTES } from "src/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "assets/colors";
import Drops from "screens/Drops";
import Detail from "screens/Detail";

export type RootStackParamList = {
  [ROUTES.DROPS]: {
    id: string;
  };
  [ROUTES.DETAIL]: {
    id: string;
  };
};

export type PropsDrops = NativeStackScreenProps<RootStackParamList, ROUTES.DROPS>;
export type PropsDetail = NativeStackScreenProps<RootStackParamList, ROUTES.DETAIL>;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <SSafeAreaView edges={["top", "bottom"]}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Group screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name={ROUTES.DROPS} component={Drops} />
            <Stack.Screen name={ROUTES.DETAIL} component={Detail} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SSafeAreaView>
  );
};

const SSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.white};
`;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

export default RootNavigator;
