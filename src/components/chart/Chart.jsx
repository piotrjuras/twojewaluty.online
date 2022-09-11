import React from 'react';
import ToolTip from './ToolTip';
import { AreaChart, Tooltip, Area, YAxis } from 'recharts';

const Chart = ({ chartData, margin, height, isGrowing }) => {

    return(
        <AreaChart
            height={height}
            width={window.innerWidth-40}
            data={chartData}
            margin={{top: 0, bottom: 0, left: 0, right: 0}}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor={isGrowing ? 'var(--red)' : 'var(--green)'} stopOpacity={1}/>
                    {/* <stop offset="95%" stopColor={isGrowing ? 'var(--green)' : 'var(--red)'} stopOpacity={0.5}/> */}
                    <stop offset="90%" stopColor="var(--white)" stopOpacity={0.5}/>

                </linearGradient>
            </defs>
            <Tooltip content={<ToolTip />} />
            <Area type="monotone" dataKey="value" stroke="var(--blue)" fillOpacity={1} fill="url(#colorUv)" />
            <YAxis width={0} domain={['dataMin - 0.01', 'dataMax + 0.01']} dx={70} dy={10} />
        </AreaChart>

    )
}

export default Chart;