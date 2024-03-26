import { useEffect } from "react";
import { useSelector } from "react-redux"

import { loadToys, removeToyOptimistic } from "../store/actions/toy.actions.js";
import { ToyList } from "../cmp/ToyList.jsx";
import { ToyEdit } from "./ToyEdit.jsx";
import { Link } from "react-router-dom";


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys().catch(err => {
            console.log('cannot load toys');
        })
    }, [])

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
        <main>
            <ToyList
                onRemoveToy={onRemoveToy}
                toys={toys} />
        </main>
    </section>
}