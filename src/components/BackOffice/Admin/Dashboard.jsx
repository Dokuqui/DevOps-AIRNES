import React from "react";
import Sidebar from "./SideBar";
import FooterBack from "./FooterBack";
import { initialUser } from "./UserManagement";
import CanvasJSReact from "@canvasjs/react-charts";
import { Link } from "react-router-dom";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Dashboard = () => {
  const users = initialUser;

  const roles = {};
  users.forEach((user) => {
    roles[user.role] = (roles[user.role] || 0) + 1;
  });

  const dataPoints = Object.keys(roles).map((role) => ({
    y: roles[role],
    label: role,
  }));

  const options1 = {
    animationEnabled: true,
    animationDuration: 2000,
    exportEnabled: true,
    theme: "dark1",
    title: {
      text: "Users",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: dataPoints,
      },
    ],
  };

  const options2 = {
    animationEnabled: true,
    animationDuration: 2000,
    exportEnabled: true,
    theme: "dark1",
    title: {
      text: "Component Distribution 2",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: 20, label: "Component X" },
          { y: 40, label: "Component Y" },
          { y: 40, label: "Component Z" },
        ],
      },
    ],
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <h2>Dashboard</h2>
        <div className="statistics">
          <h3>Statistics</h3>

          <Link to="https://dashboard.stripe.com/test/payments">
            <button className="btn">Redirect to Stripe</button>
          </Link>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Items</th>
                <th>Average Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Electronics</td>
                <td>100</td>
                <td>$500</td>
              </tr>
              <tr>
                <td>Books</td>
                <td>50</td>
                <td>$20</td>
              </tr>
              <tr key="3">
                <td>Furniture</td>
                <td>75</td>
                <td>$300</td>
              </tr>
              <tr key="4">
                <td>Clothing</td>
                <td>200</td>
                <td>$50</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dashboard-diagram">
          <h3>Product & User Statistic</h3>
          <div className="chart-container">
            <CanvasJSChart options={options1} />
          </div>
          <div className="chart-container">
            <CanvasJSChart options={options2} />
          </div>
        </div>
      </div>
      <FooterBack />
    </div>
  );
};

export default Dashboard;
