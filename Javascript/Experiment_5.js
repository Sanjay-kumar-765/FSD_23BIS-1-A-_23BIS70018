const products = [
  { name: "T-Shirt", category: "Clothing" },
  { name: "Jeans", category: "Clothing" },
  { name: "Headphones", category: "Electronics" },
  { name: "Smartphone", category: "Electronics" },
  { name: "Novel", category: "Books" },
  { name: "Cookbook", category: "Books" }
];

const productList = document.getElementById("productList");
const categorySelect = document.getElementById("category");

function displayProducts(filter) {
  productList.innerHTML = "";
  const filtered = products.filter(
    p => filter === "All" || p.category === filter
  );

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.textContent = p.name;
    productList.appendChild(div);
  });
}
displayProducts("All");
categorySelect.addEventListener("change", (e) => {
  displayProducts(e.target.value);
});
