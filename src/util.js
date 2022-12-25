import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
}

export const EVENTS_ACTION = {
  PUSH: "push",
  UPDATE: "update",
  DELETE: "delete",
  INITIALIZE: "initialise",
};

export const labelsClasses = [
  {
    id: "0927118b-72c3-4022-93e7-7c1b6dda54a5",
    title: "Work",
    color: "indigo",
  },
  {
    id: "8a5a2eed-b76e-4b77-a7bd-b5e4e1b98517",
    title: "Meeting",
    color: "gray",
  },
  {
    id: "73eb5526-2130-4dd4-ad60-e9488e67521e",
    title: "Event",
    color: "green",
  },
  {
    id: "e817d7c9-c03d-4a2b-a1fe-da2f4f003713",
    title: "Record",
    color: "blue",
  },
  {
    id: "34c74a22-d29a-445b-8ced-26bc32e980d2",
    title: "Important",
    color: "red",
  },
  {
    id: "c6f3c426-71bf-437a-8fde-bae87964857a",
    title: "Others",
    color: "purple",
  },
];

export function getLableClass(labelId) {
  return labelsClasses.find((lbl) => lbl.id === labelId);
}
