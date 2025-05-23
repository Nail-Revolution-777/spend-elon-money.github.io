document.addEventListener("DOMContentLoaded", function () {
    let moneyElement = document.getElementById("money");
    let money = 464000000000;
    let purchases = {};
    let totalSpent = 0;
    
    const items = [
        { name: "Coca-Cola Pack", price: 3 },
        { name: "Big Mac", price: 5 },
        { name: "Flip Flops", price: 10 },
        { name: "Movie Ticket", price: 15 },
        { name: "Starbucks Coffee", price: 6 },
        { name: "Phone Case", price: 20 },
        { name: "Wireless Mouse", price: 30 },
        { name: "Gaming Keyboard", price: 80 },
        { name: "Headphones", price: 150 },
        { name: "Smartwatch", price: 250 },
        { name: "Tablet", price: 600 },
        { name: "Smartphone", price: 1000 },
        { name: "Gaming Console", price: 500 },
        { name: "TV 55-inch", price: 800 },
        { name: "Drone", price: 1200 },
        { name: "Electric Scooter", price: 3000 },
        { name: "Designer Shoes", price: 2000 },
        { name: "Diamond Ring", price: 5000 },
        { name: "Luxury Handbag", price: 7000 },
        { name: "Motorcycle", price: 15000 },
        { name: "Small Car", price: 25000 },
        { name: "Luxury Watch", price: 50000 },
        { name: "Speedboat", price: 100000 },
        { name: "Sports Car", price: 200000 },
        { name: "Tiny House", price: 300000 },
        { name: "Private Jet Ride", price: 500000 },
        { name: "Small Apartment", price: 800000 },
        { name: "Superbike", price: 1000000 },
        { name: "Beach House", price: 3000000 },
        { name: "Private Island", price: 7000000 },
        { name: "Luxury Yacht", price: 25000000 },
        { name: "Private Jet", price: 70000000 },
        { name: "Mansion", price: 90000000 },
        { name: "NBA Team", price: 2300000000 },
        { name: "Famous Painting", price: 500000000 },
        { name: "Helicopter", price: 12000000 },
        { name: "Gold Bar (1kg)", price: 60000 },
        { name: "Personal Chef (Yearly)", price: 100000 },
        { name: "Luxury Vacation", price: 250000 },
        { name: "Mona Lisa", price: 800000000 },
        { name: "Superyacht", price: 650000000 },
        { name: "Football Club", price: 4000000000 },
        { name: "Build a Skyscraper", price: 900000000 },
        { name: "Space Flight", price: 150000000 },
        { name: "Luxury Space Hotel", price: 9000000000 },
        { name: "Super Bowl Ad", price: 7000000 },
        { name: "Fighter Jet", price: 100000000 },
        { name: "Hollywood Movie", price: 150000000 },
        { name: "Formula 1 Team", price: 2000000000 },
        { name: "NASA Rocket Launch", price: 450000000 },
        { name: "Private Space Station", price: 120000000000 },
        { name: "Mars Colony", price: 250000000000 },
        { name: "Buy a Country", price: 300000000000 },
        { name: "World", price: 460000000000 }
    ];

    function updateMoneyDisplay() {
        if (moneyElement) moneyElement.innerText = `$${money.toLocaleString()}`;
    }

    function decreaseMoney(amount) {
        let step = Math.max(1, Math.floor(amount / 10));
        let interval = setInterval(() => {
            if (amount > 0 && money > 0) {
                money -= step;
                updateMoneyDisplay();
                amount -= step;
            } else {
                clearInterval(interval);
                money = Math.round(money);
                updateMoneyDisplay();
            }
        }, 100);
    }

    function buyItem(itemName, price, quantity, index) {
        let totalPrice = price * quantity;
        if (money >= totalPrice) {
            decreaseMoney(totalPrice);
            purchases[itemName] = (purchases[itemName] || 0) + quantity;
            totalSpent += totalPrice;
            updatePurchaseSummary();

            let sellButton = document.getElementById(`sell-btn-${index}`);
            sellButton.classList.add("active");
            sellButton.disabled = false;

            let itemDiv = document.getElementById(`item-${index}`);
            itemDiv.classList.add("active"); // Add border highlight to the item
        }
    }

    function sellItem(itemName, price, index) {
        if (purchases[itemName] > 0) {
            purchases[itemName]--;
            money += price;
            updateMoneyDisplay();
            totalSpent -= price;
            updatePurchaseSummary();

            let sellButton = document.getElementById(`sell-btn-${index}`);
            if (purchases[itemName] === 0) {
                sellButton.classList.remove("active");
                sellButton.disabled = true;
            }

            let itemDiv = document.getElementById(`item-${index}`);
            itemDiv.classList.remove("active"); // Remove border highlight
        }
    }

    function updatePurchaseSummary() {
        let purchasesList = document.getElementById("purchases");
        if (!purchasesList) return;
        purchasesList.innerHTML = "";
        items.forEach((item) => {
            if (purchases[item.name] > 0) {
                let li = document.createElement("li");
                li.innerText = `${item.name} - Quantity: ${purchases[item.name]}`;
                purchasesList.appendChild(li);
            }
        });

        let totalSpentElement = document.getElementById("total-spent");
        if (totalSpentElement) {
            totalSpentElement.innerText = `Total Spent: $${totalSpent.toLocaleString()}`;
        }
    }

    const itemsContainer = document.getElementById("items-container");
    if (!itemsContainer) return;

    items.forEach((item, index) => {

        let itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.id = `item-${index}`; // Add unique ID for each item

        let itemName = document.createElement("h3");
        itemName.innerText = item.name;
        itemDiv.appendChild(itemName);

        let itemPrice = document.createElement("p");
        itemPrice.innerText = `$${item.price}`;
        itemDiv.appendChild(itemPrice);

        let quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "1";
        quantityInput.value = "1";
        itemDiv.appendChild(quantityInput);

        let buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        buyButton.onclick = () => buyItem(item.name, item.price, parseInt(quantityInput.value), index);
        itemDiv.appendChild(buyButton);

        let sellButton = document.createElement("button");
        sellButton.innerText = "Sell";
        sellButton.id = `sell-btn-${index}`;
        sellButton.classList.add("sell-btn");
        sellButton.onclick = () => sellItem(item.name, item.price, index);
        sellButton.disabled = true; // Initially disabled
        itemDiv.appendChild(sellButton);

        itemsContainer.appendChild(itemDiv);
    });

    updateMoneyDisplay();
});
document.getElementById("spendButton").addEventListener("click", function() {
    const randomAmount = (Math.random() * 1000000).toFixed(2); // 0-dan 1,000,000ə qədər təsadüfi pul miqdarı
    document.getElementById("message").innerText = `Elon Musk ${randomAmount} dollar xərclədi!`;
});