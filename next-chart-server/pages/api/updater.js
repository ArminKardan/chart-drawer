export default async (req, res) =>
{

    
    // console.log("BODY:",typeof req.body)

    let body = null;
    
    try 
    {
        body = JSON.parse(req.body);
    }
    catch{}

    console.log(body);

    if(body.Command == "BrowserCheck")
    {
        if(global.ChartsUpdate[parseInt(body.chartIndex)] != body.lastUpdate)
        {
            if(global.ChartsData[parseInt(body.chartIndex)])
            {
                res.status(200).json({status:"update", data:global.ChartsData[parseInt(body.chartIndex)], lastUpdate:global.ChartsUpdate[parseInt(body.chartIndex)]});
            }
            else
            {
                res.status(200).json({status:"no update1", data:[]});
            }
        }
        else
        {
            res.status(200).json({status:"no update2", data:[]});
        }
    }
    else if(body.Command == "ChartUpdate")
    {
        if(!global.ChartsUpdate[parseInt(body.chartIndex)])
        {
            global.ChartsUpdate[parseInt(body.chartIndex)] = 2;
        }

        global.ChartsData[parseInt(body.chartIndex)] = body.data;
        global.ChartsUpdate[parseInt(body.chartIndex)]  = global.ChartsUpdate[parseInt(body.chartIndex)] +1;
        res.status(200).json({status:"ok", channel:parseInt(body.chartIndex)});
    }

};