/*
updateInventoryItemValues("Ben","snapping teeth","",true,"");
delete data.block.commandoverride.take;
addObjectToInventory("dungeon cell","string",1,true,false);
removeObjectFromInventory("dungeon cell","string",1,true,true); // the last true, true is to search deep and include player	
hasItem(obj) // Check if player has an item, true or false
takeItem("snapping teeth", 1, true); // object, amount, ignore take rule
gameVars("gotCellKeys", 33) // get or return game variables set by creator
showDescription("Abale");
isInPlayerLocation(obj) // true/false. Checks if the item is in the player location. Includes deep search of location.
isInCombat() // returns true or false
getPlayerProtection() // This returns the total of the player's protection based on all equipment
getPlayerDamage() // This returns the total of the player's damage based on all equipment
deEquipIfMissingInventory(obj); // Remove equipped items if no longer in inventory. obj = character/player/any object with equipment
removeItem(item/type) // removes an item of equipment from the player by name or type
euipItem(item) // equips an item if in inventory and it can be equipped
canTake(obj) Checks if the player can take an item. Must also be in the same location. returns true or false.
*/

///////////////////////////////////////////// ON TURN //////////////////////////////////////////

var onTurn = {};
onTurn.turn1 = function(){ // First introduction
	log(" ");
	log("<h1>Dicing Dangers</h1>\
	Welcome introduction\
	<br>Dicing Dangers Text Adventure");
}


//////////////////////////////////////// dd Functions /////////////////////////////////////////
// Used for made up commands. 
// Overides ALL other commands. 
// Always runs first. 
// return false allows continued commands check
var dd = {};

dd.hello_dong = function(){
	log("YOU SAID HELLO DONG");
	return true; // true = stop continued checks.
}

dd.take_Ben = function(){
	log('"Put me down!"', true);
	return false; // true = stop continued checks.
}

dd.look_mortar = function(){
	log('Messy stuff. Not very interesting though.');
	return true; // true = stop continued checks.
}
/////////////////////////////////////////// Abale //////////////////////////////////////////////

look_Abale = function(){
	//if(!lookAt){return;}
	if(data.Abale.looks === 1){
		log("The man reminds you of a smiling bear.");
	}
	
	showDescription("Abale");
}

ask_Abale = function(q){
	q = q.toLowerCase();
	
	if(q === "grin" || q === "smile"){
		log('\"It is a smile, not a grin. I smile because I like to see customers, and the gold coins they bring.\"');
		return;
	}
	if(q === "weapon" || q === "weapons"){
		log('\"I sell weapons and I sell armour. If you want to buy something, just say buy Abale. You can say sell too.\"');
		return;
	}
	if(q === "armour" || q === "armor"){
		log('\"I sell armour and I sell weapons. If you want to know what I have in stock, just say buy Abale. You can say sell too.\"');
		return;
	}
	if(q === "beard"){
		log('\"Real men have beards!\"');
		return;
	}
	log('\"I would not know about that.\"');
}


/////////////////////////////////////////// Ben //////////////////////////////////////////////

look_Ben = function(){
	
	var gotSnappingTeeth = gameVars('gotSnappingTeeth'); 
	if(!gotSnappingTeeth){
		log('An old man, skinny and half naked. His hair and beard are long and white. He looks fed up. He must be the skinniest man you have ever seen, but, oddly, he has a full set of perfectly white snapping teeth.')
	}else{
		log('An old man, skinny and half naked. His hair and beard are long and white. He looks fed up. He must be the skinniest man you have ever seen.')
	}
	//showDescription("Ben");
}

ask_Ben = function(q){
	q = q.toLowerCase();
	
	if(q === "grin" || q === "smile"){
		log('\"It is a smile, not a grin. I smile because I like to see customers, and the gold coins they bring.\"');
		return;
	}
	if(q === "weapon" || q === "weapons"){
		log('\"I sell weapons and I sell armour. If you want to buy something, just say buy Abale. You can say sell too.\"');
		return;
	}
	if(q === "armour" || q === "armor"){
		log('\"I sell armour and I sell weapons. If you want to know what I have in stock, just say buy Abale. You can say sell too.\"');
		return;
	}
	if(q === "beard"){
		log('\"Real men have beards!\"');
		return;
	}
	log('\"I would not know about that.\"');
}


/////////////////////////////////////////// Cell Door //////////////////////////////////////////////

look_cell_door = function(){
	if(gameVars('gotCellKeys') !== true){
		log('A large, wooden cell door with a small open window for food. Beyond it you can see a dungeon passage and a set of cell keys on the far wall.');
	}else{
		log('A large, wooden cell door with a small open window for food. Beyond it you can see a dungeon passage.');
	}
}

/////////////////////////////////////////// Cell Door //////////////////////////////////////////////

look_smithy_door = function(){
	if(data.player.location==='nerlan market'){
		log('A stout wooden door with the word WEAPONS & ARMOUR on it.');
	}else{
		log('A stout wooden door.');
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////


// Use the rusty nail on the block
function DC_useRustyNailOnBlock(){
	log("Using the rusty nail, you manage to scrape away the mortar from the block.");
	data["dungeon cell"].inventory.block[1] = true;		// Free the block
}

// Ask Ben about snapping teeth
function DC_askBenAboutSnappingTeeth(){
	var DC_gotSnappingTeeth = gameVars("DC_gotSnappingTeeth");
	if(!DC_gotSnappingTeeth){
		log('"They was given me by a lady friend long ago when I lost my last tooth", says Ben with a toothy smile. "Not much good to me in here though. All we get is grey sludge to eat. I only put them in for guests. Here, take them if you like." He gives them to you.');
		takeItem("snapping teeth", 1, true);
		gameVars("DC_gotSnappingTeeth", true);
	}else{
		log('"They was given me by a lady friend long ago when I lost my last tooth", says Ben, all gums now. "Not much good to me in here though. All we get is grey sludge to eat. I only put them in for guests. I hope you like them. Mark my words, you will need them one day. *smack*');
	}
}

function DC_useStringOnSnappingTeeth(){
	addObjectToInventory("player","snap line",1,true,false);
	//inventory("player", "snap line", "+-", 1, true, false);
	removeObjectFromInventory("dungeon cell","snapping teeth",1,true,true);
	removeObjectFromInventory("dungeon cell","string",1,true,true);	
	log("Using the string and snapping teeth you create what can only be called a snap line.");
}

function DC_useSnapLineOnCellKeys(){
	var DC_triedSnapLine = gameVars("DC_triedSnapLine");
	if(!DC_triedSnapLine){DC_triedSnapLine = 0;}
	
	if(DC_triedSnapLine > 1){
		log("Using the snap line you manage to hook the cell keys. Carefully you pull them back into the cell.");
		removeObjectFromInventory("dungeon cell","cell keys",1,true,true);
		addObjectToInventory("player","cell keys",1,true,false);
		//inventory("player", "cell keys", "+-", 1, true, false);
	}else{
		log("Using the snap line you try to hook the cell keys, but just miss.");
		DC_triedSnapLine++;
		gameVars("DC_triedSnapLine", DC_triedSnapLine);
		gameVars("gotCellKeys", true);
	}
}



