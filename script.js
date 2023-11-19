// Get references to the form and items list elements in the HTML
const groceryForm = document.getElementById('grocery-form');
const itemsList = document.getElementById('items-list');

// Load items from local storage, or initialize an empty array if no data is present
const groceryList = JSON.parse(localStorage.getItem('groceryList')) || [];

// Function to render the grocery list
function renderGroceryList() {
    // Clear the existing content of the items list
    itemsList.innerHTML = '';

    // Loop through each item in the groceryList array and create a list item for it
    groceryList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('item');

        // Create an input element for the checkbox
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

        // Append the list item to the itemsList
        itemsList.appendChild(listItem);
    });
}

// Initial rendering of the grocery list
renderGroceryList();

// Event listener for the form's submit event
groceryForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get the values entered in the form
    const itemName = document.getElementById('item-name').value;
    const itemAmount = document.getElementById('item-amount').value;

    if (itemName && itemAmount) {
        // Create a new item object and add it to the groceryList array
        const newItem = {
            name: itemName,
            amount: itemAmount,
            checked: false,
        };
        groceryList.push(newItem);

        // Update the local storage with the modified groceryList
        localStorage.setItem('groceryList', JSON.stringify(groceryList));

        // Re-render the grocery list
        renderGroceryList();

        // Reset the form fields
        groceryForm.reset();
    } else {
        alert('Both item name and amount are required.');
    }
});

// Event listener for the items list, handling checkbox and delete button clicks
itemsList.addEventListener('click', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        // Toggle the "checked" property of the corresponding grocery item
        const index = e.target.getAttribute('data-index');
        groceryList[index].checked = e.target.checked;

        // Update local storage with the modified groceryList and re-render
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        renderGroceryList();
    } else if (e.target.matches('button')) {
        // Remove the item when the delete button is clicked
        const index = e.target.getAttribute('data-index');
        groceryList.splice(index, 1);

        // Update local storage with the modified groceryList and re-render
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        renderGroceryList();
    }
});
