import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js';
import '../../components/profile-edit/profile-edit.js';
export class ProfileView extends connect(store) (LitElement) {

  static get styles() {
    return css`
    :host {
      display: flex;
      padding-top: var(--header-height);
      width: 100%;
      height: calc(100vh - var(--header-height));
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
  
  stateChanged(state) {
    this.userData = state.userInfo;
  }

  render() {
    return html`
    <profile-edit .userData=${this.userData}></profile-edit>
    `;
  }

}

customElements.define('profile-view', ProfileView);
