document.addEventListener('DOMContentLoaded', function() {
    console.log('Add Family Member page loaded');

    // Initialize form inputs
    initializeFormInputs();
    
    // Initialize add button
    initializeAddButton();
    
    // Track form changes
    trackFormChanges();
});

// Track if form has been modified
let formModified = false;
let originalFormData = {};

function initializeFormInputs() {
    // Add focus/blur effects to form inputs
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.classList.add('ring-2', 'ring-[#415FA5]', 'ring-opacity-20');
        });
        
        input.addEventListener('blur', function() {
            this.classList.remove('ring-2', 'ring-[#415FA5]', 'ring-opacity-20');
        });
        
        // Track changes
        input.addEventListener('input', function() {
            formModified = true;
            updateAddButtonState();
        });
    });
}

function trackFormChanges() {
    // Store original form data
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        originalFormData[input.name || input.id] = input.value;
    });
    
    // Listen for changes
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const currentValue = this.value;
            const originalValue = originalFormData[this.name || this.id] || '';
            
            if (currentValue !== originalValue) {
                formModified = true;
                updateAddButtonState();
            } else {
                // Check if all fields match original values
                checkIfFormModified();
            }
        });
    });
}

function checkIfFormModified() {
    const formInputs = document.querySelectorAll('.form-input');
    let hasChanges = false;
    
    formInputs.forEach(input => {
        const currentValue = input.value;
        const originalValue = originalFormData[input.name || input.id] || '';
        
        if (currentValue !== originalValue) {
            hasChanges = true;
        }
    });
    
    formModified = hasChanges;
    updateAddButtonState();
}

function updateAddButtonState() {
    const addBtn = document.getElementById('addFamilyMemberBtn');
    if (addBtn) {
        if (formModified) {
            addBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            addBtn.classList.add('hover:bg-[#2E4A8C]', 'cursor-pointer');
            addBtn.disabled = false;
        } else {
            addBtn.classList.add('opacity-50', 'cursor-not-allowed');
            addBtn.classList.remove('hover:bg-[#2E4A8C]', 'cursor-pointer');
            addBtn.disabled = true;
        }
    }
}

function initializeAddButton() {
    const addBtn = document.getElementById('addFamilyMemberBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            console.log('Add Family Member clicked');
            addFamilyMember();
        });
    }
}

function addFamilyMember() {
    // Get form data
    const formData = {
        firstName: document.querySelector('input[placeholder="Enter first name"]')?.value || '',
        lastName: document.querySelector('input[placeholder="Enter last name"]')?.value || '',
        relationship: document.querySelector('select:first-of-type')?.value || '',
        dateOfBirth: document.querySelector('input[type="date"]')?.value || '',
        gender: document.querySelector('select:last-of-type')?.value || '',
        phoneNumber: document.querySelector('input[placeholder="Enter phone number"]')?.value || '',
        email: document.querySelector('input[type="email"]')?.value || ''
    };
    
    // Validate form data
    if (!validateFormData(formData)) {
        return;
    }
    
    // Show loading state
    const addBtn = document.getElementById('addFamilyMemberBtn');
    const originalText = addBtn.innerHTML;
    addBtn.innerHTML = '<span class="truncate">Adding...</span>';
    addBtn.disabled = true;
    
    // Send add request
    fetch('/receptionist/family-members/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success message with better styling
            showSuccessMessage('Family member added successfully!');
            
            // Mark form as unmodified
            formModified = false;
            updateAddButtonState();
            
            // Clear form
            clearForm();
            
            // Redirect back to patient management page after a delay
            setTimeout(() => {
                window.location.href = '/receptionist/patients';
            }, 2000);
        } else {
            showNotification(data.message || 'Error adding family member', 'error');
        }
    })
    .catch(error => {
        console.error('Error adding family member:', error);
        showNotification('Error adding family member. Please try again.', 'error');
    })
    .finally(() => {
        // Restore button state
        addBtn.innerHTML = originalText;
        addBtn.disabled = false;
        updateAddButtonState();
    });
}

function clearForm() {
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.value = '';
    });
    
    // Update original form data
    formInputs.forEach(input => {
        originalFormData[input.name || input.id] = '';
    });
}

function validateFormData(data) {
    if (!data.firstName.trim()) {
        showNotification('First name is required', 'error');
        return false;
    }
    
    if (!data.lastName.trim()) {
        showNotification('Last name is required', 'error');
        return false;
    }
    
    if (!data.relationship) {
        showNotification('Relationship is required', 'error');
        return false;
    }
    
    if (!data.dateOfBirth) {
        showNotification('Date of birth is required', 'error');
        return false;
    }
    
    if (!data.gender) {
        showNotification('Gender is required', 'error');
        return false;
    }
    
    if (!data.phoneNumber.trim()) {
        showNotification('Phone number is required', 'error');
        return false;
    }
    
    // Validate phone number format
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }
    
    // Validate email format
    if (data.email && !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.dateOfBirth)) {
        showNotification('Please enter a valid date in YYYY-MM-DD format', 'error');
        return false;
    }
    
    // Validate date is not in the future
    const selectedDate = new Date(data.dateOfBirth);
    const today = new Date();
    if (selectedDate > today) {
        showNotification('Date of birth cannot be in the future', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage(message) {
    // Create success notification with better styling
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 p-6 rounded-lg shadow-xl bg-green-500 text-white max-w-sm';
    notification.innerHTML = `
        <div class="flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
                <h3 class="font-semibold text-lg">Success!</h3>
                <p class="text-sm opacity-90">${message}</p>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add entrance animation
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease-out';
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds with exit animation
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Handle browser back button and page navigation
window.addEventListener('beforeunload', function(e) {
    if (formModified) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
    }
});

// Handle navigation within the app
document.addEventListener('click', function(e) {
    // Check if clicking on navigation links
    if (e.target.tagName === 'A' && formModified) {
        const href = e.target.getAttribute('href');
        if (href && !href.startsWith('#')) {
            const confirmed = confirm('You have unsaved changes. Are you sure you want to leave this page?');
            if (!confirmed) {
                e.preventDefault();
                return false;
            }
        }
    }
});

// Handle form submission
document.addEventListener('submit', function(e) {
    if (formModified) {
        const confirmed = confirm('You have unsaved changes. Are you sure you want to submit?');
        if (!confirmed) {
            e.preventDefault();
            return false;
        }
    }
}); 