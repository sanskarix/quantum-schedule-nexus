
import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Monitor, MousePointer, Calendar, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
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
    buttonText: 'Book my Cal',
    showCalendarIcon: true,
    buttonPosition: 'Bottom right',
    buttonColor: '#007ee5',
    textColor: '#ffffff'
  });

  const embedTypes = [
    {
      id: 'inline',
      title: 'Inline Embed',
      description: 'Loads your event type directly inline with your other website content.'
    },
    {
      id: 'floating',
      title: 'Floating pop-up button',
      description: 'Puts a floating button on your site that triggers a modal with your event type.'
    },
    {
      id: 'popup',
      title: 'Pop up via element click',
      description: 'Open your calendar as a dialog when someone clicks an element.'
    },
    {
      id: 'email',
      title: 'Email Embed',
      description: 'Select a few available times and embed them in your Email'
    }
  ];

  const timeSlots = ['1:00pm', '1:15pm', '1:30pm', '1:45pm', '2:00pm', '2:15pm', '2:30pm', '2:45pm'];

  const generateCode = (type: 'html' | 'react', embedType: string) => {
    const eventSlug = eventType?.slug?.replace('/', '') || 'sanskar/product-hunt-chats';
    
    if (embedType === 'inline') {
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
    } else if (embedType === 'floating') {
      if (type === 'html') {
        return `<!-- Cal floating-popup embed code begins -->
<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});

Cal.ns["product-hunt-chats"]("floatingButton", {"calLink":"${eventSlug}","config":{"layout":"month_view"}});
Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":${!embedConfig.hideEventTypeDetails},"layout":"month_view"});
</script>
<!-- Cal floating-popup embed code ends -->`;
      } else {
        return `/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
useEffect(()=>{
(async function () {
const cal = await getCalApi({"namespace":"product-hunt-chats","embedLibUrl":"https://app.cal.id/embed-link/embed.js"});
cal("floatingButton", {"calLink":"${eventSlug}","calOrigin":"https://cal.id","config":{"layout":"month_view"}});
cal("ui", {"hideEventTypeDetails":${!embedConfig.hideEventTypeDetails},"layout":"month_view"});
})();
}, [])
};`;
      }
    } else if (embedType === 'popup') {
      if (type === 'html') {
        return `<!-- Cal element-click embed code begins -->
<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});

// Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
// \`data-cal-link="${eventSlug}"\`
// data-cal-namespace="product-hunt-chats"
// \`data-cal-config='{"layout":"month_view"}'\`

Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":${!embedConfig.hideEventTypeDetails},"layout":"month_view"});
</script>
<!-- Cal element-click embed code ends -->`;
      } else {
        return `/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
useEffect(()=>{
(async function () {
const cal = await getCalApi({"namespace":"product-hunt-chats","embedLibUrl":"https://app.cal.id/embed-link/embed.js"});
cal("ui", {"hideEventTypeDetails":${!embedConfig.hideEventTypeDetails},"layout":"month_view"});
})();
}, [])
return <button data-cal-namespace="product-hunt-chats"
data-cal-link="${eventSlug}"
data-cal-origin="https://cal.id"
data-cal-config='{"layout":"month_view"}'
>Click me</button>;
};`;
      }
    }
    
    return 'Code generation for this embed type...';
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

  const renderSelectedEmbed = () => {
    if (!selectedEmbedType) return renderMainSelection();

    return (
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
              {embedTypes.find(t => t.id === selectedEmbedType)?.title}
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {embedTypes.find(t => t.id === selectedEmbedType)?.description}
            </p>
          </div>
        </div>

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
              <pre className={`p-4 rounded-lg text-xs overflow-auto max-h-96 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                <code>{generateCode('html', selectedEmbedType)}</code>
              </pre>
              <Button
                size="sm"
                onClick={() => copyCode(generateCode('html', selectedEmbedType))}
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="react" className="space-y-4">
            <div className="relative">
              <pre className={`p-4 rounded-lg text-xs overflow-auto max-h-96 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                <code>{generateCode('react', selectedEmbedType)}</code>
              </pre>
              <Button
                size="sm"
                onClick={() => copyCode(generateCode('react', selectedEmbedType))}
                className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            onClick={() => copyCode(generateCode('html', selectedEmbedType))}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Copy Code
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="p-6">
          {renderSelectedEmbed()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedDialog;
