import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ContentManagement from "./ContentManagement";
import UserManagement from "./UserManagement";
import "../../../styles/admin.scss";

const AdminPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/content" element={<ContentManagement />} />
    </Routes>
  );
};

export default AdminPage;
