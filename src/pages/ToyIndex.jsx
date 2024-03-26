import { useEffect } from "react";
import { useSelector } from "react-redux"

import { loadToys } from "../store/actions/toy.actions.js";
import { ToyList } from "../cmp/ToyList.jsx";


export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(()=>{
        loadToys().catch(err=>{
            console.log('cannot load toys');
        })
    },[])


    console.log(toys);
    return <section className="toy-index-container">
        <h3> Toys </h3>
        <main>
            <ToyList toys={toys}/>
        </main>
    </section>
}