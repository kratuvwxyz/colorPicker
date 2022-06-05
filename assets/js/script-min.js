let haxCodeValue,redRange=128,greenRange=128,blueRange=128,hueRange=0,saturationRange=0,lightnessRange=50,colorTextColor=()=>.3*redRange+.6*greenRange+.3*blueRange>136?"#000000":"#ffffff",rgbToHex=(e,n,r)=>((1<<24)+(e<<16)+(n<<8)+(r<<0)).toString(16).slice(1);function redRangeFn(){$(".text-color-rgb-number-red").text(redRange),$(".text-percent-rgb-number-red").text(Math.floor(100*redRange/255)),$(".color-red").css("background-color",`rgb(${redRange},0,0)`)}function greenRangeFn(){$(".text-color-rgb-number-green").text(greenRange),$(".text-percent-rgb-number-green").text(Math.floor(100*greenRange/255)),$(".color-green").css("background-color",`rgb(0,${greenRange},0)`),$(".text-color-on-green").css("color",greenRange>180?"#000000":"#ffffff")}function blueRangeFn(){$(".text-color-rgb-number-blue").text(blueRange),$(".text-percent-rgb-number-blue").text(Math.floor(100*blueRange/255)),$(".color-blue").css("background-color",`rgb(0,0,${blueRange})`)}function gradientBoxes(){$(".gradientBoxes").empty(),$(document.body).css("background",`linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(${redRange},${greenRange},${blueRange},0.5) 50%, rgba(0,0,0,1) 100%)`),haxCodeValue="#"+rgbToHex(redRange,greenRange,blueRange),$(".haxCode").text(haxCodeValue).css("text-transform","uppercase").css("color",colorTextColor),$(".headButton").css("background-color",haxCodeValue);for(let e=0;e<12;e++){let n=$("<div>");n.addClass("col-1 colorCols color-"+(e+1)),e>0&&e<10?(n.text(10*e+"%"),n.css("background-color",`rgba(${redRange},${greenRange},${blueRange},0.${e})`)):10==e?n.css("background-color",`rgba(${redRange},${greenRange},${blueRange},1)`).text("100%"):0==e?n.css("background-color","#ffffff"):11==e&&n.css("background-color","#000000"),$(".gradientBoxes").append(n)}}function hslColorsInfo(){$(".text-color-on-hue, .text-color-on-satu, .text-color-on-light").css("color",colorTextColor),$(".lo-hsl").css("background-color",`rgb(${redRange},${greenRange},${blueRange})`),$(".text-percent-hsl-number-hue").text(hueRange),$(".text-percent-hsl-number-satu").text(saturationRange),$(".text-percent-hsl-number-light").text(lightnessRange)}$(document).on("input","#input-range-red, #input-range-green, #input-range-blue",(function(){redRange=parseInt($("#input-range-red").val()),greenRange=parseInt($("#input-range-green").val()),blueRange=parseInt($("#input-range-blue").val()),reset()})),$(document).on("input","#input-range-hue, #input-range-satu, #input-range-light",(function(){hueRange=parseInt($("#input-range-hue").val()),saturationRange=parseInt($("#input-range-satu").val()),lightnessRange=parseInt($("#input-range-light").val()),setTimeout((()=>hslToRgb(hueRange,saturationRange,lightnessRange)),500)}));const copyToClipboard=e=>navigator.clipboard.writeText(e),haxCode=()=>{var e;e=haxCodeValue,navigator.clipboard.writeText(e)};function hslToRgb(e,n,r){r/=100;const a=n=>(n+e/30)%12,t=(n/=100)*Math.min(r,1-r),o=e=>r-t*Math.max(-1,Math.min(a(e)-3,Math.min(9-a(e),1)));redRange=Math.floor(255*o(0)),greenRange=Math.floor(255*o(8)),blueRange=Math.floor(255*o(4)),$("#input-range-red").val(redRange),$("#input-range-green").val(greenRange),$("#input-range-blue").val(blueRange),setTimeout((()=>reset()),500)}function reset(){redRangeFn(),greenRangeFn(),blueRangeFn(),gradientBoxes(),hslColorsInfo()}$(document).ready((function(){reset()}));