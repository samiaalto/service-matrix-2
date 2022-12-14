import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "./styles/NavBar_styles.css";
import { ReactComponent as TourLogo } from "./icons/Tour_logo.svg";

const NavBar = ({
  navMatrix,
  navFormat,
  navDropTitle,
  navDropEn,
  navDropFi,
  selectedLang,
  startTour,
  value,
  navTour,
}) => {
  const handleSelect = (e) => {
    selectedLang(e);
  };

  useEffect(() => {
    selectedLang(value);
  }, [value]);

  return (
    <Navbar className="color-nav" expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav defaultActiveKey="ServiceMatrix" className="me-auto">
            <Nav.Link
              className="ServiceMatrix_tab"
              as={Link}
              to="/service-matrix-2/ServiceMatrix"
              eventKey="ServiceMatrix"
            >
              {navMatrix}
            </Nav.Link>
            <Nav.Link
              className="FileFormats_tab"
              as={Link}
              to="/service-matrix-2/FileFormats"
              eventKey="FileFormats"
            >
              {navFormat}
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={navDropTitle}
              id="basic-nav-dropdown"
              onSelect={handleSelect}
            >
              <NavDropdown.Item eventKey="en">{navDropEn}</NavDropdown.Item>
              <NavDropdown.Item eventKey="fi">{navDropFi}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <OverlayTrigger
            key={"tooltip_TourLogo"}
            placement="bottom"
            overlay={<Tooltip key={"tooltip_TourLogo"}>{navTour}</Tooltip>}
          >
            <div className="start-tour" onClick={startTour}>
              <TourLogo title="" className="TourLogo" key="TourLogo" />
            </div>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
