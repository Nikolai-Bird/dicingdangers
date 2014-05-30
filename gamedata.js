var options = {
	"precommandhtml":"  ",
	"postcommandhtml":"  "
}

var responses = {
	"cantake":"You take ##.",
	"cannottake":"You can't take that.",
	"cannotsee":"You can't see ##.",
	"commandfail":"That command was not understood. Type help or ?."
}

var equiptypes = [
	"Weapon",
	"Armour",
	"Shield",
	"Helm",
	"Gautlets",
	"Leggings",
	"Boots",
	"Belt",
	"Cloak",
	"Necklace",
	"Ring",
	"Talisman",
	"Pendant",
	"Glasses",
	"Bracelet"
]

var Sdata = {};
var obj = "";

Sdata.objectsClass =  {
	alt: "",
	objtype: "item",
	equiptype: 0,
	location: "",
	description: "",
	damage: null,
	protection: null,
	weight: 0,
	value: 0,
	costtouse: 0,
	race: "",
	hits: 0,
	hitsmax: 0,
	level:1,
	equipment: ["","","","","","","","","","","","","","","",""],
	inventory: {},
	light: 100,
	move: {},
	commandoverride:{},
	ask:"",
	look:"",
	looks:0,
	use:{},
	takesuccess:"",
	takefail:"",
	visits:0,
	onenter:"",
	onexit:"",
	merchant:[],
	image:"",
	hostility:0,
	skill:null,
	attackskill:"auto",
	
	xp:0,
	str:5,
	dex:5,
	wis:5,
	con:5,
	
	poisoned:"",
	diseased:"",
	blessed:"",
	
	damage:0,
	defence:0,
	bowdam:0,
	
	totaldamage:0,
	totaldefence:0,
	totalbowdam:0,
	totalblades:0,
	totalpolearms:0,
	totalunarmed:0,
	totalranged:0,
	
	blades:0,
	polearms:0,
	unarmed:0,
	ranged:0,
	fishing:0,
	logging:0,
	mining:0,
	charms:0, // Make and use charms to cast spells. They are destroyed after each use.
	weaponcraft:0,
	armourcraft:0,
	potioncraft:0,
	charmcraft:0
	
};

Sdata.gameVars = {
	turn : 0,
	log : ""
}

obj = "player";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
	"alt": ["Red"],
	"objtype": "character",
	"description": "Not too bad looking.",
	image:"",
	"location": "nerlan smithy",
	hits: 100,
	hitsmax: 100,
	"inventory": {
		"gold": [1000,true,false],
		"dagger": [1,true,false],
		"broadsword": [1,true,false],
		"roundshield": [1,true,false],
		"leather helm": [1,true,false]
		
	},
	equipment: ["broadsword","","","","","","","","","","","","","",""]
});

/////////////////////////////////////////////////////////////////////////
///////////////////////////// DUNGEON CELL //////////////////////////////
/////////////////////////////////////////////////////////////////////////

obj = "dungeon cell";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {

"alt": "cell",
      "objtype": "location",
      "description": "You stand in a cold barren cell with a small barred window. The walls are granite. The floor is covered in rotting reeds, rubbish and rat droppings. Water drips from the ceiling. A half naked and filthy old man named Ben sits in the corner.",
      "inventory": {
		"cell door": [1,false,true],
		"cell keys": [1,false,false],
        "rubbish pile": [1,false,true],
		"Ben": [1,false,true],
		"walls": [1,false,false],
		"block": [1,false,false],
		"orc": [1,false,true]
      },
	  "visits": 0,
	  "onenter":"",
	  "onexit":""
});

obj = "dungeon passage";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "location",
      "description": "This is a dungeon passage. There are various doors leading off, but at the far end is what looks like a prison gate to the outside.",
      "inventory": {
		"cell door": [1,false,true],
		"prison gate":[1,false,true]
      }
});

