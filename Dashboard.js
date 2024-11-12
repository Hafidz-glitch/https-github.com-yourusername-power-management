import React, { useState, useEffect } from 'react';
import PowerUsageChart from '../components/PowerUsageChart';
import DeviceList from '../components/DeviceList';
import PowerOptimizationPanel from '../components/PowerOptimizationPanel';

function Dashboard() {
  const [powerData, setPowerData] = useState({
    totalConsumption: 0,
    devices: [],
    optimizationScore: 0
  });

  useEffect(() => {
    // Fetch power management data
    async function fetchPowerData() {
      try {
        const response = await axios.get('/api/power-management');
        setPowerData(response.data);
      } catch (error) {
        console.error('Error fetching power data', error);
      }
    }

    fetchPowerData();
    const interval = setInterval(fetchPowerData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>Smart Power Management</h1>
      
      <div className="power-overview">
        <div className="total-consumption">
          <h2>Total Power Consumption</h2>
          <p>{powerData.totalConsumption} kWh</p>
        </div>
        
        <PowerUsageChart data={powerData} />
        
        <PowerOptimizationPanel 
          optimizationScore={powerData.optimizationScore}
        />
      </div>

      <DeviceList devices={powerData.devices} />
    </div>
  );
}

export default Dashboard;