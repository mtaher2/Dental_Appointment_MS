document.addEventListener('DOMContentLoaded', function () {
  const paypalCheckbox = document.getElementById('paypal');
  const cardFields = [
    document.getElementById('cardNumber'),
    document.getElementById('expiry'),
    document.getElementById('cvv'),
    document.getElementById('nameOnCard')
  ];
  const form = document.getElementById('paymentForm');
  const message = document.getElementById('paymentMessage');

  function setCardFieldsDisabled(disabled) {
    cardFields.forEach(field => {
      field.disabled = disabled;
      if (disabled) {
        field.classList.add('disabled');
      } else {
        field.classList.remove('disabled');
      }
    });
  }

  paypalCheckbox.addEventListener('change', function () {
    setCardFieldsDisabled(this.checked);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    message.textContent = '';
    if (paypalCheckbox.checked) {
      message.textContent = 'Redirecting to PayPal... (demo)';
      return;
    }
    // Simple validation
    let valid = true;
    cardFields.forEach(field => {
      if (!field.value.trim()) valid = false;
    });
    if (!valid) {
      message.textContent = 'Please fill in all card details.';
      message.style.color = '#d32f2f';
      return;
    }
    message.textContent = 'Payment successful! (demo)';
    message.style.color = '#4b61b8';
      });
  });

// Navigation Active State Handler for SuperAdmin Pages
document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Remove any existing active classes
    const menuLinks = document.querySelectorAll('.header-menu a');
    menuLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current page button
    const pageMap = {
        '/superadmin/dashboard': 'Dashboard',
        '/superadmin/admins': 'Admins',
        '/superadmin/system-config': 'System Config',
        '/superadmin/master-logs': 'Master Logs',
        '/superadmin/dev-tools': 'Dev Tools'
    };
    
    // Find and activate the current page button
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

// Admins Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const adminsSearchInput = document.getElementById('admins-search');
    const adminsTableRows = document.querySelectorAll('.admins-table tbody tr');
    
    // Add search functionality for admins table
    if (adminsSearchInput && adminsTableRows.length > 0) {
        adminsSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            adminsTableRows.forEach(row => {
                const name = row.querySelector('td:first-child').textContent.trim().toLowerCase();
                const clinic = row.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
                const role = row.querySelector('td:nth-child(3)').textContent.trim().toLowerCase();
                const statusBadge = row.querySelector('.status-badge');
                const status = statusBadge ? statusBadge.textContent.trim().toLowerCase() : '';
                
                // Check if search term matches any column
                const matchesSearch = searchTerm === '' || 
                                     name.includes(searchTerm) || 
                                     clinic.includes(searchTerm) || 
                                     role.includes(searchTerm) || 
                                     status.includes(searchTerm);
                
                // Show/hide row based on search
                if (matchesSearch) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});

// Master Logs Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const masterlogsSearchInput = document.getElementById('masterlogs-search');
    const masterlogsTableRows = document.querySelectorAll('.masterlogs-table tbody tr');
    const filterButtons = document.querySelectorAll('.masterlogs-filters .filter-chip');
    
    let currentFilter = 'all'; // Track current filter
    
    // Add search functionality for master logs table
    if (masterlogsSearchInput && masterlogsTableRows.length > 0) {
        masterlogsSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            applyMasterLogsFilter(currentFilter, searchTerm);
        });
    }
    
    // Add filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter type
            currentFilter = this.getAttribute('data-filter');
            
            // Apply filter with current search term
            const searchTerm = masterlogsSearchInput ? masterlogsSearchInput.value.toLowerCase().trim() : '';
            applyMasterLogsFilter(currentFilter, searchTerm);
            
            // Visual feedback - show which filter is active
            console.log(`Filter applied: ${currentFilter}`);
        });
    });
    
    function applyMasterLogsFilter(filterType, searchTerm) {
        let visibleRowCount = 0;
        
        masterlogsTableRows.forEach(row => {
            const timestamp = row.querySelector('td:nth-child(1)').textContent.trim().toLowerCase();
            const userClinic = row.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
            const ipAddress = row.querySelector('td:nth-child(3)').textContent.trim().toLowerCase();
            const device = row.querySelector('td:nth-child(4)').textContent.trim().toLowerCase();
            const action = row.querySelector('td:nth-child(5)').textContent.trim().toLowerCase();
            const data = row.querySelector('td:nth-child(6)').textContent.trim().toLowerCase();
            
            // Check if row matches search criteria
            const matchesSearch = searchTerm === '' || 
                                 timestamp.includes(searchTerm) || 
                                 userClinic.includes(searchTerm) || 
                                 ipAddress.includes(searchTerm) || 
                                 device.includes(searchTerm) || 
                                 action.includes(searchTerm) || 
                                 data.includes(searchTerm);
            
            // Check if row matches filter criteria
            let matchesFilter = true;
            
            switch(filterType) {
                case 'all':
                    matchesFilter = true;
                    break;
                case 'clinic':
                    // Show only entries where User/Clinic column starts with "Clinic"
                    matchesFilter = userClinic.startsWith('clinic');
                    break;
                case 'user':
                    // Show only entries where User/Clinic column starts with "User:"
                    matchesFilter = userClinic.startsWith('user:');
                    break;
                case 'ip':
                    // Group entries by unique IP addresses - you can enhance this to show specific IP ranges
                    matchesFilter = ipAddress.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
                    break;
                case 'device':
                    // Show all entries and group by device type (Desktop, Mobile, Tablet)
                    matchesFilter = device === 'desktop' || device === 'mobile' || device === 'tablet';
                    break;
                case 'action':
                    // Show entries grouped by action types - focus on major action categories
                    matchesFilter = action.includes('login') || 
                                   action.includes('logout') || 
                                   action.includes('created') || 
                                   action.includes('updated') || 
                                   action.includes('uploaded') || 
                                   action.includes('received') || 
                                   action.includes('sent') || 
                                   action.includes('cancelled') || 
                                   action.includes('generated') ||
                                   action.includes('appointment') ||
                                   action.includes('patient') ||
                                   action.includes('billing') ||
                                   action.includes('payment') ||
                                   action.includes('document') ||
                                   action.includes('message') ||
                                   action.includes('inventory');
                    break;
                default:
                    matchesFilter = true;
            }
            
            // Show row only if it matches both search and filter
            if (matchesSearch && matchesFilter) {
                row.style.display = '';
                visibleRowCount++;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Log the results for debugging
        console.log(`Filter: ${filterType} | Search: "${searchTerm}" | Visible rows: ${visibleRowCount}/${masterlogsTableRows.length}`);
    }
}); 