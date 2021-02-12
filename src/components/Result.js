import React from 'react'
import Lolly from "../components/lolly"
import "./Result.css"

function Result({ c1, c2, c3, rec, msg, sender, url }) {
    console.log(c1, c2, c3, rec, msg, sender, url)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5 text-right created-lolly-container">
                    <Lolly top={c1} middle={c2} bottom={c3} />
                </div>
                <div className="col-lg-6 created-lolly-details-div">
                    <h4 className="dynamic-lolly-path">{`https://12e-virtual-lolly.netlify.app/lolly/${url}`}</h4>
                    <div className="lolly-details">
                        <span><h2>{rec}</h2></span>

                        <span><h2>{msg}</h2></span>

                        <span><h2>___{sender}</h2></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result