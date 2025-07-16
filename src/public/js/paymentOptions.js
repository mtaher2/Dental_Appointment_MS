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