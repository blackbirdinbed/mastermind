function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export class Game {

	constructor(maxNumAttempts, solutionLenght, availableColors) {
		this.maxNumAttempts = maxNumAttempts
		this.solutionLenght = solutionLenght
		this.availableColors = availableColors

		this.currentNumAttempt = 0
		this.historyAttempts = Array(1).fill(Array(solutionLenght).fill(-1))
		this.historyHints = Array(1).fill(Array(solutionLenght).fill(-1))
		this.solution = this.generateRandomSolution()
		this.finished = -1	// -1 := playing; 0 := lose; 1 := win
	}

	get currentAttempt() {
		return this.historyAttempts[this.currentNumAttempt]
	}

	get currentHint() {
		return this.historyHints[this.currentNumAttempt]
	}

	generateRandomSolution() {
		const set = new Set([...Array(this.availableColors.length).keys()])
		const sol = []

		let num = 0
		for (let i = 0; i < this.solutionLenght; i++) {
			num = random(0, set.size)
			sol.push([...set][num])
			set.delete([...set][num])
		}

		return sol
	}

	changeColor(indexColor, indexArr) {
		this.currentAttempt[indexArr] = indexColor
	}

	paintHint(matchExact, matchIncluded) {
		let i = 0
		while (matchExact > 0) {
			this.currentHint[i] = 1	// Exact coincidence
			i++
			matchExact--
		}
		while (matchIncluded > 0) {
			this.currentHint[i] = 0	// Included coincidence
			i++
			matchIncluded--
		}
	}

	checkSolution() {
		let matchExact = 0
		let matchIncluded = 0
		for (let i = 0; i < this.solutionLenght; i++) {
			if (this.currentAttempt[i] === this.solution[i]) {
				matchExact++
			} else if (this.solution.includes(this.currentAttempt[i])) {
				matchIncluded++
			}
		}

		this.paintHint(matchExact, matchIncluded)

		if (matchExact === this.solutionLenght) {
			this.finished = 1
		} else if (this.currentNumAttempt + 1 === this.maxNumAttempts) {
			this.finished = 0
		} else {	// The game continues
			this.currentNumAttempt++
			this.historyAttempts.push(Array(this.solutionLenght).fill(-1))
			this.historyHints.push(Array(this.solutionLenght).fill(-1))
		}
	}

}