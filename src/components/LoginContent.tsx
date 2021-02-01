import React, { useState, useEffect } from 'react';
import Zoom from '@material-ui/core/Zoom';

interface LoginContentProps {
  children: React.ReactNode;
}

export const LoginContent: React.FC<LoginContentProps> = ({ children }) => {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 300);
  }, []);

  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-blue-500 i justify-around items-center hidden">
        <Zoom in={animation}>
          <div className="flex items-center flex-col xl:flex-row">
            <img src="images/login.svg" width="300px" />
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-6xl">SmartScale</h1>
              <p className="text-white text-xl mt-1">
                A weight management dashboard.
              </p>
            </div>
          </div>
        </Zoom>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <Zoom in={animation}>
          <form className="bg-white w-3/4">
            <div className="flex flex-col items-center mb-4 mt-6">
              {children}
            </div>
          </form>
        </Zoom>
      </div>
    </div>
  );
};
