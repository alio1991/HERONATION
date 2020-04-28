import { LOGIN_TYPE } from '../../assets/data/data.js';

const initialStatus = {
  location: '',
  coordinates: null,
  userType: '',
  loginStatus:
  {
    status: false,
    loginType: 0
  },
  userInfo: {}
};

export const reducer = (state = initialStatus, action) => {
  switch (action.type) {

    case 'SET_LOCATION':
      initialStatus.location = action.location;
      initialStatus.coordinates = null;
      return {
        ...state,
        location: action.location,
        coordinates: null
      }

    case 'SET_COODINATES':
      initialStatus.coordinates = action.coordinates;
      initialStatus.location = '';
      return {
        ...state,
        coordinates: action.coordinates,
        location: ''
      }

    case 'SET_LOGIN':
      let newLogin = {...initialStatus.loginStatus};
      LOGIN_TYPE.forEach(login => {
        if (login.name === action.loginImported && login.name !== 'NONE') {
          newLogin.status = true;
          newLogin.loginType = action.loginImported;
        }
      })
      return {
        ...state,
        loginStatus: { ...newLogin }
      }
      

    case 'SET_LOGOUT':
      let copyLogin = {...initialStatus.loginStatus};
      copyLogin.status = false;
      copyLogin.loginType = 'NONE';

      return {
        ...state,
        loginStatus: { ...copyLogin }
    }

    case 'SET_USER_INFO':
      let newUserInfo = {...initialStatus.userInfo};
      for(let field in action.user){
        newUserInfo[field] = action.user[field];
      }
      initialStatus.userInfo = newUserInfo;      
      return {
        ...state,
        userInfo: { ...newUserInfo }
      }

      case 'SET_USER_TYPE':
      initialStatus.userType = action.user;      
      return {
        ...state,
        userType: action.user
      }
      

    default:
      return state;
  }

}