import { html, css, LitElement } from 'lit-element';
import { store } from './../../redux/store.js';
import { baseUrl } from '../../../base.route.js'
import '../../components/donations-history/donations-history.js';
import '../../components/donation-approval/donation-approval.js';
import '../../components/need-avoid/need-avoid.js';

export class ManagementView extends LitElement {

  static get styles() {
    return css`
    :host {
      width: 100%;
      height:100%;
    }

    .management{
      width:100%;
      padding-top: var(--header-height);
      display: flex;
      flex-direction: column;
    }

    .donations{
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
    // this.donationsHistory = [];
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

    // this.donationsToApprove = [];
    
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
  firstUpdated() {
    //PENDIENTES
    const token = sessionStorage.getItem('heronationToken');
    const userId =  store.getState().userInfo.id;
    fetch(baseUrl + '/api/pendant-peticions/'+userId,{
      headers: {
        'Authorization': 'Bearer '+ token
      }})
    .then(response => response.json())
    .then(donations => {
      this.donationsToApprove = [...donations];
    });

    //DONACIONES ACEPTADAS y REVOCADAS
    fetch(baseUrl + '/api/historico-peticions/'+userId,{
      headers: {
        'Authorization': 'Bearer '+ token
      }})
    .then(response => response.json())
    .then(donations => {
      this.donationsToApprove = [...donations];
    });
  }

  render() {
    return html`
    <div class="management">
      <need-avoid></need-avoid>
      <div class="donations">
        <donation-approval .donationsToApprove=${this.donationsToApprove}></donation-approval>
        <donations-history .donationsHistory=${this.donationsHistory}></donations-history>
      </div>
    </div>
    `;
  }

}

customElements.define('management-view', ManagementView);
