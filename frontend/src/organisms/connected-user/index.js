import React from "react";
import { isEmpty } from "lodash";

import TextInput from "../../atoms/textinput";
import Text from "../../atoms/text";
import Button from "../../atoms/button";
import "./index.scss"

const ClassConnectedUser = "connected-user"


const ConnectedUser = ({ 
  selectUser, 
  pickUserForChat, 
  joinChat, 
  error 
}) => 
  <div className={ClassConnectedUser}> 
    <Text text={"Select a User"} />
    { 
      !(isEmpty(error)) &&  
      <Text text={error} />  
    }
    <TextInput 
      onChange={e => pickUserForChat(e.target.value)} 
      placeHolder={"Enter user you want to chat"} 
      type="text" 
      value={selectUser}
    />
    <Button text={"Join"} onClick={joinChat} />
  </div>



export default ConnectedUser;