const getPercentage = (total: number, percentage: number): number => {
  return total > 0
    ? Math.max(0, Math.min(100, ((total - percentage) / total) * 100))
    : 0;
};

export default getPercentage;
