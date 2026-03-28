import './App.css';
import React, { useState, useEffect } from 'react';

const PROJECTS = [
  { id: 1, name: "ЖК Алтын Орда", location: "Шымкент", totalShares: 1000, soldShares: 340, pricePerShare: 50, roi: "12.4%", roiNum: 12.4, image: "🏗️", tag: "Жилой", color: "#00C896", desc: "Современный жилой комплекс в центре Шымкента. 24 этажа, 480 квартир.", area: "45,000 м²", completion: "Q4 2026",
    photos: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80"] },
  { id: 2, name: "Бизнес-центр Нур Плаза", location: "Алматы", totalShares: 500, soldShares: 420, pricePerShare: 100, roi: "18.2%", roiNum: 18.2, image: "🏢", tag: "Коммерческий", color: "#FF6B35", desc: "Премиальный бизнес-центр класса A в деловом районе Алматы.", area: "28,000 м²", completion: "Q2 2026",
    photos: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"] },
  { id: 3, name: "Торговый комплекс Сайрам", location: "Шымкент", totalShares: 2000, soldShares: 800, pricePerShare: 25, roi: "9.8%", roiNum: 9.8, image: "🏬", tag: "Торговый", color: "#4A9EFF", desc: "Крупный торгово-развлекательный центр на юге Казахстана.", area: "62,000 м²", completion: "Q1 2027",
    photos: ["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&q=80", "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"] },
  { id: 4, name: "Жилой квартал Астана Парк", location: "Астана", totalShares: 1500, soldShares: 200, pricePerShare: 75, roi: "15.1%", roiNum: 15.1, image: "🏙️", tag: "Жилой", color: "#A78BFA", desc: "Элитный жилой квартал рядом с Байтереком.", area: "80,000 м²", completion: "Q3 2027",
    photos: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80"] },
  { id: 5, name: "Гостиница Silk Road", location: "Туркестан", totalShares: 800, soldShares: 560, pricePerShare: 60, roi: "22.5%", roiNum: 22.5, image: "🏨", tag: "Отель", color: "#F59E0B", desc: "5-звёздочный отель у мавзолея Ходжа Ахмета Яссауи.", area: "18,000 м²", completion: "Q2 2026",
    photos: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80"] },
  { id: 6, name: "Логистический центр KazHub", location: "Алматы", totalShares: 3000, soldShares: 450, pricePerShare: 20, roi: "11.3%", roiNum: 11.3, image: "🏭", tag: "Склад", color: "#EC4899", desc: "Современный логистический хаб у международного аэропорта Алматы.", area: "120,000 м²", completion: "Q4 2026",
    photos: ["https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", "https://images.unsplash.com/photo-1565891741441-64926e3838b0?w=600&q=80"] },
];

const TICKER_ITEMS = [
  { name: "ЖК Алтын Орда", price: "$50.00", change: "+2.4%" },
  { name: "Нур Плаза", price: "$100.00", change: "+5.1%" },
  { name: "Сайрам ТЦ", price: "$25.00", change: "-0.8%" },
  { name: "Астана Парк", price: "$75.00", change: "+8.2%" },
  { name: "Silk Road", price: "$60.00", change: "+12.5%" },
  { name: "KazHub", price: "$20.00", change: "+1.3%" },
  { name: "SOL/USD", price: "$142.50", change: "+3.2%" },
  { name: "BTC/USD", price: "$67,240", change: "+1.8%" },
];

function App() {
  const [assets, setAssets] = useState(PROJECTS);
  const [wallet, setWallet] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [usdBalance, setUsdBalance] = useState<number>(10000);
  const [message, setMessage] = useState('');
  const [activePage, setActivePage] = useState<'home' | 'portfolio' | 'detail' | 'calculator' | 'transactions'>('home');
  
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [photoModal, setPhotoModal] = useState<{project: any, photoIndex: number} | null>(null);

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
    const m = modal;
    setTxPending(true);
    await new Promise(r => setTimeout(r, 2000));
    const cost = m.amount * m.project.pricePerShare;
    setAssets(prev => prev.map(a => a.id === m.project.id ? { ...a, soldShares: a.soldShares + m.amount } : a));
    setPortfolio(prev => ({ ...prev, [m.project.id]: (prev[m.project.id] || 0) + m.amount }));
    setSolBalance(prev => Math.max(0, prev - 0.001));
    setUsdBalance(prev => Math.max(0, prev - cost));
    setTransactions(prev => [{
      id: Date.now(), type: 'buy', project: m.project.name, amount: m.amount, cost,
      date: new Date().toLocaleString('ru-RU'),
      hash: '0x' + Math.random().toString(16).slice(2, 10).toUpperCase(),
    }, ...prev]);
    setTxPending(false);
    setModal(null);
    setMessage(`✅ Куплено ${m.amount} доля в "${m.project.name}"`);
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
    const p = assets.find(a => a.id === parseInt(id));
    return sum + (p ? shares * p.pricePerShare : 0);
  }, 0);

  const calcResult = calcAmount * Math.pow(1 + calcRoi/100, calcYears);
  const calcProfit = calcResult - calcAmount;
  
  

  const onboardingSteps = [
    { icon: '🏗️', title: 'Добро пожаловать в SolBrick', desc: 'Первая платформа фракционного владения недвижимостью Казахстана на Solana' },
    { icon: '💰', title: 'Инвестируй от $25', desc: 'Покупай доли в реальных проектах. Никаких посредников — только смарт-контракт.' },
    { icon: '📈', title: 'Получай доход', desc: 'Средний ROI наших проектов — 13.5% годовых. Прозрачно on-chain.' },
    { icon: '🔗', title: 'Подключи Phantom Wallet', desc: 'Все транзакции записываются в Solana блокчейн.' },
  ];

  if (showOnboarding) {
    return (
      <div style={{ fontFamily:"'Segoe UI', sans-serif", background:'#111418', minHeight:'100vh', color:'white', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ maxWidth:460, width:'100%', padding:24, animation:'fadeIn 0.5s ease' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ width:72, height:72, background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, margin:'0 auto 12px' }}>🏗</div>
            <div style={{ fontSize:22, fontWeight:700, color:'#e8eaed' }}>SolBrick</div>
            <div style={{ fontSize:12, color:'#5f6368', marginTop:4, letterSpacing:1 }}>POWERED BY SOLANA</div>
          </div>
          <div style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:16, padding:32, textAlign:'center', marginBottom:20 }}>
            <div style={{ fontSize:52, marginBottom:16 }}>{onboardingSteps[onboardingStep].icon}</div>
            <h2 style={{ margin:'0 0 10px', fontSize:20, fontWeight:600, color:'#e8eaed' }}>{onboardingSteps[onboardingStep].title}</h2>
            <p style={{ color:'#9aa0a6', fontSize:14, lineHeight:1.7, margin:0 }}>{onboardingSteps[onboardingStep].desc}</p>
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:6, marginBottom:20 }}>
            {onboardingSteps.map((_, i) => (
              <div key={i} style={{ width: i===onboardingStep ? 20 : 6, height:6, background: i===onboardingStep ? '#00C896' : '#2a2f3e', borderRadius:3, transition:'all 0.3s' }} />
            ))}
          </div>
          {onboardingStep < onboardingSteps.length - 1 ? (
            <button onClick={() => setOnboardingStep(s => s+1)}
              style={{ width:'100%', background:'#00C896', color:'#0d1117', border:'none', padding:'14px', borderRadius:10, cursor:'pointer', fontSize:15, fontWeight:700 }}>
              Далее →
            </button>
          ) : (
            <button onClick={() => setShowOnboarding(false)}
              style={{ width:'100%', background:'#00C896', color:'#0d1117', border:'none', padding:'14px', borderRadius:10, cursor:'pointer', fontSize:15, fontWeight:700 }}>
              Начать инвестировать
            </button>
          )}
          <button onClick={() => setShowOnboarding(false)} style={{ width:'100%', background:'transparent', color:'#5f6368', border:'none', padding:'10px', cursor:'pointer', fontSize:13, marginTop:6 }}>Пропустить</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily:"'Segoe UI', sans-serif", background:'#111418', minHeight:'100vh', color:'#e8eaed' }}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
        @keyframes photoIn{from{opacity:0}to{opacity:1}}
        .card{transition:all 0.25s ease;cursor:pointer;}
        .card:hover{transform:translateY(-2px);background:#1e2330 !important;border-color:#3a3f4e !important;}
        .card.expanded{border-color:#00C896 !important;}
        .btn{transition:all 0.15s ease;cursor:pointer;}
        .btn:hover{opacity:0.85;}
        .nav-btn{transition:all 0.15s ease;cursor:pointer;background:transparent;border:none;}
        .thumb{transition:all 0.2s ease;cursor:pointer;opacity:0.7;}
        .thumb:hover{opacity:1;transform:scale(1.05);}
        .thumb.active{opacity:1;border-color:#00C896 !important;}
        input:focus,select:focus{outline:none;}
        input[type=range]{accent-color:#00C896;}
      `}</style>

      {/* Ticker */}
      <div style={{ background:'#0d1117', borderBottom:'1px solid #2a2f3e', height:28, overflow:'hidden', position:'relative', zIndex:200 }}>
        <div style={{ display:'flex', animation:'ticker 40s linear infinite', width:'max-content', height:'100%', alignItems:'center' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:6, padding:'0 20px', whiteSpace:'nowrap', borderRight:'1px solid #1e2330' }}>
              <span style={{ color:'#9aa0a6', fontSize:11, fontWeight:500 }}>{item.name}</span>
              <span style={{ color:'#e8eaed', fontSize:11, fontWeight:600, fontFamily:'monospace' }}>{item.price}</span>
              <span style={{ color: item.change.startsWith('+') ? '#00C896' : '#FF4757', fontSize:10, fontWeight:600 }}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header style={{ background:'#1a1f2e', borderBottom:'1px solid #2a2f3e', padding: isMobile ? '0 12px' : '0 32px', display:'flex', alignItems:'center', justifyContent:'space-between', height: isMobile ? 48 : 56, position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', gap: isMobile ? 8 : 32 }}>
          <div onClick={() => setActivePage('home')} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
            <div style={{ width:32, height:32, background:'#00C896', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🏗</div>
            <span style={{ fontSize:16, fontWeight:700, color:'#e8eaed', letterSpacing:0.5 }}>SolBrick</span>
            <span style={{ background:'#0d1117', color:'#00C896', fontSize:9, padding:'2px 6px', borderRadius:4, border:'1px solid #00C89630', fontWeight:700, letterSpacing:1 }}>DEVNET</span>
          </div>
          <nav style={{ display:'flex', gap:2 }}>
            {[['home','Проекты'],['portfolio','Портфель'],['calculator','Калькулятор'],['transactions','История']].map(([page, label]) => (
              <button key={page} onClick={() => setActivePage(page as any)} className="nav-btn"
                style={{ color: activePage===page ? '#00C896' : '#9aa0a6', padding:'6px 14px', borderRadius:6, fontSize:13, fontWeight: activePage===page ? 600 : 400, borderBottom: activePage===page ? '2px solid #00C896' : '2px solid transparent' }}>
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {wallet && (
            <div style={{ display:'flex', alignItems:'center', gap:12, background:'#0d1117', border:'1px solid #2a2f3e', padding:'6px 12px', borderRadius:8, fontSize:12 }}>
              <span style={{ color:'#9aa0a6' }}>◎ {solBalance.toFixed(3)}</span>
              <span style={{ color:'#2a2f3e' }}>|</span>
              <span style={{ color:'#9aa0a6' }}>${usdBalance.toLocaleString()}</span>
            </div>
          )}
          {wallet ? (
            <div style={{ display:'flex', alignItems:'center', gap:6, background:'#0d2d1e', border:'1px solid #00C89640', padding:'6px 12px', borderRadius:8 }}>
              <div style={{ width:6, height:6, background:'#00C896', borderRadius:'50%', animation:'pulse 2s infinite' }} />
              <span style={{ color:'#00C896', fontSize:12, fontWeight:600 }}>{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
            </div>
          ) : (
            <button onClick={connectWallet} className="btn"
              style={{ background:'#00C896', color:'#0d1117', border:'none', padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:700 }}>
              Подключить кошелёк
            </button>
          )}
        </div>
      </header>

      {/* Photo Gallery Modal */}
      {photoModal && (
        <div style={{ position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.92)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', animation:'photoIn 0.2s ease' }}
          onClick={() => setPhotoModal(null)}>
          <div style={{ position:'relative', maxWidth:800, width:'100%', padding:20 }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div>
                <span style={{ fontSize:24, marginRight:8 }}>{photoModal.project.image}</span>
                <span style={{ fontSize:16, fontWeight:600, color:'#e8eaed' }}>{photoModal.project.name}</span>
                <span style={{ fontSize:12, color:'#9aa0a6', marginLeft:8 }}>📍 {photoModal.project.location}</span>
              </div>
              <button onClick={() => setPhotoModal(null)} style={{ background:'transparent', border:'1px solid #2a2f3e', color:'#9aa0a6', padding:'6px 12px', borderRadius:8, cursor:'pointer', fontSize:13 }}>✕ Закрыть</button>
            </div>

            {/* Main photo */}
            <div style={{ borderRadius:12, overflow:'hidden', marginBottom:12, position:'relative' }}>
              <img
                src={photoModal.project.photos[photoModal.photoIndex]}
                alt={photoModal.project.name}
                style={{ width:'100%', height:420, objectFit:'cover', display:'block' }}
              />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent, rgba(0,0,0,0.7))', padding:'20px 16px 16px' }}>
                <div style={{ display:'flex', gap:8 }}>
                  <span style={{ background:photoModal.project.color+'20', color:photoModal.project.color, fontSize:11, padding:'3px 10px', borderRadius:4, border:`1px solid ${photoModal.project.color}40`, fontWeight:600 }}>{photoModal.project.tag}</span>
                  <span style={{ background:'#0d2d1e', color:'#00C896', fontSize:11, padding:'3px 10px', borderRadius:4, border:'1px solid #00C89630', fontWeight:600 }}>ROI {photoModal.project.roi}</span>
                </div>
              </div>
              {/* Prev/Next */}
              {photoModal.photoIndex > 0 && (
                <button onClick={() => setPhotoModal(p => p ? {...p, photoIndex: p.photoIndex-1} : null)}
                  style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.6)', border:'1px solid #2a2f3e', color:'white', width:36, height:36, borderRadius:'50%', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>‹</button>
              )}
              {photoModal.photoIndex < photoModal.project.photos.length-1 && (
                <button onClick={() => setPhotoModal(p => p ? {...p, photoIndex: p.photoIndex+1} : null)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.6)', border:'1px solid #2a2f3e', color:'white', width:36, height:36, borderRadius:'50%', cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>›</button>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display:'flex', gap:10, justifyContent:'center', marginBottom:16 }}>
              {photoModal.project.photos.map((photo: string, i: number) => (
                <img key={i} src={photo} alt="" className={`thumb ${i===photoModal.photoIndex?'active':''}`}
                  onClick={() => setPhotoModal(p => p ? {...p, photoIndex: i} : null)}
                  style={{ width:80, height:56, objectFit:'cover', borderRadius:6, border:`2px solid ${i===photoModal.photoIndex ? '#00C896' : '#2a2f3e'}` }}
                />
              ))}
            </div>

            {/* Info + Buy */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:16, alignItems:'center' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
                {[['Площадь', photoModal.project.area],['Сдача', photoModal.project.completion],['Цена доли', `$${photoModal.project.pricePerShare}`],['Осталось', `${photoModal.project.totalShares - photoModal.project.soldShares}`]].map(([k,v]) => (
                  <div key={k} style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:8, padding:'8px 12px' }}>
                    <div style={{ fontSize:9, color:'#5f6368', textTransform:'uppercase', letterSpacing:0.5 }}>{k}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#e8eaed', marginTop:2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <button onClick={(e) => { setPhotoModal(null); openModal(photoModal.project, 1, e); }} className="btn"
                style={{ background:'#00C896', color:'#0d1117', border:'none', padding:'12px 24px', borderRadius:8, fontSize:14, fontWeight:700, whiteSpace:'nowrap' }}>
                Купить долю · ${photoModal.project.pricePerShare}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buy Modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={() => !txPending && setModal(null)}>
          <div style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:16, padding:28, width:400, animation:'modalIn 0.25s ease' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, paddingBottom:16, borderBottom:'1px solid #2a2f3e' }}>
              <span style={{ fontSize:32 }}>{modal.project.image}</span>
              <div>
                <div style={{ fontSize:15, fontWeight:600, color:'#e8eaed' }}>Подтвердить покупку</div>
                <div style={{ fontSize:12, color:'#9aa0a6' }}>On-chain транзакция · Solana Devnet</div>
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              {[['Проект', modal.project.name],['Количество', `${modal.amount} доля`],['Цена за долю', `$${modal.project.pricePerShare}`],['Итого', `$${modal.amount * modal.project.pricePerShare}`],['Комиссия', '~0.001 SOL']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #1e2330', fontSize:13 }}>
                  <span style={{ color:'#9aa0a6' }}>{k}</span>
                  <span style={{ color: k==='Итого' ? '#00C896' : '#e8eaed', fontWeight: k==='Итого' ? 700 : 400 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:'#0d2d1e', border:'1px solid #00C89630', borderRadius:8, padding:'8px 12px', marginBottom:16, fontSize:12, color:'#00C896' }}>
              ⚡ Транзакция будет записана в Solana блокчейн
            </div>
            <button onClick={confirmBuy} disabled={txPending} className="btn"
              style={{ width:'100%', background: txPending ? '#2a2f3e' : '#00C896', color: txPending ? '#9aa0a6' : '#0d1117', border:'none', padding:'12px', borderRadius:8, fontSize:14, fontWeight:700, marginBottom:8, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {txPending ? (
                <><div style={{ width:14, height:14, border:'2px solid #9aa0a6', borderTopColor:'#e8eaed', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />Обработка...</>
              ) : `Подтвердить · $${modal.amount * modal.project.pricePerShare}`}
            </button>
            {!txPending && <button onClick={() => setModal(null)} style={{ width:'100%', background:'transparent', color:'#9aa0a6', border:'1px solid #2a2f3e', padding:'10px', borderRadius:8, cursor:'pointer', fontSize:13 }}>Отмена</button>}
          </div>
        </div>
      )}

      <main style={{ maxWidth:1280, margin:'0 auto', padding:'24px 16px' }}>
        {message && (
          <div style={{ marginBottom:16, padding:'10px 20px', background: message.includes('✅') ? '#0d2d1e' : '#2d1515', border:`1px solid ${message.includes('✅') ? '#00C89640' : '#ff475740'}`, borderRadius:8, fontSize:13, color: message.includes('✅') ? '#00C896' : '#FF4757', animation:'fadeInDown 0.3s ease' }}>
            {message}
          </div>
        )}

        {/* CALCULATOR */}
        {activePage==='calculator' && (
          <div style={{ animation:'fadeInUp 0.3s ease' }}>
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontSize:20, fontWeight:600, margin:'0 0 4px', color:'#e8eaed' }}>Калькулятор доходности</h2>
              <p style={{ color:'#9aa0a6', fontSize:13, margin:0 }}>Рассчитайте потенциальный доход</p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <div style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:12, padding:24 }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#9aa0a6', marginBottom:20, textTransform:'uppercase', letterSpacing:0.5 }}>Параметры</div>
                {[
                  { label:'Сумма инвестиции', value:calcAmount, min:25, max:100000, step:25, setter:setCalcAmount, fmt:(v:number)=>`$${v.toLocaleString()}` },
                  { label:'Срок (лет)', value:calcYears, min:1, max:10, step:1, setter:setCalcYears, fmt:(v:number)=>`${v} лет` },
                  { label:'Ожидаемый ROI', value:calcRoi, min:5, max:30, step:0.5, setter:setCalcRoi, fmt:(v:number)=>`${v}%` },
                ].map(p => (
                  <div key={p.label} style={{ marginBottom:20 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:13 }}>
                      <span style={{ color:'#9aa0a6' }}>{p.label}</span>
                      <span style={{ color:'#00C896', fontWeight:600, fontFamily:'monospace' }}>{p.fmt(p.value)}</span>
                    </div>
                    <input type="range" min={p.min} max={p.max} step={p.step} value={p.value}
                      onChange={e => p.setter(Number(e.target.value))} style={{ width:'100%' }} />
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'#5f6368', marginTop:3 }}>
                      <span>{p.fmt(p.min)}</span><span>{p.fmt(p.max)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ background:'#0d2d1e', border:'1px solid #00C89630', borderRadius:12, padding:24, marginBottom:16 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#00C896', marginBottom:16, textTransform:'uppercase', letterSpacing:0.5 }}>Результат</div>
                  <div style={{ fontSize:36, fontWeight:700, color:'#00C896', fontFamily:'monospace', marginBottom:16 }}>${calcResult.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {[['Вложено', `$${calcAmount.toLocaleString()}`],['Прибыль', `+$${calcProfit.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`]].map(([k,v]) => (
                      <div key={k} style={{ background:'#0d1117', borderRadius:8, padding:'10px 14px' }}>
                        <div style={{ fontSize:10, color:'#5f6368', marginBottom:3 }}>{k}</div>
                        <div style={{ fontSize:16, fontWeight:600, color: k==='Прибыль' ? '#00C896' : '#e8eaed', fontFamily:'monospace' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:12, padding:20 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#9aa0a6', marginBottom:14, textTransform:'uppercase', letterSpacing:0.5 }}>Рост по годам</div>
                  {Array.from({length: Math.min(calcYears, 5)}, (_, i) => {
                    const yv = calcAmount * Math.pow(1 + calcRoi/100, i+1);
                    return (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                        <span style={{ fontSize:11, color:'#9aa0a6', width:32 }}>{i+1}г.</span>
                        <div style={{ flex:1, background:'#0d1117', borderRadius:2, height:4 }}>
                          <div style={{ background:'#00C896', borderRadius:2, height:4, width:`${Math.min((yv/calcResult)*100, 100)}%`, transition:'width 0.5s' }} />
                        </div>
                        <span style={{ fontSize:11, color:'#00C896', fontFamily:'monospace', width:80, textAlign:'right' }}>${yv.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS */}
        {activePage==='transactions' && (
          <div style={{ animation:'fadeInUp 0.3s ease' }}>
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontSize:20, fontWeight:600, margin:'0 0 4px', color:'#e8eaed' }}>История транзакций</h2>
              <p style={{ color:'#9aa0a6', fontSize:13, margin:0 }}>Все on-chain операции через Solana</p>
            </div>
            {transactions.length === 0 ? (
              <div style={{ textAlign:'center', padding:48, background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:12 }}>
                <div style={{ fontSize:36, marginBottom:10 }}>📭</div>
                <p style={{ color:'#9aa0a6', fontSize:13 }}>Транзакций пока нет</p>
              </div>
            ) : (
              <div style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:12, overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr 1.5fr', gap:16, padding:'10px 20px', background:'#0d1117', fontSize:10, color:'#5f6368', fontWeight:600, textTransform:'uppercase', letterSpacing:0.5 }}>
                  <span>ПРОЕКТ</span><span>ТИП</span><span>СУММА</span><span>ДАТА</span><span>ХЭШ</span>
                </div>
                {transactions.map((tx, i) => (
                  <div key={tx.id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.5fr 1.5fr', gap:16, padding:'14px 20px', borderTop: i>0 ? '1px solid #1e2330' : 'none', alignItems:'center' }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:500, color:'#e8eaed' }}>{tx.project}</div>
                      <div style={{ fontSize:11, color:'#9aa0a6' }}>{tx.amount} долей</div>
                    </div>
                    <span style={{ background:'#0d2d1e', color:'#00C896', fontSize:11, padding:'3px 8px', borderRadius:4, fontWeight:600, display:'inline-block' }}>BUY</span>
                    <span style={{ fontSize:13, fontWeight:600, color:'#00C896', fontFamily:'monospace' }}>${tx.cost}</span>
                    <span style={{ fontSize:11, color:'#9aa0a6' }}>{tx.date}</span>
                    <span style={{ fontSize:11, color:'#4A9EFF', fontFamily:'monospace' }}>{tx.hash}...</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PORTFOLIO */}
        {activePage==='portfolio' && (
          <div style={{ animation:'fadeInUp 0.3s ease' }}>
            <div style={{ marginBottom:24 }}>
              <h2 style={{ fontSize:20, fontWeight:600, margin:'0 0 4px', color:'#e8eaed' }}>Мой портфель</h2>
              <p style={{ color:'#9aa0a6', fontSize:13, margin:0 }}>Ваши инвестиции на Solana блокчейне</p>
            </div>
            {!wallet ? (
              <div style={{ textAlign:'center', padding:48, background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:12 }}>
                <div style={{ fontSize:36, marginBottom:10 }}>🔗</div>
                <p style={{ color:'#9aa0a6', fontSize:13, marginBottom:16 }}>Подключите кошелёк</p>
                <button onClick={connectWallet} className="btn" style={{ background:'#00C896', color:'#0d1117', border:'none', padding:'10px 20px', borderRadius:8, fontSize:14, fontWeight:700 }}>Подключить Phantom</button>
              </div>
            ) : (
              <>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:12, marginBottom:20 }}>
                  {[
                    {label:'Портфель',value:`$${totalPortfolioValue}`,sub:'инвестировано',color:'#00C896'},
                    {label:'Свободно',value:`$${usdBalance.toLocaleString()}`,sub:'доступно',color:'#4A9EFF'},
                    {label:'SOL баланс',value:`◎ ${solBalance.toFixed(3)}`,sub:'на кошельке',color:'#A78BFA'},
                    {label:'Проектов',value:Object.keys(portfolio).length,sub:'активных',color:'#F59E0B'},
                  ].map((s,i) => (
                    <div key={i} style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:10, padding:'16px 20px' }}>
                      <div style={{ fontSize:10, color:'#5f6368', textTransform:'uppercase', letterSpacing:0.5, marginBottom:6 }}>{s.label}</div>
                      <div style={{ fontSize:22, fontWeight:700, color:s.color, fontFamily:'monospace' }}>{s.value}</div>
                      <div style={{ fontSize:11, color:'#9aa0a6', marginTop:3 }}>{s.sub}</div>
                    </div>
                  ))}
                </div>
                {Object.keys(portfolio).length === 0 ? (
                  <div style={{ textAlign:'center', padding:40, background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:12 }}>
                    <p style={{ color:'#9aa0a6', fontSize:13 }}>Нет активных инвестиций</p>
                    <button onClick={() => setActivePage('home')} className="btn" style={{ background:'#00C896', color:'#0d1117', border:'none', padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:700, marginTop:10 }}>Перейти к проектам</button>
                  </div>
                ) : (
                  <div style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:12, overflow:'hidden' }}>
                    {Object.entries(portfolio).map(([id, shares], i) => {
                      const p = assets.find(a => a.id === parseInt(id))!;
                      return (
                        <div key={id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 20px', borderTop: i>0 ? '1px solid #1e2330' : 'none' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                            <img src={p.photos[0]} alt={p.name} style={{ width:48, height:48, borderRadius:8, objectFit:'cover', border:`1px solid ${p.color}40` }} />
                            <div>
                              <div style={{ fontSize:14, fontWeight:500, color:'#e8eaed' }}>{p.name}</div>
                              <div style={{ fontSize:11, color:'#9aa0a6' }}>📍 {p.location} · {shares} долей</div>
                            </div>
                          </div>
                          <div style={{ textAlign:'right' }}>
                            <div style={{ fontSize:16, fontWeight:700, color:p.color, fontFamily:'monospace' }}>${shares * p.pricePerShare}</div>
                            <div style={{ fontSize:11, color:'#00C896', marginTop:2 }}>ROI {p.roi}</div>
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

        {/* HOME */}
        {activePage==='home' && (
          <>
            <div style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:12, padding:'20px 28px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <div style={{ fontSize:11, color:'#00C896', fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginBottom:6 }}>🚀 Solana Devnet · Anchor Protocol</div>
                <h1 style={{ fontSize:24, fontWeight:700, margin:'0 0 6px', color:'#e8eaed' }}>Инвестируй в недвижимость от $25</h1>
                <p style={{ color:'#9aa0a6', fontSize:13, margin:'0 0 16px' }}>Токенизированные строительные проекты Казахстана</p>
                <button onClick={() => setActivePage('calculator')} className="btn"
                  style={{ background:'transparent', color:'#00C896', border:'1px solid #00C89640', padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:600 }}>
                  Рассчитать доход →
                </button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {[{l:'Проектов',v:counter.projects,c:'#00C896'},{l:'Объём',v:`$${counter.volume}K`,c:'#4A9EFF'},{l:'Инвесторов',v:`${counter.investors.toLocaleString()}+`,c:'#A78BFA'},{l:'Avg ROI',v:`${counter.roi}%`,c:'#F59E0B'}].map((s,i) => (
                  <div key={i} style={{ background:'#0d1117', border:'1px solid #2a2f3e', borderRadius:8, padding:'10px 14px', textAlign:'center' }}>
                    <div style={{ fontSize:18, fontWeight:700, color:s.c, fontFamily:'monospace' }}>{s.v}</div>
                    <div style={{ fontSize:10, color:'#5f6368', textTransform:'uppercase', letterSpacing:0.5, marginTop:2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:'flex', gap:10, marginBottom:14, alignItems:'center', flexWrap:'wrap' }}>
              <div style={{ position:'relative', flex:1, minWidth:200 }}>
                <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#5f6368', fontSize:14 }}>⌕</span>
                <input type="text" placeholder="Поиск проектов..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width:'100%', background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:8, padding:'9px 12px 9px 36px', color:'#e8eaed', fontSize:13, boxSizing:'border-box' }} />
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ background:'#1a1f2e', border:'1px solid #2a2f3e', borderRadius:8, padding:'9px 12px', color:'#9aa0a6', fontSize:12, cursor:'pointer' }}>
                <option value="default" style={{background:'#1a1f2e'}}>Сортировка</option>
                <option value="roi" style={{background:'#1a1f2e'}}>ROI ↓</option>
                <option value="price_asc" style={{background:'#1a1f2e'}}>Цена ↑</option>
                <option value="price_desc" style={{background:'#1a1f2e'}}>Цена ↓</option>
                <option value="sold" style={{background:'#1a1f2e'}}>Продажи ↓</option>
              </select>
              <div style={{ display:'flex', gap:6 }}>
                {tags.map(tag => (
                  <button key={tag} onClick={() => setFilterTag(tag)} className="btn"
                    style={{ background: filterTag===tag ? '#00C896' : '#1a1f2e', color: filterTag===tag ? '#0d1117' : '#9aa0a6', border:`1px solid ${filterTag===tag ? '#00C896' : '#2a2f3e'}`, padding:'7px 12px', borderRadius:6, fontSize:12, fontWeight: filterTag===tag ? 600 : 400 }}>
                    {tag}
                  </button>
                ))}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:6, height:6, background:'#00C896', borderRadius:'50%', animation:'pulse 2s infinite' }} />
                <span style={{ color:'#9aa0a6', fontSize:12 }}>{filteredAssets.length} проектов</span>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:16 }}>
              {filteredAssets.map((asset, idx) => {
                const pct = Math.round((asset.soldShares/asset.totalShares)*100);
                const isHot = pct > 70;
                const isExp = expandedCard === asset.id;
                return (
                  <div key={asset.id} className={`card ${isExp?'expanded':''}`}
                    onClick={() => setExpandedCard(isExp ? null : asset.id)}
                    style={{ background:'#1a1f2e', border:`1px solid ${isExp ? '#00C896' : '#2a2f3e'}`, borderRadius:12, overflow:'hidden', animation: loaded ? `fadeInUp ${0.2+idx*0.06}s ease` : 'none' }}>

                    {/* Photo preview */}
                    <div style={{ position:'relative', height:140, overflow:'hidden' }}>
                      <img src={asset.photos[0]} alt={asset.name}
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.3s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.transform='scale(1.05)')}
                        onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}
                      />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(transparent 40%, rgba(26,31,46,0.95))' }} />
                      <div style={{ position:'absolute', top:10, left:10, display:'flex', gap:6 }}>
                        <span style={{ background:asset.color, color:'#0d1117', fontSize:10, padding:'2px 8px', borderRadius:4, fontWeight:700 }}>{asset.tag}</span>
                        {isHot && <span style={{ background:'#FF4757', color:'white', fontSize:10, padding:'2px 8px', borderRadius:4, fontWeight:700 }}>HOT</span>}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setPhotoModal({project: asset, photoIndex: 0}); }}
                        style={{ position:'absolute', top:10, right:10, background:'rgba(0,0,0,0.6)', border:'1px solid #2a2f3e', color:'white', padding:'4px 8px', borderRadius:6, cursor:'pointer', fontSize:11 }}>
                        📷 Фото
                      </button>
                      <div style={{ position:'absolute', bottom:10, left:10, right:10, display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
                        <div>
                          <div style={{ fontSize:14, fontWeight:700, color:'white', lineHeight:1.2 }}>{asset.name}</div>
                          <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', marginTop:2 }}>📍 {asset.location}</div>
                        </div>
                        <div style={{ textAlign:'right' }}>
                          <div style={{ fontSize:18, fontWeight:700, color:'#00C896', fontFamily:'monospace' }}>{asset.roi}</div>
                          <div style={{ fontSize:9, color:'rgba(255,255,255,0.5)', textTransform:'uppercase' }}>ROI</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding:'12px 14px' }}>
                      <div style={{ marginBottom:10 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#9aa0a6', marginBottom:5 }}>
                          <span>Продано долей</span>
                          <span style={{ color: isHot ? '#FF4757' : '#00C896', fontWeight:600 }}>{pct}%</span>
                        </div>
                        <div style={{ background:'#0d1117', borderRadius:2, height:3 }}>
                          <div style={{ background: isHot ? '#FF4757' : asset.color, borderRadius:2, height:3, width:`${pct}%` }} />
                        </div>
                      </div>

                      <div style={{ overflow:'hidden', maxHeight: isExp ? '400px' : '0', opacity: isExp ? 1 : 0, transition:'all 0.35s ease' }}>
                        {/* Mini photo gallery */}
                        <div style={{ display:'flex', gap:6, marginBottom:10 }}>
                          {asset.photos.map((photo: string, i: number) => (
                            <img key={i} src={photo} alt="" className="thumb"
                              onClick={(e) => { e.stopPropagation(); setPhotoModal({project: asset, photoIndex: i}); }}
                              style={{ flex:1, height:52, objectFit:'cover', borderRadius:6, border:'1px solid #2a2f3e' }}
                            />
                          ))}
                        </div>
                        <p style={{ color:'#9aa0a6', fontSize:12, lineHeight:1.6, marginBottom:10, paddingTop:8, borderTop:'1px solid #1e2330' }}>{asset.desc}</p>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
                          {[['Площадь', asset.area],['Сдача', asset.completion],['Долей', asset.totalShares],['Цена', `$${asset.pricePerShare}`]].map(([k,v]) => (
                            <div key={k} style={{ background:'#0d1117', borderRadius:6, padding:'6px 10px', border:'1px solid #1e2330' }}>
                              <div style={{ fontSize:9, color:'#5f6368', textTransform:'uppercase', letterSpacing:0.5 }}>{k}</div>
                              <div style={{ fontSize:12, fontWeight:600, color:'#e8eaed', marginTop:2 }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                          <button onClick={(e) => {e.stopPropagation(); openModal(asset, 1, e);}} className="btn"
                            style={{ background:asset.color, color:'#0d1117', border:'none', padding:'9px', borderRadius:6, fontSize:12, fontWeight:700 }}>
                            Купить · ${asset.pricePerShare}
                          </button>
                          <button onClick={(e) => {e.stopPropagation(); setPhotoModal({project: asset, photoIndex: 0});}} className="btn"
                            style={{ background:'transparent', color:'#9aa0a6', border:'1px solid #2a2f3e', padding:'9px', borderRadius:6, fontSize:12 }}>
                            📷 Галерея
                          </button>
                        </div>
                      </div>

                      {!isExp ? (
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                          <div>
                            <div style={{ fontSize:9, color:'#5f6368', textTransform:'uppercase', letterSpacing:0.5 }}>Цена доли</div>
                            <div style={{ fontSize:16, fontWeight:700, color:'#e8eaed', fontFamily:'monospace' }}>${asset.pricePerShare}</div>
                          </div>
                          <span style={{ color:asset.color, fontSize:11 }}>▼ развернуть</span>
                        </div>
                      ) : <div style={{ textAlign:'center', color:'#5f6368', fontSize:11, marginTop:6 }}>▲ свернуть</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {isMobile && (
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:200, background:'#1a1f2e', borderTop:'1px solid #2a2f3e', display:'flex', justifyContent:'space-around', padding:'8px 0 20px', backdropFilter:'blur(20px)' }}>
            {[['home','🏠','Проекты'],['portfolio','💼','Портфель'],['calculator','🧮','Калькулятор'],['transactions','📋','История']].map(([page, icon, label]) => (
              <button key={page} onClick={() => setActivePage(page as any)}
                style={{ background:'transparent', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'4px 12px', borderRadius:8, color: activePage===page ? '#00C896' : '#9aa0a6' }}>
                <span style={{ fontSize:22 }}>{icon}</span>
                <span style={{ fontSize:10, fontWeight: activePage===page ? 600 : 400 }}>{label}</span>
              </button>
            ))}
          </div>
        )}

        <div style={{ marginTop:48, paddingTop:20, borderTop:'1px solid #1e2330', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:11, color:'#5f6368' }}>SolBrick © 2026 · National Solana Hackathon by Decentrathon</span>
          <span style={{ fontSize:11, color:'#5f6368' }}>Built on <span style={{ color:'#9945FF' }}>Solana</span> · Anchor 0.32.1</span>
        </div>
      </main>
    </div>
  );
}

export default App;
