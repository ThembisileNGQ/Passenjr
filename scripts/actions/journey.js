import axios from 'axios';
import GeoJSON from 'geojson';

import * as urls from '../constants/Urls';
import * as types from '../constants/ActionTypes';

import { formatHeader } from '../utils/TransitApiUtils';

export function fetchJourney(query) {
    return function (dispatch) {
        dispatch({type: types.FETCH_JOURNEY})


        const jwt = sessionStorage.getItem('jwt');

        //TODO replace with GeoJSON parser
        var geometryQuery = {
            type: 'MultiPoint',
            coordinates: [
                query.departureLocation,
                query.arrivalLocation,                
            ]
        }

        var maxItineraries = 3;

        var journeyQuery = {
            geometry: geometryQuery,
            maxItineraries: maxItineraries,
            time: '2016-11-23T16:39:48Z' //for testing
        }


        var headers = formatHeader(jwt)
        axios.defaults.headers = headers
        axios.post(`${urls.TRANSITAPI_URL}/journeys`,{...journeyQuery})
            .then((response) => {
                dispatch({type: types.FETCH_JOURNEY_FULFILLED, payload: response.data})

            })
            .catch((err) => {
                dispatch({type: types.FETCH_JOURNEY_REJECTED})
                console.log(err)
            })

    }
}