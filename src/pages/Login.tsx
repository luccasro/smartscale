import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'providers/UserProvider';
import { Button, InputAdornment, Link, TextField } from '@material-ui/core';
import { auth, loginWithGoogle } from 'utils/firebaseUtils';
import { LoginContent } from 'components/LoginContent';
import { LINKS } from 'utils';
import { useToast } from 'providers/ToastProvider';

interface LoginData {
  email: string;
  password: string;
}

const initialState: LoginData = {
  email: '',
  password: '',
};

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>(initialState);
  const { showToast } = useToast();

  const navigate = useNavigate();
  const { uid } = useContext(UserContext);

  useEffect(() => {
    if (uid) {
      navigate('/dashboard');
    }
  }, [uid, history]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const loginUser = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      showToast({ text: 'Incorrect email or password!', type: 'error' });
    }
  };

  const signInWithGoogle = (event: React.FormEvent) => {
    event.preventDefault();
    loginWithGoogle();
  };

  return (
    <>
      <LoginContent>
        <h1 className="text-2xl mb-4">Sign In</h1>
        <div className="flex items-center mb-4 mt-6 w-full">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            value={formData.email}
            size="small"
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex items-center w-full">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            size="small"
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="mt-4 mb-2 w-full">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={loginUser}
          >
            Login
          </Button>
        </div>
        <hr className="my-6 border-gray-300 w-full" />
        <button
          onClick={signInWithGoogle}
          className="w-full group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
        >
          <div className="relative flex items-center space-x-4 justify-center">
            <img
              src="images/google.svg"
              className="absolute left-0 w-5"
              alt="google logo"
            />
            <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
              Continue with Google
            </span>
          </div>
        </button>
        <p className="text-center my-3">
          {"Don't have an account? "}
          <Link
            href={LINKS.REGISTER}
            className="text-blue-500 hover:text-blue-600"
          >
            Click here
          </Link>
          <br />
          <Link
            href={LINKS.FORGOT_PASSWORD}
            className="text-blue-500 hover:text-blue-600"
          >
            Forgot password?
          </Link>
        </p>
      </LoginContent>
    </>
  );
};
