grammar States
hidden(WS, SL_COMMENT, ML_COMMENT)

StateMachine:
	'statemachine' name=ID
	(states+=State | events+=Event)*;
	
State:
	'state' name=ID transitions+=Transition*;
	
Event: 
	'event' name=ID;
	
Transition:
	event=[Event] '=>' state=[State];

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;
