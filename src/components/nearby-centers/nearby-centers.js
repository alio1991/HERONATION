import { html, css, LitElement } from 'lit-element';
import '../center-card/center-card.js';


export class NearbyCenters extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      width: 100%;
      height:70%;
    }

    #map{
      display: flex;
      margin: 10px;
      justify-content: center;
      align-items: center;
      width: 60%;
      height: 100%;
    }

    .centers-list{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40%;
      height: 100%;
    }

    `;
  }

  static get properties() {
    return {
      userLocation: {
      },
      centersLocation: {
        type: Array
      }
    };
  }

  constructor() {
    super();
  }


  render() {    
    return html`
        <div id="map">
        </div>
        <div class="centers-list">
          <h3>Centros Cercanos</h3>
          ${this.centersLocation.map(center => html`
            <center-card .center=${center}></center-card>
          `)}
        </div>
    `;
  }

  
  updated(changeProps) {
    if (changeProps.has('userLocation')) {
      if(this.userLocation && this.userLocation.latitude){
        this.showMap();
      }else{
        alert('Ubicación no detectada');
      }
    }
  }
  
  showMap() {
    if (this.userLocation.latitude) {
      let map = new google.maps.Map(
        this.shadowRoot.querySelector('div'), {
        zoom: 15,
        center: { lat: this.userLocation.latitude, lng: this.userLocation.longitude }
      }
      );
      new google.maps.Marker({ position: { lat: this.userLocation.latitude, lng: this.userLocation.longitude }, map: map })
    }
  }
}

customElements.define('nearby-centers', NearbyCenters);
