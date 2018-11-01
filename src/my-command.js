import sketch from 'sketch'
import {highlight} from './test.js'
// documentation: https://developer.sketchapp.com/reference/api/
// import monarch with templates

export default function() {
	sketch.UI.message("It's alive 🙌");

	// Hex to Color - helper function
	var hexToColor = function(hex, alpha) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
	        red = parseInt(result[1], 16) / 255,
	        green = parseInt(result[2], 16) / 255,
	        blue = parseInt(result[3], 16) / 255,
	        alpha = (typeof alpha !== 'undefined') ? alpha : 1;
	    return NSColor.colorWithCalibratedRed_green_blue_alpha(red, green, blue, alpha)
	}

	// Select a Text Layer with at least 4 characters
	var selection = context.selection,
	    textLayer = selection.firstObject();

	var content = textLayer.stringValue();
	var tokens = highlight(content,'imba',{json: true});
	var chr = 0;

	textLayer.setIsEditingText(true)

	tokens.forEach(function(tok){
		var str = tok[0];
		var rgba = tok[1].rgba;
		var start = chr;
		var end = start + str.length;
		var range = NSMakeRange(start,end - start);
		if(rgba){
			var color = NSColor.colorWithCalibratedRed_green_blue_alpha(rgba.r / 255, rgba.g / 255, rgba.b / 255, 1);
			console.log(str,rgba);
			textLayer.addAttribute_value_forRange(NSForegroundColorAttributeName, color, range)
		};
		chr = end;
	})
	textLayer.setIsEditingText(false);
	return;

	var range = NSMakeRange(1,3)
	var color = hexToColor('4A90E2')
	textLayer.setIsEditingText(true)
	textLayer.addAttribute_value_forRange(NSForegroundColorAttributeName, color, range)
	textLayer.setIsEditingText(false)
}
