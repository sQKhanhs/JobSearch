import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import JobFiltersSideBarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSideBarSkills.vue";
import { useUserStore } from "@/stores/user";

describe("JobFiltersSidebarSkills", () => {
    const renderJobFiltersSidebarSkills = () => {
        const pinia = createTestingPinia();
        const userStore = useUserStore();

        render(JobFiltersSideBarSkills, {
            global: {
                plugins: [pinia]
            }
        })

        return {userStore}
    }

    it("populates search input from store", async () => {
        const {userStore} = renderJobFiltersSidebarSkills();
        userStore.skillsSearchTerm = "Programmer";
        const input = await screen.findByRole<HTMLInputElement>("textbox");
        expect(input.value).toBe("Programmer");
    })

    it("write user input to store", async () => {
        const {userStore} = renderJobFiltersSidebarSkills();
        userStore.skillsSearchTerm = "";
        const input = screen.getByRole<HTMLInputElement>("textbox");
        await userEvent.type(input, "V");
        await userEvent.click(document.body);

        expect(userStore.updateSkillsSearchTerm).toHaveBeenCalledWith("V");
    })

    it("removes whitespace from user", async () => {
        const {userStore} = renderJobFiltersSidebarSkills();
        userStore.skillsSearchTerm = "";
        const input = screen.getByRole<HTMLInputElement>("textbox");
        await userEvent.type(input, "   Vue Developer   ");
        await userEvent.click(document.body);

        expect(userStore.updateSkillsSearchTerm).toHaveBeenCalledWith("Vue Developer");
    })
})