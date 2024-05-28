import { defineStore } from 'pinia'
import { useUserStore } from './user'
import type { Job } from '@/api/types'
import getJobs from '@/api/getJobs'

export const FETCH_JOBS = 'FETCH_JOBS'

export interface JobsState {
  jobs: Job[]
}

export const useJobsStore = defineStore('jobs', {
  state: (): JobsState => ({
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
      const uniqueOrganizations = new Set<string>()
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization))
      return uniqueOrganizations
    },
    UNIQUE_JOB_TYPES(state) {
      const uniqueJobTypes = new Set<string>()
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType))
      return uniqueJobTypes
    },
    includeJobByOrganization: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedOrganizations.length == 0) {
        return true
      }
      return userStore.selectedOrganizations.includes(job.organization)
    },
    includeJobByJobType: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedJobTypes.length == 0) {
        return true
      }
      return userStore.selectedJobTypes.includes(job.jobType)
    },
    includeJobByDegree: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedDegrees.length == 0) {
        return true
      }
      return userStore.selectedDegrees.includes(job.degree)
    },
    includeJobBySkill: () => (job: Job) => {
      const userStore = useUserStore()
      return job.title.toLowerCase().includes(userStore.skillsSearchTerm.toLowerCase())
    },
    includeJobByLocation: () => (job: Job) => {
      const userStore = useUserStore()
      let noMatch = true;
      job.locations.forEach(location => {
        if(location.toLowerCase().includes(userStore.locationSearch.toLowerCase())){
          noMatch = false;
        }
      });
      if(noMatch){
        return false;
      } else {
        return true;
      }
    },
    filteredJobs(state): Job[] {
      return state.jobs
        .filter((job) => {
          return this.includeJobByOrganization(job)
        })
        .filter((job) => {
          return this.includeJobByJobType(job)
        })
        .filter((job) => {
          return this.includeJobByDegree(job)
        })
        .filter((job) => {
          return this.includeJobBySkill(job)
        })
        .filter((job) => {
          return this.includeJobByLocation(job)
        })
    }
  }
})
