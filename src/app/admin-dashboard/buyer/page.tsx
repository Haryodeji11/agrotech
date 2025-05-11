import { ApText } from '@/components/text'
import UserManagementPage from '@/modules/admin/component/user-management'
import AdminLayout from '@/modules/admin/layout/page'
import React from 'react'

const Buyer = () => {
  return (
    <AdminLayout>
      {/* <ApText>Buyer page</ApText> */}
      <UserManagementPage />
    </AdminLayout>
  )
}

export default Buyer