import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

export const signUpApi = async (val: any, router: any) => {
  console.log(val?.role?.value, "sign up val data");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const userCredential: any = await createUserWithEmailAndPassword(
    val?.email,
    val?.password
  ).then((res: any) => {
    console.log(res, "sign up responsse");
    router.push("/");
  });
  const user = userCredential?.user;
  setDoc(doc(db, "user", user?.uid), {
    email: val?.email,
    phone: val?.phone,
    role: val?.role,
    location: val?.location,
    createdAt: new Date().toISOString(),
    uid: user?.uid,
  });
};

export const signInApi = async (val: any, router: any) => {
  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "Admin123";

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  try {
    // Set session persistence
    // await setPersistence(auth, browserSessionPersistence);

    if (val.email === ADMIN_EMAIL && val.password === ADMIN_PASSWORD) {
      console.log("Admin logged in successfully");
      router.push("/admin-dashboard");
      await signInWithEmailAndPassword(val.email, val.password);
      return;
    }

    // Authenticate user
    const userCredential = await signInWithEmailAndPassword(
      val?.email,
      val?.password
    );

    const user = userCredential?.user;

    // Fetch user role from Firestore
    if (!user?.uid) {
      throw new Error("User UID is undefined");
    }
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();

      console.log("User role:", userData.role);

      // Navigate to respective dashboards
      switch (userData?.role) {
        case "admin":
          router.push("/admin-dashboard");
          break;
        case "farmer":
          router.push("/farmer-dashboard");
          break;
        case "buyer":
          router.push("/buyer-dashboard");
          break;
        default:
          console.warn("Unknown role detected.");
          break;
      }
    } else {
      console.error("User document not found in Firestore");
    }
  } catch (error: any) {
    console.error("Error during sign-in:", error.message);
    // Optionally handle UI feedback for the error
  }
};
