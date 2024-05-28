import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue'
import { describe, expect, vi } from 'vitest'
import { useRouter } from 'vue-router'
import type { Mock } from 'vitest'
import { useUserStore } from '@/stores/user'

vi.mock('vue-router')
const useRouterMock = useRouter as Mock
describe('JobFiltersSidebarCheckboxGroup', () => {
  interface JobFiltersSidebarCheckboxGroupProps {
    header: string
    uniqueValues: Set<string>
    action: Mock
  }

  const createProps = (
    props: Partial<JobFiltersSidebarCheckboxGroupProps> = {}
  ): JobFiltersSidebarCheckboxGroupProps => ({
    header: 'Some header',
    uniqueValues: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props
  })

  const renderJobFiltersSidebarJobTypes = (props: JobFiltersSidebarCheckboxGroupProps) => {
    const pinia = createTestingPinia({
      stubActions: false
    })
    const userStore = useUserStore()

    render(JobFiltersSidebarCheckboxGroup, {
      props: {
        ...props
      },
      global: {
        plugins: [pinia],
      }
    })

    return { userStore }
  }

  it('renders unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['Full-time', 'Part time'])
    })
    renderJobFiltersSidebarJobTypes(props)

    const button = screen.getByRole('button', { name: /job types/i })
    await userEvent.click(button)

    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListItems.map((node) => node.textContent)
    expect(jobTypes).toEqual(['Full-time', 'Part time'])
  })

  describe('when user clicks checkbox', () => {
    it('communicattes that user has selected checkbox for value', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['Full-time', 'Part time']),
        action
      })
      renderJobFiltersSidebarJobTypes(props)

      const button = screen.getByRole('button', { name: /job types/i })
      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full-time/i
      })
      await userEvent.click(fullTimeCheckbox)

      expect(action).toHaveBeenCalledWith(['Full-time'])
    }),
      it('navigates user to job results page to see new list of filtered jobs', async () => {
        const push = vi.fn()
        useRouterMock.mockReturnValue({ push })
        const props = createProps({
          header: 'Job Types',
          uniqueValues: new Set(['Full-time'])
        })
        renderJobFiltersSidebarJobTypes(props)

        const button = screen.getByRole('button', { name: /job types/i })
        await userEvent.click(button)

        const fullTimeCheckbox = screen.getByRole('checkbox', {
          name: /full-time/i
        })
        await userEvent.click(fullTimeCheckbox)

        expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
      })
  })

  describe("when user clear filters", () => {
    it("unchecks any checked checkboxes", async () => {
        useRouterMock.mockReturnValue({ push: vi.fn() })
        const props = createProps({
          header: 'Job Types',
          uniqueValues: new Set(['Full-time'])
        })
        const {userStore} = renderJobFiltersSidebarJobTypes(props)

        const button = screen.getByRole('button', { name: /job types/i })
        await userEvent.click(button)

        const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>('checkbox', {
          name: /full-time/i
        })
        await userEvent.click(fullTimeCheckboxBeforeAction)

        expect(fullTimeCheckboxBeforeAction.checked).toBe(true);

        userStore.clearJobFilters();
        const fullTimeCheckboxAfterAction = await screen.findByRole<HTMLInputElement>('checkbox', {
          name: /full-time/i
        })

        expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    })
  })
})
