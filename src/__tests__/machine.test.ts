import { expect } from 'chai';
import generateNewMachine from '../machine';

enum State {
	GREEN = 'GREEN',
	YELLOW = 'YELLOW',
	RED = 'RED',
}

const stopLightConfig = {
	machineName: "StopLight",
	startState: State.GREEN,
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
};

describe('State Machine Tests', () => {
	it('Should go through states if they exist in the correct order', () => {
		const Stoplight = generateNewMachine(stopLightConfig);

		expect(Stoplight.currentState()).to.equal(State.GREEN);

		Stoplight.changeState(State.YELLOW);
		expect(Stoplight.currentState()).to.equal(State.YELLOW);

		Stoplight.changeState(State.RED);
		expect(Stoplight.currentState()).to.equal(State.RED);
	})

	it("Should throw error when state next path does not exist on current state", () => {
		const Stoplight = generateNewMachine(stopLightConfig);

		const badDispatch = () => {
			return Stoplight.changeState(State.RED);
		}

		expect(badDispatch).to.throw();
	});
})