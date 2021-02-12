import React, { useRef, useState } from "react"
import Lolly from "../components/lolly"
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useFormik } from 'formik';
import Grid from '@material-ui/core/Grid';
import "./CreateLolly.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from "../components/Result"
import Heading from "../components/Heading"
import { Link } from "gatsby"

const shortid = require("shortid")

const addVCard_MUTATION = gql`
  mutation addVCard(
    $c1:String!  
    $c2:String!
    $c3:String!
    $sender:String!
    $rec:String!
    $msg:String!
    $url:String!
    ){
      addVCard(
        c1:$c1 
        c2:$c2
        c3:$c3
        sender:$sender 
        rec:$rec
        msg:$msg
        url:$url
      ){
        id
        rec
        sender
        msg
        url
      }
  }
`

export default function CreateLolly() {

  // FORMIK VALIDATION
  const formik = useFormik({
    initialValues: {
      recField: "",
      msgField: "",
      senderField: "",
    },
    onSubmit: (values) => {
      // console.log(values)
    },
    validate: (values) => {
      let error = {}

      if (!values.recField)
        error.recField = "recField is required"
      if (!values.msgField)
        error.msgField = "msgField is required"
      if (!values.senderField)
        error.senderField = "senderField is required"

      return error
    }

  })

  // USESTATE INITIAL VALUE
  const [c1, setC1] = useState("#d52358")
  const [c2, setC2] = useState("#e95946")
  const [c3, setC3] = useState("#deaa43")
  const [path, setPath] = useState('')


  //SUBMIT FUNCTION 
  const handleSend = async () => {
    if (!senderField.current.value && !recField.current.value && !msgField.current.value) {
      return false
    }

    const id = shortid.generate()

    const result = await addVCard({
      variables: {
        c1, c2, c3,
        sender: senderField.current.value,
        rec: recField.current.value,
        msg: msgField.current.value,
        url: id,
      },
    })

    setPath(id)
  }

  const senderField = useRef()
  const recField = useRef()
  const msgField = useRef()

  const [addVCard] = useMutation(addVCard_MUTATION)

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Link to="/">

          <Heading value2={"because we all know someone who deserves some sugar. "}
            value={"virtual lollipop"}
            className={"heading"}
            className2={"tagline"}
          />
        </Link>
      </div>
      <div className="data-container">
        <Grid container spacing={3}>
          {
            !path ? (
              <>
                <Grid item lg={6} xs={12}>
                  <div className="lollyContainer">
                    <Lolly top={c1} middle={c2} bottom={c3} />
                    <div className="colorInputs">
                      <label className="colorPickerLabel">
                        <input type="color" className="colorPicker" value={c1} onChange={(e) => { setC1(e.target.value) }} />
                      </label>
                      <label className="colorPickerLabel">
                        <input type="color" className="colorPicker" value={c2} onChange={(e) => { setC2(e.target.value) }} />
                      </label>
                      <label className="colorPickerLabel">
                        <input type="color" className="colorPicker" value={c3} onChange={(e) => { setC3(e.target.value) }} />
                      </label>
                    </div>
                  </div>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <div className="form-container">

                    <form onSubmit={formik.handleSubmit}>
                      <label htmlFor="to">To:</label>
                      <input autoComplete="off" className="form-control text-field" type="text" id="recField" onChange={formik.handleChange} ref={recField}
                      />
                      {formik.errors.recField ? <div className="error">{formik.errors.recField}</div> : null}

                      <br />

                      <label htmlFor="Say Something nice">Say Something nice:</label>
                      <textarea autoComplete="off" className="form-control text-field" id="msgField" onChange={formik.handleChange} ref={msgField}></textarea>
                      {formik.errors.msgField ? <div className="error">{formik.errors.msgField}</div> : null}

                      <br />

                      <label htmlFor="From">From:</label>
                      <input autoComplete="off" className="form-control text-field" id="senderField" type="text" onChange={formik.handleChange} ref={senderField} /> <br /><br />
                      {formik.errors.senderField ? <div className="error" >{formik.errors.senderField}</div> : null}

                      <input type="submit" className="btn btn-dark" onClick={handleSend} id="login" value="Freez" />

                    </form>
                  </div>
                </Grid>
              </>
            ) : (
                <Result c1={c1} c2={c2} c3={c3}
                  rec={recField.current.value}
                  msg={msgField.current.value}
                  sender={senderField.current.value} url={path}
                />
              )
          }
        </Grid>
      </div>
    </div>
  )
}