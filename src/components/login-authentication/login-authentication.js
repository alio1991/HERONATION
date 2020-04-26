import { html, css, LitElement } from 'lit-element';
import { EMAIL_REG } from '../../assets/data/data.js'

export class LoginAuthentication extends LitElement {
  static get properties() {
    return {
      loginType: {
        type: Object
      },
      email: {
        type: String
      },
      password:{
        type: String
      },
      errorMessages: {
        type: Array
      }
    };
  }

  constructor(){
    super();
    this.email='';
    this.password='';
    this.errorMessages = [];
  }

  render() {
    return html`
      <div class="authentication-container">
        <form>
          <label for="email">Email:</label>
          <input type="text" name="email" id="email" placeholder="Your email" aria-label="Insert your email" @keyup="${this.email}" required>
          <label for="password">Contraseña:</label>
          <input type="password" name="password" id="password" placeholder="Insert Password" aria-label="Insert your password" @keyup="${this.password}" required>
          ${this.errorMessages}
          <button ?disabled=${this.isValidLogin} @click="${this._submitValidation}">Send</button>
        </form>
      </div>
    `;
  }

  isFormValid(){
    let errors = [];
    if(!EMAIL_REG.test(this.email)) errors.push("Email is not valid");
    if(this.password.length < 4 || this.password.length > 8) errors.push("Password must have between 4 and 8 characters");
    if(errors.length>0)this.errorMessages=[...errors];
    return errors.length;
  }

  _submitValidation(){
    if(this.isFormValid===0){
      //make submit
    }
  }
}
customElements.define('login-authentication', LoginAuthentication);