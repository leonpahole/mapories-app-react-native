import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const fromNowText = (date: Date) => {
  const text = dayjs(date).fromNow();
  if (text === 'in a few seconds') {
    return 'now';
  }

  return text;
};

export const dateFormat = 'DD.MM.YYYY';

export const formatDate = (date: Date) => {
  if (!date) {
    return '';
  }

  return dayjs(date).format(dateFormat);
};
