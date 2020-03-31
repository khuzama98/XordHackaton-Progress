import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import QrModal from "./QrModal"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
  Button, Modal, ModalBody, ModalHeader,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";
import { withRouter } from 'react-router-dom';
import axios from 'axios';

var QRCode = require('qrcode.react');




function userActions({ current, history }) {

  const [visible, setVisible] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState("")
  const [userSecret, setUserSecret] = useState("")
  const [loginToken, setLoginToken] = useState("")

  console.log("curent", history)



  const getUserSecret = async () => {
    console.log('run ==>', email)
    if (email) {
      try {

        let params = {
          method: 'POST',
          headers: {
            "Content-type": "application/json; charset=UTF-8;"
          },
          body: JSON.stringify({ email })
        }
        let res = await fetch("http://192.168.0.106:4000/auth/generateSecret", params)

        res = await res.json()
        if (res) {

          console.log(res)
          setUserSecret(res.data)

          setStep(1)
        }
      }
      catch (err) {
        console.log(err.message, err)

      }
    }
    else {
      alert('Please enter a valid email')
    }

  }


  const requestLogin = async () => {
    // let email = localStorage.getItem("email")
    if (email && userSecret) {
      let params = {
        method: 'post',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ email, token: loginToken.toString() })
      }
      // console.log("body", { email, token: loginToken.toString() })
      // let res = await fetch("http://192.168.0.106:4000/auth/verify", params)
      let body={ email, token: loginToken.toString() }
      let res = await axios.post("http://192.168.0.106:4000/auth/verify", body)

      // res = await res.json()
      console.log("res===>",res)
      if (res.status ) {

        console.log(res)
        localStorage.setItem("currentUser", JSON.stringify(email))
        history.push("/home")
      }
      // else {
      //   alert("Internal Server error")
      // }
      // setStep(1)
    }
    else {
      alert('Please enter a valid email')
    }

  }

  const logoutFun = () => {

    localStorage.removeItem("currentUser")
    history.push("/blog-overview")
  }

  return (
    <NavItem tag={Dropdown} caret toggle={() => setVisible(!visible)}>
      {current == "dashboard" &&

        <Modal size="lg" open={toggleModal} toggle={toggleModal}>
          <b style={{ position: 'absolute', right: 20, top: 20, cursor: "pointer" }} onClick={() => setToggleModal(!toggleModal)}>X</b>
          <ModalHeader >Login </ModalHeader>
          <ModalBody align="center">{step == 0 ? "Enter email" : "Scan Qr code "}</ModalBody>

          {step == 0 &&
            <>
              <FormInput placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "300px", alignSelf: 'center', marginBottom: "50px" }} />
              <Button onClick={() => getUserSecret()} style={{ width: "300px", alignSelf: 'center', marginBottom: "50px" }} >Submit</Button>
            </>
          }

          {step == 1 &&
            <>
              <QRCode size={300} style={{ alignSelf: 'center' }} value={userSecret} includeMargin={true} />
              <FormInput placeholder="Enter token " value={loginToken} onChange={(e) => setLoginToken(e.target.value)} style={{ width: "300px", alignSelf: 'center', marginBottom: "50px" }} />
              <Button onClick={() => requestLogin()} style={{ width: "300px", alignSelf: 'center', marginBottom: "50px" }} >Request Login</Button>

            </>
          }

        </Modal>
      }


      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <span className="d-none d-md-inline-block">Login</span>
      </DropdownToggle>


      <Collapse tag={DropdownMenu} right small open={visible}>

        {
          current == "dashboard" &&
          <>
            <DropdownItem onClick={() => setToggleModal(!toggleModal)}>
              <i className="material-icons">&#xE7FD;</i> Login
          </DropdownItem>


          </>
        }

        {current === "home" &&
          <DropdownItem onClick={() => logoutFun()}>
            <i className="material-icons">&#xE8B8;</i> Log out
     </DropdownItem>


        }

      </Collapse>






    </NavItem>
  );
}

export default withRouter(userActions)
