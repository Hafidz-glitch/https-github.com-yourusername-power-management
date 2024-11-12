import React from 'react';
import { Line } from 'react-chartjs-2';

function PowerUsageChart({ data }) {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Power Consumption',
      data: data.weeklyConsumption,
      borderColor: 'green',
      backgroundColor: 'rgba(0, 255, 0, 0.1)'
    }]
  };

  return (
    <div className="power-usage-chart">
      <Line data={chartData} />
    </div>
  );
}

export default PowerUsageChart;