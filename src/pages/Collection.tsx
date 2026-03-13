import React, { useState, useEffect } from 'react';
import { Select, Empty, message } from 'antd';
import CollectionItem from '../components/CollectionItem';
import { CardItem } from '../types';

const Collection: React.FC = () => {
  const [collection, setCollection] = useState<CardItem[]>([]);
  const [sortBy, setSortBy] = useState<string>('time_desc');
  const [viewMode, setViewMode] = useState<'large' | 'small' | 'list'>('large');

  const loadCollection = () => {
    const data = JSON.parse(localStorage.getItem('gacha_collection') || '[]');
    setCollection(data);
  };

  useEffect(() => {
    loadCollection();
    
    // Listen to custom event for updates
    window.addEventListener('collection_updated', loadCollection);
    return () => window.removeEventListener('collection_updated', loadCollection);
  }, []);

  const handleDelete = (id: string) => {
    const updated = collection.filter(item => item.id !== id);
    localStorage.setItem('gacha_collection', JSON.stringify(updated));
    setCollection(updated);
    message.success('已从收藏夹移除');
  };

  const getSortedCollection = () => {
    const rarityWeight: Record<string, number> = {
      'UR': 5,
      'SSR': 4,
      'SR': 3,
      'R': 2,
      'N': 1
    };

    return [...collection].sort((a, b) => {
      if (sortBy === 'time_desc') {
        return b.timestamp - a.timestamp;
      }
      if (sortBy === 'time_asc') {
        return a.timestamp - b.timestamp;
      }
      if (sortBy === 'rarity_desc') {
        const weightDiff = rarityWeight[b.rarity] - rarityWeight[a.rarity];
        return weightDiff !== 0 ? weightDiff : b.timestamp - a.timestamp;
      }
      return 0;
    });
  };

  const sortedItems = getSortedCollection();
  const emptyClass = sortedItems.length === 0 ? 'visible-node' : 'hidden-node';
  const gridClass = sortedItems.length > 0 ? 'visible-node' : 'hidden-node';

  return (
    <div className="py-8 px-12">
      <div className="flex justify-between items-center mb-8 bg-slate-50 p-4 rounded-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 m-0">我的收藏 ({collection.length})</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium">视图模式：</span>
            <Select
              value={viewMode}
              onChange={setViewMode}
              style={{ width: 120 }}
              options={[
                { value: 'large', label: '大图' },
                { value: 'small', label: '小图' },
                { value: 'list', label: '列表' },
              ]}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium">排序方式：</span>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 160 }}
              options={[
                { value: 'time_desc', label: '最新优先' },
                { value: 'time_asc', label: '最旧优先' },
                { value: 'rarity_desc', label: '稀有度（高到低）' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={`py-20 ${emptyClass}`}>
        <Empty description="收藏夹是空的，快去抽卡吧！" />
      </div>

      <div className={`${gridClass}`}>
        <div className={`flex flex-wrap gap-x-8 gap-y-12 ${viewMode === 'list' ? 'flex-col' : 'justify-center'}`}>
          {sortedItems.map((item) => (
            <CollectionItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;