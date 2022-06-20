export interface InitiatingStateObject<Q> {
	startState: string,
	states: State<Q>
}

type EffectFunction = () => any;

type State<Q = any> = {
	[key: string]: StateOptions<Q>;
};

type StateOptions<Q> = {
	on: {
		[key: string]: {
			effect?: Q,
		};
	};
}

interface MachineControls {
	getState: () => State,
	getStateName: () => string,
	dispatch: (nextState: string) => void,
}

export default function generateNewMachine<Q = EffectFunction>(stateObject: InitiatingStateObject<Q>): MachineControls {
	const state = Object.create(stateObject);

	let currentState: State = state.states[state.startState];
	let currentStateName: string = state.startState;

	const dispatch = (nextState: string) => {
		if (state.states[currentStateName].on[nextState]) {
			currentStateName = nextState;
			currentState = state.states[nextState]
		} else {
			throw new Error(`
				Unable to dispatch next state not accessible on current state object,
				this happens when trying to queue up another state that doesn't
				exist within the options of the current state
			`);
		}
	}

	const getState = (): State => currentState;
	const getStateName = (): string => currentStateName

	return {
		getState,
		getStateName,
		dispatch,
	}
}