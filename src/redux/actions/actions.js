export const setAppName = (appName)=>{
  return {
    type: 'SET_APPNAME',
    appName
  }
}

export const setLocation = (location)=>{
  return {
    type: 'SET_LOCATION',
    location
  }
}

export const setCoordinates = (coordinates)=>{
  return {
    type: 'SET_COODINATES',
    coordinates
  }
}

export const setLogin = (loginType)=>{
  return {
    type: 'SET_LOGIN',
    loginType
  }
}

export const setLogout = ()=>{
  return {
    type: 'SET_LOGOUT'  }
}
