import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { reviewService } from "../services/review.service.js"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ChatRoom } from "../cmp/ChatRoom.jsx"



export function ToyDetails() {
    const [review, setReview] = useState(utilService.getEmptyReview())
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (toyId) loadToy()
        loadReviews()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }
    async function loadReviews() {
        try {
            // Create a filter object with both aboutToyId and additional filters
            // const filter = { name: 'exampleFilter', sort: 'exampleSort' };

            // Fetch reviews based on aboutToyId and additional filters
            const reviews = await reviewService.query({ aboutToyId: toyId });
            setReviews(reviews);
        } catch (err) {
            console.log('Had issues loading reviews', err);
            showErrorMsg('Cannot load reviews');
        }
    }

    function handleReviewChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReview((review) => ({ ...review, [field]: value }))
    }

    async function onSaveReview(ev) {
        ev.preventDefault()

        try {

            const savedReview = await reviewService.add({ txt: review.txt, aboutToyId: toy._id })
            setReviews(prevReviews => [savedReview, ...prevReviews]);
            setReview(utilService.getEmptyReview())
            showSuccessMsg('Review saved!')
        } catch (err) {
            console.log('error saving the review :', err)
        }
    }

    async function onRemoveReview(reviewId) {
        try {
            await reviewService.remove(reviewId)
            setReviews(prev => prev.filter(r => r._id !== reviewId))
            showSuccessMsg('Review removed!')
        } catch (err) {
            console.log('problem with removing review', err)
        }
    }

    const txtR = review.txt
    if (!toy) return <div>Loading...</div>
    return <section className="details-container">
        <h1>{toy.name}</h1>
        <main className=" ">

            <img src={`https://robohash.org/${toy._id}?set=set4`} alt="the toy picture" />
            <div className="content-container">
                <h3>price: ${toy.price}</h3>
                <h3 className={toy.inStock ? 'in-stock' : 'out-of-stock'}>{toy.inStock ? 'In stock!' : 'Out of stock..'}</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
                    cumque tempore, aperiam sed dolorum rem!
                </p>
            </div>
        </main>
        <section className="reviews">
                <h5 className="toy-description-heading">Reviews</h5>
                <ul>
                    {!!reviews.length && reviews.map((review) => (
                        <li key={review._id}>
                            By: {review.byUser.fullname}, {review.txt} {/* Use user.fullname here */}
                            <button type="button" onClick={() => onRemoveReview(review._id)}>
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>

                <form className="login-form" onSubmit={onSaveReview}>
                    <input
                        type="text"
                        name="txt"
                        value={txtR}
                        placeholder="Write a Review"
                        onChange={handleReviewChange}
                        required
                    />
                    <button>Submit Review</button>
                </form>

            </section>
        <button><Link to={`/toy`}>Back</Link></button>
        <ChatRoom toyId={toyId}/>
    </section>
}