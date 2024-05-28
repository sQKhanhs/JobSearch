import { createPinia, setActivePinia } from 'pinia'
import { useDegreesStore } from '@/stores/degrees'
import axios from 'axios'
import type { Mock } from 'vitest'
import { createDegree } from '../../utils/createDegree'

vi.mock('axios')
const axiosGetMock = axios.get as Mock
describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores all degrees that jobs may require', () => {
    const store = useDegreesStore()
    expect(store.degrees).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('fetchDegrees', () => {
    it('makes API request and stores received degrees', async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            degree: "Bachelor's"
          }
        ]
      })

      const store = useDegreesStore()
      await store.fetchDegrees()

      expect(store.degrees).toEqual([
        {
          id: 1,
          degree: "Bachelor's"
        }
      ])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('uniqueDegrees', () => {
    it('finds unique degrees from collection of degrees', () => {
      const store = useDegreesStore()
      store.degrees = [createDegree({ degree: "Master's" }), createDegree({ degree: "Bachelor's" })]

      const result = store.uniqueDegrees;

      expect(result).toEqual(["Master's", "Bachelor's"]);
    })
  })
})
