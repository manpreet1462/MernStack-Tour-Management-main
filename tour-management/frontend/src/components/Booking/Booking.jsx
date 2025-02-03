import React, { useState, useContext, useEffect } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
const Booking = ({ tour, avgRating }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const { price, reviews, title } = tour;
    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });
    // Function to update state
    const handleChange = (e) => {
        const { id, value } = e.target;
        setBooking(prev => ({
            ...prev,
            [id]: id === 'guestSize' ? parseInt(value, 10) || 1 : value
        }));
    };

    const serviceCharge = 10;
    const totalPrice = price * booking.guestSize + serviceCharge;

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!user || user === undefined || user === null) {
                return alert('Please sign in')
            }
            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(booking)
            })
            const result = await res.json()
            if (!res.ok) {
                return alert(result.message)
            }
            navigate('/thank-you');

        } catch (error) {
            alert(error.message)
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='booking'>
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>${price} <span>/per person</span></h3>
                <span className='tour__rating d-flex align-items-center'>
                    <i className='ri-star-s-fill'></i>
                    {avgRating > 0 ? avgRating : 'Not Rated'} ({reviews?.length})
                </span>
            </div>

            {/* Booking Form */}
            <div className="booking__form">
                <h5>Information</h5>
                <Form className="booking__info-form" onSubmit={handleSubmit}>
                    <FormGroup>
                        <input
                            type="text"
                            placeholder='Full Name'
                            id='fullName'
                            aria-label='Full Name'
                            required
                            onChange={handleChange}
                            value={booking.fullName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="number"
                            placeholder='Phone'
                            id='phone'
                            aria-label='Phone Number'
                            required
                            min="1"
                            onChange={handleChange}
                            value={booking.phone}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input
                            type="date"
                            id='bookAt'
                            aria-label='Booking Date'
                            required
                            onChange={handleChange}
                            value={booking.bookAt}
                        />
                        <input
                            type="number"
                            placeholder='Guests'
                            id='guestSize'
                            aria-label='Number of Guests'
                            required
                            min="1"
                            onChange={handleChange}
                            value={booking.guestSize}
                        />
                    </FormGroup>
                    <Button type="submit" className='btn primary__btn w-100 mt-4'>Book Now</Button>
                </Form>
            </div>

            {/* Booking Summary */}
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className='d-flex align-items-center gap-1'>
                            ${price} <i className="ri-close-line"></i> {booking.guestSize} person(s)
                        </h5>
                        <span>${price * booking.guestSize}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0">
                        <h5>Service charge</h5>
                        <span>${serviceCharge}</span>
                    </ListGroupItem>
                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>${totalPrice}</span>
                    </ListGroupItem>
                </ListGroup>
            </div>
        </div>
    );
};

export default Booking;
