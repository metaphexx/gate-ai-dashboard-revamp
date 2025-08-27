import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatCard from '@/components/cards/StatCard';
import { Brain, AlertTriangle, TrendingUp, Users } from 'lucide-react';

export const PredictiveInsights = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Predictive Analytics & AI Insights</h2>
        <p className="text-muted-foreground">Smart alerts, anomaly detection, and predictive user behavior analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="At-Risk Users" value="156" icon={<Users className="w-5 h-5" />} trend={{ value: 12.5, isPositive: false }} />
        <StatCard title="Anomalies Detected" value="3" icon={<AlertTriangle className="w-5 h-5" />} trend={{ value: 8.3, isPositive: false }} />
        <StatCard title="Prediction Accuracy" value="87%" icon={<Brain className="w-5 h-5" />} trend={{ value: 5.2, isPositive: true }} />
        <StatCard title="Early Warnings" value="5" icon={<TrendingUp className="w-5 h-5" />} trend={{ value: 2.1, isPositive: true }} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Insights Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Smart Alerts</h4>
              <div className="space-y-2">
                <div className="p-3 border border-destructive/20 rounded-lg bg-destructive/5">
                  <Badge variant="destructive" className="mb-2">High Priority</Badge>
                  <p className="text-sm font-medium">Unusual activity detected</p>
                  <p className="text-xs text-muted-foreground">45% increase in exam drop-off rate</p>
                </div>
                <div className="p-3 border border-warning/20 rounded-lg bg-warning/5">
                  <Badge variant="secondary" className="mb-2">Medium Priority</Badge>
                  <p className="text-sm font-medium">Content quality warning</p>
                  <p className="text-xs text-muted-foreground">Abstract Reasoning Q127 has 89% wrong rate</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Predictive Models</h4>
              <div className="space-y-2 text-sm">
                <p>• Student success prediction: 87% accuracy</p>
                <p>• Churn likelihood scoring: 156 at-risk users identified</p>
                <p>• Content gap identification: 3 topics need attention</p>
                <p>• Performance anomaly alerts: 2 active warnings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};