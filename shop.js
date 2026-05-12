const items = [
  { id: 'bonus', name: 'Money bonus', price: 150, sold:false},
  { id: 'invis', name: 'Invisability', price: 200, sold:false}
];
const itemsContainer = document.querySelector('.items');
const coinTxt = document.querySelectorAll('.coinsBtn')

export default function renderShop() {
    items.forEach(item => {
      const card = document.createElement('div');
      const itemName = document.createElement('h2');
      const itemPrice = document.createElement('h4')
      const itemButton = document.createElement('button');

      card.classList.add('itemCard');
      itemName.classList.add('itemName');
      itemPrice.classList.add('itemPrice');
      itemButton.classList.add('itemButton');

      itemName.innerHTML = `${item.name}`;
      itemPrice.innerHTML = item.price;
      itemButton.textContent = 'BUY!';

      item.sold = localStorage.getItem(`sold-${item.id}`) === 'true';

      itemButton.addEventListener('click', ()=> {
        let coin = Number(localStorage.getItem('coins')) || 0;

        if(coin >= item.price && item.sold === false) {
          coin -= item.price
          item.sold = true;

          coinTxt.forEach(txt => {
            txt.textContent = `${coin} 🪙`;
            localStorage.setItem('coins', coin)
            localStorage.setItem(`sold-${item.id}`, 'true')
          })
        }
      });

      itemsContainer.appendChild(card);
      card.appendChild(itemName);
      card.appendChild(itemPrice);
      card.appendChild(itemButton);
    })
  }