import sketch from 'sketch'
import {highlight,getLanguage} from './service'

function run(layer,isDark){

	if(!(layer instanceof MSTextLayer)){
		sketch.UI.message("Please select a Text layer");
		return;
	}

	var doc = context.document;
	var userInput = doc.askForUserInput_initialValue("Language", "javascript");
	var lang = getLanguage(userInput);

	if(!lang){
		return sketch.UI.message("Couldn't find highlighter for " + userInput);
	}

	var content = layer.stringValue();
	var tokens = highlight(content,userInput,{json: true, dark: isDark});
	var chr = 0;

	layer.setIsEditingText(true)

	tokens.forEach(function(tok){
		var str = tok[0];
		var rgba = tok[1].rgba;
		var start = chr;
		var end = start + str.length;
		var range = NSMakeRange(start,end - start);
		if(rgba){
			var color = NSColor.colorWithCalibratedRed_green_blue_alpha(rgba.r / 255, rgba.g / 255, rgba.b / 255, 1);
			layer.addAttribute_value_forRange(NSForegroundColorAttributeName, color, range)
		};
		chr = end;
	})
	layer.setIsEditingText(false);
	return;
}

export default function() {
	sketch.UI.message("It's alive 🙌");
	// Select a Text Layer with at least 4 characters
	var selection = context.selection, textLayer = selection.firstObject();
	run(textLayer,true);
}
