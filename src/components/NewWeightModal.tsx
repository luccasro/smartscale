import React, { useState } from 'react';
import { calculateBmi, getStatus } from '../utils';
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { saveData } from 'utils/firebaseUtils';
import { status } from 'utils';
import { useToast } from 'providers/ToastProvider';

interface NewWeightModalProps {
  height: string;
  uid: string;
}

interface Result {
  score?: string;
  status?: string;
  color?: string;
  background?: string;
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export const NewWeightModal: React.FC<NewWeightModalProps> = ({
  uid,
  height,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  const classes = useStyles();

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleWeightChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setWeight(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!weight?.length) {
      showToast({ text: 'Please enter a weight!', type: 'error' });
      return;
    }

    const bmi = calculateBmi(parseFloat(weight), parseFloat(height));
    setIsLoading(true);
    try {
      const status = getStatus(parseFloat(bmi));
      setResult(status);
      await saveData(uid, bmi, parseInt(weight));
      showToast({ text: 'Data saved successfully!' });
    } catch (error) {
      console.error('Error saving data:', error);
      showToast({ text: 'Error saving data!', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className=" hover:bg-blue-200 rounded-lg hover:text-light-blue-800 flex items-center rounded-md bg-light-blue-100 text-light-blue-600 px-4 py-2 text-md"
      >
        <svg
          className="group-hover:text-light-blue-600 text-light-blue-500 mr-2"
          width="12"
          height="20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
          />
        </svg>
        New Weight
      </button>
      {isOpen && (
        <Dialog fullScreen open={isOpen} onClose={handleOpenModal}>
          <AppBar position="relative">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleOpenModal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                New Weight
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <div className="flex flex-col items-center px-4 py-4 m-auto">
              <TextField
                label="Your Weight(Kg)"
                type="number"
                className="mt-1 mb-3 p-1 w-2/4 m-16 "
                id="weight"
                value={weight}
                onChange={handleWeightChange}
              />
              <div className="mx-auto w-11/12 md:w-2/6 py-8 px-8 md:px-8">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  fullWidth
                >
                  Calculate & Save Results
                </Button>
              </div>
            </div>
            <div
              className={`border flex flex-col ${result?.background} justify-around items-center text-gray-700 h-56 w-96 rounded-lg pt-5 pb-9 mx-auto mt-24 shadow-md`}
            >
              <span className="text-xl">Your BMI</span>
              <span className={`${result?.color} text-7xl`}>
                {result?.score || '-'}
              </span>
              <span className={`${result?.color} text-3xl`}>
                {result?.status}
              </span>
            </div>
            <div className="md:w-4/12	sm:w-full m-auto mt-10 shadow-md rounded-lg p-4 text-center">
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-1/2">
                    <b>{status.underWeight}</b>
                    <b></b>
                  </div>
                  <div className="w-1/2">
                    <b>{'< 18.5'}</b>
                  </div>
                </div>
                <Divider />
                <div className="flex items-center mt-2 mb-2">
                  <div className="w-1/2 items-center">
                    <b>{status.normal}</b>
                  </div>
                  <div className="w-1/2">
                    <b>{'18.5 - 24.9'}</b>
                  </div>
                </div>
                <Divider />
                <div className="flex items-center mt-2 mb-2">
                  <div className="w-1/2">
                    <b>{status.overweight}</b>
                  </div>
                  <div className="w-1/2">
                    <b>{'25 - 29.9'}</b>
                  </div>
                </div>
                <Divider />
                <div className="flex items-center mt-2 mb-2">
                  <div className="w-1/2">
                    <b>{status.obesity1}</b>
                  </div>
                  <div className="w-1/2">
                    <b>{'30 - 34.9'}</b>
                  </div>
                </div>
                <Divider />
                <div className="flex items-center mt-2 mb-2">
                  <div className="w-1/2">
                    <b>{status.obesity2}</b>
                  </div>
                  <div className="w-1/2 items-center">
                    <b>{'35 - 39.9'}</b>
                  </div>
                </div>
                <Divider />
                <div className="flex items-center mt-2">
                  <div className="w-1/2">
                    <b>{status.obesity3}</b>
                  </div>
                  <div className="w-1/2">
                    <b>{'>= 40'}</b>
                  </div>
                </div>
              </div>
            </div>
          </List>
        </Dialog>
      )}
    </>
  );
};
