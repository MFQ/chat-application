import React, { useReducer, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { isEmpty } from 'lodash';


import Text from "../../atoms/text"
import Login from "../../organisms/login"
import  "./index.scss"

import { 
  ENTER_PASSWORD, 
  ENTER_USERNAME, 
  SEND_LOGINING,
  LOGINING_COMPLETE, 
  LOGIN_ERROR
} from "../../actions";

import { SocketActions, MissingCredentials, joinUrl } from "../../common/constants"
import { setUsernameLocal } from '../../common/utils';
import { loginInitalState } from "../../initalStates";
import { loginReducer } from "../../reducers";

const LoginPageClassName = "login-page"
const { sendLogin, loginSuccessful, loginFailed } = SocketActions

const LoginPage = ({ socket }) => {

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(loginReducer, loginInitalState);
  const { username, password } = state;

  const setUsername = el => dispatch({ type: ENTER_USERNAME, payload: { username: el.target.value } })
  const setPassword = el => dispatch({ type: ENTER_PASSWORD, payload: { password: el.target.value } })
  const loginUser = () => {
    if(isEmpty(username) || isEmpty(password)) {
      dispatch({ type: LOGIN_ERROR, payload: { errors: [MissingCredentials] } })
    } else {
      socket.emit(sendLogin, { username, password, id: socket.id }, 
        () =>  dispatch({ type: SEND_LOGINING })
      )
    }
  
  }
  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate(joinUrl);
    }
  }, [])

  socket.on(loginSuccessful, (soc) => {
    dispatch({type: LOGINING_COMPLETE, payload: { username: soc.username}});    
    setUsernameLocal(soc.username)
    navigate(joinUrl);
  });

  socket.on(loginFailed, (soc) => {
    dispatch({type: LOGIN_ERROR})
    console.log("failed login", soc);
  });


  return  <div className={LoginPageClassName}>
    <Text style={`${LoginPageClassName}-main-title`} text={"Login"} />
    <Login
      setUsername={setUsername}
      setPassword={setPassword}
      loginUser={loginUser}
      {...state}
    />
  </div>
}


  export default LoginPage;