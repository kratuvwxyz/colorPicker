// global variables and functions
let redRange = 128,
  greenRange = 128,
  blueRange = 128,
  hueRange = 0,
  saturationRange = 0,
  lightnessRange = 50,
  haxCodeValue,
  colorTextColor = () => (redRange * 0.3 + greenRange * 0.6 + blueRange * 0.3 > 136 ? "#000000" : "#ffffff"),
  rgbToHex = (r, g, b) => ((1 << 24) + (r << 16) + (g << 8) + (b << 0)).toString(16).slice(1);
// run function when range value change
$(document).on("input", "#input-range-red, #input-range-green, #input-range-blue", function () {
  redRange = parseInt($("#input-range-red").val());
  greenRange = parseInt($("#input-range-green").val());
  blueRange = parseInt($("#input-range-blue").val());
  reset();
});
$(document).on("input", "#input-range-hue, #input-range-satu, #input-range-light", function () {
  hueRange = parseInt($("#input-range-hue").val());
  saturationRange = parseInt($("#input-range-satu").val());
  lightnessRange = parseInt($("#input-range-light").val());
  setTimeout(() => hslToRgb(hueRange, saturationRange, lightnessRange), 500);
});
// red range function
function redRangeFn() {
  $(".text-color-rgb-number-red").text(redRange);
  $(".text-percent-rgb-number-red").text(Math.floor((redRange * 100) / 255));
  $(".color-red").css("background-color", `rgb(${redRange},0,0)`);
}
// green range function
function greenRangeFn() {
  $(".text-color-rgb-number-green").text(greenRange);
  $(".text-percent-rgb-number-green").text(Math.floor((greenRange * 100) / 255));
  $(".color-green").css("background-color", `rgb(0,${greenRange},0)`);
  $(".text-color-on-green").css("color", greenRange > 180 ? "#000000" : "#ffffff");
}
// blue range function
function blueRangeFn() {
  $(".text-color-rgb-number-blue").text(blueRange);
  $(".text-percent-rgb-number-blue").text(Math.floor((blueRange * 100) / 255));
  $(".color-blue").css("background-color", `rgb(0,0,${blueRange})`);
}
// gradient color boxes
function gradientBoxes() {
  $(".gradientBoxes").empty();
  // change gradient background
  $(document.body).css("background", `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(${redRange},${greenRange},${blueRange},0.5) 50%, rgba(0,0,0,1) 100%)`);
  // hax code show and copy on button click
  haxCodeValue = "#" + rgbToHex(redRange, greenRange, blueRange);
  $(".haxCode").text(haxCodeValue).css("text-transform", "uppercase").css("color", colorTextColor);
  $(".headButton").css("background-color", haxCodeValue);
  // add gradient boxes and color
  for (let i = 0; i < 12; i++) {
    let a = $("<div>");
    a.addClass("col-1 colorCols color-" + (i + 1));
    if (i > 0 && i < 10) {
      a.text(i * 10 + "%");
      a.css("background-color", `rgba(${redRange},${greenRange},${blueRange},0.${i})`);
    } else if (i == 10) {
      a.css("background-color", `rgba(${redRange},${greenRange},${blueRange},1)`).text("100%");
    } else if (i == 0) {
      a.css("background-color", "#ffffff");
    } else if (i == 11) {
      a.css("background-color", "#000000");
    }
    $(".gradientBoxes").append(a);
  }
}
// hsl range function
function hslColorsInfo() {
  $(".text-color-on-hue, .text-color-on-satu, .text-color-on-light").css("color", colorTextColor);
  $(".lo-hsl").css("background-color", `rgb(${redRange},${greenRange},${blueRange})`);
  $(".text-percent-hsl-number-hue").text(hueRange);
  $(".text-percent-hsl-number-satu").text(saturationRange);
  $(".text-percent-hsl-number-light").text(lightnessRange);
}
// Copy to clipboard to copy paste
const copyToClipboard = (text) => navigator.clipboard.writeText(text);
const haxCode = () => {
  let x = haxCodeValue;
  copyToClipboard(x);
};

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  // return [255 * f(0), 255 * f(8), 255 * f(4)];
  redRange = Math.floor(f(0) * 255);
  greenRange = Math.floor(f(8) * 255);
  blueRange = Math.floor(f(4) * 255);
  $("#input-range-red").val(redRange);
  $("#input-range-green").val(greenRange);
  $("#input-range-blue").val(blueRange);
  setTimeout(() => reset(), 500);
}

// reset
function reset() {
  redRangeFn();
  greenRangeFn();
  blueRangeFn();
  gradientBoxes();
  hslColorsInfo();
}

// on document load run this function
$(document).ready(function () {
  reset();
});

/* 
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
// rgb to hsl function
 function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  hueRange = Math.floor(h * 100);
  saturationRange = Math.floor(s * 100);
  lightnessRange = Math.floor(l * 100);
  $(".hue-range").val(hueRange);
  $(".saturation-range").val(saturationRange);
  $(".lightness-range").val(lightnessRange);
  hslColorsInfo();
}
*/