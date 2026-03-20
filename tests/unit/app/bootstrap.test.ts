import { describe, expect, it } from "vitest";

describe("app bootstrap", () => {
  it("loads the root route module", async () => {
    await expect(import("@/app/page")).resolves.toBeTruthy();
  });
});
