import React from "react";
// import { Link } from "react-router-dom"

import "react-bulma-components/dist/react-bulma-components.min.css";
import { Navbar } from "react-bulma-components";

const AppNavbar = (props) => {
  return (
    <Navbar className="is-black">
      <Navbar.Brand>
        <Navbar.Item>
          <strong>MERN Tracker</strong>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item className="has-text-white" href="/members">
            Members
          </Navbar.Item>
          <Navbar.Item className="has-text-white" href="/teams">
            Teams
          </Navbar.Item>
          <Navbar.Item className="has-text-white" href="/tasks">
            Tasks
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default AppNavbar;
