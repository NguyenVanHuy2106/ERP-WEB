import React, { useState, useContext, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaBars, FaTimes } from "react-icons/fa";

import { SidebarData } from "./sideBarData";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./sideBar.css";
import SubMenu from "./subMenu";
import { Sidebar } from "react-pro-sidebar";

function Sidebars() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebar, setSidebar] = useState(false);

  let userId = localStorage.getItem("userId");
  let accessToken = localStorage.getItem("accessToken");
  let email = localStorage.getItem("email");
  let name = "Administrator";
  const showSidebar = () => {
    if (accessToken != null) {
      setSidebar(!sidebar);
    }
  };
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
            <button id="btn" className="btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      );
    }
  };

  const DropdownLink = styled(Link)`
    background: #414757;
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;

    &:hover {
      background: #632ce4;
      cursor: pointer;
    }
  `;
  const NavBarSet = () => {
    if (accessToken != null) {
      return (
        <div className="d-flex align-items-center">
          <div className="marginNav">
            <NavDropdown
              title="Khai bao"
              id="basic-nav-dropdown"
              menuVariant="dark"
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
          <div className="marginNav">
            <NavDropdown
              title="Doi tac"
              id="basic-nav-dropdown"
              menuVariant="dark"
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
          <div className="marginNav">
            <NavDropdown
              title="Bao cao"
              id="basic-nav-dropdown"
              menuVariant="dark"
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

  return (
    <>
      <IconContext.Provider value={{ color: "red" }}>
        <div className="navbar fixed-top">
          <div className="menu-bars d-flex">
            <Link to="#" className="menu-bars" onClick={showSidebar}>
              <FaBars className="size" />
            </Link>
            <div style={{ width: 100 }}>
              <div className="navText">
                {location.pathname.replace("/", "")}
              </div>
            </div>
          </div>
          <div className="menu-bars d-flex">
            <div>{NavBarSet()}</div>
          </div>

          <div className="d-flex menu-bars menu-bars-user">
            <NavDropdown title={name} id="basic-nav-dropdown">
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

          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              {/* <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <FaTimes />
                </Link>
              </li> */}
              {/* {SidebarData.map(({ item }, index) => {
                return <SubMenu item={item} key={index} />;
              })} */}
              {SidebarData.map(({ cName, icon, path, title }, index) => {
                return (
                  <li key={index} className={cName}>
                    <Link to={path}>
                      {icon}
                      <span>{title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Sidebars;
