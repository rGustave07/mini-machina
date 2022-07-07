# Mini Machina

## _A small, humble, state machine_

Mini Machina is a light weight state machine that exposes a simple api to
manage moving from state-to-state and fire effects on states.

-   Simple
-   Easy to understand
-   No dependencies

## Features

-   Warns you of bad state transition
-   Easy to read

## Usage/Examples

```javascript
import generateNewMachine from "./machine/machine";

const StopLight = generateNewMachine({
	machineName: "StopLight",
	startState: 'RED',
	states: new Map([
		[
			State.GREEN,
			{
				stateName: "GREEN",
				connections: ["YELLOW"],
				data: { name: "blah", effect: () => {} },
			},
		],
		[
			State.YELLOW,
			{
				stateName: "YELLOW",
				connections: ["RED"],
				data: { name: "blah", effect: () => { console.log('effect fired')}},
			},
		],
		[
			State.RED,
			{
				stateName: "RED",
				connections: ["GREEN"],
				data: { name: "blah", effect: () => {} },
			},
		],
	]),
	isAlwaysBiDirectional: false,
});

console.log(StopLight.currentState()); // Initial State: red
StopLight.changeState("GREEN"); // Transition to green

console.log(StopLight.currentState()); // on green state
StopLight.changeState("RED"); // Transition to red ( Error)
```

Create a machine by importing generateNewMachine. define your states as a new map with a tuple argument that takes the state name as a string and a state object configuration, and interact with the machine with the exposed methods ```currentState```, ```changeState```.

define what transitions are allowed in the connections array of a state options object. if the machine tries to transition to a state that is not allowed or not defined in the connections array an error will be thrown.

## Contributing

Want to contribute? Great! Feel free to make PRs

## License

[MIT](https://choosealicense.com/licenses/mit/)

**Free Software, Hell Yeah!**
