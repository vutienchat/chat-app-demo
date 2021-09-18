import React from "react";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./css/login.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/userSlice";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const responseFacebook = (res) => {
    console.log(res);
  };
  const componentClicked = () => {
    console.log("clicked");
  };
  const responseGoogle = (user) => {
    console.log(user);
    const { profileObj } = user;
    if (profileObj) {
      dispatch(addUser(profileObj));
      history.push("/chat-room");
    }
  };
  return (
    <>
      <i className="bi bi-facebook" style={{ marginLeft: "5px" }}></i>

      <div className="flex flex-col items-center justify-center h-screen">
        <FacebookLogin
          appId="1878731868966710"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          cssClass="btnFacebook"
          textButton="Login with Facebook"
          icon={
            <i
              className="bi bi-facebook"
              style={{ padding: "10px", marginRight: "10px", fontSize: "18px" }}
            ></i>
          }
          callback={responseFacebook}
        />
        <GoogleLogin
          clientId="43629890670-7n7ffgffaiqlvs3fs8dqie2jph6mb5pl.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          className="btnGoogle"
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  );
};

export default Login;
