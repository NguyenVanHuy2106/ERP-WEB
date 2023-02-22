import React, { useState, useEffect } from "react";
import styled from "styled-components";

import NavDropdown from "react-bootstrap/NavDropdown";
import { declareData, locationData, deliveryData } from "./declare/declareData";

import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

import "./sideBar.css";

const Nav = styled.div`
  background: #efdecd;
  height: 80px;
  display: flex;
  ${"" /* justify-content: flex-start; */}
  align-items: center;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  let [loading, setLoading] = useState(false);

  let accessToken = localStorage.getItem("accessToken");
  let email = localStorage.getItem("email");
  let name = "Administrator";

  if (accessToken != null) {
    //console.log(accessToken);
    name = email;
  } else {
    console.log("Chua dang nhap");
  }
  const logout = () => {
    if (sidebar === true) {
      setSidebar(false);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    return navigate("/");
    //console.log("dfs");
  };
  const login = () => {
    return navigate("/signIn");
  };

  const BtnLogin = () => {
    if (accessToken == null) {
      return <NavDropdown.Item onClick={login}>Dang nhap</NavDropdown.Item>;
    }
  };
  const BtnLogOut = () => {
    if (accessToken != null) {
      return (
        <div>
          <NavDropdown.Divider />
          <div className="d-flex justify-content-center">
            <button
              id="btn"
              className="btn"
              onClick={logout}
              style={{ background: "#ffffff" }}
            >
              Logout
            </button>
          </div>
        </div>
      );
    }
  };
  const Dashboard = () => {
    return navigate("/");
  };
  const NavBarSet = () => {
    if (accessToken != null) {
      return (
        <div className="d-flex">
          <div className="marginNav">
            <NavDropdown
              title="Sản phẩm"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              {declareData.map(({ path, title }, index) => {
                return (
                  <NavDropdown.Item href={path} key={index}>
                    {title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </div>
          <div className="marginNav">
            <NavDropdown
              title="Giao hàng"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              {deliveryData.map(({ path, title }, index) => {
                return (
                  <NavDropdown.Item href={path} key={index}>
                    {title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </div>
          <div className="marginNav">
            <NavDropdown
              title="Dia chi"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              {locationData.map(({ path, title }, index) => {
                return (
                  <NavDropdown.Item href={path} key={index}>
                    {title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </div>
          <div className="marginNav">
            <NavDropdown
              title="Bao cao"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              <NavDropdown.Item href="/province">
                Khai báo Tỉnh/ Thành phố
              </NavDropdown.Item>
              <NavDropdown.Item href="/district">
                Khai báo Quận/ Huyện
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Khai báo Phường/ Xã</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav className="d-flex justify-content-between  sticky-top">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <div onClick={Dashboard} className="Dashboard">
                <img
                  src={require("../../../assets/shopee.png")}
                  alt="Error"
                  width={100}
                  height={70}
                  style={{
                    marginLeft: "20px",
                    zIndex: 50,
                  }}
                />
              </div>
            </div>
            <div style={{ marginLeft: 50 }}>{NavBarSet()}</div>
          </div>
          <div className="ms-1">
            <NavDropdown
              title={name}
              menuVariant="dark"
              id="basic-nav-dropdown"
            >
              {BtnLogin()}
              {/* <NavDropdown.Item onClick={login}>Dang nhap</NavDropdown.Item> */}
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              {BtnLogOut()}
              {/* <NavDropdown.Divider />
              <div className="d-flex justify-content-center">{BtnLogOut()}</div> */}
            </NavDropdown>
          </div>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
