import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

import { loadToys, removeToyOptimistic, setFilterBy, setSortBy } from "../store/actions/toy.actions.js";
import { ToyList } from "../cmp/ToyList.jsx";
import { ToyFilter } from "../cmp/ToyFilter.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)

    useEffect(() => {
        loadToys(filterBy,sortBy).catch(err => {
            console.log('cannot load toys');
        })
    }, [filterBy,sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sort) {
        setSortBy(sort)
    }


    function onRemoveToy(toyId) {
        console.log(toyId);
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    console.log(toys);
    return <section className="toy-index-container">
        <h3> Toys </h3>
        <Link to='/toy/edit'>Add toy</Link>
        <ToyFilter
        filterBy={filterBy}
        onSetFilter={onSetFilter}
        sortBy={sortBy}
        onSetSort={onSetSort}
        />
        <main>
            <ToyList
                onRemoveToy={onRemoveToy}
                toys={toys} />
        </main>
    </section>
}