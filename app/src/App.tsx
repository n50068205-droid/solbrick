import React, { useState, useEffect } from 'react';

const PROJECTS = [
  { id: 1, name: "ЖК Алтын Орда", location: "Шымкент", totalShares: 1000, soldShares: 340, pricePerShare: 50, roi: "12.4%", roiNum: 12.4, image: "🏗️", tag: "Жилой", color: "#0066FF", desc: "Современный жилой комплекс в центре Шымкента. 24 этажа, 480 квартир.", area: "45,000 м²", completion: "Q4 2026", minInvest: 50 },
  { id: 2, name: "Бизнес-центр Нур Плаза", location: "Алматы", totalShares: 500, soldShares: 420, pricePerShare: 100, roi: "18.2%", roiNum: 18.2, image: "🏢", tag: "Коммерческий", color: "#00AA44", desc: "Премиальный бизнес-центр класса A в деловом районе Алматы.", area: "28,000 м²", completion: "Q2 2026", minInvest: 100 },
  { id: 3, name: "Торговый комплекс Сайрам", location: "Шымкент", totalShares: 2000, soldShares: 800, pricePerShare: 25, roi: "9.8%", roiNum: 9.8, image: "🏬", tag: "Торговый", color: "#FF6600", desc: "Крупный торгово-развлекательный центр на юге Казахстана.", area: "62,000 м²", completion: "Q1 2027", minInvest: 25 },
  { id: 4, name: "Жилой квартал Астана Парк", location: "Астана", totalShares: 1500, soldShares: 200, pricePerShare: 75, roi: "15.1%", roiNum: 15.1, image: "🏙️", tag: "Жилой", color: "#6600CC", desc: "Элитный жилой квартал рядом с Байтереком.", area: "80,000 м²", completion: "Q3 2027", minInvest: 75 },
  { id: 5, name: "Гостиница Silk Road", location: "Туркестан", totalShares: 800, soldShares: 560, pricePerShare: 60, roi: "22.5%", roiNum: 22.5, image: "🏨", tag: "Отель", color: "#CC0066", desc: "5-звёздочный отель у мавзолея Ходжа Ахмета Яссауи.", area: "18,000 м²", completion: "Q2 2026", minInvest: 60 },
  { id: 6, name: "Логистический центр KazHub", location: "Алматы", totalShares: 3000, soldShares: 450, pricePerShare: 20, roi: "11.3%", roiNum: 11.3, image: "🏭", tag: "Склад", color: "#006688", desc: "Современный логистический хаб у международного аэропорта Алматы.", area: "120,000 м²", completion: "Q4 2026", minInvest: 20 },
];

const TICKER_ITEMS = [
  { name: "ЖК Алтын Орда", price: "$50", change: "+2.4%" },
  { name: "Нур Плаза", price: "$100", change: "+5.1%" },
  { name: "Сайрам ТЦ", price: "$25", change: "-0.8%" },
  { name: "Астана Парк", price: "$75", change: "+8.2%" },
  { name: "Silk Road", price: "$60", change: "+12.5%" },
  { name: "KazHub", price: "$20", change: "+1.3%" },
  { name: "SOL/USD", price: "$142.5", change: "+3.2%" },
];

