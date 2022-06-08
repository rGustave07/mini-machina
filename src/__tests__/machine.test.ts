import { expect } from 'chai';
import generateNewMachine from '../machine';

describe('State Machine Tests', () => {
	it('Should go through states if they exist in the correct order', () => {
		const Stoplight = generateNewMachine({
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

		let currentStateName = Stoplight.getState()[0];
		expect(currentStateName).to.equal('red');

		Stoplight.dispatch('green');
		currentStateName = Stoplight.getState()[0];
		expect(currentStateName).to.equal('green');

		Stoplight.dispatch('yellow');
		currentStateName = Stoplight.getState()[0];
		expect(currentStateName).to.equal('yellow');
	})
})