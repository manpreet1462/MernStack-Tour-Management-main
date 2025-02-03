import React, { useEffect } from "react";
import "./about.css";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="about__container">
            <h1 className="about__title">About Us</h1>
            <p className="about__description">
                Welcome to our platform! We are dedicated to providing the best services and experiences for our users.
            </p>
            <div className="about__content">
                <h2>Our Mission</h2>
                <p>
                    Our mission is to create innovative solutions that make life easier and more enjoyable for our customers.
                </p>

                <h2>Our Team</h2>
                <p>
                    We are a team of passionate developers, designers, and visionaries committed to excellence.
                </p>

                <h2>Contact Us</h2>
                <p>Email: support@example.com</p>
                <p>Phone: +123 456 7890</p>
            </div>
        </div>
    );
};

export default About;
