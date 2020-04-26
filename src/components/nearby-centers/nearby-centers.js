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
      if (this.userLocation && this.userLocation.latitude) {
        this.showMap();
      } else {
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
      // Picas en el mapa
      new google.maps.Marker({ position: { lat: this.userLocation.latitude, lng: this.userLocation.longitude }, map: map })


      //Centrar en un punto el mapa
      //map.setCenter(results[0].geometry.location);

      //Traducción Dirección => Coordenadas
      // this.addressToCordinates('Calle Don Desi 22')
    }
    
  }

  addressToCordinates(address){
    // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCM-Ig8uBc3tefkBn4_GKXAdkmr9NLrqDY')
    // .then(response => response.json()).then(elem => console.log(elem));
    
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        // console.log({latitude: coordinates.lat(),longitude: coordinates.lng()});
        console.log(results[0].geometry.location);
        
        // var resultados = results[0].geometry.location,
        //   resultados_lat = resultados.lat(),
        //   resultados_long = resultados.lng();

      
      } else {
        var mensajeError = "";
        if (status === "ZERO_RESULTS") {
          mensajeError = "No hubo resultados para la dirección ingresada.";
        } else if (status === "OVER_QUERY_LIMIT" || status === "REQUEST_DENIED" || status === "UNKNOWN_ERROR") {
          mensajeError = "Error general del mapa.";
        } else if (status === "INVALID_REQUEST") {
          mensajeError = "Error de la web. Contacte con Name Agency.";
        }
        console.log(mensajeError);
      }
    });
  }
}

customElements.define('nearby-centers', NearbyCenters);
