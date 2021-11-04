import React, { useEffect, useState } from "react";
import { View, Image, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { AxiosResponse } from "axios";
import { api } from "store/api";
import styled from "styled-components/native";
import colors from "assets/colors";
import BellIcon from "assets/icons/bell.png";
import ShareIcon from "assets/icons/share_01.png";
import { ListItemDetail } from "store/list/types";
import { PropsDetail } from "src/navigation";

const { width } = Dimensions.get("window");

const Detail = ({ navigation, route }: PropsDetail) => {
  const [item, setItem] = useState<ListItemDetail>({} as ListItemDetail);
  const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
  const fetchById = async (id: string) => {
    try {
      const response: AxiosResponse = await api.get(`assets/${id}`);
      setItem(response.data.data);
    } catch (e) {
      console.warn(e);
    }
  };
  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: {
        contentOffset: { x },
      },
    } = e;
    setCurrentScreenIndex(parseInt((x / width).toString(), 10));
  };
  useEffect(() => {
    if (route.params.id) {
      fetchById(route.params.id);
    }
  }, [route]);
  return (
    <View>
      <Header>
        <BackTouchable onPress={() => navigation.goBack()}>
          <Back source={ShareIcon} />
        </BackTouchable>
        <NotifView>
          <Image source={ShareIcon} />
          <Bell source={BellIcon} />
        </NotifView>
      </Header>
      <DescriptionView>
        <Description>{item.label}</Description>
      </DescriptionView>
      <View>
        <ScrollView
          scrollEventThrottle={5}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}>
          {item.assetGallery?.map((e, index) => (
            <Img key={index} source={{ uri: e.url }} />
          ))}
        </ScrollView>
        <Dots>
          {item.assetGallery?.map((e, index) => (
            <Dot key={index} active={currentScreenIndex === index} />
          ))}
        </Dots>
      </View>
    </View>
  );
};

export default Detail;

const NotifView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const BackTouchable = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;

const Back = styled(Image)`
  transform: rotate(270deg);
`;

const Bell = styled(Image)`
  margin-left: 10px;
`;

const DescriptionView = styled.View`
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  padding: 0 20px;
  height: 30px;
`;

const Description = styled.Text`
  font-size: 24px;
  line-height: 28px;
  font-weight: 600;
`;

const Dots = styled.View`
  position: absolute;
  justify-content: center;
  bottom: 10px;
  flex-direction: row;
  left: 0;
  right: 0;
`;

const Dot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-right: 4px;
  background-color: ${({ active }: { active: string }) => (active ? colors.primary400 : colors.white)};
`;

const Img = styled(Image).attrs(() => ({
  resizeMode: "cover",
}))`
  width: ${width}px;
  height: ${width}px;
`;
