const PowerDevice = require('../models/PowerDevice');

class PowerManagementController {
  async getDashboardData(req, res) {
    try {
      const devices = await PowerDevice.find();
      
      const totalConsumption = devices.reduce(
        (total, device) => total + device.currentConsumption, 
        0
      );

      const optimizationScore = this.calculateOptimizationScore(devices);

      res.json({
        totalConsumption,
        devices,
        optimizationScore,
        weeklyConsumption: [45, 50, 40, 55, 60, 48, 52]
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching power data' });
    }
  }

  calculateOptimizationScore(devices) {
    // Complex optimization scoring algorithm
    const activeDevices = devices.filter(device => device.status === 'active');
    return Math.round(
      (activeDevices.length / devices.length) * 100
    );
  }

  async optimizeDevice(req, res) {
    const { deviceId, optimizationLevel } = req.body;
    
    try {
      const device = await PowerDevice.findByIdAndUpdate(
        deviceId, 
        { optimizationLevel },
        { new: true }
      );
      
      res.json(device);
    } catch (error) {
      res.status(500).json({ message: 'Device optimization failed' });
    }
  }
}

module.exports = new PowerManagementController();