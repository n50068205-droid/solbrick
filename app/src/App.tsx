import React, { useState, useEffect } from 'react';

function App() {
  const [assets, setAssets] = useState([
    { id: 1, name: "ЖК Алтын Орда", location: "Шымкент", totalShares: 1000, soldShares: 340, pricePerShare: 50, roi: "12.4%", image: "🏗️", tag: "Жилой", color: "#9945FF" },
    { id: 2, name: "Бизнес-центр Нур Плаза", location: "Алматы", totalShares: 500, soldShares: 420, pricePerShare: 100, roi: "18.2%", image: "🏢", tag: "Коммерческий", color: "#FF6432" },
    { id: 3, name: "Торговый комплекс Сайрам", location: "Шымкент", totalShares: 2000, soldShares: 800, pricePerShare: 25, roi: "9.8%", image: "🏬", tag: "Торговый", color: "#14F195" }
  ]);

  const [wallet, setWallet] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [counter, setCounter] = useState({ projects: 0, volume: 0, investors: 0, roi: 0 });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    // Анимация счётчиков
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounter({
        projects: Math.round(3 * progress),
        volume: Math.round(79 * progress),
        investors: Math.round(1240 * progress),
        roi: Math.round(135 * progress) / 10
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        setWallet(response.publicKey.toString());
        setMessage('✅ Кошелёк подключён!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Установите Phantom Wallet!');
      }
    } catch (err) {
      setMessage('❌ Ошибка подключения');
    }
  };

  const buyShares = (assetId: number, amount: number) => {
    if (!wallet) { setMessage('❌ Сначала подключите кошелёк!'); setTimeout(() => setMessage(''), 3000); return; }
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, soldShares: a.soldShares + amount } : a));
    setMessage(`🎉 Куплено ${amount} доля успешно!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#050810', minHeight: '100vh', color: 'white', overflow: 'hidden' }}>

      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 60px rgba(153,69,255,0.3) !important; }
        .btn-hover { transition: all 0.2s ease; }
        .btn-hover:hover { transform: scale(1.05); filter: brightness(1.2); }
        .nav-btn { transition: all 0.2s ease; }
        .nav-btn:hover { background: rgba(153,69,255,0.3) !important; }
        .stat-card { transition: all 0.3s ease; }
        .stat-card:hover { transform: translateY(-4px); border-color: rgba(153,69,255,0.4) !important; }
      `}</style>

      {/* Фон */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(153,69,255,0.12) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(20,241,149,0.08) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 10s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', top: '40%', left: '50%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,100,50,0.05) 0%, transparent 70%)', borderRadius: '50%', animation: 'float 12s ease-in-out infinite' }} />
        {/* Сетка */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(153,69,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(153,69,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      {/* Шапка */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70, backdropFilter: 'blur(30px)', background: 'rgba(5,8,16,0.85)', animation: 'fadeInDown 0.6s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #9945FF, #14F195)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: '0 0 20px rgba(153,69,255,0.5)' }}>🏗</div>
          <span style={{ fontSize: 24, fontWeight: 800, background: 'linear-gradient(90deg, #9945FF, #14F195, #9945FF)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 3s linear infinite' }}>SolBrick</span>
          <span style={{ background: 'rgba(153,69,255,0.15)', color: '#9945FF', fontSize: 10, padding: '3px 8px', borderRadius: 20, border: '1px solid rgba(153,69,255,0.3)', fontWeight: 700, letterSpacing: 1 }}>DEVNET</span>
        </div>

        <nav style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
          {[['all', 'Все проекты'], ['residential', 'Жилые'], ['commercial', 'Коммерческие']].map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="nav-btn" style={{ background: activeTab === tab ? 'linear-gradient(135deg, rgba(153,69,255,0.4), rgba(153,69,255,0.2))' : 'transparent', color: activeTab === tab ? 'white' : '#666', border: 'none', padding: '8px 18px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: activeTab === tab ? 600 : 400 }}>
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {wallet ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(20,241,149,0.08)', border: '1px solid rgba(20,241,149,0.25)', padding: '10px 18px', borderRadius: 12 }}>
              <div style={{ width: 8, height: 8, background: '#14F195', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#14F195', fontSize: 13, fontWeight: 500 }}>{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
            </div>
          ) : (
            <button onClick={connectWallet} className="btn-hover" style={{ background: 'linear-gradient(135deg, #9945FF, #7733DD)', color: 'white', border: 'none', padding: '11px 22px', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 600, boxShadow: '0 4px 20px rgba(153,69,255,0.4)' }}>
              🔗 Подключить кошелёк
            </button>
          )}
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1140, margin: '0 auto', padding: '50px 20px' }}>

        {/* Уведомление */}
        {message && (
          <div style={{ marginBottom: 24, padding: '14px 24px', background: message.includes('✅') || message.includes('🎉') ? 'rgba(20,241,149,0.1)' : 'rgba(255,80,80,0.1)', border: `1px solid ${message.includes('✅') || message.includes('🎉') ? 'rgba(20,241,149,0.3)' : 'rgba(255,80,80,0.3)'}`, borderRadius: 12, textAlign: 'center', fontSize: 15, animation: 'fadeInDown 0.3s ease' }}>
            {message}
          </div>
        )}

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 60, animation: loaded ? 'fadeInUp 0.8s ease' : 'none', opacity: loaded ? 1 : 0 }}>
          <div style={{ display: 'inline-block', background: 'rgba(153,69,255,0.1)', border: '1px solid rgba(153,69,255,0.3)', padding: '6px 16px', borderRadius: 20, fontSize: 13, color: '#9945FF', marginBottom: 16 }}>
            🚀 Работает на Solana Devnet
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>
            Инвестируй в{' '}
            <span style={{ background: 'linear-gradient(135deg, #9945FF, #14F195)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              недвижимость
            </span>
            <br />от $25
          </h1>
          <p style={{ color: '#666', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>
            Токенизированные строительные проекты Казахстана на блокчейне Solana
          </p>
        </div>

        {/* Статистика */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 50 }}>
          {[
            { label: 'Всего проектов', value: counter.projects, suffix: '', color: '#9945FF' },
            { label: 'Общий объём', value: `$${counter.volume}K`, suffix: '', color: '#14F195' },
            { label: 'Инвесторов', value: counter.investors.toLocaleString(), suffix: '+', color: '#FF9945' },
            { label: 'Avg. ROI', value: counter.roi, suffix: '%', color: '#45D4FF' },
          ].map((stat, i) => (
            <div key={i} className="stat-card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px 28px', animation: loaded ? `fadeInUp ${0.6 + i * 0.1}s ease` : 'none' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, fontVariantNumeric: 'tabular-nums' }}>{stat.value}{stat.suffix}</div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 6 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Заголовок секции */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Активные проекты</h2>
            <p style={{ color: '#555', fontSize: 14, margin: '4px 0 0' }}>{assets.length} объектов доступно</p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, background: '#14F195', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#14F195', fontSize: 13 }}>Live данные</span>
          </div>
        </div>

        {/* Карточки */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {assets.map((asset, idx) => {
            const percent = Math.round((asset.soldShares / asset.totalShares) * 100);
            const isHot = percent > 70;
            const isHovered = hoveredCard === asset.id;
            return (
              <div key={asset.id} className="card-hover" onMouseEnter={() => setHoveredCard(asset.id)} onMouseLeave={() => setHoveredCard(null)}
                style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${isHovered ? 'rgba(153,69,255,0.4)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 20, overflow: 'hidden', animation: loaded ? `fadeInUp ${0.8 + idx * 0.15}s ease` : 'none', boxShadow: isHovered ? `0 20px 60px rgba(153,69,255,0.2)` : 'none' }}>

                {/* Верх карточки */}
                <div style={{ background: `linear-gradient(135deg, rgba(153,69,255,0.12), rgba(20,241,149,0.04))`, padding: '28px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, background: `radial-gradient(circle, ${asset.color}20, transparent)`, borderRadius: '50%' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 52, animation: isHovered ? 'float 2s ease-in-out infinite' : 'none' }}>{asset.image}</div>
                      <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                        <span style={{ background: `${asset.color}20`, color: asset.color, fontSize: 11, padding: '3px 10px', borderRadius: 20, border: `1px solid ${asset.color}40`, fontWeight: 600 }}>{asset.tag}</span>
                        {isHot && <span style={{ background: 'rgba(255,100,50,0.15)', color: '#FF6432', fontSize: 11, padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(255,100,50,0.3)', fontWeight: 600 }}>🔥 Горячий</span>}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', background: 'rgba(20,241,149,0.08)', border: '1px solid rgba(20,241,149,0.2)', padding: '10px 16px', borderRadius: 12 }}>
                      <div style={{ fontSize: 26, fontWeight: 800, color: '#14F195' }}>{asset.roi}</div>
                      <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>Ожидаемый ROI</div>
                    </div>
                  </div>
                </div>

                {/* Тело карточки */}
                <div style={{ padding: '24px 28px' }}>
                  <h3 style={{ margin: '0 0 6px', fontSize: 19, fontWeight: 700 }}>{asset.name}</h3>
                  <p style={{ margin: '0 0 20px', color: '#555', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>📍</span> {asset.location}
                  </p>

                  {/* Прогресс */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                      <span style={{ color: '#777' }}>Продано долей</span>
                      <span style={{ color: isHot ? '#FF6432' : '#14F195', fontWeight: 700, fontSize: 15 }}>{percent}%</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                      <div style={{ background: isHot ? 'linear-gradient(90deg, #FF6432, #FF9945)' : `linear-gradient(90deg, ${asset.color}, #14F195)`, borderRadius: 8, height: 8, width: `${percent}%`, transition: 'width 1s ease', boxShadow: `0 0 10px ${isHot ? '#FF643280' : asset.color + '80'}` }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#444' }}>
                      <span>{asset.soldShares.toLocaleString()} продано</span>
                      <span>{(asset.totalShares - asset.soldShares).toLocaleString()} осталось</span>
                    </div>
                  </div>

                  {/* Цена */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px' }}>
                      <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>Цена доли</div>
                      <div style={{ fontSize: 22, fontWeight: 800 }}>${asset.pricePerShare}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px 16px' }}>
                      <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>Мин. инвестиция</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#14F195' }}>${asset.pricePerShare} USDC</div>
                    </div>
                  </div>

                  <button onClick={() => buyShares(asset.id, 1)} className="btn-hover"
                    style={{ width: '100%', background: `linear-gradient(135deg, ${asset.color}, ${asset.color}99)`, color: 'white', border: 'none', padding: '14px', borderRadius: 12, cursor: 'pointer', fontSize: 16, fontWeight: 700, letterSpacing: 0.5, boxShadow: `0 4px 20px ${asset.color}40` }}>
                    Купить долю → ${asset.pricePerShare}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Футер */}
        <div style={{ marginTop: 80, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 30 }}>
          <div style={{ fontSize: 13, color: '#333' }}>
            Built on <span style={{ color: '#9945FF', fontWeight: 600 }}>Solana</span> · Powered by <span style={{ color: '#14F195', fontWeight: 600 }}>Anchor</span> · SolBrick © 2026
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
