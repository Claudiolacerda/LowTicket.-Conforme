// Seletores
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.getElementById('cart-total');
const closeCartButton = document.querySelector('.close-cart');

let cart = [];
let total = 0;

// Função para atualizar carrinho
function updateCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio</p>';
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
        <button onclick="removeFromCart(${index})">Remover</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  }

  cartTotalElement.textContent = total.toFixed(2);
}

// Função para adicionar produto
addToCartButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const product = e.target.parentElement;
    const name = product.querySelector('h3').textContent;
    const price = parseFloat(product.querySelector('p').textContent.replace('R$ ', '').replace(',', '.'));

    cart.push({ name, price });
    total += price;

    updateCart();
  });
});

// Função para remover produto
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

// Botão de fechar carrinho (limpa o carrinho)
closeCartButton.addEventListener('click', () => {
  cart = [];
  total = 0;
  updateCart();
});

// Inicia carrinho vazio
updateCart();
