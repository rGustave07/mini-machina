import GraphVertex from "./GraphVertex";

export default class GraphEdge {
	startVertex: GraphVertex;
	endVertex: GraphVertex;
	weight: number;

	constructor(startVertex: GraphVertex, endVertex: GraphVertex, weight = 0) {
		this.startVertex = startVertex;
		this.endVertex = endVertex;
		this.weight = weight;
	}

	public getKey() {
		const startVertexKey = this.startVertex.getKey();
		const endVertexKey = this.endVertex.getKey();

		return `${startVertexKey}_${endVertexKey}`
	}

	public reverse() {
		const tmp = this.startVertex;
		this.startVertex = this.endVertex;
		this.endVertex = tmp;

		return this;
	}

	public toString() {
		return this.getKey();
	}
}