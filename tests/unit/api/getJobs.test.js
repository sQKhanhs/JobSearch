import axios from "axios";
import { describe, vi } from "vitest";

import getJobs from "@/api/getJobs"
vi.mock("axios")

describe("getJobs", () => {
    it("fetches job that candidates can apply to", async () => {
        await getJobs();
        expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/jobs")
    })
})