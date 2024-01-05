import React from 'react';
import './notfound.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <p className='not-found-mes'>Oops! The page you are looking for might be in another castle.</p>
            <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=826&t=st=1704480723~exp=1704481323~hmac=13fe222586f8efbcfca9fec7863a07c8b8ed1c7563c8eba69b6b799b426d50f9" className='not-found-image' alt="Mario 404" />

            <Link to="/">
                <button className='gotohome-text'>Go to Home</button>
            </Link>
        </div>
    )
}