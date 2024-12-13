// Add a header with navigation links
const header = document.createElement("header");
header.className = "main-header";
header.innerHTML = `
  <nav class="navbar">
    <ul class="nav-links" style="display: flex; justify-content: space-around; list-style: none; padding: 0;">
      <li><a href="#about-us">About Us</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#cart">Cart</a></li>
      <li><a href="#checkout">Checkout</a></li>
    </ul>
  </nav>
`;

document.body.insertBefore(header, document.body.firstChild);

// Add a footer with additional links
const footer = document.createElement("footer");
footer.className = "main-footer";
footer.innerHTML = `
  <div class="footer-content" style="display: flex; justify-content: space-around; align-items: center;">
    <p>Address: 123 Fake Street, Faketown, FS 12345</p>
    <ul class="footer-links" style="display: flex; gap: 20px; list-style: none; padding: 0;">
      <li><a href="#privacy-policy">Privacy Policy</a></li>
      <li><a href="#sitemap">Sitemap</a></li>
      <li><a href="#legal">Legal</a></li>
    </ul>
    <p style="font-weight: bold;">Developed by: Pasturjay</p>
  </div>
`;

document.body.appendChild(footer);

// Fetch data from the Fake Store API
fetch("https://fakestoreapi.com/products")
  .then((response) => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse JSON data
  })
  .then((data) => {
    // Call the function to display products on the page
    displayProducts(data);
  })
  .catch((error) => {
    // Handle errors
    console.error("There was a problem with the fetch operation:", error);
  });

// Function to display products on the page
function displayProducts(products) {
  const productsContainer = document.getElementById("products-container"); // Ensure there's a container in your HTML with this ID

  // Clear the container before adding new items
  productsContainer.innerHTML = "";

  // Loop through each product and create a product card
  products.forEach((product) => {
    // Create a product card element
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    // Generate the star rating using the helper function
    const starRating = getStarRating(product.rating.rate);

    // Add product details to the card
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h2 class="product-title">${product.title}</h2>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <p class="product-description">${product.description}</p>
      <p class="product-rating">${starRating} (${product.rating.rate})</p>
      <button class="add-to-cart-btn" data-id="${
        product.id
      }">Add to Cart</button>
    `;

    // Append the product card to the container
    productsContainer.appendChild(productCard);
  });

  // Add event listeners for the "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      addToCart(productId);
    });
  });
}

// Function to generate star ratings
function getStarRating(rate) {
  const fullStars = Math.floor(rate); // Number of full stars
  const halfStars = rate % 1 >= 0.5 ? 1 : 0; // Half star if the remainder is >= 0.5
  const emptyStars = 5 - (fullStars + halfStars); // Remaining stars are empty

  let stars = "";

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars += "⭐";
  }

  // Add half star if applicable
  if (halfStars) {
    stars += "⭐️"; // You can use a specific half-star symbol if desired
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += "☆";
  }

  return stars;
}

// Cart array to store the added products
const cart = [];

// Function to add a product to the cart
function addToCart(productId) {
  // Fetch the product details by ID
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      return response.json();
    })
    .then((product) => {
      // Add the product to the cart array
      cart.push(product);

      // Notify the user
      alert(`${product.title} has been added to your cart.`);

      // Optionally, log the cart to the console for debugging
      console.log("Cart:", cart);
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
    });
}
