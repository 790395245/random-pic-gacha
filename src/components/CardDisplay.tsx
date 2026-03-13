import React from 'react';
import { Image } from 'antd';
import { Rarity } from '../types';

interface CardDisplayProps {
  url?: string;
  rarity?: Rarity | '';
  alt?: string;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
  url = 'https://picsum.photos/400/600',
  rarity = '',
  alt = 'Gacha Image'
}) => {
  // Determine which effect class and color to apply based on rarity
  let effectClass = '';
  let rarityColor = '#fff';
  switch (rarity) {
    case 'N':
      effectClass = 'effect-n';
      rarityColor = '#808080';
      break;
    case 'R':
      effectClass = 'effect-r';
      rarityColor = '#4169E1';
      break;
    case 'SR':
      effectClass = 'effect-sr';
      rarityColor = '#9370DB';
      break;
    case 'SSR':
      effectClass = 'effect-ssr';
      rarityColor = '#FFD700';
      break;
    case 'UR':
      effectClass = 'effect-ur';
      rarityColor = '#FF4500';
      break;
    default:
      effectClass = 'border-4 border-gray-200 shadow-sm';
  }

  return (
    <div data-cmp="CardDisplay" className={`gacha-card-wrapper bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden w-[90vw] max-w-[400px] h-[60vh] max-h-[600px] mx-auto ${effectClass}`}>
      <Image
        src={url}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
        preview={{
          mask: <div className="text-white">点击放大</div>
        }}
      />
      {rarity && (
        <div
          className="absolute top-4 right-4 bg-black/70 font-bold px-4 py-1 rounded-full text-xl backdrop-blur-sm shadow-lg border-2"
          style={{ color: rarityColor, borderColor: rarityColor }}
        >
          {rarity}
        </div>
      )}
    </div>
  );
};

export default CardDisplay;