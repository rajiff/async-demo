const async = require('async');

function A_s1(cost, done) {
  console.log('A_s1 ', cost);
}

function A_s2(pan, water, done) {
  console.log('A_s2 ', pan, ' with water ', water);
}

function B_s3() {
  console.log('B_s3');
}

function C_s4() {
  console.log('C_s4');
}

function D_s5() {
  console.log('D_s5');
}

function D_s7() {
  console.log('D_s7');
}

function E_s6() {
  console.log('E_s6');
}

// ==== Stages ====

function stageA(done) {
  setTimeout(() => {
  	console.log('\t\tA');

  	async.parallel([
  		A_s1.bind(null, "700 Rs."),
  		A_s2.bind(null, " Medium ", ' 300ml'),
  		], function(err, result){
  	});

  	done(null, {result: "A done"}, {cost: "700 Rs."});
  }, 3000);
}

function stageB(done) {
// function stageB(prevStageResult_one, prevStageResult_two, done) {
	// console.log("B received: ", prevStageResult_one, " And ", prevStageResult_two);
  setTimeout(() => { console.log('\t\tB'); done(null, {result: "B done"}); }, 1050);
}

function stageC(done) {
// function stageC(prevStageResult, done) {
  setTimeout(() => { console.log('\t\tC'); done(null, {result: "C done"}); }, 2000);
}

function stageD(done) {
// function stageD(prevStageResult, done) {
  // setTimeout(() => { console.log('\t\tD'); done({error: "D failed"}); }, 1200);
  setTimeout(() => { console.log('\t\tD'); done(null, {mywish: "D done"}); }, 1200);
}

function stageE(done) {
// function stageE(prevStageResult, done) {
	// console.log("E received: ", prevStageResult);
  setTimeout(() => { console.log('\t\tE'); done(null, {result: "E done"}); }, 1000);
}

function cookMaggie(fees, done) {
  // A_s1. Bring maggie from shop
  // A_s2. Heat water in pan
  // B_s3 (A_s1). Cut open maggie package and drop into hot water
  // C_s4 (B_s3, A_s1, A_s2). Add masala, salt, veggies according to your taste
  // D_s5 (C_s4). Wait for 2 minute
  // E_s6. Serve in bowl
  // D_s7. Clean plate & set the table

  // A -> B -> C -> D -> E
  // 2    1    1    2    1

  async.parallel([
  // async.waterfall([
    stageA,
    stageB,
    stageC,
    stageD,
    stageE
  ], function(err, results) {
    if (err) {
    	console.log('Error in workflow : ', err);
      return done(err);
    }

    console.log("\nDone, please pay: ", fees);
    return done(null, results);
  });
}

cookMaggie('20 Rs.', (err, result) => {
	console.log('Workflow now DONE with results: ', result);
})
