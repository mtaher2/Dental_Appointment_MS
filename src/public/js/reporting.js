// Chart.js must be loaded in the layout before this script

document.addEventListener('DOMContentLoaded', function () {
  // Appointments by Month (Bar Chart)
  const appointmentsByMonthCtx = document.getElementById('appointmentsByMonthChart').getContext('2d');
  new Chart(appointmentsByMonthCtx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Appointments',
        data: [60, 80, 70, 100, 80, 70, 90],
        backgroundColor: '#e5e7eb',
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.7
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

  // Revenue Over Time (Line Chart)
  const revenueOverTimeCtx = document.getElementById('revenueOverTimeChart').getContext('2d');
  new Chart(revenueOverTimeCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Revenue',
        data: [20000, 50000, 30000, 70000, 40000, 80000, 60000],
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124,58,237,0.08)',
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

  // User Logins (Horizontal Bar Chart)
  const userLoginsCtx = document.getElementById('userLoginsChart').getContext('2d');
  new Chart(userLoginsCtx, {
    type: 'bar',
    data: {
      labels: ['Dr. Carter', 'Sarah Miller', 'Admin User', 'Dr. Lee', 'Other Users'],
      datasets: [{
        label: 'Logins',
        data: [300, 400, 200, 500, 150],
        backgroundColor: '#e5e7eb',
        borderRadius: 6,
        barPercentage: 0.7,
        categoryPercentage: 0.7
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
}); 