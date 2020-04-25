import { html, css, LitElement } from 'lit-element';
import '../../styles.css';
import { initRouter } from '../../router';

export class CentersLocation extends LitElement {

  static get styles() {
    return css`
    :host {
        position: absolute;
        width: 100%;
        height: 100%;
        padding-top: var(--header-height);
    }
    `;
  }

  static get properties() {
    return {
        location: {
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
      
    return html`
        <h1>${ this.location || 'CENTERS'}</h1>
        <a href="/">Return</a>
    `;

  }


}

customElements.define('centers-location', CentersLocation);
