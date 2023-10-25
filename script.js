const groceryForm = document.getElementById('grocery-form');
const itemsList = document.getElementById('items-list');


// Load items from local storage
const groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];

function renderGroceryList() {
    itemsList.innerHTML = '';
    groceryList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('item');

        listItem.innerHTML = `
            <input class="custom-checkbox" type="checkbox" id="checkbox-${index}" 
               ${item.checked ? 'checked' : ''} 
               data-index="${index}">
            <label for="checkbox-${index}" class="checkbox-label"></label>
            <label for="checkbox-${index}" class="item-name 
               ${item.checked ? 'checked' : ''}">${item.name}</label>
            <span class="item-amount ${item.checked ? 'checked' : ''}">${item.amount}</span>
            <button data-index="${index}">Delete</button>
        `;
        itemsList.appendChild(listItem);
    });
}

renderGroceryList();

groceryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const itemAmount = document.getElementById('item-amount').value;
    if (itemName && itemAmount) {
        const newItem = {
            name: itemName,
            amount: itemAmount,
            checked: false,
        };
        groceryList.push(newItem);
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        renderGroceryList();
        groceryForm.reset();
    } else {
        alert('Both item name and amount are required.');
    }
});

itemsList.addEventListener('click', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        const index = e.target.getAttribute('data-index');
        groceryList[index].checked = e.target.checked;
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        renderGroceryList();
    } else if (e.target.matches('button')) {
        const index = e.target.getAttribute('data-index');
        groceryList.splice(index, 1);
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        renderGroceryList();
    }
});