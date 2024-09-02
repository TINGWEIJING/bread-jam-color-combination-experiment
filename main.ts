// @deno-types="npm:@types/apca-w3"
import {
  adobeRGBtoY,
  alphaBlend,
  APCAcontrast,
  calcAPCA,
  displayP3toY,
  sRGBtoY,
} from "npm:apca-w3";
import { colorParsley, colorToHex, colorToRGB } from "npm:colorparsley";
// @deno-types="npm:@types/culori"
import { formatHex, formatRgb, oklch, rgb } from "npm:culori";

// helper
function hueIncrements(interval: number): number[] {
  if (interval <= 0) {
    throw new Error("Interval must be greater than 0.");
  }

  const result: number[] = [];
  for (let value = 0; value < 360; value += interval) {
    result.push(value);
  }

  return result;
}

// current contrast
const currentBackgroundColorHex = "#1F1F1F";
const currentSemanticVariableColorHex = "#9CDCFE";
const currentSemanticReadonlyColorHex = "#4FC1FF";

const currentLc = calcAPCA(
  currentSemanticVariableColorHex,
  currentBackgroundColorHex,
);
console.log(`currentLc: ${currentLc}`);

// currentSemanticVariableColorHex oklch
const currentSemanticVariableColorOklch = oklch(
  currentSemanticVariableColorHex,
)!;
console.log(
  "🚀 ~ currentSemanticVariableColorOklch:",
  currentSemanticVariableColorOklch,
);

const l = 0.82
const c = 0.18
const interval = 20
const filterFunc = (hue: number) => hue >= 270 || hue <= 170


const generatedColorHexArr = [];
const filteredHueIncrements = hueIncrements(interval).filter(filterFunc);
console.log("🚀 ~ filteredHueIncrements:", filteredHueIncrements);
for (const hue of filteredHueIncrements) { // 40
  // const generatedOklch = oklch({
  //   mode: "oklch",
  //   l: currentSemanticVariableColorOklch?.l,
  //   c: currentSemanticVariableColorOklch?.c,
  //   h: hue,
  // });
  // const generatedOklch = oklch({
  //   mode: "oklch",
  //   l: 0.876,
  //   c: 0.18,
  //   h: hue,
  // });
  // const generatedOklch = oklch({
  //   mode: "oklch",
  //   l: 0.65,
  //   c: 0.13,
  //   h: hue,
  // });
  // const generatedOklch = oklch({
  //   mode: "oklch",
  //   l: 0.876,
  //   c: 0.14,
  //   h: hue,
  // });
    const generatedOklch = oklch({
    mode: "oklch",
    l: l,
    c: c,
    h: hue,
  });
  const generatedHex = formatHex(generatedOklch);
  generatedColorHexArr.push(generatedHex);
}
console.log(generatedColorHexArr.length);
console.log(generatedColorHexArr.map((hex) => `"${hex}"`).join(",\n"));

for (let colorIndex = 0; colorIndex < generatedColorHexArr.length; colorIndex++) {
  const generatedColorHex = generatedColorHexArr[colorIndex];
  const generatedOklch = oklch(
    generatedColorHex,
  )!
  // console.log(generatedOklch)
}

