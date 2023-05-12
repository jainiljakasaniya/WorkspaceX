const cron = require('node-cron');
const { cronJobTime } = require('../constant/index');
const wishListService = require('../component/wishlist/wishlist.service');

const notify = async () => {
  try {
    console.info('Notification Job');
    await wishListService.sendNotification();
  } catch (error) {
    console.info(error);
  }
};

const cleanupNotification = async () => {
  try {
    console.info('Cleanup Job');
    await wishListService.cleanupNotification();
  } catch (error) {
    console.info(error);
  }
};

const createCronJob = (tm, task) => {
  const job = cron.schedule(tm, task, {
    scheduled: true,
    timezone: 'UTC'
  });
  return job;
};

const scheduleJob = (tm, task) => {
  const job = createCronJob(tm, task);
  return job;
};

const cronJob = () => {
  const job1 = scheduleJob(cronJobTime.notificationTime, notify);
  const job2 = scheduleJob(cronJobTime.cleanupTime, cleanupNotification);
  job1.start();
  job2.start();
};

module.exports = cronJob;
