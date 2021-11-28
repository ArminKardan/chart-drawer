import { PureComponent, Component } from "react";
import dynamic from 'next/dynamic'
const Plot = dynamic(
  () => import('react-plotly.js'),
  { ssr: false }
)
import Link from 'next/link';
import Router, { withRouter } from 'next/router';



export default withRouter( class Main extends Component
{
    constructor(props)
    {

        super(props);
        this.chartIndex = props.router.query.id;
        this.lastUpdate = 1;
        this.chartData = [];
        this.chartLayout = {};
        this.isFirstRun = true;
        console.log(props)
    }

    static async getInitialProps (ctx)
    {
      return {};
    };

    componentWillUnmount()
    {
      clearInterval(this.Intervaler);
    }
    componentDidMount()
    {
      
      this.Intervaler = setInterval(async ()=>
      {

        
        console.log("requesting...")
        let res = await fetch("../api/updater",{
          method:"POST",
          body: JSON.stringify({
            Command : "BrowserCheck",
            lastUpdate:this.lastUpdate,
            chartIndex:this.chartIndex
          })
        })

        try
        {
          res = await res.json();
        }
        catch{
          console.log("err in json")
        }

        console.log(res)
        
        if(res.status == "update")
        {
          this.lastUpdate = res.lastUpdate;
          this.chartData = res.data.data;
          if(res.data.layout)
          {
            this.chartLayout = res.data.layout
          }          
          console.log("update received:",this.chartData)
          this.forceUpdate();
        }
      }, 1000)

      if(this.isFirstRun)
      {
        this.isFirstRun = false;
        this.forceUpdate();
      }
    }

    render()
    {
      if(this.isFirstRun)
      {
        this.forceUpdate();
        return null;
      }
      
        return <Plot
        style={{width: window.innerWidth - 25, height: window.innerHeight - 25}}
        data={this.chartData}
        layout = {this.chartLayout}
        config = {{scrollZoom:true}}
      />
        
    }
});
