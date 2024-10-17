let cartCount = 0;
let totalPrice = 0;
let cartItems = {};


// Sélection des éléments nécessaires
const quantityPlusButtons = document.querySelectorAll('.quantity-plus');
const quantityMinusButtons = document.querySelectorAll('.quantity-minus');
const deleteButtons = document.querySelectorAll('.delete-item');
const likeButtons = document.querySelectorAll('.like');
const cartCountElement = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total');


// Mise à jour le total
function updateTotal() {
    totalPriceElement.textContent = `${totalPrice} FCFA`;
    cartCountElement.textContent = cartCount;

    // Afficher le panier si au moins un article est présent
    const cartContainer = document.getElementById('cart');
    cartContainer.style.display = cartCount > 0 ? 'block' : 'none';
}

// Gérer l'ajout et la soustraction des quantités
quantityPlusButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const cardBody = button.closest('.card-body');
        const itemQuantity = cardBody.querySelector('.item-quantity');
        const priceText = cardBody.querySelector('.card-text').textContent;
        const price = parseInt(priceText);

        // Incrémenter la quantité
        let quantity = parseInt(itemQuantity.textContent) || 0;
        quantity++;
        itemQuantity.textContent = quantity;

        // Mettre à jour le panier
        if (!cartItems[priceText]) {
            cartItems[priceText] = { quantity: 0, price };
        }
        cartItems[priceText].quantity++;

        // Mettre à jour le total
        totalPrice += price;
        cartCount++;
        updateTotal();
        updateCartDisplay();
    });
});

quantityMinusButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const cardBody = button.closest('.card-body');
        const itemQuantity = cardBody.querySelector('.item-quantity');
        const priceText = cardBody.querySelector('.card-text').textContent;
        const price = parseInt(priceText);

        // Décrémenter la quantité si supérieur à 0
        let quantity = parseInt(itemQuantity.textContent) || 0;
        if (quantity > 0) {
            quantity--;
            itemQuantity.textContent = quantity;

            // Mettre à jour le panier
            if (cartItems[priceText]) {
                cartItems[priceText].quantity--;
                if (cartItems[priceText].quantity <= 0) {
                    delete cartItems[priceText]; // Retire l'article du panier s'il n'en reste plus
                }
            }

            // Mettre à jour le total
            totalPrice -= price;
            cartCount--;
            updateTotal();
            updateCartDisplay();
        }
    });
});

// Gérer la suppression des articles
deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const cardBody = button.closest('.card-body');
        const itemQuantity = cardBody.querySelector('.item-quantity');
        const quantity = parseInt(itemQuantity.textContent) || 0;
        const priceText = cardBody.querySelector('.card-text').textContent;
        const price = parseInt(priceText) * quantity;

        // Remettre à zéro la quantité et supprimer l'article
        itemQuantity.textContent = 0;
        totalPrice -= price;
        cartCount -= quantity;
        updateTotal();

        // Supprimer l'article du panier
        delete cartItems[priceText];

        // Optionnel : cacher le bouton de suppression ou retirer le produit de l'affichage
        button.style.display = 'none'; // Ou button.closest('.card').style.display = 'none';

        // Mettre à jour l'affichage du panier
        updateCartDisplay();
    });
});

// Gérer le clic sur le bouton "aimer"
likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('text-danger'); // Change la couleur du cœur
    });
});

// Afficher les articles du panier
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Vider l'affichage actuel

    let cartTotal = 0; // Total pour les articles dans le panier

    for (const [item, details] of Object.entries(cartItems)) {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item} - Quantité: ${details.quantity}`;
        cartItemsContainer.appendChild(itemDiv);

        // Calculer le total pour l'affichage
        cartTotal += details.price * details.quantity;
    }

    // Mettre à jour le total du panier
    document.getElementById('cart-total').textContent = `${cartTotal} FCFA`;
}

// Initialiser l'affichage du panier
updateCartDisplay();
