'use client';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const SkillRadarChart = ({ data }) => {
  return (
    <div className="w-full h-[420px]">
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid
            stroke="#2c2f3f"
          
            radialLines
          />
          <PolarAngleAxis
            dataKey="skill"
            stroke="#f0f6fc"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tickCount={5}
            stroke="#444"
            axisLine={false}
            tick={{ fill: '#666', fontSize: 10 }}
          />
          <Radar
            name="2025"
            dataKey="value"
            stroke="#0090FF"
            strokeWidth={2}
            fill="#0090FF"
            fillOpacity={0.4}
            dot={{ r:3, stroke: '#0090FF', fill: '#0090FF', strokeWidth: 0,fillOpacity: 0.8 }}
          />
         
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;
