import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { MultiSelect } from "../cmp/MultiSelect.jsx"
import { TextField, colors } from "@mui/material"
import { palette } from '@mui/system';


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
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
        console.log(target);
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSetLabel(label) {
        // const labels = toyToEdit.labels.includes(label) ? toyToEdit.labels.filter(l => l !== label) : [label, ...toyToEdit.labels]
        setToyToEdit(prevToy => ({ ...prevToy, labels: label }))
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

    const uploadImg = async (ev) => {
        //Defining our variables
        // const CLOUD_NAME = 'insert1'
        const CLOUD_NAME = 'dobrmrt0g'
        const UPLOAD_PRESET = 'toy_uploads'
        // const UPLOAD_PRESET = 'insert2'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const FORM_DATA = new FormData()
        console.log(ev);
        //Bulding the request body
        FORM_DATA.append('file', ev.target.files[0])
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)

        // Sending a post method request to Cloudinarys API

        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA,
            })
            const elImg = document.createElement('img')
            const { url } = await res.json()
            toyToEdit.url = url
            document.body.append(elImg)
        } catch (err) {
            console.error(err)
        }
    }
    if (!toyToEdit) return <div>loading...</div>
    return <section className="edit-container">
        <h2>{toyToEdit._id ? 'Edit' : 'Add'}</h2>

        <form onSubmit={onSaveToy}>
            <div className="input">
                <TextField
                    id="outlined-basic"
                    label="Enter toy name..."
                    name="name"
                    variant="outlined"
                    value={toyToEdit.name}
                    onChange={handleChange}
                    color="success"
                />
            </div>
            <div className="input">
                <TextField
                    id="outlined-basic"
                    label="Enter toy price..."
                    variant="outlined"
                    name="price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                    color="success"
                />
            </div>
            {/* <label htmlFor="name">Name</label>
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


            /> */}
            {(toyId && toyToEdit.labels.length || !toyId) ? <MultiSelect onSetLabel={onSetLabel} toyToEdit={toyToEdit} /> : <div>loading..</div>
            }
            {/* <label> Upload your image to</label> */}
            <input className="img-input" onChange={uploadImg} type="file" />

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}