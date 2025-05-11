// import { User, onAuthStateChanged } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "./firebase";

// interface IAuthState {
//   user: User | null;
//   loading: boolean;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>
// }

// const AuthContext = createContext<IAuthState | undefined>(undefined);

// export const useAuthState = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// interface IProps {
//   children: React.ReactNode;
// }

// export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
