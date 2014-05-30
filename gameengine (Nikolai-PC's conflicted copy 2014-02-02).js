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
	//con("clicked: " + $('#command').val());
	var comval = $('#command').val();
	var addtext = $.trim($( this ).text());
	comval += " " + addtext + " ";
	comval = comval.replace(/ +(?= )/g,''); // remove extra spaces
	if(comval[0] === " "){comval = comval.substring(1);} // remove first space
	$('#command').val(comval);
	$( "#command" ).focus();
	
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

$(".clickable").click(function() {
	
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
				}
				
				if(data[data.player.location].look !== ""){
					//con(data[data.player.location].look);
					eval(data[data.player.location].look);
				}else{
					showDescription(data.player.location);
				}
				log("<span class='lightblue'>Location: " + data.player.location + "</span>");
				
				return;
			}
			
			if(command[1]){
				
				var cansee = "";
				/*
				var listofitems = getDeepListOfItemsInObject(data.player.location, true);
				//var altItems = [];
				//con(JSON.stringify(listofitems));
				
				for(var i = 0; i < listofitems.length; i++){
					if(listofitems[i].name === command[1]){
						cansee = command[1];
						break;
					}
				}
				*/
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
		if(command[0] === "hit"){
			if(command[1]){
				
			}else{
				log("Try: 'hit [enemy name]'", true);
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
					log("That did not work. Try: go door name.");
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
			
			drop = dropItem(command[1], parseInt(command[2]));
			
			if(drop[0] === true){
				log("You drop it.");
				return;
			}else{
				log("You have no such item to drop.", true);
				return true;
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
				
				log("You take the " + command[1] + " " + command[2] + ".");
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
				log("Who to? Try: sell (name of merchant) for a list of goods.", true);
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
					log(listitems[1], true);
					return true;
				}
			}else{
				log("Who from? Try: buy (name of merchant) for a list of goods.", true);
				return true;
			}
		}
		
		if(command[0] === "inventory"){
		
			for (var key in data.player.inventory) {
				//var obj = startdata.objects[key];
				log(key + " x " + data.player.inventory[key][0], true);
			}
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
			
			split = command[1] .split(" on ");
			var used = [];
			used = useItem(split[0], split[1]);
			
			if(!used[0]){
				listAltItems(split[0]);
				listAltItems(split[1]);
				
				//if(used[1] === "no object"){
					log("That did not work.", true);
					return true;
				//}
				
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
			
			split = command[1] .split(" about ");
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

function isInPlayerLocation(obj){
	var listofitems = getDeepListOfItemsInObject(data.player.location, true);
	
	for(var i = 0; i < listofitems.length; i++){
		if(listofitems[i].name === obj){
			return true;
		}
	}
	
	return false;
}

function showDescription(cansee){
	log(data[cansee].description);
	
	// Place image if there is one
	if(data[cansee].image !== ""){
		log('<img src="img/' + data[cansee].image + '" style="float:right; padding-left:5px; padding-bottom:5px" />');
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
			found++;
			if(i > 0){
				list = list + " ";
			}
			var danger = "";
			if(data[objs[i].name].hostility === 100){danger = "danger";}
			var img = "<img src='img/" + data[objs[i].name].image + "' class='thumbnail'>";
			list += "<a href='#' class='af "+danger+"'><div style='display:inline; white-space:nowrap;'>"+img+" <span class='af "+danger+"'>" + objs[i].name + "</span></div></a>";
			if(objs[i].amount > 1){
				list += " x " + objs[i].amount;
			}
		}
	}
	
	
	
	if(found === 0){
		list = "";
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
						
						return ["success", "You buy " + amount + " X " + item + " for " + totalCost + " gold coins."];
						
					}else{
						return ["fail", "You do not have enough gold. You need " + totalCost + " gold coins."];
					}
				}else{
					return ["fail", merchant + " does not have enough stock."];
				}
			}
		}
		return ["fail", "That item does not seem to be for sale."];
	}
	
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
			return ["fail", "There is no such merchant."];
		}
	}
	
	var merchantType = data[merchant].merchant;
	if(!merchantType){
		return ["fail", "not a merchant"];
	}
	
	log("<span class='tips'>To buy an item use: buy (item) (amount) from (merchant name)</span>");
	
	// take the types of items the merchant sells and compare them to his inventory. List matches.
	var listofitems = getListOfItemsInObject(merchant);
	var count = 0;
	for(var i = 0, max = merchantType.length; i < max; i++){
		for(var n = 0, max2 = listofitems.length; n < max2; n++){
			//con(data[listofitems[n].name].equiptype + " | " + );
			if(data[listofitems[n].name].equiptype === merchantType[i]){
				log(listofitems[n].amount + " X " +listofitems[n].name + " " + data[listofitems[n].name].value + " gold");
				count++;
			}
			
		}
	}
	if(count === 0){log(merchant + " has nothing for sale.");}
}