function App() {
  const [assets, setAssets] = useState(PROJECTS);
  const [wallet, setWallet] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [usdBalance, setUsdBalance] = useState<number>(10000);
  const [message, setMessage] = useState('');
  const [activePage, setActivePage] = useState<'home' | 'portfolio' | 'detail' | 'calculator' | 'transactions'>('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [portfolio, setPortfolio] = useState<{[key: number]: number}>({});
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState({ projects: 0, volume: 0, investors: 0, roi: 0 });
  const [filterTag, setFilterTag] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [modal, setModal] = useState<{project: any, amount: number} | null>(null);
  const [txPending, setTxPending] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [calcAmount, setCalcAmount] = useState(1000);
  const [calcYears, setCalcYears] = useState(3);
  const [calcRoi, setCalcRoi] = useState(12);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const duration = 2000, steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setCounter({ projects: Math.round(6 * p), volume: Math.round(156 * p), investors: Math.round(2840 * p), roi: Math.round(148 * p) / 10 });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        setWallet(response.publicKey.toString());
        setSolBalance(2.45);
        setMessage('✅ Кошелёк подключён!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Установите Phantom Wallet!');
      }
    } catch (err) {
      setMessage('❌ Ошибка подключения');
    }
  };

  const openModal = (project: any, amount: number, e?: any) => {
    if (e) e.stopPropagation();
    if (!wallet) { setMessage('❌ Сначала подключите кошелёк!'); setTimeout(() => setMessage(''), 3000); return; }
    setModal({ project, amount });
  };

  const confirmBuy = async () => {
    if (!modal) return;
    setTxPending(true);
    await new Promise(r => setTimeout(r, 2000));
    const cost = modal.amount * modal.project.pricePerShare;
    setAssets(prev => prev.map(a => a.id === modal.project.id ? { ...a, soldShares: a.soldShares + modal.amount } : a));
    setPortfolio(prev => ({ ...prev, [modal.project.id]: (prev[modal.project.id] || 0) + modal.amount }));
    setSolBalance(prev => Math.max(0, prev - 0.001));
    setUsdBalance(prev => Math.max(0, prev - cost));
    setTransactions(prev => [{
      id: Date.now(),
      type: 'buy',
      project: modal.project.name,
      amount: modal.amount,
      cost,
      date: new Date().toLocaleString('ru-RU'),
      hash: '0x' + Math.random().toString(16).slice(2, 10).toUpperCase(),
      status: 'confirmed'
    }, ...prev]);
    setTxPending(false);
    setModal(null);
    setMessage(`🎉 Транзакция подтверждена! Куплено ${modal.amount} доля в "${modal.project.name}"`);
    setTimeout(() => setMessage(''), 5000);
  };

  const tags = ['Все', 'Жилой', 'Коммерческий', 'Торговый', 'Отель', 'Склад'];
  const filteredAssets = assets
    .filter(a => filterTag === 'Все' || a.tag === filterTag)
    .filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.location.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'roi') return b.roiNum - a.roiNum;
      if (sortBy === 'price_asc') return a.pricePerShare - b.pricePerShare;
      if (sortBy === 'price_desc') return b.pricePerShare - a.pricePerShare;
      if (sortBy === 'sold') return (b.soldShares/b.totalShares) - (a.soldShares/a.totalShares);
      return 0;
    });

  const totalPortfolioValue = Object.entries(portfolio).reduce((sum, [id, shares]) => {
    const project = assets.find(a => a.id === parseInt(id));
    return sum + (project ? shares * project.pricePerShare : 0);
  }, 0);

  const calcResult = calcAmount * Math.pow(1 + calcRoi/100, calcYears);
  const calcProfit = calcResult - calcAmount;

  const chartData = [40, 45, 42, 48, 52, 49, 55, 58, 54, 62, 67, 71];
  const months = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
  const maxVal = Math.max(...chartData);

  // Онбординг
  const onboardingSteps = [
    { icon: '🏗️', title: 'Добро пожаловать в SolBrick!', desc: 'Первая платформа фракционного владения недвижимостью Казахстана на блокчейне Solana' },
    { icon: '💰', title: 'Инвестируй от $25', desc: 'Покупай доли в реальных строительных проектах. Никаких посредников — только смарт-контракт.' },
    { icon: '📈', title: 'Получай доход', desc: 'Средний ROI наших проектов — 13.5% годовых. Прозрачно и безопасно on-chain.' },
    { icon: '🔗', title: 'Подключи Phantom Wallet', desc: 'Все транзакции записываются в Solana блокчейн. Ты всегда владеешь своими активами.' },
  ];

  if (showOnboarding) {
    return (
      <div style={{ fontFamily:"'Segoe UI', sans-serif", background:'linear-gradient(135deg, #0a0f1e 0%, #0d1117 100%)', minHeight:'100vh', color:'white', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <style>{`@keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }`}</style>
        <div style={{ maxWidth:480, width:'100%', padding:20, animation:'fadeIn 0.5s ease' }}>
          {/* Лого */}
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ width:80, height:80, background:'linear-gradient(135deg, #0066FF, #00AAFF)', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, margin:'0 auto 16px', boxShadow:'0 8px 32px rgba(0,102,255,0.4)' }}>🏗</div>
            <div style={{ fontSize:28, fontWeight:800, color:'white' }}>SolBrick</div>
            <div style={{ fontSize:13, color:'#555', marginTop:4 }}>Недвижимость на блокчейне</div>
          </div>

          {/* Карточка шага */}
          <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:24, padding:40, textAlign:'center', marginBottom:24 }}>
            <div style={{ fontSize:64, marginBottom:20 }}>{onboardingSteps[onboardingStep].icon}</div>
            <h2 style={{ margin:'0 0 12px', fontSize:22, fontWeight:700 }}>{onboardingSteps[onboardingStep].title}</h2>
            <p style={{ color:'#888', fontSize:15, lineHeight:1.6, margin:0 }}>{onboardingSteps[onboardingStep].desc}</p>
          </div>

          {/* Точки прогресса */}
          <div style={{ display:'flex', justifyContent:'center', gap:8, marginBottom:24 }}>
            {onboardingSteps.map((_, i) => (
              <div key={i} style={{ width: i === onboardingStep ? 24 : 8, height:8, background: i === onboardingStep ? '#0066FF' : 'rgba(255,255,255,0.15)', borderRadius:4, transition:'all 0.3s' }} />
            ))}
          </div>

          {/* Кнопки */}
          {onboardingStep < onboardingSteps.length - 1 ? (
            <button onClick={() => setOnboardingStep(s => s + 1)}
              style={{ width:'100%', background:'linear-gradient(135deg, #0066FF, #0044CC)', color:'white', border:'none', padding:'16px', borderRadius:14, cursor:'pointer', fontSize:16, fontWeight:700, boxShadow:'0 4px 20px rgba(0,102,255,0.4)' }}>
              Далее →
            </button>
          ) : (
            <button onClick={() => setShowOnboarding(false)}
              style={{ width:'100%', background:'linear-gradient(135deg, #0066FF, #0044CC)', color:'white', border:'none', padding:'16px', borderRadius:14, cursor:'pointer', fontSize:16, fontWeight:700, boxShadow:'0 4px 20px rgba(0,102,255,0.4)' }}>
              Начать инвестировать 🚀
            </button>
          )}
          <button onClick={() => setShowOnboarding(false)} style={{ width:'100%', background:'transparent', color:'#555', border:'none', padding:'12px', cursor:'pointer', fontSize:13, marginTop:8 }}>
            Пропустить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:"'Segoe UI', sans-serif", background:'#f0f4f8', minHeight:'100vh', color:'#1a1a2e' }}>
      <style>{`
        @keyframes fadeInDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes modalIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .card { transition:all 0.3s ease; cursor:pointer; }
        .card:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,102,255,0.15) !important; }
        .btn { transition:all 0.2s ease; }
        .btn:hover { transform:scale(1.03); filter:brightness(1.05); }
        .nav-item { transition:all 0.2s ease; cursor:pointer; }
        .nav-item:hover { background:rgba(0,102,255,0.08) !important; }
        input:focus { outline:none; }
        select:focus { outline:none; }
        input[type=range] { accent-color: #0066FF; }
      `}</style>

      {/* Бегущая строка */}
      <div style={{ background:'#0066FF', height:32, overflow:'hidden', position:'relative', zIndex:200 }}>
        <div style={{ display:'flex', animation:'ticker 30s linear infinite', width:'max-content' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'0 24px', whiteSpace:'nowrap', height:32 }}>
              <span style={{ color:'rgba(255,255,255,0.7)', fontSize:12 }}>{item.name}</span>
              <span style={{ color:'white', fontSize:12, fontWeight:700 }}>{item.price}</span>
              <span style={{ color: item.change.startsWith('+') ? '#90EE90' : '#FFB3B3', fontSize:11 }}>{item.change}</span>
              <span style={{ color:'rgba(255,255,255,0.2)', fontSize:14 }}>|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Шапка */}
      <header style={{ background:'white', borderBottom:'1px solid #e8ecf0', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64, boxShadow:'0 2px 8px rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div onClick={() => setActivePage('home')} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
            <div style={{ width:38, height:38, background:'linear-gradient(135deg, #0066FF, #00AAFF)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🏗</div>
            <div>
              <div style={{ fontSize:18, fontWeight:800, color:'#0066FF' }}>SolBrick</div>
              <div style={{ fontSize:10, color:'#999', marginTop:-2 }}>Недвижимость на Solana</div>
            </div>
          </div>
        </div>

        <nav style={{ display:'flex', gap:4 }}>
          {[['home','🏠 Проекты'],['portfolio','💼 Портфель'],['calculator','🧮 Калькулятор'],['transactions','📋 История']].map(([page, label]) => (
            <button key={page} onClick={() => setActivePage(page as any)} className="nav-item"
              style={{ background: activePage === page ? 'rgba(0,102,255,0.08)' : 'transparent', color: activePage === page ? '#0066FF' : '#666', border:'none', padding:'8px 16px', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight: activePage === page ? 600 : 400, borderBottom: activePage === page ? '2px solid #0066FF' : '2px solid transparent' }}>
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {wallet && (
            <div style={{ background:'#f0f4f8', border:'1px solid #e0e6ed', padding:'8px 14px', borderRadius:10, fontSize:13, color:'#333' }}>
              ◎ {solBalance.toFixed(3)} SOL
            </div>
          )}
          {wallet ? (
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'#e8f5e9', border:'1px solid #c8e6c9', padding:'8px 16px', borderRadius:10 }}>
              <div style={{ width:8, height:8, background:'#00AA44', borderRadius:'50%', animation:'pulse 2s infinite' }} />
              <span style={{ color:'#00AA44', fontSize:13, fontWeight:600 }}>{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
            </div>
          ) : (
            <button onClick={connectWallet} className="btn"
              style={{ background:'linear-gradient(135deg, #0066FF, #0044CC)', color:'white', border:'none', padding:'10px 20px', borderRadius:10, cursor:'pointer', fontSize:14, fontWeight:600, boxShadow:'0 4px 12px rgba(0,102,255,0.3)' }}>
              🔗 Подключить кошелёк
            </button>
          )}
        </div>
      </header>

      {/* Модальное окно */}
      {modal && (
        <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={() => !txPending && setModal(null)}>
          <div style={{ background:'white', borderRadius:24, padding:32, width:420, animation:'modalIn 0.3s ease', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <div style={{ fontSize:56, marginBottom:8 }}>{modal.project.image}</div>
              <h3 style={{ margin:'0 0 4px', fontSize:20, color:'#1a1a2e' }}>Подтвердить покупку</h3>
              <p style={{ color:'#999', fontSize:13 }}>On-chain транзакция через Solana</p>
            </div>
            <div style={{ background:'#f8fafc', border:'1px solid #e8ecf0', borderRadius:16, padding:20, marginBottom:20 }}>
              {[['Проект', modal.project.name],['Количество', `${modal.amount} доля`],['Цена за долю', `$${modal.project.pricePerShare}`],['Итого', `$${modal.amount * modal.project.pricePerShare}`],['Комиссия сети', '~0.001 SOL']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:14 }}>
                  <span style={{ color:'#888' }}>{k}</span>
                  <span style={{ fontWeight: k==='Итого' ? 700 : 500, color: k==='Итого' ? '#0066FF' : '#1a1a2e', fontSize: k==='Итого' ? 16 : 14 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:'#e8f0ff', border:'1px solid #c0d4ff', borderRadius:12, padding:'10px 16px', marginBottom:20, fontSize:12, color:'#0066FF' }}>
              ⚡ Транзакция будет записана в Solana блокчейн навсегда
            </div>
            <button onClick={confirmBuy} disabled={txPending} className="btn"
              style={{ width:'100%', background: txPending ? '#ccc' : 'linear-gradient(135deg, #0066FF, #0044CC)', color:'white', border:'none', padding:'14px', borderRadius:12, cursor: txPending ? 'not-allowed' : 'pointer', fontSize:16, fontWeight:700, marginBottom:10, display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow: txPending ? 'none' : '0 4px 16px rgba(0,102,255,0.4)' }}>
              {txPending ? (
                <><div style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />Обработка...</>
              ) : `✅ Подтвердить · $${modal.amount * modal.project.pricePerShare}`}
            </button>
            {!txPending && <button onClick={() => setModal(null)} style={{ width:'100%', background:'transparent', color:'#999', border:'1px solid #e8ecf0', padding:'12px', borderRadius:12, cursor:'pointer', fontSize:14 }}>Отмена</button>}
          </div>
        </div>
      )}

      <main style={{ maxWidth:1200, margin:'0 auto', padding:'32px 20px' }}>
        {message && (
          <div style={{ marginBottom:20, padding:'14px 24px', background: message.includes('✅')||message.includes('🎉') ? '#e8f5e9' : '#ffebee', border:`1px solid ${message.includes('✅')||message.includes('🎉') ? '#c8e6c9' : '#ffcdd2'}`, borderRadius:12, textAlign:'center', animation:'fadeInDown 0.3s ease', fontSize:15, color: message.includes('✅')||message.includes('🎉') ? '#2e7d32' : '#c62828' }}>
            {message}
          </div>
        )}

        {/* ДЕТАЛИ */}
        {activePage === 'detail' && selectedProject && (
          <div style={{ animation:'fadeInUp 0.4s ease' }}>
            <button onClick={() => setActivePage('home')} style={{ background:'white', border:'1px solid #e8ecf0', color:'#666', padding:'8px 16px', borderRadius:10, cursor:'pointer', marginBottom:24, fontSize:13, boxShadow:'0 2px 6px rgba(0,0,0,0.06)' }}>← Назад</button>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              <div>
                <div style={{ background:'white', borderRadius:20, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', marginBottom:20 }}>
                  <div style={{ background:`linear-gradient(135deg, ${selectedProject.color}15, ${selectedProject.color}05)`, padding:40, textAlign:'center' }}>
                    <div style={{ fontSize:90 }}>{selectedProject.image}</div>
                    <span style={{ background:selectedProject.color, color:'white', fontSize:12, padding:'4px 14px', borderRadius:20, fontWeight:600, display:'inline-block', marginTop:12 }}>{selectedProject.tag}</span>
                  </div>
                  <div style={{ padding:24 }}>
                    <h2 style={{ margin:'0 0 6px', fontSize:22, color:'#1a1a2e' }}>{selectedProject.name}</h2>
                    <p style={{ color:'#999', margin:'0 0 16px', fontSize:14 }}>📍 {selectedProject.location}</p>
                    <p style={{ color:'#555', lineHeight:1.7, margin:'0 0 20px', fontSize:14 }}>{selectedProject.desc}</p>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                      {[['Площадь', selectedProject.area],['Сдача', selectedProject.completion],['Цена доли', `$${selectedProject.pricePerShare}`],['ROI', selectedProject.roi]].map(([k,v]) => (
                        <div key={k} style={{ background:'#f8fafc', border:'1px solid #e8ecf0', borderRadius:12, padding:'12px 16px' }}>
                          <div style={{ fontSize:11, color:'#999', marginBottom:4 }}>{k}</div>
                          <div style={{ fontSize:16, fontWeight:700, color: k==='ROI' ? '#00AA44' : '#1a1a2e' }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ background:'white', borderRadius:20, padding:24, boxShadow:'0 4px 20px rgba(0,0,0,0.08)', marginBottom:20 }}>
                  <h3 style={{ margin:'0 0 20px', fontSize:16, color:'#1a1a2e' }}>📈 График доходности</h3>
                  <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:120 }}>
                    {chartData.map((val, i) => (
                      <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                        <div style={{ width:'100%', background:`linear-gradient(180deg, ${selectedProject.color}, ${selectedProject.color}80)`, borderRadius:'4px 4px 0 0', height:`${(val/maxVal)*100}px` }} />
                        <span style={{ fontSize:9, color:'#bbb' }}>{months[i]}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, fontSize:12, color:'#999' }}>
                    <span>Нач: $40K</span>
                    <span style={{ color:'#00AA44', fontWeight:600 }}>+77.5% за год</span>
                    <span>Тек: $71K</span>
                  </div>
                </div>
                <div style={{ background:'white', borderRadius:20, padding:24, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                  <h3 style={{ margin:'0 0 16px', fontSize:16, color:'#1a1a2e' }}>💰 Инвестировать</h3>
                  <div style={{ background:'#f8fafc', borderRadius:12, padding:16, marginBottom:16 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#999', marginBottom:8 }}>
                      <span>Продано долей</span>
                      <span style={{ color: (selectedProject.soldShares/selectedProject.totalShares) > 0.7 ? '#FF6600' : '#00AA44', fontWeight:700 }}>
                        {Math.round((selectedProject.soldShares/selectedProject.totalShares)*100)}%
                      </span>
                    </div>
                    <div style={{ background:'#e8ecf0', borderRadius:6, height:8 }}>
                      <div style={{ background:selectedProject.color, borderRadius:6, height:8, width:`${(selectedProject.soldShares/selectedProject.totalShares)*100}%` }} />
                    </div>
                  </div>
                  {[1,5,10].map(amount => (
                    <button key={amount} onClick={() => openModal(selectedProject, amount)} className="btn"
                      style={{ width:'100%', background:selectedProject.color, color:'white', border:'none', padding:'13px', borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:700, marginBottom:8, boxShadow:`0 4px 12px ${selectedProject.color}40` }}>
                      Купить {amount} {amount===1?'долю':'долей'} · ${amount * selectedProject.pricePerShare}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* КАЛЬКУЛЯТОР */}
        {activePage === 'calculator' && (
          <div style={{ animation:'fadeInUp 0.4s ease' }}>
            <h2 style={{ fontSize:24, fontWeight:800, marginBottom:4, color:'#1a1a2e' }}>🧮 Калькулятор доходности</h2>
            <p style={{ color:'#999', marginBottom:32, fontSize:14 }}>Рассчитайте потенциальный доход от инвестиций</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              <div style={{ background:'white', borderRadius:20, padding:32, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin:'0 0 24px', fontSize:16, color:'#1a1a2e' }}>Параметры инвестиции</h3>
                {[
                  { label:'Сумма инвестиции', value:calcAmount, min:25, max:100000, step:25, setter:setCalcAmount, format:(v:number) => `$${v.toLocaleString()}` },
                  { label:'Срок (лет)', value:calcYears, min:1, max:10, step:1, setter:setCalcYears, format:(v:number) => `${v} лет` },
                  { label:'Ожидаемый ROI (%)', value:calcRoi, min:5, max:30, step:0.5, setter:setCalcRoi, format:(v:number) => `${v}%` },
                ].map(param => (
                  <div key={param.label} style={{ marginBottom:24 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <span style={{ fontSize:14, color:'#555' }}>{param.label}</span>
                      <span style={{ fontSize:14, fontWeight:700, color:'#0066FF' }}>{param.format(param.value)}</span>
                    </div>
                    <input type="range" min={param.min} max={param.max} step={param.step} value={param.value}
                      onChange={e => param.setter(Number(e.target.value))}
                      style={{ width:'100%', height:6 }} />
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#bbb', marginTop:4 }}>
                      <span>{param.format(param.min)}</span>
                      <span>{param.format(param.max)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ background:'linear-gradient(135deg, #0066FF, #0044CC)', borderRadius:20, padding:32, color:'white', marginBottom:20, boxShadow:'0 8px 32px rgba(0,102,255,0.3)' }}>
                  <h3 style={{ margin:'0 0 24px', fontSize:16, opacity:0.9 }}>Результат</h3>
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:13, opacity:0.7, marginBottom:4 }}>Итоговая сумма</div>
                    <div style={{ fontSize:40, fontWeight:800 }}>${calcResult.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                    <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:12, padding:16 }}>
                      <div style={{ fontSize:12, opacity:0.7 }}>Вложено</div>
                      <div style={{ fontSize:20, fontWeight:700 }}>${calcAmount.toLocaleString()}</div>
                    </div>
                    <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:12, padding:16 }}>
                      <div style={{ fontSize:12, opacity:0.7 }}>Прибыль</div>
                      <div style={{ fontSize:20, fontWeight:700, color:'#90EE90' }}>+${calcProfit.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                    </div>
                  </div>
                </div>
                <div style={{ background:'white', borderRadius:20, padding:24, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                  <h4 style={{ margin:'0 0 16px', fontSize:14, color:'#1a1a2e' }}>Рост по годам</h4>
                  {Array.from({length: Math.min(calcYears, 5)}, (_, i) => {
                    const yearValue = calcAmount * Math.pow(1 + calcRoi/100, i+1);
                    const pct = ((yearValue - calcAmount) / calcAmount * 100).toFixed(1);
                    return (
                      <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                        <span style={{ fontSize:13, color:'#555' }}>{i+1} год</span>
                        <div style={{ flex:1, margin:'0 12px', background:'#f0f4f8', borderRadius:4, height:6 }}>
                          <div style={{ background:'#0066FF', borderRadius:4, height:6, width:`${Math.min((yearValue/calcResult)*100, 100)}%` }} />
                        </div>
                        <span style={{ fontSize:13, fontWeight:600, color:'#0066FF' }}>${yearValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} (+{pct}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ИСТОРИЯ ТРАНЗАКЦИЙ */}
        {activePage === 'transactions' && (
          <div style={{ animation:'fadeInUp 0.4s ease' }}>
            <h2 style={{ fontSize:24, fontWeight:800, marginBottom:4, color:'#1a1a2e' }}>📋 История транзакций</h2>
            <p style={{ color:'#999', marginBottom:32, fontSize:14 }}>Все ваши on-chain операции</p>
            {transactions.length === 0 ? (
              <div style={{ textAlign:'center', padding:60, background:'white', borderRadius:20, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
                <p style={{ color:'#999' }}>Транзакций пока нет</p>
                <button onClick={() => setActivePage('home')} className="btn" style={{ background:'#0066FF', color:'white', border:'none', padding:'10px 20px', borderRadius:10, cursor:'pointer', fontSize:14, fontWeight:600, marginTop:12 }}>Перейти к проектам</button>
              </div>
            ) : (
              <div style={{ background:'white', borderRadius:20, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                <div style={{ padding:'16px 24px', borderBottom:'1px solid #f0f4f8', display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:16, fontSize:12, color:'#999', fontWeight:600 }}>
                  <span>ПРОЕКТ</span><span>ТИП</span><span>СУММА</span><span>ДАТА</span><span>ХЭШ</span>
                </div>
                {transactions.map(tx => (
                  <div key={tx.id} style={{ padding:'16px 24px', borderBottom:'1px solid #f8fafc', display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:16, alignItems:'center' }}>
                    <div>
                      <div style={{ fontWeight:600, fontSize:14, color:'#1a1a2e' }}>{tx.project}</div>
                      <div style={{ fontSize:12, color:'#999' }}>{tx.amount} долей</div>
                    </div>
                    <span style={{ background:'#e8f5e9', color:'#00AA44', fontSize:12, padding:'4px 10px', borderRadius:20, fontWeight:600, display:'inline-block' }}>Покупка</span>
                    <span style={{ fontWeight:700, color:'#0066FF', fontSize:14 }}>${tx.cost}</span>
                    <span style={{ fontSize:12, color:'#999' }}>{tx.date}</span>
                    <span style={{ fontSize:11, color:'#0066FF', fontFamily:'monospace' }}>{tx.hash}...</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ПОРТФЕЛЬ */}
        {activePage === 'portfolio' && (
          <div style={{ animation:'fadeInUp 0.4s ease' }}>
            <h2 style={{ fontSize:24, fontWeight:800, marginBottom:4, color:'#1a1a2e' }}>💼 Мой портфель</h2>
            <p style={{ color:'#999', marginBottom:32, fontSize:14 }}>Ваши инвестиции на Solana блокчейне</p>
            {!wallet ? (
              <div style={{ textAlign:'center', padding:60, background:'white', borderRadius:20, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🔗</div>
                <p style={{ color:'#999', marginBottom:20 }}>Подключите кошелёк</p>
                <button onClick={connectWallet} className="btn" style={{ background:'#0066FF', color:'white', border:'none', padding:'12px 24px', borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:600 }}>Подключить Phantom Wallet</button>
              </div>
            ) : (
              <>
                {/* Карточка баланса */}
                <div style={{ background:'linear-gradient(135deg, #0066FF, #0044CC)', borderRadius:20, padding:28, color:'white', marginBottom:24, boxShadow:'0 8px 32px rgba(0,102,255,0.3)' }}>
                  <div style={{ fontSize:13, opacity:0.8, marginBottom:8 }}>Общий баланс</div>
                  <div style={{ fontSize:36, fontWeight:800, marginBottom:16 }}>${(totalPortfolioValue + usdBalance).toLocaleString()}</div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
                    {[{label:'Инвестировано',value:`$${totalPortfolioValue}`},{label:'Свободно',value:`$${usdBalance.toLocaleString()}`},{label:'SOL баланс',value:`◎ ${solBalance.toFixed(3)}`}].map((s,i) => (
                      <div key={i} style={{ background:'rgba(255,255,255,0.15)', borderRadius:12, padding:'12px 16px' }}>
                        <div style={{ fontSize:11, opacity:0.7, marginBottom:4 }}>{s.label}</div>
                        <div style={{ fontSize:16, fontWeight:700 }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {Object.keys(portfolio).length === 0 ? (
                  <div style={{ textAlign:'center', padding:40, background:'white', borderRadius:20, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                    <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
                    <p style={{ color:'#999', marginBottom:16 }}>У вас пока нет инвестиций</p>
                    <button onClick={() => setActivePage('home')} className="btn" style={{ background:'#0066FF', color:'white', border:'none', padding:'10px 20px', borderRadius:10, cursor:'pointer', fontSize:14, fontWeight:600 }}>Посмотреть проекты</button>
                  </div>
                ) : (
                  <div style={{ display:'grid', gap:16 }}>
                    {Object.entries(portfolio).map(([id, shares]) => {
                      const p = assets.find(a => a.id === parseInt(id))!;
                      const value = shares * p.pricePerShare;
                      return (
                        <div key={id} style={{ background:'white', border:`2px solid ${p.color}20`, borderRadius:16, padding:20, display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                            <div style={{ width:50, height:50, background:`${p.color}15`, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>{p.image}</div>
                            <div>
                              <div style={{ fontWeight:700, fontSize:15, color:'#1a1a2e' }}>{p.name}</div>
                              <div style={{ color:'#999', fontSize:13 }}>📍 {p.location} · {shares} долей</div>
                            </div>
                          </div>
                          <div style={{ textAlign:'right' }}>
                            <div style={{ fontSize:20, fontWeight:800, color:p.color }}>${value}</div>
                            <div style={{ color:'#00AA44', fontSize:12, marginTop:2 }}>ROI {p.roi}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ГЛАВНАЯ */}
        {activePage === 'home' && (
          <>
            {/* Баннер */}
            <div style={{ background:'linear-gradient(135deg, #0066FF 0%, #0044CC 100%)', borderRadius:24, padding:'32px 40px', marginBottom:32, color:'white', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 8px 32px rgba(0,102,255,0.3)' }}>
              <div>
                <div style={{ fontSize:13, opacity:0.8, marginBottom:8 }}>🚀 Работает на Solana Devnet</div>
                <h1 style={{ fontSize:32, fontWeight:800, margin:'0 0 8px', lineHeight:1.2 }}>Инвестируй в недвижимость<br/>от $25</h1>
                <p style={{ opacity:0.8, fontSize:15, margin:'0 0 20px' }}>Токенизированные проекты Казахстана на блокчейне</p>
                <button onClick={() => setActivePage('calculator')} className="btn"
                  style={{ background:'white', color:'#0066FF', border:'none', padding:'12px 24px', borderRadius:12, cursor:'pointer', fontSize:14, fontWeight:700 }}>
                  🧮 Рассчитать доход
                </button>
              </div>
              <div style={{ fontSize:100, opacity:0.3 }}>🏗️</div>
            </div>

            {/* Статистика */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:32 }}>
              {[{label:'Проектов',value:counter.projects,suffix:'',color:'#0066FF',icon:'🏗️'},{label:'Общий объём',value:`$${counter.volume}K`,suffix:'',color:'#00AA44',icon:'💰'},{label:'Инвесторов',value:counter.investors.toLocaleString(),suffix:'+',color:'#FF6600',icon:'👥'},{label:'Avg. ROI',value:counter.roi,suffix:'%',color:'#CC0066',icon:'📈'}].map((s,i) => (
                <div key={i} className="card" style={{ background:'white', border:'1px solid #e8ecf0', borderRadius:16, padding:'20px 24px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
                  <div style={{ fontSize:28, fontWeight:800, color:s.color }}>{s.value}{s.suffix}</div>
                  <div style={{ fontSize:13, color:'#999', marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Поиск */}
            <div style={{ display:'flex', gap:12, marginBottom:20 }}>
              <div style={{ flex:1, position:'relative' }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, color:'#bbb' }}>🔍</span>
                <input type="text" placeholder="Поиск по названию или городу..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width:'100%', background:'white', border:'1px solid #e8ecf0', borderRadius:12, padding:'12px 16px 12px 44px', color:'#1a1a2e', fontSize:14, boxSizing:'border-box', boxShadow:'0 2px 6px rgba(0,0,0,0.04)' }} />
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ background:'white', border:'1px solid #e8ecf0', borderRadius:12, padding:'12px 16px', color:'#555', fontSize:13, cursor:'pointer', boxShadow:'0 2px 6px rgba(0,0,0,0.04)' }}>
                <option value="default">По умолчанию</option>
                <option value="roi">По ROI ↓</option>
                <option value="price_asc">Цена ↑</option>
                <option value="price_desc">Цена ↓</option>
                <option value="sold">По продажам ↓</option>
              </select>
            </div>

            {/* Фильтры */}
            <div style={{ display:'flex', gap:8, marginBottom:24, flexWrap:'wrap', alignItems:'center' }}>
              {tags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(tag)}
                  style={{ background: filterTag === tag ? '#0066FF' : 'white', color: filterTag === tag ? 'white' : '#666', border: filterTag === tag ? 'none' : '1px solid #e8ecf0', padding:'7px 16px', borderRadius:20, fontSize:13, fontWeight: filterTag === tag ? 600 : 400, cursor:'pointer', transition:'all 0.2s', boxShadow: filterTag === tag ? '0 4px 12px rgba(0,102,255,0.3)' : '0 2px 4px rgba(0,0,0,0.04)' }}>
                  {tag}
                </button>
              ))}
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, background:'#00AA44', borderRadius:'50%', animation:'pulse 2s infinite' }} />
                <span style={{ color:'#00AA44', fontSize:13, fontWeight:600 }}>Live · {filteredAssets.length} проектов</span>
              </div>
            </div>

            {filteredAssets.length === 0 && (
              <div style={{ textAlign:'center', padding:48, background:'white', borderRadius:20, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
                <p style={{ color:'#999' }}>Ничего не найдено</p>
                <button onClick={() => { setSearchQuery(''); setFilterTag('Все'); }} style={{ background:'#f0f4f8', border:'none', color:'#555', padding:'8px 16px', borderRadius:10, cursor:'pointer', marginTop:12, fontSize:13 }}>Сбросить фильтры</button>
              </div>
            )}

            {/* Карточки */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {filteredAssets.map((asset, idx) => {
                const percent = Math.round((asset.soldShares / asset.totalShares) * 100);
                const isHot = percent > 70;
                const isExpanded = expandedCard === asset.id;
                return (
                  <div key={asset.id} className="card"
                    onClick={() => setExpandedCard(isExpanded ? null : asset.id)}
                    style={{ background:'white', border:`1px solid ${isExpanded ? asset.color : '#e8ecf0'}`, borderRadius:20, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', animation: loaded ? `fadeInUp ${0.3+idx*0.08}s ease` : 'none' }}>
                    
                    <div style={{ background:`linear-gradient(135deg, ${asset.color}10, ${asset.color}05)`, padding:'20px 20px 16px', borderBottom:'1px solid #f5f7fa' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                        <div style={{ fontSize:44 }}>{asset.image}</div>
                        <div style={{ textAlign:'right', background:'#f0faf4', border:'1px solid #c8e6c9', padding:'8px 12px', borderRadius:10 }}>
                          <div style={{ fontSize:18, fontWeight:800, color:'#00AA44' }}>{asset.roi}</div>
                          <div style={{ fontSize:10, color:'#999' }}>ROI</div>
                        </div>
                      </div>
                      <div style={{ marginTop:10, display:'flex', gap:6 }}>
                        <span style={{ background:asset.color, color:'white', fontSize:10, padding:'3px 10px', borderRadius:20, fontWeight:600 }}>{asset.tag}</span>
                        {isHot && <span style={{ background:'#FFF3E0', color:'#FF6600', fontSize:10, padding:'3px 10px', borderRadius:20, fontWeight:600, border:'1px solid #FFE0B2' }}>🔥 Горячий</span>}
                      </div>
                    </div>

                    <div style={{ padding:'16px 20px' }}>
                      <h3 style={{ margin:'0 0 4px', fontSize:16, fontWeight:700, color:'#1a1a2e' }}>{asset.name}</h3>
                      <p style={{ margin:'0 0 14px', color:'#999', fontSize:12 }}>📍 {asset.location}</p>
                      <div style={{ marginBottom:14 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:12 }}>
                          <span style={{ color:'#999' }}>Продано</span>
                          <span style={{ color: isHot ? '#FF6600' : '#00AA44', fontWeight:700 }}>{percent}%</span>
                        </div>
                        <div style={{ background:'#f0f4f8', borderRadius:6, height:6 }}>
                          <div style={{ background: isHot ? 'linear-gradient(90deg, #FF6600, #FF9945)' : asset.color, borderRadius:6, height:6, width:`${percent}%` }} />
                        </div>
                      </div>

                      <div style={{ overflow:'hidden', maxHeight: isExpanded ? '400px' : '0', opacity: isExpanded ? 1 : 0, transition:'all 0.4s ease' }}>
                        <p style={{ color:'#888', fontSize:12, lineHeight:1.6, marginBottom:12, paddingTop:10, borderTop:'1px solid #f5f7fa' }}>{asset.desc}</p>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
                          {[['Площадь', asset.area],['Сдача', asset.completion],['Долей', asset.totalShares],['Цена', `$${asset.pricePerShare}`]].map(([k,v]) => (
                            <div key={k} style={{ background:'#f8fafc', borderRadius:8, padding:'8px 10px', border:'1px solid #e8ecf0' }}>
                              <div style={{ fontSize:10, color:'#bbb' }}>{k}</div>
                              <div style={{ fontSize:13, fontWeight:600, color:'#1a1a2e' }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
                          <button onClick={(e) => { e.stopPropagation(); openModal(asset, 1, e); }} className="btn"
                            style={{ background:asset.color, color:'white', border:'none', padding:'10px', borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:700 }}>
                            💰 Купить · ${asset.pricePerShare}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedProject(asset); setActivePage('detail'); }} className="btn"
                            style={{ background:'#f0f4f8', color:'#555', border:'1px solid #e8ecf0', padding:'10px', borderRadius:10, cursor:'pointer', fontSize:13 }}>
                            Детали →
                          </button>
                        </div>
                      </div>

                      {!isExpanded ? (
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
                          <div>
                            <div style={{ fontSize:10, color:'#bbb' }}>Цена доли</div>
                            <div style={{ fontSize:18, fontWeight:800, color:'#1a1a2e' }}>${asset.pricePerShare}</div>
                          </div>
                          <div style={{ color:asset.color, fontSize:16 }}>▼</div>
                        </div>
                      ) : <div style={{ textAlign:'center', color:'#bbb', fontSize:12, marginTop:4 }}>▲ свернуть</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div style={{ marginTop:60, textAlign:'center', borderTop:'1px solid #e8ecf0', paddingTop:24 }}>
          <div style={{ fontSize:13, color:'#bbb' }}>
            Built on <span style={{ color:'#9945FF', fontWeight:600 }}>Solana</span> · Powered by <span style={{ color:'#0066FF', fontWeight:600 }}>Anchor</span> · SolBrick © 2026
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
