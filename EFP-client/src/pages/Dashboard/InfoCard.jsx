import React from "react"
import './Cardinfo.css'
import { FaUser } from "react-icons/fa";

const course = [
    {
        tite: "Employee",
        icon: <FaUser />
    },

    {
        tite: "Project",
        icon: <FaUser />
    }
]

const InfoCard = () => {
    return <div className="card--container">{course.map((item) => (<div className='card'>
        <div className="card--cover">{item.icon}</div>
        <div className="card--title">
            <h2>{ item.tite}</h2>   
        </div>
    </div>
    ))}</div>;

};

export default InfoCard;