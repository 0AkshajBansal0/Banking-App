import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const schema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await login(values.username, values.password);
      navigate("/accounts");
    } catch {
      setStatus("Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="bg-white p-6 rounded-lg shadow space-y-5">
            {status && (
              <p className="text-red-600 text-sm text-center">{status}</p>
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

            {/* Password with toggle */}
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center mt-2">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 underline">
                Sign up
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}