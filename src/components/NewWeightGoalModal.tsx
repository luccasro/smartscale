import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { saveWeightGoal } from 'utils/firebaseUtils';
import { useToast } from 'providers/ToastProvider';

interface NewWeightGoalModalProps {
  uid: string;
}

export const NewWeightGoalModal: React.FC<NewWeightGoalModalProps> = ({
  uid,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weightGoal, setWeightGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleWeightGoalChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setWeightGoal(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!weightGoal?.length) {
      showToast({ text: 'Please enter a weight goal!', type: 'error' });
    }
    setIsLoading(true);
    try {
      await saveWeightGoal(uid, parseInt(weightGoal));
      showToast({ text: 'Weight goal updated successfully!' });
      handleOpenModal();
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
        className="hover:bg-green-200 rounded-lg hover:text-light-blue-800 flex items-center rounded-md bg-light-blue-100 text-light-blue-600 px-4 py-2 text-md"
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
        New Weight goal
      </button>
      <Dialog open={isOpen} aria-labelledby="Weight Goal">
        <DialogTitle id="form-dialog-title">Weight goal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you have any weight goals to reach? Set your goal below
          </DialogContentText>
          <TextField
            type="number"
            autoFocus
            margin="dense"
            name="weightGoal"
            value={weightGoal}
            label="Weight goal(Kg)"
            onChange={handleWeightGoalChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={isLoading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
