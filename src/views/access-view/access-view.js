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
      }
    };
  }

  constructor() {
    super();
  }

  stateChanged(state) {
    this.profileSelected = state.loginStatus.loginType;
  }
  render() {
    if(this.profileSelected!=="NONE"){
    return html`
    <div class="select-authentication-container">
      <div>Log in as a ${this.profileSelected}</div>
      <login-authentication .loginType=${this.profileSelected}></login-authentication>
    </div>
    `;
    }
    return html``;

  }

}

customElements.define('access-view', AccessView);