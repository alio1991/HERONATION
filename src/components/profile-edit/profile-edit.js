import { html, css, LitElement } from 'lit-element';
import { store } from './../../redux/store.js';
import { setUserInfo } from './../../redux/actions/actions.js';

export class ProfileEdit extends LitElement {

  static get styles() {
    return css`
    :host {
      width: 100%;
      height: 100%;
      margin: 20px;
    }

    h3{
      color: rgb(var(--purple-color));
      text-shadow: 0px 0px 2px rgba(var(--base-color), .9);
    }
    .main-container{
      width:60%;
      height: fit-content;
      margin-left: 20%;
      display: flex;
      justify-content: center;
    }

    .register-container{
      display: relative;
      width: fit-content;
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

    #form div{
      margin-top: 10px;
    }
    label{
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
      margin-bottom: 25px;
      float:right;
    }
    `;
  }

  static get properties() {
    return {
      userData: Object
    };
  }

  constructor() {
    super();
  }

  firstUpdated() {
    this.userData = store.getState().userInfo
  }

  render() {
    const indexList = [];
    const excludeList = ['rol', 'email', 'peticionUsuarioDonantes', 'id', 'preferenciasCategoriaProductos'];
    for (let field in this.userData) {
      if (!excludeList.includes(field)) {
        indexList.push(field);
      }
    }
    return html`
    <div class="main-container">
      <div class="register-container">
        <div class="background-styling"></div>
          <div class="form-container">
            <h3>Modifica aquí tus datos ${this.userData.nombre}</h3>
            <div id="form">
              ${
                indexList.map(field => {
                  return html`<div><label>${field} </label><input class="form-field" name="${field}" type="text" value="${this.userData[field]}"/></div>`
                })
                }
              </div>
              <button type="button" @click=${this.saveData} >Guardar</button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  saveData() {
    [].slice.call(this.shadowRoot.querySelectorAll('.form-field')).map(formInput => {
      this.userData[formInput.name] = formInput.value;
    });
    store.dispatch(setUserInfo(this.userData));
    //Peti Back
  }
}

customElements.define('profile-edit', ProfileEdit);