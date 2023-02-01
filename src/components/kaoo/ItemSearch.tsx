import {Searchbar} from "react-native-paper";
import {updateSearch} from "../../slices/kaoo";
import {useDispatch, useSelector} from "../../store";
import {useState} from "react";

export default function ItemSearch() {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.kaoo.search);

    const onChangeSearch = (query: string) => {
        dispatch(updateSearch(query));
    };

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={search ?? ''}
            style={{ margin: 10 }}
        />
    );
}
