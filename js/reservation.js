document.addEventListener('DOMContentLoaded', function() {
    // Date picker restrictions
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const minDate = yyyy + '-' + mm + '-' + dd;
        
        dateInput.min = minDate;
        
        // Set max date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const maxDD = String(maxDate.getDate()).padStart(2, '0');
        const maxMM = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxYYYY = maxDate.getFullYear();
        dateInput.max = maxYYYY + '-' + maxMM + '-' + maxDD;
    }
    
    // Menu item selection functionality
    const menuCheckboxes = document.querySelectorAll('input[name="menu-items"]');
    const selectedItemsContainer = document.querySelector('.selected-items');
    const totalAmountElement = document.querySelector('.total-amount');
    let totalAmount = 0;
    
    // Object to track selected items and quantities
    const selectedItems = {};
    
    menuCheckboxes.forEach(checkbox => {
        const quantityInput = document.querySelector(`.item-quantity[data-item="${checkbox.id}"]`);
        
        // Initialize selected items object
        selectedItems[checkbox.id] = {
            name: checkbox.value,
            price: parseFloat(checkbox.dataset.price),
            quantity: 0,
            element: null
        };
        
        // Toggle quantity input disabled state based on checkbox
        checkbox.addEventListener('change', function() {
            quantityInput.disabled = !this.checked;
            
            if (!this.checked) {
                quantityInput.value = 0;
                updateSelectedItem(checkbox.id, 0);
            } else {
                quantityInput.value = 1;
                updateSelectedItem(checkbox.id, 1);
            }
            
            updateOrderSummary();
        });
        
        // Handle quantity changes
        quantityInput.addEventListener('change', function() {
            const quantity = parseInt(this.value) || 0;
            updateSelectedItem(checkbox.id, quantity);
            updateOrderSummary();
        });
    });
    
    function updateSelectedItem(itemId, quantity) {
        selectedItems[itemId].quantity = quantity;
        
        // Add or remove item from display
        if (quantity > 0 && !selectedItems[itemId].element) {
            // Create new element for the item
            const itemElement = document.createElement('div');
            itemElement.className = 'selected-item';
            itemElement.dataset.itemId = itemId;
            itemElement.innerHTML = `
                <span>${selectedItems[itemId].name} × ${quantity}</span>
                <span>$${(selectedItems[itemId].price * quantity).toFixed(2)}</span>
            `;
            selectedItemsContainer.appendChild(itemElement);
            selectedItems[itemId].element = itemElement;
        } else if (quantity > 0 && selectedItems[itemId].element) {
            // Update existing element
            selectedItems[itemId].element.innerHTML = `
                <span>${selectedItems[itemId].name} × ${quantity}</span>
                <span>$${(selectedItems[itemId].price * quantity).toFixed(2)}</span>
            `;
        } else if (quantity <= 0 && selectedItems[itemId].element) {
            // Remove element
            selectedItems[itemId].element.remove();
            selectedItems[itemId].element = null;
            
            // Uncheck the checkbox if quantity is 0
            const checkbox = document.getElementById(itemId);
            if (checkbox.checked) {
                checkbox.checked = false;
                const quantityInput = document.querySelector(`.item-quantity[data-item="${itemId}"]`);
                quantityInput.disabled = true;
            }
        }
    }
    
    function updateOrderSummary() {
        // Calculate total amount
        totalAmount = Object.values(selectedItems).reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        // Update total display
        totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
    
    // Form submission handling
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            // Prepare form data
            const formData = new FormData(this);
            
            // Add selected menu items to form data
            Object.entries(selectedItems).forEach(([id, item]) => {
                if (item.quantity > 0) {
                    formData.append('menu-items[]', `${item.name} × ${item.quantity}`);
                }
            });
            
            // Add total amount to form data
            formData.append('total-amount', `$${totalAmount.toFixed(2)}`);
            
            // Submit form to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    alert('Your reservation has been submitted successfully! We will contact you shortly to confirm.');
                    this.reset();
                    
                    // Reset menu selections
                    menuCheckboxes.forEach(checkbox => {
                        checkbox.checked = false;
                        const quantityInput = document.querySelector(`.item-quantity[data-item="${checkbox.id}"]`);
                        quantityInput.disabled = true;
                        quantityInput.value = 0;
                    });
                    
                    // Clear selected items display
                    selectedItemsContainer.innerHTML = '';
                    totalAmountElement.textContent = '$0.00';
                    
                    // Reset selected items object
                    Object.keys(selectedItems).forEach(id => {
                        selectedItems[id].quantity = 0;
                        selectedItems[id].element = null;
                    });
                    totalAmount = 0;
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('There was a problem with your reservation. Please try again or contact us directly.');
                console.error('Error:', error);
            });
        });
    }
});