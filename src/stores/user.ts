import { defineStore } from 'pinia'

export interface UserState {
  isLoggedIn: boolean
  selectedOrganizations: string[]
  selectedJobTypes: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: []
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true
    },
    addSelectedOrganizations(organizations: string[]) {
      this.selectedOrganizations = organizations
    },
    addSelectedJobTypes(jobTypes: string[]) {
      this.selectedJobTypes = jobTypes
    }
  }
})
