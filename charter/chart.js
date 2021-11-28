const fetch = require('node-fetch');
const fs = require("fs");

const exJson = JSON.parse(fs.readFileSync("ex.json"));

const sendToChart = async (data, channel)=>{

   let res = await fetch('http://localhost:13450/api/updater',
   {
       method:"POST",
       body:JSON.stringify({
           Command :"ChartUpdate",
           chartIndex: channel,
           data:data
       })
   });

   res = await res.json();
   console.log("chart response:", res);
}

const example = async (channel = 1)=>{
    await sendToChart(exJson, channel);
}

const line = async (x,y , channel = 1)=>
{
    await sendToChart(
    {
        data:[
            {
                x,y,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            }
        ],
        layout:{}
    }
    , channel);
}
const bars = async (x,y , channel = 1)=>
{
    await sendToChart(
        {
            data:[
                    {
                        x,y,
                        type: 'bar',
                    }
                ],
            layout:{}
        }
    ,
     channel);
}

module.exports  = 
{
    sendToChart: sendToChart,
    line:line,
    bar:bars,
    example: example
}


