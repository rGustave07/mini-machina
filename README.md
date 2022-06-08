# Mini Machina
## _A small, humble, state machine_

Mini Machina is a light weight state machine that exposes a simple api to
manage moving from state-to-state and fire effects on states.

- Simple
- Easy to understand
- No dependencies


## Features

- Warns you of bad state transition
- Easy to read
## Usage/Examples

```javascript
import generateNewMachine from "./machine/machine";

const StopLight = generateNewMachine({
	identification: "StopLight",
	startState: "red",
	states: {
		red: {
			on: {
				'green': {
					effect: () => {},
				},
			}
		},
		green: {
			on: {
				'yellow': {
					effect: () => {},
				}
			}
		},
		yellow: {
			on: {
				'red': {
					effect: () => {},
				}
			}
		},
	},
});

console.log(StopLight.getState()); // Initial State: red

StopLight.dispatch('green'); // Transition to green

console.log(StopLight.getState()); // on green state

StopLight.dispatch('red'); // Transition to red ( Error)
```


## Contributing

Want to contribute? Great! Feel free to make PRs

## License

[MIT](https://choosealicense.com/licenses/mit/)


**Free Software, Hell Yeah!**
