import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../controller/authController";
function Home({ navigation }) {
  const navigate = useNavigate();
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const login = async () => {
    //navigation.navigate("/home");
    const result = await authApi(authEmail, authPassword);

    if (result.status === 200 && result.data.accessToken != null) {
      localStorage.setItem("userId", result.data.id);
      localStorage.setItem("email", result.data.email);
      localStorage.setItem("accessToken", result.data.accessToken);
      return navigate("/home");
    }

    // return navigate("/");
    // return navigate("/", {
    //   state: {
    //     authEmail: authEmail,
    //     authPassword: authPassword,
    //   },
    // });
  };
  const onChangeEmail = (val) => {
    setAuthEmail(val.target.value);
  };
  const onChangePassword = (val) => {
    setAuthPassword(val.target.value);
  };
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0 d-flex align-items-center justify-content-center">
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0">Logo</span>
                </div>

                <div>
                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sign into your account
                  </h5>
                </div>
              </div>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="email"
                type="email"
                size="lg"
                onChange={(val) => onChangeEmail(val)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                size="lg"
                onChange={(val) => onChangePassword(val)}
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={() => login()}
              >
                Login
              </MDBBtn>

              <div className="d-flex flex-row justify-content-start">
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Home;
