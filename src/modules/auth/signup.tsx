"use client";

import { ApButton } from "@/components/button/button";
import { ApForm } from "@/components/form";
import { ApSelectInput } from "@/components/input/selectinput";
import { ApTextInput } from "@/components/input/textinput";
import { ApText } from "@/components/text";
import { FormikProps } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../../lib/firebase";
import { setDoc, doc } from "firebase/firestore";

const SignUpPage: React.FC = () => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (val: any, { setSubmitting }: any) => {
    console.log(val, "handle submit values");
    try {
      setSubmitting(true);
      const userCredential = await createUserWithEmailAndPassword(
        val.email,
        val.password
      );
      const user: any = userCredential?.user;
      if (user) {
        await setDoc(doc(db, "user", user?.uid), {
          name: val?.name,
          email: val?.email,
          phone: val?.phone,
          role: val?.role?.value,
          location: val?.location,
          createdAt: new Date().toISOString(),
          uid: user?.uid,
        });

        console.log(user, "user successfully created");

        router.push("/login");
      }
    } catch (error) {
      console.error(error, ":error signing up");
    } finally {
      // setLoading(false)
      setSubmitting(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-[100%] h-screen">
      <ApForm
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "",
          location: "",
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <div className="w-[30%] bg-white shadow-lg p-8 rounded-md flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

            {/* Email */}
            <ApTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />

            {/* Phone */}
            <ApTextInput
              label="Phone Number"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />

            {/* Role */}
            <div className="mb-4">
              <ApSelectInput
                label="Role"
                name="role"
                options={[
                  { value: "Farmer", label: "Farmer" },
                  { value: "Buyer", label: "Buyer" },
                ]}
              />
            </div>

            {/* Location */}
            <ApTextInput
              label="Location"
              name="location"
              type="text"
              placeholder="Enter your location (e.g., city or state)"
            />

            {/* Password */}
            <ApTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />

            {/* Confirm Password */}
            <ApTextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />

            {/* Submit Button */}
            <ApButton
              type="submit"
              onClick={props.handleSubmit}
              color="bg-green-500"
              className="h-10"
              title={props.isSubmitting ? "loading....." : "Submit"}
              disabled={props.isSubmitting}
            />

            <div className="flex items-center gap-4 self-center mt-2">
              <ApText>
                Don't have an account{" "}
                <Link className="text-green-500" href={"/login"}>
                  Login
                </Link>
              </ApText>
              <Link className="text-green-500" href={"/forget-password"}>
                Forget Password
              </Link>
            </div>
          </div>
        )}
      </ApForm>
    </div>
  );
};

export default SignUpPage;
