// Super Admin Dashboard Charts with Static Data
console.log('Dashboard script loading...');

// Wait for both DOM and Chart.js to load
function initializeCharts() {
    console.log('Initializing charts...');
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded, retrying in 500ms...');
        setTimeout(initializeCharts, 500);
        return;
    }

    console.log('Chart.js loaded successfully');

    // Chart.js defaults
    Chart.defaults.font.family = "'Inter', Arial, sans-serif";
    Chart.defaults.color = '#6B7280';

    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                display: false 
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                cornerRadius: 8,
                padding: 12
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    const lineOptions = {
        ...commonOptions,
        scales: {
            x: {
                display: true,
                grid: { 
                    display: false,
                    drawBorder: false
                },
                ticks: { 
                    display: true, 
                    color: '#9CA3AF', 
                    font: { size: 11 },
                    padding: 8
                }
            },
            y: {
                display: false,
                grid: { display: false }
            }
        },
        elements: {
            point: {
                radius: 0,
                hoverRadius: 6
            }
        }
    };

    const barOptions = {
        ...commonOptions,
        scales: {
            x: {
                display: true,
                grid: { 
                    display: false,
                    drawBorder: false
                },
                ticks: { 
                    display: true, 
                    color: '#9CA3AF', 
                    font: { size: 10 },
                    padding: 4,
                    maxRotation: 0
                }
            },
            y: {
                display: false,
                grid: { display: false },
                beginAtZero: true
            }
        }
    };

    // 1. Appointments Over Time Chart
    try {
        const appointmentsCtx = document.getElementById('appointmentsOverTimeChart');
        if (appointmentsCtx) {
            console.log('Creating appointments over time chart');
            const gradient = appointmentsCtx.getContext('2d').createLinearGradient(0, 0, 0, 120);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');

            new Chart(appointmentsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        data: [65, 80, 95, 70, 110, 125, 140],
                        borderColor: '#3B82F6',
                        backgroundColor: gradient,
                        borderWidth: 2.5,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: lineOptions
            });
            console.log('Appointments chart created');
        } else {
            console.error('appointmentsOverTimeChart canvas not found');
        }
    } catch (error) {
        console.error('Error creating appointments chart:', error);
    }

    // 2. Appointments by Clinic Chart
    try {
        const clinicCtx = document.getElementById('appointmentsByClinicChart');
        if (clinicCtx) {
            console.log('Creating appointments by clinic chart');
            new Chart(clinicCtx, {
                type: 'bar',
                data: {
                    labels: ['Clinic A', 'Clinic B', 'Clinic C', 'Clinic D'],
                    datasets: [{
                        data: [85, 75, 90, 65],
                        backgroundColor: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
                        borderRadius: 6,
                        borderSkipped: false
                    }]
                },
                options: barOptions
            });
            console.log('Clinic appointments chart created');
        } else {
            console.error('appointmentsByClinicChart canvas not found');
        }
    } catch (error) {
        console.error('Error creating clinic appointments chart:', error);
    }

    // 3. Billing by Clinic Chart
    try {
        const billingCtx = document.getElementById('billingByClinicChart');
        if (billingCtx) {
            console.log('Creating billing by clinic chart');
            new Chart(billingCtx, {
                type: 'bar',
                data: {
                    labels: ['Clinic A', 'Clinic B', 'Clinic C', 'Clinic D'],
                    datasets: [{
                        data: [42, 55, 48, 38],
                        backgroundColor: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
                        borderRadius: 6,
                        borderSkipped: false
                    }]
                },
                options: barOptions
            });
            console.log('Billing chart created');
        } else {
            console.error('billingByClinicChart canvas not found');
        }
    } catch (error) {
        console.error('Error creating billing chart:', error);
    }

    // 4. Payment Methods Chart
    try {
        const paymentCtx = document.getElementById('paymentMethodsChart');
        if (paymentCtx) {
            console.log('Creating payment methods chart');
            new Chart(paymentCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Credit Card', 'Cash', 'Insurance', 'Online'],
                    datasets: [{
                        data: [45, 25, 20, 35],
                        backgroundColor: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
                        borderWidth: 0,
                        cutout: '60%'
                    }]
                },
                options: {
                    ...commonOptions,
                    plugins: {
                        ...commonOptions.plugins,
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                font: { size: 10 },
                                color: '#6B7280'
                            }
                        }
                    }
                }
            });
            console.log('Payment methods chart created');
        } else {
            console.error('paymentMethodsChart canvas not found');
        }
    } catch (error) {
        console.error('Error creating payment methods chart:', error);
    }

    // 5. System Uptime Chart
    try {
        const uptimeCtx = document.getElementById('systemUptimeChart');
        if (uptimeCtx) {
            console.log('Creating system uptime chart');
            const gradient = uptimeCtx.getContext('2d').createLinearGradient(0, 0, 0, 140);
            gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
            gradient.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

            new Chart(uptimeCtx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                        data: [99.8, 99.9, 99.7, 99.9],
                        borderColor: '#8B5CF6',
                        backgroundColor: gradient,
                        borderWidth: 2.5,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    ...lineOptions,
                    scales: {
                        ...lineOptions.scales,
                        y: {
                            ...lineOptions.scales.y,
                            min: 99.5,
                            max: 100,
                            display: true,
                            ticks: {
                                display: true,
                                color: '#9CA3AF',
                                font: { size: 10 },
                                callback: function(value) {
                                    return value + '%';
                                }
                            },
                            grid: {
                                display: true,
                                color: 'rgba(156, 163, 175, 0.1)'
                            }
                        }
                    }
                }
            });
            console.log('System uptime chart created');
        } else {
            console.error('systemUptimeChart canvas not found');
        }
    } catch (error) {
        console.error('Error creating system uptime chart:', error);
    }

    console.log('All charts initialization completed');
}

// Improved initialization with multiple fallbacks
function startInitialization() {
    if (document.readyState === 'complete') {
        // Document is fully loaded
        setTimeout(initializeCharts, 100);
    } else if (document.readyState === 'interactive') {
        // DOM is ready but resources might still be loading
        setTimeout(initializeCharts, 200);
    } else {
        // Still loading
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initializeCharts, 100);
        });
    }
}

// Start initialization
startInitialization();

// Fallback initialization after window load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof Chart !== 'undefined') {
            const canvases = document.querySelectorAll('.dashboard-graph');
            let hasEmptyCanvas = false;
            canvases.forEach(canvas => {
                if (!Chart.getChart(canvas)) {
                    hasEmptyCanvas = true;
                }
            });
            if (hasEmptyCanvas) {
                console.log('Some charts not initialized, retrying...');
                initializeCharts();
            }
        }
    }, 500);
}); 