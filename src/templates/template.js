import React from 'react'
import Result from "../components/Result"


function Template({ pageContext: { color1, color2, color3, reciever, sender, message, link } }) {
    return (
        <div>
            <h4>Generate Lolly</h4>
            {    color1, color2, color3, reciever, sender, message, link}
            {/* {sender}
            {msg}
            {url}
            {rec}
            <Result url={url} rec={rec} sender={sender} msg={msg} /> */}
        </div>
    )
}

export default Template