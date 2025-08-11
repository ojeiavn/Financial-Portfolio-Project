import React, { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const XAXISRANGE = 10 * 1000;
const POLL_MS = 20000;

export const ApexChart = ({ symbol, productType, apiBase = 'http://localhost:5000' }) => {
  const [series, setSeries] = useState([{ name: symbol, data: [] }]);
  const [options, setOptions] = useState({
    chart: { id: 'realtime', type: 'line', animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 1000 } }, toolbar: { show: false }, zoom: { enabled: false } },
    title: { text: symbol, align: 'left', style: { color: '#FFFFFF', fontFamily: 'Helvetica, Arial, sans-serif' } },
    tooltip: { theme: 'dark', style: { fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif' } },
    colors: ['#14F002'],
    stroke: { curve: 'smooth' },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    xaxis: { type: 'datetime', range: XAXISRANGE, labels: { style: { colors: '#FFFFFF' } } },
    yaxis: { labels: { style: { colors: '#FFFFFF' } } },
    legend: { show: false }
  });

  const pointsRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    pointsRef.current = [];
    setSeries([{ name: symbol, data: [] }]);
    setOptions(prev => ({ ...prev, title: { ...prev.title, text: symbol } }));

    const tick = async () => {
      try {
        const res = await fetch(`${apiBase}/prices/${productType}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const arr = await res.json();
        const item = Array.isArray(arr)
          ? arr.find(r => r.Symbol === symbol || r.Name === symbol)
          : null;

        if (item) {
          const raw = item.CurrentPrice ?? item.Price;
          const y = typeof raw === 'string' ? parseFloat(raw) : Number(raw);
          if (!Number.isNaN(y)) {
            const t = Date.now();
            const minT = t - XAXISRANGE;
            const next = [...pointsRef.current.filter(([x]) => x >= minT), [t, y]];
            pointsRef.current = next;
            setSeries([{ name: symbol, data: next }]);
          }
        }
      } catch (_) {
      } finally {
        timerRef.current = setTimeout(tick, POLL_MS);
      }
    };

    tick();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [symbol, productType, apiBase]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={200} />
    </div>
  );
};
