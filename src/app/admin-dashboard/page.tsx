'use client'
import AdminDashboards from '@/modules/admin/component/dashboard'
import AdminLayout from '@/modules/admin/layout/page'
import AdminDashboard from '@/modules/admin/page'
import React from 'react'

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
        <AdminDashboards />
   </AdminLayout>
  )
}

export default AdminDashboardPage