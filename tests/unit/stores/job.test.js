import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { describe, expect } from 'vitest'

vi.mock('axios')

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
      axios.get.mockResolvedValue({ data: ['Job 1', 'Job 2'] })
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
        {
          organization: 'Google'
        },
        {
          organization: 'Amazon'
        },
        {
          organization: 'Google'
        }
      ]

      const result = store.UNIQUE_ORGANIZATIONS
      expect(result).toEqual(new Set(['Google', 'Amazon']))
    })
  })

  describe('uniqueJobTypes', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        {
          jobType: 'Full-time'
        },
        {
          jobType: 'Temporary'
        },
        {
          jobType: 'Full-time'
        }
      ]

      const result = store.UNIQUE_JOB_TYPES
      expect(result).toEqual(new Set(['Full-time', 'Temporary']))
    })
  })

  describe('includeJobByOrganization', () => {
    describe('when the user has not selected any organizations', () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const jobsStore = useJobsStore();
        const job = {organization: "Google"};

        const result = jobsStore.includeJobByOrganization(job);

        expect(result).toBe(true);
      })
    })

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google", "Microsoft"];
      const jobsStore = useJobsStore();
      const job = {organization: "Google"};

      const result = jobsStore.includeJobByOrganization(job);

      expect(result).toBe(true);
    })
  })

  describe('includeJobByJobType', () => {
    describe('when the user has not selected any job types', () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const jobsStore = useJobsStore();
        const job = {jobType: "Full-time"};

        const result = jobsStore.includeJobByJobType(job);

        expect(result).toBe(true);
      })
    })

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time", "Part-time"];
      const jobsStore = useJobsStore();
      const job = {jobType: "Part-time"};

      const result = jobsStore.includeJobByJobType(job);

      expect(result).toBe(true);
    })
  })

})
