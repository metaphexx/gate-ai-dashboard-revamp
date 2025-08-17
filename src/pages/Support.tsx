
import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import { Phone, Mail } from 'lucide-react';

const Support = () => {
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request submitted",
      description: "We'll get back to you as soon as possible."
    });
  };

  return (
    <MobileLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-screen-md mx-auto px-4 md:px-8 pt-6 pb-20">
          <div className="pb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Support</h1>
            <p className="text-sm text-gray-500 mt-1">
              Need help with something? Contact us or check out the common issues below.
            </p>
          </div>
          
          <div className="bg-[#009dff]/10 border border-[#009dff]/20 text-[#009dff] px-4 py-3 rounded-md text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <span>Need help quickly? Call or email us anytime.</span>
            <a href="mailto:support@example.com" className="underline font-medium mt-2 sm:mt-0">Contact Support</a>
          </div>
          
          <div className="space-y-8">
            {/* Contact Options */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-5 space-y-2 border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center gap-2">
                    <Phone className="text-[#009dff] w-5 h-5" />
                    <h3 className="text-md font-semibold text-gray-800">Call Us</h3>
                  </div>
                  <p className="text-sm text-gray-600">Have urgent issues? Call us directly for live assistance.</p>
                  <p className="text-sm font-medium text-gray-900">+61 400 000 000</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-5 space-y-2 border border-gray-100 hover:shadow-md transition">
                  <div className="flex items-center gap-2">
                    <Mail className="text-[#009dff] w-5 h-5" />
                    <h3 className="text-md font-semibold text-gray-800">Email</h3>
                  </div>
                  <p className="text-sm text-gray-600">Send us a detailed message and we'll respond within 24 hours.</p>
                  <p className="text-sm font-medium text-gray-900">support@gateai.com</p>
                </div>
              </div>
            </div>
            
            {/* Support Request Form */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Submit a Support Request</h2>
              
              <form className="space-y-4" onSubmit={handleSubmitRequest}>
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input type="text" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input type="email" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Issue Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009dff] focus:border-[#009dff] h-10">
                    <option value="">Select an issue</option>
                    <option value="billing">Billing</option>
                    <option value="technical">Technical Issue</option>
                    <option value="content">Content Issue</option>
                    <option value="feedback">General Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea rows={5} className="resize-none" placeholder="Describe your issue or question in detail..." />
                </div>
                
                <Button type="submit" className="bg-[#009dff] hover:bg-[#009dff]/90">
                  Submit Request
                </Button>
              </form>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="item-1" className="border-b border-gray-100 pb-2">
                  <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-[#009dff]">
                    How do I upgrade to premium?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500">
                    Go to Dashboard {`>`} Click on "Upgrade Account" in the sidebar {`>`} Follow the payment steps.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="border-b border-gray-100 pb-2">
                  <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-[#009dff]">
                    How do I reset my password?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500">
                    Click on "Forgot Password" on the login page and follow the instructions sent to your email.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="border-b border-gray-100 pb-2">
                  <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-[#009dff]">
                    Can I use this on mobile devices?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500">
                    Yes! Our platform is fully responsive and works great on phones, tablets, and computers.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="border-b border-gray-100 pb-2">
                  <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-[#009dff]">
                    How do I get my progress report?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500">
                    Progress reports are available in the "Exam History" section. Click on "View Report" for any completed exam.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="pb-2">
                  <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-[#009dff]">
                    Can I cancel my subscription?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500">
                    Yes, you can cancel your subscription at any time from the Settings {`>`} Billing section.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Support;
