// google.charts.load('current', {'packages':['gauge']});
// google.charts.setOnLoadCallback(drawChart);
// Register the plugin to all charts:
// Chart.register(ChartDataLabels);
// Chart.register(BoxAndViolinPlot);

document.addEventListener('DOMContentLoaded', function () {
    // Load the SVG file
    fetch('world-states.svg')
        .then(response => response.text())
        .then(svgData => {
            document.getElementById('svg-container').innerHTML = svgData;
            colorMap(); // Call the function to color the map after it's loaded
        });

    // Function to color the map
    function colorMap() {
        // Load the JSON data
        fetch('country-data.json')
            .then(response => response.json())
            .then(countryData => {
                // Find the maximum population for scaling
                const maxPopulation = Math.max(...Object.values(countryData).map(c => c.population));

                // Color each country based on population
                for (var countryCode in countryData) {
                    var population = countryData[countryCode].population;
                    var color = getGradientColor(population, maxPopulation);
                    var borderColor = getBorderColor(population, maxPopulation);
                    var countryElement = document.getElementById(countryCode);
                    if (countryElement) {
                        countryElement.querySelectorAll('path').forEach(function(path) {
                            path.style.fill = color;
                            path.style.stroke = borderColor; 
                        });
                    }
                }
            });
    }

    function getGradientColor(population, maxPopulation) {
        // Use a power scale for intensity
        const power = 0.20; // You can adjust this value to tweak the scaling
        const adjustedMax = Math.pow(maxPopulation, power);
        const adjustedPop = Math.pow(population, power);
        const intensity = adjustedPop / adjustedMax;
    
        // Define start and end colors for the gradient
        const startColor = { r: 75, g: 192, b: 192, a: 1 };
        const endColor = { r: 255, g: 99, b: 132, a: 1 };
    
        // Interpolate each component of the RGBA color
        const r = startColor.r + (intensity * (endColor.r - startColor.r));
        const g = startColor.g + (intensity * (endColor.g - startColor.g));
        const b = startColor.b + (intensity * (endColor.b - startColor.b));
        const a = startColor.a + (intensity * (endColor.a - startColor.a));
    
        return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
    }
    

    // Function to calculate border color gradient
    function getBorderColor(population, maxPopulation) {
        // Use a square root scale for intensity, similar to the fill color
        const sqrtMax = Math.sqrt(maxPopulation);
        const sqrtPop = Math.sqrt(population);
        const intensity = sqrtPop / sqrtMax;

        // Define start and end colors for the gradient
        const startColor = { r: 75, g: 192, b: 192, a: 1 }; // rgba(75, 192, 192, 1)
        const endColor = { r: 255, g: 99, b: 132, a: 1 }; // rgba(255, 99, 132, 1)

        // Interpolate each component of the RGBA color
        const r = startColor.r + (intensity * (endColor.r - startColor.r));
        const g = startColor.g + (intensity * (endColor.g - startColor.g));
        const b = startColor.b + (intensity * (endColor.b - startColor.b));
        const a = startColor.a + (intensity * (endColor.a - startColor.a));

        return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
    }

    

    // Function to generate random data
    function generateRandomData(numPoints) {
        return Array.from({ length: numPoints }, () => Math.floor(Math.random() * 100));
    }

    function generateRandomDataScat(numpoints){
        var data = [];
        for (var i = 0; i < numpoints; i++) {
            data.push({
                x: Math.random() * 100,
                y: Math.random() * 100
            });
        }
        return data;
    }
    
    var ctx = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Dataset 1',
                data: generateRandomData(6),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }, {
                label: 'Dataset 2',
                data: generateRandomData(6),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    beginAtZero: true,
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });

    var ctx = document.getElementById('stackChart').getContext('2d');
    var stackChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Dataset 1',
                data: generateRandomData(6),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }, {
                label: 'Dataset 2',
                data: generateRandomData(6),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }, {
                label: 'Dataset 3',
                data: generateRandomData(6),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    beginAtZero: true,
                    ticks: {
                        maxTicksLimit: 6
                    },
                    stacked:true
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    stacked:true
                }]
            }
        }
    });

    var ctx = document.getElementById('scatterChart').getContext('2d');
    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                data: generateRandomDataScat(50)
            }, {
                label: 'Dataset 2',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                data: generateRandomDataScat(50)
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)' // Light grid lines
                    }
                }],
                yAxes: [{
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)' // Light grid lines
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                }]
            }
        }
    });

    
    // Line Chart Initialization
    var ctxLine = document.getElementById('lineChart').getContext('2d');
    var lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Dataset 1',
                data: generateRandomData(6),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill:false,
                lineTension: 0
            }, {
                label: 'Dataset 2',
                data: generateRandomData(6),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill:false,
                lineTension: 0
            }, {
                label: 'Dataset 3',
                data: generateRandomData(6),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill:false,
                lineTension: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    beginAtZero: true,
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });

    var ctxArea = document.getElementById('areaChart').getContext('2d');
    var areaChart = new Chart(ctxArea, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Dataset 1',
                data: generateRandomData(6),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: true
            }, {
                label: 'Dataset 2',
                data: generateRandomData(6),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    beginAtZero: true,
                    grid: {
                        display: true
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
    });

    var ctxDonut = document.getElementById('donutChart').getContext('2d');
    var donutChart = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['Dataset1', 'Dataset2', 'Dataset3'],
            datasets: [{
                label: 'Dataset 1',
                data: generateRandomData(3),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)', // Pastel red
                    'rgba(54, 162, 235, 0.2)', // Pastel blue
                    'rgba(75, 192, 192, 0.2)'  // Pastel yellow
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: '#fff',
                    textAlign: 'center',
                    font: {
                        weight: 'bold'
                    },
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;
                    }
                }
            }
        }
    });

    // Function to generate random box plot data
    function generateBoxPlotData() {
        let min = Math.floor(Math.random() * 10);
        let q1 = min + Math.floor(Math.random() * 10);
        let median = q1 + Math.floor(Math.random() * 10);
        let q3 = median + Math.floor(Math.random() * 10);
        let max = q3 + Math.floor(Math.random() * 10);
        return { min, q1, median, q3, max };
    }

    var ctxBox = document.getElementById('boxPlot').getContext('2d');
    var boxPlot = new Chart(ctxBox, {
        type: 'boxplot',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                outlierColor: '#999999',
                padding: 10,
                itemRadius: 3,
                data: [generateBoxPlotData(), generateBoxPlotData(), generateBoxPlotData(), generateBoxPlotData()]
            }, {
                label: 'Dataset 2',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                outlierColor: '#999999',
                padding: 10,
                itemRadius: 3,
                data: [generateBoxPlotData(), generateBoxPlotData(), generateBoxPlotData(), generateBoxPlotData()]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    beginAtZero: true,
                    grid: {
                        display: true
                    },
                    ticks: {
                        maxTicksLimit: 8
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Box Plot'
            }
        }
    });

    ctxGauge = document.getElementById("gaugeChart").getContext("2d");
    var gaugeChart = new Chart(ctxGauge, {
        type: "radialGauge",
        data: {
        labels: ["Percentage"],
        datasets: [
        {
            data: generateRandomData(1),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            label: "Score"
        },
        ]
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {},
        title: {
        display: true
        }, 
        centerArea: {
                    text: 'Dataset1',
                },
        centerPercentage: 80
        }
    });

    ctxGauge2 = document.getElementById("gaugeChart2").getContext("2d");
    var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
       };

    var gaugeChart = new Chart(ctxGauge2, {
        type: "radialGauge",
        data: {
        labels: ["Percentage"],
        datasets: [
        {
            data: generateRandomData(1),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            label: "Score"
        },
        ]
        },
        options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {},
        title: {
        display: true
        }, 
        centerArea: {
                    text: 'Dataset2',
                },
        centerPercentage: 80
        }
    });

    // Function to resize charts
    function resizeCharts() {
        boxPlot.update();
        donutChart.update();
        areaChart.update();
        scatterChart.update();
        barChart.update();
        lineChart.update();
    }
    // Event listener for window resize
    window.addEventListener('resize', resizeCharts);
});



// function drawChart() {
//     // Get the width of the gauge chart's container
//     var container = document.getElementById('gaugeChart');
//     var containerWidth = container.offsetWidth;
//     var data = google.visualization.arrayToDataTable([
//         ['Label', 'Value'],
//         ['Memory', 80],
//         ['CPU', 55],
//         ['Network', 68]
//     ]);

//     var options = {
//         width: containerWidth,
//         height: 120,
//         greenColor: '#a8e6cf', // Pastel green
//         yellowColor: '#ffd3b6', // Pastel orange
//         redColor: '#ffaaa5', // Pastel red
//         minorTicks: 5
//     };

//     var chart = new google.visualization.Gauge(document.getElementById('gaugeChart'));
//     chart.draw(data, options);
// }

// // Redraw chart on window resize
// window.onresize = function() {
//     drawChart();
// };
