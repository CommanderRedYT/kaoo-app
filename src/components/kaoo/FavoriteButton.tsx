import FontAwesome from 'react-native-vector-icons/FontAwesome';
import type { Good } from '@src/models/kaoo';
import { DisplayFilter } from '@src/models/kaoo';
import { IconButton } from 'react-native-paper';
import { toggleFavorite } from '@src/slices/settings';
import { saveSettings } from '@src/utils/settings';
import { useDispatch, useSelector } from '@src/store';

export default function FavoriteButton({ good }: { good: Good }) {
    const dispatch = useDispatch();

    const isFavorite = useSelector(state =>
        state.settings.favorites.includes(good.id),
    );
    const filter = useSelector(state => state.kaoo.filter);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(good.id));
        saveSettings();
    };

    return (
        <IconButton
            icon={() => (
                <FontAwesome
                    name={isFavorite ? 'heart' : 'heart-o'}
                    size={20}
                    color={
                        filter === DisplayFilter.ALL
                            ? isFavorite
                                ? '#ec3939'
                                : 'rgba(94,94,94,1)'
                            : isFavorite
                            ? 'rgba(236,57,57,0.3)'
                            : 'rgba(94,94,94,0.3)'
                    }
                    disabled={filter !== DisplayFilter.ALL}
                />
            )}
            onPress={handleToggleFavorite}
            disabled={filter !== DisplayFilter.ALL}
        />
    );
}
