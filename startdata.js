/*
============================  LOCATIONS  ============================

=== .onexit ===
A script envoked when the player leaves a location. It does not overides leaving and stops logging.

=== .onenter ===
A script envoked when the player enters a location. It does not overrides entering and stops any logging.

==============================  EXITS  ==============================

These are portals, or doors to new locations. 

=== .move ===
The property is the current location.
It then has an array of data:

	Form: 		.move.(location name):[new location, locked %, key, script]
	Location: 	The current location.
	Locked %: 	The difficulty to open using a pick lock. 0 is unlocked. 100 is a hard lock.
	Key: 		The key required in inventory to open.
	Script: 	A script run before checking lock and key. This will override the lock and key process

Example: "dungeon cell":["dungeon passage",100,"cell keys",""]



*/

startdata = 
{
  "objects": {
    "class": {
	  "alt": "",
      "objtype": "item",
      "equiptype": 0,
      "location": "",
      "description": "",
      "damage": 0,
      "protection": 0,
      "weight": 0,
      "value": 0,
      "costtouse": 0,
      "race": "",
      "hits": 0,
      "hitsmax": 0,
      "xp": 0,
      "equipment": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "inventory": {},
      "light": 100,
	  "move": {},
	  "commandoverride":{},
	  "ask":"",
	  "look":"",
	  "looks":0,
	  "use":{},
	  "takesuccess":"",
	  "takefail":"",
	  "visits":0,
	  "onenter":"",
	  "onexit":"",
	  "merchant":[],
	  "image":""
	  
    },
	"gameVars": {
		"turn":0,
		"log":""
    },
	"player": {
	  "alt": "Red",
      "objtype": "character",
      "description": "Not to bad looking.",
      "location": "dungeon cell",
      "inventory": {
        "gold": [30,true,false]
      },
	  "commandoverride":{
		"hello":"log('Greetings.')",
		"fuck":"log('Mind your language.')",
		"shit":"log('Mind your language.')",
		"stupid game":"log('This is a great game!')",
		"no it isn't":"log('Yes it is.')",
		"no it is not":"log('Yes it is.')",
		"listen":"log('Not much to hear.')"
	  }
    },
	
	"Abale": {
	  "alt": ["blacksmith", "abale", "man", "black smith"],
      "objtype": "character",
      "description": "A big man with a big beard and a big belly, but most of all, a big grin.",
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
	  },
	  "image":"cthulhu.jpg"
    },
	"Ben": {
	  "alt": ["ben", "old man", "man"],
      "objtype": "character",
      "description": "",
      "inventory": {
        "snapping teeth": [1,false,true]
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
    },
	"snapping teeth": {
      
	  "alt": "teeth",
      "description": "Oddly white teeth that seem to chatter."
    },
	"snap line": {
	  "alt": "line",
      "description": "Some string with snapping teeth on the end. Could come in handy.",
	  "use":{
			"cell keys":"DC_useSnapLineOnCellKeys()"
	  }
    },
    "dungeon cell": {
	  "alt": "cell",
      "objtype": "location",
      "description": "You stand in a cold barren cell with a small barred window. The walls are granite. The floor is covered in rotting reeds, rubbish and rat droppings. Water drips from the ceiling. A half naked and filthy old man sits on the corner.",
      "inventory": {
		"cell door": [1,false,false],
		"cell keys": [1,false,true],
        "rubbish pile": [1,false,false],
		"Ben": [1,false,false],
		"walls": [1,false,true],
		"block": [1,false,true]
      },
	  "visits": 1,
	  "onenter":"",
	  "onexit":""
    },
	"dungeon passage": {
      "objtype": "location",
      "description": "This is a dungeon passage. There are various doors leading off, but at the far end is what looks like a prison gate to the outside.",
      "inventory": {
		"cell door": [1,false,false],
		"prison gate":[1,false,false]
      }
    },
	"string": {
      
      "objtype": "item",
      "description": "A length of string. There are a thousand uses for string. You get one... maybe two. It depends on the budget for this game.",
	  "use":{
			"snapping teeth":"DC_useStringOnSnappingTeeth()"
	  }
    },
	"cell door": {
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
    },
	"smithy door": {
      
	  "alt": "door",
      "objtype": "exit",
	  "move": {
		"nerlan market":["nerlan smithy",0,"",""],
		"nerlan smithy":["nerlan market",0,"",""]
	  },
      "description": "",
	  "look":"look_smithy_door()"
    },
    "walls": {
	  "alt": "wall",
      "description": "Grey black granite, worn with age. There seems to be a loose block."
    },
    "rusty nail": {
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
    },
	"block": {
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
    },
	"gold": {
		"alt":["coin", "money", "gold coin", "gold coins", "coins"],
      "value": 1,
      "description": "A gold coin."
    },
	"cell keys": {
	  "objtype": "key",
      "description": "A set of rather uninteresting cell keys."
    },
	
    "rubbish pile": {
	  "alt": "pile",
      "objtype": "item",
      "description": "A pile of rotting rubbish, scraps and filth.",
      "inventory": {
        "rusty nail": [1,true,false]
      }
    },
	"prison gate": {
	  "alt": "",
      "objtype": "exit",
      "description": "Rusty metal work without a lock.",
	  "move": {
		"nerlan market":["dungeon passage",0,"",""],
		"dungeon passage":["nerlan market",0,"",""]
	  }
    },
	"nerlan market": {
      "objtype": "location",
      "description": "A very busy market place.",
      "inventory": {
		"prison gate":[1,false,false],
		"smithy door":[1,false,false]
      }
    },
	"nerlan smithy": {
      "objtype": "location",
      "description": "A large place with racks of weapons and armour. There is a forge and a constant ringing of hammer on metal. Abale the blacksmith watches you.",
      "inventory": {
		"smithy door":[1,false,false],
		"Abale":[1,false,false]
      }
    },
	"grin": {
      "objtype": "item",
      "description": "It is a big grin. Not a smile, but a grin."
    },
	"dagger": {
      "objtype": "item",
	  "equiptype":1,
      "description": "A short blade for stabbing.",
      "damage": 10,
      "protection": 0,
      "weight": 20,
      "value": 30
    },
	"club": {
      "objtype": "item",
	  "equiptype":1,
      "description": "A stout wooden club used for hitting people.",
      "damage": 7,
      "protection": 0,
      "weight": 25,
      "value": 21
    },
	"roundshield": {
      "objtype": "item",
	  "equiptype":3,
      "description": "A round shield of painted wood in an iron rim.",
      "damage": 2,
      "protection": 15,
      "weight": 100,
      "value": 51
    },
	"leather helm": {
      "objtype": "item",
	  "equiptype":4,
      "description": "A standard leather helmet with some padding. Better than nothing.",
      "damage": 0,
      "protection": 5,
      "weight": 25,
      "value": 15
    }
	
	
	
  },
  "equiptypes": [
    "none",
    "Weapon",
    "Armour",
    "Shield",
    "Helm",
    "Leggings",
    "Gautlets",
    "Boots",
    "Belt",
    "Necklace",
    "Ring",
    "Talisman",
    "Pendant",
    "Glasses",
    "Bracelet"
  ],
  "responses":{
	  "cantake":"You take ##.",
      "cannottake":"You can't take that.",
	  "cannotsee":"You can't see ##.",
	  "commandfail":"That command was not understood. Type help or ?."
	  
  },
  "options":{
		"precommandhtml":"  ",
		"postcommandhtml":"  "
		
		
  }
}





