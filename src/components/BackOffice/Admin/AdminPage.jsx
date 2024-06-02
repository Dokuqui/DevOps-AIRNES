import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ContentManagement from "./ContentManagement";
import UserManagement from "./UserManagement";
import CatergoryManager from "./CategoryManager";
import MaterialsManager from "./MaterialsManager";
import RoomManager from "./RoomManager";
import "../../../styles/admin.scss";
import { getUserInfo } from "../../../helper";

const AdminPage = () => {
  useState(async () => {
    var user = await getUserInfo();

    if (!user || user === null) {
      window.location.href = "/";
      localStorage.removeItem("Token");
    }

    console.log(user);

    if (user.RoleId !== 2) {
      window.location.href = "/";
    }
  });

  return (

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/content" element={<ContentManagement />} />
      <Route path="/categories" element={<CatergoryManager />} />
      <Route path="/materials" element={<MaterialsManager />} />
      <Route path="/rooms" element={<RoomManager />} />
    </Routes>
  );
};

export default AdminPage;
