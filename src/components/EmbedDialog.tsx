import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Monitor, MousePointer, Clock as Click, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface EmbedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDarkMode: boolean;
  eventType: any;
}

const EmbedDialog: React.FC<EmbedDialogProps> = ({ open, onOpenChange, isDarkMode, eventType }) => {
  const [selectedEmbedType, setSelectedEmbedType] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(8);
  const [selectedTime, setSelectedTime] = useState('1:30pm');
  const [currentMonth, setCurrentMonth] = useState('July 2025');
  const [embedConfig, setEmbedConfig] = useState({
    width: '100%',
    height: '100%',
    theme: 'Auto',
    hideEventTypeDetails: false,
    brandColorLight: '#007ee5',
    brandColorDark: '#fafafa',
    layout: 'Month',
    buttonText: 'Book a meeting',
    showCalendarIcon: true,
    buttonPosition: 'Bottom right',
    buttonColor: '#007ee5',
    textColor: '#ffffff'
  });

  const embedTypes = [
    {
      id: 'inline',
      title: 'Inline Embed',
      description: 'Loads your event type directly inline with your other website content.',
      icon: (
        <div className="w-full h-24 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-blue-500">
          <div className="w-16 h-12 bg-white dark:bg-gray-700 rounded border flex items-center justify-center">
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: 21 }).map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${i === 7 ? 'bg-blue-500' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'floating',
      title: 'Floating pop-up button',
      description: 'Puts a floating button on your site that triggers a modal with your event type.',
      icon: (
        <div className="w-full h-24 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center relative">
          <div className="w-16 h-12 bg-white dark:bg-gray-700 rounded border flex items-center justify-center">
            <div className="text-xs text-gray-400">Website</div>
          </div>
          <div className="absolute bottom-2 right-2 w-8 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
            Book
          </div>
        </div>
      )
    },
    {
      id: 'popup',
      title: 'Pop up via element click',
      description: 'Open your calendar as a dialog when someone clicks an element.',
      icon: (
        <div className="w-full h-24 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="w-16 h-12 bg-white dark:bg-gray-700 rounded border flex items-center justify-center relative">
            <div className="text-xs text-gray-400">Click me</div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'email',
      title: 'Email Embed',
      description: 'Select a few available times and embed them in your Email',
      icon: (
        <div className="w-full h-24 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="w-16 h-12 bg-white dark:bg-gray-700 rounded border p-2">
            <div className="space-y-1">
              <div className="h-1 bg-gray-300 rounded w-full" />
              <div className="h-1 bg-gray-300 rounded w-3/4" />
              <div className="h-1 bg-blue-500 rounded w-1/2" />
              <div className="h-1 bg-gray-300 rounded w-2/3" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const timeSlots = ['1:00pm', '1:15pm', '1:30pm', '1:45pm', '2:00pm', '2:15pm', '2:30pm', '2:45pm'];

  const generateCode = (type: 'html' | 'react') => {
    const eventSlug = eventType?.slug?.replace('/', '') || 'sanskar/product-hunt-chats';
    
    if (selectedEmbedType === 'inline') {
      if (type === 'html') {
        return `<!-- Cal inline embed code begins -->
<div style="width:100%;height:100%;overflow:scroll" id="my-cal-inline"></div>
<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});

Cal.ns["product-hunt-chats"]("inline", {
elementOrSelector:"#my-cal-inline",
config: {"layout":"month_view"},
calLink: "${eventSlug}",
});

Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":${!embedConfig.hideEventTypeDetails},"layout":"month_view"});
</script>
<!-- Cal inline embed code ends -->`;
      } else {
        return `/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
useEffect(()=>{
(async function () {
const cal = await getCalApi({"namespace":"product-hunt-chats","embedLibUrl":"https://app.cal.id/embed-link/embed.js"});
cal("ui", {"hideEventTypeDetails":${!embedConfig.hideEventTypeDetails},"layout":"month_view"});
})();
}, [])
return <Cal namespace="product-hunt-chats"
calLink="${eventSlug}"
style={{width:"100%",height:"100%",overflow:"scroll"}}
config={{"layout":"month_view"}}
calOrigin="https://cal.id"
embedJsUrl="https://app.cal.id/embed-link/embed.js"
/>;
};`;
      }
    }
    
    // Add other embed types here...
    return 'Code generation for other embed types...';
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderMainSelection = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          How do you want to add OneHash Cal to your site?
        </h2>
        <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Choose one of the following ways to put OneHash Cal on your site.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {embedTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedEmbedType(type.id)}
            className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
              selectedEmbedType === type.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : `border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`
            }`}
          >
            <div className="mb-4">
              {type.icon}
            </div>
            <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {type.title}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {type.description}
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => selectedEmbedType && setSelectedEmbedType(selectedEmbedType)}
          disabled={!selectedEmbedType}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderEmailEmbed = () => (
    <div className="grid grid-cols-2 gap-8 h-[600px]">
      {/* Left Panel */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedEmbedType(null)}
            className="w-8 h-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Email Embed
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Select a few available times and embed them in your Email
            </p>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <h3 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Select Date
          </h3>
          <div className="flex items-center justify-between mb-4">
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentMonth}
            </span>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
              <div key={day} className={`text-xs font-medium text-center py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`w-8 h-8 text-sm rounded transition-colors ${
                  selectedDate === date
                    ? 'bg-blue-600 text-white'
                    : date === 8
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                    : `hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Tue 08
            </h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-xs">12h</Button>
              <Button variant="outline" size="sm" className="text-xs">24h</Button>
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`w-full p-3 text-left rounded-lg border transition-colors ${
                  selectedTime === time
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : `border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Monitor className="w-4 h-4" />
          <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Preview</span>
        </div>

        <div className={`border rounded-lg p-6 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="space-y-4">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Product Hunt Chats
            </h3>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration: </span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>15 mins</span>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Timezone: </span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Asia/Calcutta</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Tuesday, July 8, 2025
              </div>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                {selectedTime}
              </Button>
            </div>

            <Button variant="link" className="text-blue-600 p-0 h-auto">
              See all available times
            </Button>

            <div className={`text-xs pt-4 border-t ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
              Powered by <span className="font-medium">OneHash Cal</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Copy
          </Button>
        </div>
      </div>
    </div>
  );

  const renderInlineEmbed = () => (
    <div className="grid grid-cols-2 gap-8 h-[600px]">
      {/* Left Panel */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedEmbedType(null)}
            className="w-8 h-8"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Inline Embed
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Loads your event type directly inline with your other website content.
            </p>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="space-y-4">
          <div>
            <h3 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Window sizing
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>W</label>
                <input
                  type="text"
                  value="100%"
                  className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>H</label>
                <input
                  type="text"
                  value="100%"
                  className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Theme
            </h3>
            <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
              <option>Auto</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Hide event type details</span>
            <Switch />
          </div>

          <div>
            <h3 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Brand Color (Light Theme)
            </h3>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded border"></div>
              <input
                type="text"
                value="007ee5"
                className={`flex-1 px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
          </div>

          <div>
            <h3 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Brand Color (Dark Theme)
            </h3>
            <input
              type="text"
              value="fafafa"
              className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>

          <div>
            <h3 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Layout
            </h3>
            <select className={`w-full px-3 py-2 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
              <option>Month</option>
              <option>Week</option>
              <option>Column</option>
            </select>
          </div>
        </div>
      </div>

      {/* Right Panel - Code */}
      <div className="space-y-4">
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="space-y-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Place this code in your HTML where you want your OneHash Cal widget to appear.
            </p>
            <div className="relative">
              <pre className={`p-4 rounded-lg text-xs overflow-auto h-80 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                <code>{generateCode('html')}</code>
              </pre>
              <Button
                size="sm"
                onClick={() => copyCode(generateCode('html'))}
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="react" className="space-y-4">
            <div className="relative">
              <pre className={`p-4 rounded-lg text-xs overflow-auto h-80 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                <code>{generateCode('react')}</code>
              </pre>
              <Button
                size="sm"
                onClick={() => copyCode(generateCode('react'))}
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Preview */}
        <div className="border rounded-lg overflow-hidden">
          <div className={`h-48 ${isDarkMode ? 'bg-gray-900' : 'bg-black'} flex items-center justify-center relative`}>
            <div className="text-white text-center">
              <div className="mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2"></div>
                <div className="text-sm font-medium">Sanskar Yadav</div>
                <div className="text-lg font-semibold">Product Hunt Chats</div>
                <div className="text-xs text-gray-400 mt-1">
                  The essence of Product Hunt reflects in communities- Select a time suitable for you, and let's talk products!
                </div>
              </div>
              <div className="flex space-x-2 justify-center mb-2">
                <span className="px-2 py-1 bg-gray-700 rounded text-xs">15m</span>
                <span className="px-2 py-1 bg-gray-700 rounded text-xs">30m</span>
                <span className="px-2 py-1 bg-gray-700 rounded text-xs">45m</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            onClick={() => copyCode(generateCode('html'))}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Copy Code
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSelectedEmbed = () => {
    switch (selectedEmbedType) {
      case 'email':
        return renderEmailEmbed();
      case 'inline':
        return renderInlineEmbed();
      default:
        return renderMainSelection();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-6xl max-h-[90vh] overflow-hidden ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6">
          {selectedEmbedType ? renderSelectedEmbed() : renderMainSelection()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedDialog;