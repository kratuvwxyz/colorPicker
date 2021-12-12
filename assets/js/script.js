let redRange = 127;
let greenRange = 127;
let blueRange = 127;
$('.color1').css('background-color', `rgb(127,0,0)`);
$('.color2').css('background-color', `rgb(0,127,0)`);
$('.color3').css('background-color', `rgb(0,0,127)`);

$(document).on('input', '.red-range', function () {
	redRange = $(this).val();
	bColor();
	$('.color1').css('background-color', `rgb(${redRange},0,0)`)
});
$(document).on('input', '.green-range', function () {
	greenRange = $(this).val();
	bColor();
	$('.color2').css('background-color', `rgb(0,${greenRange},0)`)
});
$(document).on('input', '.blue-range', function () {
	blueRange = $(this).val();
	bColor();
	$('.color3').css('background-color', `rgb(0,0,${blueRange})`)
});

function bColor() {
	let c = `rgb(${redRange}, ${greenRange}, ${blueRange})`
	$('body').css('background-color', c);
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
	$('.color4').css('background-color', `rgba(${r},${g},${b},0.1)`);
	$('.color5').css('background-color', `rgba(${r},${g},${b},0.2)`);
	$('.color6').css('background-color', `rgba(${r},${g},${b},0.3)`);
	$('.color7').css('background-color', `rgba(${r},${g},${b},0.4)`);
	$('.color8').css('background-color', `rgba(${r},${g},${b},0.5)`);
	$('.color9').css('background-color', `rgba(${r},${g},${b},0.6)`);
	$('.color10').css('background-color', `rgba(${r},${g},${b},0.7)`);
	$('.color11').css('background-color', `rgba(${r},${g},${b},0.8)`);
	$('.color12').css('background-color', `rgba(${r},${g},${b},0.9)`);
}

bColor();