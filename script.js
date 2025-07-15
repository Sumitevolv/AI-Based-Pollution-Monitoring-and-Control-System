 function switchTab(tabId) {
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => {
                tab.style.display = 'none';
            });
            
            document.getElementById(tabId).style.display = 'block';
            
            const buttons = document.querySelectorAll('nav button');
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            
            document.querySelector(`button[onclick="switchTab('${tabId}')"]`).classList.add('active');
        }
        
        // Function to toggle control systems
        function toggleControl(element, controlName) {
            const status = element.checked ? 'Active' : 'Standby';
            const sibling = element.parentElement.nextElementSibling;
            sibling.textContent = status;
            
            // Show message to user
            showMessage(`${controlName} set to ${status}`);
        }
        
        // Function to generate reports
        function generateReport() {
            const reportType = document.getElementById('report-type').value;
            const dateRange = document.getElementById('date-range').value;
            const format = document.getElementById('format').value;
            
            let reportName = '';
            switch(reportType) {
                case 'air':
                    reportName = 'Air Quality Report';
                    break;
                case 'water':
                    reportName = 'Water Quality Report';
                    break;
                case 'compliance':
                    reportName = 'Compliance Report';
                    break;
                case 'incident':
                    reportName = 'Incident Report';
                    break;
                case 'comprehensive':
                    reportName = 'Comprehensive Analysis';
                    break;
            }
            
            showMessage(`${reportName} generated successfully in ${format.toUpperCase()} format`);
        }
        
        // Function to display messages to user
        function showMessage(message) {
            alert(message);
        }
        
        // Initialize charts when the page loads
        window.addEventListener('load', function() {
            // Air Quality Chart
            const airCtx = document.getElementById('air-chart').getContext('2d');
            const airChart = new Chart(airCtx, {
                type: 'line',
                data: {
                    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM', '3 AM'],
                    datasets: [{
                        label: 'AQI',
                        data: [65, 70, 80, 85, 75, 70, 65, 60],
                        borderColor: '#1a73e8',
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0,
                            max: 150
                        }
                    }
                }
            });
            
            // Water Quality Chart
            const waterCtx = document.getElementById('water-chart').getContext('2d');
            const waterChart = new Chart(waterCtx, {
                type: 'line',
                data: {
                    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM', '3 AM'],
                    datasets: [{
                        label: 'WQI',
                        data: [90, 92, 91, 93, 94, 93, 92, 91],
                        borderColor: '#34a853',
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 50,
                            max: 100
                        }
                    }
                }
            });
            
            // Air Quality Trend Chart
            if (document.getElementById('air-trend-chart')) {
                const airTrendCtx = document.getElementById('air-trend-chart').getContext('2d');
                const airTrendChart = new Chart(airTrendCtx, {
                    type: 'line',
                    data: {
                        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                        datasets: [
                            {
                                label: 'PM2.5',
                                data: [35, 32, 30, 38, 45, 42, 40, 38],
                                borderColor: '#ea4335',
                                tension: 0.4,
                                fill: false
                            },
                            {
                                label: 'O₃',
                                data: [0.03, 0.035, 0.04, 0.045, 0.05, 0.045, 0.04, 0.035],
                                borderColor: '#fbbc05',
                                tension: 0.4,
                                fill: false
                            },
                            {
                                label: 'NO₂',
                                data: [0.025, 0.02, 0.025, 0.03, 0.035, 0.03, 0.025, 0.02],
                                borderColor: '#1a73e8',
                                tension: 0.4,
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
            
            // Water Quality Trend Chart
            if (document.getElementById('water-trend-chart')) {
                const waterTrendCtx = document.getElementById('water-trend-chart').getContext('2d');
                const waterTrendChart = new Chart(waterTrendCtx, {
                    type: 'line',
                    data: {
                        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                        datasets: [
                            {
                                label: 'pH',
                                data: [7.1, 7.15, 7.2, 7.25, 7.2, 7.15, 7.1, 7.2],
                                borderColor: '#34a853',
                                tension: 0.4,
                                fill: false
                            },
                            {
                                label: 'Dissolved Oxygen',
                                data: [8.2, 8.3, 8.5, 8.6, 8.5, 8.4, 8.3, 8.4],
                                borderColor: '#1a73e8',
                                tension: 0.4,
                                fill: false
                            },
                            {
                                label: 'Turbidity',
                                data: [1.9, 1.8, 1.7, 1.8, 1.9, 1.8, 1.7, 1.8],
                                borderColor: '#fbbc05',
                                tension: 0.4,
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
        });