import React from "react";
import { isEmpty } from "lodash";

import Button from "../../atoms/button";
import TextInput from "../../atoms/textinput"
import Text from "../../atoms/text";
import "./index.scss"

const loginClassName = "login"

const Login = ({ 
  loginUser, 
  setPassword, 
  setUsername, 
  password, 
  username, 
  loading, 
  errors 
}) =>  
  <div className={loginClassName}>
    { !isEmpty(errors) && <Text text={errors.join(" ")} />}
    { loading && <Text text={"loading..."}/>}
    <TextInput 
      placeHolder={"username"} 
      onChange={setUsername} 
      value={username}
    />
    <TextInput 
      type={"password"} 
      onChange={setPassword} 
      value={password} 
    />
    <Button style={`${loginClassName}-btn`} text={"Login"} onClick={loginUser} />
  </div>

export default Login;