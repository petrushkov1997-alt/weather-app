export const reportUnknownError = (error: unknown) => {
  // In a real app, this would forward logs to a centralized service (e.g. Sentry or Datadog).
  console.error(error);
};
