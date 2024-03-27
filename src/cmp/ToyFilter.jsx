import { useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"



export function ToyFilter({ filterBy, onSetFilter,onSetSort,sortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])
 
    function handleToggleDirection() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        console.log("🚀 ~ file: ToySort.jsx:12 ~ handleToggleDirection ~ updatedSort:", updatedSort)
        onSetSort(updatedSort)
    }


    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if(field === 'sortBy'){
            const updateSort = {...sortBy,by:value}
            onSetSort(updateSort)
            
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <select onChange={handleChange}  name="sortBy" id="">
                    <option value="">Sort</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created</option>
                </select>
                <select onChange={handleChange}  name="stock" id="">
                    <option value="">Stock</option>
                    <option value="inStock">In stock</option>
                    <option value="out">Out of stock</option>
                </select>
            </form>
                <button onClick={handleToggleDirection}>Change direction {sortBy.asc ? '^' : 'v'}</button>

        </section>
    )
}