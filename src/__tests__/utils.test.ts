import UtilsClass from "../utils/utils";

describe("UtilsClass", () => {
  let utils: UtilsClass;

  beforeEach(() => {
    utils = new UtilsClass();
  });

  describe("getColors", () => {
    it("Return 3 Random Colors", async () => {
      const colors = await utils.getColors();
      expect(colors).toHaveLength(3);
      expect(Array.from(new Set(colors))).toHaveLength(3);
    });
  });

  describe("colorOption", () => {
    it("Return Selected Color", () => {
      const colors = ["#FFFFFF", "#000000", "#FF0000"];
      const color = utils.colorOption(colors);
      expect(colors).toContain(color);
    });
  });

  describe("randomColor", () => {
    it("Return 1 Random Color", () => {
      const color = utils.randomColor();
      expect(color).toMatch(/^#[0-9A-F]{6}$/);
    });
  });
});
