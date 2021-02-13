import React from "react"
import { Link } from "gatsby"
import Header from "../components/Header"
import Button from "../components/Button" 
import Lolly from "../components/lolly"
import "./style.css"

export default function App() {
  return (
    <div className="container">
      <div> 
        <Header value2={"because we all know someone who deserves some sugar. "}
          value={"virtual lollipop"}
          className={"indexHeading"}
          className2={"subTitle"}
        />
      </div>
      <div className="displaylolly-container">
        <Lolly
          top={"#C22671"} middle={"#D92A3A"} bottom={"#D51020"}
        />
        <Lolly
          top={"#97e665"} middle={"#8ccb4c"} bottom={"#a8d838"}
        />
        <Lolly
          top={"#cd2753"} middle={"#d5cfd1"} bottom={"#5ba3da"}
        />
        <Lolly
          top={"#feefd6"} middle={"#b65ae4"} bottom={"#c116c1"}
        />
        <Lolly
          top={"#ed265b"} middle={"#f77249"} bottom={"#a8d838"}
        />
      </div>
      <div className="homebtn-div">
        <Link to="/create_lolly">
          <Button
            className="lollyBtn"
            value={"Make a new lolly to send a friend"}
          />
        </Link>
      </div>
    </div>
  )
}