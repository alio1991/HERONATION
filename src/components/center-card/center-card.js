import { html, css, LitElement } from 'lit-element';

export class CenterCard extends LitElement {

  static get styles() {
    return css`
    h2, h4{
      margin:0px;
    }

    :host {
    }

    .container{
      position: relative;
      display: flex;
      flex-direction: column;
      width: 300px;
      height: 150px;
      background-color: rgba(var(--base-color), .8);
      border-radius: 10px;
      margin: 5px;
      box-sizing: border-box;
      overflow:hidden;
    }

    .text-container{
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-content: center;
      justify-items: center;
      align-items: center;
      flex-direction: column;
      align-items: center;
      z-index:4;
      font-weight: 700;
      color: rgb(var(--base-color));
      text-shadow: 1px 1px 3px #000;
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
    return html`
      <div id="center" class="container">
      <div class="text-container">
        <h2>${this.center.nombre}</h2>
        <h4>${this.center.telefono}</h4>
        <h4>${this.center.direccion}</h4>
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
