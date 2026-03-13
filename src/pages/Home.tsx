import React, { useState } from 'react';
import { Button, Switch, Radio, Drawer, Spin, message } from 'antd';
import { Sparkles, RefreshCw, Settings, EyeOff, Eye } from 'lucide-react';
import CardDisplay from '../components/CardDisplay';
import RatingPanel from '../components/RatingPanel';
import { Rarity, CardItem } from '../types';

const Home: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentMetadata, setCurrentMetadata] = useState<any>(null);
  const [isR18, setIsR18] = useState<boolean>(true);
  const [platform, setPlatform] = useState<'pixiv' | 'x'>('pixiv');
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [hasRolled, setHasRolled] = useState<boolean>(false);
  const [ratedRarity, setRatedRarity] = useState<Rarity | ''>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isBlurred, setIsBlurred] = useState<boolean>(false);

  const handleRoll = async () => {
    setHasRolled(false);
    setIsRolling(true);
    setRatedRarity('');

    try {
      const apiUrl = platform === 'pixiv'
        ? `https://api.mossia.top/duckMo?num=1&r18Type=${isR18 ? 1 : 0}`
        : `https://api.mossia.top/duckMo/x?num=1`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        const imageData = data.data[0];
        const imageUrl = platform === 'pixiv'
          ? imageData.urlsList[0].url
          : imageData.pictureUrl;
        setCurrentImage(imageUrl);
        setCurrentMetadata(imageData);
        setIsBlurred(isR18);
        setHasRolled(true);
        message.success('抽卡成功！请为这张卡片评级');
      } else {
        message.error('抽卡失败，请重试');
      }
    } catch (error) {
      message.error('网络错误，请检查连接');
      console.error('API Error:', error);
    } finally {
      setIsRolling(false);
    }
  };

  const handleRate = (rarity: Rarity) => {
    setRatedRarity(rarity);

    // Save to collection
    const newItem: CardItem = {
      id: Math.random().toString(36).substr(2, 9),
      url: currentImage,
      rarity: rarity,
      isR18: isR18,
      timestamp: Date.now(),
      platform: platform,
      pid: currentMetadata?.pid,
      title: currentMetadata?.title,
      author: currentMetadata?.author
    };

    const existingCollection = JSON.parse(localStorage.getItem('gacha_collection') || '[]');
    localStorage.setItem('gacha_collection', JSON.stringify([newItem, ...existingCollection]));

    // Dispatch event to sync collection across tabs if needed
    window.dispatchEvent(new Event('collection_updated'));

    message.success(`已保存为 ${rarity} 级到收藏夹！`);
  };

  const handleSkip = () => {
    setRatedRarity('N');
    message.info('已跳过，未加入收藏');
  };

  // Node visibility controlled by classes
  const introClass = !hasRolled ? 'visible-node' : 'hidden-node';
  const cardClass = hasRolled ? 'visible-node' : 'hidden-node';
  const ratingWrapClass = hasRolled && !ratedRarity ? 'visible-node opacity-100' : 'hidden-node opacity-0';
  const nextWrapClass = ratedRarity ? 'visible-node' : 'hidden-node';

  return (
    <div className="flex flex-col items-center py-4 px-4 min-h-screen">

      <Button
        icon={<Settings size={18} />}
        onClick={() => setDrawerOpen(true)}
        className="mb-4"
      >
        设置
      </Button>

      <Drawer
        title="抽卡设置"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 font-medium text-gray-700">平台选择</div>
            <Radio.Group value={platform} onChange={(e) => setPlatform(e.target.value)} disabled={isRolling}>
              <Radio.Button value="pixiv">Pixiv</Radio.Button>
              <Radio.Button value="x">X (Twitter)</Radio.Button>
            </Radio.Group>
          </div>
          {platform === 'pixiv' && (
            <div>
              <div className="mb-2 font-medium text-gray-700">R18 模式</div>
              <Switch
                checked={isR18}
                onChange={setIsR18}
                checkedChildren="开启"
                unCheckedChildren="关闭"
                disabled={isRolling}
              />
            </div>
          )}
        </div>
      </Drawer>

      <div className={`flex flex-col items-center ${introClass}`}>
        <div className="w-[90vw] max-w-[400px] h-[60vh] max-h-[600px] border-4 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 text-gray-400">
          <Sparkles size={48} className="mb-4 text-gray-300" />
          <p className="text-xl">点击下方按钮开始抽卡</p>
        </div>
      </div>

      {isRolling && (
        <div className="flex flex-col items-center justify-center w-[90vw] max-w-[400px] h-[60vh] max-h-[600px]">
          <Spin size="large" />
          <p className="mt-4 text-gray-500">加载中...</p>
        </div>
      )}

      <div className={`w-full ${cardClass}`}>
        <div className="relative flex justify-center">
          <div className={`${isBlurred ? 'blur-xl' : ''} transition-all`}>
            <CardDisplay url={currentImage} rarity={ratedRarity} />
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
      </div>

      <div className="mt-4 flex items-center justify-center w-full">
        {!hasRolled && !isRolling && (
          <Button
            type="primary"
            size="large"
            onClick={handleRoll}
            className="w-48 h-14 text-lg font-bold shadow-lg"
          >
            抽卡
          </Button>
        )}

        <div className={`w-full transition-opacity duration-500 ${ratingWrapClass}`}>
          <div className="text-center mb-2 font-medium text-gray-500">选择稀有度以保存到收藏夹</div>
          <RatingPanel onRate={handleRate} onSkip={handleSkip} />
        </div>

        <div className={`mt-4 ${nextWrapClass}`}>
          <Button
            type="primary"
            size="large"
            onClick={handleRoll}
            icon={<RefreshCw size={18} />}
            className="w-48 h-12 text-md font-bold shadow-md"
          >
            抽下一张
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Home;