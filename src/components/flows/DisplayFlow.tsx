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
  Package, 
  Camera, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  BarChart3,
  Upload,
  Download
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DisplayFlowProps {
  userRole: 'ISD' | 'Manager' | 'Admin';
}

const DisplayFlow: React.FC<DisplayFlowProps> = ({ userRole }) => {
  const [showDisplayForm, setShowDisplayForm] = useState(false);

  const handleDisplaySubmission = () => {
    setShowDisplayForm(false);
    toast({
      title: "Display Updated",
      description: "Display tracking data submitted successfully!",
    });
  };

  // Mock data
  const displayData = [
    { category: 'Television', current: 3, norm: 5, compliance: 60, location: 'Main Wall' },
    { category: 'Refrigerator', current: 4, norm: 4, compliance: 100, location: 'Center Aisle' },
    { category: 'Air Conditioner', current: 2, norm: 3, compliance: 67, location: 'Side Wall' }
  ];

  const competitorData = [
    { category: 'Television', competitors: ['Sony', 'LG'], skus: 8 },
    { category: 'Refrigerator', competitors: ['Whirlpool', 'Haier'], skus: 6 },
    { category: 'Air Conditioner', competitors: ['Daikin', 'Blue Star'], skus: 5 }
  ];

  const storeCompliance = [
    { store: 'Electronics Hub', overall: 85, tv: 100, ref: 80, ac: 75 },
    { store: 'Tech World', overall: 90, tv: 90, ref: 100, ac: 80 },
    { store: 'Digital Plaza', overall: 70, tv: 60, ref: 80, ac: 70 },
    { store: 'Mega Store', overall: 95, tv: 100, ref: 90, ac: 95 }
  ];

  const displayNorms = [
    { storeType: 'Tier A - Premium', tv: 8, refrigerator: 6, ac: 5 },
    { storeType: 'Tier B - Standard', tv: 5, refrigerator: 4, ac: 3 },
    { storeType: 'Tier C - Basic', tv: 3, refrigerator: 3, ac: 2 }
  ];

  if (userRole === 'ISD') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Display Tracking
            </CardTitle>
            <CardDescription>Track product displays and competitor presence</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="update" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="update">
                  <span className="md:hidden">Update</span>
                  <span className="hidden md:inline">Update Display</span>
                </TabsTrigger>
                <TabsTrigger value="current">
                  <span className="md:hidden">Current</span>
                  <span className="hidden md:inline">Current Display</span>
                </TabsTrigger>
                <TabsTrigger value="competitors">
                  <span className="md:hidden">Rivals</span>
                  <span className="hidden md:inline">Competitors</span>
                </TabsTrigger>
                <TabsTrigger value="history">
                  <span className="md:hidden">History</span>
                  <span className="hidden md:inline">History</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="update" className="space-y-4">
                {!showDisplayForm ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Update Display Information</h3>
                    <p className="text-gray-600 mb-4">Record current product displays in your store</p>
                    <Button onClick={() => setShowDisplayForm(true)}>
                      <Camera className="w-4 h-4 mr-2" />
                      Update Display
                    </Button>
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Display Update</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="category">Product Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="television">Television</SelectItem>
                            <SelectItem value="refrigerator">Refrigerator</SelectItem>
                            <SelectItem value="ac">Air Conditioner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="skuCount">Number of SKUs</Label>
                          <Input type="number" placeholder="Enter SKU count" min="0" />
                        </div>
                        <div>
                          <Label htmlFor="location">Display Location</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="main-wall">Main Wall</SelectItem>
                              <SelectItem value="center-aisle">Center Aisle</SelectItem>
                              <SelectItem value="side-wall">Side Wall</SelectItem>
                              <SelectItem value="end-cap">End Cap</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Display Photo</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Capture display arrangement</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Camera className="w-4 h-4 mr-2" />
                            Take Photo
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea placeholder="Any observations or issues..." />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleDisplaySubmission} className="flex-1">
                          Submit Update
                        </Button>
                        <Button variant="outline" onClick={() => setShowDisplayForm(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="current" className="space-y-4">
                <div className="space-y-4">
                  {displayData.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{item.category}</h3>
                          <Badge variant={item.compliance >= 80 ? 'default' : item.compliance >= 60 ? 'secondary' : 'destructive'}>
                            {item.compliance}% Compliant
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{item.current}</div>
                            <div className="text-sm text-gray-600">Current SKUs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-600">{item.norm}</div>
                            <div className="text-sm text-gray-600">Required</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${item.current >= item.norm ? 'text-green-600' : 'text-red-600'}`}>
                              {item.current - item.norm}
                            </div>
                            <div className="text-sm text-gray-600">Gap</div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-gray-600">Display Location: {item.location}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Gap Analysis</p>
                      <p className="text-sm text-blue-700">
                        You need to add 2 more TV models and 1 AC model to meet display norms.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="competitors" className="space-y-4">
                <div className="space-y-4">
                  {competitorData.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{item.category}</h3>
                          <Badge variant="outline">{item.skus} Competitor SKUs</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.competitors.map((competitor, idx) => (
                            <Badge key={idx} variant="secondary">{competitor}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Update Competitor Information
                </Button>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div className="space-y-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Display Update - Television</p>
                          <p className="text-sm text-gray-600">Updated: 2024-01-15 • 3 SKUs recorded</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Submitted</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Display Update - All Categories</p>
                          <p className="text-sm text-gray-600">Updated: 2024-01-10 • Complete audit</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Submitted</Badge>
                      </div>
                    </CardContent>
                  </Card>
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
              <BarChart3 className="w-5 h-5" />
              Display Compliance Monitoring
            </CardTitle>
            <CardDescription>Monitor store display compliance and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="compliance" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="compliance">
                  <span className="md:hidden">Compliance</span>
                  <span className="hidden md:inline">Store Compliance</span>
                </TabsTrigger>
                <TabsTrigger value="gaps">
                  <span className="md:hidden">Gaps</span>
                  <span className="hidden md:inline">Gap Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="trends">
                  <span className="md:hidden">Trends</span>
                  <span className="hidden md:inline">Trends</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compliance" className="space-y-4">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2</div>
                    <div className="text-sm text-gray-600">Fully Compliant</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-sm text-gray-600">Partially Compliant</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">1</div>
                    <div className="text-sm text-gray-600">Non-Compliant</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">87%</div>
                    <div className="text-sm text-gray-600">Avg Compliance</div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Store Name</TableHead>
                      <TableHead>Overall</TableHead>
                      <TableHead>TV</TableHead>
                      <TableHead>Refrigerator</TableHead>
                      <TableHead>AC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {storeCompliance.map((store, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{store.store}</TableCell>
                        <TableCell>
                          <Badge variant={store.overall >= 90 ? 'default' : store.overall >= 75 ? 'secondary' : 'destructive'}>
                            {store.overall}%
                          </Badge>
                        </TableCell>
                        <TableCell>{store.tv}%</TableCell>
                        <TableCell>{store.ref}%</TableCell>
                        <TableCell>{store.ac}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="gaps" className="space-y-4">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Critical Gaps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <div>
                            <p className="font-medium">Digital Plaza - Television</p>
                            <p className="text-sm text-gray-600">2 SKUs short of norm (3/5)</p>
                          </div>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="font-medium">Electronics Hub - AC</p>
                            <p className="text-sm text-gray-600">1 SKU short of norm (2/3)</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Top Performers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Mega Store</span>
                          <Badge className="bg-green-100 text-green-800">95% Compliance</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Tech World</span>
                          <Badge className="bg-green-100 text-green-800">90% Compliance</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Monthly Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>January</span>
                          <span className="text-green-600">+5% improvement</span>
                        </div>
                        <div className="flex justify-between">
                          <span>December</span>
                          <span className="text-blue-600">82% avg compliance</span>
                        </div>
                        <div className="flex justify-between">
                          <span>November</span>
                          <span className="text-blue-600">78% avg compliance</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Category Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Refrigerator</span>
                          <Badge className="bg-green-100 text-green-800">92% avg</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Television</span>
                          <Badge>87% avg</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Air Conditioner</span>
                          <Badge variant="secondary">80% avg</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
            <Package className="w-5 h-5" />
            Display Norm Management
          </CardTitle>
          <CardDescription>Configure display norms and analyze compliance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="norms" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="norms">
                <span className="md:hidden">Norms</span>
                <span className="hidden md:inline">Display Norms</span>
              </TabsTrigger>
              <TabsTrigger value="stores">
                <span className="md:hidden">Stores</span>
                <span className="hidden md:inline">Store Profiles</span>
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <span className="md:hidden">Analytics</span>
                <span className="hidden md:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="reports">
                <span className="md:hidden">Reports</span>
                <span className="hidden md:inline">Reports</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="norms" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Display Norm Configuration</h3>
                <Button>Create New Norm</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store Type</TableHead>
                    <TableHead>Television</TableHead>
                    <TableHead>Refrigerator</TableHead>
                    <TableHead>AC</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayNorms.map((norm, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{norm.storeType}</TableCell>
                      <TableCell>{norm.tv} SKUs</TableCell>
                      <TableCell>{norm.refrigerator} SKUs</TableCell>
                      <TableCell>{norm.ac} SKUs</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="stores" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Store Profile Management</h3>
                <Button>Add Store</Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tier A Stores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">25</div>
                    <p className="text-sm text-gray-600">Premium flagship stores</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tier B Stores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">85</div>
                    <p className="text-sm text-gray-600">Standard retail stores</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tier C Stores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">70</div>
                    <p className="text-sm text-gray-600">Basic outlet stores</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Compliance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Overall Compliance</span>
                        <Badge className="bg-green-100 text-green-800">84%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Stores Meeting 100% Norm</span>
                        <span>78 stores (43%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Critical Non-Compliance</span>
                        <span className="text-red-600">12 stores</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Competitive Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Top Competitor: Sony</span>
                        <span>Present in 85% stores</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Avg Competitor SKUs</span>
                        <span>6.2 per category</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Market Share Visibility</span>
                        <Badge>62%</Badge>
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
                    <div className="font-medium">Display Compliance Report</div>
                    <div className="text-sm text-gray-500">Store-wise compliance analysis</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Gap Analysis Report</div>
                    <div className="text-sm text-gray-500">Category-wise shortfalls</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Competitive Analysis</div>
                    <div className="text-sm text-gray-500">Market presence insights</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="font-medium">Trend Analysis</div>
                    <div className="text-sm text-gray-500">Historical compliance trends</div>
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

export default DisplayFlow;