obj = "Ben";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
	"alt": ["ben", "old man", "man", "bne"],
      "objtype": "character",
      "description": "",
	  image:"",
      "inventory": {
        "snapping teeth": [1,false,false]
      },
	  "ask":{
		"age":"log('\"I am an old man. Been here mores years than I can count, and I can count to...\" He starts to count his fingers, then his toes. \"...Twenty two!\"')",
		"teeth":"log('Do you mean my snapping teeth?')",
		"gums":"log('*smack*')",
		"fingers":"log('\"I lost two in a bar fight, but I gained one again. Cant remember how.\"')",
		"hair":"log('Because Im worth it.')",
		"snapping teeth":"DC_askBenAboutSnappingTeeth()",
		"grey sludge":"log('\"Beats rat and spider, but not fly. A juicy fly is very nice.\"')"
	  },
	  "look":"look_Ben()"
});




obj = "snapping teeth";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
	"alt": "teeth",
    "description": "Oddly white teeth that seem to chatter."
});

obj = "snap line";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
	"alt": "line",
    "description": "Some string with snapping teeth on the end. Could come in handy.",
	"use":{
		"cell keys":"DC_useSnapLineOnCellKeys()"
	}
});

obj = "string";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
	"objtype": "item",
      "description": "A length of string. There are a thousand uses for string. You get one... maybe two. It depends on the budget for this game.",
	  "use":{
			"snapping teeth":"DC_useStringOnSnappingTeeth()"
	  }
});

obj = "cell door";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
	"alt": "door",
	"objtype": "exit",
	"move": {
	"dungeon cell":["dungeon passage",100,"cell keys",""],
	"dungeon passage":["dungeon cell",100,"cell keys",""]
	},
	"description": "",
	"look":"look_cell_door()",
	"commandoverride":{
		"hello":"log('Talking to a cell door? Second sign of madness.')"
	}
});

obj = "walls";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"alt": ["wall", "granite", "granite walls"],
      "description": "Grey black granite, worn with age. There seems to be a loose block."
});


obj = "rusty nail";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"alt": "nail",
      "objtype": "item",
      "damage": 1,
      "equiptype": 1,
      "value": 1,
	  "takesuccess":"log('You take it. Hm... what to do with that?');",
      "description": "A rusty old iron nail. Not large.",
	  "commandoverride":{
		"use":"log('On what?')"
	  }
});


obj = "block";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"alt": "brick",
      "description": "A grey black granite block.",
	  "use":{
			"rusty nail":"DC_useRustyNailOnBlock()"
	  },
	  "takesuccess":"log('You remove the block. Behind it you see some string.'); addObjectToInventory('dungeon cell','string',1,true,false);",
	  "takefail":"log('It will not shift but the mortar seems loose.')",
	  "commandoverride":{
			"hit":"log('*Smack!* That just hurts your hand.')",
			"kick":"log('Ouch!')"
	  }
});

obj = "cell keys";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "key",
      "description": "A set of rather uninteresting cell keys."
});


obj = "rubbish pile";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"alt": "pile",
      "objtype": "item",
      "description": "A pile of rotting rubbish, scraps and filth.",
      "inventory": {
        "rusty nail": [1,true,true]
      }
});


obj = "prison gate";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"alt": "",
      "objtype": "exit",
      "description": "Rusty metal work without a lock.",
	  "move": {
		"nerlan market":["dungeon passage",0,"",""],
		"dungeon passage":["nerlan market",0,"",""]
	  }
});

/////////////////////////////////////////////////////////////////////////
//////////////////////////// NERLAN SMITHY //////////////////////////////
/////////////////////////////////////////////////////////////////////////

obj = "Abale";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
	  "alt": ["blacksmith", "abale", "man", "black smith"],
      "objtype": "character",
      "description": "A big man with a big beard and a big belly, but most of all, a big grin.",
	  "image":"",
      "inventory": {
		"grin": [1,false,false],
		"roundshield": [1,false,false],
		"club": [5,false,false],
		"dagger": [3,false,false],
		"leather helm": [2,false,false]
      },
	  "merchant":[1,2,3,4,5,6],
	  "look":"look_Abale()",
	  "ask":"ask_Abale()",
	  "commandoverride":{
		"hello":"log('Hello customer.')",
		"fuck":"log('I will have none of that.')",
		"hit":"log('Not a good idea.')",
		"punch":"log('Hm... No. He is way bigger than you.')",
		"kick":"log('Only girls kick.')"
	  }
});



