// EmailJS Contact Form Handler
// Service ID: service_ds68sbc
// Email: info@amissolidairesgatineau.org
// SMTP: mail.privateemail.com:465

(function() {
    // Initialize EmailJS (if available)
    let emailjsReady = false;
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("yNUEmg6T9l-dCHp2e");
            emailjsReady = true;
        }
    } catch (error) {
        console.log('EmailJS not configured, using fallback method');
    }
    
    // Contact form handler
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const templateParams = {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'),
                    phone: formData.get('phone'),
                    interest: formData.get('interest'),
                    subject: formData.get('subject'),
                    message: formData.get('message'),
                    to_email: 'info@amissolidairesgatineau.org'
                };
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm mr-2"></span>Sending...';
                submitBtn.disabled = true;
                
                // Check if EmailJS is properly configured
                if (emailjsReady && typeof emailjs !== 'undefined') {
                    // Send email using EmailJS
                    emailjs.send('service_ds68sbc', 'YOUR_TEMPLATE_ID', templateParams)
                        .then(function(response) {
                            console.log('SUCCESS!', response.status, response.text);
                            
                            // Show success message
                            showMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
                            
                            // Reset form
                            contactForm.reset();
                            
                        }, function(error) {
                            console.log('FAILED...', error);
                            
                            // Fallback to mailto
                            openMailtoFallback(templateParams);
                        })
                        .finally(function() {
                            // Restore button
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        });
                } else {
                    // Use mailto fallback
                    openMailtoFallback(templateParams);
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
        
        // Volunteer form handler (if exists)
        const volunteerForm = document.querySelector('.volunter-form');
        if (volunteerForm) {
            volunteerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const templateParams = {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'),
                    phone: formData.get('phone'),
                    subject: 'Volunteer Application',
                    message: `Volunteer Application:
                    
Name: ${formData.get('name')}
Email: ${formData.get('email')}
Phone: ${formData.get('phone')}

This person is interested in volunteering with LES AMIS SOLIDAIRES DE GATINEAU.`,
                    to_email: 'info@amissolidairesgatineau.org'
                };
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm mr-2"></span>Sending...';
                submitBtn.disabled = true;
                
                // Send email using EmailJS
                emailjs.send('service_ds68sbc', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show success message
                        showMessage('success', 'Thank you for your interest in volunteering! We will contact you soon.');
                        
                        // Reset form
                        volunteerForm.reset();
                        
                    }, function(error) {
                        console.log('FAILED...', error);
                        
                        // Show error message
                        showMessage('error', 'Sorry, there was an error sending your application. Please try again or contact us directly at info@amissolidairesgatineau.org');
                    })
                    .finally(function() {
                        // Restore button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            });
        }
    });
    
    // Helper function to show messages
    function showMessage(type, message) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} form-message mt-3`;
        messageDiv.innerHTML = `
            <strong>${type === 'success' ? 'Success!' : 'Error!'}</strong> ${message}
        `;
        
        // Insert message after the form
        const forms = document.querySelectorAll('.contact-form, .volunter-form');
        forms.forEach(form => {
            if (form) {
                form.parentNode.insertBefore(messageDiv, form.nextSibling);
            }
        });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => messageDiv.remove(), 300);
            }, 5000);
        }
    }
    
    // Fallback function to open default email client
    function openMailtoFallback(templateParams) {
        const subject = encodeURIComponent(`Contact Form: ${templateParams.subject}`);
        const body = encodeURIComponent(`
Name: ${templateParams.from_name}
Email: ${templateParams.from_email}
Phone: ${templateParams.phone || 'Not provided'}
Interest: ${templateParams.interest || 'Not specified'}

Message:
${templateParams.message}

---
This message was sent from the LES AMIS SOLIDAIRES DE GATINEAU website contact form.
        `);
        
        const mailtoLink = `mailto:info@amissolidairesgatineau.org?subject=${subject}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showMessage('success', 'Your default email client should open with the message pre-filled. Please send the email to complete your message submission.');
    }
})();
