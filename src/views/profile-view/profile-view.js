import { html, css, LitElement } from 'lit-element';

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
    };
  }

  constructor() {
    super();
  }


  render() {
    return html`
    <h1>PROFILE</h1>
    `;
  }

}

customElements.define('profile-view', ProfileView);
