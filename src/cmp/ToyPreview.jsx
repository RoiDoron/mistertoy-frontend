import { Link } from "react-router-dom";



export function ToyPreview({toy,onRemoveToy}){

    return (
        <article>
            <button className="fa-regular fa-trash-can" onClick={()=>onRemoveToy(toy._id)}></button>
            <img src={`https://robohash.org/${toy._id}?set=set4`} alt="the toy picture" />
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}