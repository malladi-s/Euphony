import 'whatwg-fetch';
import { decrementLoader, incrementLoader } from './loader';
import { clearError } from './error';

export const artistAddFailure = error => ({ type: 'MUSIC_ARTIST_ADD_FAILURE', error });
export const artistAddSuccess = json => ({ type: 'MUSIC_ARTIST_ADD_SUCCESS', json });
export const artistDeleteFailure = error => ({ type: 'MUSIC_ARTIST_DELETE_FAILURE', error });
export const artistDeleteSuccess = json => ({ type: 'MUSIC_ARTIST_DELETE_SUCCESS', json });
export const artistSearchClear = () => ({ type: 'MUSIC_ARTIST_SEARCH_CLEAR' });
export const artistSearchFailure = error => ({ type: 'MUSIC_ARTIST_SEARCH_FAILURE', error });
export const artistSearchSuccess = json => ({ type: 'MUSIC_ARTIST_SEARCH_SUCCESS', json });
export const artistsPopulateFailure = error => ({ type: 'MUSIC_ARTISTS_POPULATE_FAILURE', error });
export const artistsPopulateSuccess = json => ({ type: 'MUSIC_ARTISTS_POPULATE_SUCCESS', json });

// Add an Artist
export function addArtist(id) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementLoader());

        // Send packet to our API, which will communicate with Discogs
        await fetch(
            // where to contact
            '/api/artists/add',
            // what to send
            {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        ).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        }).then((json) => {
            if (json.email) {
                return dispatch(artistAddSuccess(json));
            }
            return dispatch(artistAddFailure(new Error(json.error)));
        }).catch(error => dispatch(artistAddFailure(new Error(error))));

        // turn off spinner
        return dispatch(decrementLoader());
    };
}

// Delete an artist from user's list
export function deleteArtist(artistId) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementLoader());

        // Hit the API
        await fetch(
            '/api/artists/delete',
            {
                method: 'POST',
                body: JSON.stringify({ artistId }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        ).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        }).then((json) => {
            if (!json.error) {
                dispatch(populateArtists(json.artists)); // eslint-disable-line
            }
            return json;
        }).then((json) => {
            if (!json.error) {
                return dispatch(artistDeleteSuccess(json));
            }
            return dispatch(artistDeleteFailure(new Error(json.error)));
        }).catch(error => dispatch(artistDeleteFailure(new Error(error))));

        // turn off spinner
        return dispatch(decrementLoader());
    };
}


// Search Artists
export function searchArtists(searchText) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());


        dispatch(incrementLoader());

        const searchQuery = {
            q: searchText,
            type: 'artist',
        };

        // Send packet to our API, which will communicate with Discogs
        await fetch(
            // where to contact
            '/api/artists/search',
            // what to send
            {
                method: 'POST',
                body: JSON.stringify(searchQuery),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        ).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        }).then((json) => {
            if (json.results) {
                return dispatch(artistSearchSuccess(json));
            }
            return dispatch(artistSearchFailure(new Error(json.error)));
        }).catch(error => dispatch(artistSearchFailure(new Error(error))));

        // turn off spinner
        return dispatch(decrementLoader());
    };
}

// Populate Artist data
export function populateArtists(artists) {
    return async (dispatch) => {
        // clear the error box if it's displayed
        dispatch(clearError());

        // turn on spinner
        dispatch(incrementLoader());

        await fetch(
            '/api/artists/populate',
            {
                method: 'POST',
                body: JSON.stringify(artists),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            },
        ).then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            return null;
        }).then((json) => {
            if (!json.error) {
                return dispatch(artistsPopulateSuccess(json));
            }
            return dispatch(artistsPopulateFailure(new Error(json.error)));
        }).catch(error => dispatch(artistsPopulateFailure(new Error(error))));

        // turn off spinner
        return dispatch(decrementLoader());
    };
}