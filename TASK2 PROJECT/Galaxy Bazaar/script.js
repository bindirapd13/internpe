function viewDetails(name, description, image, price) {
    
    localStorage.setItem("productName", name);
    localStorage.setItem("productDescription", description);
    localStorage.setItem("productImage", image);
    localStorage.setItem("productPrice", price);

    
    window.location.href = "item-detail.html";
}
