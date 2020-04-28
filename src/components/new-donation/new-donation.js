import { html, css, LitElement } from 'lit-element';
import { baseUrl } from '../../../base.route.js'

export class NewDonation extends LitElement {

  static get styles() {
    return css`
    :host {
      display: flex;
      flex-direction: column;
      width: fit-content;
      height:100%;
    }

    .donation-list{
      margin: 10px;
      background-color: rgba(var(--dark-color),0.8);
      color: rgba(var(--base-color),1);
      box-sizing: border-box;
      padding: 10px;
      border-radius: 15px;
    }

    .corporation{
      margin: 10px;
      background-color: rgba(var(--dark-color),0.9);
      color: rgba(var(--base-color),1);
      box-sizing: border-box;
      padding: 10px;
      border-radius: 15px;
      cursor: pointer;
    }
    `;
  }

  static get properties() {
    return {
      donationList: Array,
      corporationList: Array,
      corporationSection: Boolean
    };
  }

  constructor() {
    super();
    this.donationList = [];
    this.corporationList = [];
    this.corporationSection = false;
  }


  firstUpdated() {
    // fetch(baseUrl+'/categorias')
    // .then(response => response.json())
    // .then( categories => {
    //   this.categoryList = [...categories];
    //   this.needListToShow = [...categories];
    //   this.avoidListToShow = [...categories];
    // });
    this.corporationList = [
      {
        nombre: 'Empresa 1'
      },
      {
        nombre: 'Empresa 2'
      },
      {
        nombre: 'Empresa 3'
      }
    ]
  }

  render() {
    if(!this.corporationSection){
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
          ${
          this.donationList.length 
          ? html`
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
          </div>` 
          : html``
          }
        </div>
        ${
          this.donationList.length ? html`<button type="button" @click=${this.changeView}>Realizar Donación</button>` : html``
        }
    `;
    }else{
      return html`
      <h1>Elige un destino para tu donativo</h1>
        ${
          this.corporationList.map(enterprise => 
            html`
              <div class="corporation" @click=${this.donate}>
                <p>${enterprise.nombre}</p>
              </div>
              `)
        }
        <button type="button" @click=${this.changeView}>Atrás</button>
      `
    }
  }

  addElement(ev){
    const name = ev.target.parentElement.elements[0].value;
    const quantity = ev.target.parentElement.elements[1].value;
    const measure = ev.target.parentElement.elements[2].value;
    this.donationList = [...this.donationList,{name:name,quantity:quantity,measure:measure}]    
  }

  changeView(){
    this.corporationSection = !this.corporationSection;
  }

  donate(){
    console.log('DONAAAAAAAA');
  }

}

customElements.define('new-donation', NewDonation);
