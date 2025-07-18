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

// Navigation Active State Handler for Admin Pages
document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Remove any existing active classes
    const menuLinks = document.querySelectorAll('.header-menu a');
    menuLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to current page button
    const pageMap = {
        '/admin/user-management': 'User Management',
        '/admin/clinic-configuration': 'Clinic Config',
        '/admin/logs-audit': 'Logs & Audit',
        '/admin/reporting': 'Reporting',
        '/admin/notification-settings': 'Notifications'
    };
    
    // Find and activate the current page button
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}); 