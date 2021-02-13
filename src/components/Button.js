import React from 'react'
import "./Button.css"

const Button = ({ value, className }) => (
    <div>
        <button className={className}>{value}</button>
    </div>
)
export default Button 