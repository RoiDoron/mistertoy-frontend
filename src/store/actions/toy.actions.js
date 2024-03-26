
// import { showSuccessMsg } from "../../services/event-bus.service.js";
import { toyService } from "../../services/toy.service.js";
import { SET_TOYS } from "../reducers/toy.reducer.js";
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

// export function saveCar(car) {
//     const type = car._id ? UPDATE_CAR : ADD_CAR
//     return carService.save(car)
//         .then(savedCar => {
//             store.dispatch({ type, car: savedCar })
//             return savedCar
//         })
//         .catch(err => {
//             console.log('car action -> Cannot save car', err)
//             throw err
//         })
// }

// export function setFilterBy(filterBy) {
//     store.dispatch({ type: SET_FILTER_BY, filterBy })
// }