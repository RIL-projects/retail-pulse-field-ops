
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  MapPin, 
  Clock, 
  Calendar,
  UserCheck,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Timer
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AttendanceFlowProps {
  userRole: 'ISD' | 'Manager' | 'Admin';
}

const AttendanceFlow: React.FC<AttendanceFlowProps> = ({ userRole }) => {
  const [attendanceStatus, setAttendanceStatus] = useState('Not Checked In');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const handleMarkAttendance = () => {
    if (!isCheckedIn) {
      setAttendanceStatus('Present');
      setIsCheckedIn(true);
      toast({
        title: "Attendance Marked",
        description: "Geofenced selfie verified successfully!",
      });
    } else {
      setAttendanceStatus('Checked Out');
      setIsCheckedIn(false);
      toast({
        title: "Checked Out",
        description: "Have a great day!",
      });
    }
  };

  const handleLeaveApplication = () => {
    setShowLeaveForm(false);
    toast({
      title: "Leave Application Submitted",
      description: "Your manager will review and respond soon.",
    });
  };

  const handleApproval = (action: 'approve' | 'reject', item: string) => {
    toast({
      title: action === 'approve' ? "Approved" : "Rejected",
      description: `${item} has been ${action}d successfully.`,
    });
  };

  // Mock data
  const leaveBalance = {
    casual: 8,
    sick: 5,
    earned: 12
  };

  const pendingLeaves = [
    { id: '1', isd: 'Rahul Kumar', type: 'Sick Leave', dates: '2024-01-20 to 2024-01-21', reason: 'Fever and cold' },
    { id: '2', isd: 'Sunita Devi', type: 'Casual Leave', dates: '2024-01-25', reason: 'Personal work' }
  ];

  const teamAttendance = [
    { name: 'Rahul Kumar', status: 'Present', time: '09:00 AM', duration: '4h 30m' },
    { name: 'Sunita Devi', status: 'Present', time: '08:55 AM', duration: '4h 35m' },
    { name: 'Amit Sharma', status: 'Late', time: '09:15 AM', duration: '4h 15m' },
    { name: 'Priya Singh', status: 'Absent', time: '-', duration: '-' }
  ];

  if (userRole === 'ISD') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Attendance Management
            </CardTitle>
            <CardDescription>Mark your attendance and manage leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
                <TabsTrigger value="leave">Leave Management</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="attendance" className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isCheckedIn ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <p className="font-medium">Current Status</p>
                      <p className="text-sm text-gray-600">{attendanceStatus}</p>
                    </div>
                  </div>
                  <Badge variant={isCheckedIn ? "default" : "secondary"}>
                    {isCheckedIn ? 'On Duty' : 'Off Duty'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleMarkAttendance}
                    className={`flex items-center gap-2 ${
                      isCheckedIn 
                        ? 'bg-red-600 hover:bg-red-700' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    {isCheckedIn ? 'Mark Out' : 'Mark In'}
                  </Button>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Electronics Hub Store</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Geofencing Active</p>
                  <p className="text-xs text-blue-700">You must be within store premises to mark attendance</p>
                </div>
              </TabsContent>

              <TabsContent value="leave" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{leaveBalance.casual}</div>
                    <div className="text-sm text-gray-600">Casual Leave</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{leaveBalance.sick}</div>
                    <div className="text-sm text-gray-600">Sick Leave</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{leaveBalance.earned}</div>
                    <div className="text-sm text-gray-600">Earned Leave</div>
                  </div>
                </div>

                {!showLeaveForm ? (
                  <Button onClick={() => setShowLeaveForm(true)} className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Apply for Leave
                  </Button>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Leave Application</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="leaveType">Leave Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="casual">Casual Leave</SelectItem>
                              <SelectItem value="sick">Sick Leave</SelectItem>
                              <SelectItem value="earned">Earned Leave</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="leaveDates">Date(s)</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea placeholder="Enter reason for leave" />
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
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Today's Attendance</p>
                      <p className="text-sm text-gray-600">Check-in: 09:00 AM</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Present</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Casual Leave Application</p>
                      <p className="text-sm text-gray-600">Applied: 2024-01-15</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
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
              <UserCheck className="w-5 h-5" />
              Team Attendance Management
            </CardTitle>
            <CardDescription>Monitor your team's attendance and approve leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="attendance">Team Attendance</TabsTrigger>
                <TabsTrigger value="approvals">Leave Approvals</TabsTrigger>
                <TabsTrigger value="calendar">Team Calendar</TabsTrigger>
              </TabsList>

              <TabsContent value="attendance" className="space-y-4">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600">Present</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-sm text-gray-600">Late</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-sm text-gray-600">Absent</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-gray-600">Total Team</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {teamAttendance.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          member.status === 'Present' ? 'bg-green-500' : 
                          member.status === 'Late' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">
                            {member.status !== 'Absent' ? `In: ${member.time} • Duration: ${member.duration}` : 'No check-in today'}
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        member.status === 'Present' ? 'default' : 
                        member.status === 'Late' ? 'secondary' : 'destructive'
                      }>
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="approvals" className="space-y-4">
                <div className="space-y-4">
                  {pendingLeaves.map((leave) => (
                    <Card key={leave.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-medium">{leave.isd}</p>
                              <Badge variant="outline">{leave.type}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Dates: {leave.dates}</p>
                            <p className="text-sm text-gray-600">Reason: {leave.reason}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => handleApproval('approve', leave.isd)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproval('reject', leave.isd)}
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="space-y-4">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center font-medium p-2 bg-gray-100 rounded">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">Upcoming Leaves</p>
                  <p className="text-sm text-blue-700">Sunita Devi - Casual Leave (Jan 25)</p>
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
            <Timer className="w-5 h-5" />
            Attendance Configuration
          </CardTitle>
          <CardDescription>Configure attendance policies and shift management</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="shifts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="shifts">Shift Templates</TabsTrigger>
              <TabsTrigger value="policies">Leave Policies</TabsTrigger>
              <TabsTrigger value="rules">Auto Rules</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="shifts" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Shift Templates</h3>
                <Button>Create New Shift</Button>
              </div>
              
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Morning Shift</p>
                        <p className="text-sm text-gray-600">9:00 AM - 6:00 PM</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Evening Shift</p>
                        <p className="text-sm text-gray-600">1:00 PM - 10:00 PM</p>
                      </div>
                      <Badge variant="outline">Draft</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="policies" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Leave Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Casual Leave</span>
                          <span>12 days/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sick Leave</span>
                          <span>10 days/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Earned Leave</span>
                          <span>21 days/year</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Policy Rules</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p>• Leave carry-forward: 5 days max</p>
                        <p>• Advance leave: 30 days allowed</p>
                        <p>• Minimum notice: 1 day</p>
                        <p>• Consecutive leave: Manager approval required for 3+ days</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Auto Attendance Rules</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Late Threshold</Label>
                        <Select defaultValue="15">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Half-Day Hours</Label>
                        <Select defaultValue="4">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 hours</SelectItem>
                            <SelectItem value="4">4 hours</SelectItem>
                            <SelectItem value="5">5 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Auto Mark-Out</h4>
                      <div className="flex items-center gap-4">
                        <Label>End of day auto mark-out:</Label>
                        <Select defaultValue="enabled">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enabled">Enabled</SelectItem>
                            <SelectItem value="disabled">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Monthly Attendance Report</div>
                    <div className="text-sm text-gray-500">Export attendance data for payroll</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Leave Utilization Report</div>
                    <div className="text-sm text-gray-500">Track leave usage and balances</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Attendance Exceptions</div>
                    <div className="text-sm text-gray-500">ISDs with attendance issues</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Shift Compliance</div>
                    <div className="text-sm text-gray-500">Adherence to shift timings</div>
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

export default AttendanceFlow;
