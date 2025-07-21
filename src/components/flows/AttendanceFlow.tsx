
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Users,
  FileText,
  Plus,
  Calendar,
  TrendingUp,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AttendanceFlowProps {
  userRole: 'ISD' | 'Manager' | 'Admin';
}

const AttendanceFlow: React.FC<AttendanceFlowProps> = ({ userRole }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showRegularization, setShowRegularization] = useState(false);

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? "Approved" : "Rejected",
      description: `Request has been ${action}d successfully.`,
    });
  };

  const handleRegularization = () => {
    setShowRegularization(true);
  };

  // Mock data
  const attendanceData = [
    { 
      id: '1', 
      name: 'Rahul Kumar', 
      store: 'Electronics Hub', 
      checkIn: '09:00 AM', 
      checkOut: '06:30 PM', 
      status: 'Present', 
      weeklyHours: 38.5, 
      regularizations: 2,
      lateCompensation: 0
    },
    { 
      id: '2', 
      name: 'Sunita Devi', 
      store: 'Tech World', 
      checkIn: '08:55 AM', 
      checkOut: '07:00 PM', 
      status: 'Present', 
      weeklyHours: 40, 
      regularizations: 1,
      lateCompensation: 1
    },
    { 
      id: '3', 
      name: 'Amit Sharma', 
      store: 'Digital Plaza', 
      checkIn: '09:15 AM', 
      checkOut: '06:45 PM', 
      status: 'Late', 
      weeklyHours: 35, 
      regularizations: 3,
      lateCompensation: 0
    },
    { 
      id: '4', 
      name: 'Priya Singh', 
      store: 'Mega Store', 
      checkIn: '-', 
      checkOut: '-', 
      status: 'Absent', 
      weeklyHours: 28, 
      regularizations: 4,
      lateCompensation: 0
    }
  ];

  const pendingRegularizations = [
    { id: '1', isd: 'Rahul Kumar', date: '2024-01-15', reason: 'Traffic jam', status: 'Pending', checkIn: '09:30 AM' },
    { id: '2', isd: 'Sunita Devi', date: '2024-01-14', reason: 'Medical emergency', status: 'Pending', checkIn: '10:00 AM' },
    { id: '3', isd: 'Amit Sharma', date: '2024-01-13', reason: 'Vehicle breakdown', status: 'Pending', checkIn: '09:45 AM' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeeklyHoursColor = (hours: number) => {
    if (hours >= 40) return 'text-green-600';
    if (hours >= 35) return 'text-orange-600';
    return 'text-red-600';
  };

  if (userRole === 'ISD') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              My Attendance
            </CardTitle>
            <CardDescription>
              Track your attendance and manage regularizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">38.5h</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">2/5</div>
                <div className="text-sm text-gray-600">Regularizations Used</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-gray-600">Late Compensations</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Today's Status</h3>
                <Badge className="bg-green-100 text-green-800">Present</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">Check In</div>
                  <div className="text-lg font-semibold">09:00 AM</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-gray-600">Expected Check Out</div>
                  <div className="text-lg font-semibold">06:30 PM</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Attendance Policy Reminders</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Flexible hours: Work anytime, minimum 3h 45m daily</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Late arrival: After 1 PM requires extra time next day</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <FileText className="w-4 h-4" />
                    <span>Regularization: 5 requests available per month</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleRegularization}
                className="w-full mt-4"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Request Attendance Regularization
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userRole === 'Manager') {
    return (
      <div className="space-y-6">
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendance">Team Attendance</TabsTrigger>
            <TabsTrigger value="regularizations">Regularization Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Attendance Overview</CardTitle>
                <CardDescription>
                  Real-time attendance tracking with new flexible policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">10</div>
                    <div className="text-sm text-gray-600">Present Today</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-sm text-gray-600">Late Arrivals</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-sm text-gray-600">Absent</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">92%</div>
                    <div className="text-sm text-gray-600">Weekly Compliance</div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Store</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Weekly Hours</TableHead>
                      <TableHead>Regularizations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.store}</TableCell>
                        <TableCell>{employee.checkIn}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={getWeeklyHoursColor(employee.weeklyHours)}>
                            {employee.weeklyHours}/40h
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={employee.regularizations > 3 ? 'text-red-600' : 'text-green-600'}>
                            {employee.regularizations}/5
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regularizations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Regularization Requests</CardTitle>
                <CardDescription>
                  Review and approve attendance regularization requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRegularizations.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{request.isd}</p>
                          <Badge variant="outline">Regularization</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Late arrival on {request.date} at {request.checkIn}
                        </p>
                        <p className="text-sm text-gray-500">Reason: {request.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(request.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproval(request.id, 'reject')}
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
        </Tabs>
      </div>
    );
  }

  if (userRole === 'Admin') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Attendance Policy Configuration
            </CardTitle>
            <CardDescription>
              Configure and manage attendance policies across the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Active Policies</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Flexible Hours Policy</div>
                      <div className="text-sm text-gray-600">Work anytime, minimum 3h 45m daily</div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Late Arrival Rule</div>
                      <div className="text-sm text-gray-600">After 1 PM requires compensation</div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Regularization Limit</div>
                      <div className="text-sm text-gray-600">5 requests per employee per month</div>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">System Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Pending Regularizations</span>
                    <span className="font-medium text-orange-600">23</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Weekly Hour Deficits</span>
                    <span className="font-medium text-red-600">12 employees</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Late Arrivals ({">"} 1PM)</span>
                    <span className="font-medium text-yellow-600">8 this week</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-sm">Policy Compliance</span>
                    <span className="font-medium text-green-600">87%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Policy Update Required</h4>
              <p className="text-sm text-gray-600 mb-3">
                Review and update attendance policies to ensure optimal workforce management.
              </p>
              <Button size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Update Policies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <div>Invalid user role</div>;
};

export default AttendanceFlow;
