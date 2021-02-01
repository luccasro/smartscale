import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import { avgWeight, avgBmi, weightLoss, lowerWeight, LINKS } from '../utils';
import {
  BarChart,
  DashboardCard,
  Header,
  NewHeightModal,
  NewWeightGoalModal,
  NewWeightModal,
  Table,
} from 'components';
import { CircularProgress, Grow } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user, uid } = useContext(UserContext);
  const [animation, setAnimation] = useState(false);
  const navigate = useNavigate();

  const {
    photoURL,
    displayName,
    email,
    data = [],
    height,
    weightGoal,
  } = user || {};
  const weightList = data?.map((item) => item.weight) || [];
  const bmiList = data?.map((item) => item.bmi) || [];
  const dateList = data?.map((item) => item.date) || [];

  useEffect(() => {
    if (!uid) {
      navigate(LINKS.HOME);
    }
  }, [uid, history]);

  setTimeout(function () {
    setAnimation(true);
  }, 500);

  if (!uid || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="mx-auto w-full md:w-5/6 lg:w-3/4 xl:w-2/4 py-8 px-4 md:px-8">
        <Grow in={animation}>
          <div>
            <img
              src={`${photoURL}`}
              alt="User Avatar"
              className="rounded-full shadow m-auto w-52"
              onError={({ currentTarget }) => {
                currentTarget.src = 'images/avatar.jpg';
              }}
            />
            <div className="mt-2 mx-auto text-center">
              <h1 className="text-2xl pb-1 text-indigo-900 font-bold">
                {displayName}
              </h1>
              <p>{email}</p>
              <NewHeightModal uid={uid} currentHeight={height} />
            </div>
            <div className=" mx-auto"></div>
          </div>
        </Grow>
        <Grow in={animation}>
          <div className="flex items-center text-gray-800 my-10">
            <div className="p-4 w-full shadow-md rounded">
              <div className="md:flex gap-4 justify-center grid sm:grid-cols-12">
                <DashboardCard
                  title="Weight Avg"
                  value={avgWeight(weightList)}
                  icon={<BarChartIcon />}
                />
                <DashboardCard
                  title="BMI Avg"
                  value={avgBmi(bmiList)}
                  icon={<GraphicEqIcon />}
                  colors="bg-green-100 text-green-500"
                />
                <DashboardCard
                  title="Lost weight"
                  value={weightLoss(weightList)}
                  icon={<TrendingDownIcon />}
                  colors="bg-orange-100 text-orange-500"
                />
                <DashboardCard
                  title="Lower weight"
                  value={lowerWeight(weightList)}
                  icon={<ArrowDownwardIcon />}
                  colors="bg-red-100 text-red-500"
                />
              </div>
            </div>
          </div>
        </Grow>
        <Grow in={animation}>
          <div>
            <div className="">
              <div className="bg-white rounded shadow-lg w-full">
                <section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
                  <header>
                    <h2 className="text-lg mt-1 font-bold">Dashboard</h2>
                    {height && (
                      <div className="flex justify-end">
                        <NewWeightModal uid={uid} height={height} />
                      </div>
                    )}
                  </header>
                  <BarChart
                    data={{
                      date: dateList,
                      weight: weightList,
                      weightGoal,
                    }}
                  />
                  <div className="flex justify-end mt-5">
                    <NewWeightGoalModal uid={uid} />
                  </div>
                  <Table data={data} uid={uid} />
                </section>
              </div>
            </div>
          </div>
        </Grow>
      </div>
    </div>
  );
};
