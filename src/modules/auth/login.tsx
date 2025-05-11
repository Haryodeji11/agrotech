"use client";
import { ApButton } from "@/components/button/button";
import { ApForm } from "@/components/form";
import { ApTextInput } from "@/components/input/textinput";
import { ApText } from "@/components/text";
import { Formik, FormikProps } from "formik";
import Link from "next/link";
import { signInApi } from "./api";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../../lib/firebase";
import { getDoc, doc } from "firebase/firestore";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "Admin123";

  const handleSubmit = async (val: any, { setSubmitting }: any) => {
    console.log(val, "value submission");

    try {
      setSubmitting(true);
      let userCredential: any = await signInWithEmailAndPassword(
        val.email,
        val.password
      );
      const user = userCredential.user;
      console.log(user, "user credential from login");
      // Fetch user role from Firestore
      console.log(user?.uid, "user id......");
      const userDoc = await getDoc(doc(db, "user", user?.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        console.log("User role:", userData);

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
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-[100%] h-screen ">
      <ApForm
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <form
            className="w-full flex items-center justify-center"
            onSubmit={props.handleSubmit}
          >
            <div className="w-[35%] h-2/4 bg-white shadow-lg p-8 rounded-md boder border-green-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
              <ApTextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />

              {/* Password */}
              <ApTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />

              {/* Submit Button */}
              <div className="flex items-center justify-end">
                <ApButton
                  type="submit"
                  color="bg-green-500"
                  title={props.isSubmitting ? "loading...." : "submit"}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <ApText className="self-center">
                  Don't have an account{" "}
                  <Link className="text-green-500" href={"/signup"}>
                    Sign Up
                  </Link>
                </ApText>
                <Link className="text-green-500" href={"/forget-password"}>
                  Forget Password
                </Link>
              </div>
            </div>
          </form>
        )}
      </ApForm>
    </div>
  );
};

export default LoginPage;
