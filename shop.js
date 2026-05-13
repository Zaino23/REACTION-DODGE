const items = [
  { id: 'bonus', name: '25% Money bonus', price: 150, sold:false},
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
      const alreadyBought = localStorage.getItem(`sold-${item.id}`) === 'true' || false;

      card.classList.add('itemCard');
      itemName.classList.add('itemName');
      itemPrice.classList.add('itemPrice');
      itemButton.classList.add('itemButton');

      itemName.innerHTML = `${item.name}`;
      itemPrice.innerHTML = `${item.price} 🪙`;
      itemButton.textContent = 'BUY!';

        if(alreadyBought){
          card.classList.add('disabled');
          itemPrice.classList.add('disabled');
          itemName.classList.add('disabled');
          itemButton.classList.add('disabled');
        } else if(!alreadyBought){
          card.classList.remove('disabled');
          itemButton.classList.remove('disabled');
          itemPrice.classList.remove('disabled');
          itemName.classList.remove('disabled');
        }

      itemButton.addEventListener('click', ()=> {
        let coin = Number(localStorage.getItem('coins')) || 0;

        if(coin >= item.price && !alreadyBought) {
          coin -= item.price
          item.sold = true;

          coinTxt.forEach(txt => {
            txt.textContent = `${coin} 🪙`;
            localStorage.setItem('coins', coin)
            localStorage.setItem(`sold-${item.id}`, 'true')
            card.classList.add('disabled');
            if(item.id === 'bonus') {
            }
          })
        } 
      });

      itemsContainer.appendChild(card);
      card.appendChild(itemName);
      card.appendChild(itemPrice);
      card.appendChild(itemButton);
    })
  }