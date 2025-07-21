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
  Timer,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import AttendanceRegularizationFlow from './AttendanceRegularizationFlow';

interface AttendanceFlowProps {
  userRole: 'ISD' | 'Manager' | 'Admin';
}

const AttendanceFlow: React.FC<AttendanceFlowProps> = ({ userRole }) => {
  const [attendanceStatus, setAttendanceStatus] = useState('Not Checked In');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [checkinTime, setCheckinTime] = useState<Date | null>(null);
  const [showRegularization, setShowRegularization] = useState(false);

  // New state for attendance policy tracking
  const [weeklyLateAfter1PM, setWeeklyLateAfter1PM] = useState(0);
  const [weeklyHoursWorked, setWeeklyHoursWorked] = useState(32.5); // Mock data
  const [dailyHoursWorked, setDailyHoursWorked] = useState(0);

  const handleMarkAttendance = () => {
    if (!isCheckedIn) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour + (currentMinute / 60);
      
      setCheckinTime(now);
      
      // Check if arrival is after 1:00 PM (13:00)
      if (currentTime >= 13.0) {
        if (weeklyLateAfter1PM >= 1) {
          // Second late arrival after 1PM in the week - mark absent
          toast({
            title: "Marked Absent",
            description: "This is your second late arrival (after 1:00 PM) this week. Day marked as absent.",
            variant: "destructive"
          });
          setAttendanceStatus('Absent (Late Policy)');
          return;
        } else {
          // First late arrival after 1PM - allowed but flagged
          setWeeklyLateAfter1PM(1);
          toast({
            title: "Late Arrival Noted",
            description: "Arrived after 1:00 PM. This is your first such occurrence this week.",
            variant: "destructive"
          });
        }
      }
      
      setAttendanceStatus('Present');
      setIsCheckedIn(true);
      toast({
        title: "Attendance Marked",
        description: "Geofenced selfie verified successfully!",
      });
    } else {
      // Check out logic
      if (checkinTime) {
        const now = new Date();
        const hoursWorked = (now.getTime() - checkinTime.getTime()) / (1000 * 60 * 60);
        setDailyHoursWorked(hoursWorked);
        
        // Check minimum 3h 45m rule (3.75 hours)
        if (hoursWorked < 3.75) {
          setAttendanceStatus('Absent (Insufficient Hours)');
          toast({
            title: "Insufficient Hours",
            description: `Worked ${hoursWorked.toFixed(1)} hours. Minimum 3h 45m required. Day marked as absent.`,
            variant: "destructive"
          });
        } else {
          setAttendanceStatus('Checked Out');
          toast({
            title: "Checked Out",
            description: `Worked ${hoursWorked.toFixed(1)} hours today. Have a great day!`,
          });
        }
      }
      
      setIsCheckedIn(false);
      setCheckinTime(null);
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
    { name: 'Rahul Kumar', status: 'Present', time: '09:00 AM', duration: '4h 30m', weeklyHours: '38.5/40h', lateCount: 0 },
    { name: 'Sunita Devi', status: 'Present', time: '08:55 AM', duration: '4h 35m', weeklyHours: '40/40h', lateCount: 1 },
    { name: 'Amit Sharma', status: 'Late', time: '09:15 AM', duration: '4h 15m', weeklyHours: '35/40h', lateCount: 0 },
    { name: 'Priya Singh', status: 'Absent', time: '-', duration: '-', weeklyHours: '28/40h', lateCount: 2 }
  ];

  const weeklyExpectedHours = 40;
  const weeklyDeficit = Math.max(0, weeklyExpectedHours - weeklyHoursWorked);

  if (showRegularization) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => setShowRegularization(false)}>
            ← Back to Attendance
          </Button>
          <h2 className="text-lg font-semibold">Attendance Regularization</h2>
        </div>
        <AttendanceRegularizationFlow userRole={userRole as 'ISD' | 'Manager'} />
      </div>
    );
  }

  if (userRole === 'ISD') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Smart Attendance Management
            </CardTitle>
            <CardDescription>Flexible attendance with new policy rules</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
                <TabsTrigger value="policy">Policy Rules</TabsTrigger>
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
                      {checkinTime && (
                        <p className="text-xs text-gray-500">
                          Checked in at: {checkinTime.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge variant={isCheckedIn ? "default" : "secondary"}>
                    {isCheckedIn ? 'On Duty' : 'Off Duty'}
                  </Badge>
                </div>

                {/* Weekly Hours Tracking */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-blue-900">Weekly Hours Status</h3>
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Hours Worked:</span>
                        <span className="font-medium">{weeklyHoursWorked}h / {weeklyExpectedHours}h</span>
                      </div>
                      {weeklyDeficit > 0 && (
                        <div className="flex items-center gap-2 text-orange-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm">Deficit: {weeklyDeficit}h (make up by week end)</span>
                        </div>
                      )}
                      {weeklyLateAfter1PM > 0 && (
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">Late arrivals after 1PM this week: {weeklyLateAfter1PM}/1</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4">
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
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                    <MapPin className="w-4 h-4" />
                    <span>Electronics Hub Store</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Geofencing Active</p>
                  <p className="text-xs text-blue-700">You must be within store premises to mark attendance</p>
                </div>

                {/* Quick access to regularization */}
                <Button 
                  variant="outline" 
                  onClick={() => setShowRegularization(true)}
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Request Attendance Regularization
                </Button>
              </TabsContent>

              <TabsContent value="policy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">New Attendance Policy</CardTitle>
                    <CardDescription>Understanding the flexible attendance rules</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">✓ Late Arrival Compensation</h4>
                        <p className="text-sm text-green-800">
                          If you arrive late, you can compensate by working extra hours within the same week. 
                          Make sure to complete your weekly target hours.
                        </p>
                      </div>

                      <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                        <h4 className="font-medium text-orange-900 mb-2">⚠ Late After 1:00 PM Rule</h4>
                        <p className="text-sm text-orange-800">
                          One late arrival after 1:00 PM is allowed per week. Any additional late arrivals 
                          after 1:00 PM in the same week will be marked as absent.
                        </p>
                      </div>

                      <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">⏱ Minimum Hours Rule</h4>
                        <p className="text-sm text-blue-800">
                          You must work at least 3 hours 45 minutes on any day to be marked present. 
                          Less than this will result in the day being marked as absent.
                        </p>
                      </div>

                      <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2">📝 Regularization Available</h4>
                        <p className="text-sm text-purple-800">
                          You can regularize up to 5 missed attendance days per month through manager approval. 
                          New employees have no limit for the first 30 days.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                      <p className="text-sm text-gray-600">Status: {attendanceStatus}</p>
                      {dailyHoursWorked > 0 && (
                        <p className="text-sm text-gray-600">Hours: {dailyHoursWorked.toFixed(1)}h</p>
                      )}
                    </div>
                    <Badge className={
                      attendanceStatus.includes('Present') ? "bg-green-100 text-green-800" :
                      attendanceStatus.includes('Absent') ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }>
                      {attendanceStatus.includes('Present') ? 'Present' : 
                       attendanceStatus.includes('Absent') ? 'Absent' : 'Not Marked'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Weekly Summary</p>
                      <p className="text-sm text-gray-600">Hours: {weeklyHoursWorked}/{weeklyExpectedHours}</p>
                    </div>
                    <Badge variant={weeklyDeficit > 0 ? "destructive" : "default"}>
                      {weeklyDeficit > 0 ? `${weeklyDeficit}h Deficit` : 'On Track'}
                    </Badge>
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
              Advanced Team Attendance Management
            </CardTitle>
            <CardDescription>Monitor team with new flexible attendance policies</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="attendance">Team Attendance</TabsTrigger>
                <TabsTrigger value="approvals">Leave Approvals</TabsTrigger>
                <TabsTrigger value="regularization">Regularization</TabsTrigger>
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
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">2</div>
                    <div className="text-sm text-gray-600">Hour Deficits</div>
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
                          <div className="text-sm text-gray-600 space-y-1">
                            {member.status !== 'Absent' ? (
                              <p>In: {member.time} • Duration: {member.duration}</p>
                            ) : (
                              <p>No check-in today</p>
                            )}
                            <div className="flex items-center gap-4">
                              <span>Weekly: {member.weeklyHours}</span>
                              {member.lateCount > 0 && (
                                <span className="text-orange-600">
                                  Late >1PM: {member.lateCount} this week
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={
                          member.status === 'Present' ? 'default' : 
                          member.status === 'Late' ? 'secondary' : 'destructive'
                        }>
                          {member.status}
                        </Badge>
                        {member.weeklyHours.includes('/') && 
                         parseFloat(member.weeklyHours.split('/')[0]) < parseFloat(member.weeklyHours.split('/')[1].replace('h', '')) && (
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            Deficit
                          </Badge>
                        )}
                      </div>
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

              <TabsContent value="regularization" className="space-y-4">
                <AttendanceRegularizationFlow userRole="Manager" />
              </TabsContent>

              <TabsContent value="calendar" className="space-y-4">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center font-medium p-2 bg-gray-100 rounded">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">Upcoming Leaves</p>
                    <p className="text-sm text-blue-700">Sunita Devi - Casual Leave (Jan 25)</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="font-medium text-orange-900">Weekly Hour Alerts</p>
                    <p className="text-sm text-orange-700">2 team members have weekly hour deficits</p>
                  </div>
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
            Attendance Configuration & Policies
          </CardTitle>
          <CardDescription>Configure new flexible attendance policies and rules</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="policies" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="policies">New Policies</TabsTrigger>
              <TabsTrigger value="rules">Auto Rules</TabsTrigger>
              <TabsTrigger value="regularization">Regularization</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="policies" className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Flexible Attendance Policy</CardTitle>
                    <CardDescription>No more fixed shifts - focus on hours and productivity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Late Arrival Compensation</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Employees can compensate for late arrivals within the same week
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Status:</span>
                          <Badge>Active</Badge>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Late After 1:00 PM Rule</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          One occurrence per week allowed, additional occurrences = absent
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Weekly Limit:</span>
                          <Badge>1 occurrence</Badge>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Minimum Hours Threshold</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Minimum work hours required to count as present
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Minimum Hours:</span>
                          <Badge>3h 45m</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Regularization Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Monthly Regularization Limit</span>
                        <Badge>5 days</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>New Hire Exception Period</span>
                        <Badge>First 30 days</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Request Deadline</span>
                        <Badge>20th of next month</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                        <Label>Late Threshold (After 1 PM)</Label>
                        <Select defaultValue="13:00">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="13:00">1:00 PM</SelectItem>
                            <SelectItem value="13:30">1:30 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Minimum Work Hours</Label>
                        <Select defaultValue="3.75">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3.75">3h 45m</SelectItem>
                            <SelectItem value="4">4h 0m</SelectItem>
                            <SelectItem value="4.5">4h 30m</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Weekly Compensation Tracking</h4>
                      <div className="flex items-center gap-4">
                        <Label>Enable hour deficit tracking:</Label>
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

            <TabsContent value="regularization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Regularization Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">23</div>
                      <div className="text-sm text-gray-600">Pending Requests</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">89</div>
                      <div className="text-sm text-gray-600">Approved This Month</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">12</div>
                      <div className="text-sm text-gray-600">Rejected This Month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      View All Pending Regularizations
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Monthly Regularization Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Override Regularization Limits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Flexible Attendance Report</div>
                    <div className="text-sm text-gray-500">Hours-based attendance analysis</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Late Arrival Patterns</div>
                    <div className="text-sm text-gray-500">After 1 PM arrival tracking</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Weekly Hour Deficits</div>
                    <div className="text-sm text-gray-500">Compensation tracking report</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Regularization Analytics</div>
                    <div className="text-sm text-gray-500">Usage patterns and trends</div>
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
