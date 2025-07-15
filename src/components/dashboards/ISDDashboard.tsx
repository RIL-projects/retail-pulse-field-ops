import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Camera, 
  MapPin, 
  TrendingUp, 
  Target, 
  Calendar,
  LogOut,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Package,
  Trophy,
  ShoppingCart,
  FileText,
  BarChart3
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import AttendanceFlow from '@/components/flows/AttendanceFlow';
import SalesFlow from '@/components/flows/SalesFlow';
import DisplayFlow from '@/components/flows/DisplayFlow';
import PerformanceFlow from '@/components/flows/PerformanceFlow';

const ISDDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [attendanceStatus, setAttendanceStatus] = useState('Not Checked In');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [activeFlow, setActiveFlow] = useState<string | null>(null);

  const handleMarkAttendance = () => {
    if (!isCheckedIn) {
      setAttendanceStatus('Present');
      setIsCheckedIn(true);
      toast({
        title: "Attendance Marked",
        description: "You have successfully checked in!",
      });
    } else {
      setAttendanceStatus('Checked Out');
      setIsCheckedIn(false);
      toast({
        title: "Checked Out",
        description: "You have successfully checked out!",
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Mock data
  const salesData = {
    target: 100000,
    achieved: 65000,
    percentage: 65
  };

  const todaysActivities = [
    { id: 1, type: 'attendance', status: 'completed', time: '09:00 AM', description: 'Checked in at Electronics Store' },
    { id: 2, type: 'sales', status: 'pending', time: '10:30 AM', description: 'TV Sale - Invoice #INV001 (Pending Approval)' },
    { id: 3, type: 'display', status: 'completed', time: '02:15 PM', description: 'Display tracking updated' }
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
                <Badge variant={isCheckedIn ? "default" : "secondary"}>
                  {attendanceStatus}
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
          {activeFlow === 'attendance' && <AttendanceFlow userRole="ISD" />}
          {activeFlow === 'sales' && <SalesFlow userRole="ISD" />}
          {activeFlow === 'display' && <DisplayFlow userRole="ISD" />}
          {activeFlow === 'performance' && <PerformanceFlow userRole="ISD" />}
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
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Welcome, {user?.name}</h1>
                <p className="text-sm text-gray-500">{user?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={isCheckedIn ? "default" : "secondary"}>
                {attendanceStatus}
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('attendance')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Attendance</h3>
                  <p className="text-sm text-gray-500 mt-1">Mark attendance & apply for leave</p>
                </div>
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('sales')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Sales Entry</h3>
                  <p className="text-sm text-gray-500 mt-1">Record sales & track approvals</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('display')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Display Tracking</h3>
                  <p className="text-sm text-gray-500 mt-1">Update product displays</p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveFlow('performance')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">My Performance</h3>
                  <p className="text-sm text-gray-500 mt-1">Track targets & achievements</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="targets">Targets</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Monthly Performance
                  </CardTitle>
                  <CardDescription>Your progress towards monthly targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sales Target</span>
                      <span>₹{salesData.achieved.toLocaleString()} / ₹{salesData.target.toLocaleString()}</span>
                    </div>
                    <Progress value={salesData.percentage} className="h-2" />
                    <p className="text-sm text-gray-600">{salesData.percentage}% of target achieved</p>
                  </div>
                  {salesData.percentage >= 100 && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm font-medium">Target Achieved! You're eligible for incentive.</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Activities
                  </CardTitle>
                  <CardDescription>Your activities for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todaysActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="mt-1">
                          {activity.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : activity.status === 'pending' ? (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Your attendance record and leave status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">22</div>
                    <div className="text-sm text-gray-600">Days Present</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-gray-600">Days Absent</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">Leave Balance</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Your sales entries and approval status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Samsung TV - 55" QLED</p>
                      <p className="text-sm text-gray-500">Invoice: INV001 • Qty: 1 • ₹85,000</p>
                    </div>
                    <Badge variant="secondary">Pending Approval</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">LG Refrigerator - 260L</p>
                      <p className="text-sm text-gray-500">Invoice: INV002 • Qty: 1 • ₹45,000</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Target Breakdown</CardTitle>
                <CardDescription>Category-wise target vs achievement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Television', target: 40000, achieved: 28000, units: '4/6' },
                    { category: 'Refrigerator', target: 35000, achieved: 22000, units: '3/5' },
                    { category: 'Air Conditioner', target: 25000, achieved: 15000, units: '2/3' }
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-sm text-gray-500">₹{item.achieved.toLocaleString()} / ₹{item.target.toLocaleString()}</span>
                      </div>
                      <Progress value={(item.achieved / item.target) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Units: {item.units}</span>
                        <span>{Math.round((item.achieved / item.target) * 100)}% achieved</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ISDDashboard;
