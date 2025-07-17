document.addEventListener('DOMContentLoaded', function() {
    console.log('Patient Management page loaded');

    // Initialize form inputs
    initializeFormInputs();
    
    // Initialize action buttons
    initializeActionButtons();
    
    // Initialize family member and document view buttons
    initializeViewButtons();
});

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
    });
}

function initializeActionButtons() {
    // Edit Patient Info button
    const editPatientBtn = document.querySelector('button:contains("Edit Patient Info")');
    if (editPatientBtn) {
        editPatientBtn.addEventListener('click', function() {
            console.log('Edit Patient Info clicked');
            // TODO: Implement edit patient functionality
            showNotification('Edit patient functionality will be implemented', 'info');
        });
    }
    
    // Add Family Member button
    const addFamilyBtn = document.querySelector('button:contains("Add Family Member")');
    if (addFamilyBtn) {
        addFamilyBtn.addEventListener('click', function() {
            console.log('Add Family Member clicked');
            // TODO: Implement add family member functionality
            showNotification('Add family member functionality will be implemented', 'info');
        });
    }
    
    // Upload Document button
    const uploadDocBtn = document.querySelector('button:contains("Upload Document")');
    if (uploadDocBtn) {
        uploadDocBtn.addEventListener('click', function() {
            console.log('Upload Document clicked');
            // TODO: Implement upload document functionality
            showNotification('Upload document functionality will be implemented', 'info');
        });
    }
}

function initializeViewButtons() {
    // Family member view buttons
    const familyViewBtns = document.querySelectorAll('.flex.items-center.gap-4.bg-white.border.border-\\[\\#dbe0e6\\].rounded-lg.px-4.min-h-\\[72px\\].py-2.justify-between.max-w-\\[480px\\].mx-4 button');
    
    familyViewBtns.forEach(btn => {
        if (btn.textContent.trim() === 'View') {
            btn.addEventListener('click', function() {
                const familyMemberName = this.closest('.flex.items-center').querySelector('p:first-child').textContent;
                console.log('View family member:', familyMemberName);
                // TODO: Implement view family member functionality
                showNotification(`Viewing ${familyMemberName}'s details`, 'info');
            });
        }
    });
    
    // Document view buttons
    const documentViewBtns = document.querySelectorAll('.flex.items-center.gap-4.bg-white.border.border-\\[\\#dbe0e6\\].rounded-lg.px-4.min-h-\\[72px\\].py-2.justify-between.max-w-\\[480px\\].mx-4 button');
    
    documentViewBtns.forEach(btn => {
        if (btn.textContent.trim() === 'View') {
            btn.addEventListener('click', function() {
                const documentName = this.closest('.flex.items-center').querySelector('p:first-child').textContent;
                console.log('View document:', documentName);
                // TODO: Implement view document functionality
                showNotification(`Viewing ${documentName}`, 'info');
            });
        }
    });
}

// Helper function to show notifications
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

// Helper function to find buttons by text content
function findButtonByText(text) {
    const buttons = document.querySelectorAll('button');
    for (let button of buttons) {
        if (button.textContent.trim() === text) {
            return button;
        }
    }
    return null;
}

// Form validation
function validatePatientForm() {
    const patientName = document.querySelector('input[placeholder*="name" i]') || 
                       document.querySelector('input[value=""]');
    const dateOfBirth = document.querySelector('input[placeholder*="birth" i]') || 
                       document.querySelectorAll('input[value=""]')[1];
    const gender = document.querySelector('input[placeholder*="gender" i]') || 
                  document.querySelectorAll('input[value=""]')[2];
    
    if (!patientName || !patientName.value.trim()) {
        showNotification('Patient name is required', 'error');
        return false;
    }
    
    if (!dateOfBirth || !dateOfBirth.value.trim()) {
        showNotification('Date of birth is required', 'error');
        return false;
    }
    
    if (!gender || !gender.value.trim()) {
        showNotification('Gender is required', 'error');
        return false;
    }
    
    return true;
}

// Auto-save functionality
let autoSaveTimeout;
function setupAutoSave() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                console.log('Auto-saving patient data...');
                // TODO: Implement auto-save functionality
            }, 2000);
        });
    });
}

// Initialize auto-save
setupAutoSave(); 