import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    console.log(toyId);
    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy saved')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy edit', err)
                showErrorMsg('Had issues in toy saving')
            })
    }

    return <section className="edit-container">
        <h2>{toyToEdit._id ? 'Edit' : 'Add'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter toy name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />

            <label htmlFor="price">Price</label>
            <input
                type="number"
                name="price"
                id="price"
                placeholder="Enter toy price..."
                value={toyToEdit.price}
                onChange={handleChange}
            />

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}