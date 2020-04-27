import { html, css, LitElement } from 'lit-element';
import { store } from './../../redux/store.js';
import '../../components/profile-edit/profile-edit.js';
export class ProfileView extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      padding-top: var(--header-height);
      width: 100%;
      height:100%;
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
    return html`
    <profile-edit .userData=${this.userData}></profile-edit>
    `;
  }

}

customElements.define('profile-view', ProfileView);
