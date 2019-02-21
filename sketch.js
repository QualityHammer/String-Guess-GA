let population;
var target;
var bestP, fitP, currentGen, mRate, resetB;

// returns a string with a replaced value
function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

// is called when reset button is pressed
function resetPop() {
  population = new Population(target);
  population.newPop();
  population.calcFitness();
}

// is called when the mutation rate is changed
function mutationChange() {
  population.mRate = this.value();
}

function setup() {
  // population creation
  target = "The quick brown fox jumped over the lazy dog."
  population = new Population(target);
  population.newPop();
  population.calcFitness();

  // html
  createElement('h1', target);
  currentGen = createElement('h2', 'Generation: ' + population.generations);
  fitP = createP('Fitness: ');
  bestP = createP('');

  // controls
  resetB = createButton('Reset');
  resetB.mousePressed(resetPop);
  mRate = createInput(population.mRate);
  mRate.input(mutationChange);
}

function draw() {
  if (!population.finished) {
    // selection
    population.selection();
    // new generation
    population.newGeneration();
    // calculate fitness
    population.calcFitness();
    bestP.html(population.getBest().genes);
    fitP.html('Fitness: ' + population.getBest().fitness);
  }
  currentGen.html('Generation: ' + population.generations);
}
