import { html, css, LitElement } from 'lit-element';
import '../../styles.css';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'
import '../../components/nearby-centers/nearby-centers.js';

export class CentersLocation extends connect(store)(LitElement) {

  static get styles() {
    return css`
    :host {
      display: flex;
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
      flex-direction: column;
      width: 20%;
      background-color: rgb(var(--dark-color),0.7);
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
      }
    };
  }

  constructor() {
    super();
    this.centersLocation = [
      {
        name:'Ejemplo1',
        location: 'Calle pepino 22',
        avoids:['Perecederos']
      },
      {
        name:'Ejemplo2',
        location: 'Calle sinsajo 50',
        avoids:['No perecederos']
      },
      {
        name:'Ejemplo3',
        location: 'Calle lerele 10',
        avoids:['Juguetes','Muebles','Productos de limpieza']
      },
    ];
  }

  stateChanged(state) {
    this.userLocation = state.location ? state.location : state.coordinates;
    if (state.location) { //Tiro de dirección

    } else { //tiro de coordenadas

    }

  }

  render() {
    return html`
        <nearby-centers .centersLocation=${this.centersLocation} .userLocation =${this.userLocation}></nearby-centers>
        <div class="filters">
          <div class="filter-option"><input type="checkbox"/><label>Opción A</label></div>
          <div class="filter-option"><input type="checkbox"/><label>Opción B</label></div>
          <div class="filter-option"><input type="checkbox"/><label>Opción C</label></div>
          <div class="filter-option"><input type="checkbox"/><label>Opción D</label></div>
        </div>
    `;
  }

}

customElements.define('centers-location', CentersLocation);
