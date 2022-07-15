import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice';
import {filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged} from "../components/heroesFilters/filtersSlice";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());                                          //instead of dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}




// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filter
//         })
//     }, 1000);
// }