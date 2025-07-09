
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

interface BookingQuestionsFormProps {
  isDarkMode: boolean;
}

const BookingQuestionsForm: React.FC<BookingQuestionsFormProps> = ({ isDarkMode }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'Name',
      label: 'Your name',
      placeholder: '',
      required: true,
      splitName: false,
      disableIfPrefilled: false
    },
    {
      id: 2,
      type: 'Email',
      label: 'Email',
      placeholder: '',
      required: true,
      requireContains: '',
      excludeContains: '',
      disableIfPrefilled: false
    },
    {
      id: 3,
      type: 'Phone',
      label: 'Phone',
      placeholder: '',
      required: false,
      disableIfPrefilled: false
    },
    {
      id: 4,
      type: 'Short Text',
      label: "What's this meeting about",
      placeholder: '',
      required: false,
      disableIfPrefilled: false
    },
    {
      id: 5,
      type: 'Long Text',
      label: 'Additional notes',
      placeholder: '',
      required: false,
      minChars: '',
      maxChars: '',
      disableIfPrefilled: false
    },
    {
      id: 6,
      type: 'Multiple Emails',
      label: 'Add Guests',
      placeholder: '',
      required: false,
      disableIfPrefilled: false
    }
  ]);

  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState('');

  const inputTypes = [
    'Email', 'Phone', 'Address', 'Short Text', 'Number', 'Long Text', 
    'Select', 'Multiselect', 'Multiple Emails', 'Checkbox', 'Checkbox Group', 
    'Radio Group', 'URL', 'Date'
  ];

  const renderQuestionForm = (question: any, index: number) => {
    return (
      <div key={question.id} className={`p-6 border rounded-lg space-y-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {question.label}
          </h3>
          <Button variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Input type
            </Label>
            <Select defaultValue={question.type}>
              <SelectTrigger className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {inputTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Identifier
            </Label>
            <div className="flex items-center space-x-2 mt-1">
              <Switch checked={question.disableIfPrefilled} className="data-[state=checked]:bg-[#007ee5]" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Disable input if the URL identifier is prefilled
              </span>
            </div>
          </div>

          <div>
            <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Label
            </Label>
            <Input
              defaultValue={question.label}
              className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>

          <div>
            <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Placeholder
            </Label>
            <Input
              defaultValue={question.placeholder}
              className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>

          {question.type === 'Name' && (
            <div className="flex items-center space-x-2">
              <Switch checked={question.splitName} className="data-[state=checked]:bg-[#007ee5]" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Split "Full name" into "First name" and "Last name"
              </span>
            </div>
          )}

          {question.type === 'Email' && (
            <>
              <div>
                <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Require emails that contain ...
                </Label>
                <Input
                  defaultValue={question.requireContains || ''}
                  className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Exclude emails that contain ...
                </Label>
                <Input
                  defaultValue={question.excludeContains || ''}
                  className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
            </>
          )}

          {question.type === 'Long Text' && (
            <>
              <div>
                <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Min. Characters
                </Label>
                <Input
                  type="number"
                  defaultValue={question.minChars || ''}
                  className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Max. Characters
                </Label>
                <Input
                  type="number"
                  defaultValue={question.maxChars || ''}
                  className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
            </>
          )}

          {(['Select', 'Multiselect', 'Checkbox Group', 'Radio Group'].includes(question.type)) && (
            <div>
              <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Options
              </Label>
              <div className="space-y-2 mt-1">
                <Input placeholder="Option 1" className={`${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                <Input placeholder="Option 2" className={`${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add an Option
                </Button>
              </div>
            </div>
          )}

          <div>
            <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Required
            </Label>
            <div className="flex items-center space-x-4 mt-1">
              <button className={`px-3 py-1 rounded text-sm ${question.required ? 'bg-[#007ee5] text-white' : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}`}>
                Yes
              </button>
              <button className={`px-3 py-1 rounded text-sm ${!question.required ? 'bg-[#007ee5] text-white' : `${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}`}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Booking Questions
        </h2>
        <Button
          onClick={() => setShowAddQuestion(true)}
          className="bg-[#007ee5] hover:bg-[#0066cc] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => renderQuestionForm(question, index))}
      </div>

      {showAddQuestion && (
        <div className={`p-6 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="space-y-4">
            <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Add Question
            </h3>
            
            <div>
              <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Input type
              </Label>
              <Select value={newQuestionType} onValueChange={setNewQuestionType}>
                <SelectTrigger className={`mt-1 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                  <SelectValue placeholder="Select input type" />
                </SelectTrigger>
                <SelectContent>
                  {inputTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={() => setShowAddQuestion(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Add new question logic here
                  setShowAddQuestion(false);
                }}
                className="bg-[#007ee5] hover:bg-[#0066cc] text-white"
                disabled={!newQuestionType}
              >
                Add Question
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingQuestionsForm;
