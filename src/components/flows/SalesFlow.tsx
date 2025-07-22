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
  Filter,
  Plus,
  Minus,
  Edit,
  Archive,
  Trash2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SalesFlowProps {
  userRole: 'ISD' | 'Manager' | 'Admin';
}

interface ProductLineItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  serialNumbers: string[];
}

interface SalesHistoryItem {
  id: string;
  invoice: string;
  products: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalValue: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

const SalesFlow: React.FC<SalesFlowProps> = ({ userRole }) => {
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [productLines, setProductLines] = useState<ProductLineItem[]>([
    {
      id: '1',
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      serialNumbers: ['']
    }
  ]);
  const [swipedInvoice, setSwipedInvoice] = useState<string | null>(null);

  const products = [
    { id: 'tv55', name: 'Samsung TV 55" QLED', price: 85000 },
    { id: 'ref260', name: 'LG Refrigerator 260L', price: 45000 },
    { id: 'ac15', name: 'Whirlpool AC 1.5 Ton', price: 35000 }
  ];

  const handleSalesSubmission = () => {
    const totalValue = productLines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0);
    setShowSalesForm(false);
    setProductLines([{
      id: '1',
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      serialNumbers: ['']
    }]);
    toast({
      title: "Sales Entry Submitted",
      description: `Invoice with ${productLines.length} product(s) worth ₹${totalValue.toLocaleString()} is pending manager approval.`,
    });
  };

  const handleApproval = (action: 'approve' | 'reject', invoiceNo: string) => {
    toast({
      title: action === 'approve' ? "Sales Approved" : "Sales Rejected",
      description: `Invoice ${invoiceNo} has been ${action}d.`,
    });
  };

  const addProductLine = () => {
    const newId = (productLines.length + 1).toString();
    setProductLines([...productLines, {
      id: newId,
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      serialNumbers: ['']
    }]);
  };

  const removeProductLine = (id: string) => {
    if (productLines.length > 1) {
      setProductLines(productLines.filter(line => line.id !== id));
    }
  };

  const updateProductLine = (id: string, field: keyof ProductLineItem, value: any) => {
    setProductLines(productLines.map(line => {
      if (line.id === id) {
        const updated = { ...line, [field]: value };
        
        if (field === 'productId' && value) {
          const product = products.find(p => p.id === value);
          if (product) {
            updated.productName = product.name;
            updated.unitPrice = product.price;
          }
        }
        
        if (field === 'quantity') {
          const newQuantity = parseInt(value) || 1;
          updated.quantity = newQuantity;
          // Adjust serial numbers array to match quantity
          const currentSerials = updated.serialNumbers;
          if (newQuantity > currentSerials.length) {
            updated.serialNumbers = [...currentSerials, ...Array(newQuantity - currentSerials.length).fill('')];
          } else {
            updated.serialNumbers = currentSerials.slice(0, newQuantity);
          }
        }
        
        return updated;
      }
      return line;
    }));
  };

  const updateSerialNumber = (lineId: string, serialIndex: number, value: string) => {
    setProductLines(productLines.map(line => {
      if (line.id === lineId) {
        const updatedSerials = [...line.serialNumbers];
        updatedSerials[serialIndex] = value;
        return { ...line, serialNumbers: updatedSerials };
      }
      return line;
    }));
  };

  const handleInvoiceSwipe = (invoiceId: string) => {
    setSwipedInvoice(swipedInvoice === invoiceId ? null : invoiceId);
  };

  const handleEditInvoice = (invoiceId: string) => {
    toast({
      title: "Edit Invoice",
      description: `Opening editor for invoice ${invoiceId}`,
    });
    setSwipedInvoice(null);
  };

