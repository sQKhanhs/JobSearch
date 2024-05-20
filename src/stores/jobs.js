import { defineStore } from 'pinia'
import { useUserStore } from './user'
import getJobs from '@/api/getJobs'

export const FETCH_JOBS = 'FETCH_JOBS'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs()
      this.jobs = jobs
    }
  },
  getters: {
    UNIQUE_ORGANIZATIONS(state) {
      const uniqueOrganizations = new Set()
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization))
      return uniqueOrganizations
    },
    UNIQUE_JOB_TYPES(state) {
      const uniqueJobTypes = new Set()
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType))
      return uniqueJobTypes
    },
    includeJobByOrganization: () => (job) => {
      const userStore = useUserStore();
      if(userStore.selectedOrganizations.length == 0){
        return true;
      }
      return userStore.selectedOrganizations.includes(job.organization)
    },
    includeJobByJobType: () => (job) => {
      const userStore = useUserStore();
      if(userStore.selectedJobTypes.length == 0){
        return true;
      }
      return userStore.selectedJobTypes.includes(job.jobType)
    },
    filteredJobs(state) {
      return state.jobs
        .filter((job) => {
          return this.includeJobByOrganization(job)
        })
        .filter((job) => {
          return this.includeJobByJobType(job)
        })
    }
  }
})
