import React, { useRef, useState } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import avatar from '../assets/images/avatar.jpg';
import calculateAvgRating from '../utils/avgRating';
import Booking from '../components/Booking/Booking';
import useFetch from './../hooks/useFetch'
import { BASE_URL } from './../utils/config'
const TourDetail = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null);

    //fetch data from database

    const { data } = useFetch(`${BASE_URL}/tours/${id}`);
    const tour = Array.isArray(data) ? data[0] : data;

    console.log("Fetched Tour:", tour);

    if (!tour) return <h2>Tour not found</h2>;

    const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = tour;


    const { totalRating, avgRating } = calculateAvgRating(reviews);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const submitHandler = (e) => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;
        alert(`${reviewText}, ${tourRating}`);
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8'>
                        <div className="tour__content">
                            <img src={photo} alt={title} />
                            <div className="tour__info">
                                <h2>{title}</h2>
                                <div className='d-flex align-items-center gap-5'>
                                    <span className='tour__rating d-flex align-items-center gap-1'>
                                        <i className='ri-star-fill' style={{ color: "var(--secondary-color)" }}></i>
                                        {avgRating > 0 && avgRating}
                                        {totalRating === 0 ? ('Not rated') : (<span>({reviews.length})</span>)}
                                    </span>
                                    <span><i className="ri-map-pin-user-fill"></i> {address}</span>
                                </div>
                                <div className="tour__extra-details">
                                    <span><i className="ri-map-pin-2-line"></i> {city}</span>
                                    <span><i className="ri-money-dollar-circle-line"></i> ${price}/per person</span>
                                    <span><i className="ri-map-pin-time-line"></i> {distance} km</span>
                                    <span><i className="ri-group-line"></i> {maxGroupSize}</span>
                                </div>
                                <h5>Description</h5>
                                <p>{desc}</p>
                            </div>

                            {/* Tour Review Section */}
                            <div className="tour__reviews mt-4">
                                <h4>Reviews ({reviews?.length})</h4>
                                <Form onSubmit={submitHandler}>
                                    <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} onClick={() => setTourRating(star)}>
                                                {star} <i className="ri-star-s-fill"></i>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="review__input">
                                        <input type="text" ref={reviewMsgRef} placeholder='Share your thoughts' required />
                                        <button className="btn primary__btn text-white" type='submit'>Submit</button>
                                    </div>
                                </Form>

                                <ListGroup className="user__reviews">
                                    {reviews?.map((review, index) => (
                                        <div key={review.id || index} className='review__item'>
                                            <img src={avatar} alt="User avatar" />
                                            <div className="wid-100">
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <div>
                                                        <h5>Manpreet</h5>
                                                        <p>{new Date('01-01-2024').toLocaleDateString("en-US", options)}</p>
                                                    </div>
                                                    <span className='d-flex align-items-center'>
                                                        {review.rating} <i className="ri-star-s-fill"></i>
                                                    </span>
                                                </div>
                                                <h6 className='pt-1'>{review.reviewText}</h6>
                                            </div>
                                        </div>
                                    ))}
                                </ListGroup>
                            </div>
                        </div>
                    </Col>

                    <Col lg='4'>
                        <Booking tour={tour} avgRating={avgRating} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TourDetail;
