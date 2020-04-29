import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js';
import { Router } from '@vaadin/router';
import { setLogout } from './../../redux/actions/actions.js';

export class UserLogged extends connect(store)(LitElement) {

  static get styles() {
    return css`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: fit-content;
      height: 100%;
    }

    .user-logo{
      border-radius: 50%;
      padding: 5px;
      background-color: rgb(var(--base-color))
    }

    .user-logo:hover{
      border-radius: 50%;
      padding: 5px;
      color: rgb(var(--base-color));
      background-color: rgb(var(--dark-color));
      cursor: pointer;
    }

    .options{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      padding: 5px;
      box-sizing: border-box;
      right: 15px;
      top: var( --header-height);
      background-color: rgb(var(--base-color),1);
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;

    }

    .option:hover{
      background-color: rgb(var(--dark-color),0.5);
      cursor: pointer;
    }

    .hidden{
      display: none;
    }

    `;
  }

  static get properties() {
    return {
      userName: {
        type: String
      },
      showDetails: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.showDetails = false;
  }


  render() {

    return html`
      <div class="user-logo" @click=${this.manageInfoVisibility}>
        <p>${this.userName}</p>
      </div>
      <div class="options hidden" @mouseleave=${this.hideInfo} >
        <div class="option" @click=${this.editInfo}>Editar perfil</div>
        <div class="option" @click=${this.logout}><u>Logout</u></div>
      </div>
    `;
  }

  manageInfoVisibility(){
    this.showDetails = !this.showDetails;
    this.showDetails 
      ? this.shadowRoot.querySelector('.options').classList.remove('hidden') 
      : this.shadowRoot.querySelector('.options').classList.add('hidden');
  }

  editInfo(){
    this.manageInfoVisibility();
    Router.go('/profile')
  }

  logout(){
    this.manageInfoVisibility();
    store.dispatch(setLogout());
    sessionStorage.removeItem('heronationToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userType');
    Router.go('/');
  }

  hideInfo(){
    this.showDetails = false;
    this.shadowRoot.querySelector('.options').classList.add('hidden');
  }

}

customElements.define('user-logged', UserLogged);
