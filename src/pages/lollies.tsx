import React from "react"
import Lolly from "../components/lolly"
import "./style.css"

const Lollies = ({ location }) => {
  React.useEffect(() => {
    fetch("https://api.netlify.com/build_hooks/6027e8081e69bd4506839cbc", {
      method: "post",
      body: JSON.stringify({}),
    }).then(function (response) {
      console.log("Build Triggered")
    })
  }, [])

  if (location.state !== undefined) {
    const { cl1, cl2, cl3, to, from, msg, link } = location.state.data

    return (
      <div className="App">
        <h2 style={{color: "purple", letterSpacing: "2px", fontFamily: "cursive", fontStyle: "italic"}}>Virtual Lolly</h2>
        <div style={{fontStyle: 'italic',fontFamily: 'cursive', color: 'white', marginTop: "55px"}}>
          Share This Lolly With Your Friend:
        </div>
        <div style={{ color: 'white', marginBottom: "75px"}}>
          {`https://12e-virtual-lolly.netlify.app/lollies/${link}`}
          </div>
        <div className="main-container">
          <div className="lolly-container">
            <Lolly top={cl1} middle={cl2} bottom={cl3} />
          </div>
          <div className="message-container">
            <p className="to">{`Dear ${to},`}</p>
            <p className="msg">{msg}</p>
            <p>From, </p>
            <p className="from">{from}</p>
          </div>
        </div>
      </div>
    )
  }
  return <div>lollies</div>
 
}

export default Lollies