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

```typescript
import generateNewMachine from "./machine/machine";

enum State {
	GREEN = 'GREEN',
	YELLOW = 'YELLOW',
	RED = 'RED',
}

const StopLight = generateNewMachine({
	machineName: "StopLight",
	startState: State.RED,
	states: new Map([
		[
			State.GREEN,
			{
				stateName: State.GREEN,
				connections: [State.YELLOW],
				data: { name: "This is", effect: () => {} },
			},
		],
		[
			State.YELLOW,
			{
				stateName: State.YELLOW,
				connections: [State.RED],
				data: { name: "Some Stateful", effect: () => { console.log('effect fired')}},
			},
		],
		[
			State.RED,
			{
				stateName: State.RED,
				connections: [State.GREEN],
				data: { name: "data", effect: () => {} },
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

## Args

**states**
states should be instantiated with new Map() and an array of tuples passed in that describe your states like so:
new Map([[{StateName}, {StateOptions}]])

**StateOptions**
an Object consisting of a stateName: string; connections: string[]; and data which can have any object shape as long as it's uniform among all states, data will be accessible in later versions via an exposed method. if effect is defined on data as a function it will be executed when the states change.

**isAlwaysBiDirectional**
If this is true the graph structure underneath the machine will map both ways allowing for state transitions to always be bidirectional, meaning if you define a connection one way it will automatically be able to transition back.

**machineName**
will be accessible in later versions or removed completely depending on if I find a use case or not.

## Contributing

Want to contribute? Great! Feel free to make PRs

## License

[MIT](https://choosealicense.com/licenses/mit/)

**Free Software, Hell Yeah!**
