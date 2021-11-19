import React, { createRef } from "react";
import { DefaultTheme, NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import styled from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "src/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "assets/colors";
import Main from "screens/Main";
import Login from "screens/SignIn";
import { authUserSelector } from "store/auth/selectors";
import { useSelector } from "react-redux";

export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.MAIN]: undefined;
};

export const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const user = useSelector(authUserSelector);
  return (
    <SSafeAreaView edges={["top", "bottom"]}>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }}>
          {Boolean(user.id) ? (
            <Stack.Screen name={ROUTES.MAIN} component={Main} />
          ) : (
            <Stack.Screen name={ROUTES.LOGIN} component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SSafeAreaView>
  );
};

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.current) {
    params ? navigationRef.current.navigate(name, params) : navigationRef.current.navigate(name);
  } else {
    console.log("You can decide what to do if the app hasn't mounted");
  }
}

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
