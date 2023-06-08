import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLandmark,
  faWallet,
  faShieldAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Drawer from "react-drawer";
import "react-drawer/lib/react-drawer.css";
import "../Styles/ComponentStyles/Navbar.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the styles
import { Link, useNavigate } from "react-router-dom";

export default function HeaderNavBar() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991.98);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const renderNavLinks = () => {
    if (isMobile) {
      return (
        <Drawer
          open={showDrawer}
          onClose={toggleDrawer}
          position="left"
          noOverlay
          className="drawer"
        >
          <Nav className="flex-column">
            <Nav.Link as={Link} to={"/home"}>
              <FontAwesomeIcon
                icon={faHouse}
                style={{ color: "#38571a", width: "auto", height: "25px" }}
              />
              <span className="ml-1">Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to={"/project"}>
              <FontAwesomeIcon
                icon={faLandmark}
                style={{ color: "#38571a", width: "auto", height: "25px" }}
              />
              <span className="ml-1">Project</span>
            </Nav.Link>
            <Nav.Link as={Link} to={"/payment"}>
              <FontAwesomeIcon
                icon={faWallet}
                style={{ color: "#4f7a28", width: "auto", height: "25px" }}
              />
              <span className="ml-1">Down Payments</span>
            </Nav.Link>
            <Nav.Link as={Link} to={"/insurance"}>
              <FontAwesomeIcon
                icon={faShieldAlt}
                style={{ color: "#4f7a28", width: "auto", height: "25px" }}
              />
              <span className="ml-1">Insurance Plans</span>
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ color: "#38571a", width: "auto", height: "25px" }}
              />
              <span className="ml-1">Log Out</span>
            </Nav.Link>
          </Nav>
        </Drawer>
      );
    }

    return (
      <Nav className="ml-auto">
        <Nav.Link className="mr-2" id="NavLink" as={Link} to={"/home"}>
          <FontAwesomeIcon
            icon={faHouse}
            style={{ color: "#38571a", width: "auto", height: "25px" }}
          />
          <span className="ml-1">Home</span>
        </Nav.Link>
        <Nav.Link className="mr-2" id="NavLink" as={Link} to={"/project"}>
          <FontAwesomeIcon
            icon={faLandmark}
            style={{ color: "#38571a", width: "auto", height: "25px" }}
          />
          <span className="ml-1">Project</span>
        </Nav.Link>
        <Nav.Link className="mr-5" id="NavLink" as={Link} to={"/payment"}>
          <FontAwesomeIcon
            icon={faWallet}
            style={{ color: "#4f7a28", width: "auto", height: "25px" }}
          />
          <span className="ml-1">Down Payments</span>
        </Nav.Link>
        <Nav.Link className="mr-5" id="NavLink" as={Link} to={"/insurance"}>
          <FontAwesomeIcon
            icon={faShieldAlt}
            style={{ color: "#4f7a28", width: "auto", height: "25px" }}
          />
          <span className="ml-1">Insurance Plans</span>
        </Nav.Link>
        <Nav.Link className="mr-5" id="NavLink" onClick={handleLogout}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            style={{ color: "#ff2600", width: "auto", height: "25px" }}
          />
          <span className="ml-1">Log Out</span>
        </Nav.Link>
      </Nav>
    );
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="Navbar">
        <Container>
          <Navbar.Brand href="#home" id="Navbar" as={Link} to={"/home"}>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="93.000000pt"
              height="63.000000pt"
              viewBox="0 0 93.000000 63.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,63.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M373 515 c-29 -13 -53 -28 -53 -32 0 -4 35 -43 77 -85 l77 -78 53 52
c29 28 56 49 60 45 4 -4 -17 -31 -45 -60 l-52 -53 45 -44 c24 -24 46 -42 48
-39 3 2 10 14 16 27 10 20 10 27 -3 41 -15 16 -15 19 3 35 21 20 41 14 41 -11
0 -31 -23 -93 -43 -114 l-20 -21 -53 53 -54 53 -53 -52 c-29 -29 -56 -49 -60
-45 -4 4 16 31 45 60 l53 53 -47 47 -47 47 -12 -28 c-10 -22 -10 -31 0 -48 10
-17 10 -23 -5 -39 -9 -10 -21 -19 -26 -19 -14 0 -9 81 9 117 16 34 15 35 -9
60 l-25 25 -24 -39 c-34 -54 -39 -164 -11 -219 64 -123 200 -169 323 -107 150
77 170 273 39 385 -72 62 -160 74 -247 33z m132 -56 c4 -5 -1 -19 -11 -30 -17
-19 -18 -19 -41 3 -17 16 -20 24 -11 30 19 11 56 10 63 -3z m-13 -286 c27 -25
22 -33 -22 -33 -44 0 -48 5 -23 32 20 22 22 22 45 1z"
                />
              </g>
            </svg>
          </Navbar.Brand>
          {isMobile ? (
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              id="NavBarToggle"
              onClick={toggleDrawer}
            />
          ) : (
            <Navbar.Toggle aria-controls="basic-navbar-nav" id="NavBarToggle" />
          )}
          <Navbar.Collapse id="basic-navbar-nav">
            {renderNavLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
