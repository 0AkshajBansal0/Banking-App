import { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t } = useTranslation();
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const schema = Yup.object({
    username: Yup.string()
      .min(4, t("usernameMin"))
      .required(t("usernameRequired")),
    password: Yup.string()
      .min(6, t("passwordMin"))
      .required(t("passwordRequired")),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], t("passwordMismatch"))
      .required(t("confirmRequired")),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await signup(values.username, values.password);
      setStatus(t("signupSuccessRedirect"));
      setTimeout(() => navigate("/login"), 1000);
    } catch {
      setStatus(t("usernameExists"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-white">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow border">
        <h1 className="text-2xl font-semibold text-center text-[#d40511] mb-4">
          {t("createAccount")}
        </h1>

        <Formik
          initialValues={{ username: "", password: "", confirm: "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {status && (
                <p
                  className={`text-center text-sm ${
                    status.includes("success")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {status}
                </p>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  {t("username")}
                </label>
                <Field
                  name="username"
                  placeholder={t("usernamePlaceholder")}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d40511]"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  {t("password")}
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("passwordPlaceholder")}
                    className="w-full px-3 py-2 border border-gray-300 rounded pr-14 focus:outline-none focus:ring-2 focus:ring-[#d40511]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 text-sm text-[#d40511] hover:underline"
                  >
                    {showPassword ? t("hide") : t("show")}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  {t("confirmPassword")}
                </label>
                <div className="relative">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="confirm"
                    placeholder={t("confirmPasswordPlaceholder")}
                    className="w-full px-3 py-2 border border-gray-300 rounded pr-14 focus:outline-none focus:ring-2 focus:ring-[#d40511]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-2 top-2 text-sm text-[#d40511] hover:underline"
                  >
                    {showConfirm ? t("hide") : t("show")}
                  </button>
                </div>
                <ErrorMessage
                  name="confirm"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d40511] text-white py-2 rounded hover:bg-[#bb040f] transition disabled:opacity-50"
              >
                {isSubmitting ? t("signingUp") : t("signUp")}
              </button>

              <p className="text-sm text-center text-gray-600">
                {t("alreadyHaveAccount")}{" "}
                <Link to="/login" className="text-[#d40511] hover:underline">
                  {t("login")}
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
