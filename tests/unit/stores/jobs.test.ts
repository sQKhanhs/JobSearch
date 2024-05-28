import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

import type { Mock } from 'vitest'
import { createJob } from '../../utils/createJob'
import type { Job } from '@/api/types'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores job listings', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('FETCH_JOBS', () => {
    it('makes API request and stores received jobs', async () => {
      axiosGetMock.mockResolvedValue({ data: ['Job 1', 'Job 2'] })
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['Job 1', 'Job 2'])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ organization: 'Google' }),
        createJob({ organization: 'Amazon' }),
        createJob({ organization: 'Google' })
      ]

      const result = store.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(['Google', 'Amazon']))
    })
  })

  describe('uniqueJobTypes', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Temporary' }),
        createJob({ jobType: 'Full-time' })
      ] as Job[]

      const result = store.UNIQUE_JOB_TYPES
      expect(result).toEqual(new Set(['Full-time', 'Temporary']))
    })
  })

  describe('includeJobByOrganization', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const jobsStore = useJobsStore()
        const job = createJob({ organization: 'Google' })

        const result = jobsStore.includeJobByOrganization(job)

        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Microsoft']
      const jobsStore = useJobsStore()
      const job = createJob({ organization: 'Google' })

      const result = jobsStore.includeJobByOrganization(job)

      expect(result).toBe(true)
    })
  })

  describe('includeJobByJobType', () => {
    describe('when the user has not selected any job types', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []
        const jobsStore = useJobsStore()
        const job = createJob({ jobType: 'Full-time' })

        const result = jobsStore.includeJobByJobType(job)

        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-time', 'Part-time']
      const jobsStore = useJobsStore()
      const job = createJob({ jobType: 'Part-time' })

      const result = jobsStore.includeJobByJobType(job)

      expect(result).toBe(true)
    })
  })

  describe('includeJobByDegree', () => {
    describe('when the user has not selected any degrees', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = []
        const jobsStore = useJobsStore()
        const job = createJob()

        const result = jobsStore.includeJobByDegree(job)

        expect(result).toBe(true)
      })
    })

    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore()
      userStore.selectedDegrees = ["Master's"]
      const jobsStore = useJobsStore()
      const job = createJob({ degree: "Master's" })

      const result = jobsStore.includeJobByDegree(job)

      expect(result).toBe(true)
    })
  })

  describe('includeJobBySkill', () => {
    it("identifies if job is job matches user's skill", () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = "Vue"
      const jobsStore = useJobsStore()
      const job = createJob({ title: "Vue Developer"})
      
      const result = jobsStore.includeJobBySkill(job);

      expect(result).toBe(true)
    })

    it("handles inconsistent character casing", () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = "vuE"
      const jobsStore = useJobsStore()
      const job = createJob({ title: "Vue Developer"})
      
      const result = jobsStore.includeJobBySkill(job);

      expect(result).toBe(true)
    })

    describe("when the user has not entered any skill", () => {
      it("includes job", () => {
        const userStore = useUserStore()
        userStore.skillsSearchTerm = ""
        const jobsStore = useJobsStore()
        const job = createJob({ title: "Vue Developer"})
        
        const result = jobsStore.includeJobBySkill(job);
  
        expect(result).toBe(true)
      })
    })
  })
  
})
