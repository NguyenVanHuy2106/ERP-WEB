import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BasicExample() {
  const navigate = useNavigate();
  let userId = localStorage.getItem("userId");
  let accessToken = localStorage.getItem("accessToken");
  let email = localStorage.getItem("email");
  let name = "Administrator";

  if (accessToken != null) {
    console.log(accessToken);
    name = email;
  } else {
    console.log("Chua dang nhap");
  }

  // console.log(name);

  // const [arr, setArr] = useState("");

  // const logCount = useCallback(() => {
  //   setArr(location.state.authEmail);
  // }, [location.state.authEmail]);

  // useEffect(() => {
  //   logCount();
  // }, [logCount]);

  // console.log(arr);
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    return navigate("/signIn");
    //console.log("dfs");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">ADMIN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <div className="d-flex justify-content-around">
              <div>
                <NavDropdown title="Khai bao" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/province">
                    Khai báo Tỉnh/ Thành phố
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/district">
                    Khai báo Quận/ Huyện
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">
                    Khai báo Phường/ Xã
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
                </NavDropdown>
              </div>
              <div>
                <Nav.Link href="#action2">Quan ly shop</Nav.Link>
              </div>
              <div>
                <Nav.Link href="#action3">Quan ly nguoi dung</Nav.Link>
              </div>
              <div>
                <Nav.Link href="/product">Quan ly san pham</Nav.Link>
              </div>
            </div>
          </Nav>
          <Nav>
            <NavDropdown title={name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/signIn">Dang nhap</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <div className="d-flex justify-content-center">
                <button id="btn" className="btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
