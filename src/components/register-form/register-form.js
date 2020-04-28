import { html, css, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';

export class RegisterForm extends LitElement {

  static get styles() {
    return css`
    :host {
      width: fit-content;
      height:100%;
    }
    .register-container{
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
    .form-field{
      display: flex;
      flex-direction: column;
    }

    .input-container label{
      font-weight: 700;
      color: rgb(var(--base-color));
      text-shadow: 0px 0px 2px #000;
      font-size: 1.2em;
    }

    input{
      border: 0px transparent;
      border-radius: 3px;
      font-size: 1em;
    }
    button{
      border: 1px solid rgba(var(--purple-color), .5);
      color: rgb(var(--purple-color));
      background-color: rgba(var(--base-color), 1);
      border-radius: 5px;
      font-weight: 700;
      align-self: flex-end;
      font-size: 1em;
      margin-top: 15px;
      float:right;
    }
    `;
  }

  static get properties() {
    return {
      loginType: String,
      registerObject: Object
    };
  }

  constructor() {
    super();
    this.registerObject = {};
  }


  render() {
    return html`
    <div class="register-container">
      <div class="background-styling"></div>
      <div class="form-container">
        <div id="form">
          <div><label>Email: </label><input class="form-field" aria-label="Insert your email" name="mail" type="text" required/></div>
          <div><label>Contraseña: </label><input class="form-field" aria-label="Insert a password" name="password" type="password" required></div>
          ${this.getOwnFields()}
          <div><label>Teléfono: </label><input class="form-field" aria-label="Insert your Phone" name="telefono" type="tel" required/></div>
          <div><label>Calle: </label><input class="form-field" aria-label="Insert your street" name="calle" type="text" required/></div>
          <div><label>Código Postal: </label><input class="form-field" aria-label="Insert your postal code" name="codigo-postal" type="text" required/></div>
          <div><label>Provincia: </label><input class="form-field" aria-label="Insert your province" name="provincia" type="text" required/></div>
          <button @click=${() => this.tryRegister()} type="button">Register</button>
        </div>
      </div>
    </div>
    `;
  }

  getOwnFields(){    
    return this.loginType === 'CITIZEN' ? 
    html`<div><label>Apellidos: </label><input class="form-field" aria-label="Insert your lastname" name="apellidos" type="text" required/></div>` : 
    html`<div><label>CIF: </label><input class="form-field" aria-label="Insert your CIF" name="CIF" type="text" required/></div>`;
  }

  tryRegister(){
    const endpoint = this.loginType==='CITIZEN' ? 'usuario-donantes' : 'usuario-empresas';
    let required = [];
    [].slice.call(this.shadowRoot.querySelectorAll('.form-field')).map(field =>{
      if(field.value){
        this.registerObject[field.name] = field.value;
      }else{
        required.push(field.name);
      }
    });
    if(!required.length){
      fetch('http://localhost:3000/'+endpoint+'/0')
      .then(response => response.json())
      .then( user => {
        console.log(user);
      });
      Router.go(this.loginType === 'CITIZEN' ? '/features' : '/management');
    }else{
      alert(`El campo ${required[0]} es obligatorio.`);
    }
  }
}

customElements.define('register-form', RegisterForm);
