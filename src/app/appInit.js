export async function appInit(store, api)
{
  store.setState((state) =>
    {
      return{
        ...state,
        ui: { ...state.ui, status: 'LOADING', errorMessage: null },
      };
    }
  );

  try {
    const examData = await api.fetchAnimeListData();

    store.setState((state) =>
      {
        return {
          ...state,
          exams: examData.exams,
          registrations: examData.registrations,
          ui: {
            ...state.ui,
            status: 'READY', errorMessage: null
          },
        };
      }
    );
  } catch (error) {
    store.setState((state) =>
      {
        return {
          ...state,
          ui: {
            status: 'ERROR',
            errorMessage: error.message,
          },
        };
      }
    );
  }
}
