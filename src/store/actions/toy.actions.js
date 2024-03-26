
// import { showSuccessMsg } from "../../services/event-bus.service.js";
import { toyService } from "../../services/toy.service.js";
import { ADD_TOY, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys() {
    return toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
}

// export function removeCar(carId) {
//     return carService.remove(carId)
//         .then(() => {
//             store.dispatch({ type: REMOVE_CAR, carId })
//         })
//         .catch(err => {
//             console.log('car action -> Cannot remove car', err)
//             throw err
//         })
// }

// export function removeCarOptimistic(carId) {
//     store.dispatch({ type: REMOVE_CAR, carId })
//     return carService.remove(carId)
//         .then(() => {
//             showSuccessMsg('Removed Car!')
//         })
//         .catch(err => {
//             store.dispatch({ type: CAR_UNDO })
//             console.log('car action -> Cannot remove car', err)
//             throw err
//         })
// }

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

// export function setFilterBy(filterBy) {
//     store.dispatch({ type: SET_FILTER_BY, filterBy })
// }