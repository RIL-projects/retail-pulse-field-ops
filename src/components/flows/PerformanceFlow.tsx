import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  TrendingUp, 
  Target, 
  Award,
  BarChart3,
  Trophy,
  Calendar,
  Users,
  Download
} from "lucide-react";

interface PerformanceFlowProps {
  userRole: 'ISD' | 'Manager' | 'Admin';
}

const PerformanceFlow: React.FC<PerformanceFlowProps> = ({ userRole }) => {
  // Mock data
  const personalPerformance = {
    monthlyTarget: 100000,
    achieved: 65000,
    percentage: 65,
    categoryPerformance: [
      { category: 'Television', target: 40000, achieved: 28000, units: '4/6' },
      { category: 'Refrigerator', target: 35000, achieved: 22000, units: '3/5' },
      { category: 'Air Conditioner', target: 25000, achieved: 15000, units: '2/3' }
    ]
  };

  const teamPerformance = [
    { name: 'Rahul Kumar', target: 100000, achieved: 85000, percentage: 85, trend: 'up' },
    { name: 'Sunita Devi', target: 80000, achieved: 76000, percentage: 95, trend: 'up' },
    { name: 'Amit Sharma', target: 90000, achieved: 54000, percentage: 60, trend: 'down' },
    { name: 'Priya Singh', target: 85000, achieved: 89000, percentage: 105, trend: 'up' }
  ];

  const regionalData = [
    { region: 'North India', target: 5000000, achieved: 4250000, percentage: 85, stores: 45 },
    { region: 'South India', target: 4500000, achieved: 3600000, percentage: 80, stores: 38 },
    { region: 'West India', target: 6000000, achieved: 5400000, percentage: 90, stores: 52 },
    { region: 'East India', target: 3500000, achieved: 2800000, percentage: 80, stores: 35 }
  ];

  const topPerformers = [
    { name: 'Priya Singh', achievement: 105, category: 'Overall' },
    { name: 'Sunita Devi', achievement: 95, category: 'Television' },
    { name: 'Rajesh Kumar', achievement: 110, category: 'Refrigerator' },
    { name: 'Amit Gupta', achievement: 120, category: 'AC' }
  ];

  if (userRole === 'ISD') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              My Performance Dashboard
            </CardTitle>
            <CardDescription>Track your sales targets and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="categories">By Category</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Target Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">₹{personalPerformance.achieved.toLocaleString()}</p>
                        <p className="text-gray-600">of ₹{personalPerformance.monthlyTarget.toLocaleString()} target</p>
                      </div>
                      <Badge className={`text-lg px-3 py-1 ${
                        personalPerformance.percentage >= 100 ? 'bg-green-100 text-green-800' : 
                        personalPerformance.percentage >= 70 ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {personalPerformance.percentage}%
                      </Badge>
                    </div>
                    
                    <Progress value={personalPerformance.percentage} className="h-3" />
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Remaining: ₹{(personalPerformance.monthlyTarget - personalPerformance.achieved).toLocaleString()}</span>
                      <span>Days left: 15</span>
                    </div>

                    {personalPerformance.percentage >= 100 && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <Trophy className="w-5 h-5" />
                        <span className="font-medium">🎉 Target Achieved! You're eligible for incentive.</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <div className="text-sm text-gray-600">Sales This Month</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">8.5</div>
                      <div className="text-sm text-gray-600">Avg Sale Value (L)</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">3rd</div>
                      <div className="text-sm text-gray-600">Team Ranking</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="space-y-4">
                  {personalPerformance.categoryPerformance.map((category, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{category.category}</h3>
                          <Badge variant={
                            (category.achieved / category.target) >= 1 ? 'default' : 
                            (category.achieved / category.target) >= 0.7 ? 'secondary' : 'destructive'
                          }>
                            {Math.round((category.achieved / category.target) * 100)}%
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>₹{category.achieved.toLocaleString()} / ₹{category.target.toLocaleString()}</span>
                          </div>
                          <Progress value={(category.achieved / category.target) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Units: {category.units}</span>
                            <span>Gap: ₹{(category.target - category.achieved).toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userRole === 'Manager') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Performance Management
            </CardTitle>
            <CardDescription>Monitor and analyze your team's performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="team" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="team">Team Overview</TabsTrigger>
                <TabsTrigger value="individual">Individual Performance</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="team" className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">₹3.2L</div>
                      <div className="text-sm text-gray-600">Team Total</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">81%</div>
                      <div className="text-sm text-gray-600">Avg Achievement</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">2</div>
                      <div className="text-sm text-gray-600">Target Achievers</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">1</div>
                      <div className="text-sm text-gray-600">Needs Support</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ISD Name</TableHead>
                          <TableHead>Target</TableHead>
                          <TableHead>Achieved</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead>Trend</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamPerformance.map((member, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>₹{member.target.toLocaleString()}</TableCell>
                            <TableCell>₹{member.achieved.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={
                                member.percentage >= 100 ? 'default' : 
                                member.percentage >= 70 ? 'secondary' : 'destructive'
                              }>
                                {member.percentage}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <TrendingUp className={`w-4 h-4 ${
                                member.trend === 'up' ? 'text-green-500' : 'text-red-500'
                              }`} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="individual" className="space-y-4">
                <div className="space-y-4">
                  {teamPerformance.map((member, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{member.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={member.percentage >= 100 ? 'default' : 'secondary'}>
                              {member.percentage}%
                            </Badge>
                            {member.percentage >= 100 && <Trophy className="w-4 h-4 text-yellow-500" />}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Achievement</span>
                            <span>₹{member.achieved.toLocaleString()} / ₹{member.target.toLocaleString()}</span>
                          </div>
                          <Progress value={Math.min(member.percentage, 100)} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Performance Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Above 100%</span>
                          <span className="text-green-600">1 person (25%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>70% - 100%</span>
                          <span className="text-blue-600">2 people (50%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Below 70%</span>
                          <span className="text-red-600">1 person (25%)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Category Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Television</span>
                          <Badge className="bg-green-100 text-green-800">85%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Refrigerator</span>
                          <Badge>78%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Air Conditioner</span>
                          <Badge variant="secondary">72%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin view
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            System-wide Performance Analytics
          </CardTitle>
          <CardDescription>Comprehensive performance monitoring and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">System Overview</TabsTrigger>
              <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">245</div>
                    <div className="text-sm text-gray-600">Total ISDs</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">82%</div>
                    <div className="text-sm text-gray-600">Overall Achievement</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-gray-600">Target Achievers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">₹89L</div>
                    <div className="text-sm text-gray-600">Total Sales</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">28</div>
                    <div className="text-sm text-gray-600">Regions</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Top Performers (Company-wide)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{performer.name}</p>
                            <p className="text-sm text-gray-600">{performer.category} Category</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {performer.achievement}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regional" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Achieved</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Stores</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regionalData.map((region, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{region.region}</TableCell>
                      <TableCell>₹{(region.target / 100000).toFixed(1)}L</TableCell>
                      <TableCell>₹{(region.achieved / 100000).toFixed(1)}L</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={region.percentage >= 85 ? 'default' : 'secondary'}>
                            {region.percentage}%
                          </Badge>
                          <div className="w-20">
                            <Progress value={region.percentage} className="h-2" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{region.stores}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-900">Top Performing Region</p>
                      <p className="text-sm text-green-700">West India leads with 90% achievement</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900">Category Performance</p>
                      <p className="text-sm text-blue-700">Television category outperforming by 15%</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-yellow-900">Improvement Opportunity</p>
                      <p className="text-sm text-yellow-700">AC category needs attention in East region</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Trends & Forecasting</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Monthly Growth</span>
                      <span className="text-green-600 font-medium">+8.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Q1 Forecast</span>
                      <span className="text-blue-600 font-medium">₹125L</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Target Achievement Probability</span>
                      <Badge className="bg-green-100 text-green-800">87%</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Performance Summary Report</div>
                    <div className="text-sm text-gray-500">Comprehensive performance analysis</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Target vs Achievement</div>
                    <div className="text-sm text-gray-500">Detailed target analysis</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Top Performers Report</div>
                    <div className="text-sm text-gray-500">Star performer identification</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Regional Comparison</div>
                    <div className="text-sm text-gray-500">Zone-wise performance comparison</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Incentive Eligibility</div>
                    <div className="text-sm text-gray-500">Bonus qualification report</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Trend Analysis</div>
                    <div className="text-sm text-gray-500">Historical performance trends</div>
                  </div>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceFlow;
