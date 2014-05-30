/*

TODO:

*remove "?" from auto fill selection

NOTES:

* Commands are always lower case. Command attributes can be any case


*/

// Set global vars
data = {};
responses = {};
options = {};

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
	comval += addtext + " ";
	
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
	
	log("<hr>");
	
	tempcommand = command;
	command = splitcommand(command);
	
	
	
	executecommand(command);
	
	if(!command[2]){command[2] = "";}
	if(!command[3]){command[3] = "";}
	
	
	log("<span class='commandonpage'>" + options.precommandhtml + "<a href='#' class='af '><span class='commandonpage'>" + command[0] + " " + command[1] + " " + command[2] + " " + command[3] + "</span></a>" + options.postcommandhtml + "</span>");
	
}

function listObjectInventory(obj){
	//var objs = data[loc].inventory;
	objs = [];
	objs = getListOfItemsInObject(obj)
	var found = 0;
	var list = "";
	
	for(var i = 0; i < objs.length; i++){
		if(objs[i].name && objs[i].scenery === false){
			found++;
			if(i > 0){
				list = list + " | ";
			}
			list += "<a href='#' class='af'>" + objs[i].name + "</a>";
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

function executecommand(command){

	var override = false;
	
	
	
	// first check object to see if default command has been overidden or new ones added
	if(command[1]){
		if (data.hasOwnProperty(command[1])) { 
			if (data[command[1]].hasOwnProperty("commandoverride")) { 
				if (data[command[1]].commandoverride.hasOwnProperty(command[0])) {
					commandoveride(data[command[1]].commandoverride[command[0]]);
					override = true;
				}
			}
		}
	}else{
		// Check on self/player
		if (data.player.commandoverride.hasOwnProperty(command[0])) {
			commandoveride(data.player.commandoverride[command[0]]);
			override = true;
		}
	}
	
	if(override === false){
		
		if(command[10] === "bad command"){
			log(responses.commandfail);
			//log("<span class='commandonpagefail'>" + options.precommandhtml + tempcommand + options.postcommandhtml + "</span>");
			return;
		}
		
		if(command[0] === "look"){
			if(!command[1]){
				
				// print objects that are not scenery
				var list = listObjectInventory(data.player.location);
				if(list){
					log(list);
				}
				
				log(data[data.player.location].descriptionmore);
				log(data[data.player.location].description);
				log("<spav class='lightblue'>Location: " + data.player.location + "</span>");
				
			}
			
			if(command[1]){
				
				var cansee = "";
				
				var listofitems = getDeepListOfItemsInObject(data.player.location);
				var altItems = [];
				//con(JSON.stringify(listofitems));
				
				for(var i = 0; i < listofitems.length; i++){
					if(listofitems[i].name === command[1]){
						cansee = command[1];
						//con(JSON.stringify(listofitems));
						break;
					}
					
					//if(listofitems[i].name !== command[1] && listofitems[i].scenery === false){
					//if(listofitems[i].name !== command[1]){
						//altItems.push(listofitems[i].name);
					//}
				}
				
				// TODO: See if in inventory
				
				if(cansee){
					
					var list = listObjectInventory(cansee);
					if(list){
						log(list);
					}
					
					log(data[cansee].description);
				}else{
					
					// Cannot see the item
					
					listAltItems(command[1]);
					
					log(mergeText(responses.cannotsee, command[1]));
					
				}
			}
			
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
			
			drop = dropItem(command[1], command[2]);
			
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
			
			//con("A: " + command[1]);
			
			
			cantake = takeItem(command[1], command[2]);
			
			if(command[2] === 1){command[2] = "";} // no need to show "1" in the log
			
			/*
			success
			no take
			no exist
			*/
			
			if(cantake === "success"){
				
				if(data.hasOwnProperty(command[1])){
					if(data[command[1]].takesuccess !== ""){
						eval(data[command[1]].takesuccess);
						return;
					}
				}
				
				log("You take the " + command[1] + " " + command[2] + ".");
				
			}else{
				
				if(cantake === "no take"){
					if(data.hasOwnProperty(command[1])){
						if(data[command[1]].takefail !== ""){
							eval(data[command[1]].takefail);
							return;
						}
					}
				}
				listAltItems(command[1]);
				log("You can't take that.");
				
			}
			
		}
		
		if(command[0] === "inventory"){
		
			for (var key in data.player.inventory) {
				//var obj = startdata.objects[key];
				log(key + " x " + data.player.inventory[key][0]);
			}
		}
		
		if(command[0] === "use"){
			if(!command[1]){
				log("That did not work. Use something or use something on/in/with something else. Example: use key in door.");
				return;
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
					log("That did not work.");
				//}
				
			}
			
		}
		
		if(command[0] === "ask"){
			if(!command[1]){
				log("That did not work. Ask somebody about something. Example: ask Roger about shoe.");
				return;
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
				//}
			}
			
		}
		
		if(command[0] === "restart" && command[1] === "game"){
			restartTheGame();
		}
		
		if(command[0] === "help"){
			log("look, take, use");
			log("restart game - restarts the whole game from the start.");
		}
		
		
	}
	
}

function listAltItems(item){
	var listofitems = getDeepListOfItemsInObject(data.player.location, true);
	var altItems = [];
	for(var i = 0; i < listofitems.length; i++){		
		if(data[listofitems[i].name].alt === item){
			log("<span class='altitems'>Did you mean " + data[listofitems[i].name].name + "?</span>");
		}
	}
}

function addObjectToInventory(target,object,amount,take,scenery){
	if(data[target].inventory.hasOwnProperty(object)){
		data[target].inventory[object][0] += amount;
	}else{
		data[target].inventory[object] = [];
		data[target].inventory[object][0] = amount;
	}
	data[target].inventory[object][1] = take;
	data[target].inventory[object][2] = scenery;
}

function askAbout(person, subject){
	
	var success = false;
	var personFound = false;
	
	var allObjects = getDeepListOfItemsInObject(data.player.location);
	for (var key in allObjects) {
		if(person === allObjects[key].name){
			peronFound = true;
			
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
	//con(JSON.stringify(ff[0]));
	for (var key in allObjects) {
		//con(allObjects[key].name);
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


function inventory(obj, item, action, amount){
	
	// Check if the item exists
	if(!data.hasOwnProperty(item)){
		return [false, "no object"];
	}
	if(!data.hasOwnProperty(obj)){
		return [false, "no object"];
	}
	
	if(action === ">="){
		// Check if the object has the item
		if(!data[obj].inventory.hasOwnProperty(item)){
			return [false, "not in inventory"];
		}
		if(data[obj].inventory[item][0] >= amount){
			return [true, ""];
		}else{
			return [false, "not enough"];
		}
	}
	
	if(action === "+-"){
		if(data[obj].inventory.hasOwnProperty(item)){
			data[obj].inventory[item][0] += amount;
			if(data[obj].inventory[item][0] < 1){
				delete data[obj].inventory[item];
			}
		}else{
			if(amount > 0){
				data[obj].inventory[item] = [amount,false,true];
			}
		}
		
		return [true, ""];
	}
	
	
	return;
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
					data[parent].inventory[obj][2] = true;
				}else{
					data[parent].inventory[obj][2] = false;
				}
			}
		}else{
			con("updateInventoryItemValue() failed - missing object/item.");
		}
	}else{
		con("updateInventoryItemValue() failed - missing parent.");
	}
	
}



function takeItem(obj, amount, ignoretakerule){
	// Only works in player location
	
	if(!amount){amount = 1;}
	
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
			
			
			return "success";
			break;
		}else if(obj === items[i].name && items[i].take === false){
			// Object exists in room but Cannot be taken
			return "no take";
			break;
		}
		
	}
	
	return "no exist";
}

function commandoveride(c){
		eval(c);
}


// Returns a list of all items in an object/room including those inside other items
function getDeepListOfItemsInObject(obj, includeinv){
	var ret=[];
	var listOfObjects = [];
	var check = [];
	var templist =[];
	
	if(includeinv){
		listOfObjects[0] = "player";
		listOfObjects[1] = obj;
	}else{
		listOfObjects[0] = obj;
	}
	
	var  x = 0;
	ret[x] = {};
	ret[x] = {"name":obj,"amount":null,"take":null,"scenery":null};
	
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
		ret[i]["path"]= data[obj].name;
		//ret[i]["path"]= data[obj];
		//con(JSON.stringify(ret[i]["path"]));
		
		i++;
	}
	//con("A: " + JSON.stringify(ret));
	return ret;
}

