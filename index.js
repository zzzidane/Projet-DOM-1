document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    let totalPrice = 0;
    let cartItems = {};

    // Sélection des éléments DOM
    const cartCountElement = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartContainer = document.getElementById("cart");

    // Mettre à jour l'affichage du total et du panier
    function updateTotal() {
        totalPriceElement.textContent = `${totalPrice} FCFA`;
        cartCountElement.textContent = cartCount;
        cartContainer.style.display = cartCount > 0 ? "block" : "none";
    }

    // Mettre à jour l'affichage des articles dans le panier
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let cartTotal = 0;

        Object.entries(cartItems).forEach(([item, details]) => {
            if (details.quantity > 0) {
                const itemDiv = document.createElement("div");
                itemDiv.textContent = `${item} - Quantité: ${details.quantity}`;
                cartItemsContainer.appendChild(itemDiv);
                cartTotal += details.price * details.quantity;
            }
        });

        document.getElementById("cart-total").textContent = `${cartTotal} FCFA`;
    }

    // Gestion des événements pour chaque carte
    document.querySelectorAll(".card").forEach((card) => {
        const itemName = card.querySelector(".card-title").textContent;
        const price = parseInt(card.querySelector(".card-text").textContent);
        const quantityElement = card.querySelector(".item-quantity");
        const plusButton = card.querySelector(".quantity-plus");
        const minusButton = card.querySelector(".quantity-minus");
        const deleteButton = card.querySelector(".delete-item");
        const likeButton = card.querySelector(".like");

        // Initialiser la quantité
        quantityElement.textContent = "0";

        // Gérer l'ajout d'un article
        plusButton.addEventListener("click", () => {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;

            if (!cartItems[itemName]) {
                cartItems[itemName] = { quantity: 0, price };
            }
            cartItems[itemName].quantity++;

            totalPrice += price;
            cartCount++;
            deleteButton.style.display = "block"; // Afficher le bouton "Supprimer"
            updateTotal();
            updateCartDisplay();
        });

        // Gérer la suppression d'une unité
        minusButton.addEventListener("click", () => {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;

                if (cartItems[itemName]) {
                    cartItems[itemName].quantity--;
                    if (cartItems[itemName].quantity <= 0) {
                        delete cartItems[itemName]; // Supprime l'article s'il n'en reste plus
                        deleteButton.style.display = "none"; // Cacher le bouton "Supprimer"
                    }
                }

                totalPrice -= price;
                cartCount--;
                updateTotal();
                updateCartDisplay();
            }
        });

        // Gérer la suppression totale d'un article
        deleteButton.addEventListener("click", () => {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                totalPrice -= price * quantity;
                cartCount -= quantity;
                quantityElement.textContent = "0";
                delete cartItems[itemName];
                deleteButton.style.display = "none"; // Cacher le bouton "Supprimer"
                updateTotal();
                updateCartDisplay();
            }
        });

        // Gérer l'ajout aux favoris
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("text-danger");
        });
    });

    // Initialiser l'affichage
    updateTotal();
    updateCartDisplay();
});
