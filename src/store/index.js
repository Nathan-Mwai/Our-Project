import { create } from 'zustand'

export const useTokenStore = create((set) => ({
  token: 0,
  setToken(val){
    set(val)
  }
}))