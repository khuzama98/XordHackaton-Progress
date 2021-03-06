import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";
import { withRouter } from 'react-router-dom';


function BlogOverview({ smallStats, history }) {
  const [allUsers, setAllUsers] = useState([])
  useEffect(() => {
    let currentUser = localStorage.getItem('currentUser')
    currentUser = JSON.parse(currentUser)
    if (currentUser !== null && currentUser !== undefined) {
      history.push("/home")
    }
    getAllUsersProgress()

  }, [])

  const getAllUsersProgress = async () => {
    try {
      let res = await fetch("http://192.168.0.106:4000/course")

      res = await res.json()
      if (res) {
        setAllUsers(res)
        console.log("get all users===>", res)



      }
    }
    catch (err) {
      console.log(err)
    }
  }



  return (


    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      {/* {console.log("props in blogoverview",props)} */}

      <Row noGutters className="page-header py-4">
        <PageTitle title="Blog Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
      </Row>

      {/* Small Stats Blocks */}
      <Row>
        {smallStats.map((stats, idx) => (
          <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
            <SmallStats
              id={`small-stats-${idx}`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value={stats.value}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
            />
          </Col>
        ))}
      </Row>

      <Row>
        {/* Users Overview */}
        <Col lg="8" md="12" sm="12" className="mb-4">
          <UsersOverview />
        </Col>

        {/* Users by Device */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          <UsersByDevice />
        </Col>

        {/* New Draft */}
        <Col lg="12" md="12" sm="12" className="mb-4">


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
                            Email
                  </th>
                          <th scope="col" className="border-0">
                           Title
                  </th>
                          <th scope="col" className="border-0">
                            Duration
                  </th>
                          <th scope="col" className="border-0">
                          Description
                  </th>
                          <th scope="col" className="border-0">
                            Progress
                  </th>
                        </tr>
                      </thead>
                      {
                  allUsers.map((val,inx) => {
                    return (
                      <tbody>
                        <tr>
                    <td>{inx}</td>
                          <td>{val.email}</td>
                          <td>{val.title}</td>
                          <td>{val.duration}</td>
                          <td>{val.description}</td>
                          <td>{val.progress}</td>
                        </tr>

                      </tbody>
)

                  })
                }
              </table>
            </CardBody>
          </Card>
        </Col>

        {/* Discussions */}
        <Col lg="5" md="12" sm="12" className="mb-4">
          {/* <Discussions /> */}
        </Col>

        {/* Top Referrals */}
        <Col lg="3" md="12" sm="12" className="mb-4">
          {/* <TopReferrals /> */}
        </Col>
      </Row>
    </Container>
  )
}

BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

BlogOverview.defaultProps = {
  smallStats: [
    {
      label: "Posts",
      value: "2,390",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Pages",
      value: "182",
      percentage: "12.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Comments",
      value: "8,147",
      percentage: "3.8%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "New Customers",
      value: "29",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 7, 1, 3, 1, 4, 8]
        }
      ]
    },
    {
      label: "Subscribers",
      value: "17,281",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [3, 2, 3, 2, 4, 5, 4]
        }
      ]
    }
  ]
};

export default withRouter(BlogOverview);
