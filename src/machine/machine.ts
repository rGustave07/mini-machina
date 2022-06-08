export interface InitiatingStateObject {
	identification: string,
	startState: string,
	states: State
}

type EffectFunction = () => any;
type State = {
	[key: string]: StateOptions;
};

type StateOptions = {
	on: {
		[key: string]: {
			effect?: EffectFunction,
		};
	};
}

interface MachineControls {
	getState: () => [ string, State ],
	dispatch: (nextState: string) => void,
}

export default function generateNewMachine(stateObject: InitiatingStateObject): MachineControls {
	const state = Object.create(stateObject);

	let currentState: State = state.states[state.startState];
	let currentStateName: string = state.startState;

	const dispatch = (nextState: string) => {
		if (state.states[currentStateName].on[nextState]) {
			currentStateName = nextState;
		} else {
			throw new Error(`
				Unable to access state not accessible on current state object,
				this happens when trying to queue up another state that doesn't
				exist within the options of the current state
			`);
		}
	}

	const getState = (): [ string, State ] => [ currentStateName, currentState ];

	return {
		getState,
		dispatch,
	}
}