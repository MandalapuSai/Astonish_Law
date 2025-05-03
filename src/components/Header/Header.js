import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Menu, X } from "lucide-react"; // ChevronDown for arrow
import astonishlogo from "../../assets/astonish-law-logo.png";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <Navbar
    expand="lg"
    className="header-container"
    sticky="top"
    expanded={menuOpen}
  >
      <Container fluid className="p-0">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
          <img src={astonishlogo} alt="astonish law" className="header-logo" />
        </Navbar.Brand>


        {/* Mobile Toggle Button */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="icon" /> : <Menu className="icon" />}
        </Navbar.Toggle>


        {/* Navigation Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about-us" onClick={handleNavClick}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/our-case" onClick={handleNavClick}>
              Our Cases
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" onClick={handleNavClick}>
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/event" onClick={handleNavClick}>
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/resources" onClick={handleNavClick}>
              Resources
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleNavClick}>
              Contact Us
            </Nav.Link>
            <Nav.Link as={Link} to="/enquiry" onClick={handleNavClick}>
              Enquiry
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;