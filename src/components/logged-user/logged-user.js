import { html, css, LitElement } from 'lit-element';
import { initRouter } from '../../router';

export class LoggedUser extends LitElement {

  static get styles() {
    return css`
    :host {
    }
    `;
  }

  static get properties() {
    return {
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
    return html`
        <h1>Logged</h1>
    `;

  }

  updated(changgeProps) {
    if (changgeProps.has('_page')) {
      initRouter(this.shadowRoot.querySelector('main'));
    }
  }
}

customElements.define('logged-user', LoggedUser);
