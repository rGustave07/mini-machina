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
	identification: "StopLight",
	startState: "red",
	states: {
		red: {
			on: {
				green: {
					effect: () => {},
				},
			},
		},
		green: {
			on: {
				yellow: {
					effect: () => {},
				},
			},
		},
		yellow: {
			on: {
				red: {
					effect: () => {},
				},
			},
		},
	},
});

console.log(StopLight.getStateName()); // Initial State: red
StopLight.dispatch("green"); // Transition to green

console.log(StopLight.getStateName()); // on green state
StopLight.dispatch("red"); // Transition to red ( Error)
```

Create a machine by importing generateNewMachine. define your states as objects with an on property, and
interact with the machine with the exposed methods ```dispatch```, ```getState```, and ```getStateName```.

define what transitions are allowed in the on Object of a state. if the machine tries to transition to a state that is not allowed or defined in the on object an error will be thrown.

## Contributing

Want to contribute? Great! Feel free to make PRs

## License

[MIT](https://choosealicense.com/licenses/mit/)

**Free Software, Hell Yeah!**
