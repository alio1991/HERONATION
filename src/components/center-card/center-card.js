import { html, css, LitElement } from 'lit-element';

export class CenterCard extends LitElement {

  static get styles() {
    return css`
    h2, h4{
      margin: 0px;
    }

    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .container{
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: 450px;
      width: 80%;
      height: 180px;
      background-color: rgba(var(--base-color), .9);
      border-radius: 10px;
      margin: 5px;
      box-sizing: border-box;
      overflow:hidden;
      align-items: flex-start;
    }

    .text-container{
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      text-align: left;
      flex-direction: column;
      align-items: center;
      z-index:4;
      font-weight: 700;
      color: white;
      text-shadow:    
      -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
      font-size: 1.2em;
    }

    .background-styling{
      position: absolute;
      top: 30px;
      right: 50px;
      width: 80px;
      height: 200px;
      z-index: 0;
    }
    
    .medium-circle{
      background-color: rgba(var(--purple-color), .6);
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .small-circle{
      background-color: rgba(var(--purple-color), .9);
      border-radius: 50%;
      margin-left: 65px;
      margin-top: -50px;
      width: 55px;
      height: 55px;
    }

    .data{
      display: flex;
      flex-direction: column;
      text-align: left;
      padding-top: 15px;
      text-shadow: 0 0 0 black;
      font-size: 1.2rem;
      color: black;
    }

    label{
      text-shadow:    
      -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
      color: white;
      font-size: 1.5rem;
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
    console.log(this.center);
    
    return html`
      <div id="center" class="container">
        <div class="text-container">
         <h2>${this.center.nombre}</h2>
          <div class="data">
            <h4><label>Teléfono:</label> ${this.center.telefono ||  'Desconocido'}</h4>
            <h4><label>Email:</label> ${this.center.usuario.email}</h4>
            <h4><label>Calle:</label> ${this.center.direccion ? this.center.direccion.calle : 'Desconocido'}</h4>
            <h4><label>Población:</label> ${this.center.direccion ? this.center.direccion.poblacion.nombre : 'Desconocido'}</h4>
          </div>
        </div>
        <div class="background-styling">
          <div class="medium-circle"></div>
          <div class="small-circle"></div>
        </div>
      </div>
    `;
  }

}

customElements.define('center-card', CenterCard);
