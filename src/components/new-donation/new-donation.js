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

    .donation-container{
      display: flex;
      width: 100%;
      margin-top: 5%;
      height: fit-content;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      background-color: rgba(var(--base-color), .7);
      padding: 25px 25px; 
      overflow:hidden;
      border-radius: 10px;

    }

    h1{
      font-weight: 700;
      color: rgba(var(--dark-color),0.8);
      font-size: 2.1em;
    }

    .donation-list, .corporation{
      align-self: flex-start;
      width: 92%;
      margin: 10px 20px;
      background-color: rgba(var(--base-color), 1);
      color: rgba(var(--dark-color),1);
      font-weight: 700;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 15px;
    }

    input, select{
      padding: 10px 15px; 
      border: 0px transparent;
      border-radius: 3px;
      font-size: 1em;
    }

    button{
      padding: 10px 20px;
      border: 1px solid rgba(var(--purple-color), .5);
      color: rgb(var(--purple-color));
      background-color: rgba(var(--base-color), 1);
      border-radius: 5px;
      font-weight: 700;
      margin-top: 15px;
      align-self: flex-end;
      font-size: 1em;
    }
    
    .button-donation{
      margin-right: 25px;
    }
    .corporation{
      margin: 10px;
      background-color: rgba(var(--purple-color),0.6);
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
    // fetch('http://localhost:3000/categorias')
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
        <div id="new-donation" class="donation-container">
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
        ${
          this.donationList.length ? html`<button class="button-donation" type="button" @click=${this.changeView}>Realizar Donación</button>` : html``
        }
        </div>
    `;
    }else{
      return html`
      <div  class="donation-container">
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
      </div>

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
