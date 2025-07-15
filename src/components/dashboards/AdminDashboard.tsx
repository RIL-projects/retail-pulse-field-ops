
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  TrendingUp, 
  Database,
  LogOut,
  Upload,
  Download,
  BarChart3,
  Calendar,
  Target,
  MapPin,
  Building2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Mock data
  const systemStats = {
    totalISDs: 245,
    totalManagers: 28,
    totalStores: 180,
    overallTargetAchievement: 82
  };

  const recentActivities = [
    { action: 'Bulk Target Upload', user: 'Admin', time: '2 hours ago', status: 'completed' },
    { action: 'New Store Added', user: 'Admin', time: '1 day ago', status: 'completed' },
    { action: 'Leave Policy Update', user: 'Admin', time: '2 days ago', status: 'completed' }
  ];

  const regionalPerformance = [
    { region: 'North India', isds: 68, targetAchievement: 85, attendanceRate: 94 },
    { region: 'South India', isds: 72, targetAchievement: 78, attendanceRate: 96 },
    { region: 'West India', isds: 55, targetAchievement: 88, attendanceRate: 91 },
    { region: 'East India', isds: 50, targetAchievement: 79, attendanceRate: 93 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-500">{user?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                System Administrator
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total ISDs</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalISDs}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Managers</p>
                  <p className="text-2xl font-bold text-green-600">{systemStats.totalManagers}</p>
                </div>
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Stores</p>
                  <p className="text-2xl font-bold text-orange-600">{systemStats.totalStores}</p>
                </div>
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Target</p>
                  <p className="text-2xl font-bold text-purple-600">{systemStats.overallTargetAchievement}%</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="bulk-ops">Bulk Operations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>Performance overview across all regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionalPerformance.map((region) => (
                      <div key={region.region} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{region.region}</span>
                          <span className="text-sm text-gray-500">{region.isds} ISDs</span>
                        </div>
                        <Progress value={region.targetAchievement} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Target: {region.targetAchievement}%</span>
                          <span>Attendance: {region.attendanceRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent System Activities</CardTitle>
                  <CardDescription>Latest administrative actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">by {activity.user} • {activity.time}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold">User Management</h3>
                  </div>
                  <p className="text-sm text-gray-600">Manage ISDs, Managers, and Admin users</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold">Shift & Leave Policies</h3>
                  </div>
                  <p className="text-sm text-gray-600">Configure attendance rules and leave policies</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold">Target Configuration</h3>
                  </div>
                  <p className="text-sm text-gray-600">Set sales targets and incentive rules</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-6 h-6 text-orange-600" />
                    <h3 className="font-semibold">Store Management</h3>
                  </div>
                  <p className="text-sm text-gray-600">Manage store locations and geofencing</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="w-6 h-6 text-red-600" />
                    <h3 className="font-semibold">Product Master</h3>
                  </div>
                  <p className="text-sm text-gray-600">Maintain product catalog and categories</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                    <h3 className="font-semibold">Display Norms</h3>
                  </div>
                  <p className="text-sm text-gray-600">Configure display compliance rules</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bulk-ops" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Bulk Upload Operations
                  </CardTitle>
                  <CardDescription>Upload data in bulk using CSV/Excel files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload ISD-Store Mappings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Manager-Team Mappings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Sales Targets
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Product Master Data
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Data Export Operations
                  </CardTitle>
                  <CardDescription>Export system data for analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export User Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Store Mappings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Target Configurations
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Product Catalog
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics & Insights</CardTitle>
                <CardDescription>Data-driven insights across all operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Attendance vs Performance</h4>
                    <p className="text-sm text-blue-700 mt-1">Correlation analysis available</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Top Performers</h4>
                    <p className="text-sm text-green-700 mt-1">85% target achievement rate</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900">Product Contribution</h4>
                    <p className="text-sm text-purple-700 mt-1">TV category leading at 45%</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-900">Display Compliance</h4>
                    <p className="text-sm text-orange-700 mt-1">78% stores fully compliant</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-900">Regional Trends</h4>
                    <p className="text-sm text-red-700 mt-1">West region outperforming</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-900">Forecasting</h4>
                    <p className="text-sm text-indigo-700 mt-1">Q1 targets on track</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>Generate comprehensive reports across all modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Global Attendance Report</div>
                      <div className="text-sm text-gray-500">All ISDs attendance summary</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Comprehensive Sales Report</div>
                      <div className="text-sm text-gray-500">All sales entries and approvals</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Target Achievement Report</div>
                      <div className="text-sm text-gray-500">System-wide target analysis</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Display Compliance Report</div>
                      <div className="text-sm text-gray-500">Store-wise display tracking</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Incentive Eligibility Report</div>
                      <div className="text-sm text-gray-500">ISDs eligible for incentives</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Manager Performance Report</div>
                      <div className="text-sm text-gray-500">Team management effectiveness</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
