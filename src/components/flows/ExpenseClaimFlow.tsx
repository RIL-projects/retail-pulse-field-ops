
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Trash2, 
  Upload, 
  Camera,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ExpenseClaimFlowProps {
  userRole: 'Manager' | 'Admin';
}

interface ExpenseItem {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  attachment: File | null;
}

interface Claim {
  id: string;
  managerName: string;
  submissionDate: string;
  totalAmount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  items: ExpenseItem[];
  rejectionReason?: string;
}

const ExpenseClaimFlow: React.FC<ExpenseClaimFlowProps> = ({ userRole }) => {
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([]);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ExpenseItem>>({
    date: '',
    category: '',
    amount: 0,
    description: '',
    attachment: null
  });

  // Mock data for existing claims
  const mockClaims: Claim[] = [
    {
      id: '1',
      managerName: 'John Smith',
      submissionDate: '2024-01-15',
      totalAmount: 25000,
      status: 'Pending',
      items: [
        { id: '1', date: '2024-01-10', category: 'Outstation Travel', amount: 15000, description: 'Flight to Mumbai for client meeting', attachment: null },
        { id: '2', date: '2024-01-11', category: 'Outstation Daily Expenses', amount: 10000, description: 'Hotel stay and meals in Mumbai', attachment: null }
      ]
    },
    {
      id: '2',
      managerName: 'Sarah Johnson',
      submissionDate: '2024-01-12',
      totalAmount: 8500,
      status: 'Approved',
      items: [
        { id: '3', date: '2024-01-08', category: 'Local Travel', amount: 8500, description: 'Local conveyance for store visits', attachment: null }
      ]
    }
  ];

  const [myClaims, setMyClaims] = useState<Claim[]>(mockClaims.filter(c => c.managerName === 'John Smith'));
  const [pendingClaims, setPendingClaims] = useState<Claim[]>(mockClaims.filter(c => c.status === 'Pending'));

  const expenseCategories = [
    'Local Travel Expenses',
    'Outstation Travel (to/from base location)',
    'Outstation Daily Expenses (Stay/Food/Local Travel at destination)'
  ];

  const addExpenseItem = () => {
    if (!newItem.date || !newItem.category || !newItem.amount || !newItem.description || !newItem.attachment) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and upload an attachment.",
        variant: "destructive"
      });
      return;
    }

    const item: ExpenseItem = {
      id: Date.now().toString(),
      date: newItem.date!,
      category: newItem.category!,
      amount: newItem.amount!,
      description: newItem.description!,
      attachment: newItem.attachment!
    };

    setExpenseItems([...expenseItems, item]);
    setNewItem({ date: '', category: '', amount: 0, description: '', attachment: null });
    setShowNewItemForm(false);
    
    toast({
      title: "Expense Added",
      description: "Expense item added to your claim.",
    });
  };

  const removeExpenseItem = (id: string) => {
    setExpenseItems(expenseItems.filter(item => item.id !== id));
  };

  const submitClaim = () => {
    if (expenseItems.length === 0) {
      toast({
        title: "No Expenses",
        description: "Please add at least one expense item.",
        variant: "destructive"
      });
      return;
    }

    const totalAmount = expenseItems.reduce((sum, item) => sum + item.amount, 0);
    
    toast({
      title: "Claim Submitted",
      description: `Expense claim for ₹${totalAmount.toLocaleString()} submitted for approval.`,
    });

    // Reset form
    setExpenseItems([]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewItem({ ...newItem, attachment: file });
    }
  };

  const handleApproval = (claimId: string, action: 'approve' | 'reject', reason?: string) => {
    setPendingClaims(pendingClaims.map(claim => 
      claim.id === claimId 
        ? { ...claim, status: action === 'approve' ? 'Approved' : 'Rejected', rejectionReason: reason }
        : claim
    ));

    toast({
      title: action === 'approve' ? "Claim Approved" : "Claim Rejected",
      description: `Expense claim has been ${action}d successfully.`,
    });
  };

  if (userRole === 'Manager') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Travel Expense Claims
            </CardTitle>
            <CardDescription>Submit and track your travel expense claims</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="submit" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="submit">Submit New Claim</TabsTrigger>
                <TabsTrigger value="history">My Claims</TabsTrigger>
              </TabsList>

              <TabsContent value="submit" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Expense Items</h3>
                    <Button onClick={() => setShowNewItemForm(true)} disabled={showNewItemForm}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Expense
                    </Button>
                  </div>

                  {showNewItemForm && (
                    <Card className="border-2 border-dashed">
                      <CardContent className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="date">Date of Expense</Label>
                            <Input
                              type="date"
                              value={newItem.date}
                              onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {expenseCategories.map((category) => (
                                  <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="amount">Amount (₹)</Label>
                          <Input
                            type="number"
                            value={newItem.amount}
                            onChange={(e) => setNewItem({ ...newItem, amount: parseInt(e.target.value) || 0 })}
                            placeholder="Enter amount"
                          />
                        </div>

                        <div>
                          <Label htmlFor="description">Description/Remarks</Label>
                          <Textarea
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            placeholder="Enter purpose, location, or other details..."
                            maxLength={200}
                          />
                        </div>

                        <div>
                          <Label htmlFor="attachment">Supporting Document</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              onChange={handleFileUpload}
                              accept="image/*,.pdf"
                              className="flex-1"
                            />
                            <Button variant="outline" size="sm">
                              <Camera className="w-4 h-4" />
                            </Button>
                          </div>
                          {newItem.attachment && (
                            <p className="text-sm text-green-600 mt-1">
                              File attached: {newItem.attachment.name}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={addExpenseItem} className="flex-1">
                            Add Item
                          </Button>
                          <Button variant="outline" onClick={() => setShowNewItemForm(false)} className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {expenseItems.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Expense Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {expenseItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline">{item.category}</Badge>
                                  <span className="text-sm text-gray-500">{item.date}</span>
                                </div>
                                <p className="font-medium">₹{item.amount.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeExpenseItem(item.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Total Amount:</span>
                            <span className="text-xl font-bold">₹{expenseItems.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</span>
                          </div>
                          <Button onClick={submitClaim} className="w-full">
                            Submit Claim for Approval
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="space-y-4">
                  {myClaims.map((claim) => (
                    <Card key={claim.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium">Claim #{claim.id}</p>
                            <p className="text-sm text-gray-500">Submitted: {claim.submissionDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{claim.totalAmount.toLocaleString()}</p>
                            <Badge variant={
                              claim.status === 'Approved' ? 'default' : 
                              claim.status === 'Rejected' ? 'destructive' : 'secondary'
                            }>
                              {claim.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {claim.items.map((item) => (
                            <div key={item.id} className="text-sm border-l-2 border-gray-200 pl-3">
                              <div className="flex justify-between">
                                <span>{item.description}</span>
                                <span>₹{item.amount.toLocaleString()}</span>
                              </div>
                              <div className="text-gray-500">{item.category} • {item.date}</div>
                            </div>
                          ))}
                        </div>

                        {claim.rejectionReason && (
                          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                            <p className="text-sm text-red-600">
                              <strong>Rejection Reason:</strong> {claim.rejectionReason}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
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
            <CheckCircle className="w-5 h-5" />
            Manager Expense Claims - Admin Review
          </CardTitle>
          <CardDescription>Review and approve manager travel expense claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingClaims.map((claim) => (
              <Card key={claim.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{claim.managerName}</h3>
                      <p className="text-sm text-gray-500">Submitted: {claim.submissionDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">₹{claim.totalAmount.toLocaleString()}</p>
                      <Badge variant="secondary">{claim.status}</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <h4 className="font-medium">Expense Details:</h4>
                    {claim.items.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <span className="font-medium">₹{item.amount.toLocaleString()}</span>
                        </div>
                        <p className="text-sm mb-1">{item.description}</p>
                        <p className="text-xs text-gray-500">Date: {item.date}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">Attachment available</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {claim.status === 'Pending' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApproval(claim.id, 'approve')}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const reason = prompt("Enter rejection reason (optional):");
                          handleApproval(claim.id, 'reject', reason || undefined);
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

            {pendingClaims.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No pending expense claims to review</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseClaimFlow;
