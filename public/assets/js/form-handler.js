/**
 * Form Handler for Sponsorship, Speaker, and Registration Forms
 * Handles form submissions using EmailJS
 */

// Function to check if EmailJS is loaded
function isEmailJSLoaded() {
    return typeof window.emailjs !== 'undefined';
}

// Function to handle form submissions
function initFormHandlers() {
    console.log('Initializing form handlers');
    
    // Sponsorship Form Handler
    const sponsorForm = document.getElementById('sponsor-form');
    if (sponsorForm) {
        sponsorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const fullName = sponsorForm.querySelector('input[name="fullName"]').value;
            const email = sponsorForm.querySelector('input[name="email"]').value;
            const company = sponsorForm.querySelector('input[name="company"]').value;
            const jobTitle = sponsorForm.querySelector('input[name="jobTitle"]').value;
            const contactNumber = sponsorForm.querySelector('input[name="contactNumber"]').value;
            const interest = sponsorForm.querySelector('select[name="interest"]').value;
            
            // Show loading state
            const submitBtn = sponsorForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="lni-spinner lni-spin-effect"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS service backup
            window.emailjs.send(
                'service_wshzlmp', // Your EmailJS service ID
                'template_etjjplb', // Your EmailJS template ID
                {
                    from_name: fullName,
                    from_email: email,
                    subject: 'New Sponsorship Inquiry from ' + fullName,
                    email_header: 'New Sponsorship Inquiry',
                    company: company,
                    job_title: jobTitle,
                    contact_number: contactNumber,
                    interest: interest
                }
            )
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
                showSuccessMessage(sponsorForm, 'Your form has been submitted successfully!');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('Email sending failed...', error);
                showErrorMessage(sponsorForm);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // Speaking Opportunity Form Handler
    const speakingForm = document.getElementById('speaking-form');
    if (speakingForm) {
        speakingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const fullName = speakingForm.querySelector('input[name="fullName"]').value;
            const email = speakingForm.querySelector('input[name="email"]').value;
            const company = speakingForm.querySelector('input[name="company"]').value;
            const jobTitle = speakingForm.querySelector('input[name="jobTitle"]').value;
            const contactNumber = speakingForm.querySelector('input[name="contactNumber"]').value;
            
            // Show loading state
            const submitBtn = speakingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="lni-spinner lni-spin-effect"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS service backup
            window.emailjs.send(
                'service_wshzlmp', // Your EmailJS service ID
                'template_etjjplb', // Your EmailJS template ID
                {
                    from_name: fullName,
                    from_email: email,
                    subject: 'New Speaker Proposal from ' + fullName,
                    email_header: 'New Speaker Proposal',
                    company: company,
                    job_title: jobTitle,
                    contact_number: contactNumber
                }
            )
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
                showSuccessMessage(speakingForm, 'Your form has been submitted successfully!');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('Email sending failed...', error);
                showErrorMessage(speakingForm);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Registration Form Handler
    const registrationForm = document.getElementById('pricing-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const fullName = registrationForm.querySelector('input[placeholder="Full Name"]').value;
            const email = registrationForm.querySelector('input[placeholder="Email Address"]').value;
            const company = registrationForm.querySelector('input[placeholder="Company Name"]').value;
            const jobTitle = registrationForm.querySelector('input[placeholder="Job Title"]').value;
            const contactNumber = registrationForm.querySelector('input[placeholder="Contact Number"]').value;
            const promoCode = registrationForm.querySelector('input[placeholder="Promo Code (optional)"]').value;
            
            // Show loading state
            const submitBtn = registrationForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="lni-spinner lni-spin-effect"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS service backup
            window.emailjs.send(
                'service_wshzlmp', // Your EmailJS service ID
                'template_etjjplb', // Your EmailJS template ID for registration
                {
                    from_name: fullName,
                    from_email: email,
                    subject: 'New Registration from ' + fullName,
                    email_header: 'New Registration',
                    company: company,
                    job_title: jobTitle,
                    contact_number: contactNumber,
                    promo_code: promoCode
                }
            )
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
                showSuccessMessage(registrationForm, 'Your form has been submitted successfully!');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('Email sending failed...', error);
                showErrorMessage(registrationForm);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Helper functions for form feedback
    function showSuccessMessage(form, customMessage) {
        // Remove any existing messages
        removeMessages(form);
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-message success-message';
        successMessage.innerHTML = customMessage || '<i class="lni-check-mark-circle"></i> Your form has been submitted successfully!';
        
        // Insert after form
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        // Reset form
        form.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    function showErrorMessage(form, customMessage) {
        // Remove any existing messages
        removeMessages(form);
        
        // Create error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error-message';
        errorMessage.innerHTML = customMessage || '<i class="lni-warning"></i> There was a problem submitting your form. Please try again.';
        
        // Insert after form
        form.parentNode.insertBefore(errorMessage, form.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
    
    function removeMessages(form) {
        // Remove any existing messages
        const existingMessages = form.parentNode.querySelectorAll('.form-message');
        existingMessages.forEach(message => message.remove());
    }
}

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if EmailJS is already loaded
    if (isEmailJSLoaded()) {
        initFormHandlers();
    } else {
        // If not loaded, wait for it to load
        console.log('EmailJS not loaded yet, waiting...');
        
        // Check every 100ms for EmailJS to be loaded (up to 5 seconds)
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds
        
        const checkInterval = setInterval(function() {
            attempts++;
            
            if (isEmailJSLoaded()) {
                clearInterval(checkInterval);
                initFormHandlers();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.error('EmailJS failed to load after 5 seconds. Form functionality may be limited.');
                
                // Add error message to forms
                const sponsorForm = document.getElementById('sponsor-form');
                if (sponsorForm) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-message error-message';
                    errorMessage.innerHTML = '<i class="lni-warning"></i> Email service is not available. Please try again later or contact us directly.';
                    sponsorForm.parentNode.insertBefore(errorMessage, sponsorForm.nextSibling);
                }
                
                const speakingForm = document.getElementById('speaking-form');
                if (speakingForm) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-message error-message';
                    errorMessage.innerHTML = '<i class="lni-warning"></i> Email service is not available. Please try again later or contact us directly.';
                    speakingForm.parentNode.insertBefore(errorMessage, speakingForm.nextSibling);
                }
                
                const registrationForm = document.getElementById('pricing-form');
                if (registrationForm) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-message error-message';
                    errorMessage.innerHTML = '<i class="lni-warning"></i> Email service is not available. Please try again later or contact us directly.';
                    registrationForm.parentNode.insertBefore(errorMessage, registrationForm.nextSibling);
                }
            }
        }, 100);
    }
});
