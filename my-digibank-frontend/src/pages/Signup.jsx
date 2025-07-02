import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const schema = Yup.object({
    username: Yup.string().min(4).required("Username is required"),
    password: Yup.string().min(6).required("Password is required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await signup(values.username, values.password);
      setStatus("Signup success! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1000);
    } catch {
      setStatus("Username already exists");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

      <Formik
        initialValues={{ username: "", password: "", confirm: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="bg-white p-6 rounded-lg shadow space-y-5">
            {status && (
              <p
                className={`text-center text-sm ${
                  status.includes("success") ? "text-green-600" : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}

            <div>
              <Field
                name="username"
                placeholder="Username"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Confirm */}
            <div className="relative">
              <Field
                type={showConfirm ? "text" : "password"}
                name="confirm"
                placeholder="Confirm Password"
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
              <ErrorMessage
                name="confirm"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>

            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}