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

// Navigation Active State Handler
document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Remove any existing active classes
    const menuLinks = document.querySelectorAll('.header-menu a');
    menuLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current page button
    const pageMap = {
        '/billing/invoice-management': 'Invoice Management',
        '/billing/record-payment': 'Record Payment', 
        '/billing/apply-discount': 'Apply Discount',
        '/billing/receipts-history': 'Receipts History',
        '/billing/activity-log': 'Activity Log',
        '/billing/reports': 'Reports'
    };
    
    // Find and activate the current page button
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

// Invoice Management Filtering and Search
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons, table rows, and search input
    const filterButtons = document.querySelectorAll('.billing-filter-chip');
    const tableRows = document.querySelectorAll('.billing-invoice-table tbody tr');
    const searchInput = document.getElementById('invoice-search');
    
    let currentFilter = 'All Invoices'; // Track current filter
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter type
            currentFilter = this.textContent.trim();
            
            // Apply both filter and search
            applyFilterAndSearch(currentFilter, searchInput.value, tableRows);
        });
    });
    
    // Add search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value;
            applyFilterAndSearch(currentFilter, searchTerm, tableRows);
        });
    }
});

function applyFilterAndSearch(filterType, searchTerm, rows) {
    rows.forEach(row => {
        const statusBadge = row.querySelector('.billing-status-badge');
        
        if (!statusBadge) {
            return; // Skip if no status badge found
        }
        
        const status = statusBadge.textContent.trim().toLowerCase();
        const patientName = row.querySelector('td:first-child').textContent.trim().toLowerCase();
        const invoiceNumber = row.querySelector('td:nth-child(2)').textContent.trim().toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        // Check if row matches search criteria
        const matchesSearch = searchTerm === '' || 
                             patientName.includes(searchLower) || 
                             invoiceNumber.includes(searchLower);
        
        // Check if row matches filter criteria
        const matchesFilter = filterType === 'All Invoices' ||
                             (filterType === 'Paid' && status === 'paid') ||
                             (filterType === 'Unpaid' && status === 'unpaid') ||
                             (filterType === 'Partially Paid' && status === 'partially paid');
        
        // Show row only if it matches both search and filter
        if (matchesSearch && matchesFilter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
} 