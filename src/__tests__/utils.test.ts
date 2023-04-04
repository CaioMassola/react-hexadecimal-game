import { colorOption, getColors, randomColor } from "../utils";
import { TUTORIAL } from "../utils/tutorial";

//randomColor
test("Return a valid color!", () => {
  const color = randomColor();
  expect(/^#[0-9A-F]{6}$/i.test(color)).toBe(true);
});

//getColors
describe("getColors", () => {
  it("Return an array with 3 valid colors", () => {
    const colors = getColors();
    expect(colors.length).toEqual(3);
    colors.forEach((color) => {
      expect(typeof color).toEqual("string");
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
    expect(colors[0]).not.toEqual(colors[1]);
    expect(colors[0]).not.toEqual(colors[2]);
    expect(colors[1]).not.toEqual(colors[2]);
  });
});

//colorOption
describe("colorOption", () => {
  it("Return a selected color", () => {
    const colors = ["#fff", "#f2f2f2", "#333333"];
    const color = colorOption(colors);
    expect(typeof color).toBe("string");
    expect(colors).toContain(color);
  });
});

//tutorial
test("TUTORIAL is a string", () => {
  expect(typeof TUTORIAL).toBe("string");
});
