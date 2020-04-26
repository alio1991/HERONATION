import { LOGIN_TYPE } from '../../assets/data/data.js';

const initialStatus = {
  appName: 'Name',
  location: '',
  coordinates: null,
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
        if (login.name === action.loginType && login.name !== 'NONE') {
          newLogin.status = true;
          newLogin.loginType = login.name;
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