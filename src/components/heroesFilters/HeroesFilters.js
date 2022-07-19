
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchFilters, activeFilterChanged, selectAll} from "./filtersSlice";
import classNames from "classnames";
import Spinner from "../spinner/Spinner";
import store from "../../store";

const HeroesFilters = () => {

    const filters = selectAll(store.getState());
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === 'loading ') {
        return <Spinner />;
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilter = (filters) => {
        if (filters.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        } else if (filters && filters.length > 0) {
            return filters.map(({name, label, className}) => {
                const btnClass = classNames('btn', className, {
                    'active': name === activeFilter
                });
                return <button key={name} id={name} className={btnClass} onClick={() => dispatch(activeFilterChanged(name))}>{label}</button>
            })
        }
    }

    const elements = renderFilter(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;