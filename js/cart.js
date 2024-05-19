function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}

let cartItems = []; // array

function addToCart(button) {
    event.preventDefault(); 
    const cardContent = button.parentElement;
    const itemName = cardContent.querySelector('.item-name').textContent;
    const itemPrice = parseFloat(cardContent.querySelector('.item-price').textContent.replace('₱', '').trim());
    const quantityInput = cardContent.querySelector('input[type="number"]');
    const quantity = parseInt(cardContent.querySelector('input[type="number"]').value);

    if (quantity <= 0) {
        alert("Please enter a valid quantity greater than 0.");
        quantityInput.value = 0;
        return;
    }

    const item = {
        name: itemName,
        price: itemPrice,
        quantity: quantity,
        totalPrice: itemPrice * quantity
    };

    cartItems.push(item);
    updateCartDisplay();
    updateCartStatusImage();
    alert("Added to Cart");

    quantityInput.value = 0;
}

function updateCartDisplay() {
    const cartTable = document.getElementById('cart-table');
    cartTable.innerHTML = '';

    const headerRow = cartTable.insertRow(0);
    const headers = ['Item Name', 'Quantity', 'Price per Item', 'Total Price'];

    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    let totalCartPrice = 0;

    cartItems.forEach(item => {
        const row = cartTable.insertRow(-1);

        const nameCell = row.insertCell(0);
        nameCell.textContent = item.name;

        const quantityCell = row.insertCell(1);
        quantityCell.textContent = item.quantity;

        const priceCell = row.insertCell(2);
        priceCell.textContent = `₱ ${item.price}`;

        const totalPriceCell = row.insertCell(3);
        totalPriceCell.textContent = `₱ ${item.totalPrice}`;

        totalCartPrice += item.totalPrice;
    });

    const totalRow = cartTable.insertRow(-1);
    const totalCell = totalRow.insertCell(0);
    totalCell.colSpan = 4;
    totalCell.textContent = `Total Cart Price: ₱ ${totalCartPrice}`;
}

function updateCartStatusImage() {
    const cartStatusImage = document.getElementById('shopping-icon');
    if (cartItems.length > 0) {
        cartStatusImage.src = "images-shopping/shopping cart-loaded.png";
    } else {
        cartStatusImage.src = "images-shopping/shopping cart.png";
    }
}

function displayCart(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const amountInput = document.getElementById('amount');

    const name = nameInput.value;
    const address = addressInput.value;
    const amount = parseFloat(amountInput.value);
    let totalCartPrice = 0;

    cartItems.forEach(item => {
        totalCartPrice += item.totalPrice;
    });

    const change = amount - totalCartPrice;

    if (amount < totalCartPrice || change < 0) {
        alert("Your given amount is insufficient.");
        return;
    } else if (name == "" || address == "") {
        alert("Please fill in your name and address.");
        return;
    }

    let itemsPurchased = '';
    cartItems.forEach(item => {
        itemsPurchased += `${item.quantity} x ${item.name} (₱ ${item.price} each, Total: ₱ ${item.totalPrice})\n`;
    });

    const confirmationMessage = `Confirm your order details:\n\nName: ${name}\nAddress: ${address}\n\nItems Purchased:\n${itemsPurchased}\nTotal Cart Price: ₱ ${totalCartPrice}\nGiven Amount: ₱ ${amount}\nChange: ₱ ${change.toFixed(2)}\n\nProceed to order confimration?`;

    if (confirm(confirmationMessage)) {
        const confirmationMessage = `Do you confirm all of your order details?`;
        if (confirm(confirmationMessage)){
            alert("Thank you for your order!");
        }

        cartItems = [];
        updateCartDisplay();
        updateCartStatusImage();

        nameInput.value = "";
        addressInput.value = "";
        amountInput.value = "";

        togglePopup();
    }
}
