import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./sideBarData";
import NavDropdown from "react-bootstrap/NavDropdown";
import { declareData, locationData } from "./declare/declareData";
import SubMenu from "./subMenu";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./sideBar.css";
import { RingLoader, CircleLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const Nav = styled.div`
  background: #363636;
  height: 80px;
  display: flex;
  ${"" /* justify-content: flex-start; */}
  align-items: center;
`;
const Nav1 = styled.div`
  background: #15171c;
  height: 40px;
  display: flex;
  ${"" /* justify-content: flex-start; */}
  align-items: center;
  margin-top: 1px;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #363636;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  overflow-y: scroll;
`;
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  //   const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const location = useLocation();
  let [loading, setLoading] = useState(false);
  const classes = useStyles();

  const showSidebar = () => {
    if (accessToken != null) {
      setSidebar(!sidebar);
    }
  };
  let userId = localStorage.getItem("userId");
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
        <div className="d-flex align-items-center">
          <div className="marginNav">
            <NavDropdown
              title="Khai bao"
              id="basic-nav-dropdown"
              menuVariant="dark"
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
              title="Dia chi"
              id="basic-nav-dropdown"
              menuVariant="dark"
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

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav className="d-flex justify-content-between  sticky-top">
          <div className="d-flex align-items-center">
            <NavIcon to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
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
          <div>{NavBarSet()}</div>
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

        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              {/* <AiIcons.AiOutlineClose onClick={showSidebar} /> */}
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