function listAltItems(item){
	var listofitems = getDeepListOfItemsInObject(data.player.location, true);
	for(var i = 0; i < listofitems.length; i++){
		if(data[listofitems[i].name].alt.indexOf(item) >= 0 || data[listofitems[i].name].alt.indexOf(item.toLowerCase()) >= 0){			
			log("<span class='tips'>Did you mean " + listofitems[i].name + "?</span>");
		}
	}
}

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
			var enemy = listOfObjects[key].name;
			var level = data[enemy].level;
			var damage = data[enemy].damage;
			var totaldamage = 0;
			
			// get damage
			if(data[enemy].damage === "auto"){
				totaldamage = level;
				totaldamage += Math.floor(Math.random()*level)+1;
			}else{
				totaldamage = damage;
				totaldamage += Math.floor(Math.random()*damage)+1;
			}
			
			var totalprotection = getPlayerProtection();
			var finaldamage = totaldamage - (Math.floor(Math.random()*(totalprotection+1))+0);
			if(finaldamage < 0){finaldamage = 0;}
			//con(finaldamage);
			
			var img = "<img src='img/png.png' class='thumbnail'> ";
			if(data[enemy].image !== ""){img = "<img src='img/" + data[enemy].image + "' class='thumbnail'> "};
			
			
			if(finaldamage > 0){
				data.player.hits -= finaldamage;
				if(data.player.hits <= 0){
					data.player.hits = 0;
					postlog("You have been killed!");
					restartTheGame();
				}
				postlog(img + enemy + " attacks you doing " + finaldamage + " damage.");
			}else{
				postlog(img + enemy + " attacks you but misses.");
			}
			
		}
	}
}

// check to see if any objects/characters are hostile = 100. If so they get an attack each on the player
function attackEnemy(enemy){
	
	var returnlog = "";
	
	if(data.gameVars.turn === 0 ){
		return; // no attacks of first turn
	}
	
	listOfObjects = getDeepListOfItemsInObject(data.player.location);
	for (var key in listOfObjects) {
		if(listOfObjects[key].hostility === 100){
			// Found a hostile. Attack player or henchman
			var enemy = listOfObjects[key].name;
			var level = data[enemy].level;
			var damage = data[enemy].damage;
			var totaldamage = 0;
			
			// get damage
			if(data[enemy].damage === "auto"){
				totaldamage = level;
				totaldamage += Math.floor(Math.random()*level)+1;
			}else{
				totaldamage = damage;
				totaldamage += Math.floor(Math.random()*damage)+1;
			}
			
			var totalprotection = getPlayerProtection();
			var finaldamage = totaldamage - (Math.floor(Math.random()*(totalprotection+1))+0);
			if(finaldamage < 0){finaldamage = 0;}
			//con(finaldamage);
			
			var img = "<img src='img/png.png' class='thumbnail'> ";
			if(data[enemy].image !== ""){img = "<img src='img/" + data[enemy].image + "' class='thumbnail'> "};
			
			
			if(finaldamage > 0){
				data.player.hits -= finaldamage;
				if(data.player.hits <= 0){
					data.player.hits = 0;
					log("You have been killed!");
					restartTheGame();
				}
				log(img + enemy + " attacks you doing " + finaldamage + " damage.");
			}else{
				log(img + enemy + " attacks you but misses.");
			}
			
		}
	}
}


function getPlayerProtection(){
	// This returns the total of the player's protection based on all equipment
	var equipment = data.player.equipment;
	var protection = 0;
	for(var i = 0, max = equipment.length; i < max; i++){
		if(data.hasOwnProperty(equipment[i])){
			protection += data[equipment[i]].protection;
		}
	}
	return protection;
}

function getPlayerDamage(){
	// This returns the total of the player's damage based on all equipment
	var equipment = data.player.equipment;
	var damage = 0;
	for(var i = 0, max = equipment.length; i < max; i++){
		if(data.hasOwnProperty(equipment[i])){
			damage += data[equipment[i]].damage;
		}
	}
	return damage;
}



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
	
	if(!target){targetFound = true;}
	
	var allObjects = getDeepListOfItemsInObject(data.player.location);
	
	for (var key in allObjects) {
		
		if(obj === allObjects[key].name){objFound = true;}
		if(target === allObjects[key].name){targetFound = true;}
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
		if(!target){target = "player";}
		
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

function dropItem(obj, amount){
	if(!amount){amount = 1;}
	amount = parseInt(amount);
	if(data.player.inventory.hasOwnProperty(obj) ){
		if(amount > data.player.inventory[obj][0]){
			amount = data.player.inventory[obj][0];
		}
		;
		inventory("player", obj, "+-", amount * -1);
		inventory(data.player.location, obj, "+-", amount, true, false);
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
	
	return "no exist";
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
	
	logstore = content + "<br>" + logstore;
	if(!hidelog){
		// add stuff to the journal
		longlogstore = content + "<br>" + longlogstore;
	}
	
	if(release){
		logstore += "<hr style='clear:both'>";
		$("#page").prepend(" ", logstore);
		
		if(!hidelog && longlogstore !== ""){
			// write to the journal
			longlogstore += "<hr style='clear:both'>";
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
	
	commandlist = "eval | transport | debug | hit, attack, strike, fight | look, l, view, examine, inspect, look at, look in, look at the |drop| ask, talk | log | use, drink, eat | take, t, get, pick up | give, transfer | buy, purchase | sell, trade | open | close | switch on, turn on, start | switch off, turn off, stop | help, h, ? | inventory, i, inv | equipment, eq | save | load | restart | log | go, g, move | equip, put on | dequip, take off";
	
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



function restartTheGame(){
	$("#page").html("");
	//data = {};
	data = jQuery.extend(true, {}, Sdata);
	//responses = {};
	//options = {};
	//compileData();
	runcommand("look");
	
	
	returnfocus();
	
	
	
}

window.addEventListener("load", restartTheGame, true); // Wait till all the scripts have loaded
//restartTheGame();
//


//////////////////////////////////////////




