// Receptionist Dashboard JavaScript

// Check in patient function
function checkInPatient(patientId) {
    fetch('/receptionist/check-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId: patientId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Patient checked in successfully!');
            location.reload(); // Refresh the page to update the data
        } else {
            alert('Error checking in patient: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error checking in patient');
    });
}

// Rebook appointment function
function rebookAppointment(appointmentId) {
    // TODO: Implement rebooking modal or redirect to rebooking page
    console.log('Rebooking appointment:', appointmentId);
    alert('Rebooking functionality will be implemented soon');
}

// Add reason for missed appointment
function addReason(appointmentId) {
    const reason = prompt('Please enter the reason for the missed appointment:');
    if (reason) {
        fetch('/receptionist/add-reason', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                appointmentId: appointmentId,
                reason: reason 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Reason added successfully!');
                location.reload();
            } else {
                alert('Error adding reason: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding reason');
        });
    }
}

// Tag patient function
function tagPatient(appointmentId) {
    const tag = prompt('Please enter a tag for this patient (e.g., "No Show", "Reschedule", "Follow-up"):');
    if (tag) {
        fetch('/receptionist/tag-patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                appointmentId: appointmentId,
                tag: tag 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Patient tagged successfully!');
                location.reload();
            } else {
                alert('Error tagging patient: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error tagging patient');
        });
    }
}

// Auto-refresh dashboard data every 30 seconds
function autoRefresh() {
    setTimeout(() => {
        location.reload();
    }, 30000); // 30 seconds
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Receptionist Dashboard loaded');
    
    // Start auto-refresh
    autoRefresh();
    
    // Add event listeners for filter buttons
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            console.log('Filtering by:', filterType);
            // TODO: Implement filtering logic
        });
    });
    
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});

// Export functions for global access
window.checkInPatient = checkInPatient;
window.rebookAppointment = rebookAppointment;
window.addReason = addReason;
window.tagPatient = tagPatient; 