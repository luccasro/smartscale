import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { auth, generateUserDocument } from 'utils/firebaseUtils';
import { LoginContent } from 'components/LoginContent';
import { LINKS, validateData } from 'utils';
import { useToast } from 'providers/ToastProvider';

interface RegisterData {
  email: string;
  password: string;
  displayName: string;
}

const initialState: RegisterData = {
  email: '',
  password: '',
  displayName: '',
};

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerUser = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password, displayName } = formData;
    const errors = validateData(email, password);

    if (errors) {
      showToast({ text: errors, type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await generateUserDocument(user, { displayName });
      navigate('/');
    } catch (error) {
      showToast({
        text: 'Error signing up with email and password',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
    setFormData(initialState);
  };

  return (
    <>
      <LoginContent>
        <h1 className="text-2xl mb-4">Sign Up</h1>
        <TextField
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          size="small"
          name="displayName"
          value={formData.displayName}
          id="displayName"
          onChange={handleChange}
        />
        <div className="my-5 w-full">
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            size="small"
            name="email"
            value={formData.email}
            id="email"
            onChange={handleChange}
          />
        </div>
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          size="small"
          name="password"
          value={formData.password}
          id="password"
          onChange={handleChange}
        />
        <div className="mt-4 w-full">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={registerUser}
            disabled={isLoading}
          >
            Sign up
          </Button>
        </div>
        <Link
          to={LINKS.LOGIN}
          className="text-blue-500 hover:text-blue-600 mt-4"
        >
          &larr; Back to login page
        </Link>
      </LoginContent>
    </>
  );
};
