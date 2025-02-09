import React from 'react'
import {Link } from "react-router-dom";
import '../App.css'


const navigation = () => {
    return (
        <div className='p-30'>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default navigation
