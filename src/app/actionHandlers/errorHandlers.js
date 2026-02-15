export function createErrorHandlers(dispatch) {
  return {
    onContinue: () =>
      dispatch({
        type: "RECOVER_FROM_ERROR",
      }),
  };
}
