import { httpService } from "./http.service.js"
import { utilService } from "./util.service.js"


const BASE_URL = 'toy/'


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultFilterBy,
    getDefaultSort
}

function query(filterBy ,sort) {
    console.log(filterBy);
    
    return httpService.get(BASE_URL, { params: { filterBy, sort } })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL+toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: utilService.getRandomIntInclusive(20, 180),
        labels: [],
        createdAt: Date.now(),
        inStock: true
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function getDefaultFilterBy() {
    return {
        txt: '',
        maxPrice: Infinity,
        labels: [],
        inStock: null
    }
}

function getDefaultSort() {
    return {
        // 
        by: 'name',
        asc: true
    }
}


