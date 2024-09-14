class SpecialHeader extends HTMLElement {
    connectedCallback(){
        this.innerHTML = '<div id="menu"><img src="./resources/img/menu.png" alt="menu" title="Menu"></div><div id="logo"><a href="./index.html"><img src="./resources/img/logo.gif" alt="logo"></a></div><div id="utilities"><input type="search" placeholder="Buscar">|<img src="./resources/img/user.png" alt="usuario" title="Usuario">|<img src="./resources/img/shopping-bag.png" alt="carrito" title="Carrito"></div>'
    }
}

class SpecialFooter extends HTMLElement {
    connectedCallback(){
        this.innerHTML = '<span class="original-reference">©2024 Grupo 7. Esta página está basada en el diseño de <a href="https://www.harveywillys.com/">HarveyWillys</a>, tienda de ropa.</span>'
    }
}


customElements.define('special-header', SpecialHeader);
customElements.define('special-footer', SpecialFooter)
