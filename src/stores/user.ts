import { defineStore } from 'pinia'
import { ref } from 'vue'

// export interface UserState {
//   isLoggedIn: boolean
//   selectedOrganizations: string[]
//   selectedJobTypes: string[]
//   selectedDegrees: string[]
// }

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const skillsSearchTerm = ref("")
  const locationSearch = ref("")

  const loginUser = () => {
    isLoggedIn.value = true
  }

  const addSelectedOrganizations = (organizations: string[]) => {
    selectedOrganizations.value = organizations
  }

  const addSelectedJobTypes = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }

  const addSelectedDegrees = (degrees: string[]) => {
    selectedDegrees.value = degrees
  }

  const updateSkillsSearchTerm = (term: string) => {
    skillsSearchTerm.value = term
  }

  const updateLocationSearch = (location: string) => {
    locationSearch.value = location;
  }

  const clearJobFilters = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganizations.value = [];
    skillsSearchTerm.value = "";
    locationSearch.value = "";
  }

  return {
    isLoggedIn,
    selectedDegrees,
    selectedJobTypes,
    selectedOrganizations,
    skillsSearchTerm,
    locationSearch,
    clearJobFilters,
    loginUser,
    addSelectedDegrees,
    addSelectedJobTypes,
    addSelectedOrganizations,
    updateSkillsSearchTerm,
    updateLocationSearch
  }
})

// export const useUserStore = defineStore('user', {
//   state: (): UserState => ({
//     isLoggedIn: false,
//     selectedOrganizations: [],
//     selectedJobTypes: [],
//     selectedDegrees: []
//   }),
//   actions: {
//     loginUser() {
//       this.isLoggedIn = true
//     },
//     addSelectedOrganizations(organizations: string[]) {
//       this.selectedOrganizations = organizations
//     },
//     addSelectedJobTypes(jobTypes: string[]) {
//       this.selectedJobTypes = jobTypes
//     },
//     addSelectedDegrees(degrees: string[]) {
//       this.selectedDegrees = degrees
//     },
//     clearJobFilters() {
//       this.selectedOrganizations = []
//       this.selectedJobTypes = []
//       this.selectedDegrees = []
//     }
//   }
// })
