import React, { useState } from "react";
import { View, Image, Dimensions, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@react-native-community/slider";
import { logout } from "store/auth";
import styled from "styled-components/native";
import colors from "assets/colors";
import { API } from "src/constants";
import { authUserSelector } from "store/auth/selectors";

const { width } = Dimensions.get("screen");

const ImageComponent = ({ value }: { value: number }) => {
  const [loading, setLoading] = useState(true);
  Image.prefetch(API.URL_IMAGE).then((e) => setLoading(!e));
  return (
    <ImageContainer>
      {loading ? (
        <ActivityIndicator color={colors.black} />
      ) : (
        <Img value={value} resizeMode="cover" source={{ uri: API.URL_IMAGE }} />
      )}
    </ImageContainer>
  );
};

const Main = () => {
  const [value, setValue] = useState<number>(0.5);
  const dispatch = useDispatch();
  const user = useSelector(authUserSelector);
  return (
    <View>
      <TextId>Id</TextId>
      <Title>{user.id}</Title>
      <ImageComponent value={value} />
      <SliderContainer>
        <SSlider
          value={value}
          minimumValue={0.25}
          maximumValue={1}
          minimumTrackTintColor={colors.red500}
          thumbTintColor={colors.red500}
          onValueChange={setValue}
        />
      </SliderContainer>
      <Touchable onPress={() => dispatch(logout())}>
        <View>
          <TextLogout>LOGOUT</TextLogout>
        </View>
      </Touchable>
    </View>
  );
};

export default Main;

const SSlider = styled(Slider)`
  width: ${width - 10}px;
`;

const ImageContainer = styled.View`
  width: ${width}px;
  height: ${width}px;
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.View`
  margin: 40px 0;
  justify-content: center;
  align-items: center;
`;

const TextId = styled.Text`
  font-size: 14px;
  color: ${colors.black};
  padding-left: 20px;
`;

const Title = styled.Text`
  font-size: 21px;
  font-weight: 500;
  padding: 10px 20px;
  color: ${colors.black};
`;

const Touchable = styled.TouchableOpacity`
  height: 40px;
  margin: 0 20px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.green500};
`;

const TextLogout = styled.Text`
  font-size: 18px;
  color: ${colors.white};
`;

const Img = styled(Image).attrs(() => ({
  resizeMode: "cover",
}))`
  width: ${({ value }: { value: number }) => (width - 40) * value}px;
  height: ${({ value }: { value: number }) => (width - 40) * value}px;
`;
