import React, { useContext, useEffect } from 'react';
import { UserContext } from '../providers/UserProvider';
import { CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
  const { uid, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPage = uid ? '/dashboard' : '/login';

    if (!isLoading) {
      navigate(redirectPage);
    }
  }, [uid, isLoading, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress />
    </div>
  );
};
