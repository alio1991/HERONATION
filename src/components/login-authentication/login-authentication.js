import { html, css, LitElement } from 'lit-element';
import { EMAIL_REG } from '../../assets/data/data.js'
import { setLogin } from './../../redux/actions/actions.js';
import { store } from './../../redux/store.js';
import { Router } from '@vaadin/router';

export class LoginAuthentication extends LitElement {
  static get properties() {
    return {
      profileSelected: {
        type: String
      },
      email: {
        type: String
      },
      password: {
        type: String
      },
      errorMessages: {
        type: Array
      }
    };
  }

  static get styles() {
    return css`
    .login-container{
      display: relative;
      width: 100%;
      height: fit-content;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      background-color: rgba(var(--base-color), .9);
      padding: 25px 25px; 
      overflow:hidden;
      border-radius: 5px;
    }
    .background-styling{
      position: relative;
      margin-top: -175px;
      margin-left:-175px;
      width: 350px;
      height: 350px;
      background-color: rgba(var(--green-color), .9);
      border-radius: 50%;
      z-index: 0;
    }
    .form-container{
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -150px;
      z-index:4;
    }

    label, input{
      display: block;
    }

    .input-container{
      line-height: 2em;
    }
    
    .input-container label{
      font-weight: 700;
      color: rgb(var(--base-color));
      text-shadow: 0px 0px 2px #000;
      font-size: 1.2em;
    }

    .input-container input{
      padding: 10px 15px; 
      border: 0px transparent;
      border-radius: 3px;
      font-size: 1em;
    }
    .form-container button{
      padding: 10px 20px;
      border: 1px solid rgba(var(--purple-color), .5);
      color: rgb(var(--purple-color));
      background-color: rgba(var(--base-color), 1);
      border-radius: 5px;
      font-weight: 700;
      margin-top: 15px;
      float: right;
      align-self: flex-end;
      font-size: 1em;
    }
    `;
  }

  constructor() {
    super();
    this.profileSelected = '';
    this.email = '';
    this.password = '';
    this.errorMessages = [];
  }

  render() {
    return html`
    <div class="login-container">
      <div class="background-styling"></div>
      <div class="form-container">
        <form>
          <div class="input-container">
            <label for="email">Email:</label>
            <input type="text" name="email" id="email" placeholder="Your email" aria-label="Insert your email" @keyup="${this.setEmail}" required>
          </div>
          <div class="input-container">
            <label for="password">Contraseña:</label>
            <input type="password" name="password" id="password" placeholder="Insert Password" aria-label="Insert your password" @keyup="${this.setPassword}" required>
            ${this.errorMessages}
          </div>
          <button type="button" ?disabled=${this.isValidLogin} @click="${this._submitValidation}">Send</button>
        </form>
      </div>
    </div>
    `;
  }

  setEmail(ev) {
    this.email = ev.target.parentElement.firstElementChild.value;
  }

  setPassword(ev) {
    this.password = ev.target.parentElement.firstElementChild.value;
  }

  isFormValid() {
    let errors = [];
    if (!EMAIL_REG.test(this.email)) errors.push("Email is not valid");
    if (this.password.length < 4 || this.password.length > 8) errors.push("Password must have between 4 and 8 characters");
    if (errors.length > 0) this.errorMessages = [...errors];
    return errors.length;
  }

  _submitValidation() {
    if (this.isFormValid === 0) {
    }
    fetch('http://localhost:3000/oauth')
    .then(response => response.json())
    .then( token => {
      if(token.status){
        store.dispatch(setLogin(token.type));
        Router.go('/');
      }
    });
  }
}
customElements.define('login-authentication', LoginAuthentication);