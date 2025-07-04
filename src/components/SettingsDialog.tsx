import React, { useState } from 'react';
import { X, User, Lock, Palette, Globe, Shield, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDarkMode: boolean;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  isDarkMode
}) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    calendarSync: true,
    autoConfirm: false,
    requirePayment: false,
    bufferTime: 15,
    timezone: 'Asia/Calcutta'
  });

  const handleSave = () => {
    // Save settings logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-w-4xl max-h-[80vh] overflow-y-auto ${isDarkMode ? 'bg-[#212124] border-[#818181]/20' : 'bg-white border-gray-200'}`}>
        <DialogHeader>
          <DialogTitle className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className={`grid w-full grid-cols-4 ${isDarkMode ? 'bg-[#161618]' : 'bg-gray-100'}`}>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Display Name
                </label>
                <Input
                  defaultValue="Sanskar Yadav"
                  className={`${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Username
                </label>
                <Input
                  defaultValue="sanskar"
                  className={`${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Timezone
                </label>
                <select 
                  value={settings.timezone}
                  onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                >
                  <option value="Asia/Calcutta">Asia/Calcutta</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Auto-confirm bookings
                  </label>
                  <p className={`text-xs ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                    Automatically confirm new bookings
                  </p>
                </div>
                <Switch
                  checked={settings.autoConfirm}
                  onCheckedChange={(checked) => setSettings({...settings, autoConfirm: checked})}
                  className="data-[state=checked]:bg-azure"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Email Notifications
                  </label>
                  <p className={`text-xs ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                    Receive booking confirmations via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  className="data-[state=checked]:bg-azure"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    SMS Notifications
                  </label>
                  <p className={`text-xs ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                    Receive booking confirmations via SMS
                  </p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                  className="data-[state=checked]:bg-azure"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Calendar Sync
                  </label>
                  <p className={`text-xs ${isDarkMode ? 'text-[#818181]' : 'text-gray-500'}`}>
                    Sync bookings with your calendar
                  </p>
                </div>
                <Switch
                  checked={settings.calendarSync}
                  onCheckedChange={(checked) => setSettings({...settings, calendarSync: checked})}
                  className="data-[state=checked]:bg-azure"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  className={`${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className={`${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className={`${isDarkMode ? 'bg-[#161618] border-[#818181]/20 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                />
              </div>

              <Button className="bg-azure hover:bg-azure/90 text-white">
                Update Password
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-4 border rounded-lg cursor-pointer ${isDarkMode ? 'border-azure bg-azure/10' : 'border-gray-300'}`}>
                    <div className="w-full h-8 bg-gradient-to-r from-gray-900 to-gray-700 rounded mb-2"></div>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dark</p>
                  </div>
                  <div className={`p-4 border rounded-lg cursor-pointer ${!isDarkMode ? 'border-azure bg-azure/10' : 'border-gray-600'}`}>
                    <div className="w-full h-8 bg-gradient-to-r from-gray-100 to-white rounded mb-2"></div>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Light</p>
                  </div>
                  <div className={`p-4 border rounded-lg cursor-pointer ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <div className="w-full h-8 bg-gradient-to-r from-gray-400 to-gray-200 rounded mb-2"></div>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Auto</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-azure hover:bg-azure/90 text-white">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;