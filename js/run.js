const run = function run(runName, fn, ...restParams) {
  console.log(`! start run ${runName} !`);

  var result = fn(...restParams);

  console.log(`fn ${runName} returns the result: `);
  console.dir(result);
}
