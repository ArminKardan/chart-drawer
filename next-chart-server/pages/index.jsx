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
    }

    componentDidMount()
    {
      Router.push("./ch/1");
    }

    render()
    {
        return null; 
    }
});
