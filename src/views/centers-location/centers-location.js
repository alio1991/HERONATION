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
        userLocation: {
            type: Object
        }
    };
  }

  constructor() {
    super();
  }

  stateChanged(state){
    this.userLocation = state.location ? state.location : state.coordinates;
    if(state.location){ //Tiro de dirección

    }else{ //tiro de coordenadas

    }

  }

  render() {
    return html`
        <h1>${ this.userLocation || 'CENTERS'}</h1>
        <a href="/">Return</a>
    `;

  }


}

customElements.define('centers-location', CentersLocation);