obj = "smithy door";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
//Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
"alt": "door",
      "objtype": "exit",
	  "move": {
		"nerlan market":["nerlan smithy",0,"",""],
		"nerlan smithy":["nerlan market",0,"",""]
	  },
      "description": "",
	  "look":"look_smithy_door()"

});	  

obj = "nerlan smithy";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "location",
      "description": "A large place with racks of weapons and armour. There is a forge and a constant ringing of hammer on metal. Abale the blacksmith watches you.",
      "inventory": {
		"smithy door":[1,false,false],
		"Abale":[1,false,true]
      }
});


obj = "grin";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "item",
      "description": "It is a big grin. Not a smile, but a grin."
});


/////////////////////////////////////////////////////////////////////////
//////////////////////////// NERLAN MARKET //////////////////////////////
/////////////////////////////////////////////////////////////////////////


obj = "nerlan market";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "location",
      "description": "A very busy market place.",
      "inventory": {
		"prison gate":[1,false,true],
		"smithy door":[1,false,true]
      }
});



/////////////////////////////////////////////////////////////////////////
//////////////////////////////// ITEMS //////////////////////////////////
/////////////////////////////////////////////////////////////////////////

obj = "gold";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"alt":["coin", "money", "gold coin", "gold coins", "coins"],
      "value": 1,
      "description": "A gold coin.",
	  "image":"items/gold1.jpg"
});

/////////////////////////////////////////////////////////////////////////
//////////////////////////////// WEAPONS ////////////////////////////////

obj = "dagger";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "item",
	  "equiptype":1,
      "description": "A short blade for stabbing.",
	  level:3,
      "damage": null,
      "protection": 0,
      "weight": 20,
      "value": 30,
	  skill:"blades",
	  image:"images/32x32_20_04.gif"
});
obj = "broadsword";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "item",
	  "equiptype":1,
      "description": "A long blade for stabbing and slashing.",
      "damage": 20,
      "protection": 0,
      "weight": 80,
      "value": 230,
	  skill:"blades",
	  image:"images/32x32_20_23.gif"
});
// plain-dagger.svg
// broadsword.svg



obj = "club";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "item",
	  "equiptype":1,
      "description": "A stout wooden club used for hitting people.",
      "damage": 7,
      "protection": 0,
      "weight": 25,
      "value": 21,
	  skill:"polearms"
});


/////////////////////////////////////////////////////////////////////////
//////////////////////////////// ARMOUR /////////////////////////////////

obj = "roundshield";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "item",
	  "equiptype":3,
      "description": "A round shield of painted wood in an iron rim.",
      "damage": 1,
      "protection": 15,
      "weight": 100,
      "value": 51,
	  image:"items/shield2.jpg"
});


obj = "leather helm";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
"objtype": "item",
	  "equiptype":4,
      "description": "A standard leather helmet with some padding. Better than nothing.",
      "damage": 0,
      "protection": 5,
      "weight": 25,
      "value": 15,
	  "level": 14,
      "image": "items/helm3.jpg",

});


/////////////////////////////////////////////////////////////////////////
////////////////////////////// GENERAL NPCs /////////////////////////////

obj = "orc";
Sdata[obj] = JSON.parse(JSON.stringify(Sdata.objectsClass));
Sdata[obj] = jQuery.extend(true, Sdata[obj], {
	"alt": ["Orc", "ork"],
	"objtype": "character",
	"description": "Ugly green brute.",
	image:"images/32x32_6_14.gif",
	hostility:100,
	level:5,
	hits: 5,
	hitsmax: "auto",
	damage:"auto",
	protection:"auto",
	"inventory": {
		"gold": [3,false,false],
		"club": [1,false,false]
	},
	"commandoverride":{
	}
});








