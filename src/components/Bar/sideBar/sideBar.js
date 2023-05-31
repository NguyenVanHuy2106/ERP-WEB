import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  declareData,
  customerData,
  shipmentOrderData,
  voucherConcernData,
} from "./declare/declareData";

import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

import "./sideBar.css";

const Nav = styled.div`
  background: #555555;
  height: 80px;
  display: flex;
  ${"" /* justify-content: flex-start; */}
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  let [loading, setLoading] = useState(false);

  let accessToken = localStorage.getItem("accessToken");
  let username = localStorage.getItem("username");
  let name = "Administrator";

  if (accessToken != null) {
    //console.log(accessToken);
    name = username;
  } else {
    console.log("Chua dang nhap");
  }
  const logout = () => {
    if (sidebar === true) {
      setSidebar(false);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
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
          <NavDropdown.Item href="#action/3.2">
            Cập nhật thông tin cá nhân
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <div className="d-flex justify-content-center">
            <button
              id="btn"
              className="btn"
              onClick={logout}
              style={{ background: "#ffffff" }}
            >
              Đăng xuất
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
              title="Khai báo"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              {declareData.map(({ path, title, data }, index) => {
                return (
                  <NavDropdown.Item key={index}>
                    <Link to={path}>{title}</Link>
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </div>
          <div className="marginNav">
            <NavDropdown
              title="Quản lý"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              {shipmentOrderData.map(({ path, title }, index) => {
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
              title="Khách hàng"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              {customerData.map(({ path, title }, index) => {
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
              title="Tra cứu"
              id="basic-nav-dropdown"
              menuVariant="light"
            >
              {voucherConcernData.map(({ path, title }, index) => {
                return (
                  <NavDropdown.Item href={path} key={index}>
                    {title}
                  </NavDropdown.Item>
                );
              })}
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
                  src={require("../../../assets/erp-logo.png")}
                  alt="Error"
                  width={90}
                  height={60}
                  style={{
                    zIndex: 2,
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
