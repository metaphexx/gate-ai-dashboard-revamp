import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/cards/StatCard';
import { PieChart, Download, BarChart3, FileText } from 'lucide-react';

export const DataVisualization = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Data Visualization & Export Tools</h2>
          <p className="text-muted-foreground">Advanced reporting, data export, and business intelligence integration</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Reports Generated" value="145" icon={<FileText className="w-5 h-5" />} trend={{ value: 23.7, isPositive: true }} />
        <StatCard title="Data Points" value="2.4M" icon={<BarChart3 className="w-5 h-5" />} trend={{ value: 18.2, isPositive: true }} />
        <StatCard title="Export Requests" value="67" icon={<Download className="w-5 h-5" />} trend={{ value: 12.1, isPositive: true }} />
        <StatCard title="Dashboard Views" value="892" icon={<PieChart className="w-5 h-5" />} trend={{ value: 15.4, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              User Analytics (CSV)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Exam Performance (Excel)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Financial Report (PDF)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Google Analytics</span>
              <span className="text-accent">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Mixpanel</span>
              <span className="text-accent">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tableau</span>
              <span className="text-muted-foreground">Not Connected</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Exports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>Monthly User Report - 2 hours ago</div>
            <div>Exam Analytics - 1 day ago</div>
            <div>Revenue Summary - 3 days ago</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};