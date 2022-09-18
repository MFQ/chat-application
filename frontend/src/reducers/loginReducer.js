import { uniq } from "lodash"
import { loginInitalState } from "../initalStates"
import { ENTER_PASSWORD, ENTER_USERNAME, LOGINING_COMPLETE, LOGIN_ERROR, SEND_LOGINING } from "../actions"

const loginReducer = (state=loginInitalState, action) => {

  const { username, password, errors } = action.payload;

  switch(action.type) {

    case ENTER_PASSWORD:
      return {
        ...state,
        password
      }

    case ENTER_USERNAME:
      return {
        ...state,
        username
      }

    case SEND_LOGINING:
      return {
        ...state,
        loading: true,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        errors: uniq([...state.errors, ...errors])
      }

    case LOGINING_COMPLETE:
      return {
        ...state,
        loading: false,
        errors: []
      }  

    default:
      return state;
  }

}

export default loginReducer;
