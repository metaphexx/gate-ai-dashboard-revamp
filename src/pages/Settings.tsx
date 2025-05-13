
import React from 'react';
import { 
  User, 
  MessageSquare, 
  RefreshCcw, 
  CreditCard, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [openProfile, setOpenProfile] = React.useState(true);
  const [openFeedback, setOpenFeedback] = React.useState(false);
  const [openBilling, setOpenBilling] = React.useState(false);

  const handleSaveChanges = () => {
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully."
    });
  };

  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!"
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-screen-md mx-auto px-4 md:px-8 pt-6 pb-16">
          <div className="pb-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <Collapsible
              open={openProfile}
              onOpenChange={setOpenProfile}
              className="bg-white rounded-xl shadow-sm"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-6 text-left">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-800">Profile</h2>
                </div>
                {openProfile ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name
                    </label>
                    <Input 
                      id="studentName"
                      type="text" 
                      defaultValue="Hari" 
                      className="focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff]"
                    />
                  </div>
                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                      Parent Name
                    </label>
                    <Input 
                      id="parentName" 
                      type="text"
                      className="focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Id
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue="harisyam2004@gmail.com"
                      className="focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff]" 
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      defaultValue="404604673"
                      className="focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff]" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about us?
                    </label>
                    <Input 
                      id="referral" 
                      type="text"
                      className="focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff]"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select 
                      id="state"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff] h-10"
                      defaultValue="Western Australia"
                    >
                      <option value="Western Australia">Western Australia</option>
                      <option value="New South Wales">New South Wales</option>
                      <option value="Victoria">Victoria</option>
                      <option value="Queensland">Queensland</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="yearGroup" className="block text-sm font-medium text-gray-700 mb-1">
                      Year Group
                    </label>
                    <select 
                      id="yearGroup"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff] h-10"
                      defaultValue="Year 5"
                    >
                      <option value="Year 4">Year 4</option>
                      <option value="Year 5">Year 5</option>
                      <option value="Year 6">Year 6</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select 
                      id="status"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff] h-10"
                      defaultValue="Active"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button className="bg-[#009dff] hover:bg-[#009dff]/90" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Feedback Section */}
            <Collapsible
              open={openFeedback}
              onOpenChange={setOpenFeedback}
              className="bg-white rounded-xl shadow-sm"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-6 text-left">
                <div className="flex items-center gap-2">
                  <MessageSquare size={20} className="text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-800">Feedback</h2>
                </div>
                {openFeedback ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-6 pt-0 space-y-4">
                <div>
                  <label htmlFor="sectionName" className="block text-sm font-medium text-gray-700 mb-1">
                    Section Name
                  </label>
                  <Input 
                    id="sectionName" 
                    type="text"
                    className="focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff]"
                  />
                </div>
                
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback
                  </label>
                  <Textarea 
                    id="feedback" 
                    rows={4} 
                    placeholder="Enter your feedback..." 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff] resize-none"
                  />
                </div>
                
                <div className="pt-2">
                  <Button className="bg-[#009dff] hover:bg-[#009dff]/90" onClick={handleSubmitFeedback}>
                    Submit Feedback
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Reset Progress Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-2">
                <RefreshCcw size={20} className="text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-800">Reset Progress</h2>
              </div>
              <p className="text-sm text-gray-600">
                This action will reset all your progress, including completed questions and statistics.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="border-[#009dff] text-[#009dff] hover:bg-[#009dff]/10"
                >
                  Reset Exams
                </Button>
                <Button 
                  className="bg-[#009dff] hover:bg-[#009dff]/90"
                >
                  Reset All Progress
                </Button>
              </div>
            </div>

            {/* Billing Section */}
            <Collapsible
              open={openBilling}
              onOpenChange={setOpenBilling}
              className="bg-white rounded-xl shadow-sm"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-6 text-left">
                <div className="flex items-center gap-2">
                  <CreditCard size={20} className="text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-800">Billing</h2>
                </div>
                {openBilling ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-6 pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                  <div>Subscription Status</div>
                  <div><Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Inactive</Badge></div>
                  
                  <div>Plan</div>
                  <div>Free</div>
                  
                  <div>Next Billing Date</div>
                  <div>N/A</div>
                </div>
                
                <div className="pt-2">
                  <Button className="bg-[#009dff] hover:bg-[#009dff]/90">
                    Manage Subscription
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