  const handleArchiveInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Archived",
      description: `Invoice ${invoiceId} has been archived`,
    });
    setSwipedInvoice(null);
  };

  // Updated mock data with multiple products
  const salesHistory: SalesHistoryItem[] = [
    { 
      id: '1', 
      invoice: 'INV001', 
      products: [
        { name: 'Samsung TV 55"', quantity: 1, unitPrice: 85000 },
        { name: 'Sony Headphones', quantity: 2, unitPrice: 7500 }
      ], 
      totalValue: 100000, 
      status: 'Pending', 
      date: '2024-01-15' 
    },
    { 
      id: '2', 
      invoice: 'INV002', 
      products: [
        { name: 'LG Refrigerator', quantity: 1, unitPrice: 45000 }
      ], 
      totalValue: 45000, 
      status: 'Approved', 
      date: '2024-01-14' 
    },
    { 
      id: '3', 
      invoice: 'INV003', 
      products: [
        { name: 'Whirlpool AC', quantity: 2, unitPrice: 35000 },
        { name: 'Samsung TV 55"', quantity: 1, unitPrice: 85000 }
      ], 
      totalValue: 155000, 
      status: 'Rejected', 
      date: '2024-01-13' 
    }
  ];

  const pendingSales = [
    { id: '1', isd: 'Rahul Kumar', invoice: 'INV001', product: 'Samsung TV 55" + 1 more', quantity: 3, value: 100000, date: '2024-01-15' },
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

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-medium">Product Line Items</Label>
                          <Button variant="outline" size="sm" onClick={addProductLine}>
                            <Plus className="w-4 h-4 mr-1" />
                            Add Product
                          </Button>
                        </div>

                        {productLines.map((line, index) => (
                          <Card key={line.id} className="p-4">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Product {index + 1}</h4>
                                {productLines.length > 1 && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => removeProductLine(line.id)}
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <Label>Product</Label>
                                  <Select 
                                    value={line.productId} 
                                    onValueChange={(value) => updateProductLine(line.id, 'productId', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select product" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {products.map(product => (
                                        <SelectItem key={product.id} value={product.id}>
                                          {product.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Quantity</Label>
                                  <Input 
                                    type="number" 
                                    value={line.quantity}
                                    onChange={(e) => updateProductLine(line.id, 'quantity', e.target.value)}
                                    min="1" 
                                  />
                                </div>
                                <div>
                                  <Label>Unit Price (₹)</Label>
                                  <Input 
                                    type="number" 
                                    value={line.unitPrice}
                                    onChange={(e) => updateProductLine(line.id, 'unitPrice', parseInt(e.target.value) || 0)}
                                  />
                                </div>
                              </div>

                              {line.productId && (
                                <div>
                                  <Label>Serial Numbers ({line.quantity} required)</Label>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                    {line.serialNumbers.map((serial, serialIndex) => (
                                      <div key={serialIndex} className="flex gap-2">
                                        <Input
                                          placeholder={`Serial #${serialIndex + 1}`}
                                          value={serial}
                                          onChange={(e) => updateSerialNumber(line.id, serialIndex, e.target.value)}
                                        />
                                        <Button variant="outline" size="sm">
                                          <Scan className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {line.productId && (
                                <div className="bg-gray-50 p-3 rounded">
                                  <p className="text-sm font-medium">
                                    Line Total: ₹{(line.quantity * line.unitPrice).toLocaleString()}
                                  </p>
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Invoice Total:</span>
                            <span className="text-lg font-bold">
                              ₹{productLines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
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
                    <div key={sale.id} className="relative">
                      <Card 
                        className={`transition-transform duration-200 ${
                          swipedInvoice === sale.id ? 'transform translate-x-[-120px]' : ''
                        }`}
                        onClick={() => handleInvoiceSwipe(sale.id)}
                      >
                        <CardContent className="p-4 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{sale.invoice}</p>
                                <Badge variant={
                                  sale.status === 'Approved' ? 'default' : 
                                  sale.status === 'Pending' ? 'secondary' : 'destructive'
                                }>
                                  {sale.status}
                                </Badge>
                              </div>
                              <div className="space-y-1">
                                {sale.products.map((product, index) => (
                                  <p key={index} className="text-sm text-gray-600">
                                    {product.name} - Qty: {product.quantity} × ₹{product.unitPrice.toLocaleString()}
                                  </p>
                                ))}
                              </div>
                              <p className="text-sm font-medium text-gray-800 mt-1">
                                Total: ₹{sale.totalValue.toLocaleString()} • {sale.date}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              {sale.status === 'Approved' && <CheckCircle className="w-5 h-5 text-green-500" />}
                              {sale.status === 'Pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                              {sale.status === 'Rejected' && <XCircle className="w-5 h-5 text-red-500" />}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Swipe Actions */}
                      {swipedInvoice === sale.id && (
                        <div className="absolute right-0 top-0 h-full flex items-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditInvoice(sale.invoice)}
                            className="mr-2 bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleArchiveInvoice(sale.invoice)}
                            className="bg-gray-500 text-white border-gray-500 hover:bg-gray-600"
                          >
                            <Archive className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
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
