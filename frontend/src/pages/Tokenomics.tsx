import React, { useEffect, useState } from "react";
import {
  PieChart as LucidePie,
  TrendingUp,
  Shield,
  Lock,
  Users
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  LabelList,
  Tooltip,
} from "recharts";
import { AnimatedSection, staggerChildren } from "../hooks/useScrollAnimation";

// Token distribution
const distribution = [
  {
    category: "Public Sale",
    percentage: 30,
    amount: "300,000,000",
    color: "#06b6d4", // cyan
    description: "Fair distribution to community members",
  },
  {
    category: "Ecosystem Development",
    percentage: 25,
    amount: "250,000,000",
    color: "#6366f1", // indigo
    description: "Funding for features, partnerships, innovations",
  },
  {
    category: "Team & Advisors",
    percentage: 20,
    amount: "200,000,000",
    color: "#a855f7", // purple
    description: "Vested over 24 months with 6-month cliff",
  },
  {
    category: "Liquidity Pool",
    percentage: 15,
    amount: "150,000,000",
    color: "#22c55e", // green
    description: "Ensuring market stability",
  },
  {
    category: "Marketing & Growth",
    percentage: 10,
    amount: "100,000,000",
    color: "#ec4899", // pink
    description: "Global awareness initiatives",
  },
];

const COLORS = distribution.map((d) => d.color);


// Custom active shape with pointer + text
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 120;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={4} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 10 : -10)}
        y={ey}
        textAnchor={textAnchor}
        fill="#fff"
        className="text-sm"
      >
        {payload.category} ({(percent * 100).toFixed(0)}%)
      </text>
    </g>
  );
};

const Tokenomics: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024); // Tailwind lg breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const tokenUtilities = [
    {
      title: "Transactions",
      description: "Medium of exchange on Tsionmart for goods & services",
      icon: TrendingUp,
    },
    {
      title: "Fee Discounts",
      description: "Reduced fees for trades and services when using wTSION",
      icon: Users,
    },
    {
      title: "Staking Rewards",
      description: "Earn yields by staking tokens",
      icon: Shield,
    },
    {
      title: "Governance",
      description: "Vote on proposals shaping the WorldStreet ecosystem",
      icon: Lock,
    },
    {
      title: "Collateral",
      description: "Secure crypto-backed loans using wTSION holdings",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <AnimatedSection animation="fadeInUp">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Token
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                omics
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transparent and sustainable token distribution designed for
              long-term ecosystem growth
            </p>
          </div>
        </AnimatedSection>

        {/* Token Distribution Circle */}
        <AnimatedSection animation="scaleIn">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-2">
              <LucidePie className="w-6 h-6" />
              <span>Token Distribution</span>
            </h2>

            <div className="w-full flex justify-center">
              <PieChart width={isLargeScreen ? 1200 : 400} height={400}>
                {distribution.map((entry, index) => {
                  const total = distribution.reduce((sum, d) => sum + d.percentage, 0);
                  const startAngle =
                    index === 0
                      ? 0
                      : distribution
                        .slice(0, index)
                        .reduce((sum, d) => sum + (360 * d.percentage) / total, 0);
                  const endAngle = startAngle + (360 * entry.percentage) / total;

                  if (isLargeScreen) {
                    // Large screen: arrows
                    const midAngle = (startAngle + endAngle) / 2;
                    const RADIAN = Math.PI / 180;
                    const cx = 600;
                    const cy = 200;
                    const innerRadius = 80;
                    const outerRadius = 140;
                    const sin = Math.sin(-RADIAN * midAngle);
                    const cos = Math.cos(-RADIAN * midAngle);
                    const sx = cx + (outerRadius + 10) * cos;
                    const sy = cy + (outerRadius + 10) * sin;
                    const mx = cx + (outerRadius + 30) * cos;
                    const my = cy + (outerRadius + 30) * sin;
                    const ex = mx + (cos >= 0 ? 1 : -1) * 80;
                    const ey = my;
                    const textAnchor = cos >= 0 ? "start" : "end";

                    return (
                      <g key={index}>
                        <Sector
                          cx={cx}
                          cy={cy}
                          innerRadius={innerRadius}
                          outerRadius={outerRadius}
                          startAngle={startAngle}
                          endAngle={endAngle}
                          fill={entry.color}
                        />
                        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={entry.color} fill="none" />
                        <circle cx={ex} cy={ey} r={3} fill={entry.color} stroke="none" />
                        <text
                          x={ex + (cos >= 0 ? 5 : -5)}
                          y={ey}
                          textAnchor={textAnchor}
                          fill="#fff"
                          className="text-sm"
                        >
                          {`${entry.category}: ${entry.percentage}% (${entry.amount})`}
                        </text>
                      </g>
                    );
                  } else {
                    // Small/medium screen: simple pie
                    return (
                      <Sector
                        key={index}
                        cx={200}
                        cy={200}
                        innerRadius={80}
                        outerRadius={140}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={entry.color}
                      />
                    );
                  }
                })}
              </PieChart>
            </div>

            {/* Legend for small/medium screens */}
            {!isLargeScreen && (
              <div className=" flex flex-wrap justify-center gap-4">
                {distribution.map((entry) => (
                  <div key={entry.category} className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-white text-sm">{`${entry.category}: ${entry.percentage}% (${entry.amount})`}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>



        {/* Token Utilities */}
        <AnimatedSection animation="fadeInRight">
          <div className="bg-white/5 backdrop-blur-md  rounded-2xl p-8 mb-20">
            <h3 className="text-2xl font-bold text-white mb-6">Token Utilities</h3>
            <div className="space-y-6 ">
              {tokenUtilities.map((utility, index) => (
                <AnimatedSection
                  key={index}
                  animation="fadeInUp"
                  delay={staggerChildren(index)}
                >
                  <div className="flex  items-start space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-700/40 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center ">
                      <utility.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">
                        {utility.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {utility.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Tokenomics;
