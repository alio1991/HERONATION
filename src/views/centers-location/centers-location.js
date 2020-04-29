import { html, css, LitElement } from 'lit-element';
import '../../styles.css';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'
import '../../components/nearby-centers/nearby-centers.js';
import { baseUrl } from '../../../base.route.js'

export class CentersLocation extends connect(store)(LitElement) {

  static get styles() {
    return css`
    :host {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      height: 100%;
      padding-top: var(--header-height);
    }
    
    nearby-centers{
      width: 80%;
    }

    .filters{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      width: 100%;
      background-color: rgb(var(--base-color),0.5);
      height: fit-content;
      padding: 5px;
      box-sizing: border-box;
    }
    `;
  }

  static get properties() {
    return {
      userLocation: {
        type: Object
      },
      centersLocation: {
        type: Array
      },
      categories: {
        type: Array
      },
      categoryFilter: {
        type: Array
      }
    };
  }

  constructor() {
    super();
    this.categories = [];
    this.categoryFilter = [];
  }


  firstUpdated() {

    fetch(baseUrl+'/api/categoria-productos')
    .then(response => response.json())
    .then( categories => {
      this.categories = [...categories];
    });

    fetch(baseUrl+'/api/usuario-empresas')
    .then(response => response.json())
    .then( centers => this.centersLocation = [...centers]);
  }


  stateChanged(state) {
    this.userLocation = state.location ? state.location : state.coordinates;
    if (state.location) { //Tiro de dirección

    } else { //tiro de coordenadas

    }

  }

  render() {
    return html`
        <div class="filters">
          ${this.categories.map(elem => html`<div class="filter-option"><input type="checkbox" id=${elem.id} @change=${this.filterSelected}/><label>${elem.nombre}</label></div>`)}
        </div>
        ${this.centersLocation!==undefined? html`<nearby-centers .centersLocation=${this.centersLocation} .userLocation =${this.userLocation}></nearby-centers>`: ''}
    `;
  }

  filterSelected({target}){
    const {id} = target;
    if(target.checked){
      this.categoryFilter.push(parseInt(id));
    }else{
      this.categoryFilter = [...this.categoryFilter.filter(categoryId => categoryId.toString() !== id)]
    }

    fetch(baseUrl+'/api/preferencias/categoria-producto',{
      method: 'POST',
      body: JSON.stringify(this.categoryFilter),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then( centers => {
      this.centersLocation = [...centers];
    });
    
  }

}

customElements.define('centers-location', CentersLocation);
