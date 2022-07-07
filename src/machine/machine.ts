import Graph from "./Graph/Graph";
import GraphVertex from "./Graph/GraphVertex";

interface State<T> {
	stateName: string;
	connections: string[];
	data: T & { effect?: () => void };
}

interface StateConfiguration<StateData> {
	machineName?: string;
	startState: string;
	states: Map<string, State<StateData>>;
	isAlwaysBiDirectional: boolean;
}

interface MachineControls<StateData> {
	changeState: (nextStateName: string) => void;
	currentState: () => string;
	getStateData: () => StateData;
}

const mapVerticesAndEdges = <StateData>(g: Graph, config: StateConfiguration<StateData>) => {
	config.states.forEach(( state, key ) => {
		const newVertex = new GraphVertex<StateData>(key, state.data);
		g.addVertex(newVertex);

		state.connections.forEach(connection => {
			if (!config.states.get(connection)) {
				throw new Error(`
					Could not find relevant connection for ${connection}
				`);
			}

			const destVertexState = config.states.get(connection);
			if (!destVertexState) {
				throw new Error(`Unexpected error parsing states for connection`)
			}

			const destinationVertex = new GraphVertex<State<StateData>>(connection, destVertexState);
			g.addEdge(newVertex, destinationVertex);
		});
	})
}

export default function generateNewMachine<StateData>(
	stateConfig: StateConfiguration<StateData>
): MachineControls<StateData> {
	const graph = new Graph<State<StateData>>(stateConfig.isAlwaysBiDirectional);
	let currentState = stateConfig.startState;

	mapVerticesAndEdges<StateData>(graph, stateConfig);

	const getState = () => currentState;

	const dispatch = (nextState: string) => {
		const currentVertexConfig = stateConfig.states.get(currentState);
		const nextVertexConfig = stateConfig.states.get(nextState);

		if (!currentVertexConfig?.connections.includes(nextState) || !nextVertexConfig) {
			throw new Error(
				`Current state does not connect to dispatched state`
			);
		}

		nextVertexConfig?.data?.effect?.();
		currentState = nextVertexConfig.stateName;
	};

	return {
		currentState() {
			return getState();
		},
		changeState(nextState) {
			dispatch(nextState);
		},
		getStateData() {
			const foundVertex = graph.getVertexByKey(currentState);

			if (!foundVertex) {
				return {} as StateData
			}

			return ( foundVertex as GraphVertex<StateData> ).value
		}
	};
}