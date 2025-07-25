import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Edit, 
  Upload, 
  Search, 
  Users, 
  Target,
  Download,
  Plus
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  role: string;
  zone: string;
  targets: {
    television: number;
    refrigerator: number;
    airConditioner: number;
  };
  achieved: {
    television: number;
    refrigerator: number;
    airConditioner: number;
  };
}

const UserTargetManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Mock user data
  const users: User[] = [
    {
      id: '1',
      name: 'Rahul Kumar',
      role: 'ISD',
      zone: 'North Zone',
      targets: { television: 100000, refrigerator: 80000, airConditioner: 60000 },
      achieved: { television: 85000, refrigerator: 65000, airConditioner: 35000 }
    },
    {
      id: '2',
      name: 'Sunita Devi',
      role: 'ISD',
      zone: 'South Zone',
      targets: { television: 120000, refrigerator: 90000, airConditioner: 70000 },
      achieved: { television: 92000, refrigerator: 75000, airConditioner: 55000 }
    },
    {
      id: '3',
      name: 'Amit Sharma',
      role: 'ISD',
      zone: 'East Zone',
      targets: { television: 90000, refrigerator: 70000, airConditioner: 50000 },
      achieved: { television: 45000, refrigerator: 30000, airConditioner: 25000 }
    },
    {
      id: '4',
      name: 'Priya Mehta',
      role: 'Manager',
      zone: 'West Zone',
      targets: { television: 500000, refrigerator: 400000, airConditioner: 300000 },
      achieved: { television: 420000, refrigerator: 350000, airConditioner: 250000 }
    },
    {
      id: '5',
      name: 'Ravi Singh',
      role: 'ISD',
      zone: 'Central Zone',
      targets: { television: 110000, refrigerator: 85000, airConditioner: 65000 },
      achieved: { television: 98000, refrigerator: 70000, airConditioner: 45000 }
    }
  ];

  const zones = ['all', 'North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'all' || user.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleSaveTargets = () => {
    toast({
      title: "Targets Updated",
      description: `Targets for ${selectedUser?.name} have been updated successfully.`,
    });
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleBulkUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "Please select a CSV file with user targets.",
    });
  };

  const getAchievementPercentage = (achieved: number, target: number) => {
    return Math.round((achieved / target) * 100);
  };

  const getOverallAchievement = (user: User) => {
    const totalTarget = user.targets.television + user.targets.refrigerator + user.targets.airConditioner;
    const totalAchieved = user.achieved.television + user.achieved.refrigerator + user.achieved.airConditioner;
    return Math.round((totalAchieved / totalTarget) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">User Target Management</h1>
                <p className="text-sm text-gray-500">Manage sales targets for all users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Target Configuration
            </CardTitle>
            <CardDescription>View and edit sales targets for all users</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="individual" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Individual Targets</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="space-y-4">
                {/* Filters */}
                <div className="flex gap-4 items-center">
                  <div className="flex-1 max-w-sm">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {zones.map(zone => (
                        <SelectItem key={zone} value={zone}>
                          {zone === 'all' ? 'All Zones' : zone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Television Target</TableHead>
                      <TableHead>Refrigerator Target</TableHead>
                      <TableHead>AC Target</TableHead>
                      <TableHead>Overall Achievement</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'Manager' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.zone}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>₹{user.targets.television.toLocaleString()}</div>
                            <div className="text-gray-500">
                              {getAchievementPercentage(user.achieved.television, user.targets.television)}% achieved
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>₹{user.targets.refrigerator.toLocaleString()}</div>
                            <div className="text-gray-500">
                              {getAchievementPercentage(user.achieved.refrigerator, user.targets.refrigerator)}% achieved
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>₹{user.targets.airConditioner.toLocaleString()}</div>
                            <div className="text-gray-500">
                              {getAchievementPercentage(user.achieved.airConditioner, user.targets.airConditioner)}% achieved
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getOverallAchievement(user) >= 80 ? 'default' : 'secondary'}>
                            {getOverallAchievement(user)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="bulk" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Bulk Upload Targets
                      </CardTitle>
                      <CardDescription>
                        Upload targets for multiple users using CSV file
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop your CSV file here, or click to browse
                        </p>
                        <Button variant="outline" onClick={handleBulkUpload}>
                          Select CSV File
                        </Button>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>CSV format: User ID, Name, TV Target, Refrigerator Target, AC Target</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Download Templates
                      </CardTitle>
                      <CardDescription>
                        Download template files for bulk operations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Target Upload Template
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Current User List
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Target Achievement Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Edit Target Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Targets - {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Update the sales targets for this user
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="tv-target">Television Target (₹)</Label>
                <Input
                  id="tv-target"
                  type="number"
                  defaultValue={selectedUser.targets.television}
                />
              </div>
              <div>
                <Label htmlFor="ref-target">Refrigerator Target (₹)</Label>
                <Input
                  id="ref-target"
                  type="number"
                  defaultValue={selectedUser.targets.refrigerator}
                />
              </div>
              <div>
                <Label htmlFor="ac-target">Air Conditioner Target (₹)</Label>
                <Input
                  id="ac-target"
                  type="number"
                  defaultValue={selectedUser.targets.airConditioner}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveTargets} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTargetManagement;