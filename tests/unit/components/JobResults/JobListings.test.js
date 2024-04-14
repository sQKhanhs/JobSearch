import { render, screen } from "@testing-library/vue";
import axios from "axios";
import JobListings from "@/components/JobResults/JobListings.vue"
import { expect } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";

vi.mock("axios");

describe("JobListings", () => {
    const createRoute = (queryParams = {}) => ({
      query: {
        page: '5',
        ...queryParams
      }
    })

    const renderJobListings = ($route) => {
      render(JobListings, {
        global: {
          stubs: {
            RouterLink: RouterLinkStub
          },
          mocks: {
            $route: $route
          }
        }
      })
    }

    it("fetches jobs", () => {
        axios.get.mockResolvedValue({data: []});
        const $route = createRoute();

        renderJobListings($route)
       
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/jobs");
    })

    it("displays maximum 10 jobs", async () => {
        const queryParams = {page: "1"}
        const $route = createRoute(queryParams)
        axios.get.mockResolvedValue({ data: Array(15).fill({}) });
        
        renderJobListings($route)

        const jobListings = await screen.findAllByRole("listitem");
        expect(jobListings).toHaveLength(10);
    })
})