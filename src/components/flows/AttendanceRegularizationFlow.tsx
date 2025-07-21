
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AttendanceRegularizationFlowProps {
  userRole: 'ISD' | 'Manager';
}

interface RegularizationRequest {
  id: string;
  employeeName: string;
  date: string;
  inTime: string;
  outTime: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submissionDate: string;
  rejectionComment?: string;
  workDuration?: string;
}

interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Not Marked' | 'Present (Regularized)';
  inTime?: string;
  outTime?: string;
  canRegularize: boolean;
}

const AttendanceRegularizationFlow: React.FC<AttendanceRegularizationFlowProps> = ({ userRole }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [inTime, setInTime] = useState('');
  const [outTime, setOutTime] = useState('');
  const [reason, setReason] = useState('');
  const [showRegularizationForm, setShowRegularizationForm] = useState(false);

  // Mock data for attendance records
  const attendanceRecords: AttendanceRecord[] = [
    { date: '2024-01-15', status: 'Present', inTime: '09:00', outTime: '18:00', canRegularize: false },
    { date: '2024-01-16', status: 'Not Marked', canRegularize: true },
    { date: '2024-01-17', status: 'Absent', canRegularize: true },
    { date: '2024-01-18', status: 'Present', inTime: '09:15', outTime: '18:15', canRegularize: false },
    { date: '2024-01-19', status: 'Not Marked', canRegularize: true },
    { date: '2024-01-20', status: 'Present (Regularized)', inTime: '09:30', outTime: '18:30', canRegularize: false },
  ];

  // Mock regularization requests
  const myRequests: RegularizationRequest[] = [
    {
      id: '1',
      employeeName: 'Rahul Kumar',
      date: '2024-01-12',
      inTime: '09:30',
      outTime: '18:30',
      reason: 'Forgot to check-in on app due to network issue',
      status: 'Approved',
      submissionDate: '2024-01-13',
      workDuration: '9h 0m'
    },
    {
      id: '2',
      employeeName: 'Rahul Kumar',
      date: '2024-01-14',
      inTime: '10:00',
      outTime: '19:00',
      reason: 'Device issue - phone was not working',
      status: 'Pending',
      submissionDate: '2024-01-15',
      workDuration: '9h 0m'
    }
  ];

  const pendingRequests: RegularizationRequest[] = [
    {
      id: '3',
      employeeName: 'Sunita Devi',
      date: '2024-01-15',
      inTime: '09:45',
      outTime: '18:45',
      reason: 'Network outage in the area, could not check-in',
      status: 'Pending',
      submissionDate: '2024-01-16',
      workDuration: '9h 0m'
    },
    {
      id: '4',
      employeeName: 'Amit Sharma',
      date: '2024-01-14',
      inTime: '08:30',
      outTime: '17:30',
      reason: 'Forgot to check-in, was busy with customer',
      status: 'Pending',
      submissionDate: '2024-01-15',
      workDuration: '9h 0m'
    }
  ];

  const [requests, setRequests] = useState(myRequests);
  const [managerPendingRequests, setManagerPendingRequests] = useState(pendingRequests);

  const calculateWorkDuration = (inTime: string, outTime: string): string => {
    if (!inTime || !outTime) return '';
    
    const inDate = new Date(`2024-01-01T${inTime}`);
    const outDate = new Date(`2024-01-01T${outTime}`);
    const diffMs = outDate.getTime() - inDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}h ${diffMins}m`;
  };

  const getCurrentMonthRegularizations = (): number => {
    const currentMonth = new Date().getMonth();
    return requests.filter(req => {
      const reqDate = new Date(req.submissionDate);
      return reqDate.getMonth() === currentMonth && req.status === 'Approved';
    }).length;
  };

  const isNewHire = (): boolean => {
    // Mock logic - assume employee joined 15 days ago
    return true; // For demo purposes
  };

  const canSubmitMoreRequests = (): boolean => {
    const currentRegularizations = getCurrentMonthRegularizations();
    const limit = isNewHire() ? 999 : 5; // No limit for new hires in first 30 days
    return currentRegularizations < limit;
  };

  const submitRegularization = () => {
    if (!selectedDate || !inTime || !outTime || !reason.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (inTime >= outTime) {
      toast({
        title: "Invalid Time",
        description: "Out time must be after in time.",
        variant: "destructive"
      });
      return;
    }

    const workDuration = calculateWorkDuration(inTime, outTime);
    const totalMinutes = parseInt(workDuration.split('h')[0]) * 60 + parseInt(workDuration.split('h')[1].split('m')[0]);
    
    if (totalMinutes < 225) { // Less than 3h 45m
      toast({
        title: "Insufficient Hours",
        description: "Work duration must be at least 3 hours 45 minutes.",
        variant: "destructive"
      });
      return;
    }

    if (!canSubmitMoreRequests()) {
      toast({
        title: "Monthly Limit Reached",
        description: "You have reached the maximum of 5 regularizations for this month.",
        variant: "destructive"
      });
      return;
    }

    const newRequest: RegularizationRequest = {
      id: Date.now().toString(),
      employeeName: 'Rahul Kumar',
      date: selectedDate,
      inTime,
      outTime,
      reason,
      status: 'Pending',
      submissionDate: new Date().toISOString().split('T')[0],
      workDuration
    };

    setRequests([...requests, newRequest]);
    setShowRegularizationForm(false);
    setSelectedDate('');
    setInTime('');
    setOutTime('');
    setReason('');

    toast({
      title: "Regularization Submitted",
      description: "Your attendance regularization request has been sent to your manager for approval.",
    });
  };

  const handleManagerApproval = (requestId: string, action: 'approve' | 'reject', comment?: string) => {
    setManagerPendingRequests(managerPendingRequests.map(req => 
      req.id === requestId 
        ? { ...req, status: action === 'approve' ? 'Approved' : 'Rejected', rejectionComment: comment }
        : req
    ));

    toast({
      title: action === 'approve' ? "Request Approved" : "Request Rejected",
      description: `Attendance regularization has been ${action}d.`,
    });
  };

  if (userRole === 'ISD') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Attendance Regularization
            </CardTitle>
            <CardDescription>
              Request regularization for missed attendance entries
              {!isNewHire() && (
                <span className="block text-sm mt-1">
                  Monthly limit: {getCurrentMonthRegularizations()}/5 used
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="attendance" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="attendance">My Attendance</TabsTrigger>
                <TabsTrigger value="requests">My Requests</TabsTrigger>
              </TabsList>

              <TabsContent value="attendance" className="space-y-4">
                <div className="space-y-3">
                  {attendanceRecords.map((record) => (
                    <div key={record.date} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          record.status === 'Present' || record.status === 'Present (Regularized)' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{new Date(record.date).toLocaleDateString()}</p>
                          {record.inTime && record.outTime && (
                            <p className="text-sm text-gray-600">
                              {record.inTime} - {record.outTime}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          record.status === 'Present' ? 'default' :
                          record.status === 'Present (Regularized)' ? 'secondary' :
                          'destructive'
                        }>
                          {record.status}
                        </Badge>
                        {record.canRegularize && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedDate(record.date);
                              setShowRegularizationForm(true);
                            }}
                            disabled={!canSubmitMoreRequests()}
                          >
                            Regularize
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {showRegularizationForm && (
                  <Card className="border-2 border-dashed">
                    <CardHeader>
                      <CardTitle className="text-lg">Request Regularization</CardTitle>
                      <CardDescription>
                        Date: {new Date(selectedDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="inTime">In Time</Label>
                          <Input
                            type="time"
                            value={inTime}
                            onChange={(e) => setInTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="outTime">Out Time</Label>
                          <Input
                            type="time"
                            value={outTime}
                            onChange={(e) => setOutTime(e.target.value)}
                          />
                        </div>
                      </div>

                      {inTime && outTime && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-900">
                            Work Duration: {calculateWorkDuration(inTime, outTime)}
                          </p>
                          <p className="text-xs text-blue-700">
                            Minimum required: 3h 45m
                          </p>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="reason">Reason for Regularization</Label>
                        <Textarea
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Explain why attendance was not marked (e.g., forgot to check-in, device issue, network problem)"
                          maxLength={200}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {reason.length}/200 characters
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={submitRegularization} className="flex-1">
                          Submit Request
                        </Button>
                        <Button variant="outline" onClick={() => setShowRegularizationForm(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="requests" className="space-y-4">
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium">{new Date(request.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">
                              Submitted: {new Date(request.submissionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={
                            request.status === 'Approved' ? 'default' :
                            request.status === 'Rejected' ? 'destructive' :
                            'secondary'
                          }>
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Work Hours:</span>
                            <span>{request.inTime} - {request.outTime} ({request.workDuration})</span>
                          </div>
                          <div>
                            <span className="font-medium">Reason:</span>
                            <p className="text-gray-600 mt-1">{request.reason}</p>
                          </div>
                        </div>

                        {request.rejectionComment && (
                          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                            <p className="text-sm text-red-600">
                              <strong>Manager's Comment:</strong> {request.rejectionComment}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {requests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No regularization requests submitted yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Manager view
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Team Attendance Regularization
          </CardTitle>
          <CardDescription>Review and approve attendance regularization requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {managerPendingRequests.map((request) => (
              <Card key={request.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{request.employeeName}</h3>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(request.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(request.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary">{request.status}</Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">In Time:</span>
                        <p>{request.inTime}</p>
                      </div>
                      <div>
                        <span className="font-medium">Out Time:</span>
                        <p>{request.outTime}</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-sm">Work Duration:</span>
                      <p className="text-lg font-bold text-green-600">{request.workDuration}</p>
                    </div>

                    <div>
                      <span className="font-medium text-sm">Reason:</span>
                      <p className="text-gray-600 mt-1">{request.reason}</p>
                    </div>
                  </div>

                  {request.status === 'Pending' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleManagerApproval(request.id, 'approve')}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const comment = prompt("Enter rejection reason (optional):");
                          handleManagerApproval(request.id, 'reject', comment || undefined);
                        }}
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {managerPendingRequests.filter(req => req.status === 'Pending').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No pending regularization requests</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceRegularizationFlow;
