import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
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
        <main className=" ">
        
        <img src={`https://robohash.org/${toy._id}?set=set4`} alt="the toy picture" />
        <div className="content-container">
        <h3>price: ${toy.price}</h3>
        <h3 className={toy.inStock ? 'in-stock':'out-of-stock'}>{toy.inStock ? 'In stock!':'Out of stock..'}</h3>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
        cumque tempore, aperiam sed dolorum rem!
      </p>
        </div>
        </main>
        <button><Link to={`/toy`}>Back</Link></button>
    </section>
}