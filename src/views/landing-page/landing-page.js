import { html, css, LitElement } from 'lit-element';
import { initRouter } from '../../router';
import '../../components/main-header/main-header.js';


export class LandingPage extends LitElement {

  static get styles() {
    return css`
    :host {
    }
    `;
  }

  static get properties() {
    return {
      _page: {
        type: String
      }

    };
  }

  constructor() {
    super();
    this._page = '';
  }


  render() {
    return html`
    <main-header .companyName=${"HERO|NATION"} .userLogged=${false}></main-headeer>
    <nav>
      <a href="/test-page">Test</a>
      <a href="/testing-page">Testing</a>
    </nav>
      <div>
          <main></main>
      </div>
    `;
  }

  updated(changgeProps) {
    if (changgeProps.has('_page')) {
      initRouter(this.shadowRoot.querySelector('main'));
    }
  }
}

customElements.define('landing-page', LandingPage);
