import React, { useState } from 'react';

function App() {
  const [assets, setAssets] = useState([
    { id: 1, name: "ЖК Алтын Орда", location: "Шымкент", totalShares: 1000, soldShares: 340, pricePerShare: 50, roi: "12.4%", image: "🏗️", tag: "Жилой" },
    { id: 2, name: "Бизнес-центр Нур Плаза", location: "Алматы", totalShares: 500, soldShares: 420, pricePerShare: 100, roi: "18.2%", image: "🏢", tag: "Коммерческий" },
    { id: 3, name: "Торговый комплекс Сайрам", location: "Шымкент", totalShares: 2000, soldShares: 800, pricePerShare: 25, roi: "9.8%", image: "🏬", tag: "Торговый" }
  ]);

  const [wallet, setWallet] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        setWallet(response.publicKey.toString());
        setMessage('✅ Кошелёк подключён!');
      } else {
        setMessage('❌ Установите Phantom Wallet!');
      }
    } catch (err) {
      setMessage('❌ Ошибка подключения');
    }
  };

  const buyShares = (assetId: number, amount: number) => {
    if (!wallet) { setMessage('❌ Сначала подключите кошелёк!'); return; }
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, soldShares: a.soldShares + amount } : a));
    setMessage(`✅ Куплено ${amount} доля успешно!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const totalInvested = assets.reduce((sum, a) => sum + a.soldShares * a.pricePerShare, 0);
  const totalProjects = assets.length;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#050810', minHeight: '100vh', color: 'white' }}>
      
      {/* Фоновые элементы */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(153,69,255,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(20,241,149,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      {/* Шапка */}
      <header style={{ position: 'relative', zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70, backdropFilter: 'blur(20px)', background: 'rgba(5,8,16,0.8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #9945FF, #14F195)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏗</div>
          <span style={{ fontSize: 22, fontWeight: 700, background: 'linear-gradient(90deg, #9945FF, #14F195)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SolBrick</span>
          <span style={{ background: 'rgba(153,69,255,0.2)', color: '#9945FF', fontSize: 11, padding: '2px 8px', borderRadius: 20, border: '1px solid rgba(153,69,255,0.3)' }}>DEVNET</span>
        </div>

        <nav style={{ display: 'flex', gap: 8 }}>
          {['all', 'residential', 'commercial'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? 'rgba(153,69,255,0.2)' : 'transparent', color: activeTab === tab ? '#9945FF' : '#888', border: activeTab === tab ? '1px solid rgba(153,69,255,0.4)' : '1px solid transparent', padding: '6px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              {tab === 'all' ? 'Все проекты' : tab === 'residential' ? 'Жилые' : 'Коммерческие'}
            </button>
          ))}
        </nav>

        {wallet ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(20,241,149,0.1)', border: '1px solid rgba(20,241,149,0.3)', padding: '8px 16px', borderRadius: 10 }}>
            <div style={{ width: 8, height: 8, background: '#14F195', borderRadius: '50%' }} />
            <span style={{ color: '#14F195', fontSize: 13 }}>{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
          </div>
        ) : (
          <button onClick={connectWallet} style={{ background: 'linear-gradient(135deg, #9945FF, #7733DD)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            🔗 Подключить кошелёк
          </button>
        )}
      </header>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }}>

        {/* Уведомление */}
        {message && (
          <div style={{ marginBottom: 20, padding: '12px 20px', background: message.includes('✅') ? 'rgba(20,241,149,0.1)' : 'rgba(255,80,80,0.1)', border: `1px solid ${message.includes('✅') ? 'rgba(20,241,149,0.3)' : 'rgba(255,80,80,0.3)'}`, borderRadius: 10, textAlign: 'center' }}>
            {message}
          </div>
        )}

        {/* Статистика */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Всего проектов', value: totalProjects, suffix: '', color: '#9945FF' },
            { label: 'Общий объём', value: `$${(totalInvested/1000).toFixed(0)}K`, suffix: '', color: '#14F195' },
            { label: 'Инвесторов', value: '1,240', suffix: '+', color: '#FF9945' },
            { label: 'Avg. ROI', value: '13.5', suffix: '%', color: '#45D4FF' },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 24px' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}{stat.suffix}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Заголовок */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Активные проекты</h2>
          <p style={{ color: '#666', fontSize: 14, margin: '4px 0 0' }}>Инвестируй в реальные строительные объекты через Solana</p>
        </div>

        {/* Карточки */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {assets.map(asset => {
            const percent = Math.round((asset.soldShares / asset.totalShares) * 100);
            const isHot = percent > 70;
            return (
              <div key={asset.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', transition: 'transform 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                
                {/* Верхняя часть */}
                <div style={{ background: 'linear-gradient(135deg, rgba(153,69,255,0.15), rgba(20,241,149,0.05))', padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 44 }}>{asset.image}</div>
                    <div style={{ marginTop: 8 }}>
                      <span style={{ background: 'rgba(153,69,255,0.2)', color: '#9945FF', fontSize: 11, padding: '2px 8px', borderRadius: 20, border: '1px solid rgba(153,69,255,0.3)' }}>{asset.tag}</span>
                      {isHot && <span style={{ marginLeft: 6, background: 'rgba(255,100,50,0.2)', color: '#FF6432', fontSize: 11, padding: '2px 8px', borderRadius: 20, border: '1px solid rgba(255,100,50,0.3)' }}>🔥 Горячий</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#14F195' }}>{asset.roi}</div>
                    <div style={{ fontSize: 11, color: '#666' }}>Ожидаемый ROI</div>
                  </div>
                </div>

                {/* Нижняя часть */}
                <div style={{ padding: '20px 24px' }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 600 }}>{asset.name}</h3>
                  <p style={{ margin: '0 0 16px', color: '#666', fontSize: 13 }}>📍 {asset.location}</p>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                      <span style={{ color: '#888' }}>Продано долей</span>
                      <span style={{ color: percent > 70 ? '#FF6432' : '#14F195', fontWeight: 600 }}>{percent}%</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 6, height: 6 }}>
                      <div style={{ background: percent > 70 ? 'linear-gradient(90deg, #FF6432, #FF9945)' : 'linear-gradient(90deg, #9945FF, #14F195)', borderRadius: 6, height: 6, width: `${percent}%`, transition: 'width 0.5s' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: '#555' }}>
                      <span>{asset.soldShares} продано</span>
                      <span>{asset.totalShares - asset.soldShares} осталось</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: '#666' }}>Цена 1 доли</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>${asset.pricePerShare}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: '#666' }}>Мин. инвестиция</div>
                      <div style={{ fontSize: 14, color: '#14F195' }}>${asset.pricePerShare} USDC</div>
                    </div>
                  </div>

                  <button onClick={() => buyShares(asset.id, 1)} style={{ width: '100%', background: 'linear-gradient(135deg, #9945FF, #7733DD)', color: 'white', border: 'none', padding: '13px', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>
                    Купить долю → ${asset.pricePerShare}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Футер */}
        <div style={{ marginTop: 60, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 30 }}>
          <div style={{ fontSize: 13, color: '#444' }}>Built on <span style={{ color: '#9945FF' }}>Solana</span> · Powered by <span style={{ color: '#14F195' }}>Anchor</span> · SolBrick © 2026</div>
        </div>
      </main>
    </div>
  );
}

export default App;
