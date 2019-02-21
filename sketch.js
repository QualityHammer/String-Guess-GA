let population;
var bestP, fitP, currentGen;

// returns a string with a replaced value
function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

function setup() {
  // population creation
  var target = "The quick brown fox jumped over the lazy dog."
  population = new Population(target);
  population.newPop();
  population.calcFitness();

  // html
  createElement('h1', target);
  currentGen = createElement('h2', 'Generation: ' + population.generations);
  fitP = createP('');
  bestP = createP('');
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
    fitP.html(population.getBest().fitness);
  }
  currentGen.html('Generation: ' + population.generations);
}
