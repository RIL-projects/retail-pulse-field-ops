import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
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
  Package
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AttendanceFlow from '@/components/flows/AttendanceFlow';
import SalesFlow from '@/components/flows/SalesFlow';
import DisplayFlow from '@/components/flows/DisplayFlow';
import PerformanceFlow from '@/components/flows/PerformanceFlow';

const ManagerDashboard = () => {
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

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? "Approved" : "Rejected",
      description: `Request has been ${action}d successfully.`,
    });
  };

  // Mock data
  const teamStats = {
    totalISDs: 12,
    presentToday: 10,
    lateToday: 1,
    absentToday: 1,
    teamTargetAchievement: 78
  };

  const pendingApprovals = [
    { id: '1', isd: 'Rahul Kumar', type: 'Leave Request', details: 'Sick Leave - 2 days', date: '2024-01-15', status: 'pending' },
    { id: '2', isd: 'Sunita Devi', type: 'Sales Entry', details: 'TV Sale - ₹85,000', date: '2024-01-14', status: 'pending' },
    { id: '3', isd: 'Amit Sharma', type: 'Sales Entry', details: 'Refrigerator - ₹45,000', date: '2024-01-14', status: 'pending' }
  ];

  const teamPerformance = [
    { isd: 'Rahul Kumar', store: 'Electronics Hub', attendance: '95%', target: 50000, achieved: 42000, status: 'On Track' },
    { isd: 'Sunita Devi', store: 'Tech World', attendance: '100%', target: 45000, achieved: 38000, status: 'On Track' },
    { isd: 'Amit Sharma', store: 'Digital Plaza', attendance: '90%', target: 40000, achieved: 28000, status: 'Behind' },
    { isd: 'Priya Singh', store: 'Mega Store', attendance: '98%', target: 55000, achieved: 51000, status: 'Ahead' }
  ];

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
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {teamStats.totalISDs} ISDs Under Management
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
          {activeFlow === 'attendance' && <AttendanceFlow userRole="Manager" />}
          {activeFlow === 'sales' && <SalesFlow userRole="Manager" />}
          {activeFlow === 'display' && <DisplayFlow userRole="Manager" />}
          {activeFlow === 'performance' && <PerformanceFlow userRole="Manager" />}
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
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-500">{user?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {teamStats.totalISDs} ISDs Under Management
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
        {/* Management Modules */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('attendance')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Team Attendance</h3>
                  <p className="text-sm text-gray-500 mt-1">Monitor & approve leaves</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('sales')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Sales Approvals</h3>
                  <p className="text-sm text-gray-500 mt-1">Review & approve sales</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('display')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Display Compliance</h3>
                  <p className="text-sm text-gray-500 mt-1">Monitor store compliance</p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('performance')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Team Performance</h3>
                  <p className="text-sm text-gray-500 mt-1">Track team targets</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total ISDs</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.totalISDs}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Present Today</p>
                  <p className="text-2xl font-bold text-green-600">{teamStats.presentToday}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Late/Absent</p>
                  <p className="text-2xl font-bold text-red-600">{teamStats.lateToday + teamStats.absentToday}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Team Target</p>
                  <p className="text-2xl font-bold text-purple-600">{teamStats.teamTargetAchievement}%</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="attendance">Team Attendance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Review and approve team requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{approval.isd}</p>
                          <Badge variant="outline">{approval.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{approval.details}</p>
                        <p className="text-xs text-gray-500">Submitted: {approval.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(approval.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproval(approval.id, 'reject')}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>Real-time attendance status of your team</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ISD Name</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>Check-in Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Rahul Kumar</TableCell>
                      <TableCell>Electronics Hub</TableCell>
                      <TableCell>09:00 AM</TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Present</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sunita Devi</TableCell>
                      <TableCell>Tech World</TableCell>
                      <TableCell>08:55 AM</TableCell>
                      <TableCell><Badge className="bg-green-100 text-green-800">Present</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Amit Sharma</TableCell>
                      <TableCell>Digital Plaza</TableCell>
                      <TableCell>09:15 AM</TableCell>
                      <TableCell><Badge className="bg-yellow-100 text-yellow-800">Late</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Priya Singh</TableCell>
                      <TableCell>Mega Store</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell><Badge className="bg-red-100 text-red-800">Absent</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Overview</CardTitle>
                <CardDescription>Monthly target vs achievement for each team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamPerformance.map((member, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{member.isd}</h3>
                          <p className="text-sm text-gray-500">{member.store}</p>
                        </div>
                        <Badge 
                          variant={member.status === 'Ahead' ? 'default' : member.status === 'Behind' ? 'destructive' : 'secondary'}
                        >
                          {member.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sales Progress</span>
                          <span>₹{member.achieved.toLocaleString()} / ₹{member.target.toLocaleString()}</span>
                        </div>
                        <Progress value={(member.achieved / member.target) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Attendance: {member.attendance}</span>
                          <span>{Math.round((member.achieved / member.target) * 100)}% of target</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Download comprehensive reports for your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Attendance Report</div>
                      <div className="text-sm text-gray-500">Monthly attendance summary</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Sales Report</div>
                      <div className="text-sm text-gray-500">Sales performance & approvals</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Target Analysis</div>
                      <div className="text-sm text-gray-500">Target vs achievement report</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium">Display Compliance</div>
                      <div className="text-sm text-gray-500">Store display tracking report</div>
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

export default ManagerDashboard;
