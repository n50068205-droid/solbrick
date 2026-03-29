import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const PROJECTS = [
  { id: 1, name: "ЖК Алтын Орда", location: "Шымкент", totalShares: 1000, soldShares: 340, pricePerShare: 50, roi: "12.4%", roiNum: 12.4, image: "🏗️", tag: "Жилой", color: "#00C896", desc: "Современный жилой комплекс в центре Шымкента. 24 этажа, 480 квартир.", area: "45,000 м²", completion: "Q4 2026", photos: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80"] },
  { id: 2, name: "Бизнес-центр Нур Плаза", location: "Алматы", totalShares: 500, soldShares: 420, pricePerShare: 100, roi: "18.2%", roiNum: 18.2, image: "🏢", tag: "Коммерческий", color: "#FF6B35", desc: "Премиальный бизнес-центр класса A в деловом районе Алматы.", area: "28,000 м²", completion: "Q2 2026", photos: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"] },
  { id: 3, name: "Торговый комплекс Сайрам", location: "Шымкент", totalShares: 2000, soldShares: 800, pricePerShare: 25, roi: "9.8%", roiNum: 9.8, image: "🏬", tag: "Торговый", color: "#4A9EFF", desc: "Крупный торгово-развлекательный центр на юге Казахстана.", area: "62,000 м²", completion: "Q1 2027", photos: ["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&q=80", "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"] },
  { id: 4, name: "Жилой квартал Астана Парк", location: "Астана", totalShares: 1500, soldShares: 200, pricePerShare: 75, roi: "15.1%", roiNum: 15.1, image: "🏙️", tag: "Жилой", color: "#A78BFA", desc: "Элитный жилой квартал рядом с Байтереком.", area: "80,000 м²", completion: "Q3 2027", photos: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80"] },
  { id: 5, name: "Гостиница Silk Road", location: "Туркестан", totalShares: 800, soldShares: 560, pricePerShare: 60, roi: "22.5%", roiNum: 22.5, image: "🏨", tag: "Отель", color: "#F59E0B", desc: "5-звёздочный отель у мавзолея Ходжа Ахмета Яссауи.", area: "18,000 м²", completion: "Q2 2026", photos: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80"] },
  { id: 6, name: "Логистический центр KazHub", location: "Алматы", totalShares: 3000, soldShares: 450, pricePerShare: 20, roi: "11.3%", roiNum: 11.3, image: "🏭", tag: "Склад", color: "#EC4899", desc: "Современный логистический хаб у международного аэропорта Алматы.", area: "120,000 м²", completion: "Q4 2026", photos: ["https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", "https://images.unsplash.com/photo-1565891741441-64926e3838b0?w=600&q=80"] },
  { id: 7, name: "Апарт-отель Caspian View", location: "Актау", totalShares: 600, soldShares: 180, pricePerShare: 80, roi: "16.7%", roiNum: 16.7, image: "🌊", tag: "Отель", color: "#06B6D4", desc: "Апарт-отель с видом на Каспийское море. Премиальные апартаменты.", area: "12,000 м²", completion: "Q1 2027", photos: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"] },
  { id: 8, name: "ЖК Семей Хайтс", location: "Семей", totalShares: 1200, soldShares: 90, pricePerShare: 35, roi: "10.5%", roiNum: 10.5, image: "🏠", tag: "Жилой", color: "#84CC16", desc: "Современный жилой комплекс на берегу Иртыша. 16 этажей.", area: "38,000 м²", completion: "Q2 2027", photos: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"] },
  { id: 9, name: "Медицинский центр MedCity", location: "Астана", totalShares: 900, soldShares: 630, pricePerShare: 90, roi: "20.1%", roiNum: 20.1, image: "🏥", tag: "Коммерческий", color: "#F43F5E", desc: "Многопрофильный медицинский центр европейского уровня.", area: "22,000 м²", completion: "Q3 2026", photos: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80", "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80"] },
];

const TICKER = [
  { name: "ЖК Алтын Орда", price: "$50.00", change: "+2.4%" },
  { name: "Нур Плаза", price: "$100.00", change: "+5.1%" },
  { name: "Сайрам ТЦ", price: "$25.00", change: "-0.8%" },
  { name: "Астана Парк", price: "$75.00", change: "+8.2%" },
  { name: "Silk Road", price: "$60.00", change: "+12.5%" },
  { name: "KazHub", price: "$20.00", change: "+1.3%" },
  { name: "SOL/USD", price: "$142.50", change: "+3.2%" },
  { name: "Caspian View", price: "$80.00", change: "+6.1%" },
  { name: "MedCity", price: "$90.00", change: "+9.3%" },
];

const CHAT_RESPONSES: {[key: string]: string} = {
  "привет": "Привет! 👋 Я SolBrick AI Assistant. Могу помочь с инвестициями, объяснить как работает блокчейн, рассчитать доход и многое другое!",
  "hello": "Hello! 👋 I am SolBrick AI Assistant. How can I help you today?",
  "как купить": "Для покупки доли:\n1️⃣ Подключите Phantom Wallet\n2️⃣ Выберите проект на главной\n3️⃣ Нажмите \"Купить долю\"\n4️⃣ Подтвердите транзакцию\n✅ Готово! Доля записана в Solana блокчейн",
  "roi": "📈 ROI (Return on Investment) — доходность инвестиции в % годовых.\n\nНаши проекты:\n• ЖК Алтын Орда — 12.4%\n• Нур Плаза — 18.2%\n• Silk Road — 22.5%\n• MedCity — 20.1%\n\nСредний ROI по платформе — 14.8% годовых",
  "solana": "⚡ Solana — один из самых быстрых блокчейнов:\n• 65,000 транзакций в секунду\n• Комиссия ~0.001 SOL (~$0.15)\n• Финальность за ~400мс\n• Экологичный (PoH консенсус)\n\nSolBrick использует Anchor Framework для смарт-контрактов",
  "phantom": "👻 Phantom Wallet — лучший кошелёк для Solana:\n1. Скачайте на phantom.app\n2. Создайте новый кошелёк\n3. Сохраните seed phrase (12 слов)\n4. Подключитесь к SolBrick\n\n⚠️ Никогда не делитесь seed phrase!",
  "минимум": "💰 Минимальные инвестиции по проектам:\n• KazHub — от $20\n• Сайрам ТЦ — от $25\n• Алтын Орда — от $50\n• Астана Парк — от $75\n• Silk Road — от $60\n\nНачать можно с любой суммы!",
  "безопасно": "🔒 Безопасность SolBrick:\n• Смарт-контракт прошёл аудит\n• Код открытый (open source)\n• Доли записаны в блокчейн\n• Нет custody риска\n• Транзакции необратимы\n\nВаши активы принадлежат только вам!",
  "дивиденды": "💵 Распределение дохода:\n• Аренда → делится пропорционально долям\n• Продажа объекта → автоматически через смарт-контракт\n• Выплаты происходят on-chain\n• Никаких посредников!",
  "что такое токен": "🪙 Токен в SolBrick — это цифровое подтверждение права собственности на долю в объекте.\n\nКаждый токен = 1 доля = право на пропорциональный доход и участие в управлении объектом.",
  "казахстан": "🇰🇿 SolBrick фокусируется на недвижимости Казахстана:\n\nГорода:\n📍 Алматы — деловой центр\n📍 Астана — столица\n📍 Шымкент — южный хаб\n📍 Туркестан — туристический\n📍 Актау — Каспийское море\n📍 Семей — Восточный Казахстан",
  "сколько стоит": "💲 Цены долей варьируются:\n• От $20 (KazHub)\n• До $100 (Нур Плаза)\n\nЦена зависит от класса объекта, локации и ожидаемого ROI. Чем выше ROI — тем дороже доля.",
  "риски": "⚠️ Риски инвестиций:\n• Рынок недвижимости может падать\n• Строительные риски (задержки)\n• Волатильность SOL\n\n✅ Как мы снижаем риски:\n• Диверсификация по городам\n• Страхование объектов\n• Escrow через смарт-контракт",
  "проекты": "🏗 Сейчас доступно 9 проектов:\n\n🏗 ЖК Алтын Орда — Шымкент\n🏢 Нур Плаза — Алматы\n🏬 Сайрам ТЦ — Шымкент\n🏙 Астана Парк — Астана\n🏨 Silk Road — Туркестан\n🏭 KazHub — Алматы\n🌊 Caspian View — Актау\n🏠 Семей Хайтс — Семей\n🏥 MedCity — Астана",
  "горячий": "🔥 Горячие проекты — те у которых продано более 70% долей.\n\nЭто означает высокий спрос! Поторопитесь — долей остаётся мало.\n\nСейчас горячие: Нур Плаза (84%) и Silk Road (70%)",
  "команда": "👥 Команда SolBrick:\n\n👨‍💻 Разработчик: Nureke\n🏗 Технологии: Solana + Anchor\n🎯 Хакатон: National Solana Hackathon by Decentrathon 2026\n\nМы верим что блокчейн сделает недвижимость доступной для всех!",
  "помощь": "🆘 Чем я могу помочь:\n\n• Объяснить как работает платформа\n• Рассказать о конкретном проекте\n• Помочь с подключением кошелька\n• Рассказать о рисках\n• Рассчитать доходность\n\nПросто напишите свой вопрос! 😊",
};

type Page = 'home' | 'portfolio' | 'calculator' | 'transactions';

interface ChatMsg {
  id: number;
  text: string;
  from: 'user' | 'bot';
  time: string;
}

function App() {
  const [assets, setAssets] = useState(PROJECTS);
  const [wallet, setWallet] = useState<string | null>(null);
  const [solBalance, setSolBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(10000);
  const [message, setMessage] = useState('');
  const [activePage, setActivePage] = useState<Page>('home');
  const [portfolio, setPortfolio] = useState<{[key: number]: number}>({});
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState({ projects: 0, volume: 0, investors: 0, roi: 0 });
  const [filterTag, setFilterTag] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState<{project: any, amount: number} | null>(null);
  const [txPending, setTxPending] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [calcAmount, setCalcAmount] = useState(1000);
  const [calcYears, setCalcYears] = useState(3);
  const [calcRoi, setCalcRoi] = useState(12);
  const [photoModal, setPhotoModal] = useState<{project: any, idx: number} | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardStep, setOnboardStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { id: 1, text: 'Привет! 👋 Я SolBrick Assistant. Спросите меня о проектах, инвестициях или как подключить кошелёк!', from: 'bot', time: new Date().toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'}) }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatTyping, setChatTyping] = useState(false);
  const [unreadChat, setUnreadChat] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / 60;
      setCounter({ projects: Math.round(9*p), volume: Math.round(284*p), investors: Math.round(4120*p), roi: Math.round(148*p)/10 });
      if (step >= 60) clearInterval(timer);
    }, 2000/60);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (chatOpen) setUnreadChat(0);
  }, [chatOpen]);

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana?.isPhantom) {
        const r = await solana.connect();
        setWallet(r.publicKey.toString());
        setSolBalance(2.45);
        showMsg('✅ Кошелёк подключён!');
      } else {
        showMsg('❌ Установите Phantom Wallet!');
      }
    } catch { showMsg('❌ Ошибка подключения'); }
  };

  const showMsg = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 4000); };

  const openModal = (project: any, amount: number, e?: any) => {
    if (e) e.stopPropagation();
    if (!wallet) { showMsg('❌ Сначала подключите кошелёк!'); return; }
    setModal({ project, amount });
  };

  const confirmBuy = async () => {
    if (!modal) return;
    const m = modal;
    setTxPending(true);
    await new Promise(r => setTimeout(r, 2000));
    const cost = m.amount * m.project.pricePerShare;
    setAssets(prev => prev.map(a => a.id === m.project.id ? {...a, soldShares: a.soldShares + m.amount} : a));
    setPortfolio(prev => ({...prev, [m.project.id]: (prev[m.project.id]||0) + m.amount}));
    setSolBalance(prev => Math.max(0, prev - 0.001));
    setUsdBalance(prev => Math.max(0, prev - cost));
    setTransactions(prev => [{id: Date.now(), project: m.project.name, amount: m.amount, cost, date: new Date().toLocaleString('ru-RU'), hash: '0x'+Math.random().toString(16).slice(2,10).toUpperCase()}, ...prev]);
    setTxPending(false);
    setModal(null);
    showMsg(`✅ Куплено ${m.amount} доля в "${m.project.name}"`);
  };

const sendChat = async () => {
  if (!chatInput.trim()) return;
  const userMsg: ChatMsg = { 
    id: Date.now(), 
    text: chatInput, 
    from: 'user', 
    time: new Date().toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'}) 
  };
  setChatMessages(prev => [...prev, userMsg]);
  const currentInput = chatInput;
  setChatInput('');
  setChatTyping(true);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `Ты AI ассистент платформы SolBrick — токенизация недвижимости Казахстана на Solana. 
        Отвечай кратко, по делу, используй эмодзи. Отвечай на языке пользователя.
        
        Проекты: ЖК Алтын Орда (Шымкент, $50, ROI 12.4%), Нур Плаза (Алматы, $100, ROI 18.2%), 
        Сайрам ТЦ (Шымкент, $25, ROI 9.8%), Астана Парк (Астана, $75, ROI 15.1%),
        Silk Road (Туркестан, $60, ROI 22.5%), KazHub (Алматы, $20, ROI 11.3%),
        Caspian View (Актау, $80, ROI 16.7%), Семей Хайтс (Семей, $35, ROI 10.5%),
        MedCity (Астана, $90, ROI 20.1%).
        
        Технологии: Solana + Anchor Framework. Минимум $20. Phantom Wallet.`,
        messages: [
          ...chatMessages.filter(m => m.id > 1).slice(-6).map(m => ({
            role: m.from === 'user' ? 'user' : 'assistant',
            content: m.text
          })),
          { role: 'user', content: currentInput }
        ]
      })
    });
    
    const data = await response.json();
    const botText = data.content?.[0]?.text || 'Извините, произошла ошибка. Попробуйте позже.';
    
    setChatTyping(false);
    setChatMessages(prev => [...prev, { 
      id: Date.now()+1, 
      text: botText, 
      from: 'bot', 
      time: new Date().toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'}) 
    }]);
  } catch {
    setChatTyping(false);
    setChatMessages(prev => [...prev, { 
      id: Date.now()+1, 
      text: 'Извините, ошибка соединения. Попробуйте позже или напишите на support@solbrick.kz', 
      from: 'bot', 
      time: new Date().toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'}) 
    }]);
  }
  
  if (!chatOpen) setUnreadChat(n => n + 1);
};

  const tags = ['Все','Жилой','Коммерческий','Торговый','Отель','Склад'];
  const filtered = assets.filter(a => filterTag==='Все' || a.tag===filterTag).filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.location.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPortfolio = Object.entries(portfolio).reduce((sum,[id,shares]) => { const p = assets.find(a=>a.id===parseInt(id)); return sum+(p?shares*p.pricePerShare:0); }, 0);
  const calcResult = calcAmount * Math.pow(1+calcRoi/100, calcYears);

  const onboardSteps = [
    {icon:'🏗️', title:'Добро пожаловать в SolBrick', desc:'Первая платформа токенизации недвижимости Казахстана на Solana'},
    {icon:'💰', title:'Инвестируй от $20', desc:'Покупай доли в реальных проектах через смарт-контракт'},
    {icon:'📈', title:'Получай доход', desc:'Средний ROI 14.8% годовых. Прозрачно on-chain.'},
    {icon:'🔗', title:'Подключи Phantom Wallet', desc:'Все транзакции записываются в Solana блокчейн'},
  ];

  const S = {
    bg: '#111418', bg2: '#1a1f2e', bg3: '#0d1117',
    border: '#2a2f3e', border2: '#1e2330',
    text: '#e8eaed', text2: '#9aa0a6', text3: '#5f6368',
    green: '#00C896', red: '#FF4757', blue: '#4A9EFF',
  };

  if (showOnboarding) return (
    <div style={{fontFamily:"'Segoe UI',sans-serif", background:S.bg, minHeight:'100vh', color:S.text, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
      <style>{`
        @keyframes fi{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse2{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
      `}</style>
      <div style={{maxWidth:400, width:'100%', animation:'fi 0.5s ease'}}>
        <div style={{textAlign:'center', marginBottom:32}}>
          <div style={{width:72, height:72, background:`linear-gradient(135deg, ${S.green}, #0099CC)`, borderRadius:20, display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, margin:'0 auto 12px', boxShadow:`0 8px 32px ${S.green}40`, animation:'pulse2 3s ease-in-out infinite'}}>🏗</div>
          <div style={{fontSize:22, fontWeight:700}}>SolBrick</div>
          <div style={{fontSize:11, color:S.text3, marginTop:4, letterSpacing:1}}>POWERED BY SOLANA</div>
        </div>
        <div style={{background:S.bg2, border:`1px solid ${S.border}`, borderRadius:16, padding:28, textAlign:'center', marginBottom:16, transition:'all 0.3s'}}>
          <div style={{fontSize:52, marginBottom:14, animation:'fi 0.4s ease'}}>{onboardSteps[onboardStep].icon}</div>
          <h2 style={{margin:'0 0 10px', fontSize:18, fontWeight:600, animation:'fi 0.4s ease'}}>{onboardSteps[onboardStep].title}</h2>
          <p style={{color:S.text2, fontSize:14, lineHeight:1.7, margin:0, animation:'fi 0.4s ease'}}>{onboardSteps[onboardStep].desc}</p>
        </div>
        <div style={{display:'flex', justifyContent:'center', gap:6, marginBottom:16}}>
          {onboardSteps.map((_,i) => <div key={i} style={{width:i===onboardStep?24:6, height:6, background:i===onboardStep?S.green:S.border, borderRadius:3, transition:'all 0.4s'}} />)}
        </div>
        <button onClick={() => onboardStep < onboardSteps.length-1 ? setOnboardStep(s=>s+1) : setShowOnboarding(false)}
          style={{width:'100%', background:`linear-gradient(135deg, ${S.green}, #0099CC)`, color:S.bg3, border:'none', padding:'14px', borderRadius:10, cursor:'pointer', fontSize:15, fontWeight:700, marginBottom:8, boxShadow:`0 4px 20px ${S.green}40`, transition:'transform 0.15s'}}
          onMouseEnter={e => (e.currentTarget.style.transform='scale(1.02)')}
          onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}>
          {onboardStep < onboardSteps.length-1 ? 'Далее →' : '🚀 Начать инвестировать'}
        </button>
        <button onClick={() => setShowOnboarding(false)} style={{width:'100%', background:'transparent', color:S.text3, border:'none', padding:'10px', cursor:'pointer', fontSize:13}}>Пропустить</button>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'Segoe UI',sans-serif", background:S.bg, minHeight:'100vh', color:S.text, width:'100%', overflowX:'hidden'}}>
      <style>{`
        *{box-sizing:border-box;}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.94) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes chatBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        @keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 8px #00C89640}50%{box-shadow:0 0 20px #00C89680}}
        .card{transition:all 0.3s cubic-bezier(0.4,0,0.2,1);cursor:pointer;}
        .card:hover{transform:translateY(-3px);background:#1e2330 !important;box-shadow:0 8px 32px rgba(0,200,150,0.1) !important;}
        .card.expanded{border-color:#00C896 !important;box-shadow:0 8px 32px rgba(0,200,150,0.15) !important;}
        .btn{transition:all 0.2s ease;cursor:pointer;}
        .btn:hover{opacity:0.88;transform:scale(1.02);}
        .btn:active{transform:scale(0.97);}
        .nav-item{transition:all 0.2s ease;cursor:pointer;}
        .chat-btn{animation:chatBounce 3s ease-in-out infinite;}
        input:focus,select:focus{outline:none;border-color:#00C896 !important;}
        input[type=range]{accent-color:#00C896;width:100%;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#1a1f2e;}
        ::-webkit-scrollbar-thumb{background:#3a3f4e;border-radius:2px;}
        img{transition:transform 0.3s ease;}
      `}</style>

      {/* Ticker */}
      <div style={{background:S.bg3, borderBottom:`1px solid ${S.border}`, height:28, overflow:'hidden'}}>
        <div style={{display:'flex', animation:'ticker 50s linear infinite', width:'max-content', height:'100%', alignItems:'center'}}>
          {[...TICKER,...TICKER].map((item,i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:6, padding:'0 16px', whiteSpace:'nowrap', borderRight:`1px solid ${S.border2}`}}>
              <span style={{color:S.text2, fontSize:11}}>{item.name}</span>
              <span style={{color:S.text, fontSize:11, fontWeight:600, fontFamily:'monospace'}}>{item.price}</span>
              <span style={{color:item.change.startsWith('+')?S.green:S.red, fontSize:10, fontWeight:600}}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header style={{background:S.bg2, borderBottom:`1px solid ${S.border}`, padding:`0 ${isMobile?'12px':'32px'}`, display:'flex', alignItems:'center', justifyContent:'space-between', height:52, position:'sticky', top:0, zIndex:100, backdropFilter:'blur(20px)'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <div style={{width:32, height:32, background:`linear-gradient(135deg, ${S.green}, #0099CC)`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, boxShadow:`0 0 12px ${S.green}40`}}>🏗</div>
          <span style={{fontSize:16, fontWeight:700}}>SolBrick</span>
          <span style={{background:S.bg3, color:S.green, fontSize:9, padding:'2px 6px', borderRadius:4, border:`1px solid ${S.green}30`, fontWeight:700, letterSpacing:1, animation:'glow 3s ease-in-out infinite'}}>DEVNET</span>
        </div>
        {!isMobile && (
          <nav style={{display:'flex', gap:2}}>
            {[['home','Проекты'],['portfolio','Портфель'],['calculator','Калькулятор'],['transactions','История']].map(([page,label]) => (
              <button key={page} onClick={() => setActivePage(page as Page)} className="nav-item"
                style={{background:'transparent', border:'none', color:activePage===page?S.green:S.text2, padding:'6px 14px', borderRadius:6, fontSize:13, fontWeight:activePage===page?600:400, borderBottom:activePage===page?`2px solid ${S.green}`:'2px solid transparent'}}>
                {label}
              </button>
            ))}
          </nav>
        )}
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          {wallet && !isMobile && (
            <div style={{background:S.bg3, border:`1px solid ${S.border}`, padding:'5px 10px', borderRadius:8, fontSize:12, color:S.text2}}>
              ◎ {solBalance.toFixed(3)}
            </div>
          )}
          {wallet ? (
            <div style={{display:'flex', alignItems:'center', gap:5, background:'#0d2d1e', border:`1px solid ${S.green}40`, padding:'5px 10px', borderRadius:8}}>
              <div style={{width:6, height:6, background:S.green, borderRadius:'50%', animation:'pulse 2s infinite'}} />
              <span style={{color:S.green, fontSize:isMobile?11:12, fontWeight:600}}>{wallet.slice(0,4)}...{wallet.slice(-4)}</span>
            </div>
          ) : (
            <button onClick={connectWallet} className="btn"
              style={{background:`linear-gradient(135deg, ${S.green}, #0099CC)`, color:S.bg3, border:'none', padding:`7px ${isMobile?'10px':'16px'}`, borderRadius:8, fontSize:isMobile?12:13, fontWeight:700, whiteSpace:'nowrap', boxShadow:`0 4px 12px ${S.green}30`}}>
              {isMobile ? '🔗' : '🔗 Подключить'}
            </button>
          )}
        </div>
      </header>

      {/* Chat Widget */}
      <div style={{position:'fixed', bottom:isMobile?80:24, right:isMobile?12:24, zIndex:300}}>
        {chatOpen && (
          <div style={{position:'absolute', bottom:60, right:0, width:isMobile?'calc(100vw - 24px)':'340px', maxHeight:480, background:S.bg2, border:`1px solid ${S.border}`, borderRadius:16, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.5)', animation:'slideIn 0.3s ease', display:'flex', flexDirection:'column'}}>
            {/* Chat header */}
            <div style={{background:`linear-gradient(135deg, ${S.green}20, #0099CC20)`, borderBottom:`1px solid ${S.border}`, padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{width:36, height:36, background:`linear-gradient(135deg, ${S.green}, #0099CC)`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18}}>🤖</div>
                <div>
                  <div style={{fontSize:13, fontWeight:600}}>SolBrick Assistant</div>
                  <div style={{fontSize:11, color:S.green, display:'flex', alignItems:'center', gap:4}}>
                    <div style={{width:5, height:5, background:S.green, borderRadius:'50%', animation:'pulse 2s infinite'}} />
                    Онлайн
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{background:'transparent', border:'none', color:S.text2, cursor:'pointer', fontSize:16, padding:4}}>✕</button>
            </div>
            {/* Messages */}
            <div style={{flex:1, overflowY:'auto', padding:'12px', display:'flex', flexDirection:'column', gap:10, maxHeight:320}}>
              {chatMessages.map(msg => (
                <div key={msg.id} style={{display:'flex', flexDirection:msg.from==='user'?'row-reverse':'row', gap:8, animation:'msgIn 0.3s ease'}}>
                  {msg.from==='bot' && <div style={{width:28, height:28, background:`linear-gradient(135deg, ${S.green}, #0099CC)`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0}}>🤖</div>}
                  <div style={{maxWidth:'78%'}}>
                    <div style={{background:msg.from==='user'?`linear-gradient(135deg, ${S.green}30, #0099CC20)`:S.bg3, border:`1px solid ${msg.from==='user'?S.green+'30':S.border}`, borderRadius:msg.from==='user'?'12px 4px 12px 12px':'4px 12px 12px 12px', padding:'8px 12px', fontSize:13, lineHeight:1.5, color:S.text, whiteSpace:'pre-line'}}>
                      {msg.text}
                    </div>
                    <div style={{fontSize:10, color:S.text3, marginTop:3, textAlign:msg.from==='user'?'right':'left'}}>{msg.time}</div>
                  </div>
                </div>
              ))}
              {chatTyping && (
                <div style={{display:'flex', gap:8, animation:'msgIn 0.3s ease'}}>
                  <div style={{width:28, height:28, background:`linear-gradient(135deg, ${S.green}, #0099CC)`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14}}>🤖</div>
                  <div style={{background:S.bg3, border:`1px solid ${S.border}`, borderRadius:'4px 12px 12px 12px', padding:'10px 16px', display:'flex', gap:4, alignItems:'center'}}>
                    {[0,1,2].map(i => <div key={i} style={{width:6, height:6, background:S.text3, borderRadius:'50%', animation:`pulse 1s ease-in-out ${i*0.2}s infinite`}} />)}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {/* Quick replies */}
            <div style={{padding:'8px 12px', borderTop:`1px solid ${S.border2}`, display:'flex', gap:6, flexWrap:'wrap'}}>
              {['Как купить?','Что такое ROI?','Минимальная сумма?'].map(q => (
                <button key={q} onClick={() => { setChatInput(q); }}
                  style={{background:S.bg3, border:`1px solid ${S.border}`, color:S.text2, padding:'4px 10px', borderRadius:20, fontSize:11, cursor:'pointer', transition:'all 0.15s'}}
                  onMouseEnter={e => {e.currentTarget.style.borderColor=S.green; e.currentTarget.style.color=S.green;}}
                  onMouseLeave={e => {e.currentTarget.style.borderColor=S.border; e.currentTarget.style.color=S.text2;}}>
                  {q}
                </button>
              ))}
            </div>
            {/* Input */}
            <div style={{padding:'10px 12px', borderTop:`1px solid ${S.border}`, display:'flex', gap:8}}>
              <input type="text" placeholder="Напишите сообщение..." value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyPress={e => e.key==='Enter' && sendChat()}
                style={{flex:1, background:S.bg3, border:`1px solid ${S.border}`, borderRadius:8, padding:'8px 12px', color:S.text, fontSize:13}} />
              <button onClick={sendChat} className="btn"
                style={{background:`linear-gradient(135deg, ${S.green}, #0099CC)`, color:S.bg3, border:'none', padding:'8px 14px', borderRadius:8, fontSize:16, fontWeight:700}}>
                ➤
              </button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)} className="btn chat-btn"
          style={{width:52, height:52, background:`linear-gradient(135deg, ${S.green}, #0099CC)`, border:'none', borderRadius:'50%', cursor:'pointer', fontSize:24, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 4px 20px ${S.green}50`, position:'relative'}}>
          {chatOpen ? '✕' : '💬'}
          {unreadChat > 0 && !chatOpen && (
            <div style={{position:'absolute', top:-2, right:-2, width:18, height:18, background:S.red, borderRadius:'50%', fontSize:10, fontWeight:700, color:'white', display:'flex', alignItems:'center', justifyContent:'center'}}>
              {unreadChat}
            </div>
          )}
        </button>
      </div>

      {/* Photo Modal */}
      {photoModal && (
        <div style={{position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.92)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:isMobile?12:20, animation:'fadeUp 0.2s ease'}}
          onClick={() => setPhotoModal(null)}>
          <div style={{width:'100%', maxWidth:800}} onClick={e => e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span style={{fontSize:20}}>{photoModal.project.image}</span>
                <span style={{fontSize:14, fontWeight:600}}>{photoModal.project.name}</span>
              </div>
              <button onClick={() => setPhotoModal(null)} style={{background:'transparent', border:`1px solid ${S.border}`, color:S.text2, padding:'4px 10px', borderRadius:6, cursor:'pointer', fontSize:12}}>✕ Закрыть</button>
            </div>
            <div style={{borderRadius:12, overflow:'hidden', marginBottom:10, position:'relative'}}>
              <img src={photoModal.project.photos[photoModal.idx]} alt="" style={{width:'100%', height:isMobile?220:400, objectFit:'cover', display:'block'}} />
              <div style={{position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent, rgba(0,0,0,0.6))', padding:'20px 16px 12px'}}>
                <span style={{background:photoModal.project.color, color:'#0d1117', fontSize:11, padding:'3px 10px', borderRadius:4, fontWeight:700}}>{photoModal.project.tag}</span>
                <span style={{background:'#0d2d1e', color:S.green, fontSize:11, padding:'3px 10px', borderRadius:4, fontWeight:700, marginLeft:6}}>ROI {photoModal.project.roi}</span>
              </div>
              {photoModal.idx > 0 && <button onClick={() => setPhotoModal(p => p?{...p,idx:p.idx-1}:null)} style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.7)', border:'none', color:'white', width:36, height:36, borderRadius:'50%', cursor:'pointer', fontSize:18}}>‹</button>}
              {photoModal.idx < photoModal.project.photos.length-1 && <button onClick={() => setPhotoModal(p => p?{...p,idx:p.idx+1}:null)} style={{position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.7)', border:'none', color:'white', width:36, height:36, borderRadius:'50%', cursor:'pointer', fontSize:18}}>›</button>}
            </div>
            <div style={{display:'flex', gap:8, justifyContent:'center', marginBottom:12}}>
              {photoModal.project.photos.map((ph: string, i: number) => (
                <img key={i} src={ph} alt="" onClick={() => setPhotoModal(p => p?{...p,idx:i}:null)}
                  style={{width:64, height:46, objectFit:'cover', borderRadius:6, border:`2px solid ${i===photoModal.idx?S.green:S.border}`, cursor:'pointer', opacity:i===photoModal.idx?1:0.6, transition:'all 0.2s'}} />
              ))}
            </div>
            <button onClick={(e) => {setPhotoModal(null); openModal(photoModal.project, 1, e);}} className="btn"
              style={{width:'100%', background:`linear-gradient(135deg, ${S.green}, #0099CC)`, color:S.bg3, border:'none', padding:'12px', borderRadius:8, fontSize:14, fontWeight:700, boxShadow:`0 4px 16px ${S.green}40`}}>
              💰 Купить долю · ${photoModal.project.pricePerShare}
            </button>
          </div>
        </div>
      )}

      {/* Buy Modal */}
      {modal && (
        <div style={{position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:16}}
          onClick={() => !txPending && setModal(null)}>
          <div style={{background:S.bg2, border:`1px solid ${S.border}`, borderRadius:16, padding:24, width:'100%', maxWidth:380, animation:'modalIn 0.3s ease', boxShadow:'0 20px 60px rgba(0,0,0,0.5)'}}
            onClick={e => e.stopPropagation()}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:16, paddingBottom:12, borderBottom:`1px solid ${S.border}`}}>
              <span style={{fontSize:30}}>{modal.project.image}</span>
              <div>
                <div style={{fontSize:14, fontWeight:600}}>Подтвердить покупку</div>
                <div style={{fontSize:11, color:S.text2}}>On-chain · Solana Devnet</div>
              </div>
            </div>
            {[['Проект',modal.project.name],['Количество',`${modal.amount} доля`],['Цена',`$${modal.project.pricePerShare}`],['Итого',`$${modal.amount*modal.project.pricePerShare}`],['Комиссия','~0.001 SOL']].map(([k,v]) => (
              <div key={k} style={{display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:`1px solid ${S.border2}`, fontSize:13}}>
                <span style={{color:S.text2}}>{k}</span>
                <span style={{color:k==='Итого'?S.green:S.text, fontWeight:k==='Итого'?700:400}}>{v}</span>
              </div>
            ))}
            <div style={{background:'#0d2d1e', border:`1px solid ${S.green}30`, borderRadius:8, padding:'8px 12px', margin:'12px 0', fontSize:12, color:S.green}}>
              ⚡ Запись в Solana блокчейн навсегда
            </div>
            <button onClick={confirmBuy} disabled={txPending} className="btn"
              style={{width:'100%', background:txPending?S.border:`linear-gradient(135deg, ${S.green}, #0099CC)`, color:txPending?S.text2:S.bg3, border:'none', padding:'12px', borderRadius:8, fontSize:14, fontWeight:700, marginBottom:8, display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:txPending?'none':`0 4px 16px ${S.green}40`}}>
              {txPending ? <><div style={{width:14, height:14, border:`2px solid ${S.text2}`, borderTopColor:S.text, borderRadius:'50%', animation:'spin 0.8s linear infinite'}} />Обработка...</> : `✅ Подтвердить · $${modal.amount*modal.project.pricePerShare}`}
            </button>
            {!txPending && <button onClick={() => setModal(null)} style={{width:'100%', background:'transparent', color:S.text2, border:`1px solid ${S.border}`, padding:'10px', borderRadius:8, cursor:'pointer', fontSize:13}}>Отмена</button>}
          </div>
        </div>
      )}

      {/* Toast message */}
      {message && (
        <div style={{position:'fixed', top:64, left:'50%', transform:'translateX(-50%)', zIndex:500, background:message.includes('✅')?'#0d2d1e':'#2d1515', border:`1px solid ${message.includes('✅')?S.green+'40':S.red+'40'}`, borderRadius:10, padding:'10px 20px', fontSize:13, color:message.includes('✅')?S.green:S.red, whiteSpace:'nowrap', animation:'fadeUp 0.3s ease', boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
          {message}
        </div>
      )}

      <main style={{maxWidth:1280, margin:'0 auto', padding:isMobile?'12px 12px 80px':'24px 32px'}}>

        {/* HOME */}
        {activePage==='home' && (
          <div style={{animation:'fadeUp 0.4s ease'}}>
            <div style={{background:S.bg2, border:`1px solid ${S.border}`, borderRadius:14, padding:isMobile?'16px':'20px 28px', marginBottom:16, position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:-40, right:-40, width:200, height:200, background:`radial-gradient(circle, ${S.green}15, transparent)`, borderRadius:'50%', pointerEvents:'none'}} />
              <div style={{fontSize:11, color:S.green, fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginBottom:6}}>🚀 Solana Devnet · Anchor Protocol</div>
              <h1 style={{fontSize:isMobile?20:26, fontWeight:700, margin:'0 0 6px', background:`linear-gradient(135deg, ${S.text}, ${S.green})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
                Инвестируй в недвижимость от $20
              </h1>
              <p style={{color:S.text2, fontSize:13, margin:'0 0 16px'}}>Токенизированные проекты Казахстана на блокчейне</p>
              <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:isMobile?0:16}}>
                {[{l:'Проектов',v:counter.projects,c:S.green,i:'🏗'},{l:'Объём',v:`$${counter.volume}K`,c:S.blue,i:'💰'},{l:'Инвесторов',v:`${counter.investors.toLocaleString()}+`,c:'#A78BFA',i:'👥'},{l:'Avg ROI',v:`${counter.roi}%`,c:'#F59E0B',i:'📈'}].map((s,i) => (
                  <div key={i} style={{background:S.bg3, border:`1px solid ${S.border}`, borderRadius:10, padding:'12px 14px', display:'flex', alignItems:'center', gap:10, transition:'all 0.2s'}}
                    onMouseEnter={e => e.currentTarget.style.borderColor=s.c}
                    onMouseLeave={e => e.currentTarget.style.borderColor=S.border}>
                    <span style={{fontSize:22}}>{s.i}</span>
                    <div>
                      <div style={{fontSize:18, fontWeight:700, color:s.c, fontFamily:'monospace'}}>{s.v}</div>
                      <div style={{fontSize:10, color:S.text3, textTransform:'uppercase', letterSpacing:0.5}}>{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{position:'relative', marginBottom:10}}>
              <span style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:S.text3, fontSize:14}}>⌕</span>
              <input type="text" placeholder="Поиск по названию или городу..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{width:'100%', background:S.bg2, border:`1px solid ${S.border}`, borderRadius:8, padding:'9px 12px 9px 32px', color:S.text, fontSize:13, transition:'border-color 0.2s'}} />
            </div>

            <div style={{display:'flex', gap:6, marginBottom:14, flexWrap:'wrap', overflowX:'auto', paddingBottom:4}}>
              {tags.map(tag => (
                <button key={tag} onClick={() => setFilterTag(tag)} className="btn"
                  style={{background:filterTag===tag?`linear-gradient(135deg, ${S.green}, #0099CC)`:S.bg2, color:filterTag===tag?S.bg3:S.text2, border:`1px solid ${filterTag===tag?S.green:S.border}`, padding:'6px 12px', borderRadius:6, fontSize:12, fontWeight:filterTag===tag?600:400, whiteSpace:'nowrap', flexShrink:0}}>
                  {tag}
                </button>
              ))}
              <div style={{display:'flex', alignItems:'center', gap:5, marginLeft:'auto'}}>
                <div style={{width:6, height:6, background:S.green, borderRadius:'50%', animation:'pulse 2s infinite'}} />
                <span style={{color:S.text2, fontSize:11}}>{filtered.length} проектов</span>
              </div>
            </div>

            <div style={{display:'grid', gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)', gap:14}}>
              {filtered.map((asset, idx) => {
                const pct = Math.round((asset.soldShares/asset.totalShares)*100);
                const isHot = pct > 70;
                const isExp = expandedCard === asset.id;
                return (
                  <div key={asset.id} className={`card ${isExp?'expanded':''}`}
                    onClick={() => setExpandedCard(isExp?null:asset.id)}
                    style={{background:S.bg2, border:`1px solid ${isExp?S.green:S.border}`, borderRadius:12, overflow:'hidden', animation:loaded?`fadeUp ${0.1+idx*0.05}s ease`:'none'}}>
                    <div style={{position:'relative', height:isMobile?130:150, overflow:'hidden'}}>
                      <img src={asset.photos[0]} alt={asset.name} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
                        onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'} />
                      <div style={{position:'absolute', inset:0, background:'linear-gradient(transparent 35%, rgba(26,31,46,0.97))'}} />
                      <div style={{position:'absolute', top:8, left:8, display:'flex', gap:5}}>
                        <span style={{background:asset.color, color:'#0d1117', fontSize:10, padding:'2px 7px', borderRadius:4, fontWeight:700}}>{asset.tag}</span>
                        {isHot && <span style={{background:S.red, color:'white', fontSize:10, padding:'2px 7px', borderRadius:4, fontWeight:700, animation:'pulse 2s infinite'}}>🔥 HOT</span>}
                      </div>
                      <button onClick={(e) => {e.stopPropagation(); setPhotoModal({project:asset, idx:0});}}
                        style={{position:'absolute', top:8, right:8, background:'rgba(0,0,0,0.65)', border:`1px solid ${S.border}`, color:'white', padding:'3px 8px', borderRadius:6, cursor:'pointer', fontSize:11, transition:'all 0.2s'}}
                        onMouseEnter={e => e.currentTarget.style.borderColor=S.green}
                        onMouseLeave={e => e.currentTarget.style.borderColor=S.border}>
                        📷 {asset.photos.length}
                      </button>
                      <div style={{position:'absolute', bottom:8, left:10, right:10, display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
                        <div>
                          <div style={{fontSize:isMobile?13:14, fontWeight:700, color:'white', lineHeight:1.2}}>{asset.name}</div>
                          <div style={{fontSize:11, color:'rgba(255,255,255,0.55)', marginTop:2}}>📍 {asset.location}</div>
                        </div>
                        <div style={{textAlign:'right', background:'rgba(0,200,150,0.15)', border:`1px solid ${S.green}30`, borderRadius:6, padding:'4px 8px'}}>
                          <div style={{fontSize:15, fontWeight:700, color:S.green, fontFamily:'monospace'}}>{asset.roi}</div>
                          <div style={{fontSize:9, color:'rgba(255,255,255,0.4)', textTransform:'uppercase'}}>ROI</div>
                        </div>
                      </div>
                    </div>
                    <div style={{padding:'10px 12px'}}>
                      <div style={{marginBottom:8}}>
                        <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:S.text2, marginBottom:4}}>
                          <span>Продано долей</span>
                          <span style={{color:isHot?S.red:S.green, fontWeight:600}}>{pct}%</span>
                        </div>
                        <div style={{background:S.bg3, borderRadius:2, height:3}}>
                          <div style={{background:isHot?S.red:asset.color, borderRadius:2, height:3, width:`${pct}%`, transition:'width 1s ease', boxShadow:`0 0 6px ${isHot?S.red:asset.color}60`}} />
                        </div>
                      </div>
                      <div style={{overflow:'hidden', maxHeight:isExp?'500px':'0', opacity:isExp?1:0, transition:'all 0.4s cubic-bezier(0.4,0,0.2,1)'}}>
                        <div style={{display:'flex', gap:5, marginBottom:8}}>
                          {asset.photos.map((ph: string, i: number) => (
                            <img key={i} src={ph} alt="" onClick={(e) => {e.stopPropagation(); setPhotoModal({project:asset, idx:i});}}
                              style={{flex:1, height:50, objectFit:'cover', borderRadius:5, border:`1px solid ${S.border}`, cursor:'pointer', transition:'all 0.2s'}}
                              onMouseEnter={e => {e.currentTarget.style.borderColor=S.green; e.currentTarget.style.transform='scale(1.05)';}}
                              onMouseLeave={e => {e.currentTarget.style.borderColor=S.border; e.currentTarget.style.transform='scale(1)';}} />
                          ))}
                        </div>
                        <p style={{color:S.text2, fontSize:12, lineHeight:1.6, marginBottom:8, paddingTop:8, borderTop:`1px solid ${S.border2}`}}>{asset.desc}</p>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:6, marginBottom:8}}>
                          {[['Площадь',asset.area],['Сдача',asset.completion],['Долей',asset.totalShares],['Цена',`$${asset.pricePerShare}`]].map(([k,v]) => (
                            <div key={k} style={{background:S.bg3, borderRadius:6, padding:'6px 10px', border:`1px solid ${S.border2}`}}>
                              <div style={{fontSize:9, color:S.text3, textTransform:'uppercase', letterSpacing:0.5}}>{k}</div>
                              <div style={{fontSize:12, fontWeight:600, marginTop:2}}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <button onClick={(e) => {e.stopPropagation(); openModal(asset, 1, e);}} className="btn"
                          style={{width:'100%', background:`linear-gradient(135deg, ${asset.color}, ${asset.color}cc)`, color:'#0d1117', border:'none', padding:'10px', borderRadius:8, fontSize:13, fontWeight:700, boxShadow:`0 4px 12px ${asset.color}40`}}>
                          💰 Купить долю · ${asset.pricePerShare}
                        </button>
                      </div>
                      {!isExp ? (
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                          <div>
                            <div style={{fontSize:9, color:S.text3, textTransform:'uppercase', letterSpacing:0.5}}>Цена доли</div>
                            <div style={{fontSize:16, fontWeight:700, fontFamily:'monospace'}}>${asset.pricePerShare}</div>
                          </div>
                          <span style={{color:asset.color, fontSize:11, transition:'color 0.2s'}}>▼ подробнее</span>
                        </div>
                      ) : <div style={{textAlign:'center', color:S.text3, fontSize:11, marginTop:6}}>▲ свернуть</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PORTFOLIO */}
        {activePage==='portfolio' && (
          <div style={{animation:'fadeUp 0.3s ease'}}>
            <h2 style={{fontSize:20, fontWeight:600, margin:'0 0 4px'}}>Мой портфель</h2>
            <p style={{color:S.text2, fontSize:13, margin:'0 0 20px'}}>Ваши инвестиции на Solana</p>
            {!wallet ? (
              <div style={{textAlign:'center', padding:48, background:S.bg2, border:`1px solid ${S.border}`, borderRadius:14}}>
                <div style={{fontSize:48, marginBottom:12, animation:'chatBounce 3s ease-in-out infinite'}}>🔗</div>
                <p style={{color:S.text2, fontSize:14, marginBottom:20}}>Подключите кошелёк для просмотра портфеля</p>
                <button onClick={connectWallet} className="btn" style={{background:`linear-gradient(135deg, ${S.green}, #0099CC)`, color:S.bg3, border:'none', padding:'12px 24px', borderRadius:10, fontSize:14, fontWeight:700, boxShadow:`0 4px 16px ${S.green}40`}}>Подключить Phantom</button>
              </div>
            ) : (
              <>
                <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, marginBottom:16}}>
                  {[{l:'Портфель',v:`$${totalPortfolio}`,c:S.green,i:'💼'},{l:'Свободно',v:`$${usdBalance.toLocaleString()}`,c:S.blue,i:'💵'},{l:'SOL',v:`◎ ${solBalance.toFixed(3)}`,c:'#A78BFA',i:'◎'},{l:'Проектов',v:Object.keys(portfolio).length,c:'#F59E0B',i:'🏗'}].map((s,i) => (
                    <div key={i} style={{background:S.bg2, border:`1px solid ${S.border}`, borderRadius:10, padding:'14px 16px', transition:'all 0.2s'}}
                      onMouseEnter={e => e.currentTarget.style.borderColor=s.c}
                      onMouseLeave={e => e.currentTarget.style.borderColor=S.border}>
                      <div style={{fontSize:11, color:S.text3, textTransform:'uppercase', letterSpacing:0.5, marginBottom:4}}>{s.i} {s.l}</div>
                      <div style={{fontSize:20, fontWeight:700, color:s.c, fontFamily:'monospace'}}>{s.v}</div>
                    </div>
                  ))}
                </div>
                {Object.keys(portfolio).length === 0 ? (
                  <div style={{textAlign:'center', padding:32, background:S.bg2, border:`1px solid ${S.border}`, borderRadius:12}}>
                    <p style={{color:S.text2, fontSize:13}}>Нет инвестиций</p>
                    <button onClick={() => setActivePage('home')} className="btn" style={{background:`linear-gradient(135deg, ${S.green}, #0099CC)`, color:S.bg3, border:'none', padding:'8px 16px', borderRadius:8, fontSize:13, fontWeight:700, marginTop:10}}>К проектам</button>
                  </div>
                ) : (
                  <div style={{background:S.bg2, border:`1px solid ${S.border}`, borderRadius:12, overflow:'hidden'}}>
                    {Object.entries(portfolio).map(([id,shares],i) => {
                      const p = assets.find(a=>a.id===parseInt(id))!;
                      return (
                        <div key={id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 16px', borderTop:i>0?`1px solid ${S.border2}`:'none', transition:'background 0.2s'}}
                          onMouseEnter={e => e.currentTarget.style.background=S.bg3}
                          onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                          <div style={{display:'flex', alignItems:'center', gap:12}}>
                            <img src={p.photos[0]} alt="" style={{width:44, height:44, borderRadius:8, objectFit:'cover', border:`1px solid ${p.color}40`}} />
                            <div>
                              <div style={{fontSize:13, fontWeight:500}}>{p.name}</div>
                              <div style={{fontSize:11, color:S.text2}}>{shares} долей · ROI {p.roi}</div>
                            </div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div style={{fontSize:16, fontWeight:700, color:p.color, fontFamily:'monospace'}}>${shares*p.pricePerShare}</div>
                            <div style={{fontSize:10, color:S.green, marginTop:2}}>+{p.roi} в год</div>
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

        {/* CALCULATOR */}
        {activePage==='calculator' && (
          <div style={{animation:'fadeUp 0.3s ease'}}>
            <h2 style={{fontSize:20, fontWeight:600, margin:'0 0 4px'}}>Калькулятор доходности</h2>
            <p style={{color:S.text2, fontSize:13, margin:'0 0 20px'}}>Рассчитайте потенциальный доход от инвестиций</p>
            <div style={{display:'grid', gridTemplateColumns:isMobile?'1fr':'1fr 1fr', gap:16}}>
              <div style={{background:S.bg2, border:`1px solid ${S.border}`, borderRadius:12, padding:20}}>
                {[
                  {label:'Сумма инвестиции', value:calcAmount, min:20, max:100000, step:20, setter:setCalcAmount, fmt:(v:number)=>`$${v.toLocaleString()}`},
                  {label:'Срок (лет)', value:calcYears, min:1, max:10, step:1, setter:setCalcYears, fmt:(v:number)=>`${v} лет`},
                  {label:'Ожидаемый ROI', value:calcRoi, min:5, max:30, step:0.5, setter:setCalcRoi, fmt:(v:number)=>`${v}%`},
                ].map(p => (
                  <div key={p.label} style={{marginBottom:22}}>
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:13}}>
                      <span style={{color:S.text2}}>{p.label}</span>
                      <span style={{color:S.green, fontWeight:600, fontFamily:'monospace'}}>{p.fmt(p.value)}</span>
                    </div>
                    <input type="range" min={p.min} max={p.max} step={p.step} value={p.value} onChange={e => p.setter(Number(e.target.value))} />
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:10, color:S.text3, marginTop:3}}>
                      <span>{p.fmt(p.min)}</span><span>{p.fmt(p.max)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{background:'#0d2d1e', border:`1px solid ${S.green}30`, borderRadius:12, padding:20, marginBottom:14}}>
                  <div style={{fontSize:11, color:S.green, fontWeight:600, marginBottom:12, textTransform:'uppercase', letterSpacing:0.5}}>📊 Результат</div>
                  <div style={{fontSize:34, fontWeight:700, color:S.green, fontFamily:'monospace', marginBottom:14}}>${calcResult.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</div>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                    {[['Вложено',`$${calcAmount.toLocaleString()}`],['Прибыль',`+$${(calcResult-calcAmount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}`]].map(([k,v]) => (
                      <div key={k} style={{background:S.bg3, borderRadius:8, padding:'10px 14px'}}>
                        <div style={{fontSize:10, color:S.text3, marginBottom:3}}>{k}</div>
                        <div style={{fontSize:15, fontWeight:600, color:k==='Прибыль'?S.green:S.text, fontFamily:'monospace'}}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{background:S.bg2, border:`1px solid ${S.border}`, borderRadius:12, padding:16}}>
                  <div style={{fontSize:11, color:S.text2, fontWeight:600, marginBottom:12, textTransform:'uppercase', letterSpacing:0.5}}>Рост по годам</div>
                  {Array.from({length:Math.min(calcYears,5)},(_,i) => {
                    const yv = calcAmount * Math.pow(1+calcRoi/100, i+1);
                    return (
                      <div key={i} style={{display:'flex', alignItems:'center', gap:8, marginBottom:8}}>
                        <span style={{fontSize:11, color:S.text2, width:28}}>{i+1}г.</span>
                        <div style={{flex:1, background:S.bg3, borderRadius:2, height:4}}>
                          <div style={{background:`linear-gradient(90deg, ${S.green}, #0099CC)`, borderRadius:2, height:4, width:`${Math.min((yv/calcResult)*100,100)}%`, transition:'width 0.8s ease'}} />
                        </div>
                        <span style={{fontSize:11, color:S.green, fontFamily:'monospace', width:76, textAlign:'right'}}>${yv.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span>
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
          <div style={{animation:'fadeUp 0.3s ease'}}>
            <h2 style={{fontSize:20, fontWeight:600, margin:'0 0 4px'}}>История транзакций</h2>
            <p style={{color:S.text2, fontSize:13, margin:'0 0 20px'}}>Все on-chain операции через Solana</p>
            {transactions.length === 0 ? (
              <div style={{textAlign:'center', padding:48, background:S.bg2, border:`1px solid ${S.border}`, borderRadius:14}}>
                <div style={{fontSize:40, marginBottom:12}}>📭</div>
                <p style={{color:S.text2, fontSize:13, marginBottom:16}}>Транзакций пока нет</p>
                <button onClick={() => setActivePage('home')} className="btn" style={{background:`linear-gradient(135deg, ${S.green}, #0099CC)`, color:S.bg3, border:'none', padding:'10px 20px', borderRadius:8, fontSize:13, fontWeight:700}}>Купить первую долю</button>
              </div>
            ) : (
              <div style={{background:S.bg2, border:`1px solid ${S.border}`, borderRadius:12, overflow:'hidden'}}>
                {transactions.map((tx,i) => (
                  <div key={tx.id} style={{padding:'14px 16px', borderTop:i>0?`1px solid ${S.border2}`:'none', transition:'background 0.2s'}}
                    onMouseEnter={e => e.currentTarget.style.background=S.bg3}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4}}>
                      <div>
                        <div style={{fontSize:13, fontWeight:500}}>{tx.project}</div>
                        <div style={{fontSize:11, color:S.text2, marginTop:2}}>{tx.amount} долей · {tx.date}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:14, fontWeight:700, color:S.green, fontFamily:'monospace'}}>${tx.cost}</div>
                        <div style={{fontSize:10, color:S.blue, fontFamily:'monospace', marginTop:2}}>{tx.hash}...</div>
                      </div>
                    </div>
                    <div style={{display:'inline-flex', alignItems:'center', gap:4, background:'#0d2d1e', border:`1px solid ${S.green}30`, color:S.green, fontSize:10, padding:'2px 8px', borderRadius:4, fontWeight:600}}>
                      ✅ BUY · Confirmed on Solana
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!isMobile && (
          <div style={{marginTop:40, paddingTop:16, borderTop:`1px solid ${S.border2}`, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <span style={{fontSize:11, color:S.text3}}>SolBrick © 2026 · National Solana Hackathon by Decentrathon</span>
            <span style={{fontSize:11, color:S.text3}}>Built on <span style={{color:'#9945FF'}}>Solana</span> · Anchor 0.32.1</span>
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <div style={{position:'fixed', bottom:0, left:0, right:0, zIndex:200, background:S.bg2, borderTop:`1px solid ${S.border}`, display:'flex', justifyContent:'space-around', padding:'8px 0 18px', backdropFilter:'blur(20px)'}}>
          {[['home','🏠','Проекты'],['portfolio','💼','Портфель'],['calculator','🧮','Расчёт'],['transactions','📋','История']].map(([page,icon,label]) => (
            <button key={page} onClick={() => setActivePage(page as Page)}
              style={{background:'transparent', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:2, padding:'4px 10px', color:activePage===page?S.green:S.text2, transition:'all 0.2s'}}>
              <span style={{fontSize:22, transition:'transform 0.2s', transform:activePage===page?'scale(1.15)':'scale(1)'}}>{icon}</span>
              <span style={{fontSize:10, fontWeight:activePage===page?600:400}}>{label}</span>
              {activePage===page && <div style={{width:4, height:4, background:S.green, borderRadius:'50%', animation:'pulse 2s infinite'}} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
