import { html, css, LitElement } from 'lit-element';
import '../../styles.css';
import { connect } from 'pwa-helpers';
import { store } from './../../redux/store.js'
import '../../components/nearby-centers/nearby-centers.js';

export class CentersLocation extends connect(store)(LitElement) {

  static get styles() {
    return css`
    :host {
      position: absolute;
      width: 100%;
      height: 100%;
      padding-top: var(--header-height);
    }
    .centers-container{
      display: flex;
      width: 100%;
      height:70%;
      margin-left: 10%;
    }
    #map{
      width: 50%;
      height: 100%;

    }
    .centers-list{
      width: 50%;
      height: 100%;
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
        <h1>${ this.userLocation || 'CENTERS'}</h1>
        <nearby-centers .centersLocation=${this.centersLocation} .userLocation =${this.userLocation}></nearby-centers>
    `;
  }

}

customElements.define('centers-location', CentersLocation);
