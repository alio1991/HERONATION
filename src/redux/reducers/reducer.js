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
      let newLocation = initialStatus.location;
      if (typeof action.location === "string")
        newLocation.stringLocation = action.location
      else if (Object.hasOwnProperty(action.location, 'longitude') && Object.hasOwnProperty(action.location, 'latitude'))
        [newLocation.coordinatesLocation.longitude, newLocation.coordinatesLocation.latitude] = action.location;
      else newLocation = { ...state.location }
      return {
        ...state,
        location: newLocation
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