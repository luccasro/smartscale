import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { auth } from 'utils/firebaseUtils';
import { LoginContent } from 'components';
import { TextField } from '@material-ui/core';
import { LINKS, validateEmail } from 'utils';
import { useToast } from 'providers/ToastProvider';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setEmail(value);
  };

  const resetUserPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      showToast({ text: 'Invalid email address', type: 'error' });
      return;
    }
    setIsLoading(true);
    try {
      await auth.sendPasswordResetEmail(email);
      showToast({ text: 'An email has been sent to you!' });
    } catch (error) {
      showToast({ text: 'Error reseting password', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginContent>
        <h1 className="text-2xl mb-4">Forgot Password</h1>
        <TextField
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          size="small"
          name="password"
          value={email}
          onChange={onChangeEmail}
        />
        <div className="mt-4 w-full">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={resetUserPassword}
            disabled={isLoading}
          >
            Reset Password
          </Button>
        </div>
        <Link
          to={LINKS.LOGIN}
          className="text-blue-500 hover:text-blue-600 mt-4 w-full text-center"
        >
          &larr; Back to login page
        </Link>
      </LoginContent>
    </>
  );
};
