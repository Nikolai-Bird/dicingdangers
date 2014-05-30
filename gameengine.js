/*

TODO:

*remove "?" from auto fill selection

NOTES:

* Commands are always lower case. Command attributes can be any case


*/

// string compression:
// var compressed = LZString.compress(string);
// var string = LZString.decompress(compressed);
var LZString={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",_f:String.fromCharCode,compressToBase64:function(e){if(e==null)return"";var t="";var n,r,i,s,o,u,a;var f=0;e=LZString.compress(e);while(f<e.length*2){if(f%2==0){n=e.charCodeAt(f/2)>>8;r=e.charCodeAt(f/2)&255;if(f/2+1<e.length)i=e.charCodeAt(f/2+1)>>8;else i=NaN}else{n=e.charCodeAt((f-1)/2)&255;if((f+1)/2<e.length){r=e.charCodeAt((f+1)/2)>>8;i=e.charCodeAt((f+1)/2)&255}else r=i=NaN}f+=3;s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+LZString._keyStr.charAt(s)+LZString._keyStr.charAt(o)+LZString._keyStr.charAt(u)+LZString._keyStr.charAt(a)}return t},decompressFromBase64:function(e){if(e==null)return"";var t="",n=0,r,i,s,o,u,a,f,l,c=0,h=LZString._f;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(c<e.length){u=LZString._keyStr.indexOf(e.charAt(c++));a=LZString._keyStr.indexOf(e.charAt(c++));f=LZString._keyStr.indexOf(e.charAt(c++));l=LZString._keyStr.indexOf(e.charAt(c++));i=u<<2|a>>4;s=(a&15)<<4|f>>2;o=(f&3)<<6|l;if(n%2==0){r=i<<8;if(f!=64){t+=h(r|s)}if(l!=64){r=o<<8}}else{t=t+h(r|i);if(f!=64){r=s<<8}if(l!=64){t+=h(r|o)}}n+=3}return LZString.decompress(t)},compressToUTF16:function(e){if(e==null)return"";var t="",n,r,i,s=0,o=LZString._f;e=LZString.compress(e);for(n=0;n<e.length;n++){r=e.charCodeAt(n);switch(s++){case 0:t+=o((r>>1)+32);i=(r&1)<<14;break;case 1:t+=o(i+(r>>2)+32);i=(r&3)<<13;break;case 2:t+=o(i+(r>>3)+32);i=(r&7)<<12;break;case 3:t+=o(i+(r>>4)+32);i=(r&15)<<11;break;case 4:t+=o(i+(r>>5)+32);i=(r&31)<<10;break;case 5:t+=o(i+(r>>6)+32);i=(r&63)<<9;break;case 6:t+=o(i+(r>>7)+32);i=(r&127)<<8;break;case 7:t+=o(i+(r>>8)+32);i=(r&255)<<7;break;case 8:t+=o(i+(r>>9)+32);i=(r&511)<<6;break;case 9:t+=o(i+(r>>10)+32);i=(r&1023)<<5;break;case 10:t+=o(i+(r>>11)+32);i=(r&2047)<<4;break;case 11:t+=o(i+(r>>12)+32);i=(r&4095)<<3;break;case 12:t+=o(i+(r>>13)+32);i=(r&8191)<<2;break;case 13:t+=o(i+(r>>14)+32);i=(r&16383)<<1;break;case 14:t+=o(i+(r>>15)+32,(r&32767)+32);s=0;break}}return t+o(i+32)},decompressFromUTF16:function(e){if(e==null)return"";var t="",n,r,i=0,s=0,o=LZString._f;while(s<e.length){r=e.charCodeAt(s)-32;switch(i++){case 0:n=r<<1;break;case 1:t+=o(n|r>>14);n=(r&16383)<<2;break;case 2:t+=o(n|r>>13);n=(r&8191)<<3;break;case 3:t+=o(n|r>>12);n=(r&4095)<<4;break;case 4:t+=o(n|r>>11);n=(r&2047)<<5;break;case 5:t+=o(n|r>>10);n=(r&1023)<<6;break;case 6:t+=o(n|r>>9);n=(r&511)<<7;break;case 7:t+=o(n|r>>8);n=(r&255)<<8;break;case 8:t+=o(n|r>>7);n=(r&127)<<9;break;case 9:t+=o(n|r>>6);n=(r&63)<<10;break;case 10:t+=o(n|r>>5);n=(r&31)<<11;break;case 11:t+=o(n|r>>4);n=(r&15)<<12;break;case 12:t+=o(n|r>>3);n=(r&7)<<13;break;case 13:t+=o(n|r>>2);n=(r&3)<<14;break;case 14:t+=o(n|r>>1);n=(r&1)<<15;break;case 15:t+=o(n|r);i=0;break}s++}return LZString.decompress(t)},compress:function(e){if(e==null)return"";var t,n,r={},i={},s="",o="",u="",a=2,f=3,l=2,c="",h=0,p=0,d,v=LZString._f;for(d=0;d<e.length;d+=1){s=e.charAt(d);if(!Object.prototype.hasOwnProperty.call(r,s)){r[s]=f++;i[s]=true}o=u+s;if(Object.prototype.hasOwnProperty.call(r,o)){u=o}else{if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}r[o]=f++;u=String(s)}}if(u!==""){if(Object.prototype.hasOwnProperty.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}}n=2;for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}while(true){h=h<<1;if(p==15){c+=v(h);break}else p++}return c},decompress:function(e){if(e==null)return"";if(e=="")return null;var t=[],n,r=4,i=4,s=3,o="",u="",a,f,l,c,h,p,d,v=LZString._f,m={string:e,val:e.charCodeAt(0),position:32768,index:1};for(a=0;a<3;a+=1){t[a]=a}l=0;h=Math.pow(2,2);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(n=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 2:return""}t[3]=d;f=u=d;while(true){if(m.index>m.string.length){return""}l=0;h=Math.pow(2,s);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(d=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 2:return u}if(r==0){r=Math.pow(2,s);s++}if(t[d]){o=t[d]}else{if(d===i){o=f+f.charAt(0)}else{return null}}u+=o;t[i++]=f+o.charAt(0);r--;f=o;if(r==0){r=Math.pow(2,s);s++}}}};if(typeof module!=="undefined"&&module!=null){module.exports=LZString}

// Set global vars
var data = {};
var testdata = {};
var logstore = "";
var longlogstore = "";
//var responses = {};
//var options = {};
//var onTurn = {};





$('#command').keypress(function (e) {
	if (e.which == 13) { // Enter key
		if($( "#command" ).val()){
			runcommand($('#command').val());
			return false;
		}
	}
});

$( "#gobutton" ).on( "click", function() {
	if($( "#command" ).val()){
		runcommand($('#command').val());
	};
	return false;
});

// Auto fill
$(document).on('click', '.af', function(){
	if($(this).attr("data-command")){
		var addtext = $(this).attr("data-command");
	}else{
		var addtext = $.trim($( this ).text());
	}
	var comval = $('#command').val();
	//var addtext = $.trim($( this ).text());
	comval += " " + addtext + " ";
	comval = comval.replace(/ +(?= )/g,''); // remove extra spaces
	if(comval[0] === " "){comval = comval.substring(1);} // remove first space
	$('#command').val(comval);
	$( "#command" ).focus();
	
	return false;
	
});



// Auto run
$(document).on('click', '.ar', function(){
	if($(this).attr("data-command")){
		var comval = $(this).attr("data-command");
	}else{
		var comval = $.trim($( this ).text());
	}
	comval = comval.replace(/ +(?= )/g,''); // remove extra spaces
	if(comval[0] === " "){comval = comval.substring(1);} // remove first space
	runcommand(comval);
	return false;
	
});

$(document).on('click', '.afback', function(){
	
	var comval = $('#command').val();
	comval = $.trim(comval);
	
	if(comval){
		var newcomval = "";
		
		comval = comval.split(" ");
		comval.pop();
		
		for(var i = 0 ; i < comval.length; i++){
			newcomval += comval[i] + " ";
		}
		//con(newcomval);
		
		$('#command').val(newcomval);
		
	}
	
	$( "#command" ).focus();
	return false;
	
});

$(document).on('click', '.afdel', function(){
		
	$('#command').val("");
	$( "#command" ).focus();
	return false;
	
});



$("body").on("change", ".seloptions", function(e){
    
	var run = false;
	var dataAction = $(this).find('option:selected').attr('data-action');
	
	if(dataAction && dataAction !== ""){
		var comval = $(this).find('option:selected').attr('data-action');
		run = false;
		$('#command').val(comval + " ");
	}else{
		var comval = this.value;
		run = true;
		$('#command').val("");
	}
	
	comval = comval.replace(/ +(?= )/g,''); // remove extra spaces
	if(comval[0] === " "){comval = comval.substring(1);} // remove first space
	
	if(run){
		runcommand(comval);
	}
	
	
	
	$('#command').focus();
	
	$(this).find(':nth-child(1)').prop('selected', true);
	
	return false;
});


//$(".clickable").click(function() {
//$( ".clickable" ).on( "click", function() {
//:not(.seloptions)
$("body").on("click", ".clickable", function(e){

	
	// Gets clicked on word (or selected text if text is selected)
	var t = '';
	if (window.getSelection && (sel = window.getSelection()).modify) {
		// Webkit, Gecko
		var s = window.getSelection();
		if (s.isCollapsed) {
			s.modify('move', 'forward', 'character');
			s.modify('move', 'backward', 'word');
			s.modify('extend', 'forward', 'word');
			t = s.toString();
			s.modify('move', 'forward', 'character'); //clear selection
		}
		else {
			t = s.toString();
		}
	} else if ((sel = document.selection) && sel.type != "Control") {
		// IE 4+
		var textRange = sel.createRange();
		if (!textRange.text) {
			textRange.expand("word");
		}
		// Remove trailing spaces
		while (/\s$/.test(textRange.text)) {
			textRange.moveEnd("character", -1);
		}
		t = textRange.text;
	}
	
	t = $.trim(t);
	t = t.replace(/[\.,-\/#\?"!$%\^&\*;:{}=\-_`~()]/g,""); // Remove punctuation
	t = t.split("\n"); t = t[0]
	
	var comval = $('#command').val();
	comval = $.trim(comval);
	if(comval){comval += " ";}
	comval += t + " ";
	$('#command').val(comval);
	$( "#command" ).focus();
	
	
});



function runcommand(command){
	
	returnfocus();
	
	//log("<hr style='clear:both'>", true);
	
	//tempcommand = command;
	var command = splitcommand(command);
	var hidelog = executecommand(command);
	
	if(!command[2]){command[2] = "";}
	if(!command[3]){command[3] = "";}
	
	var header = "<span class='commandonpage'>" + options.precommandhtml + "<a href='#' class='af '><span class='commandonpage'>" + command[0] + " " + command[1] + " " + command[2] + " " + command[3] + "</span></a>" + options.postcommandhtml + "</span>";
	log(header, hidelog);
	// add to turn
	if(!hidelog){
		
		if(isInCombat()){
			attackPlayer();
		}
		
		data.gameVars.turn ++;
		runOnTurn();
	}
	
	log("", false, true); // release the logstore
	
}



function executecommand(command){

	var override = false;
	
	// Check dd functions for overide
	var ddf = command;
	ddf = ddf.toString();
	ddf = ddf.replace(/ +(?= )/g,''); // remove extra spaces
	ddf = ddf.replace(/,/g,'_'); ddf = ddf.replace(/ /g,'_'); // swap commas and spaces for _
	ddf = ddf.replace(/_+(?=_)/g,''); // remove extra _
	if(ddf.slice(-11) === "bad_command"){
		ddf = ddf.substring(0,ddf.length - 12);
	}
	if(this.hasOwnProperty("dd")){
		if (typeof(dd[ddf]) === "function") { 
			override = dd[ddf]();
		}
	}
	
	// first check object to see if default command has been overidden or new ones added
	if(override === false){
		if(command[1]){
			
			if (data.hasOwnProperty(command[1])) { 
			
				if (data[command[1]].hasOwnProperty("commandoverride")) { 
					if (data[command[1]].commandoverride.hasOwnProperty(command[0])) {
						commandoveride(data[command[1]].commandoverride[command[0]]);
						override = true;
					}
				}
			}else{
				// Check player			
				var co = command[0] + " " + command[1];
				if (data.player.commandoverride.hasOwnProperty(co)) {
					commandoveride(data.player.commandoverride[co]);
					override = true;
				}
			}
		}else{
			// Check on self/player
			if (data.player.commandoverride.hasOwnProperty(command[0])) {
				commandoveride(data.player.commandoverride[command[0]]);
				override = true;
			}
		}
	}
	
	if(override === false){
		
		
		
		if(command[10] === "bad command"){
			log(responses.commandfail, true);
			return true;
		}
		
		if(command[0] === "log"){
			log(data.gameVars.log, true);
			return true;
		}
		
		if(command[0] === "look"){
			
			if(!command[1]){
				
				// print objects that are not scenery
				var list = listObjectInventory(data.player.location);
				
				if(list){
					log(list);
					log(" ");
				}
				
				if(data[data.player.location].look !== ""){
					eval(data[data.player.location].look);
				}else{
					showDescription(data.player.location);
				}
				log("<span class='lightblue af'>" + data.player.location + "</span>");
				
				return;
			}
			
			if(command[1]){
				
				var cansee = "";
				if(isInPlayerLocation(command[1])){
					cansee = command[1];
				}
				
				if(cansee){
					
					data[cansee].looks++; // number of times object has been looked at
					
					var list = listObjectInventory(cansee);
					if(list){
						log(list);
					}
					
					if(data[cansee].look !== ""){
						eval(data[cansee].look);
					}else{
						showDescription(cansee);
					}
					
				}else{
					// Cannot see the item
					listAltItems(command[1]);
					log(mergeText(responses.cannotsee, command[1]));
				}
			}
		}
	
		
		if(command[0] === "equip"){
			var equipit = euipItem(command[1]);
			if(equipit[0] === false){
				if(equipit[1] === "no item"){
					log("You do not have that in your inventory.");
				}
				if(equipit[1] === "cannot equip"){
					log(command[1] + " cannot be equipped.");
				}
			}else{
				log("You equip " + command[1]);
			}
		}
		if(command[0] === "remove"){
			var removeit = removeItem(command[1]);
			if(removeit[0] === false){
				if(removeit[1] === "no type"){
					log("That is not a type of equipment or an equipped item.");
				}
			}else{
				log(command[1] + " has been removed.");
			}
		}
		
		
		if(command[0] === "hit"){
			
			if(command[1]){
				
				var attack = attackEnemy(command[1]);
				if(attack[0] === false && attack[1] === "not enemy"){
					log(command[1] + " is not an enemy.");
					
				}
				if(attack[0] === false && attack[1] === "no enemy"){
					log("There is no one by that name.");
					
				}
			}else{
				log("Try: 'hit [enemy name]'", true);
				return true;
			}
			
			
		}
		
		if(command[0] === "go"){
			var trymove = move(command[1]);
			
			if(trymove[0] === "success"){
				log("You move to " + trymove[1] + ".");
			}else if(trymove[0] === "fail"){
				if(trymove[1] === "no key" || trymove[1] === "locked"){
					log("The exit is locked.");
				}else if(trymove[1] === "in combat"){
					log("You cannot flee the battle.");
				}else{
					log("That did not work. Try: go [door name].");
					return true;
				}
			}
		}
		
		if(command[0] === "save"){
			if(command[1] === "game 1" || command[1] === "game 2" || command[1] === "game 3" || command[1] === "game 4" || command[1] === "game 5"){
				localStorage[command[1]] = JSON.stringify(data);
				log(command[1] + " saved.", true);
				return true;
			}else{
				log("Try: 'save game 1' or 'save game 2' up to 5.", true);
				return true;
			}
		}
		
		if(command[0] === "load"){
			if(command[1] === "game 1" || command[1] === "game 2" || command[1] === "game 3" || command[1] === "game 4" || command[1] === "game 5"){
				//localStorage[command[1]] = JSON.stringify(data);
				var tmp = localStorage[command[1]];
				if(tmp && tmp !== "undefined" && tmp !== false){
					data = JSON.parse(tmp);
					log(command[1] + " loaded.", true);
				}else{
					log("There is no game to load.", true);
				}
			}else{
				log("Try: 'load game 1' or 'load game 2' up to 5.", true);
			}
			return true;
		}
		if(command[0] === "debug"){
			if(command[1]){
				if(startdata.objects.hasOwnProperty(command[1])){
					compileData(true); //compile testdata
					data[command[1]] = testdata[command[1]];
				}
			}
		}
		
		if(command[0] === "transport" && command[1]){
			if(data.hasOwnProperty(command[1])){
				if(data[command[1]].objtype === "location"){
					log("Transported to " + command[1]);
					data.player.location = command[1];
				}else{
					log("Not a location.");
				}
			}else{
				log("No such location.");
			}
			
		}
		
		if(command[0] === "eval"){
			eval(command[1]);
		}
		
		
		if(command[0] === "drop"){
			if(command[1]){
				// Check if the last word is a number. If so use that as the drop amount
				var split = command[1].split(" ");
				if(!isNaN(split[split.length-1])){
					command[2] = split[split.length-1];
					command[1] = "";
					for(var i = 0; i < split.length-1; i++){
						if(i > 0){command[1] += " ";}
						command[1] += split[i];
					}
				}else{
					command[2] = 1;
				}
				
				//drop = dropItem(command[1], parseInt(command[2]));
				drop = dropItem("player", command[1], parseInt(command[2]), data.player.location);
				
				if(drop[0] === true){
					log("You drop it.");
					return;
				}else{
					log("You have no such item to drop.", true);
					return true;
				}
			}else{
				log("Drop what? Example: <i>drop gold</i>", true);
			}
		}
		
		if(command[0] === "take"){
			var cantake = false;
			
			// Check if the last word is a number. If so use that as the take amount
			var split = command[1].split(" ");
			if(!isNaN(split[split.length-1])){
				command[2] = split[split.length-1];
				command[1] = "";
				for(var i = 0; i < split.length-1; i++){
					if(i > 0){command[1] += " ";}
					command[1] += split[i];
				}
			}else{
				command[2] = 1;
			}
			
			
			cantake = takeItem(command[1], parseInt(command[2]));
			
			if(command[2] === 1){command[2] = "";} // no need to show "1" in the log
			
			
			if(cantake[0] === true){
				
				if(data.hasOwnProperty(command[1])){
					if(data[command[1]].takesuccess !== ""){
						eval(data[command[1]].takesuccess);
						return;
					}
				}
				
				log("You take " + command[1] + ".");
				return;
			}else{
				
				if(cantake[0] === false && cantake[1] === "no take"){
					if(data.hasOwnProperty(command[1])){
						if(data[command[1]].takefail !== ""){
							eval(data[command[1]].takefail);
							return;
						}
					}
				}
				
				if(cantake[1] !== "no take"){
					listAltItems(command[1]);
				}
				log("You can't take that.", true);
				return true;
				
			}
			
		}
		
		if(command[0] === "sell"){
			
			if(command[1]){
				
				var n = command[1].indexOf(" to ");
				if(n >=0){
					
					var split1 = command[1].split(" to ");
					var item = split1[0]; // Item
					var merchant = split1[1]; // Merchant
					var amount = 1;
					
					var split = item.split(" ");
					if(!isNaN(split[split.length-1])){
						amount = split[split.length-1];
						item = "";
						for(var i = 0; i < split.length-1; i++){
							if(i>0){
								item += " ";
							}
							item += split[i];
						}
					}else{
						//item = command[1];
					}
					
					
					var sellit = sellItem(merchant, item, amount);
					
					log(sellit[1]);
					
					
					
				}else{
					// Check that the merchant is in the same location and thn list his goods
					var listitems = listItemsCanSell(command[1], true); // true makes sure the merchant is in the same location as player
					log(listitems[1], true);
					return true;
				}
			}else{
				log("Who to? Try: sell [name of merchant] for a list of goods.", true);
				return true;
			}
		}
		
		
		if(command[0] === "buy"){
			
			if(command[1]){
				
				var n = command[1].indexOf(" from ");
				if(n >=0){
					//log("<span class='tips'>To buy an item use: buy (item) (amount) from (merchant name)</span>");
					var split1 = command[1].split(" from ");
					var item = split1[0]; // Item
					var merchant = split1[1]; // Merchant
					var amount = 1;
					
					var split = item.split(" ");
					if(!isNaN(split[split.length-1])){
						amount = split[split.length-1];
						item = "";
						for(var i = 0; i < split.length-1; i++){
							if(i>0){
								item += " ";
							}
							item += split[i];
						}
					}else{
						//item = command[1];
					}
					
					
					var buyit = buyItem(merchant, item, amount);
					
					log(buyit[1]);
					
				}else{
					// Check that the merchant is in the same location and thn list his goods
					var listitems = listItemsForSale(command[1], true); // true makes sure the merchant is in the same location as player
					//alert(listitems);
					//log(listitems[1], true);
					return true;
				}
			}else{
				log("Who from? Try: buy [name of merchant] for a list of goods.", true);
				return true;
			}
		}
		
		if(command[0] === "inventory"){
			
			var pinv = printInventory();
			log("", true); // add <br />
			return true;
		}
		
		if(command[0] === "equipment"){
			
			var pinv = printEquipment();
			log("", true); // add <br />
			return true;
			
			
		}
		
		if(command[0] === "use"){
			if(!command[1]){
				log("That did not work. Use something or use something on/in/with something else. Example: use key in door.", true);
				return true;
			}
			
			// enforce correct word usage
			command[1] = command[1].replace(" in "," on ");
			command[1] = command[1].replace(" with "," on ");
			
			var n = command[1].indexOf(" on ");
			if(n === -1){ // did not find " on "
				command[1] += " on self";
			}
			
			var split = command[1].split(" on ");
			var used = [];
			used = useItem(split[0], split[1]);
			
			if(!used[0]){
				if(used[1] === "no use"){
					log("You cannot use it like that.", true);
				}else{
					listAltItems(split[0]);
					listAltItems(split[1]);					
					log("That did not work. Use what?", true);
				}
				
				return true;
				
			}
			
		}
		
		if(command[0] === "ask"){
			if(!command[1]){
				log("That did not work. Ask somebody about something. Example: ask Roger about shoe.", true);
				return true;
			}
			
			// enforce correct word usage
			command[1] = command[1].replace(" ABOUT "," about ");
			command[1] = command[1].replace(" About "," about ");
			
			var split = command[1] .split(" about ");
			var used = [];
			asked = askAbout(split[0], split[1]);
			
			if(!asked[0]){
				//if(used[1] === "no object"){
					log("You get no answer.");
					return;
				//}
			}
			
		}
		
		if(command[0] === "restart" && command[1] === "game"){
			restartTheGame();
		}
		
		if(command[0] === "help"){
			log("look, take, use", true);
			log("restart game - restarts the whole game from the start.", true);
			return true;
		}
	}
}

// printlog the selectable options for an object
// merchant = [name] is a list of options to buy the item
function printSelectItem(item, amount, merchant, special){
	var list = "";
	var value = "";
	
	list += "<select class='seloptions notclickable' style='width:100%'>";
	
	if(merchant){
		value = "&nbsp; | &nbsp;" + data[item].value + "g";
	}
	
	if(amount > 1){
		list += "<option data-action='"+item+"'>"+item+"&nbsp; x " + amount +value+ "</option>";
	}else{
		list += "<option data-action='"+item+"'>"+item+"&nbsp;"+value+"</option>";
	}
	list += "<option data-action='"+item+"'>text</option>";
	list += "<option value='look "+item+"'>look</option>";
	
	if(merchant){
		list += "<option value='buy "+item+" 1 from "+merchant+"'>buy one</option>";
		if(amount > 1){	
			list += "<option value='buy "+item+" "+amount+" from "+merchant+"'>buy all</option>";
		}
	}else{
		if(canTake(item) && special !== "equipment"){
			list += "<option value='take "+item+" 1'>take one</option>";
			list += "<option value='take "+item+" " + amount+"'>take all</option>";
		}
		list += "<option value='use "+item+"'>use</option>";
		list += "<option data-action='use "+item+" on'>use on</option>";
		if(hasItem(item)){
			
			if(special === "equipment"){
				list += "<option value='remove "+item+"'>remove</option>";
			}else{
				list += "<option value='equip "+item+"'>equip</option>";
			}
			list += "<option value='drop "+item+" 1'>drop one</option>";
			list += "<option value='drop "+item+" "+amount+"'>drop all</option>";
		}
		
		var buy = false; if(data[item].merchant.length > 0){buy = true;}
		if(buy){
			list += "<option value='buy "+item+"'>buy list</option>";
			list += "<option data-action='buy item 1 from "+item+"'>buy item</option>";
		}
		var ask = false; if(data[item].objtype === "character"){ask = true;}
		if(ask){
			list += "<option data-action='ask "+item+" about'>ask</option>";
		}
		var door = false; if(data[item].objtype === "exit"){door = true;}
		if(door){
			list += "<option value='go "+item+"'>go</option>";
		}
		var danger = ""; if(data[item].hostility === 100){danger = "danger";}
		if(danger){
			list += "<option value='hit "+item+"'>hit</option>";
		}	
	}
	
	
	list += "</select>";
	
	return list;
}

function printEquipment(){
	// List equipment
	var list = "";
	var img = "";
	
	list += "<table width='100%' style='width:100%'>";
	for (var i = 0; i < equiptypes.length ; i++) {
		list += "<tr>";
			list += "<td>";
				list += equiptypes[i] + ": ";
			list += "</td>";
			if(data.player.equipment[i] !== ""){
				
				list += "<td>";
					list += printSelectItem(data.player.equipment[i], 1, "", "equipment");
					//log(equiptypes[i] + ' = <img src="img/'+data[data.player.equipment[i]].image+'" class="svg" style=" width:32px; height:32px;"> ' + data.player.equipment[i] + " - <a href='#' class='af'>look "+data.player.equipment[i]+"</a>", true);
				list += "</td>";
			}else{
				list += "<td>";
					list += "none";
				list += "</td>";
			}
		list += "</tr>";
	}
	
	list += "</table>";
	log(list, true);
	return true;
}

function printInventory(){
	var list = "";
	var img = "";
	var n = 0;
	//"<img src='img/"+data[key].image+"' style=' width:32px; height:32px;'>"
	for (var key in data.player.inventory) {
		if(n === 0){
			list += "<table width='100%' style='width:100%'>";
		}
		list += "<tr>";
			list += "<td>";
				list += img;
			list += "</td>";
			//list += "<td style='padding-right:10px;'>";
			//	list += "<button style='width:100%; ' class='af' data-command='"+key+"'>" + key + " x " + data.player.inventory[key][0]+"</button>";
			//list += "</td>";
			list += "<td>";
				
				list += printSelectItem(key, data.player.inventory[key][0]);
				
				/*
				list += "<select class='seloptions notclickable' style='width:100%'>";
				list += "<option data-action='"+key+"'>"+key+" x " + data.player.inventory[key][0]+"</option>";
				list += "<option data-action='"+key+"'>text</option>";
				list += "<option value='look "+key+"'>look</option>";
				list += "<option value='use "+key+"'>use</option>";
				list += "<option data-action='use "+key+" on'>use on</option>";
				list += "<option value='equip "+key+"'>equip</option>";
				list += "<option value='drop "+key+" 1'>drop one</option>";
				list += "<option value='drop "+key+" "+data.player.inventory[key][0]+"'>drop all</option>";
				list += "</select>";
				*/
				//list += "<button class='ar' data-command='look "+key+"'>look</button>";
				//list += "<button class='ar' data-command='use "+key+"'>use</button>";
				//list += "<button class='af' data-command='use "+key+" on'>use on</button>";
				//list += "<button class='ar' data-command='equip "+key+"'>equip</button>";
				//list += "<button class='ar' data-command='drop "+key+"'>drop</button>";
			list += "</td>";
		list += "</tr>";
		n ++;
	}
	if(n !== 0){
		list += "</table>";
		log(list, true);
	}
}


function removeItem(type){
	// equiptypes is the list of equipment types the player can have
	// they are ordered the same as the equipment slots on the player (or any data.object)
	
	// try by equipment type
	for(var i = 0, max = equiptypes.length; i < max; i++){
		if(type.toLowerCase() === equiptypes[i].toLowerCase()){
			data.player.equipment[i] = "";
			return [true, ""];
		}
	}
	
	// try by object name
	for(var i = 0, max = data.player.equipment.length; i < max; i++){
		if(type === data.player.equipment[i]){
			data.player.equipment[i] = "";
			return [true, ""];
		}
	}
	
	return [false, "no type"];
}

function euipItem(item){
	// check that the item is in inventory
	if(!hasItem(item)){
		return [false, "no item"];
	}
	// check that the item can be equipped
	if(data[item].equiptype === 0){
		return [false, "cannot equip"];
	}
	// the equipment array starts at 0. The equiptypes start at 1 so subtract 1 for the correct slot
	var slot = data[item].equiptype - 1;
	
	// equip the item
	data.player.equipment[slot] = item;
	
	return [true, ""];
}

// Checks if the player can take an item. Must also be in the same location. returns true or false.
function canTake(obj){
	var listofitems = getDeepListOfItemsInObject(data.player.location, true);
	
	for(var i = 0; i < listofitems.length; i++){
		if(listofitems[i].name === obj && listofitems[i].take === true){
			//con(obj + ": " + listofitems[i].take);
			return true;
		}
	}
	return false;
}

function isInPlayerLocation(obj){
	var listofitems = getDeepListOfItemsInObject(data.player.location, true);
	
	for(var i = 0; i < listofitems.length; i++){
		if(listofitems[i].name === obj){
			return true;
		}
	}
	
	return false;
}

function getProtrectionOfItem(obj){
	var ret = 0;
	var eqt = data[obj].equiptype;
	
	if(data[obj].protection === null){
		if(eqt === 2 || eqt === 3 || eqt === 4 || eqt === 5 || eqt === 6 || eqt === 7 || eqt === 8 || eqt === 9){ // 2 - 9
			// auto generate from level of item
			if(eqt === 2 || eqt === 3){ // armour or shield get bonus
				ret = parseInt(data[obj].level / 9 + 0.5) * 2;
			}else{
				ret = parseInt(data[obj].level / 9 + 0.5);
			}		
		}
	}else{
		ret = data[obj].protection;
	}
	
	return ret;
}
function getDamageOfItem(obj){
	var ret = 0;
	var eqt = data[obj].equiptype;
	
	if(data[obj].damage === null){
		if(eqt === 1){
			// auto generate from level of item
			ret = data[obj].level;
		}
	}else{
		ret = data[obj].damage;
	}
	
	return ret;
}
function getTypeOfItem(obj){
	var ret = data[obj].objtype;
	if(data[obj].equiptype > 0){
		ret = equiptypes[data[obj].equiptype - 1];
	}
	return ret;
}

function showDescription(cansee){
	
	// if an equipment item then show more details
	if(data[cansee].equiptype > 0){
		log("Protection: " + getProtrectionOfItem(cansee));
		log("Damage: " + getDamageOfItem(cansee));
		log("Level: " + data[cansee].level);
		log("Type: " + getTypeOfItem(cansee));
	}
	
	log(""+data[cansee].description+"");
	// Place image if there is one
	if(data[cansee].image !== ""){
		//log('<object type="image/svg+xml" data="img/svg/'+data[cansee].image+'" class="svg" style="float:right; margin-left:15px; margin-bottom:15px; width:128px; height:128px;"></object>');
		log('<img src="img/'+data[cansee].image+'" class="svg" style="float:right; margin-left:15px; margin-bottom:15px; width:100px; height:100px;">');
	}
}

function listObjectInventory(obj){
	// only lists visible scenery objects
	objs = [];
	objs = getListOfItemsInObject(obj)
	var found = 0;
	var list = "";
	
	for(var i = 0; i < objs.length; i++){
		if(objs[i].name && objs[i].scenery === true){
			if(found === 0){
				list += "<table width='100%' style='width:100%'>"
			}
			list += "<tr>";
			
			/*
			var ask = "";
			if(data[objs[i].name].objtype === "character"){ask = true;}
			
			var door = "";
			if(data[objs[i].name].objtype === "exit"){door = true;}
			
			var danger = "";
			if(data[objs[i].name].hostility === 100){danger = "danger";}
			*/
			
			var img = "<img src='img/" + data[objs[i].name].image + "' class='thumbnail'>";
			
			list += "<td style='padding-right:5px;'>";
			list += img;
			list += "</td>";
			list += "<td>";
			list += printSelectItem(objs[i].name, objs[i].amount);
			
			/*
			list += "<select class='seloptions notclickable' style='width:100%'>";
				if(objs[i].amount > 1){
					list += "<option data-action='"+objs[i].name+"'>"+objs[i].name+" x "+objs[i].amount+"</option>";
				}else{
					list += "<option data-action='"+objs[i].name+"'>"+objs[i].name+"</option>";
				}
				list += "<option data-action='"+objs[i].name+"'>text</option>";
				list += "<option value='look "+objs[i].name+"'>look</option>";
				list += "<option value='use "+objs[i].name+"'>use</option>";
				list += "<option data-action='use "+objs[i].name+" on'>use on</option>";
				list += "<option value='take "+objs[i].name+"'>take</option>";
				if(ask){
					list += "<option data-action='ask "+objs[i].name+" about'>ask</option>";
				}
				if(door){
					list += "<option value='go "+objs[i].name+"'>go</option>";
				}
				if(danger){
					list += "<option value='hit "+objs[i].name+"'>hit</option>";
				}
			list += "</select>";
			*/
			list += "</td>";
			list += "</tr>"
			found++;
		}
	}
	
	
	
	if(found === 0){
		list = "";
	}else{
		list += "</table>"
	}
	
	return list;
	
	
}



function sellItem(merchant, item, amount){
	//con(merchant + " | " + item + " | " + amount);
	// Check if item is for sale, check if merchant is a true merchant
	//con(merchant + " " + item + " " + amount);
	// We have to confirm the merchant location is the same as the player
	
	var foundMerchant = false;
	var listofitems = getDeepListOfItemsInObject(data.player.location);
	for(var i = 0; i < listofitems.length; i++){
		if(listofitems[i].name === merchant ){
			// Found merchant in player location
			foundMerchant = true;
			break;
		}
	}
	
	if(foundMerchant !== true){
		return ["fail", "There is no merchant by that name."];
	}
	
	var merchantType = data[merchant].merchant;
	var listofitems = getListOfItemsInObject("player");
	for(var i = 0, max = merchantType.length; i < max; i++){
		for(var n = 0, max2 = listofitems.length; n < max2; n++){
			if(data[listofitems[n].name].equiptype === merchantType[i] && listofitems[n].name === item){
				if(listofitems[n].amount >= amount){
					var totalCost = amount * Math.ceil(data[item].value / 2);
						
					addObjectToInventory(merchant,item,amount,false,false);
					addObjectToInventory("player","gold",totalCost,true,false);
					removeObjectFromInventory("player",item,amount,"","");
					//removeObjectFromInventory(merchant,item,amount,"","");
					
					return ["success", "You sell " + amount + " X " + item + " for " + totalCost + " gold coins."];
					
				}else{
					return ["fail", "You do not have enough."];
				}
			}
		}
		return ["fail", "You do not have that item."];
	}
	
	return ["fail", "That did not work."];
}

function buyItem(merchant, item, amount){
	//con(merchant + " | " + item + " | " + amount);
	// Check if item is for sale, check if merchant is a true merchant
	//con(merchant + " " + item + " " + amount);
	// We have to confirm the merchant location is the same as the player
	
	var foundMerchant = false;
	var listofitems = getDeepListOfItemsInObject(data.player.location);
	for(var i = 0; i < listofitems.length; i++){
		if(listofitems[i].name === merchant ){
			// Found merchant in player location
			foundMerchant = true;
			break;
		}
	}
	
	if(foundMerchant !== true){
		return ["fail", "There is no merchant by that name."];
	}
	
	
	
	var merchantType = data[merchant].merchant;
	var listofitems = getListOfItemsInObject(merchant);
	
	for(var i = 0, max = merchantType.length; i < max; i++){
		for(var n = 0, max2 = listofitems.length; n < max2; n++){
			//con(merchantType + ": " + data[listofitems[n].name].equiptype);
			//con(data[listofitems[n].name].equiptype + " = " + merchantType[i] + " | " +listofitems[n].name + " = " + item);
			if(data[listofitems[n].name].equiptype === merchantType[i] && listofitems[n].name === item){
				
				if(listofitems[n].amount >= amount){
					var totalCost = amount * data[item].value;
					if(data.player.inventory.hasOwnProperty("gold")){
						var totalGold = data.player.inventory.gold[0];
					}else{
						var totalGold = 0;
					}
					
					if(totalGold >= totalCost){
						
						addObjectToInventory("player",item,amount,true,false);
						removeObjectFromInventory("player","gold",totalCost,"","");
						removeObjectFromInventory(merchant,item,amount,"","");
						
						return ["success", "You buy " + printSelectItem(item, amount) + " for " + totalCost + " gold coins."];
						
					}else{
						return ["fail", "You do not have enough gold. You need " + totalCost + " gold coins."];
					}
				}else{
					return ["fail", merchant + " does not have enough stock."];
				}
			}
		}
	}
	return ["fail", "That item does not seem to be for sale."];
	return ["fail", "That did not work."];
}


function listItemsCanSell(merchant, checkMerchant){
	
	// We have to confirm the merchant location is the same as the player
	if(checkMerchant){
		var foundMerchant = false;
		var listofitems = getDeepListOfItemsInObject(data.player.location);
		for(var i = 0; i < listofitems.length; i++){
			if(listofitems[i].name === merchant ){
				// Found merchant in player location
				foundMerchant = true;
				break;
			}
		}
		if(foundMerchant !== true){
			//return ["fail", "no merchant"];
			return ["fail", "There is no such merchant."];
		}
	}
	
	var merchantType = data[merchant].merchant;
	if(!merchantType){
		return ["fail", merchant + " is not a merchant."];
	}
	
	log("<span class='tips'>To sell an item use: sell (item) (amount) to (merchant name)</span>");
	
	// take the types of items the merchant sells and compare them to his inventory. List matches.
	var listofitems = getListOfItemsInObject("player");
	var count = 0;
	for(var i = 0, max = merchantType.length; i < max; i++){
		for(var n = 0, max2 = listofitems.length; n < max2; n++){
			if(data[listofitems[n].name].equiptype === merchantType[i]){
				log(listofitems[n].amount + " X " +listofitems[n].name + " " + Math.ceil(data[listofitems[n].name].value/2) + " gold");
				count++;
			}
		}
	}
	if(count === 0){log("You have nothing " + merchant + " wants to buy.");}
}

function listItemsForSale(merchant, checkMerchant){
	
	// We have to confirm the merchant location is the same as the player
	if(checkMerchant){
		var foundMerchant = false;
		var listofitems = getDeepListOfItemsInObject(data.player.location);
		for(var i = 0; i < listofitems.length; i++){
			if(listofitems[i].name === merchant ){
				// Found merchant in player location
				foundMerchant = true;
				break;
			}
		}
		if(foundMerchant !== true){
			log("There is no such merchant here.",true);
			return ["fail", "There is no such merchant."];
		}
	}
	
	var merchantType = data[merchant].merchant;
	
	log("<span class='tips'>To buy an item use: buy (item) (amount) from (merchant name)</span>");
	
	// take the types of items the merchant sells and compare them to his inventory. List matches.
	var listofitems = getListOfItemsInObject(merchant);
	var count = 0;
	for(var i = 0, max = merchantType.length; i < max; i++){
		for(var n = 0, max2 = listofitems.length; n < max2; n++){
			//con(data[listofitems[n].name].equiptype + " | " + );
			if(data[listofitems[n].name].equiptype === merchantType[i]){
				//log(listofitems[n].amount + " X " +listofitems[n].name + " " + data[listofitems[n].name].value + " gold");
				log(printSelectItem(listofitems[n].name, listofitems[n].amount, merchant));
				count++;
			}
			
		}
	}
	if(count === 0){log(merchant + " has nothing for sale.");}
	//alert(merchant);
	
	return ["success", ""];
}

// List alternative items when game does not know for sure what the player is talking about
function listAltItems(item){
	if(item.length > 2){

		var listofitems = getDeepListOfItemsInObject(data.player.location, true);
		var li = [];
		for(var i = 0; i < listofitems.length; i++){
			li.push(listofitems[i].name)
		}
		var res = getFuzzy(item, li);
		for(var i = 0; i < res.length; i++){
			log("<span class='tips'>Did you mean <span class='af'>" + li[res[i]] + "</span>?</span>");
		}
	}else{
		return;
	}
}

function getFuzzy(search, data){
	// data is a flat array of words or terms
	var options = {
		keys: [''],
		id: '',
		threshold: 0.3
	}
	var f = new Fuse(data, options);
	//var f = new Fuse(data, 0.0);
	var result = f.search(search);
	return result;
}

function setAutoStats(enemy){
	
	var level = data[enemy].level;
	
	if(data[enemy].protection === "auto"){
		data[enemy].protection = level;
	}
	if(data[enemy].hits === "auto"){
		data[enemy].hits = level * 20;
	}
	if(data[enemy].hitsmax === "auto"){
		data[enemy].hitsmax = level * 20;
	}
	if(data[enemy].damage === "auto"){
		data[enemy].damage = level;
	}
	if(data[enemy].attackskill === "auto"){
		data[enemy].attackskill = level;
	}
	
	

}

///////////////////////////////////// COMBAT ////////////////////////////////////

// check to see if any objects/characters are hostile = 100. If so they get an attack each on the player
function attackPlayer(){
	var returnlog = "";
	
	if(data.gameVars.turn === 0 ){
		return; // no attacks of first turn
	}
	
	listOfObjects = getDeepListOfItemsInObject(data.player.location);
	for (var key in listOfObjects) {
		if(listOfObjects[key].hostility === 100){
			// Found a hostile. Attack player or henchman
			
			// Update player stats
			updatePlayerStats();
			
			var enemy = listOfObjects[key].name;
			
			// set enemy auto stats
			setAutoStats(enemy);
			
			var crit = false;
			
			// enemy get damage
			if((Math.floor(Math.random() * (data[enemy].attackskill + 300))+2) > 299){
				var damageRoll = data[enemy].damage;
				crit = true;
				//con("CRIT: " + damageRoll);
			}else{
				var damageRoll = Math.floor(Math.random()*data[enemy].damage)+(parseInt(data[enemy].damage/2));
				//con("Dam: " + damageRoll);
			}
			
			// player armour roll
			var armourRoll = Math.floor(Math.random()*data.player.totaldefence)+(parseInt(data.player.totaldefence/4));
			//con("Arm: " + armourRoll);
			
			var finalDamage = damageRoll - armourRoll;
			
			if(finalDamage < 0){finalDamage = 0;}
			
			var img = "<img src='img/png.png' class='thumbnail'> ";
			if(data[enemy].image !== ""){
				img = "<img src='img/" + data[enemy].image + "' style='width:64px; height:64px' class='thumbnail'> "
				//img = '<object type="image/svg+xml" data="img/svg/'+ data[enemy].image +'" class="svg"></object> ';
				};
			
			
			if(finalDamage > 0){
				data.player.hits -= finalDamage;
				if(data.player.hits <= 0){
					data.player.hits = 0;
					postlog("You have been killed!");
					restartTheGame();
				}
				postlog(img + enemy + " attacks you doing " + finalDamage + " damage. ("+data.player.hits+"/"+data.player.hitsmax+") " + printAutoRunCommands("hit " + enemy, "hit"));
				
			}else{
				postlog(img + enemy + " attacks you but misses.");
			}
			
		}
	}
}

function printAutoRunCommands(command, text){
	//return "<a href='#' class='ar' data-command='" + command + "'>" + text + "</a>";
	return "<button class='ar' data-command='" + command + "'>" + text + "</button>";
}


// check to see if any objects/characters are hostile = 100. If so they get an attack each on the player
function attackEnemy(enemy){
	
	// First see of the enemy is hostile 100%.
	// if 0%, player may not attack him
	// if more than 0% then add 10%. example: 90% will attack back after one hit. 80% after two hits.
	
	// Check that the enemy exists
	if(!isInPlayerLocation(enemy)){
		return [false, "no enemy"];
	}
	
	// Check for more than 0% hostility
	if(data[enemy].hostility === 0){
		return [false, "not enemy"];
	}
	
	updatePlayerStats();
	setAutoStats(enemy);
	
	
	var crit = false;
			
	// player get damage
	if((Math.floor(Math.random() * (data.player.attackskill + 300))+2) > 299){
		var damageRoll = data[enemy].damage;
		crit = true;
		//con("CRIT: " + damageRoll);
	}else{
		var damageRoll = Math.floor(Math.random()*data.player.damage)+(parseInt(data.player.damage/2));
		//con("Dam: " + damageRoll);
	}
	
	// Enemy armour roll
	var armourRoll = Math.floor(Math.random()*data[enemy].protection)+(parseInt(data[enemy].protection/4));
	//con("Arm: " + armourRoll);
	
	var finaldamage = damageRoll - armourRoll;
	
	if(finaldamage < 0){finaldamage = 0;}
	var img="";
	//var img = '<object type="image/svg+xml" data="img/svg/'+data.player.image+'" class="svg"></object> ';
	if(data.player.image !== ""){img = "<img src='img/" + data.player.image + "' class='thumbnail'> "};
	
	if(finaldamage > 0){
		
		data[enemy].hits -= finaldamage;
		if(data[enemy].hits <= 0){
			
			data[enemy].hits = 0;
			
			// drop inventory
			for (var key in data[enemy].inventory) {
				
				data[enemy].inventory[key][1] = true; // fix for using "take" in select menu in printSelectItem()
				log(printSelectItem(key, data[enemy].inventory[key][0]));
				dropItem(enemy, key, data[enemy].inventory[key][0], data.player.location);
				
			}
			log(enemy + " drops:");
			
			log("You killed " + enemy + ".");
			
			
			
			// remove enemy body
			var listofitems = getDeepListOfItemsInObject(data.player.location, true);	
			for(var i = 0; i < listofitems.length; i++){
				if(listofitems[i].name === enemy){
					removeObjectFromInventory(listofitems[i].path,enemy,1,true,true); // the last true, true is to search deep and include player	
					break;
				}
			}
		}
		log(img + "You attack "+enemy+" doing " + finaldamage + " damage. ("+data[enemy].hits+"/"+data[enemy].hitsmax+")");
		
		// Hand out XP
		data.player.xp += finaldamage;
		data.player[data.player.attackskillname] += finaldamage;
		
	}else{
		log(img + " You miss "+enemy+".");
	}
	
	return [true, ""];
}

/*
This function produces the player stats that are based on other stats.
They can also be affected by modifiers such as equipment.
They are variable whereas normal stats are fixed and can only be changed by XP.
*/
function updatePlayerStats(){
	
	data.player.level = calculateOverallLevel(data.player.xp);
	data.player.hitsmax = parseInt((data.player.con * 7) + (data.player.level * 20) + 50);
	
	data.player.damage = parseInt(9 + data.player.str * 0.5);
	data.player.defence = parseInt(data.player.dex * 0.25);
	
	data.player.totalblades = calculateSkillLevel(data.player.blades);
	data.player.totalpolearms = calculateSkillLevel(data.player.polearms);
	data.player.totalunarmed = calculateSkillLevel(data.player.unarmed);
	
	data.player.attackskillname = "unarmed";
	
	// Current attack skill depends on the type of weapon equipped. Work this out:
	if(data.player.equipment[0] === ""){
		//data.player.attackskill = data.player.totalunarmed;
		data.player.attackskillname = "unarmed";
	}else{
		if(data[data.player.equipment[0]].skill === null || data[data.player.equipment[0]].skill === ""){
			// The weapon's skill has not been defined. Throw an error
			con("Err: Weapon skill is undefined. updatePlayerStats()");
			//data.player.attackskill = data.player.totalunarmed;
			data.player.attackskillname = "unarmed";
		}else{
			//data.player.attackskill = data[data.player.equipment[0]].skill;
			data.player.attackskillname = data[data.player.equipment[0]].skill;
		}
	}
	data.player.attackskill = data.player["total"+data.player.attackskillname];
	//con("Attack Skill: "+ data.player.attackskill);
	
	
	/*
	Add equipment modifiers to character stats
	*/
	var equipment = data.player.equipment;
	data.player.totaldamage = data.player.damage;
	data.player.totaldefence = data.player.defence;
	for(var i = 0, max = equipment.length; i < max; i++){
		if(data.hasOwnProperty(equipment[i])){
			data.player.totaldefence += getProtrectionOfItem(equipment[i]);
			data.player.totaldamage += getDamageOfItem(equipment[i]);
		}
	}	

} // end updateCharacterStats()



function isInCombat(){
	// Check to see if is combat
	// It does this by checking for any objects in the location with a hostility of 100(%)
	listOfObjects = getDeepListOfItemsInObject(data.player.location);
	for (var key in listOfObjects) {
		if(listOfObjects[key].hostility === 100){
			return true;
		}
	}
	return false;
}

function move(exitname){

	// check for a exit. If it is locked, check for a key
	// A key can always open a specific exit.
	// Lockpicks can be used to open doors. To make a exit unpickable make it 1000000
	// "dungeon cell":["dungeon passage",100(how locked),"cell keys(key to open door)","<script>"]

	// Check to see if in combat. If so stop the move and go to combat instead.
	if(isInCombat()){
		return ["fail", "in combat"];
	}

	
	for (var key in data[data.player.location].inventory) {
		if(data[key].objtype === "exit" && exitname === key){
			for (var exits in data[key].move) {
				if(exits === data.player.location){
					var destination = data[key].move[exits];
					
					if(destination[3] && destination[3] !== ""){
						eval(destination[3]);
						return ["none", "script"];
					}else{
					
						if(destination[1] < 1){
							
							// check onexit script for the current location
							if(data[data.player.location].onexit){
								eval(data[data.player.location].onexit);
								//data.player.location = destination[0];
								return ["none", "script"];
							}else{
								data.player.location = destination[0];
								return ["success", data.player.location];
							}
							
						}else{
							// Locked exit. Check for a key
							var keyname = destination[2];
							
							if(keyname && keyname !== ""){
								
								var haskey = inventory("player", keyname, ">=", 1);
								if(haskey[0] === true){
									
									// check onexit script for the current location
									if(data[data.player.location].onexit){
										eval(data[data.player.location].onexit);
										//data.player.location = destination[0];
										return ["none", "script"];
									}else{
										data.player.location = destination[0];
										return ["success", data.player.location];
									}
								}else{
									
									return ["fail", "no key"];
								}
							}else{
								return ["fail", "locked"];
							}
						}
					}
					
				}
			}
		}
	}
	
	return ["fail","no exit"];
}

function removeObjectFromInventory(target,object,amount,deep,includeplayer){
	// target = the target inventory to search
	// object = the item/object to remove
	// amount = how many to remove. 0 = all
	// deep = whether or not to look into targets within the target for the object
	// includeplayer = whether or not to include the player's inventory in the deep search
	
	amount = amount * -1;
	if(deep === false || deep === "" || deep === "undefined"|| deep === null){
		inventory(target, object, "+-", amount, "", "");
	}else if(deep === true){
		listOfObjects = getDeepListOfItemsInObject(target, includeplayer);
		for (var key in listOfObjects) {
			if(listOfObjects[key].name === object){
				inventory(listOfObjects[key].path, object, "+-", amount, "", "");
				return;
			}
		}
	}	
}

function addObjectToInventory(target,object,amount,take,scenery){
	//con(target + " | " + object + " | " + amount + " | " + take + " | " + scenery);
	inventory(target, object, "+-", amount, take, scenery);
}


function askAbout(person, subject){
	//con("Ask ABout: " + person + " | " + subject);
	
	//ask_Abale(#)
	
	var success = false;
	var personFound = false;
	
	var allObjects = getDeepListOfItemsInObject(data.player.location);
	for (var key in allObjects) {
		if(person === allObjects[key].name){
			peronFound = true;
			/*
			if(data[person].ask){
				con(JSON.stringify(data[person].ask));
				
				var tempask = data[person].ask.replace('(', '("'+subject+'"');
				
				eval(tempask);
				return [true, "OK"];
			}*/
			
			if(data[person].ask.hasOwnProperty(subject)){
				//log(data[person].ask[subject]);
				eval(data[person].ask[subject]);
				return [true, "OK"];
			}
			
			
			break;
		}
	}
	
	return [false, "no person"];
		
	
}

function useItem(obj, target){
	
	objFound = false;
	targetFound = false;
	
	if(!target || target === "self"){
		target = "player";
		targetFound = true;
	}
	
	var allObjects = getDeepListOfItemsInObject(data.player.location);
	
	for (var key in allObjects) {
		if(obj === allObjects[key].name){objFound = true;}
		if(target === allObjects[key].name){targetFound = true;}
		if(objFound && targetFound){break;}
	}
	
	// first check that the item is in inventory
	if(!objFound){
		var inv = [];
		inv = inventory("player", obj, ">=", 1);
		if(!inv[0]){
			return inv;
		}else{
			objFound = true;
		}
	}
	if(!targetFound){
		var inv = [];
		var inv = inventory("player", target, ">=", 1);
		if(!inv[0]){
			return inv;
		}else{
			targetFound = true;
		}
	}
	
	var success = false;
	
	if(objFound === true &&	targetFound === true){
		//if(!target){target = "player";}
		
		for (var key in data[target].use) {
			if(obj === key){
				success = true;
				eval(data[target].use[key]);
			}
		}
		for (var key in data[obj].use) {
			if(target === key){
				success = true;
				eval(data[obj].use[key]);
			}
		}
	}
	
	if(success){
		return [true, "OK"];
	}else{
		return [false, "no use"];
	}
	
	
}

// a simple true or false if the player has a certain item
function hasItem(obj){
	if(data.player.inventory.hasOwnProperty(obj)){
		return true;
	}
	return false;
}


function inventory(obj, item, action, amount, take, scenery){
	//con(obj + " | " + item + " | " + action + " | " + amount + " | " + take + " | " + scenery);
	// amount > 0 = add that amount
	// amount < 0 = remove that amount
	// amount = 0 remove all
	
	amount = parseInt(amount);
	
	// Check if the item exists
	if(!data.hasOwnProperty(item)){
		return [false, "no object"];
	}
	if(!data.hasOwnProperty(obj)){
		return [false, "no object"];
	}
	
	//Check if item exists or if enough
	if(action === ">="){
		
		// Check if the object has the item
		if(!data[obj].inventory.hasOwnProperty(item)){
			return [false, "not in inventory"];
		}
		var tmp = parseInt(data[obj].inventory[item][0]);
		if(tmp >= amount){
			return [true, tmp];
		}else{
			return [false, tmp];
		}
	}
	
	if(action === "+-"){
		if(amount !== 0){
			if(data[obj].inventory.hasOwnProperty(item)){
				var tmp = parseInt(data[obj].inventory[item][0]); // This avoids adding a number to a string
				tmp += amount;
				data[obj].inventory[item][0] = tmp;
				if(data[obj].inventory[item][0] < 1){
					delete data[obj].inventory[item];
					deEquipIfMissingInventory(obj); // Remove equipped items if no longer in inventory.
				}
			}else{
				if(amount > 0){
					if(!take){take = true;}
					if(!scenery){scenery = true;}
					data[obj].inventory[item] = [amount,take,scenery];
				}
			}
		}else{
			delete data[obj].inventory[item];
		}
		
		return [true, ""];
	}
	
	
	return [false, ""];
}

/*
Go through the obj list of equipment and remove any that does not exist in inventory
obj is mostly going to be "player"
*/
function deEquipIfMissingInventory(obj){
	for(var i = 0, max = data[obj].equipment.length; i < max; i++){
		if(data[obj].equipment[i] !== ""){
			var found = false;
			for (var key in data[obj].inventory) {
				if(data[obj].equipment[i] === key){
					found = true;
					break;
				}
			}
			if(!found){
				// item is no longer in inventory so remove the equiped item by seting it to ""
				if(obj === "player"){
					log(data[obj].equipment[i] + " has been removed from equipment.");
				}
				data[obj].equipment[i] = "";
			}
		}
	}
}

function updateInventoryItemValues(parent,obj,amount,take,scenery){
	if(parent){
		if(obj){
			if(amount !== ""){
				if(IsNaN(amount)){
					con("updateInventoryItemValue() failed - amount is not a number.");
				}else{
					data[parent].inventory[obj][0] = amount;
				}
			}
			if(take !== ""){
				if(take){
					data[parent].inventory[obj][1] = true;
				}else{
					data[parent].inventory[obj][1] = false;
				}
			}
			if(scenery !== ""){
				if(take){
					data[parent].inventory[obj][2] = false;
				}else{
					data[parent].inventory[obj][2] = true;
				}
			}
		}else{
			con("updateInventoryItemValue() failed - missing object/item.");
		}
	}else{
		con("updateInventoryItemValue() failed - missing parent.");
	}
}

function dropItem(obj, item, amount, location){
	if(!amount){amount = 1;}
	amount = parseInt(amount);
	if(data[obj].inventory.hasOwnProperty(item) ){
		if(amount > data[obj].inventory[item][0]){
			amount = data[obj].inventory[item][0];
		}
		inventory(obj, item, "+-", amount * -1);
		inventory(location, item, "+-", amount, true, false);
		return [true, ""];
	}
	return [false, "no item"];
}

function takeItem(obj, amount, ignoretakerule){
	// Only works in player location
	
	if(!amount){amount = 1;}
	amount = parseInt(amount);
	
	var items = getDeepListOfItemsInObject(data.player.location);
	
	for(var i = 0; i < items.length; i++){
		if(obj === items[i].name && (items[i].take === true || ignoretakerule )){
			
			// check to make sure there are enough items
			if(amount > items[i].amount){
				amount = items[i].amount;
			}
			
			// add he itme to player inventory
			inv = inventory("player", obj, "+-", amount);
			
			// remove item from object inventory
			inv = inventory(items[i].path, obj, "+-", amount * -1);
			
			
			return [true, ""];
			break;
		}else if(obj === items[i].name && items[i].take === false){
			// Object exists in room but Cannot be taken
			return [false, "no take"];
			break;
		}
		
	}
	
	return [false, "no exist"];
}

function commandoveride(c){
		eval(c);
}


// Returns a list of all items in an object/room including those inside other items
function getDeepListOfItemsInObject(obj, includeplayer){
	var ret=[];
	var listOfObjects = [];
	var check = [];
	var templist =[];
	
	if(includeplayer){
		listOfObjects[0] = "player";
		listOfObjects[1] = obj;
	}else{
		listOfObjects[0] = obj;
	}
	
	var  x = 0;
	ret[x] = {};
	//ret[x] = {"name":obj,"amount":null,"take":null,"scenery":null};
	
	for(var i = 0; i < listOfObjects.length; i++){
		check = getListOfItemsInObject(listOfObjects[i]);
		
		if(check){
			n=0;
			for (var prop in check) {
				
				ret[x] = {
					"name":check[prop].name,
					"amount":check[prop].amount,
					"take":check[prop].take,
					"scenery":check[prop].scenery,
					"hostility":check[prop].hostility,
					"path":check[prop].path
				};
				
				templist[n] = check[prop].name;
				
				x++;
				n++;
			}
			
			listOfObjects = arrayUnique(listOfObjects.concat(templist));
		}
	}
	
	return ret;
}

function getListOfItemsInObject(obj){
	
	var ret=[];
	
	if (!data.hasOwnProperty(obj)) { 
		con( obj + " is not defined as an object. In getListOfItemsInObject()");
	}else if (!data[obj].hasOwnProperty('inventory')) { 
		con( obj + " is missing the inventory property. In getListOfItemsInObject()");
	}
	
	var locinv = data[obj].inventory;
	
	var i = 0;
	for (var prop in locinv) {
		
		ret[i] = {};
		ret[i]["name"]= prop;
		ret[i]["amount"]= locinv[prop][0];
		ret[i]["take"]= locinv[prop][1];
		ret[i]["scenery"]= locinv[prop][2];
		ret[i]["hostility"]= data[prop].hostility;
		ret[i]["path"]= obj;
		
		i++;
	}
	
	return ret;
}

function mergeText(text, rep){
	return text.replace("##",rep);
}

function postlog(content){
	// ad stuff to the bottom of the log output. Good for combat.
	logstore = logstore + "<br>" + content;
}

function log(content, hidelog, release){
	
	if(content.indexOf( "notclickable" ) === -1 && content.indexOf( "af" ) === -1){
		content = "<span class='clickable'>"+content+"</span>";
	}else{
		
	}
	
	// Do not add a line break above the command
	var br = "<br />";
	if(release === true){br = "";}
	logstore = content +  br + logstore;
	
	if(!hidelog){
		// add stuff to the journal
		longlogstore = content +  br + longlogstore;
	}
	
	if(release){
		logstore = "<div class='turn'>" + logstore + "</div>"
		
		//logstore += "<br /><hr style='clear:both'>";
		$("#page").prepend(" ", logstore);
		if(!hidelog && longlogstore !== ""){
			// write to the journal
			longlogstore += "<br /><hr style='clear:both'>";
			data.gameVars.log = " " + longlogstore + data.gameVars.log;
		}
		
		logstore = "";
		longlogstore = "";
	}
	
	
}

function returnfocus(){
	// Return focus to command line
	$( "#command" ).val("");
	$( "#command" ).focus();
	
	// scroll to top
	$('html, #content').animate({scrollTop:0}, 'fast');
}

function splitcommand(command){
	
	// clean the command
	command = cleancommand(command);
	
	// translate command
	command = translatecommand(command);
	
	
	
	return command;
}

function translatecommand(command){
	
	
	// add a space at the end
	command = command + " ";
	
	var commandfound = false;
	
	commandlist = "eval | transport | debug | hit, attack, strike, fight | look, l, view, examine, inspect, look at, look in, look at the |drop| ask, talk | log | use, drink, eat | take, t, get, pick up | give, transfer | buy, purchase | sell, trade | open | close | switch on, turn on, start | switch off, turn off, stop | help, h, ? | inventory, i, inv | equipment, eq | save | load | restart | log | go, g, move | equip, put on | remove, dequip, take off";
	
	commandlist = commandlist.split("|");
	
	for (var i = 0; i < commandlist.length; i++) {
		commandlist[i] = commandlist[i].split(",");
		
		for (var n = 0; n < commandlist[i].length; n++) {
			commandlist[i][n] = $.trim(commandlist[i][n]);
			if(commandlist[i][n]){
				
				commandlist[i][n] = commandlist[i][n] + " ";
				
				if(typeof command.toLowerCase === "function" && command.toLowerCase().indexOf( commandlist[i][n] ) === 0 ){
					
					var foo=[];
					
					//command = command.substring(commandlist[i][n].length); 
					foo[1] = command.substring(commandlist[i][n].length); 
					
					//command = commandlist[i][0] + " " + command;
					foo[0] = commandlist[i][0];
					
					// if look then remove possible "at" and "at the"
					if(foo[0] === "look "){
						if(foo[1].indexOf( "at the " ) === 0 ){foo[1] = foo[1].substring("at the ".length);}
						if(foo[1].indexOf( "at " ) === 0 ){foo[1] = foo[1].substring("at ".length);}
						if(foo[1].indexOf( "the " ) === 0 ){foo[1] = foo[1].substring("the ".length);}
					}
					
					command = foo;
					
					commandfound = true;
					break;
				}
			}
		}
	}
	
	
	
	if(commandfound === false){
		
		var tempcommand = command;
		command = [];
		command[0] = "";
		command[1] = "";
		command[10] = "bad command";
		//command[1] = tempcommand;
		var temparr = tempcommand.split(" ");
		for(var i = 0; i < temparr.length; i++){
			if(i === 0){
				command[0] = temparr[i];
			}else{
				if(i > 0){command[1] += " ";}
				command[1] += temparr[i];
				
			}
		}
		command[1] = $.trim(command[1]);
		//con(command[0] + " | " + command[1] + " | " + command[10]);
		
	}else{
		command[0] = $.trim(command[0]);
		command[1] = $.trim(command[1]);
	}
	
	
	
	return command;
}

function cleancommand(command){
	
	// trim outside whitespace
	command = $.trim(command);
	
	// remove extra spaces within the command
	command = command.replace(/ +(?= )/g,'');
	
	// convert to lower case
	//command = command.toLowerCase();
	
	return command;
	
}


function runOnTurn(){
	var turnx = data.gameVars.turn;
	if (typeof(onTurn["turn"+turnx]) === "function") { 
		onTurn["turn"+turnx].call();
	}	
}


function gameVars(varName, varValue){
	if(data.gameVars.hasOwnProperty(varName)){
		if(varValue){
			data.gameVars[varName] = varValue;
			return;
		}else{
			return data.gameVars[varName];
		}
	}else{
		data.gameVars[varName] = varValue;
		return;
	}
}

function con(log){
	console.log(log);
}


// Compile all the objects with the main class and put them into data
function compileData(test){
	
	// Best way to clone (not give a new name to the same object) is to use jQuery extend or JSON.stringify:
	responses = jQuery.extend(true, {}, startdata.responses);
	options = jQuery.extend(true, {}, startdata.options);
	var objclass = jQuery.extend(true, {}, startdata.objects.class);
	turnTimer = jQuery.extend(true, {}, startdata.turnTimer);
	
	testdata = {};
	
	var tmp = jQuery.extend(true, {}, startdata);
	
	for (var key in startdata.objects) {
		
		if(!test){
			data[key] = tmp.objects[key];
			
			for (var prop in objclass) {
				if(data[key].hasOwnProperty(prop)){
				
				}else{	
					data[key][prop] = objclass[prop];
				}
			}
			
		}else{
			testdata[key] = tmp.objects[key];
			for (var prop in objclass) {
				if(testdata[key].hasOwnProperty(prop)){
				
				}else{	
					testdata[key][prop] = objclass[prop];
				}
			}
		}
			
	   
	}
}



function arrayUnique(array) {
	var a = array.concat();
	for(var i=0; i<a.length; ++i) {
		for(var j=i+1; j<a.length; ++j) {
			if(a[i] === a[j])
				a.splice(j--, 1);
		}
	}

	return a;
};



/*
* works out the character's level based on xp
*/
function calculateOverallLevel($amount){

	$txp = getPerOverallLevel();
	
	$cnt=0;
	do{
		$cnt++;
		$ret = $cnt;
	}while($cnt<500 && $amount > $txp[$cnt]);
	
	$ret = $ret - 1;
	if($ret < 1){$ret = 1;}
	if($ret > 150){$ret = 150;} // Cap level
	
	return $ret;

}

/*
* works out the character's skill level based on skill xp
*/
function calculateSkillLevel($amount){

	$sxp = getPerSkillLevel();
	
	$cnt=0;
	do{
		$cnt++;
		$ret = $cnt;
	}while($cnt<500 && $amount > $sxp[$cnt]);
	
	$ret = $ret - 1;
	if($ret < 1){$ret = 1;}
	if($ret > 100){$ret = 100;} // Cap level
	
	return $ret;

}

/*
* works out how much xp is required for the next overall level
*/
function overallLevelXpNeeded($xp){
	$nextxp = calculateOverallLevel($xp) + 1;
	$txp = getPerOverallLevel();
	
	$ret = $txp[$nextxp] - $xp + 1;
	return $ret;
}

/*
* works out how much xp is required for the next skill level
*/
function skillLevelXpNeeded($xp){

	$nextxp = calculateSkillLevel($xp) + 1;
	$sxp = getPerSkillLevel();
	
	$ret = $sxp[$nextxp] - $xp + 1;
	return $ret;
}

function getPerSkillLevel(){
	
	var $sxp = new Array();
	
	$sxp[1] = 10;
	$sxp[2] = 85;
	$sxp[3] = 287;
	$sxp[4] = 681;
	$sxp[5] = 1331;
	$sxp[6] = 2299;
	$sxp[7] = 3652;
	$sxp[8] = 5451;
	$sxp[9]	= 7762;
	$sxp[10] = 10648;
	$sxp[11] = 14172;
	$sxp[12] = 18399;
	$sxp[13] = 23393;
	$sxp[14] = 29218;
	$sxp[15] = 35937;
	$sxp[16] = 43614;
	$sxp[17] = 52313;
	$sxp[18] = 62099;
	$sxp[19] = 73034;
	$sxp[20] = 85184;
	$sxp[21] = 98611;
	$sxp[22] = 113379;
	$sxp[23] = 129554;
	$sxp[24] = 147197;
	$sxp[25] = 166375;
	$sxp[26] = 187149;
	$sxp[27] = 209584;
	$sxp[28] = 233744;
	$sxp[29] = 259694;
	$sxp[30] = 287496;
	$sxp[31] = 317214;
	$sxp[32] = 348913;
	$sxp[33] = 382657;
	$sxp[34] = 418508;
	$sxp[35] = 456533;
	$sxp[36] = 496793;
	$sxp[37] = 539353;
	$sxp[38] = 584277;
	$sxp[39] = 631628;
	$sxp[40] = 681472;
	$sxp[41] = 733870;
	$sxp[42] = 788889;
	$sxp[43] = 846590;
	$sxp[44] = 907039;
	$sxp[45] = 970299;
	$sxp[46] = 1036433;
	$sxp[47] = 1105507;
	$sxp[48] = 1177583;
	$sxp[49] = 1252726;
	$sxp[50] = 1331000;
	$sxp[51] = 1412467;
	$sxp[52] = 1497193;
	$sxp[53] = 1585242;
	$sxp[54] = 1676676;
	$sxp[55] = 1771561;
	$sxp[56] = 1869959;
	$sxp[57] = 1971935;
	$sxp[58] = 2077552;
	$sxp[59] = 2186875;
	$sxp[60] = 2299968;
	$sxp[61] = 2416893;
	$sxp[62] = 2537716;
	$sxp[63] = 2662500;
	$sxp[64] = 2791309;
	$sxp[65] = 2924207;
	$sxp[66] = 3061257;
	$sxp[67] = 3202524;
	$sxp[68] = 3348071;
	$sxp[69] = 3497963;
	$sxp[70] = 3652264;
	$sxp[71] = 3811036;
	$sxp[72] = 3974344;
	$sxp[73] = 4142253;
	$sxp[74] = 4314825;
	$sxp[75] = 4492125;
	$sxp[76] = 4674216;
	$sxp[77] = 4861163;
	$sxp[78] = 5053029;
	$sxp[79] = 5249879;
	$sxp[80] = 5451776;
	$sxp[81] = 5658783;
	$sxp[82] = 5870966;
	$sxp[83] = 6088387;
	$sxp[84] = 6311112;
	$sxp[85] = 6539203;
	$sxp[86] = 6772724;
	$sxp[87] = 7011739;
	$sxp[88] = 7256313;
	$sxp[89] = 7506509;
	$sxp[90] = 7762392;
	$sxp[91] = 8024024;
	$sxp[92] = 8291469;
	$sxp[93] = 8564793;
	$sxp[94] = 8844058;
	$sxp[95] = 9129329;
	$sxp[96] = 9420668;
	$sxp[97] = 9718142;
	$sxp[98] = 10021812;
	$sxp[99] = 10331743;
	$sxp[100] = 10648000;
	$sxp[101] =	11678301;
	$sxp[102] =	12739509;
	$sxp[103] =	13832236;
	$sxp[104] =	14957100;
	$sxp[105] =	16114725;
	$sxp[106] = 17305741;
	$sxp[107] = 18530784;
	$sxp[108] = 19790496;
	$sxp[109] = 21085525;
	$sxp[110] = 22416525;
	$sxp[111] = 23784156;
	$sxp[112] = 25189084;
	$sxp[113] = 26631981;
	$sxp[114] = 28113525;
	$sxp[115] = 29634400;
	$sxp[116] = 31195296;
	$sxp[117] = 32796909;
	$sxp[118] = 34439941;
	$sxp[119] = 36125100;
	$sxp[120] = 37853100;
	$sxp[121] = 39624661;
	$sxp[122] = 41440509;
	$sxp[123] = 43301376;
	$sxp[124] = 45208000;
	$sxp[125] = 47161125;
	$sxp[126] = 49161501;
	$sxp[127] = 51209884;
	$sxp[128] = 53307036;
	$sxp[129] = 55453725;
	$sxp[130] = 57650725;
	$sxp[131] = 59898816;
	$sxp[132] = 62198784;
	$sxp[133] = 64551421;
	$sxp[134] = 66957525;
	$sxp[135] = 69417900;
	$sxp[136] = 71933356;
	$sxp[137] = 74504709;
	$sxp[138] = 77132781;
	$sxp[139] = 79818400;
	$sxp[140] = 82562400;
	$sxp[141] = 85365621;
	$sxp[142] = 88228909;
	$sxp[143] = 91153116;
	$sxp[144] = 94139100;
	$sxp[145] = 97187725;
	$sxp[146] = 100299861;
	$sxp[147] = 103476384;
	$sxp[148] = 106718176;
	$sxp[149] = 110026125;
	$sxp[150] = 113401125;
	
	return $sxp;
}

function getPerOverallLevel(){
	
	var $txp = new Array();
	
	$txp[1] = 0;
	$txp[2] = 300;
	$txp[3] = 700;
	$txp[4] = 1200;
	$txp[5] = 2000;
	$txp[6] = 3000;
	$txp[7] = 5511;
	$txp[8] = 8678;
	$txp[9] = 12952;
	$txp[10] = 18532;
	$txp[11] = 25624;
	$txp[12] = 34446;
	$txp[13] = 45220;
	$txp[14] = 58178;
	$txp[15] = 73559;
	$txp[16] = 91608;
	$txp[17] = 112577;
	$txp[18] = 136726;
	$txp[19] = 164319;
	$txp[20] = 195626;
	$txp[21] = 230925;
	$txp[22] = 270497;
	$txp[23] = 314630;
	$txp[24] = 363617;
	$txp[25] = 417755;
	$txp[26] = 477348;
	$txp[27] = 542704;
	$txp[28] = 614134;
	$txp[29] = 691957;
	$txp[30] = 776495;
	$txp[31] = 868073;
	$txp[32] = 967022;
	$txp[33] = 1073677;
	$txp[34] = 1188378;
	$txp[35] = 1311468;
	$txp[36] = 1443294;
	$txp[37] = 1584208;
	$txp[38] = 1734565;
	$txp[39] = 1894724;
	$txp[40] = 2065049;
	$txp[41] = 2245906;
	$txp[42] = 2437665;
	$txp[43] = 2709791;
	$txp[44] = 3012057;
	$txp[45] = 3340093;
	$txp[46] = 3695447;
	$txp[47] = 4079727;
	$txp[48] = 4494596;
	$txp[49] = 4941775;
	$txp[50] = 5423042;
	$txp[51] = 5940237;
	$txp[52] = 6495257;
	$txp[53] = 7090061;
	$txp[54] = 7726669;
	$txp[55] = 8407161;
	$txp[56] = 9133683;
	$txp[57] = 9908441;
	$txp[58] = 10733708;
	$txp[59] = 11611819;
	$txp[60] = 12545176;
	$txp[61] = 13536246;
	$txp[62] = 14587564;
	$txp[63] = 15701731;
	$txp[64] = 16881417;
	$txp[65] = 18129359;
	$txp[66] = 19448366;
	$txp[67] = 20841314;
	$txp[68] = 22311153;
	$txp[69] = 23860900;
	$txp[70] = 25493649;
	$txp[71] = 27212561;
	$txp[72] = 29020874;
	$txp[73] = 30921900;
	$txp[74] = 32919022;
	$txp[75] = 35015701;
	$txp[76] = 37215472;
	$txp[77] = 39521949;
	$txp[78] = 41938818;
	$txp[79] = 44469847;
	$txp[80] = 47118879;
	$txp[81] = 49889839;
	$txp[82] = 52786727;
	$txp[83] = 55813626;
	$txp[84] = 58974699;
	$txp[85] = 62274188;
	$txp[86] = 65716419;
	$txp[87] = 69305799;
	$txp[88] = 73046819;
	$txp[89] = 76944051;
	$txp[90] = 81002152;
	$txp[91] = 85225866;
	$txp[92] = 89620017;
	$txp[93] = 94189519;
	$txp[94] = 98939370;
	$txp[95] = 103874656;
	$txp[96] = 109000550;
	$txp[97] = 114322311;
	$txp[98] = 119845288;
	$txp[99] = 125574920;
	$txp[100] = 131516734;
	$txp[101] = 137676348;
	$txp[102] = 144059468;
	$txp[103] = 150671895;
	$txp[104] = 157519519;
	$txp[105] = 164608324;
	$txp[106] = 171944385;
	$txp[107] = 179533871;
	$txp[108] = 187383045;
	$txp[109] = 195498265;
	$txp[110] = 203885983;
	$txp[111] = 212552746;
	$txp[112] = 221505198;
	$txp[113] = 230750079;
	$txp[114] = 240294225;
	$txp[115] = 250144572;
	$txp[116] = 260308151;
	$txp[117] = 270792095;
	$txp[118] = 281603632;
	$txp[119] = 292750092;
	$txp[120] = 304238905;
	$txp[121] = 316077602;
	$txp[122] = 328273812;
	$txp[123] = 340835271;
	$txp[124] = 353769811;
	$txp[125] = 367085371;
	$txp[126] = 380789992;
	$txp[127] = 394891817;
	$txp[128] = 409399095;
	$txp[129] = 424320179;
	$txp[130] = 439663526;
	$txp[131] = 455437700;
	$txp[132] = 471651371;
	$txp[133] = 488313315;
	$txp[134] = 505432414;
	$txp[135] = 523017660;
	$txp[136] = 541078150;
	$txp[137] = 559623092;
	$txp[138] = 578661802;
	$txp[139] = 598203706;
	$txp[140] = 618258338;
	$txp[141] = 638835345;
	$txp[142] = 659944482;
	$txp[143] = 681595619;
	$txp[144] = 703798735;
	$txp[145] = 726563921;
	$txp[146] = 749901383;
	$txp[147] = 773821439;
	$txp[148] = 798334521;
	$txp[149] = 823451174;
	$txp[150] = 8491820585;	
	
	return $txp;
}





function restartTheGame(){
	$("#page").html("");
	
	data = jQuery.extend(true, {}, Sdata);
	
	runcommand("look");
	
	
	returnfocus();
	
	
	
}

window.addEventListener("load", restartTheGame, true); // Wait till all the scripts have loaded
//restartTheGame();
//


//////////////////////////////////////////




