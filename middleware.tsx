// "use client"

// import { useEffect } from "react";
// import { useAuthState } from "./lib/context";
// import { useRouter } from "next/navigation";

// const ProtectedPage: React.FC = () => {
//   const {user, loading } = useAuthState();
//   const router = useRouter();

//   useEffect(()=>{
//     if(!loading && !user){
//       router.push("/login")
//     }

//   },[user, loading])

//   if (loading) return <p>Loading...</p>;
//   return <div>Protected Content</div>;
// }

// export default ProtectedPage;
