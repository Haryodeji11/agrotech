"use client"
import UserManagementPage from '@/modules/admin/component/user-management'
import AdminLayout from '@/modules/admin/layout/page'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../lib/firebase'

const Farmer = () => {

  const [data, setData] = useState<any[]>([])
  const [totalRecord, setTotalRecord]= useState(0)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async () =>{
    try {
      setLoading(true)
      const farmerCollection = collection(db,"user");
      const farmerQuery = query(farmerCollection,where("role","==","Farmer"));

       const snapshot = await getDocs(farmerQuery);
      setTotalRecord(snapshot.size)
       const farmerData = snapshot.docs.map((doc)=>({
        id: doc?.id,
        ...doc?.data()
       }))

       setData(farmerData)
    } catch (error) {
      throw new Error("can't fetch user data")
    } finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <AdminLayout>
       <UserManagementPage loading={loading} totalRecords={totalRecord} data={data} />
       {/* <ApText>Farmer page</ApText> */}
    </AdminLayout>
  )
}

export default Farmer