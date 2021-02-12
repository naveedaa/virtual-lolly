import React from 'react'
import "./Heading.css"

const Heading = ({ value, className, value2, className2 })  => (
    <div className="landingpage-container">
        <div className="heading-div">
            <h1 className={className}> {value} </h1>
            <p className={className2}> {value2} </p>
        </div>

        
    </div>
)
export default Heading