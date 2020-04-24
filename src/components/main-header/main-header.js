import { html, css, LitElement } from 'lit-element';
import { initRouter } from '../../router';
import '../../styles.css';
import '../find-centers/find-centers.js';
import '../logged-user/logged-user.js';

export class MainHeader extends LitElement {

  static get styles() {
    return css`
    :host {
      width: 100%;
        display: flex;
        align-items: center;
        height: var(--header-height);
        border-bottom: 2px solid black;padding: 5px;
        box-sizing: border-box;
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
      justify-content: center;
      flex-grow: 3;
      min-width: fit-content;
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
  }

  // <nav>
  //     <a href="/test-page">Test</a>
  //     <a href="/testing-page">Testing</a>
  // </nav>

  render() {
    const findComponent = this.userLogged ? html`<logged-user></logged-user>` :  html`<find-centers></find-centers>`;
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
