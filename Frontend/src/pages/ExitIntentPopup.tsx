import React from 'react';
import { X, Gift, Clock } from 'lucide-react';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-r from-green-500 to-purple-500 p-6 text-white text-center">
          <Gift className="w-12 h-12 mx-auto mb-3 animate-bounce" />
          <h2 className="text-2xl font-bold mb-2">Wait! Don't Leave Empty-Handed</h2>
          <p className="text-green-100">Get fresh organic produce delivered to your door</p>
        </div>

        <div className="p-6 text-center">
          <div className="mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">20% OFF</div>
            <p className="text-gray-600 mb-4">Your first organic harvest box</p>
            
            <div className="flex items-center justify-center space-x-2 text-red-500 mb-6">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">Limited time offer - expires in 50 minutes</span>
            </div>
          </div>

          <div className="space-y-3">

            <button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-full font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300">
              Claim My 20% Discount
            </button>
            
            <button
              onClick={onClose}
              className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors duration-200"
            >
              No thanks, I'll pay full price
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            * Valid for new customers only. Cannot be combined with other offers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
