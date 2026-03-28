import React, { useState, useEffect, useRef } from 'react';

const PROJECTS = [
  { id: 1, name: "ЖК Алтын Орда", location: "Шымкент", totalShares: 1000, soldShares: 340, pricePerShare: 50, roi: "12.4%", roiNum: 12.4, image: "🏗️", tag: "Жилой", color: "#9945FF", desc: "Современный жилой комплекс в центре Шымкента. 24 этажа, 480 квартир.", area: "45,000 м²", completion: "Q4 2026" },
  { id: 2, name: "Бизнес-центр Нур Плаза", location: "Алматы", totalShares: 500, soldShares: 420, pricePerShare: 100, roi: "18.2%", roiNum: 18.2, image: "🏢", tag: "Коммерческий", color: "#FF6432", desc: "Премиальный бизнес-центр класса A в деловом районе Алматы.", area: "28,000 м²", completion: "Q2 2026" },
  { id: 3, name: "Торговый комплекс Сайрам", location: "Шымкент", totalShares: 2000, soldShares: 800, pricePerShare: 25, roi: "9.8%", roiNum: 9.8, image: "🏬", tag: "Торговый", color: "#14F195", desc: "Крупный торгово-развлекательный центр на юге Казахстана.", area: "62,000 м²", completion: "Q1 2027" },
  { id: 4, name: "Жилой квартал Астана Парк", location: "Астана", totalShares: 1500, soldShares: 200, pricePerShare: 75, roi: "15.1%", roiNum: 15.1, image: "🏙️", tag: "Жилой", color: "#45D4FF", desc: "Элитный жилой квартал рядом с Байтереком. 3 башни по 30 этажей.", area: "80,000 м²", completion: "Q3 2027" },
  { id: 5, name: "Гостиница Silk Road", location: "Туркестан", totalShares: 800, soldShares: 560, pricePerShare: 60, roi: "22.5%", roiNum: 22.5, image: "🏨", tag: "Отель", color: "#FFD700", desc: "5-звёздочный отель у мавзолея Ходжа Ахмета Яссауи.", area: "18,000 м²", completion: "Q2 2026" },
  { id: 6, name: "Логистический центр KazHub", location: "Алматы", totalShares: 3000, soldShares: 450, pricePerShare: 20, roi: "11.3%", roiNum: 11.3, image: "🏭", tag: "Склад", color: "#FF45B5", desc: "Современный логистический хаб у международного аэропорта Алматы.", area: "120,000 м²", completion: "Q4 2026" },
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
  const [message, setMessage] = useState('');
  const [activePage, setActivePage] = useState<'home' | 'portfolio' | 'detail'>('home');
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
    setAssets(prev => prev.map(a => a.id === modal.project.id ? { ...a, soldShares: a.soldShares + modal.amount } : a));
    setPortfolio(prev => ({ ...prev, [modal.project.id]: (prev[modal.project.id] || 0) + modal.amount }));
    setSolBalance(prev => Math.max(0, prev - 0.001));
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

  const chartData = [40, 45, 42, 48, 52, 49, 55, 58, 54, 62, 67, 71];
  const months = ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
  const maxVal = Math.max(...chartData);

  return (
    <div style={{ fontFamily:"'Segoe UI', sans-serif", background:'#050810', minHeight:'100vh', color:'white' }}>
      <style>{`
        @keyframes fadeInDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes modalIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        .card { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); cursor:pointer; }
        .card:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(153,69,255,0.25) !important; border-color:rgba(153,69,255,0.3) !important; }
        .card.expanded { transform:scale(1.01); box-shadow:0 30px 80px rgba(153,69,255,0.3) !important; border-color:rgba(153,69,255,0.4) !important; }
        .btn-hover { transition:all 0.2s ease; }
        .btn-hover:hover { transform:scale(1.05); filter:brightness(1.2); }
        .extra-content { overflow:hidden; transition: all 0.4s ease; }
        input::placeholder { color: #444; }
        input:focus { outline: none; }
        select:focus { outline: none; }
      `}</style>

      {/* Фон */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-20%', left:'-10%', width:700, height:700, background:'radial-gradient(circle, rgba(153,69,255,0.12) 0%, transparent 70%)', borderRadius:'50%', animation:'float 8s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-20%', right:'-10%', width:600, height:600, background:'radial-gradient(circle, rgba(20,241,149,0.08) 0%, transparent 70%)', borderRadius:'50%', animation:'float 10s ease-in-out infinite reverse' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(153,69,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(153,69,255,0.03) 1px, transparent 1px)', backgroundSize:'50px 50px' }} />
      </div>

      {/* Бегущая строка */}
      <div style={{ background:'rgba(153,69,255,0.08)', borderBottom:'1px solid rgba(153,69,255,0.15)', height:32, overflow:'hidden', position:'relative', zIndex:200 }}>
        <div style={{ display:'flex', animation:'ticker 30s linear infinite', width:'max-content' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'0 32px', whiteSpace:'nowrap', height:32 }}>
              <span style={{ color:'#888', fontSize:12 }}>{item.name}</span>
              <span style={{ color:'white', fontSize:12, fontWeight:600 }}>{item.price}</span>
              <span style={{ color: item.change.startsWith('+') ? '#14F195' : '#FF4444', fontSize:11, fontWeight:600 }}>{item.change}</span>
              <span style={{ color:'rgba(255,255,255,0.1)', fontSize:16 }}>|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Шапка */}
      <header style={{ position:'sticky', top:0, zIndex:100, borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', height:70, backdropFilter:'blur(30px)', background:'rgba(5,8,16,0.9)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div onClick={() => setActivePage('home')} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
            <div style={{ width:40, height:40, background:'linear-gradient(135deg, #9945FF, #14F195)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, boxShadow:'0 0 20px rgba(153,69,255,0.5)' }}>🏗</div>
            <span style={{ fontSize:24, fontWeight:800, background:'linear-gradient(90deg, #9945FF, #14F195, #9945FF)', backgroundSize:'200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', animation:'shimmer 3s linear infinite' }}>SolBrick</span>
          </div>
          <span style={{ background:'rgba(153,69,255,0.15)', color:'#9945FF', fontSize:10, padding:'3px 8px', borderRadius:20, border:'1px solid rgba(153,69,255,0.3)', fontWeight:700 }}>DEVNET</span>
        </div>

        <nav style={{ display:'flex', gap:4, background:'rgba(255,255,255,0.03)', padding:4, borderRadius:12, border:'1px solid rgba(255,255,255,0.06)' }}>
          {[['home','🏠 Проекты'],['portfolio','💼 Портфель']].map(([page, label]) => (
            <button key={page} onClick={() => setActivePage(page as any)} style={{ background: activePage === page ? 'linear-gradient(135deg, rgba(153,69,255,0.4), rgba(153,69,255,0.2))' : 'transparent', color: activePage === page ? 'white' : '#666', border:'none', padding:'8px 18px', borderRadius:10, cursor:'pointer', fontSize:13, fontWeight: activePage === page ? 600 : 400, transition:'all 0.2s' }}>
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {wallet && <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', padding:'8px 14px', borderRadius:10, fontSize:13, color:'#888' }}>◎ {solBalance.toFixed(3)} SOL</div>}
          {wallet ? (
            <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(20,241,149,0.08)', border:'1px solid rgba(20,241,149,0.25)', padding:'10px 18px', borderRadius:12 }}>
              <div style={{ width:8, height:8, background:'#14F195', borderRadius:'50%', animation:'pulse 2s infinite' }} />
              <span style={{ color:'#14F195', fontSize:13, fontWeight:500 }}>{wallet.slice(0,6)}...{wallet.slice(-4)}</span>
            </div>
          ) : (
            <button onClick={connectWallet} className="btn-hover" style={{ background:'linear-gradient(135deg, #9945FF, #7733DD)', color:'white', border:'none', padding:'11px 22px', borderRadius:12, cursor:'pointer', fontSize:14, fontWeight:600, boxShadow:'0 4px 20px rgba(153,69,255,0.4)' }}>
              🔗 Подключить кошелёк
            </button>
          )}
        </div>
      </header>

      {/* Модальное окно */}
      {modal && (
        <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={() => !txPending && setModal(null)}>
          <div style={{ background:'#0d1117', border:`1px solid ${modal.project.color}40`, borderRadius:24, padding:32, width:420, animation:'modalIn 0.3s ease' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <div style={{ fontSize:60, marginBottom:8 }}>{modal.project.image}</div>
              <h3 style={{ margin:'0 0 4px', fontSize:20 }}>Подтвердить покупку</h3>
              <p style={{ color:'#555', fontSize:13 }}>On-chain транзакция через Solana</p>
            </div>
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:20, marginBottom:20 }}>
              {[
                ['Проект', modal.project.name],
                ['Количество', `${modal.amount} доля`],
                ['Цена за долю', `$${modal.project.pricePerShare}`],
                ['Итого', `$${modal.amount * modal.project.pricePerShare}`],
                ['Комиссия сети', '~0.001 SOL'],
              ].map(([k, v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:14 }}>
                  <span style={{ color:'#666' }}>{k}</span>
                  <span style={{ fontWeight: k === 'Итого' ? 700 : 400, color: k === 'Итого' ? modal.project.color : 'white', fontSize: k === 'Итого' ? 16 : 14 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:`${modal.project.color}10`, border:`1px solid ${modal.project.color}30`, borderRadius:12, padding:'10px 16px', marginBottom:20, fontSize:12, color:'#888' }}>
              ⚡ Транзакция будет записана в Solana блокчейн навсегда
            </div>
            <button onClick={confirmBuy} disabled={txPending} className="btn-hover"
              style={{ width:'100%', background: txPending ? 'rgba(153,69,255,0.3)' : `linear-gradient(135deg, ${modal.project.color}, ${modal.project.color}99)`, color:'white', border:'none', padding:'14px', borderRadius:12, cursor: txPending ? 'not-allowed' : 'pointer', fontSize:16, fontWeight:700, marginBottom:10, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              {txPending ? (
                <>
                  <div style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
                  Обработка транзакции...
                </>
              ) : `✅ Подтвердить · $${modal.amount * modal.project.pricePerShare}`}
            </button>
            {!txPending && (
              <button onClick={() => setModal(null)} style={{ width:'100%', background:'transparent', color:'#555', border:'1px solid rgba(255,255,255,0.06)', padding:'12px', borderRadius:12, cursor:'pointer', fontSize:14 }}>
                Отмена
              </button>
            )}
          </div>
        </div>
      )}

      <main style={{ position:'relative', zIndex:10, maxWidth:1200, margin:'0 auto', padding:'40px 20px' }}>
        {message && (
          <div style={{ marginBottom:24, padding:'14px 24px', background: message.includes('✅')||message.includes('🎉') ? 'rgba(20,241,149,0.1)' : 'rgba(255,80,80,0.1)', border:`1px solid ${message.includes('✅')||message.includes('🎉') ? 'rgba(20,241,149,0.3)' : 'rgba(255,80,80,0.3)'}`, borderRadius:12, textAlign:'center', animation:'fadeInDown 0.3s ease', fontSize:15 }}>
            {message}
          </div>
        )}

        {/* ДЕТАЛИ */}
        {activePage === 'detail' && selectedProject && (
          <div style={{ animation:'fadeInUp 0.5s ease' }}>
            <button onClick={() => setActivePage('home')} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#888', padding:'8px 16px', borderRadius:10, cursor:'pointer', marginBottom:24, fontSize:13 }}>← Назад</button>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
              <div>
                <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20, overflow:'hidden', marginBottom:20 }}>
                  <div style={{ background:`linear-gradient(135deg, ${selectedProject.color}20, rgba(20,241,149,0.05))`, padding:40, textAlign:'center' }}>
                    <div style={{ fontSize:100 }}>{selectedProject.image}</div>
                  </div>
                  <div style={{ padding:24 }}>
                    <span style={{ background:`${selectedProject.color}20`, color:selectedProject.color, fontSize:12, padding:'4px 12px', borderRadius:20, border:`1px solid ${selectedProject.color}40` }}>{selectedProject.tag}</span>
                    <h2 style={{ margin:'12px 0 8px', fontSize:24 }}>{selectedProject.name}</h2>
                    <p style={{ color:'#666', margin:'0 0 16px' }}>📍 {selectedProject.location}</p>
                    <p style={{ color:'#aaa', lineHeight:1.6, margin:'0 0 20px' }}>{selectedProject.desc}</p>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                      {[['Площадь', selectedProject.area],['Сдача', selectedProject.completion],['Цена доли', `$${selectedProject.pricePerShare}`],['ROI', selectedProject.roi]].map(([k,v]) => (
                        <div key={k} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, padding:'12px 16px' }}>
                          <div style={{ fontSize:11, color:'#555', marginBottom:4 }}>{k}</div>
                          <div style={{ fontSize:16, fontWeight:700, color: k==='ROI' ? '#14F195' : 'white' }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20, padding:24, marginBottom:20 }}>
                  <h3 style={{ margin:'0 0 20px', fontSize:16 }}>📈 График доходности</h3>
                  <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:120 }}>
                    {chartData.map((val, i) => (
                      <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                        <div style={{ width:'100%', background:`linear-gradient(180deg, ${selectedProject.color}, ${selectedProject.color}60)`, borderRadius:'4px 4px 0 0', height:`${(val/maxVal)*100}px` }} />
                        <span style={{ fontSize:9, color:'#444' }}>{months[i]}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginTop:12, fontSize:12, color:'#666' }}>
                    <span>Нач: $40K</span>
                    <span style={{ color:'#14F195' }}>+77.5% за год</span>
                    <span>Тек: $71K</span>
                  </div>
                </div>
                <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20, padding:24 }}>
                  <h3 style={{ margin:'0 0 16px', fontSize:16 }}>💰 Инвестировать</h3>
                  {[1, 5, 10].map(amount => (
                    <button key={amount} onClick={() => openModal(selectedProject, amount)} className="btn-hover"
                      style={{ width:'100%', background:`linear-gradient(135deg, ${selectedProject.color}, ${selectedProject.color}99)`, color:'white', border:'none', padding:'13px', borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:700, marginBottom:8 }}>
                      Купить {amount} {amount===1?'долю':'долей'} → ${amount * selectedProject.pricePerShare}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ПОРТФЕЛЬ */}
        {activePage === 'portfolio' && (
          <div style={{ animation:'fadeInUp 0.5s ease' }}>
            <h2 style={{ fontSize:28, fontWeight:800, marginBottom:8 }}>💼 Мой портфель</h2>
            <p style={{ color:'#555', marginBottom:32 }}>Ваши инвестиции на Solana блокчейне</p>
            {!wallet ? (
              <div style={{ textAlign:'center', padding:60, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20 }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🔗</div>
                <p style={{ color:'#666', marginBottom:20 }}>Подключите кошелёк чтобы увидеть портфель</p>
                <button onClick={connectWallet} className="btn-hover" style={{ background:'linear-gradient(135deg, #9945FF, #7733DD)', color:'white', border:'none', padding:'12px 24px', borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:600 }}>Подключить Phantom Wallet</button>
              </div>
            ) : Object.keys(portfolio).length === 0 ? (
              <div style={{ textAlign:'center', padding:60, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20 }}>
                <div style={{ fontSize:48, marginBottom:16 }}>📭</div>
                <p style={{ color:'#666', marginBottom:20 }}>У вас пока нет инвестиций</p>
                <button onClick={() => setActivePage('home')} className="btn-hover" style={{ background:'linear-gradient(135deg, #9945FF, #7733DD)', color:'white', border:'none', padding:'12px 24px', borderRadius:12, cursor:'pointer', fontSize:15, fontWeight:600 }}>Посмотреть проекты</button>
              </div>
            ) : (
              <>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:32 }}>
                  {[{label:'Всего вложено',value:`$${totalPortfolioValue}`,color:'#9945FF'},{label:'Проектов',value:Object.keys(portfolio).length,color:'#14F195'},{label:'Баланс SOL',value:`◎ ${solBalance.toFixed(3)}`,color:'#FF9945'}].map((s,i) => (
                    <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'20px 24px' }}>
                      <div style={{ fontSize:28, fontWeight:800, color:s.color }}>{s.value}</div>
                      <div style={{ fontSize:13, color:'#555', marginTop:4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:'grid', gap:16 }}>
                  {Object.entries(portfolio).map(([id, shares]) => {
                    const p = assets.find(a => a.id === parseInt(id))!;
                    return (
                      <div key={id} style={{ background:'rgba(255,255,255,0.02)', border:`1px solid ${p.color}30`, borderRadius:16, padding:24, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                          <div style={{ fontSize:40 }}>{p.image}</div>
                          <div>
                            <div style={{ fontWeight:700, fontSize:16 }}>{p.name}</div>
                            <div style={{ color:'#555', fontSize:13 }}>📍 {p.location} · {shares} долей</div>
                          </div>
                        </div>
                        <div style={{ textAlign:'right' }}>
                          <div style={{ fontSize:22, fontWeight:800, color:p.color }}>${shares * p.pricePerShare}</div>
                          <div style={{ color:'#14F195', fontSize:12, marginTop:4 }}>ROI {p.roi}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ГЛАВНАЯ */}
        {activePage === 'home' && (
          <>
            <div style={{ textAlign:'center', marginBottom:50, animation: loaded ? 'fadeInUp 0.8s ease' : 'none' }}>
              <div style={{ display:'inline-block', background:'rgba(153,69,255,0.1)', border:'1px solid rgba(153,69,255,0.3)', padding:'6px 16px', borderRadius:20, fontSize:13, color:'#9945FF', marginBottom:16 }}>🚀 Работает на Solana Devnet</div>
              <h1 style={{ fontSize:52, fontWeight:800, margin:'0 0 16px', lineHeight:1.2 }}>
                Инвестируй в{' '}
                <span style={{ background:'linear-gradient(135deg, #9945FF, #14F195)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>недвижимость</span>
                <br />от $25
              </h1>
              <p style={{ color:'#666', fontSize:18, maxWidth:500, margin:'0 auto' }}>Токенизированные строительные проекты Казахстана на блокчейне Solana</p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:40 }}>
              {[{label:'Проектов',value:counter.projects,suffix:'',color:'#9945FF'},{label:'Общий объём',value:`$${counter.volume}K`,suffix:'',color:'#14F195'},{label:'Инвесторов',value:counter.investors.toLocaleString(),suffix:'+',color:'#FF9945'},{label:'Avg. ROI',value:counter.roi,suffix:'%',color:'#45D4FF'}].map((s,i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:16, padding:'24px 28px' }}>
                  <div style={{ fontSize:32, fontWeight:800, color:s.color }}>{s.value}{s.suffix}</div>
                  <div style={{ fontSize:13, color:'#555', marginTop:6 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Поиск и сортировка */}
            <div style={{ display:'flex', gap:12, marginBottom:20, alignItems:'center' }}>
              <div style={{ flex:1, position:'relative' }}>
                <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, color:'#444' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Поиск по названию или городу..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width:'100%', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'12px 16px 12px 44px', color:'white', fontSize:14, boxSizing:'border-box' }}
                />
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, padding:'12px 16px', color:'white', fontSize:13, cursor:'pointer' }}>
                <option value="default" style={{ background:'#0d1117' }}>По умолчанию</option>
                <option value="roi" style={{ background:'#0d1117' }}>По ROI ↓</option>
                <option value="price_asc" style={{ background:'#0d1117' }}>Цена ↑</option>
                <option value="price_desc" style={{ background:'#0d1117' }}>Цена ↓</option>
                <option value="sold" style={{ background:'#0d1117' }}>По продажам ↓</option>
              </select>
            </div>

            {/* Фильтры */}
            <div style={{ display:'flex', gap:8, marginBottom:28, flexWrap:'wrap', alignItems:'center' }}>
              {tags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(tag)}
                  style={{ background: filterTag === tag ? 'linear-gradient(135deg, #9945FF, #7733DD)' : 'rgba(255,255,255,0.03)', color: filterTag === tag ? 'white' : '#666', border: filterTag === tag ? 'none' : '1px solid rgba(255,255,255,0.06)', padding:'7px 16px', borderRadius:20, fontSize:12, fontWeight: filterTag === tag ? 600 : 400, cursor:'pointer', transition:'all 0.2s', boxShadow: filterTag === tag ? '0 4px 15px rgba(153,69,255,0.3)' : 'none' }}>
                  {tag}
                </button>
              ))}
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:8, height:8, background:'#14F195', borderRadius:'50%', animation:'pulse 2s infinite' }} />
                <span style={{ color:'#14F195', fontSize:13 }}>Live · {filteredAssets.length} проектов</span>
              </div>
            </div>

            {/* Нет результатов */}
            {filteredAssets.length === 0 && (
              <div style={{ textAlign:'center', padding:60, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:20 }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
                <p style={{ color:'#666' }}>Ничего не найдено по запросу "{searchQuery}"</p>
                <button onClick={() => { setSearchQuery(''); setFilterTag('Все'); }} style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#888', padding:'8px 16px', borderRadius:10, cursor:'pointer', marginTop:12, fontSize:13 }}>Сбросить фильтры</button>
              </div>
            )}

            {/* Карточки */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
              {filteredAssets.map((asset, idx) => {
                const percent = Math.round((asset.soldShares / asset.totalShares) * 100);
                const isHot = percent > 70;
                const isExpanded = expandedCard === asset.id;
                return (
                  <div key={asset.id} className={`card ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => setExpandedCard(isExpanded ? null : asset.id)}
                    style={{ background:'rgba(255,255,255,0.02)', border:`1px solid ${isExpanded ? asset.color+'50' : 'rgba(255,255,255,0.06)'}`, borderRadius:20, overflow:'hidden', animation: loaded ? `fadeInUp ${0.3+idx*0.08}s ease` : 'none' }}>
                    <div style={{ background:`linear-gradient(135deg, ${asset.color}15, rgba(20,241,149,0.03))`, padding:'20px 20px 16px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                        <div style={{ fontSize:44 }}>{asset.image}</div>
                        <div style={{ textAlign:'right', background:'rgba(20,241,149,0.08)', border:'1px solid rgba(20,241,149,0.15)', padding:'8px 12px', borderRadius:10 }}>
                          <div style={{ fontSize:20, fontWeight:800, color:'#14F195' }}>{asset.roi}</div>
                          <div style={{ fontSize:10, color:'#555' }}>ROI</div>
                        </div>
                      </div>
                      <div style={{ marginTop:10, display:'flex', gap:6, flexWrap:'wrap' }}>
                        <span style={{ background:`${asset.color}20`, color:asset.color, fontSize:10, padding:'2px 8px', borderRadius:20, border:`1px solid ${asset.color}40`, fontWeight:600 }}>{asset.tag}</span>
                        {isHot && <span style={{ background:'rgba(255,100,50,0.15)', color:'#FF6432', fontSize:10, padding:'2px 8px', borderRadius:20, border:'1px solid rgba(255,100,50,0.3)', fontWeight:600 }}>🔥 Горячий</span>}
                      </div>
                    </div>
                    <div style={{ padding:'16px 20px' }}>
                      <h3 style={{ margin:'0 0 4px', fontSize:16, fontWeight:700 }}>{asset.name}</h3>
                      <p style={{ margin:'0 0 12px', color:'#555', fontSize:12 }}>📍 {asset.location}</p>
                      <div style={{ marginBottom:12 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:12 }}>
                          <span style={{ color:'#777' }}>Продано</span>
                          <span style={{ color: isHot ? '#FF6432' : '#14F195', fontWeight:700 }}>{percent}%</span>
                        </div>
                        <div style={{ background:'rgba(255,255,255,0.06)', borderRadius:6, height:6 }}>
                          <div style={{ background: isHot ? 'linear-gradient(90deg, #FF6432, #FF9945)' : `linear-gradient(90deg, ${asset.color}, #14F195)`, borderRadius:6, height:6, width:`${percent}%` }} />
                        </div>
                      </div>

                      <div className="extra-content" style={{ maxHeight: isExpanded ? '400px' : '0', opacity: isExpanded ? 1 : 0 }}>
                        <p style={{ color:'#888', fontSize:12, lineHeight:1.6, marginBottom:12, paddingTop:8, borderTop:'1px solid rgba(255,255,255,0.05)' }}>{asset.desc}</p>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
                          {[['Площадь', asset.area],['Сдача', asset.completion],['Долей', asset.totalShares],['Цена', `$${asset.pricePerShare}`]].map(([k,v]) => (
                            <div key={k} style={{ background:'rgba(255,255,255,0.03)', borderRadius:8, padding:'8px 10px' }}>
                              <div style={{ fontSize:10, color:'#555' }}>{k}</div>
                              <div style={{ fontSize:13, fontWeight:600 }}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
                          <button onClick={(e) => { e.stopPropagation(); openModal(asset, 1, e); }} className="btn-hover"
                            style={{ background:`linear-gradient(135deg, ${asset.color}, ${asset.color}99)`, color:'white', border:'none', padding:'10px', borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:700 }}>
                            💰 Купить · ${asset.pricePerShare}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedProject(asset); setActivePage('detail'); }} className="btn-hover"
                            style={{ background:'rgba(255,255,255,0.05)', color:'white', border:'1px solid rgba(255,255,255,0.1)', padding:'10px', borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:600 }}>
                            Детали →
                          </button>
                        </div>
                      </div>

                      {!isExpanded && (
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
                          <div>
                            <div style={{ fontSize:10, color:'#555' }}>Цена доли</div>
                            <div style={{ fontSize:18, fontWeight:800 }}>${asset.pricePerShare}</div>
                          </div>
                          <div style={{ color:asset.color, fontSize:18 }}>▼</div>
                        </div>
                      )}
                      {isExpanded && <div style={{ textAlign:'center', color:'#555', fontSize:12, marginTop:4 }}>▲ свернуть</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div style={{ marginTop:80, textAlign:'center', borderTop:'1px solid rgba(255,255,255,0.04)', paddingTop:30 }}>
          <div style={{ fontSize:13, color:'#333' }}>Built on <span style={{ color:'#9945FF', fontWeight:600 }}>Solana</span> · Powered by <span style={{ color:'#14F195', fontWeight:600 }}>Anchor</span> · SolBrick © 2026</div>
        </div>
      </main>
    </div>
  );
}

export default App;
