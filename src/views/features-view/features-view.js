import { html, css, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';

export class FeaturesView extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      padding-top: var(--header-height);
      width: 100%;
      height:100%;
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
    <h1>FEATURES!!</h1>
    `;
  }

}
customElements.define('features-view', FeaturesView);
