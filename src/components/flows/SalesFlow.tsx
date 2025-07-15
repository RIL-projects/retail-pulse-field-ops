
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
  ShoppingCart, 
  FileText, 
  Camera, 
  Scan,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  Target,
  TrendingUp,
  Filter
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SalesFlowProps {
  userRole: 'ISD' | 'Manager' | 'Admin';
}

const SalesFlow: React.FC<SalesFlowProps> = ({ userRole }) => {
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [serialNumbers, setSerialNumbers] = useState<string[]>(['']);

  const handleSalesSubmission = () => {
    setShowSalesForm(false);
    toast({
      title: "Sales Entry Submitted",
      description: "Your sales entry is pending manager approval.",
    });
  };

  const handleApproval = (action: 'approve' | 'reject', invoiceNo: string) => {
    toast({
      title: action === 'approve' ? "Sales Approved" : "Sales Rejected",
      description: `Invoice ${invoiceNo} has been ${action}d.`,
    });
  };

  const addSerialNumber = () => {
    setSerialNumbers([...serialNumbers, '']);
  };

  const updateSerialNumber = (index: number, value: string) => {
    const updated = [...serialNumbers];
    updated[index] = value;
    setSerialNumbers(updated);
  };

  // Mock data
  const salesHistory = [
    { id: '1', invoice: 'INV001', product: 'Samsung TV 55"', quantity: 1, value: 85000, status: 'Pending', date: '2024-01-15' },
    { id: '2', invoice: 'INV002', product: 'LG Refrigerator', quantity: 1, value: 45000, status: 'Approved', date: '2024-01-14' },
    { id: '3', invoice: 'INV003', product: 'Sony Headphones', quantity: 2, value: 15000, status: 'Rejected', date: '2024-01-13' }
  ];

  const pendingSales = [
    { id: '1', isd: 'Rahul Kumar', invoice: 'INV001', product: 'Samsung TV 55"', quantity: 1, value: 85000, date: '2024-01-15' },
    { id: '2', isd: 'Sunita Devi', invoice: 'INV004', product: 'Whirlpool AC', quantity: 1, value: 35000, date: '2024-01-15' }
  ];

  const targets = [
    { category: 'Television', target: 100000, achieved: 65000, units: '6/10' },
    { category: 'Refrigerator', target: 80000, achieved: 45000, units: '3/8' },
    { category: 'Air Conditioner', target: 60000, achieved: 35000, units: '2/6' }
  ];

  if (userRole === 'ISD') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Sales Management
            </CardTitle>
            <CardDescription>Record your sales and track approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="entry" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="entry">Sales Entry</TabsTrigger>
                <TabsTrigger value="history">Sales History</TabsTrigger>
                <TabsTrigger value="targets">My Targets</TabsTrigger>
              </TabsList>

              <TabsContent value="entry" className="space-y-4">
                {!showSalesForm ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Record a New Sale</h3>
                    <p className="text-gray-600 mb-4">Add invoice details and product information</p>
                    <Button onClick={() => setShowSalesForm(true)}>
                      <FileText className="w-4 h-4 mr-2" />
                      Add Sales Entry
                    </Button>
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">New Sales Entry</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="invoiceNo">Invoice Number</Label>
                          <Input placeholder="Enter invoice number" />
                        </div>
                        <div>
                          <Label htmlFor="invoiceDate">Invoice Date</Label>
                          <Input type="date" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="product">Product</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tv55">Samsung TV 55" QLED</SelectItem>
                            <SelectItem value="ref260">LG Refrigerator 260L</SelectItem>
                            <SelectItem value="ac15">Whirlpool AC 1.5 Ton</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input type="number" placeholder="Enter quantity" min="1" />
                        </div>
                        <div>
                          <Label htmlFor="value">Sales Value (₹)</Label>
                          <Input type="number" placeholder="Enter amount" />
                        </div>
                      </div>

                      <div>
                        <Label>Serial Numbers</Label>
                        {serialNumbers.map((serial, index) => (
                          <div key={index} className="flex gap-2 mt-2">
                            <Input
                              placeholder="Enter serial number"
                              value={serial}
                              onChange={(e) => updateSerialNumber(index, e.target.value)}
                            />
                            <Button variant="outline" size="sm">
                              <Scan className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addSerialNumber} className="mt-2">
                          Add Serial Number
                        </Button>
                      </div>

                      <div>
                        <Label>Invoice Photo (Optional)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Take a photo of the invoice</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Camera className="w-4 h-4 mr-2" />
                            Capture Invoice
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleSalesSubmission} className="flex-1">
                          Submit Sales Entry
                        </Button>
                        <Button variant="outline" onClick={() => setShowSalesForm(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Sales History</h3>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-3">
                  {salesHistory.map((sale) => (
                    <Card key={sale.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{sale.invoice}</p>
                              <Badge variant={
                                sale.status === 'Approved' ? 'default' : 
                                sale.status === 'Pending' ? 'secondary' : 'destructive'
                              }>
                                {sale.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{sale.product}</p>
                            <p className="text-sm text-gray-600">
                              Qty: {sale.quantity} • Value: ₹{sale.value.toLocaleString()} • {sale.date}
                            </p>
                          </div>
                          <div className="text-right">
                            {sale.status === 'Approved' && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {sale.status === 'Pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                            {sale.status === 'Rejected' && <XCircle className="w-5 h-5 text-red-500" />}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="targets" className="space-y-4">
                <div className="space-y-4">
                  {targets.map((target, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{target.category}</h3>
                          <Badge variant={target.achieved >= target.target ? 'default' : 'secondary'}>
                            {Math.round((target.achieved / target.target) * 100)}%
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>₹{target.achieved.toLocaleString()} / ₹{target.target.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min((target.achieved / target.target) * 100, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Units: {target.units}</span>
                            <span>Remaining: ₹{(target.target - target.achieved).toLocaleString()}</span>
                          </div>
                        </div>
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

  if (userRole === 'Manager') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Sales Approval Management
            </CardTitle>
            <CardDescription>Review and approve team sales entries</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="approvals" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
                <TabsTrigger value="summary">Team Summary</TabsTrigger>
                <TabsTrigger value="targets">Team Targets</TabsTrigger>
              </TabsList>

              <TabsContent value="approvals" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Pending Sales Approvals</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Bulk Approve</Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {pendingSales.map((sale) => (
                    <Card key={sale.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-medium">{sale.isd}</p>
                              <Badge variant="outline">Invoice: {sale.invoice}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Product: {sale.product}</p>
                            <p className="text-sm text-gray-600 mb-1">
                              Quantity: {sale.quantity} • Value: ₹{sale.value.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">Date: {sale.date}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => handleApproval('approve', sale.invoice)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproval('reject', sale.invoice)}
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

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₹2.4L</div>
                    <div className="text-sm text-gray-600">Total Sales This Month</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">15</div>
                    <div className="text-sm text-gray-600">Units Sold</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">75%</div>
                    <div className="text-sm text-gray-600">Target Achievement</div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ISD Name</TableHead>
                      <TableHead>Sales Value</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Target Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Rahul Kumar</TableCell>
                      <TableCell>₹85,000</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">85%</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sunita Devi</TableCell>
                      <TableCell>₹92,000</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">92%</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Amit Sharma</TableCell>
                      <TableCell>₹45,000</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>
                        <Badge variant="secondary">45%</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="targets" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Team Target Overview</h3>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>

                  {targets.map((target, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{target.category} Category</h3>
                          <Badge variant={target.achieved >= target.target ? 'default' : 'secondary'}>
                            {Math.round((target.achieved / target.target) * 100)}% Team Achievement
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Team Progress</span>
                            <span>₹{target.achieved.toLocaleString()} / ₹{target.target.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.min((target.achieved / target.target) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
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
            <Target className="w-5 h-5" />
            Sales Target Management
          </CardTitle>
          <CardDescription>Configure sales targets and manage product catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="targets" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="targets">Target Configuration</TabsTrigger>
              <TabsTrigger value="products">Product Master</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
              <TabsTrigger value="reports">Sales Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="targets" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Sales Targets</h3>
                <Button>Set New Targets</Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Monthly Targets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Television Category</span>
                        <span>₹50L target</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Refrigerator Category</span>
                        <span>₹30L target</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>AC Category</span>
                        <span>₹25L target</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Incentive Schemes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>100% Target Achievement</span>
                        <Badge>5% Bonus</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>110% Target Achievement</span>
                        <Badge>8% Bonus</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>120% Target Achievement</span>
                        <Badge>12% Bonus</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Product Catalog</h3>
                <Button>Add Product</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article Code</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">TV55QLED</TableCell>
                    <TableCell>Samsung TV 55" QLED</TableCell>
                    <TableCell>Television</TableCell>
                    <TableCell>₹85,000</TableCell>
                    <TableCell><Badge>Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REF260L</TableCell>
                    <TableCell>LG Refrigerator 260L</TableCell>
                    <TableCell>Refrigerator</TableCell>
                    <TableCell>₹45,000</TableCell>
                    <TableCell><Badge>Active</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload Operations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Bulk Target Upload
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Product Master Upload
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Price List Update
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Uploads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Q1 Targets</span>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Product Catalog</span>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Price Update</span>
                        <Badge variant="secondary">Processing</Badge>
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
                    <div className="font-medium">Sales Performance Report</div>
                    <div className="text-sm text-gray-500">Target vs achievement analysis</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Product Wise Sales</div>
                    <div className="text-sm text-gray-500">SKU performance breakdown</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Incentive Eligibility</div>
                    <div className="text-sm text-gray-500">ISDs qualifying for bonuses</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Regional Analysis</div>
                    <div className="text-sm text-gray-500">Zone-wise performance trends</div>
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

export default SalesFlow;
