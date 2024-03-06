const socket = io();

const productForm = document.getElementById("product");
const productlist = document.getElementById("productList");
const createProductbtn = document.getElementById("createproductbtn");
const inputs = productForm.querySelectorAll("input");

createProductbtn.addEventListener("click", () => {
  let newProduct = {};
  let formData = new FormData(productForm);
  formData.forEach((value, key) => {
    newProduct[key] = value;
  });
  console.log("enviando");
  socket.emit("newProduct", newProduct);
  console.log("enviado");
  inputs.forEach((i) => (i.value = ""));
});

socket.on("listUpdated", ({ products }) => {
  productlist.innerHTML = "";
  products.forEach((product) => {
    productlist.innerHTML += `
        <div>
            <h3>${product._id} - ${product.title}</h3>
            <p>${product.description}</p>
            <span>${product.price} - Stock: ${product.stock}</span>
            <img src=${product.thumbnail} alt="">
            <p>Code: ${product.code}</p>
            <button onclick="deleteProduct('${product._id}')">delete</button>
        </div>
        `;
  });
});

socket.on("errorOnSubmit", () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Some property is wrong!",
    footer: '<p>Check all the props to see the error</p>',
  });
});

function deleteProduct(id) {
  socket.emit("deleteProduct", { id: id });
}
