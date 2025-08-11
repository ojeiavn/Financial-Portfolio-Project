// ApexChart.jsx
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

const XAXISRANGE = 10 * 1000;
let data = [];
let lastDate = new Date().getTime();

function getNewSeries(baseval, yrange) {
  data = data.slice(data.length - XAXISRANGE / 1000);
  const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  const newTime = baseval + 1000;
  data.push([newTime, y]);
  lastDate = newTime;
}

export const ApexChart = ({ companyName }) => {
  const [series, setSeries] = useState([{ name: companyName, data: [] }]);
  const [options, setOptions] = useState({
    chart: { id: 'realtime', type: 'line', animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 1000 } }, toolbar: { show: false }, zoom: { enabled: false } },
    title: { text: companyName, align: 'left', style: { color: '#FFFFFF', fontFamily: 'Helvetica, Arial, sans-serif' } },
    tooltip: { theme: 'dark', style: { fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif' } },
    colors: ['#14F002'],
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    xaxis: { type: 'datetime', range: XAXISRANGE, labels: { style: { colors: '#FFFFFF' } } },
    yaxis: { max: 100, labels: { style: { colors: '#FFFFFF' } } },
    legend: { show: false }
  });

  useEffect(() => {
    for (let i = 0; i < XAXISRANGE / 1000; i++) {
      getNewSeries(lastDate, { min: 10, max: 90 });
    }
    setSeries([{ name: companyName, data }]);
    setOptions(prev => ({ ...prev, title: { ...prev.title, text: companyName } }));
    // const interval = setInterval(() => {
    //   getNewSeries(lastDate, { min: 10, max: 90 });
    //   ApexCharts.exec('realtime', 'updateSeries', [{ name: companyName, data }]);
    // }, 20000);
    return () => clearInterval(interval);
  }, [companyName]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={200} />
    </div>
  );
};
