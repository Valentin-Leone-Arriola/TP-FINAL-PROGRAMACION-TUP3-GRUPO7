class ShoppingSteps extends HTMLElement {
    connectedCallback(){
        this.innerHTML = '<br>                                              <div class="shopping-steps">                                        <span class="step-carrito"><img src="./resources/img/double-next-arrow.png"> Carrito</span>                                                                <span class="step-identificacion"><img src="./resources/img/double-next-arrow.png"> Identificación</span>                                                                <span class="step-entrega"><img src="./resources/img/double-next-arrow.png"> Entrega</span>                                                               <span class="step-pago"><img src="./resources/img/double-next-arrow.png"> Pago</span>                                                                  <span class="step-confirmacion"><img src="./resources/img/double-next-arrow.png"> Confirmación</span>                                                                  </div>'
    }
}

customElements.define('shopping-steps', ShoppingSteps);