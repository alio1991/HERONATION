import { html, css, LitElement } from 'lit-element';
import { initRouter } from '../../router';

export class MainHeader extends LitElement {

  static get styles() {
    return css`
    :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: red;
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
    const findComponent = this.userLogged ? html`<h1>Logged</h1>` : html`<h1>UNLOGGED</h1>`;
    // <find-component></find-component> : <logged-component></logged-component>;
    return html`
        <div class="logo-name">
            <h1>${this.companyName}</h1>
        </div>
        <div>
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
