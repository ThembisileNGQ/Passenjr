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
            maxItineraries: maxItineraries
        }


        var headers = formatHeader(jwt)
        axios.defaults.headers = headers
        axios.post(`${urls.TRANSITAPI_URL}/journeys`,{...journeyQuery})
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

        //console.log(geometry);
    }
}