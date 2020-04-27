import { html, css, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';

export class RegisterForm extends LitElement {

  static get styles() {
    return css`
    :host {
      width: 100%;
      height:100%;
    }

    .form-field{
      display: flex;
      flex-direction: column;
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
      <div id="form">
        <div><label>Email: </label><input class="form-field" aria-label="Insert your email" name="mail" type="text" required/></div>
        <div><label>Contraseña: </label><input class="form-field" aria-label="Insert a password" name="password" type="password" required></div>
        ${this.getOwnFields()}
        <div><label>Teléfono: </label><input class="form-field" aria-label="Insert your Phone" name="telefono" type="tel" required/></div>
        <div><label>Calle: </label><input class="form-field" aria-label="Insert your street" name="calle" type="text" required/></div>
        <div><label>Código Postal: </label><input class="form-field" aria-label="Insert your postal code" name="codigo-postal" type="text" required/></div>
        <div><label>Provincia: </label><input class="form-field" aria-label="Insert your province" name="provincia" type="text" required/></div>
      </div>
      <button @click=${() => this.tryRegister()} type="button">Register</button>
    `;
  }

  getOwnFields(){    
    return this.loginType === 'CITIZEN' ? 
    html`<div><label>Apellidos: </label><input class="form-field" aria-label="Insert your lastname" name="apellidos" type="text" required/></div>` : 
    html`<div><label>CIF: </label><input class="form-field" aria-label="Insert your CIF" name="CIF" type="text" required/></div>`;
  }

  tryRegister(){
    let required = [];
    [].slice.call(this.shadowRoot.querySelectorAll('.form-field')).map(field =>{
      if(field.value){
        this.registerObject[field.name] = field.value;
      }else{
        required.push(field.name);
      }
    });
    if(!required.length){
      Router.go(this.loginType === 'CITIZEN' ? '/features' : '/management');
    }else{
      alert(`El campo ${required[0]} es obligatorio.`);
    }
  }
}

customElements.define('register-form', RegisterForm);
