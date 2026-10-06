import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'

// A factory gives each test its own store, without sharing a session.
export function createAppStore() {
  return configureStore({ reducer: { auth: authReducer } })
}

export const store = createAppStore()
export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
