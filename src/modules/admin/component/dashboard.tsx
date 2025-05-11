"use client"
import SummaryCard from "@/components/summaryCard";
import SummaryContainer from "@/components/summaryContainer";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";

const AdminDashboards =  () => {
  const [totalFarmer, setTotalFarmer] = useState<number>(0)
  const [totalBuyer, setTotalBuyer] = useState<number>(0)
  
  const fetchData = async () =>{
    try {
      const dataCollection = collection(db,"user");

      // fetching farmer details
      const farmerQuery = query(dataCollection, where("role","==", "Farmer"));
      const farmersSnapshot = await getDocs(farmerQuery);
      console.log(farmersSnapshot, "farmer snapsot")
      setTotalFarmer(farmersSnapshot.size)
      // fetching buyer
      const buyerQuery = query(dataCollection, where("role", "==", "Buyer"));
      const buyerSnapshot = await getDocs(buyerQuery);
      console.log(buyerSnapshot, "buyer snapshot")
      setTotalBuyer(buyerSnapshot.size)
  
    } catch (error) {
      console.error(error)
    }
  }

  console.log(totalFarmer, "total farmer record")

  useEffect(()=>{
    fetchData()
  },[])
 
  return (
    <div>
      <div className="flex items-center gap-4">
       <SummaryContainer>
       <SummaryCard title="Total Registered Farmer" value={totalFarmer} />
        <SummaryCard title="Total Registered Buyer" value={totalBuyer} />
        <SummaryCard title="Number of Active Product" value={0} />
        <SummaryCard title="Total Order" value={0} />
        <SummaryCard title="Number of Active Product" value={0} />
       </SummaryContainer>
      </div>
      <div className="grid grid-cols-2 mt-8 gap-4">
        <div className="w-full h-72 border"></div>
        <div className="w-full h-72 border"></div>
        <div className="w-full h-72 border"></div>
        <div className="w-full h-72 border"></div>
      </div>
    </div>
  );
};

export default AdminDashboards;
