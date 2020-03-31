import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";
import { withRouter } from 'react-router-dom';


const test= ({current}) => (
  <Nav navbar className="border-left flex-row">
   
  <UserActions current={current} />
  </Nav>
);


export default withRouter(test)