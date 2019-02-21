class Population {
  constructor(target) {
    // mutation rate
    this.mRate = 0.01;
    // population size
    this.size = 500;
    this.pop = [];
    this.pool = [];
    // target string
    this.target = target;
    // current generation
    this.generations = 0;
    this.finished = false;
    this.perfect = 1;
  }

  // calculates fitness for all DNA in population
  calcFitness() {
    for (let dna of this.pop) {
      dna.fitness = dna.getFitness(this.target);
    }
  }

  // creates a new generation using crossover and mutation
  newGeneration() {
    for (var i = 0; i < this.size; i++) {
      // gets 2 random DNAs from the pool
      var index1 = floor(random(this.pool.length));
      var index2 = floor(random(this.pool.length));
      // cretaes a crossover child
      let child = this.pool[index1].crossover(this.pool[index2]);
      child.mutate();
      this.pop[i] = child;
    }
    this.generations += 1;
  }

  // returns the best dna in the Population
  getBest() {
    var record = 0;
    let recordDNA = null;
    // gets the top scoring DNA in the population
    for (let dna of this.pop) {
      if (dna.fitness > record) {
        record = dna.fitness;
        recordDNA = dna;
      }
    }
    // if the fitness is a perfect value then the algorithm is finished
    if (record == this.perfect) {
      this.finished = true;
    }
    return recordDNA;
  }

  // Creates a brand new randomized population
  newPop() {
    for (var i = 0; i < this.size; i++) {
      let n = new DNA(this.mRate, this.target.length);
      n.randomizeString();
      this.pop.push(n);
    }
    this.generations += 1;
  }

  // fills the selection pool exponentially based on higher fitness values
  selection() {
    // clears pool
    this.pool.length = 0;
    // gets the max fitness value
    var maxFit = 0;
    for (let dna of this.pop) {
      if (dna.fitness > maxFit) {
        maxFit = dna.fitness;
      }
    }
    // normalize fitness and add to pool
    for (let dna of this.pop) {
      var fit = dna.fitness / maxFit;
      var chance = floor(Math.pow(fit * 10, 2));
      for (var i = 0; i < chance; i++) {
        this.pool.push(dna);
      }
    }
  }
}
