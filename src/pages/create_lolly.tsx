import React from "react"
import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { Redirect } from "@reach/router"
import { navigate } from "gatsby"
import Lolly from "../components/lolly"
import "./style.css"

const ADD_LOLLY = gql`
  mutation(
    $cl1: String!
    $cl2: String!
    $cl3: String!
    $to: String!
    $msg: String!
    $from: String!
  ) {
    addLolly(cl1: $cl1, cl2: $cl2, cl3: $cl3, to: $to, msg: $msg, from: $from) {
      cl1
      cl2
      cl3
      to
      from
      msg
      link
    }
  }
`

export default function createLolly() {
  const [addLolly, { loading }] = useMutation(ADD_LOLLY)

  const [cl1, setCl1] = React.useState<string>("#d52358")
  const [cl2, setCl2] = React.useState<string>("#e95946")
  const [cl3, setCl3] = React.useState<string>("#deaa43")
  const [update, setUpdate] = React.useState(undefined)

  const toField = React.useRef(null)
  const msgField = React.useRef(null)
  const fromField = React.useRef(null)

  const handleSubmit = () => {
    const toRef = toField.current
    const msgRef = msgField.current
    const fromRef = fromField.current

    addLolly({
      variables: {
        cl1,
        cl2,
        cl3,
        to: toRef.value,
        from: fromRef.value,
        msg: msgRef.value,
      },
      update: (proxy, mutationResult) => {
        console.log(mutationResult)
        setUpdate(mutationResult)
        navigate(`/lollies/${mutationResult.data.addLolly.link}`, {
          state: {
            data: mutationResult.data.addLolly,
          },
        })
      },

    })
  }

  if (loading) {
    return <h1 style={{margin: 'auto', marginTop: "30vh", color: "purple"}}>LOADING.....</h1>
  }

  return (
    <div>
      <h2 style={{marginBottom: "15vh", color: 'purple', letterSpacing: "2px",
      fontStyle: "italic", fontFamily: "cursive"}}>Make Your Own Lolly Here!</h2>
      <div className="main-container">
        <div className="lolly-container">
          <div>
            <Lolly top={cl1} middle={cl2} bottom={cl3} />
          </div>
          <div style={{display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", marginLeft: "55px", marginBottom: "80px"}}>
            <label className="colorPickerLabel">
                <input type="color" className="colorPicker" value={cl1}
                onChange={e => setCl1(e.target.value)}
                />
             </label>
            <label className="colorPickerLabel">
                <input type="color" className="colorPicker" value={cl2}
                onChange={e => setCl2(e.target.value)}
                />
             </label>
             <label className="colorPickerLabel">
                <input type="color" className="colorPicker" value={cl3} 
                onChange={e => setCl3(e.target.value)} 
                />
             </label>
          </div>
        </div>
        <div className="form-container">
          <input type="text" className="input" placeholder="Receiver Name" ref={toField} />
          <textarea placeholder="Say Something Nice..." className="input" ref={msgField} />
          <input type="text" className="input" placeholder="Your Name" ref={fromField} />
          <button
            className="createBtn"
            onClick={handleSubmit}
          >
            Send Lolly
          </button>
        </div>
      </div>
    </div>
  )
}