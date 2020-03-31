import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "shards-react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
    Button,
    Container,
    CardBody,
    Slider

} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";
import { withRouter } from 'react-router-dom';
import axios from "axios"

function Home(props) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")
    const [progress, setProgress] = useState([50])

    const addNewCourse = async () => {
        let email = localStorage.getItem("currentUser")
        email=JSON.parse(email)
        if (title && description && duration && progress) {
            try {

                let params = {
                    method: 'post',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify({ title, description, duration, progress:progress[0], email })
                }
                // let res = await fetch("http://192.168.0.106:4000/course", params)
                let body={ title, description, duration, progress:progress[0], email }
                let res = await axios.post("http://192.168.0.106:4000/course", body)


                // res = await res.json()
                console.log(res)
                if (res) {

                    console.log(res)
                    alert("Course Added Succesfully!")


                }
                else{
                    alert("Internal server error")
                }
            }
            catch (err) {
                console.log("add New Course====>", err)

            }
        }
        else {
            alert('Please fill all fields properly!')
        }

    }




    useEffect(() => {
        let currentUser = localStorage.getItem('currentUser')
        currentUser = JSON.parse(currentUser)
        if (currentUser == null || currentUser == undefined) {
            props.history.push("/blog-overview")
        }

    }, [])

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
            </Row>
            <Row>
                <Col lg="4">
                    {/* <UserDetails /> */}
                    {/* <UserAccountDetails />
                    
                    */}

                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">Add new Course</h6>
                        </CardHeader>
                        <ListGroup flush>
                            <ListGroupItem className="p-3">
                                <Row>
                                    <Col>
                                        <Form>
                                            <Row form>
                                                {/* First Name */}
                                                <Col md="11" className="form-group">
                                                    <label htmlFor="feFirstName">Title</label>
                                                    <FormInput
                                                        id="feFirstName"
                                                        placeholder="Title"
                                                        value={title}
                                                        onChange={(e) => { setTitle(e.target.value) }}
                                                    />
                                                </Col>

                                            </Row>
                                            <Row form>
                                                {/* Email */}
                                                <Col md="11" className="form-group">
                                                    <label htmlFor="feEmail">Duration</label>
                                                    <FormInput

                                                        placeholder="Duration"
                                                        value={duration}
                                                        onChange={(e) => { setDuration(e.target.value) }}
                                                    />
                                                </Col>

                                            </Row>


                                            <div className="mb-2 pb-1">
                                                <strong className="text-muted d-block">Current Progress</strong>
                                                <Slider
                                                    theme="success"
                                                    className="my-4"
                                                    connect={[true, false]}
                                                    start={progress}
                                                    range={{ min: 0, max: 100 }}
                                                    value={progress}
                                                    onChange={(e) => {
                                                        setProgress(e)
                                                    }}
                                                    tooltips
                                                />

                                            </div>

                                            <Row form>
                                                {/* Description */}
                                                <Col md="12" className="form-group">
                                                    <label htmlFor="feDescription"
                                                      
                                                    >Description</label>
                                                    <FormTextarea id="feDescription" rows="5"   value={description}
                                                        onChange={(e) => { 
                                                            console.log(e.target.value)
                                                            setDescription(e.target.value) }} />
                                                </Col>
                                            </Row>
                                            <Button theme="accent" onClick={() => addNewCourse()}>Add new Course</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>                </Col>


                {/* //////////////////////////////////////////////table */}
                <Col lg="8">

                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">Active Users</h6>
                        </CardHeader>
                        <CardBody className="p-0 pb-3">
                            <table className="table mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th scope="col" className="border-0">
                                            #
                  </th>
                                        <th scope="col" className="border-0">
                                            First Name
                  </th>
                                        <th scope="col" className="border-0">
                                            Last Name
                  </th>
                                        <th scope="col" className="border-0">
                                            Country
                  </th>
                                        <th scope="col" className="border-0">
                                            City
                  </th>
                                        <th scope="col" className="border-0">
                                            Phone
                  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Ali</td>
                                        <td>Kerry</td>
                                        <td>Russian Federation</td>
                                        <td>Gdańsk</td>
                                        <td>107-0339</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Clark</td>
                                        <td>Angela</td>
                                        <td>Estonia</td>
                                        <td>Borghetto di Vara</td>
                                        <td>1-660-850-1647</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Jerry</td>
                                        <td>Nathan</td>
                                        <td>Cyprus</td>
                                        <td>Braunau am Inn</td>
                                        <td>214-4225</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Colt</td>
                                        <td>Angela</td>
                                        <td>Liberia</td>
                                        <td>Bad Hersfeld</td>
                                        <td>1-848-473-7416</td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>



                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(Home)
