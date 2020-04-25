import { html, css, LitElement } from 'lit-element';
import '../../styles.css';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'

export class CentersLocation extends connect(store) (LitElement) {

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
            type: Object
        }
    };
  }

  constructor() {
    super();
  }

  stateChanged(state){
    console.log('statechanged', state)
    this.location = state.location;
  }

  render() {
      
    return html`
        <h1>${ this.location.stringLocation || 'CENTERS'}</h1>
        <a href="/">Return</a>
    `;

  }


}

customElements.define('centers-location', CentersLocation);
