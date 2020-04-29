import { html, css, LitElement } from 'lit-element';
import { initRouter } from '../../router';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js';
import '../../styles.css';
import '../find-centers/find-centers.js';
import '../user-logged/user-logged.js';

export class MainHeader extends connect(store)(LitElement) {

  static get styles() {
    return css`
    :host {
      --margin-borders: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--header-height);
      border-bottom: 2px solid black;
      padding: var(--margin-borders);
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      background-color: rgba(var(--base-color),0.3)
    }

    a{
      text-decoration: none;
    }

    .logo-name{
      width: fit-content;
      flex-grow: 1;
      margin: 5px;
      cursor: pointer;
    }

    .user-content{
      display: flex;
      height: 100%;
      justify-content: flex-end;
      flex-grow: 3;
      width: fit-content;
      margin-right: var(--margin-borders);
    }

    `;
  }

  static get properties() {
    return {
      userLogged: {
        type: Boolean
      },
      companyName: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this._page = '';
    this.userLogged = store.getState().loginStatus.status ? store.getState().loginStatus.loginType : '';
  }

  stateChanged(state) {
    this.userLogged = state.loginStatus.status ? store.getState().loginStatus.loginType : '';
  }

  render() {
    const userName = store.getState().userInfo.nombre;
    const findComponent = store.getState().loginStatus.status
      ? html`<user-logged .userName=${userName}></user-logged>`
      : html`<find-centers></find-centers>`;

    return html`
        <div class="logo-name">
        <a href="/"><h1>${this.companyName}</h1></a>
        </div>
        <div class="user-content">
            ${findComponent}
        </div>
    `;

  }

  updated(changgeProps) {
    if (changgeProps.has('_page')) {
      initRouter(this.shadowRoot.querySelector('main'));
    }
  }
}

customElements.define('main-header', MainHeader);
