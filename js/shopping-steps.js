class ShoppingSteps extends HTMLElement {
    connectedCallback(){
        this.innerHTML = '<br>                                              <div class="shopping-steps">Carrito                                 <img src="./resources/img/006-next.png"> Identificación              <img src="./resources/img/006-next.png"> Entrega                     <img src="./resources/img/006-next.png"> Pago                        <img src="./resources/img/006-next.png"> Confirmación                                                            </div>'
    }
}

customElements.define('shopping-steps', ShoppingSteps);