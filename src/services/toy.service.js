
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    
    let Toys
    return storageService.query(STORAGE_KEY)
    .then(toys => {
            Toys = toys
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            if (!filterBy.stock) filterBy.stock = ''
            if (filterBy.sortBy === 'price') toys.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
            if (filterBy.sortBy === 'created') toys.sort((a, b) => parseFloat(a.createdAt) - parseFloat(b.createdAt))
            if (filterBy.sortBy === 'name') toys.sort((a, b) => a.name.localeCompare(b.name))
            if (filterBy.stock === 'inStock') Toys = toys.filter(toy => toy.inStock === true)
            if (filterBy.stock === 'out') Toys = toys.filter(toy => toy.inStock === false)


            const regExp = new RegExp(filterBy.txt, 'i')
            return Toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {

    if (toy._id) {
        console.log('hi');
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy._id = utilService.makeId()
        return storageService.post(STORAGE_KEY, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: utilService.getRandomIntInclusive(20, 180),
        labels: ['On wheels', 'Battery Powered'],
        createdAt: Date.now(),
        inStock: true
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Talking doll', ['Doll', 'Battery Powered', 'Baby']))
        toys.push(_createToy('Dog robot', ['Battery Powered']))
        toys.push(_createToy('Remote control tractor', ['On wheels', 'Battery Powered']))
        toys.push(_createToy('Lego duplo', ['Puzzle', 'Baby'], false))

        utilService.saveToStorage(STORAGE_KEY, toys)
    }
    return toys
}

function _createToy(name, labels, inStock = true) {
    return {
        _id: utilService.makeId(),
        name,
        price: utilService.getRandomIntInclusive(20, 180),
        labels,
        createdAt: 1631031801011,
        inStock

    }
}

const toy = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}

