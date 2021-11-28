const { example } = require("./chart");
const chart = require("./chart");


const run = async ()=>{
//   await chart([
//   {
//     x: [1, 2, 3],
//     y: [20, 50, 3],
//     type: 'scatter',
//     mode: 'lines+markers',
//     marker: {color: 'red'},
//   },
//   {type: 'bar', x: [1, 2, 3], y: [20, 50, 3]},
// ], 1);

  var time = [];
  for(let i = 1369; i < 1400; i++)
  {
    time.push(i);
  }

  let val = [
    21,35,46,50,44,40,47,53,47,42,56,72,87,103,122,136,163,196,227,264,275,175,122,162,173,198,226,198,226,198,101,116,63,106
  ]

  let gold = [
    383,362,343,360,384,384,384,387,331,294,278,279,271,310,363,409,444,604,696,872,973,1226,1573,1668,1409,1226,1158,1251,1260,1268,1393,1773,1804
  ]

  let gold_income = [];

  for(let v in val)
  {
    gold_income.push(val[v]/gold[v])
  }

  await chart.line(
    time,gold_income
    );

    await chart.line(
      time,val,2
      );
  //await chart.example();
}

run();