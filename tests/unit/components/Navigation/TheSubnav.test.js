import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { describe, expect } from 'vitest'

describe('TheSubNav', () => {
  const renderTheSubNav = (routeName) => {
    render(TheSubnav, {
      global: {
        mocks: {
          $route: {
            name: routeName
          }
        },
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  describe('when user is on jobs page', () => {
    it('displays job count', () => {
      const routeName = 'JobResults'
      renderTheSubNav(routeName)

      const jobCount = screen.getByText('1000')
      expect(jobCount).toBeInTheDocument
    })
  })

  describe('when user is not on jobs page', () => {
    it('not display job count', () => {
      const routeName = 'Home'
      renderTheSubNav(routeName)

      const jobCount = screen.queryByText('1000')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
