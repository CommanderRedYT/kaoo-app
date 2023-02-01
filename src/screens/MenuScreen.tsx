import {Box, Button, Text} from "@react-native-material/core";
import {StyledScrollView, StyledView} from "../style";
import {Searchbar, useTheme} from "react-native-paper";
import {useDispatch, useSelector} from "../store";
import GoodCategory from "../components/kaoo/GoodCategory";
import {updateSearch} from "../slices/kaoo";
import {useState} from "react";
import {View} from "react-native";
import ItemSearch from "../components/kaoo/ItemSearch";

export default function MenuScreen({ navigation }) {
    const theme = useTheme();
    const categories = useSelector((state) => state.kaoo.goods);

    console.log("MenuScreen render")

    return (
        <StyledView theme={theme}>
            <Box style={{ flex: 1, alignSelf: 'stretch' }}>
                <ItemSearch />
                <StyledScrollView theme={theme} style={{ margin: 10, flex: 1 }}>
                    {categories && categories.map((category) => (
                        <GoodCategory key={category.id} category={category} />
                    ))}
                </StyledScrollView>
            </Box>
        </StyledView>
    );
}
