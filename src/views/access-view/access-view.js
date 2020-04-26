import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js';
import { Router } from '@vaadin/router';
import '../../components/login-authentication/login-authentication.js'
import '../../components/register-form/register-form.js'

export class AccessView extends connect(store)(LitElement) {
  static get styles() {
    return css`
    .select-authentication-container{
      display: flex;
      flex-direction: column;
      width: 50%;
      margin: 8% auto;
      align-items: center;
    }

    h1{
      font-size: 3em;
      color: rgb(var(--base-color));
      text-shadow: 1px 3px 5px #030303;
    }

    .button-container{
      width: 60%;
      display: flex;
      flex-direction: row;
      justify-content:center;
      cursor: pointer;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .button{
      transform: skewX(-18deg);
      height: 100%;
      color: rgba(var(--base-color), 1);
      font-weight: 700;
      font-size: 2em;
      padding: 20% 10px;
      text-align: center;
      transition: all 1s ease;
      transition: transform 1s ease;
    }

    .button-citizen{
      background-color: rgba(var(--green-color), 1);
      margin-left:-10%;

    }
    
    .button-corporation{
      background-color: rgba(var(--purple-color), 1);
      margin-right:-10%;
    }
    
    .button-citizen:hover{
      background-color: rgba(var(--green-color), 1);
      transform-origin: center left;
      transform: scale(1.3) skewX(-18deg);
      transition: transform 1s ease;
      z-index: 2;
    }

    .button-corporation:hover{
      background-color: rgba(var(--purple-color), 1);
      transform-origin: center right;
      transform: scale(1.3) skewX(-18deg);
      transition: transform 1s ease;
      z-index: 2;
    }

    `;
  }
  static get properties() {
    return {
      profileSelected: {
        type: String
      },
      userSelection: {
        type: String
      }

    };
  }

  constructor() {
    super();
    this.userSelection = '';
  }

  stateChanged(state) {
    this.profileSelected = state.loginStatus.loginType;
  }

  
  render() {
    if (this.profileSelected !== "NONE") {
      return html`
    <div class="select-authentication-container">
    <h1>${this.profileSelected}</h1>
      <div class="button-container">
        ${this.renderAccess()}
      </div>
      ${this.showBackButton()}
    </div>
    `;
    }
    return html``;
  }

  renderAccess() {
    if (this.userSelection) {
      return this.userSelection === 'login' 
      ? html`<login-authentication .loginType=${this.profileSelected}></login-authentication>` 
      : html`<register-form .loginType=${this.profileSelected}></register-form>`;
    } else {
      return html`
      <div class="button button-citizen" tabindex="0" role="button" @click="${() => this.setUserSelection('login')}">Login</div>
      <div class="button button-corporation" tabindex="0" role="button" @click="${() => this.setUserSelection('register')}">Register</div>
        
      `;
    }
  }

  showBackButton() {
    return this.userSelection ? html`<button @click="${() => this.setUserSelection('')}">Back</button>` : html``;
  }

  setUserSelection(selection) {
    this.userSelection = selection;
  }

}

customElements.define('access-view', AccessView);