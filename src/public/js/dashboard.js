// Chart.js must be loaded in the layout before this script

document.addEventListener('DOMContentLoaded', function () {
  // Appointments Over Time (Line Chart)
  const appointmentsOverTimeCtx = document.getElementById('appointmentsOverTimeChart').getContext('2d');
  new Chart(appointmentsOverTimeCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Appointments',
        data: [30, 50, 40, 60, 45, 65, 55],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.08)',
        tension: 0.4,
        fill: true,
        pointRadius: 0
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: false }, display: false }
      }
    }
  });

  // Appointments by Clinic (Bar Chart)
  const appointmentsByClinicCtx = document.getElementById('appointmentsByClinicChart').getContext('2d');
  new Chart(appointmentsByClinicCtx, {
    type: 'bar',
    data: {
      labels: ['Clinic A', 'Clinic B', 'Clinic C', 'Clinic D', 'Clinic E'],
      datasets: [{
        label: 'Appointments',
        data: [40, 60, 45, 70, 50],
        backgroundColor: ['#a5b4fc', '#6366f1', '#a5b4fc', '#6366f1', '#a5b4fc']
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: false }, display: false }
      }
    }
  });

  // Billing by Clinic (Horizontal Bar Chart)
  const billingByClinicCtx = document.getElementById('billingByClinicChart').getContext('2d');
  new Chart(billingByClinicCtx, {
    type: 'bar',
    data: {
      labels: ['Clinic A', 'Clinic B', 'Clinic C', 'Clinic D', 'Clinic E'],
      datasets: [{
        label: 'Billing',
        data: [40, 80, 120, 60, 100],
        backgroundColor: ['#6366f1', '#a5b4fc', '#6366f1', '#a5b4fc', '#6366f1']
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, display: false },
        y: { grid: { display: false } }
      }
    }
  });

  // Payment Methods (Horizontal Bar Chart)
  const paymentMethodsCtx = document.getElementById('paymentMethodsChart').getContext('2d');
  new Chart(paymentMethodsCtx, {
    type: 'bar',
    data: {
      labels: ['Credit Card', 'Insurance', 'Cash', 'Online Payment'],
      datasets: [{
        label: 'Payments',
        data: [180, 120, 160, 80],
        backgroundColor: ['#6366f1', '#a5b4fc', '#6366f1', '#a5b4fc']
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, display: false },
        y: { grid: { display: false } }
      }
    }
  });

  // System Uptime (Line Chart)
  const systemUptimeCtx = document.getElementById('systemUptimeChart').getContext('2d');
  new Chart(systemUptimeCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Uptime',
        data: [99.7, 99.8, 99.6, 99.9, 99.7, 99.95, 99.9],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,0.08)',
        tension: 0.4,
        fill: true,
        pointRadius: 0
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { display: false }, display: false }
      }
    }
  });
}); 