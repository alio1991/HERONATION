import { html, css, LitElement } from 'lit-element';
import '../../components/donations-history/donations-history.js';
import '../../components/donation-approval/donation-approval.js';
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
      donationsHistory: Array,
      donationsToApprove: Object
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

    this.donationsToApprove = [
      {
        nombre: 'DONACION 1',
        fecha: '3/7/2010',
        empresa: 'RM ORG',
        lista: [
          {
            item: 'Patatas',
            quantity: 3,
            measure: 'Kg'
          },
          {
            item: 'Garbanzos',
            quantity: 2,
            measure: 'Uds'
          }
        ]
      },
      {
        nombre: 'DONACION 2',
        fecha: '30/3/2019',
        empresa: 'Georfy',
        lista: [
          {
            item: 'Jueguetes',
            quantity: 3,
            measure: 'Uds'
          },
          {
            item: 'Lentejas',
            quantity: 4,
            measure: 'Uds'
          }
        ]
      }
    ];
  }


  render() {
    return html`
    <div class="management">
      <donation-approval .donationsToApprove=${this.donationsToApprove}></donation-approval>
      <donations-history .donationsHistory=${this.donationsHistory}></donations-history>
    </div>
    `;
  }

}

customElements.define('management-view', ManagementView);
