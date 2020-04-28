import { html, css, LitElement } from 'lit-element';

export class CenterCard extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: rgb(var(--green-color),0.3);
      border-radius: 15px;
      margin: 5px;
      width: 300px;
      box-sizing: border-box;
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
      <div id="center">
        <h2>${this.center.nombre}</h2>
        <h4>${this.center.telefono}</h4>
        <h4>${this.center.direccion}</h4>
      </div>
    `;
  }

}

customElements.define('center-card', CenterCard);
