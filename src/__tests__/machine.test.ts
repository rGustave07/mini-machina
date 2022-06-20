import { expect } from 'chai';
import generateNewMachine from '../machine';

describe('State Machine Tests', () => {
	it('Should go through states if they exist in the correct order', () => {
		const Stoplight = generateNewMachine({
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

		expect(Stoplight.getStateName()).to.equal('red');

		Stoplight.dispatch('green');
		expect(Stoplight.getStateName()).to.equal('green');

		Stoplight.dispatch('yellow');
		expect(Stoplight.getStateName()).to.equal('yellow');
	})

	it("Should throw when state next path does not exist on current state", () => {
		const Stoplight = generateNewMachine({
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

		const badDispatch = () => {
			return Stoplight.dispatch('yellow');
		}

		expect(badDispatch).to.throw();
	});

	it('Should update internal state', () => {
		const Stoplight = generateNewMachine({
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

		const recursiveKeyCheck = (obj: any): string[] => {
			const keys = Object.keys(obj);
			let nestedKeys: string[] = [];

			if (keys.length === 0) {
				return [];
			}

			for (const key of keys) {
				if (obj[key] && typeof obj[key] === "object") {
					nestedKeys = nestedKeys.concat(recursiveKeyCheck(obj[key]));
				}
			}

			return [...keys, ...nestedKeys];
		};

		expect(Stoplight.getStateName()).to.equal('red');

		Stoplight.dispatch('green');

		expect(Stoplight.getStateName()).to.equal('green');

		const state = Stoplight.getState();
		const correctState = {
			on: {
				yellow: {
					effect: () => {},
				},
			},
		}

		const stateKeyCheck = recursiveKeyCheck(state)
		const expectedStateKeyCheck = recursiveKeyCheck(correctState)

		expect(stateKeyCheck).to.deep.equal(expectedStateKeyCheck);
	})
})