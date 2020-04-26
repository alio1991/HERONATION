import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js';
import { Router } from '@vaadin/router';
import '../../components/login-authentication/login-authentication.js'

export class AccessView extends connect(store)(LitElement) {
  static get styles() {
    return css`
    .select-authentication-container{
      display: flex;
      flex-direction: column;
      width: 60%;
      height: 60%;
      margin: 15% auto;
      background-color: rgba(var(--base-color), .7);
      align-items: center;
    }
    `;
  }
  static get properties() {
    return {
      profileSelected: {
        type: String
      },
      userSelection:{
        type: String
      }

    };
  }

  constructor() {
    super();
    this.userSelection='';
  }

  stateChanged(state) {
    this.profileSelected = state.loginStatus.loginType;
  }
  render() {
    if(this.profileSelected!=="NONE"){
    return html`
    <div class="select-authentication-container">
      <div>Log in as a ${this.profileSelected}</div>
      ${this.renderAccess()}
      ${this.showBackButton()}
    </div>
    `;
    }
    return html``;
  }

  renderAccess(){
    if(this.userSelection){
      return this.userSelection === 'login'? html`<login-authentication .loginType=${this.profileSelected}></login-authentication>` : html`Register`;
    }else{
      return html`
        <button @click="${()=>this.setUserSelection('login')}">Login</button>
        <button @click="${()=>this.setUserSelection('register')}">Register</button>
      `;
    }
  }
  
  showBackButton(){
    return this.userSelection? html`<button @click="${()=>this.setUserSelection('')}">Back</button>`: html``;
  }
    
  setUserSelection(selection){
    this.userSelection=selection;
  }
}

customElements.define('access-view', AccessView);