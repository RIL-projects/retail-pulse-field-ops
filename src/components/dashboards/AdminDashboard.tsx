
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Clock, 
  DollarSign,
  LogOut,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserCheck,
  Target,
  FileText,
  BarChart3,
  Package,
  Receipt,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AttendanceFlow from '@/components/flows/AttendanceFlow';
import SalesFlow from '@/components/flows/SalesFlow';
import DisplayFlow from '@/components/flows/DisplayFlow';
import PerformanceFlow from '@/components/flows/PerformanceFlow';
import ExpenseClaimFlow from '@/components/flows/ExpenseClaimFlow';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeFlow, setActiveFlow] = useState<string | null>(null);

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
    totalUsers: 150,
    activeManagers: 25,
    activeISDs: 120,
    pendingExpenseClaims: 8,
    monthlyExpenseTotal: 250000
  };

  if (activeFlow) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={() => setActiveFlow(null)}>
                  ← Back to Dashboard
                </Button>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Welcome, {user?.name}</h1>
                  <p className="text-sm text-gray-500">{user?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
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
          {activeFlow === 'attendance' && <AttendanceFlow userRole="Admin" />}
          {activeFlow === 'sales' && <SalesFlow userRole="Admin" />}
          {activeFlow === 'display' && <DisplayFlow userRole="Admin" />}
          {activeFlow === 'performance' && <PerformanceFlow userRole="Admin" />}
          {activeFlow === 'expenses' && <ExpenseClaimFlow userRole="Admin" />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-500">{user?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
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
        {/* Admin Control Modules */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('attendance')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Attendance System</h3>
                  <p className="text-sm text-gray-500 mt-1">Configure policies</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('sales')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Sales Management</h3>
                  <p className="text-sm text-gray-500 mt-1">System configuration</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('display')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Display Compliance</h3>
                  <p className="text-sm text-gray-500 mt-1">Monitor all stores</p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('performance')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Performance Analytics</h3>
                  <p className="text-sm text-gray-500 mt-1">System-wide reports</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('expenses')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Expense Claims</h3>
                  <p className="text-sm text-gray-500 mt-1">Approve manager claims</p>
                </div>
                <Receipt className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Managers</p>
                  <p className="text-2xl font-bold text-green-600">{systemStats.activeManagers}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active ISDs</p>
                  <p className="text-2xl font-bold text-purple-600">{systemStats.activeISDs}</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Claims</p>
                  <p className="text-2xl font-bold text-orange-600">{systemStats.pendingExpenseClaims}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                  <p className="text-xl font-bold text-indigo-600">₹{(systemStats.monthlyExpenseTotal / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="expenses">Expense Claims</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Policies</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reports">System Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent System Activity</CardTitle>
                  <CardDescription>Latest activities across the FFA system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">New Manager Expense Claim</p>
                        <p className="text-xs text-gray-500">John Smith submitted ₹25,000 travel claim</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Attendance Policy Updated</p>
                        <p className="text-xs text-gray-500">Flexible attendance rules now active</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">Regularization Requests</p>
                        <p className="text-xs text-gray-500">23 pending attendance regularizations</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Overall system performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>User Engagement</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance Compliance</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sales Target Achievement</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manager Expense Claims - Pending Approval</CardTitle>
                <CardDescription>Review and approve manager travel expense claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{systemStats.pendingExpenseClaims}</div>
                      <div className="text-sm text-gray-600">Pending Claims</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">42</div>
                      <div className="text-sm text-gray-600">Approved This Month</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">₹{(systemStats.monthlyExpenseTotal / 1000).toFixed(0)}K</div>
                      <div className="text-sm text-gray-600">Total Monthly Expenses</div>
                    </div>
                  </div>

                  <Button onClick={() => setActiveFlow('expenses')} className="w-full">
                    <Receipt className="w-4 h-4 mr-2" />
                    Review Pending Expense Claims
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>New Attendance Policy Configuration</CardTitle>
                <CardDescription>Manage flexible attendance rules and regularization settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Active Policies</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Flexible Hours Policy</span>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Late After 1PM Rule</span>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">3h 45m Minimum Rule</span>
                        <Badge>Active</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Regularization (5/month)</span>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">System Stats</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Regularization Requests</span>
                        <span className="font-medium">23 pending</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Weekly Hour Deficits</span>
                        <span className="font-medium">12 employees</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Late Arrivals (>1PM)</span>
                        <span className="font-medium">8 this week</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button onClick={() => setActiveFlow('attendance')} className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Attendance Policies
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead>Active Users</TableHead>
                      <TableHead>New This Month</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Administrators</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell><Badge>Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Managers</TableCell>
                      <TableCell>{systemStats.activeManagers}</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell><Badge>Active</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ISDs</TableCell>
                      <TableCell>{systemStats.activeISDs}</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell><Badge>Active</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>Generate comprehensive system reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Expense Claims Report</div>
                      <div className="text-sm text-gray-500">Manager travel expenses and approvals</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Attendance Analytics</div>
                      <div className="text-sm text-gray-500">Flexible attendance policy impact</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Regularization Trends</div>
                      <div className="text-sm text-gray-500">Usage patterns and approval rates</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">System Performance</div>
                      <div className="text-sm text-gray-500">Overall FFA system metrics</div>
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
