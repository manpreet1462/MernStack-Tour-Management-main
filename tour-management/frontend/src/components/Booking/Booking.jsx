import React, { useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const Booking = ({ tour, avgRating }) => {
    const [credentials, setCredentials] = useState({
        userId: '01',
        userEmail: 'example@gmail.com',
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });
    const navigate = useNavigate();

    // Function to update state
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [id]: id === 'guestSize' ? parseInt(value, 10) || 1 : value
        }));
    };

    const { price, reviews } = tour;
    const serviceCharge = 10;
    const totalPrice = price * credentials.guestSize + serviceCharge;

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/thank-you');
    };

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
                            value={credentials.fullName}
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
                            value={credentials.phone}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center gap-3">
                        <input
                            type="date"
                            id='bookAt'
                            aria-label='Booking Date'
                            required
                            onChange={handleChange}
                            value={credentials.bookAt}
                        />
                        <input
                            type="number"
                            placeholder='Guests'
                            id='guestSize'
                            aria-label='Number of Guests'
                            required
                            min="1"
                            onChange={handleChange}
                            value={credentials.guestSize}
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
                            ${price} <i className="ri-close-line"></i> {credentials.guestSize} person(s)
                        </h5>
                        <span>${price * credentials.guestSize}</span>
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
