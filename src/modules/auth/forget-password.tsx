"use client";
import { useState } from "react";
import { auth, db } from "../../../lib/firebase"; // Import your Firebase configuration
import { sendPasswordResetEmail } from "firebase/auth";
import { FormikProps } from "formik";
import { ApForm } from "@/components/form";
import { ApTextInput } from "@/components/input/textinput";
import { ApButton } from "@/components/button/button";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { error } from "console";

const ForgotPassword = () => {
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const handleSubmit = async (val: any, { setSubmitting }: any) => {
    try {
      setSubmitting(true);
      const collections = collection(db, "user");
      const emailExist = query(
        collections,
        where("email", "==", val?.email)
      );
      const querySnapshot = await getDocs(emailExist);
      if (querySnapshot.empty) {
        console.log("email doesn't exist");
        return;
      }
      await sendPasswordResetEmail(val?.email).then((res: any) => {
        console.log(res, "reset email password");
      });
    } catch (err: any) {
      console.error("Error sending password reset email:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Reset Password
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <ApForm
          initialValues={{
            email: "",
          }}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <div className="w-full">
              <ApTextInput name="email" label="Email" placeHolder="Email" />
              <div className="flex items-center justify-end">
                <ApButton
                  onClick={props.handleSubmit}
                  type="submit"
                  color="bg-green-500"
                  title={
                    props.isSubmitting ? "Loding....." : "Send Reset Email"
                  }
                />
              </div>
            </div>
          )}
        </ApForm>
      </div>
    </div>
  );
};

export default ForgotPassword;
