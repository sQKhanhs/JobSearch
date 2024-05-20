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
})