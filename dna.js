var allLet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ. ';

class DNA {
  constructor(mutationRate, len) {
    this.mRate = mutationRate;
    this.len = len;
    this.genes = this.randomizeString();
    this.fitness = 0;
  }

  // returns a new DNA with half of its genes from one parent
  // and half from another
  crossover(other) {
    // random midpoint
    var mid = floor(random(1, this.len - 1));
    // seperate halves of both genes
    var half1 = this.genes.substr(0, mid);
    var half2 = other.genes.substr(mid, this.len - 1);
    // creates a new DNA and injects it with both halves
    let n = new DNA(this.mRate, this.len);
    n.inject(half1, half2);
    return n;
  }

  // returns the fitness value of the genes
  getFitness(target) {
    var sum = 0;
    for (var i = 0; i < this.len; i++) {
      if (this.genes[i] === target[i]) {
        sum += 1;
      }
    }
    return Math.pow(sum / target.length, 4);
  }

  // injects genes into DNA
  inject(gene1, gene2) {
    this.genes = gene1 + gene2;
  }

  // mutates genes based on mutation rate
  mutate() {
    for (var i = 0; i < this.len; i++) {
      if (random(1) < this.mRate) {
        var randLet = allLet[floor(random(allLet.length))];
        this.genes = replaceAt(this.genes, i, randLet);
      }
    }
  }

  // randomizes the genes to a random string of a given length
  randomizeString() {
    var randString = '';
    for (var i = 0; i < this.len; i++) {
      var index = floor(random(allLet.length));
      randString += allLet[index];
    }
    return randString;
  }
}
