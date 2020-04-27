import { html, css, LitElement } from 'lit-element';

export class NewDonation extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      flex-direction: column;
      width: fit-content;
      height:100%;
    }
    `;
  }

  static get properties() {
    return {
      donationList: Array
    };
  }

  constructor() {
    super();
    this.donationList = [];
  }


  render() {
    return html`
        <div id="new-donation">
          <h1>Se un héroe y contribuye</h1>
          <form>
            <input type="text" placeholder="Elemento/s a donar"/>
            <input type="number" placeholder="Cantidad" id="quantity" name="quantity" min="0" max="100">
            <select id="unidades">
              <option value="KG">Kg</option>
              <option value="L">Litros</option>
              <option value="UD">Unidades</option>
            </select>
            <button type="button" @click=${this.addElement}>Agregar</button>
          </form>
          <div class="donation-list">
            <ul>
              ${
                this.donationList.map(elem=>{
                  return html`
                    <li>
                      ${elem.quantity} ${elem.measure} de ${elem.name}
                    </li>
                  `;
                })
              }
              </ul>
          </div>
        </div>
        ${
          this.donationList.length ? html`<button type="button" @click=${this.donate}>Realizar Donación</button>` : html``
        }
    `;
  }

  addElement(ev){
    const name = ev.target.parentElement.elements[0].value;
    const quantity = ev.target.parentElement.elements[1].value;
    const measure = ev.target.parentElement.elements[2].value;
    this.donationList = [...this.donationList,{name:name,quantity:quantity,measure:measure}]    
  }

  donate(){
    console.log('PANTALLA ELECCION DE EMPRESA');
    
  }

}

customElements.define('new-donation', NewDonation);
