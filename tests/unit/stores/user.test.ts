import { useUserStore } from "@/stores/user";
import { beforeEach, describe, expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";

describe("state", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
   
    it("keeps track if user is logged in", () => {
        const store = useUserStore();
        expect(store.isLoggedIn).toBe(false)
    });

    it('stores organizations that the user filter jobs by', () => {
        const store = useUserStore();
        expect(store.selectedOrganizations).toEqual([]);
    });

    it('stores job types that the user filter jobs by', () => {
        const store = useUserStore();
        expect(store.selectedJobTypes).toEqual([]);
    });

    it("store degrees that the user filter jobs by", () => {
        const store = useUserStore();
        expect(store.selectedDegrees).toEqual([]);
    })

    it("store user search term for skills and qualifications", () => {
        const store = useUserStore();
        expect(store.skillsSearchTerm).toBe("");
    })
})

describe("actions", () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })
    
    describe("loginUser", () => {
        it("logs the user in", () => {
            const store = useUserStore();
            store.loginUser();
            expect(store.isLoggedIn).toBe(true)
        })
    })

    describe("add selected organizations", () => {
        it("updates organizations the user has chosen to filter jobs by", () => {
            const store = useUserStore();
            store.addSelectedOrganizations(["Org1", "Org2"]);
            expect(store.selectedOrganizations).toEqual(["Org1", "Org2"])
        })
    })

    describe("add selected job types", () => {
        it("updates job types the user has chosen to filter jobs by", () => {
            const store = useUserStore();
            store.addSelectedJobTypes(["Full-time", "Part-time"]);
            expect(store.selectedJobTypes).toEqual(["Full-time", "Part-time"])
        })
    })

    describe("add selected degrees", () => {
        it("updates degrees the user has chosen to filter jobs by", () => {
            const store = useUserStore();
            store.addSelectedDegrees(["Bachelor's", "Master's"]);
            expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"]);
        })
    })

    describe("update skills search term", () => {
        it("receives search term for skills the user has entered", () => {
            const store = useUserStore();
            store.skillsSearchTerm = "";
            store.updateSkillsSearchTerm("Vue");
            expect(store.skillsSearchTerm).toBe("Vue");
        })
    })

    describe("clear job filters selection", () => {
        it("remove all job filters that user has chosen", () => {
            const store = useUserStore();
            store.selectedDegrees = ["Bachelor's", "Master's"];
            store.selectedOrganizations= ["Org1", "Org2"];
            store.selectedJobTypes = ["Full-time", "Part-time"];
            store.skillsSearchTerm = 'Vue Developer'
            store.clearJobFilters();

            expect(store.selectedDegrees).toEqual([]);
            expect(store.selectedJobTypes).toEqual([]);
            expect(store.selectedOrganizations).toEqual([]);
            expect(store.skillsSearchTerm).toEqual("");
        })
    })
})