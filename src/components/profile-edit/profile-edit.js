import { html, css, LitElement } from 'lit-element';
import { store } from './../../redux/store.js';
import { setUserInfo } from './../../redux/actions/actions.js';

export class ProfileEdit extends LitElement {

  static get styles() {
    return css`
    :host {
      width: 100%;
      height:100%;
      margin: 20px;
    }

    .form-field{
      display: flex;
      flex-direction: column;
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
    const excludeList = ['rol', 'email','peticionUsuarioDonantes'];
    for(let field in this.userData){
      if(!excludeList.includes(field)){
        indexList.push(field);
      }
    }
    return html`
    <h3>Modifica aquí tus datos ${this.userData.nombre}</h3>
    <div id="form">
    ${
      indexList.map(field =>{
        return html`<div><label>${field} </label><input class="form-field" name="${field}" type="text" value="${this.userData[field]}"/></div>`
      })
    }
    </div>
    <button type="button" @click=${this.saveData} >Guardar</button>
    `
  }

  saveData(){
    [].slice.call(this.shadowRoot.querySelectorAll('.form-field')).map(formInput =>{
      this.userData[formInput.name] = formInput.value;
    });    
    store.dispatch(setUserInfo(this.userData));
    //Peti Back
  }
}

customElements.define('profile-edit', ProfileEdit);