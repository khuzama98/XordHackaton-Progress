import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

import { withRouter } from 'react-router-dom';


const DefaultLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <Row>
      {/* <MainSidebar /> */}
      <Col
        className="main-content p-0"
        lg={{ size: 12 }}
        md={{ size: 12}}
        sm="12"
        tag="main"
      >
        {!noNavbar && <MainNavbar current="dashboard" />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
);

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default withRouter(DefaultLayout);
