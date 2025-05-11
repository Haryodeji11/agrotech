'use client'
import { useState, useEffect } from "react";
import { fetchUsersByRole } from "../../../lib/firestore";


const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersByRole("admin").then((data: any) => setUsers(data));
  }, []);
 console.log(users, "user data")
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users with role "buyer":</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
