import { html, css, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';

export class ManagementView extends LitElement {

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
  }


  render() {
    return html`
    <h1>MANAGEMENT</h1>
    `;
  }

}

customElements.define('management-view', ManagementView);
