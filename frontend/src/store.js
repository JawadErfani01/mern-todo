import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slices/todosApiSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    // Add the generated API slice reducer to the store
    [api.reducerPath]: api.reducer,
  },
  // Add the middleware from the API slice to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Export the store for usage in the application
export default store;
