import { html, css, LitElement } from 'lit-element';
import { initRouter } from '../../router';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'
import { setUserInfo } from './../../redux/actions/actions.js';
import { LOGIN_TYPE } from '../../assets/data/data.js';
import '../../components/main-header/main-header.js';


export class LandingPage extends connect(store) (LitElement) {

  static get styles() {
    return css`
    :host, main{
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      border: 0px;
      overflow-x: hidden;
    }
    
    .citizen-background{
      background-color: rgba(var(--purple-color), .3)
    }

    .corporation-background{
      background-color: rgba(var(--green-color), .3)
    }
    `;
  }

  static get properties() {
    return {
      _page: {
        type: String
      },
      loginType:{
        type: String
      }
    };
  }

  constructor() {
    super();
    this._page = '';
  }

  firstUpdated() {

    const corporationDataExample = {
      nombre:'RM.CORP',
      email:'rmc@gmail.com',
      telefono:'689571257',
      contrasena:'*******',
      direccion:'Calle el misterio 99',
      rol:'CORPORATION',
      preferenciasCategoriaProductos: []
    }
    const citizenDataExample = {
      nombre:'Juan',
      apellidos:'Pérez',
      email:'jp@gmail.com',
      telefono:'698598645',
      contrasena:'***********',
      direccion:'Calle del Pepe 40',
      rol:'CITIZEN',
      peticionUsuarioDonantes: []
    }
    //TODO mock y consumir de back
    store.dispatch(setUserInfo(citizenDataExample));
  }

  stateChanged(state) {
    this.loginType = state.loginStatus.loginType;
  }

  render() {
    return html`
    <main-header .companyName=${"HERO|NATION"} .userLogged=${false}></main-header>
    <main></main>
    `;
  }

  updated(changeProps) {
    if (changeProps.has('_page')) {
      initRouter(this.shadowRoot.querySelector('main'));
    }
    if(changeProps.has('loginType')){
      this.getBackgroundColor();
    }
  }

  getBackgroundColor(){
    if(this.shadowRoot.querySelector('main').classList.length > 0)
      this.shadowRoot.querySelector('main').classList.remove(...this.shadowRoot.querySelector('main').classList);
    LOGIN_TYPE.forEach(login => {
      if(login.name===this.loginType)
        this.shadowRoot.querySelector('main').classList.add(login.className)
    })
  }
}
customElements.define('landing-page', LandingPage);
