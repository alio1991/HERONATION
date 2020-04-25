import { LOGIN_TYPE } from '../../assets/data/data.js';
const initialStatus = {
  appName: 'Name',
  location: {
    stringLocation: '',
    coordinatesLocation:
    {
      longitude: 0,
      latitude: 0,
    }
  },
  loginStatus:
  {
    status: false,
    loginType: 'NONE'
  }
};

export const reducer = (state = initialStatus, action) => {
  switch (action.type) {
    case 'SET_APPNAME':
      return {
        ...state,
        appName: action.appName
      }
    case 'SET_LOCATION':
      return {
        ...state,
        location: {
          stringLocation: action.location.stringLocation
        }
      }
    case 'SET_LOGIN':
      let newLogin = initialStatus.loginStatus;
      LOGIN_TYPE.forEach(login => {
        if (login === action.loginType && login !== 'NONE') {
          newLogin.status = true;
          newLogin.loginType = login;
        }
      })
      return {
        ...state,
        loginStatus: { ...newLogin }
      }
    default:
      return state;
  }
}