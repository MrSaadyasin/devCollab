export default function getTimeAgoString(previousTime) {
  const currentTime = new Date();
  const timeDifference = Math.floor((currentTime - previousTime) / 1000); // Time difference in seconds
  if (timeDifference < 60) {
    return `${timeDifference}s`;
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60);
    return `${minutes}m${minutes > 1 ? "" : ""}`;
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600);
    return `${hours}h${hours > 1 ? "" : ""}`;
  } else {
    const days = Math.floor(timeDifference / 86400);
    return `${days}d${days > 1 ? "s" : ""}`;
  }
}
