import { html, css, LitElement } from 'lit-element';
import { initRouter } from '../../router';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'
import '../../components/main-header/main-header.js';


export class LandingPage extends connect(store) (LitElement) {

  static get styles() {
    return css`
    :host, main{
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      border: 0px;
      overflow-x: hidden;
      background-color: rgba(var(--base-color), .5)
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
    <main-header .companyName=${"HERO|NATION"} .userLogged=${false}></main-header>
    <main></main>
    `;
  }

  updated(changgeProps) {
    if (changgeProps.has('_page')) {
      initRouter(this.shadowRoot.querySelector('main'));
    }
  }
}

customElements.define('landing-page', LandingPage);
