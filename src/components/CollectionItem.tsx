import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { Trash2, EyeOff, Eye } from 'lucide-react';
import CardDisplay from './CardDisplay';
import { CardItem } from '../types';

interface CollectionItemProps {
  item?: CardItem;
  onDelete?: (id: string) => void;
  viewMode?: 'large' | 'small' | 'list';
}

const defaultItem: CardItem = {
  id: 'default',
  url: 'https://picsum.photos/200/300',
  rarity: 'SSR',
  isR18: false,
  timestamp: Date.now()
};

const CollectionItem: React.FC<CollectionItemProps> = ({
  item = defaultItem,
  onDelete = () => {},
  viewMode = 'large'
}) => {
  const [isBlurred, setIsBlurred] = useState<boolean>(item.isR18);
  const dateStr = new Date(item.timestamp).toLocaleString();

  if (viewMode === 'list') {
    return (
      <div data-cmp="CollectionItem" className="relative group flex flex-row items-center bg-white border border-gray-200 rounded-xl shadow-sm p-4 gap-4 hover:shadow-md transition-shadow">
        <div className="relative w-[140px] h-[210px] flex-shrink-0">
          <div className={`transform scale-[0.35] origin-left w-[140px] h-[210px] ${isBlurred ? 'blur-xl' : ''} transition-all`}>
            <CardDisplay url={item.url} rarity={item.rarity} alt={`Collection ${item.id}`} />
          </div>
          <Button
            size="small"
            icon={<EyeOff size={14} />}
            onClick={() => setIsBlurred(!isBlurred)}
            className="absolute top-1 left-1 z-10 opacity-70 hover:opacity-100"
          />
          {isBlurred && (
            <Button
              icon={<Eye size={20} />}
              onClick={() => setIsBlurred(false)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
              NSFW警告
            </Button>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {item.title && <div className="text-lg font-semibold text-gray-800">{item.title}</div>}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {item.author && <span>作者: {item.author}</span>}
            {item.pid && <span>PID: {item.pid}</span>}
            {item.platform && <span>平台: {item.platform === 'pixiv' ? 'Pixiv' : 'X'}</span>}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>加入时间: {dateStr}</span>
            {item.isR18 && <span className="text-red-500 font-bold border border-red-200 px-2 py-0.5 rounded bg-red-50">R18</span>}
          </div>
        </div>

        <Popconfirm
          title="删除这张图片？"
          description="确定要从收藏夹中删除这个项目吗？"
          onConfirm={() => onDelete(item.id)}
          okText="是"
          cancelText="否"
        >
          <Button danger type="text" icon={<Trash2 size={16} />} className="opacity-0 group-hover:opacity-100 transition-opacity">
            删除
          </Button>
        </Popconfirm>
      </div>
    );
  }

  const scale = viewMode === 'large' ? 'scale-[0.6]' : 'scale-[0.4]';
  const marginBottom = viewMode === 'large' ? 'mb-[-230px]' : 'mb-[-310px]';
  const infoWidth = viewMode === 'large' ? 'w-[240px]' : 'w-[160px]';

  return (
    <div data-cmp="CollectionItem" className="relative group flex flex-col items-center">
      <div className="relative">
        <div className={`transform ${scale} origin-top ${marginBottom} ${isBlurred ? 'blur-xl' : ''} transition-all`}>
          <CardDisplay url={item.url} rarity={item.rarity} alt={`Collection ${item.id}`} />
        </div>
        <Button
          size="small"
          icon={<EyeOff size={14} />}
          onClick={() => setIsBlurred(!isBlurred)}
          className="absolute top-2 left-2 z-10 opacity-70 hover:opacity-100"
        />
        {isBlurred && (
          <Button
            icon={<Eye size={20} />}
            onClick={() => setIsBlurred(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            NSFW警告
          </Button>
        )}
      </div>

      <div className={`${infoWidth} bg-white border border-gray-100 rounded-b-xl shadow-sm p-3 mt-2 flex flex-col gap-2 z-10`}>
        {viewMode === 'large' && item.title && (
          <div className="text-sm font-semibold text-gray-800 truncate" title={item.title}>{item.title}</div>
        )}
        {viewMode === 'large' && item.author && (
          <div className="text-xs text-gray-600 truncate">作者: {item.author}</div>
        )}
        {viewMode === 'large' && item.pid && (
          <div className="text-xs text-gray-500">PID: {item.pid}</div>
        )}

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="truncate">{dateStr}</span>
          {item.isR18 && <span className="text-red-500 font-bold border border-red-200 px-1 rounded bg-red-50">R18</span>}
        </div>

        <Popconfirm
          title="删除这张图片？"
          description="确定要从收藏夹中删除这个项目吗？"
          onConfirm={() => onDelete(item.id)}
          okText="是"
          cancelText="否"
        >
          <Button danger type="text" icon={<Trash2 size={16} />} className="w-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
            删除
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default CollectionItem;