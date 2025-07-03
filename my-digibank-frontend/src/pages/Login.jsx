import { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
      setStatus("Invalid credentials. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-white">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow border">
        <h1 className="text-2xl font-semibold text-center text-blue-800 mb-4">
          My DigiBank
        </h1>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {status && (
                <p className="text-red-600 text-sm text-center">{status}</p>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Username
                </label>
                <Field
                  name="username"
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border border-gray-300 rounded pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-sm text-center text-gray-600">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}