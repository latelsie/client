import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboardchart.css';

const DashboardChart = ({ salesData }) => {
  
  const totalSales = 500; 
  const totalCustomers = 150; 
  const totalDays = salesData.length; 
  const averageSales = (totalSales / totalDays).toFixed(2); 

  const chartData = {
    labels: salesData.map(data => data.day),
    datasets: [
      {
        label: 'Sales per Day',
        data: salesData.map(data => data.sales),
        backgroundColor: [
          'rgba(0, 128, 128, 0.6)',  
          'rgba(64, 224, 208, 0.6)', 
          'rgba(72, 209, 204, 0.6)', 
          'rgba(32, 178, 170, 0.6)', 
          'rgba(0, 206, 209, 0.6)',  
          'rgba(0, 255, 255, 0.6)',  
          'rgba(127, 255, 212, 0.6)', 
        ],
        borderColor: [
          'rgba(0, 128, 128, 1)',  
          'rgba(64, 224, 208, 1)',
          'rgba(72, 209, 204, 1)', 
          'rgba(32, 178, 170, 1)', 
          'rgba(0, 206, 209, 1)',  
          'rgba(0, 255, 255, 1)',  
          'rgba(127, 255, 212, 1)', 
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
   
      <div className="stats-grid">
        <div className="stats-box">
          <p>Total Customers</p>
          <h3>{totalCustomers}</h3> 
        </div>
        <div className="stats-box">
          <p>Total Sales</p>
          <h3>{totalSales}</h3> 
        </div>
        <div className="stats-box">
          <p>Total Days</p>
          <h3>{totalDays}</h3> 
        </div>
        <div className="stats-box">
          <p>Average Sales</p>
          <h3>{averageSales}</h3> 
        </div>
      </div>

     
      <div className="charts-grid">
        <div className="chart-box">
          <h4>Bar Chart</h4>
          <Bar data={chartData} />
        </div>
        <div className="chart-box">
          <h4>Line Chart</h4>
          <Line data={chartData} />
        </div>
        <div className="chart-box">
          <h4>Pie Chart</h4>
          <Pie data={chartData} />
        </div>
        <div className="chart-box">
          <h4>Doughnut Chart</h4>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
