document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        productName: document.getElementById('product_name').value,
        categoryId: document.getElementById('category_id').value,
        supplierId: document.getElementById('supplier_id').value,
        quantity: document.getElementById('quantity').value,
        price: document.getElementById('price').value
    };

    fetch('http://localhost:3000/addToDb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        document.getElementById('productForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
