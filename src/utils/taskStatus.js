import dayjs from "dayjs";

/**
 * deadline day not over yet     -> In Progress
 * deadline passed, status DONE  -> Achieved
 * deadline passed, status TODO  -> Failed
 */
export const getDisplayStatus = (task) => {
  const deadlineEnd = dayjs(task.deadline).endOf("day");

  if (!dayjs().isAfter(deadlineEnd)) return "In Progress";
  return task.status === "DONE" ? "Achieved" : "Failed";
};

export const formatDate = (date) => dayjs(date).format("DD/MM/YYYY");