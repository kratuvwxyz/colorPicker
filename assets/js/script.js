let redRange = 127;
let greenRange = 127;
let blueRange = 127;
$('.color-1').css('background-color', `rgb(255,255,255)`);
$('.color-12').css('background-color', `rgb(0,0,0)`);

$(document).on('input', '.red-range', function () {
	redRange = $(this).val();
	$(".redNumber").text(redRange);
	$(".redPercent").text(Math.floor(redRange*100/255));
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

function bColor() {
	let c = `rgb(${redRange}, ${greenRange}, ${blueRange})`
	// $('body').css('background-color', c);
	let h = rgbToHex(redRange, greenRange, blueRange);
	$('.haxCode').text(h);
	gradientColor(redRange, greenRange, blueRange);
}

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + (b << 0)).toString(16).slice(1);

const copyToClipboard = (text) => navigator.clipboard.writeText(text);

const haxCode = () => {
	let x = rgbToHex(redRange, greenRange, blueRange);
	copyToClipboard(x);
}

const gradientColor = (r,g,b) => {
	$('.color1').css('background-color', `rgb(${redRange},0,0)`);
	$('.color2').css('background-color', `rgb(0,${greenRange},0)`);
	$('.color3').css('background-color', `rgb(0,0,${blueRange})`);
	$('.color-2').css('background-color', `rgba(${r},${g},${b},0.1)`);
	$('.color-3').css('background-color', `rgba(${r},${g},${b},0.2)`);
	$('.color-4').css('background-color', `rgba(${r},${g},${b},0.3)`);
	$('.color-5').css('background-color', `rgba(${r},${g},${b},0.4)`);
	$('.color-6').css('background-color', `rgba(${r},${g},${b},0.5)`);
	$('.color-7').css('background-color', `rgba(${r},${g},${b},0.6)`);
	$('.color-8').css('background-color', `rgba(${r},${g},${b},0.7)`);
	$('.color-9').css('background-color', `rgba(${r},${g},${b},0.8)`);
	$('.color-10').css('background-color', `rgba(${r},${g},${b},0.9)`);
	$('.color-11').css('background-color', `rgba(${r},${g},${b},1)`);
}

bColor();