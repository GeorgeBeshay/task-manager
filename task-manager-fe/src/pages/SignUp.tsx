import {use, useCallback, useEffect, useState} from "react";
import {signupSchema} from "@/validationSchemas/signupSchema.ts";
import {toast} from "react-hot-toast";
import {signUp} from "@/services/auth.service.ts";
import {useNavigate} from "react-router-dom";
import {setItemWithExpiry} from "@/utils/storage.ts";
import {AuthContext} from "@/context/AuthContext.tsx";
import AlreadySignedIn from "@/components/AlreadySignedIn.tsx";

function SignUp() {
  // --------------------- Context ---------------------
  const authContext = use(AuthContext);

  // --------------------- States ---------------------
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // --------------------- Functions ---------------------
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(() => ({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    }))

    if (!validateForm()) {
      toast.error("Sign Up form has errors.");
      return;
    }

    // form is valid, proceed with submission logic
    setLoading(true);
    const result = await signUp({ fullName, email, password, confirmPassword });
    setLoading(false);

    if (result.errors || !result.access_token ) {
      toast.error(result.message);
      if (result.errors) {
        toast.error(result.errors.join(', '));
      }
      return;
    }

    // Signed up successfully
    toast.success(result.message || 'Account created successfully!');

    setItemWithExpiry('user', JSON.stringify(result.user));
    setItemWithExpiry('access_token', result.access_token);

    authContext.setUser(result.user);
    authContext.setAccessToken(result.access_token);

    void navigate('/dashboard');
  };

  // --------------------- Hooks ---------------------
  const validateForm = useCallback(() => {
    const formData = { fullName, email, password, confirmPassword };
    const { error } = signupSchema.validate(formData, { abortEarly: false });

    if (error) {
      const validationErrors: Record<string, string> = {};
      error.details.forEach((detail) => {
        if (detail.path[0]) {
          validationErrors[detail.path[0].toString()] = detail.message;
        }
      });

      setErrors(validationErrors);
      return false;
    }

    setErrors({});
    return true

  }, [fullName, email, password, confirmPassword]);

  useEffect(() => {
    validateForm();
  }, [validateForm])

  // --------------------- JSX ---------------------
  return (
    <div className="flex flex-col items-center">

      <div className="flex flex-col p-4 mb-8">
        <h1 className="text-3xl italic mb-6">
          <span className='font-bold'>Sch</span>edy
        </h1>
        <p className="text-lg mb-2">Welcome to Schedy, your personal task manager.</p>
      </div>

      <AlreadySignedIn />

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="bg-neutral-900 p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
            className="w-full mb-1 p-2 border rounded"
          />
          {touched.fullName && errors.fullName && <p className="text-left text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            className="w-full mb-1 p-2 border rounded"
          />
          {touched.email && errors.email && <p className="text-left text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            className="w-full mb-1 p-2 border rounded"
          />
          {touched.password && errors.password && <p className="text-left text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
            className="w-full mb-1 p-2 border rounded"
          />
          {touched.confirmPassword && errors.confirmPassword && <p className="text-left text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
