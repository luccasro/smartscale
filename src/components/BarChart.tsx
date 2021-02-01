import React, { useState } from 'react';
import { getDate } from '../utils';
import { Bar } from '@reactchartjs/react-chart.js';
import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { DateFirebase } from 'types';

interface BarChartData {
  date: DateFirebase[];
  weight: string[];
  weightGoal?: string;
}

interface BarChartProps {
  data: BarChartData;
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { date, weight, weightGoal } = data;

  const labels = date.map((label) => getDate(label));

  const getMaximum = () => {
    const max = new Array(weight.length).fill(weightGoal);
    return max;
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const chartData = {
    labels,
    datasets: [
      {
        type: 'line',
        labels: 'teste',
        label: 'Weight goal',
        data: getMaximum(),
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        fill: false,
      },
      {
        type: 'bar',
        labels: [labels],
        label: 'Weight(Kg)',
        data: weight,
        backgroundColor: '#3f51b5',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  return (
    <>
      <div className="mt-10 md:w-3/4 m-auto">
        <div className="flex justify-end">
          <button
            onClick={handleOpenModal}
            className="flex justify-end hover:bg-indigo-200 rounded-lg hover:text-light-blue-800 group flex items-center rounded-md bg-light-blue-100 text-light-blue-600 text-sm font-medium px-4 py-2 text-lg"
          >
            <FullscreenIcon />
          </button>
        </div>
        <Bar data={chartData} options={options} />
      </div>
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
              <Typography variant="h6">Fullscreen Chart</Typography>
            </Toolbar>
          </AppBar>
          <div className="md:w-11/12 sm:w-full md:m-auto">
            <Bar data={chartData} options={options} />
          </div>
        </Dialog>
      )}
    </>
  );
};
