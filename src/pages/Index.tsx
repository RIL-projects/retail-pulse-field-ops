
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, UserCheck, Settings, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const demoAccounts = [
    {
      role: 'ISD',
      username: 'isd_demo',
      password: 'demo123',
      name: 'Rahul Kumar',
      icon: Users,
      description: 'In-Shop Demonstrator',
      color: 'bg-blue-500'
    },
    {
      role: 'Manager',
      username: 'manager_demo', 
      password: 'demo123',
      name: 'Priya Sharma',
      icon: UserCheck,
      description: 'Field Manager',
      color: 'bg-green-500'
    },
    {
      role: 'Admin',
      username: 'admin_demo',
      password: 'demo123', 
      name: 'Amit Singh',
      icon: Settings,
      description: 'System Administrator',
      color: 'bg-purple-500'
    }
  ];

  const handleLogin = async (demoUser = null) => {
    setIsLoading(true);
    
    const loginData = demoUser || { username, password };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user data in localStorage
    const userData = demoUser || demoAccounts.find(acc => 
      acc.username === username && acc.password === password
    );
    
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (demoUser) => {
    setUsername(demoUser.username);
    setPassword(demoUser.password);
    handleLogin(demoUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Field Operations</h1>
          <p className="text-gray-600">ISD Management System</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={() => handleLogin()} 
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </CardContent>
        </Card>

        {/* Demo Login Section */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg">Quick Demo Access</CardTitle>
            <CardDescription>
              Try the app with different user roles - click any button below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account) => {
              const Icon = account.icon;
              return (
                <Button
                  key={account.role}
                  variant="outline"
                  className="w-full h-auto p-4 justify-start hover:bg-gray-50 transition-all duration-200"
                  onClick={() => handleDemoLogin(account)}
                  disabled={isLoading}
                >
                  <div className={`w-10 h-10 rounded-lg ${account.color} flex items-center justify-center mr-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{account.name}</div>
                    <div className="text-sm text-gray-500">{account.description}</div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Field Operations System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
