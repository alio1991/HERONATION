import { html, css, LitElement } from 'lit-element';
import '../../components/new-donation/new-donation.js';

export class FeaturesView extends LitElement {

  static get styles() {
    return css`
    :host {
      width: 100%;
      height:100%;
    }

    .features{
      padding-top: var(--header-height);
      display: flex;
      justify-content: space-evenly;
    }
    `;
  }

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
    this.registerObject = {};
  }


  render() {
    return html`
      <div class="features">
        <new-donation .donationList=${['xamlpe']}></new-donation>
        <h1>Historial</h1>
      </div>
    `;
  }

}
customElements.define('features-view', FeaturesView);
