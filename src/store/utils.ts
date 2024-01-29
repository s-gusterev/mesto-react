export const setError = (
  state: { status: any; error: any },
  action: { payload: any }
) => {
  state.status = "rejected";
  state.error = action.payload;
};

export const setLoading = (state: { status: any; error: any }) => {
  state.status = "pending";
  state.error = null;
};

export const setSuccess = (state: { status: any; error: any }) => {
  state.status = "resolved";
  state.error = null;
};
