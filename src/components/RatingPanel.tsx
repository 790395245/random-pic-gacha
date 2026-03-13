import React from 'react';
import { Button } from 'antd';
import { Rarity } from '../types';

interface RatingPanelProps {
  onRate?: (rarity: Rarity) => void;
  onSkip?: () => void;
  disabled?: boolean;
}

const RatingPanel: React.FC<RatingPanelProps> = ({
  onRate = () => {},
  onSkip = () => {},
  disabled = false
}) => {
  return (
    <div data-cmp="RatingPanel" className="flex flex-wrap justify-center gap-3 mt-8 w-full max-w-2xl mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
      <Button
        size="large"
        onClick={() => onRate('N')}
        disabled={disabled}
        className="w-20 font-bold border-2"
        style={{ borderColor: '#9e9e9e', color: disabled ? undefined : '#9e9e9e' }}
      >
        N
      </Button>
      <Button
        size="large"
        onClick={() => onRate('R')}
        disabled={disabled}
        className="w-20 font-bold border-2 shadow-sm"
        style={{ borderColor: '#2196f3', color: disabled ? undefined : '#2196f3' }}
      >
        R
      </Button>
      <Button
        size="large"
        onClick={() => onRate('SR')}
        disabled={disabled}
        className="w-20 font-bold border-2 shadow-sm"
        style={{ borderColor: '#9c27b0', color: disabled ? undefined : '#9c27b0' }}
      >
        SR
      </Button>
      <Button
        size="large"
        onClick={() => onRate('SSR')}
        disabled={disabled}
        className="w-20 font-bold border-2 shadow-md"
        style={{ borderColor: '#ffc107', color: disabled ? undefined : '#d49e00', backgroundColor: disabled ? undefined : '#fffbf0' }}
      >
        SSR
      </Button>
      <Button
        size="large"
        onClick={() => onRate('UR')}
        disabled={disabled}
        className="w-20 font-bold border-2 shadow-md"
        style={{ borderColor: '#f44336', color: disabled ? undefined : '#f44336', backgroundColor: disabled ? undefined : '#fff5f5' }}
      >
        UR
      </Button>
      <Button
        size="large"
        onClick={onSkip}
        disabled={disabled}
        className="w-20 font-bold border-2"
        style={{ borderColor: '#757575', color: disabled ? undefined : '#757575' }}
      >
        跳过
      </Button>
    </div>
  );
};

export default RatingPanel;