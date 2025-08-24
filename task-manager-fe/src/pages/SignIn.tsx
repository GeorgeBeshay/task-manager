import {use, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast, Toaster} from 'react-hot-toast';
import {signInSchema} from "@/validationSchemas/signInSchema.ts";
import {signIn} from "@/services/auth.service.ts";
import AlreadySignedIn from "@/components/AlreadySignedIn.tsx";
import {setItemWithExpiry} from "@/utils/storage.ts";
import {AuthContext} from "@/context/AuthContext.tsx";

const SignIn = () => {
  // --------------------- Context ---------------------
  const authContext = use(AuthContext);

  // --------------------- States ---------------------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({email: '', password: ''});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  // --------------------- Functions ---------------------
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(() => ({ email: true, password: true }));
    if (!validateForm()) {
      toast.error("Sign In form has errors.");
      return;
    }

    // form is valid, proceed with submission logic
    setLoading(true);
    const result = await signIn({ email, password });
    setLoading(false);

    if (result.errors || !result.access_token ) {
      toast.error(result.message);
      if (result.errors) {
        toast.error(result.errors.join(', '));
      }
      return;
    }

    // Logged in successfully
    toast.success(result.message || 'Logged in successfully!');

    setItemWithExpiry('user', JSON.stringify(result.user));
    setItemWithExpiry('access_token', result.access_token);

    authContext.setUser(result.user);
    authContext.setAccessToken(result.access_token);

    void navigate('/dashboard');

  };

  // --------------------- Hooks ---------------------
  const validateForm = useCallback(() => {
    const formData = { email, password };
    const { error } = signInSchema.validate(formData, { abortEarly: false });

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

  }, [email, password]);

  useEffect(() => {
    validateForm();
  }, [validateForm])

  // --------------------- JSX ---------------------
  return (
    <div className="flex flex-col items-center">

      <Toaster position="top-right" />

      <div className="flex flex-col p-4 mb-8">
        <h1 className="text-3xl italic mb-6 -mt-30">
          <span className='font-bold'>Sch</span>edy
        </h1>
        <p className="text-lg mb-2">Welcome to Schedy, your personal task manager.</p>
      </div>

      <AlreadySignedIn />

      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="bg-neutral-900 p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>

        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
            className="w-full mb-1 p-2 border rounded"
          />
          {touched.email && errors.email && (
            <p className="text-left text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
            className="w-full mb-1 p-2 border rounded"
          />
          {touched.password && errors.password && (
            <p className="text-left text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
