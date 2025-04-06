document.addEventListener('DOMContentLoaded', function() {
    // Form validation for all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Skip the reservation form which has its own handling
        if (form.id === 'reservation-form') return;
        
        form.addEventListener('submit', function(e) {
            // Check validity
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                
                // Find first invalid element and focus it
                const invalidElements = this.querySelectorAll(':invalid');
                if (invalidElements.length > 0) {
                    invalidElements[0].focus();
                }
            }
            
            this.classList.add('was-validated');
        });
    });
    
    // Special handling for Formspree forms (excluding reservation form)
    const formspreeForms = document.querySelectorAll('form[action^="https://formspree.io/"]');
    
    formspreeForms.forEach(form => {
        if (form.id === 'reservation-form') return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            // Submit form to Formspree
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                    this.classList.remove('was-validated');
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('There was a problem sending your message. Please try again or contact us directly.');
                console.error('Error:', error);
            });
        });
    });
});