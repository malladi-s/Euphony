import 'whatwg-fetch';
import { decrementLoader, incrementLoader } from './loader';
import { clearError } from './error';

// Action Creators
export const albumSearchClear = () => ({ type: 'MUSIC_ALBUM_SEARCH_CLEAR' });
export const albumSearchFailure = error => ({ type: 'MUSIC_ALBUM_SEARCH_FAILURE', error });
export const albumSearchSuccess = json => ({ type: 'MUSIC_ALBUM_SEARCH_SUCCESS', json });

export function searchAlbums(searchText) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementLoader());

        // Build packet to send to Discogs API
        const searchQuery = {
            q: searchText,
            type: 'master',
            format: 'album',
        };

        // Send packet to our API, which will communicate with Discogs
        await fetch(
            '/api/albums/search',
            {
                method: 'POST',
                body: JSON.stringify(searchQuery),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then((json) => {
                if (json.results) {
                    return dispatch(albumSearchSuccess(json));
                }
                return dispatch(albumSearchFailure(new Error(json.error)));
            })
            .catch(error => dispatch(albumSearchFailure(new Error(error))));

        // turn off spinner
        return dispatch(decrementLoader());
    };
}