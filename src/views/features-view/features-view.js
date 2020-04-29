import { html, css, LitElement } from 'lit-element';
import { baseUrl } from '../../../base.route.js'
import { store } from './../../redux/store.js';
import '../../components/new-donation/new-donation.js';
import '../../components/donations-history/donations-history.js';

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
      donationsHistory: Array
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
  }

  firstUpdated() {
    // const token = sessionStorage.getItem('heronationToken');
    // const userId =  store.getState().userInfo.id;
    // fetch(baseUrl + '/api/historico-peticions/usuario-donante/'+userId,{
    //   headers: {
    //     'Authorization': 'Bearer '+ token
    //   }})
    // .then(response => response.json())
    // .then(donations => {
    //   console.log(donations);
      
    //   this.donationsHistory = [...donations];
    // });
  }

  render() {
    return html`
      <div class="features">
        <new-donation></new-donation>
        <donations-history .donationsHistory=${this.donationsHistory}></donations-history>
      </div>
    `;
  }

}
customElements.define('features-view', FeaturesView);
