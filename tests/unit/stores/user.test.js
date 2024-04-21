import { useUserStore } from "@/stores/user";
import { beforeEach, describe } from "vitest";
import { createPinia, setActivePinia } from "pinia";

describe("state", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })
   
    it("keeps track if user is logged in", () => {
        const store = useUserStore();
        expect(store.isLoggedIn).toBe(false)
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
})