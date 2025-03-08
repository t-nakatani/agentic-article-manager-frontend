import { configureStore } from "@reduxjs/toolkit"
import articleFiltersReducer from "./features/articleFilters/articleFiltersSlice"
import articlesReducer from "./features/articles/articlesSlice"
import themesReducer from "./features/themes/themesSlice"
import authReducer from "./features/auth/authSlice"

export const store = configureStore({
  reducer: {
    articleFilters: articleFiltersReducer,
    articles: articlesReducer,
    themes: themesReducer,
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

