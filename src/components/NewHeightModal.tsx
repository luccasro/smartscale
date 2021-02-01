import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { saveHeight } from 'utils/firebaseUtils';
import { useToast } from 'providers/ToastProvider';

interface NewHeightModalProps {
  uid: string;
  currentHeight?: string;
}

export const NewHeightModal: React.FC<NewHeightModalProps> = ({
  uid,
  currentHeight,
}) => {
  const [isOpen, setIsOpen] = useState(!currentHeight?.length);
  const [height, setHeight] = useState<string>(currentHeight ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleHeightChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setHeight(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!height?.length) {
      showToast({ text: 'Please enter a height!', type: 'error' });
      return;
    }
    setIsLoading(true);
    const heightValue = parseInt(height.replace(/[^0-9]/g, ''));
    try {
      await saveHeight(uid, heightValue.toString());
      showToast({ text: 'Height updated successfully!' });
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
      {currentHeight && (
        <h3 className="italic">
          Your Height: {parseInt(currentHeight) / 100}m{' '}
          <IconButton
            aria-label="delete"
            onClick={handleOpenModal}
            size="small"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </h3>
      )}
      <Dialog open={isOpen} aria-labelledby="BMI Height">
        <DialogTitle id="form-dialog-title">Height</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to SmartScale Dashboard, set your height bellow:
          </DialogContentText>
          <TextField
            type="number"
            autoFocus
            margin="dense"
            name="height"
            value={height}
            label="Height(cm)"
            onChange={handleHeightChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {currentHeight && (
            <Button onClick={handleOpenModal} color="secondary">
              Cancel
            </Button>
          )}
          <Button onClick={handleSubmit} color="primary" disabled={isLoading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
