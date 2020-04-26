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
        <div><label>Email: </label><input class="form-field" name="mail" type="text"/></div>
        <div><label>Contraseña: </label><input class="form-field" name="password" type="password"></div>
        ${this.getOwnFields()}
        <div><label>Teléfono: </label><input class="form-field" name="telefono" type="tel"/></div>
        <div><label>Calle: </label><input class="form-field" name="calle" type="text"/></div>
        <div><label>Código Postal: </label><input class="form-field" name="codigo-postal" type="text"/></div>
        <div><label>Provincia: </label><input class="form-field" name="provincia" type="text"/></div>
      </div>
      <button @click=${() => this.tryRegister()} type="button">Register</button>
    `;
  }

  getOwnFields(){    
    return this.loginType === 'CITIZEN' ? 
    html`<div><label>Apellidos: </label><input class="form-field" name="apellidos" type="text"/></div>` : 
    html`<div><label>CIF: </label><input class="form-field" name="CIF" type="text"/></div>`;
  }

  tryRegister(){
    [].slice.call(this.shadowRoot.querySelectorAll('.form-field')).map(field =>{
      if(field.value){
        this.registerObject[field.name] = field.value;
      }else{
         alert(`El campo ${field.name} es obligatorio.`);
      }
    });
  }
}

customElements.define('register-form', RegisterForm);
