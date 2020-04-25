import { html, css, LitElement } from 'lit-element';
import "google-maps-limited/google-maps-limited.js";

export class NearbyCenters extends LitElement {

  static get styles() {
    return css`
    :host {
    }

    `;
  }

  static get properties() {
    return {
      userLocation: String,
      apiKey: String
    };
  }

  constructor() {
    super();
    this.apiKey = 'AIzaSyCM-Ig8uBc3tefkBn4_GKXAdkmr9NLrqDY';
  }


  render() {

    return html`
        <h1>My Google Maps Demo</h1>
    `;
  }

}

customElements.define('nearby-centers', NearbyCenters);
