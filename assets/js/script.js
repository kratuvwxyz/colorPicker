let redRange = 127, greenRange = 127, blueRange = 127, hueRange = 0, saturationRange = 0, lightnessRange = 50;

$(document).on('input', '.red-range', function () {
	redRange = $(this).val();
	
	bColor();
});
$(document).on('input', '.green-range', function () {
	greenRange = $(this).val();
	
	bColor();
});
$(document).on('input', '.blue-range', function () {
	blueRange = $(this).val();
	
	bColor();
});
$(document).on('input', '.hue-range', function () {
	hueRange = $(this).val();
	$(".huePercent").text(hueRange);
	bColor();
});
$(document).on('input', '.saturation-range', function () {
	saturationRange = $(this).val();
	$(".saturationPercent").text(saturationRange);
	bColor();
});
$(document).on('input', '.lightness-range', function () {
	lightnessRange = $(this).val();
	$(".lightnessPercent").text(lightnessRange);
	bColor();
});

function bColor() {
	$(".redNumber").text(redRange);
	$(".redPercent").text(Math.floor(redRange*100/255));
	$(".greenNumber").text(greenRange);
	$(".greenPercent").text(Math.floor(greenRange*100/255));
	$(".blueNumber").text(blueRange);
	$(".bluePercent").text(Math.floor(blueRange*100/255));
	$(".colorBoxes").empty();
	let h = rgbToHex(redRange, greenRange, blueRange);
	$('.haxCode').text(h);
	$('.color1').css('background-color', `rgb(${redRange},0,0)`);
	$('.color2').css('background-color', `rgb(0,${greenRange},0)`);
	$('.color3').css('background-color', `rgb(0,0,${blueRange})`);
	for(let i = 0; i < 12; i++) {
		let a = $('<div>');
		a.addClass('col-1 colorCols color-' + (i + 1));
		if (i > 0 && i < 10) {
			a.text(i * 10 + '%');
			a.css('background-color', `rgba(${redRange},${greenRange},${blueRange},0.${i})`);
		} else if ( i == 10) {
			a.css('background-color', `rgba(${redRange},${greenRange},${blueRange},1)`).text('100%');
		}
		
		$(".colorBoxes").append(a);
		
	}
	hslToRgb(hueRange, saturationRange, lightnessRange);
	$('.color4').css('background-color', `hsl(${hueRange},${saturationRange}%,${lightnessRange}%)`);
	$('.color5').css('background-color', `hsl(${hueRange},${saturationRange}%,${lightnessRange}%)`);
	$('.color6').css('background-color', `hsl(${hueRange},${saturationRange}%,${lightnessRange}%)`);
	$('.color-1').css('background-color', `rgb(255,255,255)`);
	$('.color-12').css('background-color', `rgb(0,0,0)`);
	let cc = (redRange*0.3 + greenRange*0.6 + blueRange*0.3) > 186 ? '#000000' : '#ffffff';
	$('.headButton').css('background-color', h).css('color', cc);
}


const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + (b << 0)).toString(16).slice(1);

const copyToClipboard = (text) => navigator.clipboard.writeText(text);

const haxCode = () => {
	let x = rgbToHex(redRange, greenRange, blueRange);
	copyToClipboard(x);
}

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
function hslToRgb(h, s, l){
	s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
		l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  	  // return [255 * f(0), 255 * f(8), 255 * f(4)];
  	redRange = Math.floor(f(0) * 255);
  	greenRange = Math.floor(f(8) * 255);
  	blueRange = Math.floor(f(4) * 255);
}

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
 */
function rgbToHsl(r, g, b){
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if(max == min){
		h = s = 0; // achromatic
	}else{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return [h, s, l];
}

bColor();