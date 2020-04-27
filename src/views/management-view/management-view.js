import { html, css, LitElement } from 'lit-element';
import '../../components/donations-history/donations-history.js';
import { Router } from '@vaadin/router';

export class ManagementView extends LitElement {

  static get styles() {
    return css`
    :host {
      width: 100%;
      height:100%;
    }

    .management{
      padding-top: var(--header-height);
      display: flex;
      justify-content: space-evenly;
    }

    `;
  }

  static get properties() {
    return {
      donationsHistory: Array
    };
  }

  constructor() {
    super();
    this.donationsHistory = [
      {
        nombre: 'DONACION 1',
        fecha: '3/7/2010',
        empresa: 'RM ORG'
      },
      {
        nombre: 'DONACION 2',
        fecha: '30/3/2019',
        empresa: 'Georfy'
      }
    ];
  }


  render() {
    return html`
    <div class="management">
      <h1>MANAGEMENT</h1>
      <donations-history .donationsHistory=${this.donationsHistory}></donations-history>
    </div>
    `;
  }

}

customElements.define('management-view', ManagementView);
