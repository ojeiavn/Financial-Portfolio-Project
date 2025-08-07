import React from "react";
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

const UserCharts = () => {
    const [state, setState] = React.useState({
          
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            legend: {
                position: 'bottom',
                labels: {
                    colors: '#ffffff', 
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                    width: 200
                    },
                    legend: {
                        position: 'bottom', 
                    },
                }
            }]
        },  
    });

    return (
        <>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="pie" width={300} />
            </div>
        </>
    );
}

export default UserCharts;