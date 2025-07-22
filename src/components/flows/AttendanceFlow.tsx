import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Settings,
  Camera,
  MapPin,
  Wifi,
  WifiOff
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AttendanceRegularizationFlow from './AttendanceRegularizationFlow';

interface AttendanceFlowProps {
  userRole: 'ISD' | 'Manager' | 'Admin';
}

const AttendanceFlow: React.FC<AttendanceFlowProps> = ({ userRole }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showRegularization, setShowRegularization] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveFromDate, setLeaveFromDate] = useState('');
  const [leaveToDate, setLeaveToDate] = useState('');

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? "Approved" : "Rejected",
      description: `Request has been ${action}d successfully.`,
    });
  };

  const handleRegularization = () => {
    // Only allow ISD and Manager roles to access regularization
    if (userRole === 'ISD' || userRole === 'Manager') {
      setShowRegularization(true);
    }
  };

  const handleGeofencedCheckin = () => {
    // Check if geolocation is available
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      return;
    }

    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setIsLocationEnabled(true);
        
        // Simulate geofence check (in real app, this would be validated against store coordinates)
        const isInGeofence = Math.random() > 0.3; // 70% chance of being in geofence for demo
        
        if (isInGeofence) {
          setShowCamera(true);
          toast({
            title: "Location Verified",
            description: `You are within the store premises. Please take a selfie to ${isCheckedIn ? 'check out' : 'check in'}.`,
          });
        } else {
          toast({
            title: "Location Error",
            description: "You are not within the store premises. Please move closer to the store.",
            variant: "destructive"
          });
        }
      },
      (error) => {
        toast({
          title: "Location Error",
          description: "Unable to get your location. Please enable location services.",
          variant: "destructive"
        });
      }
    );
  };

  const handleSelfieCapture = () => {
    // Simulate selfie capture
    setShowCamera(false);
    setIsCheckedIn(!isCheckedIn);
    toast({
      title: isCheckedIn ? "Checked Out Successfully" : "Checked In Successfully",
      description: `Selfie captured successfully. You have been ${isCheckedIn ? 'checked out' : 'checked in'}!`,
    });
  };

  const handleLeaveApplication = () => {
    if (!leaveType || !leaveFromDate || !leaveToDate || !leaveReason.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (leaveFromDate > leaveToDate) {
      toast({
        title: "Invalid Dates",
        description: "From date cannot be after to date.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Leave Applied",
      description: "Your leave application has been submitted for approval.",
    });

    // Reset form
    setLeaveType('');
    setLeaveFromDate('');
    setLeaveToDate('');
    setLeaveReason('');
    setShowLeaveForm(false);
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

  const leaveBalance = {
    casual: 8,
    sick: 12,
    annual: 15,
    personal: 5
  };

  const leaveHistory = [
    { id: '1', type: 'Casual', fromDate: '2024-01-10', toDate: '2024-01-12', days: 3, status: 'Approved', reason: 'Personal work' },
    { id: '2', type: 'Sick', fromDate: '2024-01-08', toDate: '2024-01-08', days: 1, status: 'Approved', reason: 'Fever' },
    { id: '3', type: 'Annual', fromDate: '2024-01-20', toDate: '2024-01-22', days: 3, status: 'Pending', reason: 'Family vacation' }
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

  if (showRegularization && (userRole === 'ISD' || userRole === 'Manager')) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowRegularization(false)}
          className="mb-4"
        >
          ← Back to Attendance
        </Button>
        <AttendanceRegularizationFlow userRole={userRole} />
      </div>
    );
  }

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
            <Tabs defaultValue="checkin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="checkin">
                  <span className="md:hidden">Check</span>
                  <span className="hidden md:inline">Check In/Out</span>
                </TabsTrigger>
                <TabsTrigger value="regularization">
                  <span className="md:hidden">Regular</span>
                  <span className="hidden md:inline">Regularization</span>
                </TabsTrigger>
                <TabsTrigger value="leaves">
                  <span className="md:hidden">Leaves</span>
                  <span className="hidden md:inline">Leave Management</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="checkin" className="space-y-4">
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
                    <Badge className={isCheckedIn ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                      {isCheckedIn ? "Checked In" : "Not Checked In"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-gray-600">Check In</div>
                      <div className="text-lg font-semibold">{isCheckedIn ? "09:00 AM" : "-"}</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-gray-600">{isCheckedIn ? "Check Out" : "Expected Check Out"}</div>
                      <div className="text-lg font-semibold">{isCheckedIn ? "-" : "06:30 PM"}</div>
                    </div>
                  </div>

                  {/* Geofenced Check-in Section */}
                  <Card className="border-2 border-dashed">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Camera className="w-5 h-5" />
                        Geofenced Selfie {isCheckedIn ? "Check-out" : "Check-in"}
                      </CardTitle>
                      <CardDescription>
                        Use location and selfie verification to mark attendance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        {isLocationEnabled ? (
                          <Wifi className="w-4 h-4 text-green-500" />
                        ) : (
                          <WifiOff className="w-4 h-4 text-red-500" />
                        )}
                        <span>Location: {currentLocation || 'Not detected'}</span>
                      </div>
                      
                      {showCamera ? (
                        <div className="space-y-4">
                          <div className="bg-gray-100 h-48 flex items-center justify-center rounded-lg">
                            <div className="text-center">
                              <Camera className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                              <p className="text-sm text-gray-600">Camera feed would appear here</p>
                              <p className="text-xs text-gray-500">Position yourself in the frame</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSelfieCapture} className="flex-1">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Capture Selfie
                            </Button>
                            <Button variant="outline" onClick={() => setShowCamera(false)} className="flex-1">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={handleGeofencedCheckin} className="w-full">
                          <MapPin className="w-4 h-4 mr-2" />
                          Start {isCheckedIn ? "Check-out" : "Check-in"}
                        </Button>
                      )}
                    </CardContent>
                  </Card>

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
                </div>
              </TabsContent>

              <TabsContent value="regularization" className="space-y-4">
                <Button 
                  onClick={handleRegularization}
                  className="w-full"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Request Attendance Regularization
                </Button>
                <div className="text-sm text-gray-600">
                  <p>• You can request up to 5 regularizations per month</p>
                  <p>• Regularization requests require manager approval</p>
                  <p>• Minimum work duration: 3 hours 45 minutes</p>
                </div>
              </TabsContent>

              <TabsContent value="leaves" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{leaveBalance.casual}</div>
                    <div className="text-xs text-gray-600">Casual Leave</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{leaveBalance.sick}</div>
                    <div className="text-xs text-gray-600">Sick Leave</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{leaveBalance.annual}</div>
                    <div className="text-xs text-gray-600">Annual Leave</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{leaveBalance.personal}</div>
                    <div className="text-xs text-gray-600">Personal Leave</div>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowLeaveForm(true)}
                  className="w-full mb-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Apply for Leave
                </Button>

                {showLeaveForm && (
                  <Card className="border-2 border-dashed">
                    <CardHeader>
                      <CardTitle>Apply for Leave</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="leaveType">Leave Type</Label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={leaveType}
                          onChange={(e) => setLeaveType(e.target.value)}
                        >
                          <option value="">Select leave type</option>
                          <option value="Casual">Casual Leave</option>
                          <option value="Sick">Sick Leave</option>
                          <option value="Annual">Annual Leave</option>
                          <option value="Personal">Personal Leave</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fromDate">From Date</Label>
                          <Input
                            type="date"
                            value={leaveFromDate}
                            onChange={(e) => setLeaveFromDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="toDate">To Date</Label>
                          <Input
                            type="date"
                            value={leaveToDate}
                            onChange={(e) => setLeaveToDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea
                          value={leaveReason}
                          onChange={(e) => setLeaveReason(e.target.value)}
                          placeholder="Enter reason for leave"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleLeaveApplication} className="flex-1">
                          Submit Application
                        </Button>
                        <Button variant="outline" onClick={() => setShowLeaveForm(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-3">
                  <h4 className="font-medium">Recent Leave Applications</h4>
                  {leaveHistory.map((leave) => (
                    <div key={leave.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{leave.type} Leave</p>
                          <p className="text-sm text-gray-600">
                            {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()} 
                            ({leave.days} day{leave.days > 1 ? 's' : ''})
                          </p>
                        </div>
                        <Badge variant={leave.status === 'Approved' ? 'default' : 'secondary'}>
                          {leave.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{leave.reason}</p>
                    </div>
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
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendance">
              <span className="md:hidden">Attendance</span>
              <span className="hidden md:inline">Team Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="regularizations">
              <span className="md:hidden">Requests</span>
              <span className="hidden md:inline">Regularization Requests</span>
            </TabsTrigger>
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
