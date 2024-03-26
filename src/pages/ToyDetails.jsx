import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const {toyId} = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details')
                Navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className="details-container">
        <h1>{toy.name}</h1>
        <h5>price: ${toy.price}</h5>
        <h5>{toy.inStock ? 'In stock!':'Out of stock !'}</h5>
    </section>
}