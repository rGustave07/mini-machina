import GraphEdge from "./GraphEdge";
import GraphVertex from "./GraphVertex";

export default class Graph {
	vertices: Map<string, GraphVertex>;
	edges: Map<string, GraphEdge[]>;
	adjacencyMap: Map<string, GraphVertex[]>;
	isDirected: boolean;

	constructor(isDirected = false) {
		this.vertices = new Map();
		this.edges = new Map();
		this.adjacencyMap = new Map();
		this.isDirected = isDirected;
	}

	public addVertex(newVertex: GraphVertex) {
		this.vertices.set(newVertex.getKey(), newVertex)

		return this;
	}

	public addEdge(source: GraphVertex, dest: GraphVertex) {
		const edgeListSource: GraphVertex[] = this.adjacencyMap.get(source.getKey()) ?? [];
		const edgeListDest: GraphVertex[] = this.adjacencyMap.get(dest.getKey()) ?? [];

		// Set adj map and edges from src to dest
		this.adjacencyMap.set(source.getKey(), [...edgeListSource, dest])
		this.edges.set(source.getKey(), [
			...(this.edges.get(source.getKey()) ?? []),
			new GraphEdge(source, dest),
		]);

		// If undirected also map back from dest to src
		if (!this.isDirected) {
			this.adjacencyMap.set(dest.getKey(), [...edgeListDest, source])
			this.edges.set(dest.getKey(), [
				...(this.edges.get(dest.getKey()) ?? []),
				new GraphEdge(dest, source),
			]);
		}
	}

	public getVertexByKey(vertexKey: any) {
		return this.vertices.get(vertexKey);
	}

	static printGraph(g: Graph) {
		const keys = g.adjacencyMap.keys();

		for (const k of keys) {
			console.log(`${k} -> ${g.adjacencyMap.get(k)?.map(v => v.name)}`)
		}
	}
}