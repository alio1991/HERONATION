import { html, css, LitElement } from 'lit-element';


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
      loginType: {
      }
    };
  }

  constructor() {
    super();
  }


  render() {
    return html`
      <div id="form">
        <div class="form-field"><label>Email: </label><input name="mail" type="text"/></div>
        <div class="form-field"><label>Contraseña: </label><input name="password" type="password"></div>
        ${this.getOwnFields()}
        <div class="form-field"><label>Teléfono: </label><input name="telefono" type="tel"/></div>
        <div class="form-field"><label>Calle: </label><input name="calle" type="text"/></div>
        <div class="form-field"><label>Código Postal: </label><input name="codigo-postal" type="text"/></div>
        <div class="form-field"><label>Provincia: </label><input name="provincia" type="text"/></div>
      </div>
    `;
  }

  getOwnFields(){    
    return this.loginType === 'CITIZEN' ? 
    html`<div class="form-field"><label>CIF: </label><input name="CIF" type="text"/></div>` :  
    html`<div class="form-field"><label>Apellidos: </label><input name="apellidos" type="text"/></div>`;
  }
}

customElements.define('register-form', RegisterForm);
