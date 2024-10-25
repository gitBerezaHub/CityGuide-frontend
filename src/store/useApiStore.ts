import { defineStore } from 'pinia'
import { Place } from '@/types/types'

export const useApiStore = defineStore('api', {
  state: () => {
    return {
      places: [] as Place[]
    }
  }
})
