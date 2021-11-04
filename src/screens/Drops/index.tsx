import React, { useEffect } from "react";
import { View, Image, Dimensions, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getList, setActiveType } from "store/list";
import { ListItem } from "store//list/types";
import styled from "styled-components/native";
import colors from "assets/colors";
import { useShadowStyle } from "assets/shadows";
import { ROUTES } from "src/constants";
import { activeTypeSelector, cachedListOfTypesSelector, cachedListSelector } from "store/list/selectors";
import { PropsDrops } from "src/navigation";

const { width } = Dimensions.get("window");

const ListTypes = () => {
  const dispatch = useDispatch();
  const activeType = useSelector(activeTypeSelector);
  const listOfTypes = useSelector(cachedListOfTypesSelector);
  return (
    <SScrollView horizontal showsHorizontalScrollIndicator={false}>
      {listOfTypes.map((e: string, index: number) => (
        <TouchableType key={index} active={activeType === e} onPress={() => dispatch(setActiveType(e))}>
          <TextType active={activeType === e}>{e}</TextType>
        </TouchableType>
      ))}
    </SScrollView>
  );
};

const Drops = ({ navigation }: PropsDrops) => {
  const dispatch = useDispatch();
  const shadow = useShadowStyle(2);
  const list = useSelector(cachedListSelector);
  const renderItem = ({ item }: { item: ListItem }) => {
    const handlePressNav = () => navigation.navigate(ROUTES.DETAIL, { id: item.id });
    return (
      <TouchableItem style={shadow} heroColour={item.heroColour} activeOpacity={1} onPress={handlePressNav}>
        <View>
          <Img source={{ uri: item.heroImage }} />
          <Description>{item.label}</Description>
        </View>
      </TouchableItem>
    );
  };
  useEffect(() => {
    dispatch(getList());
  }, []);
  return (
    <View>
      <Title>Drops</Title>
      <ListTypes />
      <FlatList
        initialNumToRender={10}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={list}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Drops;

const SScrollView = styled.ScrollView`
  margin: 20px 0;
`;

const Description = styled.Text`
  font-size: 18px;
  line-height: 21px;
  text-align: center;
`;

const Title = styled.Text`
  font-size: 28px;
  line-height: 32px;
  font-weight: 700;
  padding: 10px 20px;
`;

const TouchableType = styled.TouchableOpacity`
  margin-left: 20px;
  margin-right: 20px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ active }: { active: boolean }) => (active ? colors.tlBlue400 : colors.white)};
`;

const TextType = styled.Text`
  font-size: 18px;
  line-height: 21px;
  text-transform: capitalize;
  color: ${({ active }: { active: boolean }) => (active ? colors.tlBlue400 : colors.primary400)};
`;

const TouchableItem = styled.TouchableOpacity`
  width: ${width - 40}px;
  height: ${width}px;
  background-color: ${({ heroColour }: { heroColour: string }) => heroColour || colors.white};
  border-radius: 18px;
  padding: 20px;
  margin: 20px 20px 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled(Image).attrs(() => ({
  resizeMode: "contain",
}))`
  width: ${width - 80}px;
  height: ${width - 80}px;
`;
