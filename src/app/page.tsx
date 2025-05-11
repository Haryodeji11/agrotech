"use client"

import { useRouter } from "next/navigation";
import HomePage from "./home"
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from "../../lib/firebase";
import AdminLayout from "@/modules/admin/layout/page";



export default function Home() {
  const [user] = useAuthState(auth)
  console.log(user, "user........")
  const router = useRouter()
  if(!user){
    router.push("/signup")
  }
  return (
    <AdminLayout>
       <HomePage />
    </AdminLayout>   
  );
}
