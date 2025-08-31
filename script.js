    // Tab switching functionality
        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            
            // Update active button
            document.querySelectorAll('.nav button').forEach(button => {
                button.classList.remove('active');
            });
            event.target.classList.add('active');
        }

        // Region selection functionality
        function loadRegionData() {
            const state = document.getElementById('state-select').value;
            const city = document.getElementById('city-select').value;
            
            // Simulate loading data
            document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
            
            // Update metrics with random values to simulate fresh data
            document.getElementById('aqi-value').textContent = Math.floor(50 + Math.random() * 80);
            document.getElementById('pm25-value').textContent = (10 + Math.random() * 5).toFixed(1);
            document.getElementById('ozone-value').textContent = (0.060 + Math.random() * 0.020).toFixed(3);
            document.getElementById('temp-value').textContent = (65 + Math.random() * 15).toFixed(1);
            
            // Update AQI indicator
            const aqiValue = parseInt(document.getElementById('aqi-value').textContent);
            const aqiIndicator = document.querySelector('#dashboard .aqi-indicator');
            aqiIndicator.textContent = getAQICategory(aqiValue);
            aqiIndicator.className = 'aqi-indicator ' + getAQIClass(aqiValue);
            
            // Show loading animation on refresh button
            const refreshBtn = document.querySelector('.data-refresh');
            refreshBtn.classList.add('rotating');
            setTimeout(() => refreshBtn.classList.remove('rotating'), 1000);
            
            // Reinitialize charts
            initCharts();
        }

        function loadAirQualityData() {
            const state = document.getElementById('air-state-select').value;
            const city = document.getElementById('air-city-select').value;
            
            // Simulate loading data
            document.getElementById('air-pm25').textContent = (10 + Math.random() * 5).toFixed(1);
            document.getElementById('air-pm10').textContent = Math.floor(30 + Math.random() * 40);
            document.getElementById('air-ozone').textContent = (0.060 + Math.random() * 0.020).toFixed(3);
            document.getElementById('air-no2').textContent = (0.030 + Math.random() * 0.025).toFixed(3);
            
            // Reinitialize air quality charts
            initAirQualityCharts();
        }

        function loadWaterQualityData() {
            const state = document.getElementById('water-state-select').value;
            const city = document.getElementById('water-city-select').value;
            
            // Simulate loading data
            document.getElementById('water-ph').textContent = (6.8 + Math.random() * 1.0).toFixed(1);
            document.getElementById('water-turbidity').textContent = (3.0 + Math.random() * 3).toFixed(1);
            document.getElementById('water-do').textContent = (5.5 + Math.random() * 2).toFixed(1);
            document.getElementById('water-lead').textContent = (0.005 + Math.random() * 0.010).toFixed(3);
            
            // Reinitialize water quality charts
            initWaterQualityCharts();
        }

        function changeTimePeriod(period) {
            // Update active time period button
            document.querySelectorAll('.time-selector button').forEach(button => {
                button.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // This would typically reload charts with data for the selected period
            console.log(`Changing time period to: ${period}`);
            
            // Reinitialize charts based on which tab is active
            if (document.getElementById('air-quality').classList.contains('active')) {
                initAirQualityCharts();
            } else if (document.getElementById('water-quality').classList.contains('active')) {
                initWaterQualityCharts();
            }
        }

        function refreshData() {
            // Determine which tab is active and refresh appropriate data
            if (document.getElementById('dashboard').classList.contains('active')) {
                loadRegionData();
            } else if (document.getElementById('air-quality').classList.contains('active')) {
                loadAirQualityData();
            } else if (document.getElementById('water-quality').classList.contains('active')) {
                loadWaterQualityData();
            }
            
            // Show loading animation
            const refreshBtn = document.querySelector('.data-refresh');
            refreshBtn.classList.add('rotating');
            setTimeout(() => refreshBtn.classList.remove('rotating'), 1000);
        }

        // Report generation functionality
        function generateReport(type) {
            const reportStatus = document.getElementById('report-status');
            reportStatus.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Generating report, please wait...</p>';
            
            // Simulate report generation delay
            setTimeout(() => {
                const reportName = `Environmental_Report_${type}_${new Date().toISOString().slice(0, 10)}.pdf`;
                const reportsContainer = document.getElementById('generated-reports');
                
                // Create report element
                const reportElement = document.createElement('div');
                reportElement.className = 'alert alert-success';
                reportElement.innerHTML = `
                    <p><strong>Report Generated:</strong> ${reportName}</p>
                    <button class="report-btn" onclick="downloadReport('${reportName}')" style="margin-right: 10px;">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="report-btn" onclick="viewReport('${type}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                `;
                
                reportsContainer.appendChild(reportElement);
                
                reportStatus.innerHTML = '<p>Report generated successfully!</p>';
            }, 2000);
        }

        function downloadReport(filename) {
            alert(`Downloading report: ${filename}`);
            // In a real application, this would trigger a file download
        }

        function viewReport(type) {
            alert(`Viewing ${type} report`);
            // In a real application, this would open the report in a new tab or modal
        }

        // AI Assistant functionality
        function toggleAIChat() {
            const chatContainer = document.getElementById('ai-chat');
            chatContainer.classList.toggle('open');
        }

        function sendAIMessage() {
            const input = document.getElementById('ai-input');
            const message = input.value.trim();
            
            if (message) {
                // Add user message
                addAIMessage('user', message);
                input.value = '';
                
                // Simulate AI response after a short delay
                setTimeout(() => {
                    // Simple response logic based on keywords
                    let response = "I'm analyzing your request about environmental data. ";
                    
                    if (message.toLowerCase().includes('air quality') || message.toLowerCase().includes('aqi')) {
                        response += "Current air quality in Los Angeles is 78 AQI (Moderate). PM2.5 levels are at 12.3 μg/m³. I recommend checking the Air Quality tab for more details.";
                    } else if (message.toLowerCase().includes('water') || message.toLowerCase().includes('wqi')) {
                        response += "Water quality in local sources is currently within EPA standards. pH levels are at 7.2 and turbidity is 4.8 NTU.";
                    } else if (message.toLowerCase().includes('forecast') || message.toLowerCase().includes('prediction')) {
                        response += "Based on AI models, air quality is predicted to remain moderate over the next 24 hours with AQI around 82. Water quality should remain stable.";
                    } else if (message.toLowerCase().includes('report')) {
                        response += "You can generate environmental reports in the Reports section. I can help you understand the data in those reports.";
                    } else {
                        response += "I can help you with air quality, water quality, predictions, and environmental data for US cities. What specific information are you looking for?";
                    }
                    
                    addAIMessage('assistant', response);
                }, 1000);
            }
        }

        function addAIMessage(sender, text) {
            const messagesContainer = document.getElementById('ai-messages');
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `ai-message ${sender}`;
            messageDiv.textContent = text;
            
            messagesContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // EPA AQI functions
        function getAQICategory(aqi) {
            if (aqi <= 50) return 'Good';
            if (aqi <= 100) return 'Moderate';
            if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
            if (aqi <= 200) return 'Unhealthy';
            if (aqi <= 300) return 'Very Unhealthy';
            return 'Hazardous';
        }

        function getAQIClass(aqi) {
            if (aqi <= 50) return 'good';
            if (aqi <= 100) return 'moderate';
            if (aqi <= 150) return 'unhealthy-sensitive';
            if (aqi <= 200) return 'unhealthy';
            if (aqi <= 300) return 'very-unhealthy';
            return 'hazardous';
        }

        // Chart initialization
        function initCharts() {
            // Real-time chart
            const ctx = document.getElementById('realtime-chart').getContext('2d');
            if (window.realtimeChart) {
                window.realtimeChart.destroy();
            }
            
            window.realtimeChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
                    datasets: [{
                        label: 'PM2.5 (μg/m³)',
                        data: [10.2, 11.5, 12.8, 11.2, 13.5, 12.1, 11.8],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'EPA Standard',
                        data: [12, 12, 12, 12, 12, 12, 12],
                        borderColor: 'rgb(0, 0, 0)',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Real-time PM2.5 Levels vs EPA Standard'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'μg/m³'
                            }
                        }
                    }
                }
            });
        }

        function initAirQualityCharts() {
            // Air trend chart
            const trendCtx = document.getElementById('air-trend-chart').getContext('2d');
            if (window.airTrendChart) {
                window.airTrendChart.destroy();
            }
            
            window.airTrendChart = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    datasets: [{
                        label: 'PM2.5',
                        data: [13.2, 12.5, 11.8, 12.2, 13.5, 14.2, 13.8, 12.5, 12.3, 11.9],
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.4
                    }, {
                        label: 'EPA Standard',
                        data: [12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
                        borderColor: 'rgb(0, 0, 0)',
                        borderDash: [5, 5],
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly PM2.5 Trends vs EPA Standard'
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'μg/m³'
                            }
                        }
                    }
                }
            });
            
            // Air history chart
            const historyCtx = document.getElementById('air-history-chart').getContext('2d');
            if (window.airHistoryChart) {
                window.airHistoryChart.destroy();
            }
            
            window.airHistoryChart = new Chart(historyCtx, {
                type: 'bar',
                data: {
                    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                    datasets: [{
                        label: 'Annual Average PM2.5',
                        data: [14.2, 13.8, 12.5, 13.1, 12.8, 12.3],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }, {
                        label: 'EPA Standard',
                        data: [12, 12, 12, 12, 12, 12],
                        backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Annual PM2.5 Levels vs EPA Standard (2018-2023)'
                        }
                    }
                }
            });
            
            // Air comparison chart
            const comparisonCtx = document.getElementById('air-comparison-chart').getContext('2d');
            if (window.airComparisonChart) {
                window.airComparisonChart.destroy();
            }
            
            window.airComparisonChart = new Chart(comparisonCtx, {
                type: 'bar',
                data: {
                    labels: ['PM2.5', 'PM10', 'Ozone', 'NO₂', 'SO₂'],
                    datasets: [{
                        label: 'Current Levels',
                        data: [12.3, 45, 0.065, 0.042, 0.012],
                        backgroundColor: 'rgba(54, 162, 235, 0.7)'
                    }, {
                        label: 'EPA Limits',
                        data: [12, 150, 0.070, 0.100, 0.075],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Current Pollutant Levels vs EPA Limits'
                        }
                    }
                }
            });
        }

        function initWaterQualityCharts() {
            // Water trend chart
            const trendCtx = document.getElementById('water-trend-chart').getContext('2d');
            if (window.waterTrendChart) {
                window.waterTrendChart.destroy();
            }
            
            window.waterTrendChart = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    datasets: [{
                        label: 'Turbidity',
                        data: [5.2, 4.8, 4.2, 3.9, 4.5, 5.8, 6.2, 5.5, 4.8, 4.5],
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.4
                    }, {
                        label: 'EPA Standard',
                        data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        borderColor: 'rgb(0, 0, 0)',
                        borderDash: [5, 5],
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Turbidity Trends vs EPA Standard'
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'NTU'
                            }
                        }
                    }
                }
            });
            
            // Water history chart
            const historyCtx = document.getElementById('water-history-chart').getContext('2d');
            if (window.waterHistoryChart) {
                window.waterHistoryChart.destroy();
            }
            
            window.waterHistoryChart = new Chart(historyCtx, {
                type: 'bar',
                data: {
                    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                    datasets: [{
                        label: 'Annual Average Turbidity',
                        data: [6.2, 5.8, 5.2, 5.5, 5.1, 4.8],
                        backgroundColor: 'rgba(75, 192, 192, 0.7)'
                    }, {
                        label: 'EPA Standard',
                        data: [5, 5, 5, 5, 5, 5],
                        backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Annual Turbidity Levels vs EPA Standard (2018-2023)'
                        }
                    }
                }
            });
            
            // Water comparison chart
            const comparisonCtx = document.getElementById('water-comparison-chart').getContext('2d');
            if (window.waterComparisonChart) {
                window.waterComparisonChart.destroy();
            }
            
            window.waterComparisonChart = new Chart(comparisonCtx, {
                type: 'bar',
                data: {
                    labels: ['pH', 'Turbidity', 'Dissolved Oxygen', 'Lead', 'Nitrate'],
                    datasets: [{
                        label: 'Current Levels',
                        data: [7.2, 4.8, 6.8, 0.008, 8.2],
                        backgroundColor: 'rgb(54, 162, 235)'      }]
                    }
        });
    }

    function initPredictionCharts() {
        // Air quality forecast chart
        const aqForecastCtx = document.getElementById('aq-forecast-chart').getContext('2d');
        if (window.aqForecastChart) {
            window.aqForecastChart.destroy();
        }
        
        window.aqForecastChart = new Chart(aqForecastCtx, {
            type: 'line',
            data: {
                labels: ['Now', '+3h', '+6h', '+9h', '+12h', '+15h', '+18h', '+21h', '+24h'],
                datasets: [{
                    label: 'PM2.5 Forecast',
                    data: [12.3, 12.8, 13.5, 13.8, 13.2, 12.9, 12.5, 12.2, 13.1],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'EPA Standard',
                    data: [12, 12, 12, 12, 12, 12, 12, 12, 12],
                    borderColor: 'rgb(0, 0, 0)',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '24-Hour PM2.5 Forecast vs EPA Standard'
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'μg/m³'
                        }
                    }
                }
            }
        });
    }

    function initControlImpactChart() {
        const impactCtx = document.getElementById('control-impact-chart').getContext('2d');
        if (window.impactChart) {
            window.impactChart.destroy();
        }
        
        window.impactChart = new Chart(impactCtx, {
            type: 'bar',
            data: {
                labels: ['Air Purifiers', 'Water Treatment', 'Traffic Control', 'Industry Regulation'],
                datasets: [{
                    label: 'Impact on PM2.5 Reduction (%)',
                    data: [15, 5, 25, 35],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)'
                }, {
                    label: 'Impact on WQI Improvement (%)',
                    data: [2, 40, 8, 20],
                    backgroundColor: 'rgba(75, 192, 192, 0.7)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Estimated Impact of Control Measures on Environmental Quality'
                    }
                }
            }
        });
    }

    // Initialize all charts when page loads
    document.addEventListener('DOMContentLoaded', function() {
        initCharts();
        initAirQualityCharts();
        initWaterQualityCharts();
        initPredictionCharts();
        initControlImpactChart();
        
        // Set last update time
        document.getElementById('last-update').textContent = new Date().toLocaleTimeString();
        
        // Set initial AQI indicator
        const aqiValue = parseInt(document.getElementById('aqi-value').textContent);
        const aqiIndicator = document.querySelector('#dashboard .aqi-indicator');
        aqiIndicator.textContent = getAQICategory(aqiValue);
        aqiIndicator.className = 'aqi-indicator ' + getAQIClass(aqiValue);
    });