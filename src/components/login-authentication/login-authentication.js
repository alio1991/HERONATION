import { html, css, LitElement } from 'lit-element';
import { EMAIL_REG } from '../../assets/data/data.js'

export class LoginAuthentication extends LitElement {
  static get properties() {
    return {
      profileSelected: {
        type: String
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
  
  static get styles(){
    return css`
    .login-container{
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-items: center;
      align-items: center;
    }
    label, input{
      display: block;
    }
    .input-container{
      display: inline-block;
    }
    `;
  }
  
  constructor(){
    super();
    this.profileSelected = '';
    this.email='';
    this.password='';
    this.errorMessages = [];
  }
  
  render() {
    return html`
    <div class="login-container">
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
        <button ?disabled=${this.isValidLogin} @click="${this._submitValidation}">Send</button>
      </form>
    </div>
    `;
  }
  
  setEmail(ev){
    this.email = ev.target.parentElement.firstElementChild.value;
  }
  
  setPassword(ev){
    this.password = ev.target.parentElement.firstElementChild.value;
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