function mergeText(text, rep){
	return text.replace("##",rep);
}



function log(content, nlb){
	if(nlb){
		$("#page").append(content);
	}else{
		$("#page").prepend("<br>", content);
	}
}

function returnfocus(){
	// Return focus to command line
	$( "#command" ).val("");
	$( "#command" ).focus();
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
	
	commandlist = "look, l, view, examine, inspect, look at, look in | ask, talk | log | use | take, t, get, pick up | give, transfer | buy, purchase | sell, trade | open | close | switch on, turn on, start | switch off, turn off, stop | help, h, ? | inventory, i, inv | equipment, eq | save | load | restart | north, n | east, e | south, s | west, w | up, u | down, d | equip, put on | dequip, take off";
	
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


function con(log){
	console.log(log);
}


// Compile all the objects with the main class and put them into data
function compileData(){
	
	// Best way to clone (not give a new name to the same object) is to use jQuery extend:
	responses = jQuery.extend(true, {}, startdata.responses);
	options = jQuery.extend(true, {}, startdata.options);
	var objclass = jQuery.extend(true, {}, startdata.objects.class);
	
	var tmp = jQuery.extend(true, {}, startdata);
	
	for (var key in startdata.objects) {
	   
	   data[key] = tmp.objects[key];
	   if(data[key].name){
	   
			for (var prop in objclass) {
				if(data[key].hasOwnProperty(prop)){
					
				}else{
					
					data[key][prop] = objclass[prop];
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
	data = {};
	responses = {};
	options = {};
	compileData();
	runcommand("look");
	
	returnfocus();
}


restartTheGame();



//localStorage.game1 = JSON.stringify(data);

//con(localStorage.test[0]);

