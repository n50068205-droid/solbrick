import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './supabase';
import './App.css';

const PROJECTS = [
  { id: 1, name: "ЖК Алтын Орда", location: "Шымкент", totalShares: 1000, soldShares: 340, pricePerShare: 50, roi: "12.4%", roiNum: 12.4, image: "🏗️", tag: "Жилой", color: "#00C896", desc: "Современный жилой комплекс в центре Шымкента. 24 этажа, 480 квартир.", area: "45,000 м²", completion: "Q4 2026", photos: ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80","https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&q=80"] },
  { id: 2, name: "Бизнес-центр Нур Плаза", location: "Алматы", totalShares: 500, soldShares: 420, pricePerShare: 100, roi: "18.2%", roiNum: 18.2, image: "🏢", tag: "Коммерческий", color: "#FF6B35", desc: "Премиальный бизнес-центр класса A в деловом районе Алматы.", area: "28,000 м²", completion: "Q2 2026", photos: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80","https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80","https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"] },
  { id: 3, name: "Торговый комплекс Сайрам", location: "Шымкент", totalShares: 2000, soldShares: 800, pricePerShare: 25, roi: "9.8%", roiNum: 9.8, image: "🏬", tag: "Торговый", color: "#4A9EFF", desc: "Крупный торгово-развлекательный центр на юге Казахстана.", area: "62,000 м²", completion: "Q1 2027", photos: ["https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&q=80","https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80","https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"] },
  { id: 4, name: "Жилой квартал Астана Парк", location: "Астана", totalShares: 1500, soldShares: 200, pricePerShare: 75, roi: "15.1%", roiNum: 15.1, image: "🏙️", tag: "Жилой", color: "#A78BFA", desc: "Элитный жилой квартал рядом с Байтереком.", area: "80,000 м²", completion: "Q3 2027", photos: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80","https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80","https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80"] },
  { id: 5, name: "Гостиница Silk Road", location: "Туркестан", totalShares: 800, soldShares: 560, pricePerShare: 60, roi: "22.5%", roiNum: 22.5, image: "🏨", tag: "Отель", color: "#F59E0B", desc: "5-звёздочный отель у мавзолея Ходжа Ахмета Яссауи.", area: "18,000 м²", completion: "Q2 2026", photos: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80","https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80"] },
  { id: 6, name: "Логистический центр KazHub", location: "Алматы", totalShares: 3000, soldShares: 450, pricePerShare: 20, roi: "11.3%", roiNum: 11.3, image: "🏭", tag: "Склад", color: "#EC4899", desc: "Современный логистический хаб у международного аэропорта Алматы.", area: "120,000 м²", completion: "Q4 2026", photos: ["https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80","https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80","https://images.unsplash.com/photo-1565891741441-64926e3838b0?w=600&q=80"] },
  { id: 7, name: "Апарт-отель Caspian View", location: "Актау", totalShares: 600, soldShares: 180, pricePerShare: 80, roi: "16.7%", roiNum: 16.7, image: "🌊", tag: "Отель", color: "#06B6D4", desc: "Апарт-отель с видом на Каспийское море.", area: "12,000 м²", completion: "Q1 2027", photos: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"] },
  { id: 8, name: "ЖК Семей Хайтс", location: "Семей", totalShares: 1200, soldShares: 90, pricePerShare: 35, roi: "10.5%", roiNum: 10.5, image: "🏠", tag: "Жилой", color: "#84CC16", desc: "Современный жилой комплекс на берегу Иртыша. 16 этажей.", area: "38,000 м²", completion: "Q2 2027", photos: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80","https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"] },
  { id: 9, name: "Медицинский центр MedCity", location: "Астана", totalShares: 900, soldShares: 630, pricePerShare: 90, roi: "20.1%", roiNum: 20.1, image: "🏥", tag: "Коммерческий", color: "#F43F5E", desc: "Многопрофильный медицинский центр европейского уровня.", area: "22,000 м²", completion: "Q3 2026", photos: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80","https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80","https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80"] },
];

const TICKER = [
  {name:"ЖК Алтын Орда",price:"$50.00",change:"+2.4%"},{name:"Нур Плаза",price:"$100.00",change:"+5.1%"},
  {name:"Сайрам ТЦ",price:"$25.00",change:"-0.8%"},{name:"Астана Парк",price:"$75.00",change:"+8.2%"},
  {name:"Silk Road",price:"$60.00",change:"+12.5%"},{name:"KazHub",price:"$20.00",change:"+1.3%"},
  {name:"SOL/USD",price:"$142.50",change:"+3.2%"},{name:"Caspian View",price:"$80.00",change:"+6.1%"},
  {name:"MedCity",price:"$90.00",change:"+9.3%"},
];

type Page = 'home'|'portfolio'|'calculator'|'transactions'|'map';
interface ChatMsg { id:number; text:string; from:'user'|'bot'; time:string; }

const S = {
  bg:'#0a0e17', bg2:'#0f1520', bg3:'#080c14',
  bg4:'#131927',
  border:'#1a2235', border2:'#111827',
  text:'#e2e8f0', text2:'#8892a4', text3:'#4a5568',
  green:'#00D4A0', red:'#FF4757', blue:'#3B82F6',
  yellow:'#F59E0B', purple:'#8B5CF6',
};

function App() {
  const [assets, setAssets] = useState(PROJECTS);
  const [wallet, setWallet] = useState<string|null>(null);
  const [solBalance, setSolBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(10000);
  const [message, setMessage] = useState('');
  const [activePage, setActivePage] = useState<Page>('home');
  const [portfolio, setPortfolio] = useState<{[k:number]:number}>({});
  const [expandedCard, setExpandedCard] = useState<number|null>(null);
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState({projects:0,volume:0,investors:0,roi:0});
  const [filterTag, setFilterTag] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState<{project:any,amount:number}|null>(null);
  const [buyAmount, setBuyAmount] = useState(1);
  const [txPending, setTxPending] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [calcAmount, setCalcAmount] = useState(1000);
  const [calcYears, setCalcYears] = useState(3);
  const [calcRoi, setCalcRoi] = useState(12);
  const [photoModal, setPhotoModal] = useState<{project:any,idx:number}|null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardStep, setOnboardStep] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    {id:1, text:'Привет! 👋 Я SolBrick AI Assistant. Спросите меня о проектах, инвестициях или Solana!', from:'bot', time:new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatTyping, setChatTyping] = useState(false);
  const [unreadChat, setUnreadChat] = useState(1);
  const [aiRecommendation, setAiRecommendation] = useState<{project:any,reason:string}|null>(null);
  const [aiRecommendation, setAiRecommendation] = useState<{project:any,reason:string}|null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    let step = 0;
    const t = setInterval(() => {
      step++; const p = step/60;
      setCounter({projects:Math.round(9*p),volume:Math.round(284*p),investors:Math.round(4120*p),roi:Math.round(148*p)/10});
      if (step>=60) clearInterval(t);
    }, 2000/60);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({behavior:'smooth'}); }, [chatMessages]);


  useEffect(() => { if (chatOpen) setUnreadChat(0); }, [chatOpen]);

  const showMsg = (msg:string) => { setMessage(msg); setTimeout(()=>setMessage(''),4000); };

  const connectWallet = async () => {
    try {
      const {solana} = window as any;
      if (solana?.isPhantom) {
        const r = await solana.connect();
        const pubkey = r.publicKey.toString();
        setWallet(pubkey);
        showMsg('✅ Кошелёк подключён!');
        supabase.from('visits').insert({wallet: pubkey}).then(() => {});
        try {
          const { Connection, PublicKey, clusterApiUrl } = await import('@solana/web3.js');
          const conn = new Connection(clusterApiUrl('devnet'), 'confirmed');
          const bal = await conn.getBalance(new PublicKey(pubkey));
          setSolBalance(bal / 1e9);
          const sigs = await conn.getSignaturesForAddress(new PublicKey(pubkey), {limit:10});
          const realTxs = sigs.map((sig,i) => ({
            id: i, project: 'On-chain транзакция', amount: 1, cost: 0,
            date: sig.blockTime ? new Date(sig.blockTime*1000).toLocaleString('ru-RU') : 'Недавно',
            hash: sig.signature.slice(0,8).toUpperCase(), onchain: true
          }));
          if (realTxs.length > 0) setTransactions(realTxs);
        } catch { setSolBalance(0); }
      } else showMsg('❌ Установите Phantom Wallet!');
    } catch { showMsg('❌ Ошибка подключения'); }
  };

  const openModal = (project:any, amount:number, e?:any) => {
    if (e) e.stopPropagation();
    if (!wallet) { showMsg('❌ Сначала подключите кошелёк!'); return; }
    setBuyAmount(amount);
    setModal({project,amount});
  };

  const confirmBuy = async () => {
    if (!modal) return;
    const m = modal;
    setTxPending(true);
    await new Promise(r=>setTimeout(r,2000));
    const cost = buyAmount * m.project.pricePerShare;
    setAssets(prev=>prev.map(a=>a.id===m.project.id?{...a,soldShares:a.soldShares+buyAmount}:a));
    setPortfolio(prev=>({...prev,[m.project.id]:(prev[m.project.id]||0)+buyAmount}));
    setSolBalance(prev=>Math.max(0,prev-0.001));
    setUsdBalance(prev=>Math.max(0,prev-cost));
    setTransactions(prev=>[{id:Date.now(),project:m.project.name,amount:buyAmount,cost,date:new Date().toLocaleString('ru-RU'),hash:'0x'+Math.random().toString(16).slice(2,10).toUpperCase()},...prev]);
    setTxPending(false);
    setModal(null);
    showMsg(`✅ Куплено ${buyAmount} доля в "${m.project.name}"`);
    supabase.from('purchases').insert({wallet: wallet, project_name: m.project.name, amount: m.amount, cost: cost}).then(() => {});
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg:ChatMsg = {id:Date.now(), text:chatInput, from:'user', time:new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})};
    setChatMessages(prev=>[...prev,userMsg]);
    const userInput = chatInput;
    const q = chatInput.toLowerCase();
    setChatInput('');
    setChatTyping(true);
    let response = '';
    let recommendedProject = null;
    try {
      const projectList = assets.map(a=>`${a.name} (${a.location}, $${a.pricePerShare}/доля, ROI ${a.roi}, ${Math.round(a.soldShares/a.totalShares*100)}% продано)`).join('\n');
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:800,
          system:`Ты AI инвестиционный агент платформы SolBrick — токенизация недвижимости Казахстана на Solana блокчейне.
Доступные проекты:
${projectList}

ВАЖНО: Если пользователь спрашивает про инвестиции, куда вложить, рекомендацию — обязательно порекомендуй ОДИН конкретный проект.
В конце ответа добавь строку: RECOMMEND:название_проекта
Например: RECOMMEND:Бизнес-центр Нур Плаза

Отвечай кратко (3-5 предложений), используй эмодзи, отвечай на языке пользователя.`,
          messages:[{role:'user',content:userInput}]
        })
      });
      const data = await res.json();
      if (data.content?.[0]?.text) {
        const fullText = data.content[0].text;
        const recommendMatch = fullText.match(/RECOMMEND:(.+)/);
        if (recommendMatch) {
          const projectName = recommendMatch[1].trim();
          recommendedProject = assets.find(a => a.name.includes(projectName.split(' ')[0])) || null;
          response = fullText.replace(/RECOMMEND:.+/, '').trim();
          if (recommendedProject) {
            setAiRecommendation({project: recommendedProject, reason: response});
          }
        } else {
          response = fullText;
        }
      }
    } catch {}
    if (!response) {
      await new Promise(r=>setTimeout(r,600));
      if (q.includes('привет')||q.includes('салем')) response='Сәлем! 👋 Я SolBrick AI Assistant. Помогу с инвестициями в недвижимость Казахстана на Solana!';
      else if (q.includes('купить')) response='💰 Как купить долю:\n1️⃣ Подключите Phantom Wallet\n2️⃣ Выберите проект\n3️⃣ Нажмите "Купить долю"\n✅ Доля в Solana блокчейне!';
      else if (q.includes('roi')||q.includes('доходность')) response='📈 Лучший ROI:\n🥇 Silk Road — 22.5%\n🥈 MedCity — 20.1%\n🥉 Нур Плаза — 18.2%\nСредний: 14.8% годовых';
      else if (q.includes('минимум')) response='💵 Минимум $20 (KazHub)! Даже $20 = реальная доля в объекте 🎉';
      else response='🤔 Спросите о проектах, ROI или Solana!\nПоддержка: support@solbrick.kz 📧';
    }
    setChatTyping(false);
    setChatMessages(prev=>[...prev,{id:Date.now()+1,text:response,from:'bot',time:new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}]);
    if (!chatOpen) setUnreadChat(n=>n+1);
  };

  const tags = ['Все','Жилой','Коммерческий','Торговый','Отель','Склад'];
  const filtered = assets.filter(a=>filterTag==='Все'||a.tag===filterTag).filter(a=>a.name.toLowerCase().includes(searchQuery.toLowerCase())||a.location.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPortfolio = Object.entries(portfolio).reduce((sum,[id,shares])=>{const p=assets.find(a=>a.id===parseInt(id));return sum+(p?shares*p.pricePerShare:0);},0);
  const calcResult = calcAmount * Math.pow(1+calcRoi/100, calcYears);

  const onboardSteps = [
    {icon:'🏗️',title:'Добро пожаловать в SolBrick',desc:'Первая платформа токенизации недвижимости Казахстана на Solana'},
    {icon:'💰',title:'Инвестируй от $20',desc:'Покупай доли в реальных проектах через смарт-контракт'},
    {icon:'📈',title:'Получай доход',desc:'Средний ROI 14.8% годовых. Прозрачно on-chain.'},
    {icon:'🔗',title:'Подключи Phantom Wallet',desc:'Все транзакции записываются в Solana блокчейн'},
  ];

  if (!wallet && !showOnboarding && wallet !== 'guest') return (
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:S.bg,minHeight:'100vh',color:S.text,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <style>{`@keyframes fi{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes p2{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
      <div style={{maxWidth:420,width:'100%',animation:'fi 0.5s ease',textAlign:'center'}}>
        <div style={{width:80,height:80,background:`linear-gradient(135deg,${S.green},#0099CC)`,borderRadius:22,display:'flex',alignItems:'center',justifyContent:'center',fontSize:40,margin:'0 auto 16px',boxShadow:`0 8px 32px ${S.green}40`,animation:'p2 3s ease-in-out infinite'}}>🏗</div>
        <div style={{fontSize:28,fontWeight:700,marginBottom:4}}>SolBrick</div>
        <div style={{fontSize:13,color:S.text3,marginBottom:32,letterSpacing:1}}>TOKENIZED REAL ESTATE ON SOLANA</div>
        <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:16,padding:28,marginBottom:16}}>
          <div style={{fontSize:16,fontWeight:600,marginBottom:8}}>Войти через Phantom Wallet</div>
          <p style={{color:S.text2,fontSize:13,lineHeight:1.7,marginBottom:20}}>Подключите Phantom Wallet чтобы начать инвестировать в недвижимость Казахстана от $20</p>
          <button onClick={connectWallet}
            style={{width:'100%',background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:'14px',borderRadius:10,cursor:'pointer',fontSize:15,fontWeight:700,boxShadow:`0 4px 20px ${S.green}40`,marginBottom:12}}>
            🔗 Подключить Phantom Wallet
          </button>
          <a href="https://phantom.app" target="_blank" rel="noreferrer"
            style={{display:'block',width:'100%',background:'#4B44AA',color:'white',border:'none',padding:'13px',borderRadius:10,cursor:'pointer',fontSize:14,fontWeight:600,textAlign:'center',textDecoration:'none',marginBottom:8}}>
            👻 Скачать Phantom Wallet
          </a>
          <button onClick={()=>{setShowOnboarding(false);setWallet('guest');}}
            style={{width:'100%',background:'transparent',color:S.text2,border:`1px solid ${S.border}`,padding:'12px',borderRadius:10,cursor:'pointer',fontSize:13}}>
            Продолжить без кошелька 👀
          </button>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:20,fontSize:12,color:S.text3}}>
          <span>✅ Безопасно</span>
          <span>⚡ Solana Devnet</span>
          <span>🔒 Без паролей</span>
        </div>
        {message&&<div style={{marginTop:16,padding:'10px 20px',background:message.includes('✅')?'#0d2d1e':'#2d1515',border:`1px solid ${message.includes('✅')?S.green+'40':S.red+'40'}`,borderRadius:8,fontSize:13,color:message.includes('✅')?S.green:S.red}}>{message}</div>}
      </div>
    </div>
  );

  if (showOnboarding) return (
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:S.bg,minHeight:'100vh',color:S.text,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <style>{`@keyframes fi{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes p2{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
      <div style={{maxWidth:400,width:'100%',animation:'fi 0.5s ease'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:80,height:80,background:`linear-gradient(135deg,${S.green},#0099CC)`,borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',fontSize:40,margin:'0 auto 16px',boxShadow:`0 12px 40px ${S.green}50`,animation:'p2 3s ease-in-out infinite'}}>🏗️</div>
          <div style={{fontSize:26,fontWeight:800,letterSpacing:-0.5}}>SolBrick</div>
          <div style={{fontSize:11,color:S.green,marginTop:4,letterSpacing:2,fontWeight:600}}>POWERED BY SOLANA</div>
        </div>
        <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:16,padding:28,textAlign:'center',marginBottom:16}}>
          <div style={{fontSize:52,marginBottom:14}}>{onboardSteps[onboardStep].icon}</div>
          <h2 style={{margin:'0 0 10px',fontSize:18,fontWeight:600}}>{onboardSteps[onboardStep].title}</h2>
          <p style={{color:S.text2,fontSize:14,lineHeight:1.7,margin:0}}>{onboardSteps[onboardStep].desc}</p>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:16}}>
          {onboardSteps.map((_,i)=><div key={i} style={{width:i===onboardStep?24:6,height:6,background:i===onboardStep?S.green:S.border,borderRadius:3,transition:'all 0.4s'}}/>)}
        </div>
        <button onClick={()=>onboardStep<onboardSteps.length-1?setOnboardStep(s=>s+1):setShowOnboarding(false)}
          style={{width:'100%',background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:'16px',borderRadius:12,cursor:'pointer',fontSize:15,fontWeight:800,marginBottom:8,boxShadow:`0 6px 24px ${S.green}50`,letterSpacing:0.3}}>
          {onboardStep<onboardSteps.length-1?'Далее →':'🚀 Начать инвестировать'}
        </button>
        <button onClick={()=>setShowOnboarding(false)} style={{width:'100%',background:'transparent',color:S.text3,border:'none',padding:'10px',cursor:'pointer',fontSize:13}}>Пропустить</button>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:S.bg,minHeight:'100vh',color:S.text,width:'100%',overflowX:'hidden'}}>
      <style>{`
        *{box-sizing:border-box;}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes modalIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 8px #00C89640}50%{box-shadow:0 0 20px #00C89680}}
        @keyframes bounce{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
        .card{transition:all 0.3s cubic-bezier(0.4,0,0.2,1);cursor:pointer;}
        .card:hover{transform:translateY(-3px);background:#1e2330!important;box-shadow:0 8px 32px rgba(0,200,150,0.1)!important;}
        .card.expanded{border-color:#00C896!important;}
        .btn{transition:all 0.2s ease;cursor:pointer;}
        .btn:hover{opacity:0.88;transform:scale(1.02);}
        .btn:active{transform:scale(0.97);}
        input:focus,select:focus{outline:none;border-color:#00C896!important;}
        input[type=range]{accent-color:#00C896;width:100%;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#1a1f2e;}
        ::-webkit-scrollbar-thumb{background:#3a3f4e;border-radius:2px;}
        img{transition:transform 0.3s ease;}
      `}</style>

      {/* Ticker */}
      <div style={{background:S.bg3,borderBottom:`1px solid ${S.border}`,height:28,overflow:'hidden'}}>
        <div style={{display:'flex',animation:'ticker 50s linear infinite',width:'max-content',height:'100%',alignItems:'center'}}>
          {[...TICKER,...TICKER].map((item,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:6,padding:'0 16px',whiteSpace:'nowrap',borderRight:`1px solid ${S.border2}`}}>
              <span style={{color:S.text2,fontSize:11}}>{item.name}</span>
              <span style={{color:S.text,fontSize:11,fontWeight:600,fontFamily:'monospace'}}>{item.price}</span>
              <span style={{color:item.change.startsWith('+')?S.green:S.red,fontSize:10,fontWeight:600}}>{item.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header style={{background:S.bg2,borderBottom:`1px solid ${S.border}`,padding:`0 ${isMobile?'12px':'32px'}`,display:'flex',alignItems:'center',justifyContent:'space-between',height:52,position:'sticky',top:0,zIndex:100,backdropFilter:'blur(20px)'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:32,height:32,background:`linear-gradient(135deg,${S.green},#0099CC)`,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,boxShadow:`0 0 12px ${S.green}40`}}>🏗</div>
          <span style={{fontSize:16,fontWeight:700}}>SolBrick</span>
          <span style={{background:S.bg3,color:S.green,fontSize:9,padding:'2px 6px',borderRadius:4,border:`1px solid ${S.green}30`,fontWeight:700,letterSpacing:1,animation:'glow 3s ease-in-out infinite'}}>DEVNET</span>
        </div>
        {!isMobile&&(
          <nav style={{display:'flex',gap:2}}>
            {[['home','Проекты'],['portfolio','Портфель'],['calculator','Калькулятор'],['transactions','История'],['map','🗺 Карта']].map(([page,label])=>(
              <button key={page} onClick={()=>setActivePage(page as Page)}
                style={{background:'transparent',border:'none',color:activePage===page?S.green:S.text2,padding:'6px 14px',borderRadius:6,cursor:'pointer',fontSize:13,fontWeight:activePage===page?600:400,borderBottom:activePage===page?`2px solid ${S.green}`:'2px solid transparent'}}>
                {label}
              </button>
            ))}
          </nav>
        )}
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {wallet&&!isMobile&&<div style={{background:S.bg3,border:`1px solid ${S.border}`,padding:'5px 10px',borderRadius:8,fontSize:12,color:S.text2}}>◎ {solBalance.toFixed(3)}</div>}
          {wallet?(
            <div style={{display:'flex',alignItems:'center',gap:5,background:'#0d2d1e',border:`1px solid ${S.green}40`,padding:'5px 10px',borderRadius:8}}>
              <div style={{width:6,height:6,background:S.green,borderRadius:'50%',animation:'pulse 2s infinite'}}/>
              <span style={{color:S.green,fontSize:isMobile?11:12,fontWeight:600}}>{wallet.slice(0,4)}...{wallet.slice(-4)}</span>
            </div>
          ):(
            <button onClick={connectWallet} className="btn"
              style={{background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:`7px ${isMobile?'10px':'16px'}`,borderRadius:8,fontSize:isMobile?12:13,fontWeight:700,whiteSpace:'nowrap',boxShadow:`0 4px 12px ${S.green}30`}}>
              {isMobile?'🔗':'🔗 Подключить'}
            </button>
          )}
        </div>
      </header>

      {/* Chat */}
      <div style={{position:'fixed',bottom:isMobile?80:24,right:isMobile?12:24,zIndex:300}}>
        {chatOpen&&(
          <div style={{position:'absolute',bottom:60,right:0,width:isMobile?'calc(100vw - 24px)':'340px',maxHeight:480,background:S.bg2,border:`1px solid ${S.border}`,borderRadius:16,overflow:'hidden',boxShadow:'0 20px 60px rgba(0,0,0,0.5)',animation:'slideIn 0.3s ease',display:'flex',flexDirection:'column'}}>
            <div style={{background:`linear-gradient(135deg,${S.green}20,#0099CC20)`,borderBottom:`1px solid ${S.border}`,padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:36,height:36,background:`linear-gradient(135deg,${S.green},#0099CC)`,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>🤖</div>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>SolBrick AI Assistant</div>
                  <div style={{fontSize:11,color:S.green,display:'flex',alignItems:'center',gap:4}}>
                    <div style={{width:5,height:5,background:S.green,borderRadius:'50%',animation:'pulse 2s infinite'}}/>Claude AI · Онлайн
                  </div>
                </div>
              </div>
              <button onClick={()=>setChatOpen(false)} style={{background:'transparent',border:'none',color:S.text2,cursor:'pointer',fontSize:16,padding:4}}>✕</button>
            </div>
            <div style={{flex:1,overflowY:'auto',padding:'12px',display:'flex',flexDirection:'column',gap:10,maxHeight:300}}>
              {chatMessages.map(msg=>(
                <div key={msg.id} style={{display:'flex',flexDirection:msg.from==='user'?'row-reverse':'row',gap:8,animation:'msgIn 0.3s ease'}}>
                  {msg.from==='bot'&&<div style={{width:28,height:28,background:`linear-gradient(135deg,${S.green},#0099CC)`,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>🤖</div>}
                  <div style={{maxWidth:'78%'}}>
                    <div style={{background:msg.from==='user'?`linear-gradient(135deg,${S.green}30,#0099CC20)`:S.bg3,border:`1px solid ${msg.from==='user'?S.green+'30':S.border}`,borderRadius:msg.from==='user'?'12px 4px 12px 12px':'4px 12px 12px 12px',padding:'8px 12px',fontSize:13,lineHeight:1.5,color:S.text,whiteSpace:'pre-line'}}>
                      {msg.text}
                    </div>
                    <div style={{fontSize:10,color:S.text3,marginTop:3,textAlign:msg.from==='user'?'right':'left'}}>{msg.time}</div>
                  </div>
                </div>
              ))}
              {chatTyping&&(
                <div style={{display:'flex',gap:8}}>
                  <div style={{width:28,height:28,background:`linear-gradient(135deg,${S.green},#0099CC)`,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🤖</div>
                  <div style={{background:S.bg3,border:`1px solid ${S.border}`,borderRadius:'4px 12px 12px 12px',padding:'10px 16px',display:'flex',gap:4,alignItems:'center'}}>
                    {[0,1,2].map(i=><div key={i} style={{width:6,height:6,background:S.text3,borderRadius:'50%',animation:`pulse 1s ease-in-out ${i*0.2}s infinite`}}/>)}
                  </div>
                </div>
              )}
              {aiRecommendation&&(
                <div style={{background:'linear-gradient(135deg,#0d2d1e,#0a1f15)',border:`1px solid #00C89640`,borderRadius:12,padding:12,animation:'msgIn 0.3s ease'}}>
                  <div style={{fontSize:11,color:'#00C896',fontWeight:700,marginBottom:8}}>🤖 AI РЕКОМЕНДАЦИЯ</div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                    <img src={aiRecommendation.project.photos[0]} alt="" style={{width:48,height:36,borderRadius:6,objectFit:'cover'}}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:600}}>{aiRecommendation.project.name}</div>
                      <div style={{fontSize:11,color:'#00C896'}}>ROI {aiRecommendation.project.roi} · ${aiRecommendation.project.pricePerShare}/доля</div>
                    </div>
                  </div>
                  <button onClick={()=>{setAiRecommendation(null);openModal(aiRecommendation.project,1);setChatOpen(false);}}
                    style={{width:'100%',background:'linear-gradient(135deg,#00C896,#0099CC)',color:'#0d1117',border:'none',padding:'8px',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer'}}>
                    ⚡ Купить по рекомендации AI → on-chain
                  </button>
                </div>
              )}
              {aiRecommendation&&(
                <div style={{background:'linear-gradient(135deg,#0d2d1e,#0a1f15)',border:`1px solid #00C89640`,borderRadius:12,padding:12,animation:'msgIn 0.3s ease'}}>
                  <div style={{fontSize:11,color:'#00C896',fontWeight:700,marginBottom:8}}>🤖 AI РЕКОМЕНДАЦИЯ</div>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                    <img src={aiRecommendation.project.photos[0]} alt="" style={{width:48,height:36,borderRadius:6,objectFit:'cover'}}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:600}}>{aiRecommendation.project.name}</div>
                      <div style={{fontSize:11,color:'#00C896'}}>ROI {aiRecommendation.project.roi} · ${aiRecommendation.project.pricePerShare}/доля</div>
                    </div>
                  </div>
                  <button onClick={()=>{setAiRecommendation(null);openModal(aiRecommendation.project,1);setChatOpen(false);}}
                    style={{width:'100%',background:'linear-gradient(135deg,#00C896,#0099CC)',color:'#0d1117',border:'none',padding:'8px',borderRadius:8,fontSize:12,fontWeight:700,cursor:'pointer'}}>
                    ⚡ Купить по рекомендации AI → on-chain
                  </button>
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>
            <div style={{padding:'8px 12px',borderTop:`1px solid ${S.border2}`,display:'flex',gap:6,flexWrap:'wrap'}}>
              {['Как купить?','Лучший ROI?','Минимум?'].map(q=>(
                <button key={q} onClick={()=>setChatInput(q)}
                  style={{background:S.bg3,border:`1px solid ${S.border}`,color:S.text2,padding:'4px 10px',borderRadius:20,fontSize:11,cursor:'pointer',transition:'all 0.15s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=S.green;e.currentTarget.style.color=S.green;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=S.border;e.currentTarget.style.color=S.text2;}}>
                  {q}
                </button>
              ))}
            </div>
            <div style={{padding:'10px 12px',borderTop:`1px solid ${S.border}`,display:'flex',gap:8}}>
              <input type="text" placeholder="Спросите Claude AI..." value={chatInput} onChange={e=>setChatInput(e.target.value)}
                onKeyPress={e=>e.key==='Enter'&&sendChat()}
                style={{flex:1,background:S.bg3,border:`1px solid ${S.border}`,borderRadius:8,padding:'8px 12px',color:S.text,fontSize:13}}/>
              <button onClick={sendChat} className="btn"
                style={{background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:'8px 14px',borderRadius:8,fontSize:16,fontWeight:700}}>➤</button>
            </div>
          </div>
        )}
        <button onClick={()=>setChatOpen(!chatOpen)} className="btn"
          style={{width:52,height:52,background:`linear-gradient(135deg,${S.green},#0099CC)`,border:'none',borderRadius:'50%',cursor:'pointer',fontSize:24,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 20px ${S.green}50`,position:'relative',animation:'bounce 3s ease-in-out infinite'}}>
          {chatOpen?'✕':'💬'}
          {unreadChat>0&&!chatOpen&&(
            <div style={{position:'absolute',top:-2,right:-2,width:18,height:18,background:S.red,borderRadius:'50%',fontSize:10,fontWeight:700,color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>{unreadChat}</div>
          )}
        </button>
      </div>

      {/* Photo Modal */}
      {photoModal&&(
        <div style={{position:'fixed',inset:0,zIndex:2000,background:'rgba(0,0,0,0.92)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:isMobile?12:20,animation:'fadeUp 0.2s ease'}}
          onClick={()=>setPhotoModal(null)}>
          <div style={{width:'100%',maxWidth:800}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:20}}>{photoModal.project.image}</span>
                <span style={{fontSize:14,fontWeight:600}}>{photoModal.project.name}</span>
              </div>
              <button onClick={()=>setPhotoModal(null)} style={{background:'transparent',border:`1px solid ${S.border}`,color:S.text2,padding:'4px 10px',borderRadius:6,cursor:'pointer',fontSize:12}}>✕ Закрыть</button>
            </div>
            <div style={{borderRadius:12,overflow:'hidden',marginBottom:10,position:'relative'}}>
              <img src={photoModal.project.photos[photoModal.idx]} alt="" style={{width:'100%',height:isMobile?220:400,objectFit:'cover',display:'block'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(0,0,0,0.6))',padding:'20px 16px 12px'}}>
                <span style={{background:photoModal.project.color,color:'#0d1117',fontSize:11,padding:'3px 10px',borderRadius:4,fontWeight:700}}>{photoModal.project.tag}</span>
                <span style={{background:'#0d2d1e',color:S.green,fontSize:11,padding:'3px 10px',borderRadius:4,fontWeight:700,marginLeft:6}}>ROI {photoModal.project.roi}</span>
              </div>
              {photoModal.idx>0&&<button onClick={()=>setPhotoModal(p=>p?{...p,idx:p.idx-1}:null)} style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',background:'rgba(0,0,0,0.7)',border:'none',color:'white',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:18}}>‹</button>}
              {photoModal.idx<photoModal.project.photos.length-1&&<button onClick={()=>setPhotoModal(p=>p?{...p,idx:p.idx+1}:null)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'rgba(0,0,0,0.7)',border:'none',color:'white',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:18}}>›</button>}
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:12}}>
              {photoModal.project.photos.map((ph:string,i:number)=>(
                <img key={i} src={ph} alt="" onClick={()=>setPhotoModal(p=>p?{...p,idx:i}:null)}
                  style={{width:64,height:46,objectFit:'cover',borderRadius:6,border:`2px solid ${i===photoModal.idx?S.green:S.border}`,cursor:'pointer',opacity:i===photoModal.idx?1:0.6,transition:'all 0.2s'}}/>
              ))}
            </div>
            <button onClick={(e)=>{setPhotoModal(null);openModal(photoModal.project,1,e);}} className="btn"
              style={{width:'100%',background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:'12px',borderRadius:8,fontSize:14,fontWeight:700}}>
              💰 Купить долю · ${photoModal.project.pricePerShare}
            </button>
          </div>
        </div>
      )}

      {/* Buy Modal */}
      {modal&&(
        <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,0.75)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}
          onClick={()=>!txPending&&setModal(null)}>
          <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:16,padding:24,width:'100%',maxWidth:380,animation:'modalIn 0.3s ease',boxShadow:'0 20px 60px rgba(0,0,0,0.5)'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16,paddingBottom:12,borderBottom:`1px solid ${S.border}`}}>
              <span style={{fontSize:30}}>{modal.project.image}</span>
              <div>
                <div style={{fontSize:14,fontWeight:600}}>Подтвердить покупку</div>
                <div style={{fontSize:11,color:S.text2}}>On-chain · Solana Devnet</div>
              </div>
            </div>
            <div style={{marginBottom:16,paddingBottom:12,borderBottom:`1px solid ${S.border2}`}}>
              <div style={{fontSize:12,color:S.text2,marginBottom:8}}>Количество долей:</div>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <button onClick={()=>setBuyAmount(Math.max(1,buyAmount-1))} className="btn"
                  style={{width:36,height:36,background:S.bg3,border:`1px solid ${S.border}`,color:S.text,borderRadius:8,fontSize:20,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
                <div style={{flex:1,textAlign:'center'}}>
                  <div style={{fontSize:24,fontWeight:700,color:S.green,fontFamily:'monospace'}}>{buyAmount}</div>
                  <div style={{fontSize:11,color:S.text3}}>долей</div>
                </div>
                <button onClick={()=>setBuyAmount(Math.min(100,buyAmount+1))} className="btn"
                  style={{width:36,height:36,background:S.bg3,border:`1px solid ${S.border}`,color:S.text,borderRadius:8,fontSize:20,display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
              </div>
              <input type="range" min="1" max="100" value={buyAmount} onChange={e=>setBuyAmount(Number(e.target.value))}
                style={{width:'100%',marginTop:10}}/>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:S.text3,marginTop:4}}>
                <span>1 доля</span><span>100 долей</span>
              </div>
            </div>
            {[['Проект',modal.project.name],['Количество',`${buyAmount} доля`],['Цена',`$${modal.project.pricePerShare}`],['Итого',`$${buyAmount*modal.project.pricePerShare}`],['Комиссия','~0.001 SOL']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:`1px solid ${S.border2}`,fontSize:13}}>
                <span style={{color:S.text2}}>{k}</span>
                <span style={{color:k==='Итого'?S.green:S.text,fontWeight:k==='Итого'?700:400}}>{v}</span>
              </div>
            ))}
            <div style={{background:'#0d2d1e',border:`1px solid ${S.green}30`,borderRadius:8,padding:'8px 12px',margin:'12px 0',fontSize:12,color:S.green}}>
              ⚡ Запись в Solana блокчейн навсегда
            </div>
            <button onClick={confirmBuy} disabled={txPending} className="btn"
              style={{width:'100%',background:txPending?S.border:`linear-gradient(135deg,${S.green},#0099CC)`,color:txPending?S.text2:S.bg3,border:'none',padding:'12px',borderRadius:8,fontSize:14,fontWeight:700,marginBottom:8,display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
              {txPending?<><div style={{width:14,height:14,border:`2px solid ${S.text2}`,borderTopColor:S.text,borderRadius:'50%',animation:'spin 0.8s linear infinite'}}/>Обработка...</>:`✅ Подтвердить · $${buyAmount*modal.project.pricePerShare}`}
            </button>
            {!txPending&&<button onClick={()=>setModal(null)} style={{width:'100%',background:'transparent',color:S.text2,border:`1px solid ${S.border}`,padding:'10px',borderRadius:8,cursor:'pointer',fontSize:13}}>Отмена</button>}
          </div>
        </div>
      )}

      {/* Toast */}
      {message&&(
        <div style={{position:'fixed',top:64,left:'50%',transform:'translateX(-50%)',zIndex:500,background:message.includes('✅')?'#0d2d1e':'#2d1515',border:`1px solid ${message.includes('✅')?S.green+'40':S.red+'40'}`,borderRadius:10,padding:'10px 20px',fontSize:13,color:message.includes('✅')?S.green:S.red,whiteSpace:'nowrap',animation:'fadeUp 0.3s ease',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
          {message}
        </div>
      )}

      <main style={{maxWidth:1280,margin:'0 auto',padding:isMobile?'12px 12px 80px':'24px 32px'}}>

        {/* HOME */}
        {activePage==='home'&&(
          <div style={{animation:'fadeUp 0.4s ease'}}>
            <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:14,padding:isMobile?'16px':'20px 28px',marginBottom:16,position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:-40,right:-40,width:200,height:200,background:`radial-gradient(circle,${S.green}15,transparent)`,borderRadius:'50%',pointerEvents:'none'}}/>
              <div style={{fontSize:11,color:S.green,fontWeight:600,letterSpacing:1,textTransform:'uppercase',marginBottom:6}}>🚀 Solana Devnet · Anchor Protocol</div>
              <h1 style={{fontSize:isMobile?20:26,fontWeight:700,margin:'0 0 6px',background:`linear-gradient(135deg,${S.text},${S.green})`,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                Инвестируй в недвижимость от $20
              </h1>
              <p style={{color:S.text2,fontSize:13,margin:'0 0 16px'}}>Токенизированные проекты Казахстана на блокчейне</p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,marginBottom:isMobile?0:16}}>
                {[{l:'Проектов',v:counter.projects,c:S.green,i:'🏗'},{l:'Объём',v:`$${counter.volume}K`,c:S.blue,i:'💰'},{l:'Инвесторов',v:`${counter.investors.toLocaleString()}+`,c:'#A78BFA',i:'👥'},{l:'Avg ROI',v:`${counter.roi}%`,c:'#F59E0B',i:'📈'}].map((s,i)=>(
                  <div key={i} style={{background:S.bg3,border:`1px solid ${S.border}`,borderRadius:10,padding:'12px 14px',display:'flex',alignItems:'center',gap:10,transition:'all 0.2s'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=s.c}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
                    <span style={{fontSize:22}}>{s.i}</span>
                    <div>
                      <div style={{fontSize:18,fontWeight:700,color:s.c,fontFamily:'monospace'}}>{s.v}</div>
                      <div style={{fontSize:10,color:S.text3,textTransform:'uppercase',letterSpacing:0.5}}>{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{position:'relative',marginBottom:10}}>
              <span style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:S.text3,fontSize:14}}>⌕</span>
              <input type="text" placeholder="Поиск по названию или городу..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
                style={{width:'100%',background:S.bg2,border:`1px solid ${S.border}`,borderRadius:8,padding:'9px 12px 9px 32px',color:S.text,fontSize:13}}/>
            </div>

            <div style={{display:'flex',gap:6,marginBottom:14,flexWrap:'wrap',paddingBottom:4}}>
              {tags.map(tag=>(
                <button key={tag} onClick={()=>setFilterTag(tag)} className="btn"
                  style={{background:filterTag===tag?`linear-gradient(135deg,${S.green},#0099CC)`:S.bg2,color:filterTag===tag?S.bg3:S.text2,border:`1px solid ${filterTag===tag?S.green:S.border}`,padding:'6px 12px',borderRadius:6,fontSize:12,fontWeight:filterTag===tag?600:400,whiteSpace:'nowrap',flexShrink:0}}>
                  {tag}
                </button>
              ))}
              <div style={{display:'flex',alignItems:'center',gap:5,marginLeft:'auto'}}>
                <div style={{width:6,height:6,background:S.green,borderRadius:'50%',animation:'pulse 2s infinite'}}/>
                <span style={{color:S.text2,fontSize:11}}>{filtered.length} проектов</span>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:14}}>
              {filtered.map((asset,idx)=>{
                const pct=Math.round((asset.soldShares/asset.totalShares)*100);
                const isHot=pct>70;
                const isExp=expandedCard===asset.id;
                return (
                  <div key={asset.id} className={`card ${isExp?'expanded':''}`}
                    onClick={()=>setExpandedCard(isExp?null:asset.id)}
                    style={{background:S.bg2,border:`1px solid ${isExp?S.green:S.border}`,borderRadius:12,overflow:'hidden',animation:loaded?`fadeUp ${0.1+idx*0.05}s ease`:'none'}}>
                    <div style={{position:'relative',height:isMobile?130:150,overflow:'hidden'}}>
                      <img src={asset.photos[0]} alt={asset.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
                        onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                        onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
                      <div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 35%,rgba(26,31,46,0.97))'}}/>
                      <div style={{position:'absolute',top:8,left:8,display:'flex',gap:5}}>
                        <span style={{background:asset.color,color:'#0d1117',fontSize:10,padding:'2px 7px',borderRadius:4,fontWeight:700}}>{asset.tag}</span>
                        {isHot&&<span style={{background:S.red,color:'white',fontSize:10,padding:'2px 7px',borderRadius:4,fontWeight:700,animation:'pulse 2s infinite'}}>🔥 HOT</span>}
                      </div>
                      <button onClick={(e)=>{e.stopPropagation();setPhotoModal({project:asset,idx:0});}}
                        style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,0.65)',border:`1px solid ${S.border}`,color:'white',padding:'3px 8px',borderRadius:6,cursor:'pointer',fontSize:11,transition:'all 0.2s'}}
                        onMouseEnter={e=>e.currentTarget.style.borderColor=S.green}
                        onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
                        📷 {asset.photos.length}
                      </button>
                      <div style={{position:'absolute',bottom:8,left:10,right:10,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
                        <div>
                          <div style={{fontSize:isMobile?13:14,fontWeight:700,color:'white',lineHeight:1.2}}>{asset.name}</div>
                          <div style={{fontSize:11,color:'rgba(255,255,255,0.55)',marginTop:2}}>📍 {asset.location}</div>
                        </div>
                        <div style={{textAlign:'right',background:'rgba(0,200,150,0.15)',border:`1px solid ${S.green}30`,borderRadius:6,padding:'4px 8px'}}>
                          <div style={{fontSize:15,fontWeight:700,color:S.green,fontFamily:'monospace'}}>{asset.roi}</div>
                          <div style={{fontSize:9,color:'rgba(255,255,255,0.4)',textTransform:'uppercase'}}>ROI</div>
                        </div>
                      </div>
                    </div>
                    <div style={{padding:'10px 12px'}}>
                      <div style={{marginBottom:8}}>
                        <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:S.text2,marginBottom:4}}>
                          <span>Продано долей</span>
                          <span style={{color:isHot?S.red:S.green,fontWeight:600}}>{pct}%</span>
                        </div>
                        <div style={{background:S.bg3,borderRadius:2,height:3}}>
                          <div style={{background:isHot?S.red:asset.color,borderRadius:2,height:3,width:`${pct}%`,transition:'width 1s ease'}}/>
                        </div>
                      </div>
                      <div style={{overflow:'hidden',maxHeight:isExp?'500px':'0',opacity:isExp?1:0,transition:'all 0.4s cubic-bezier(0.4,0,0.2,1)'}}>
                        <div style={{display:'flex',gap:5,marginBottom:8}}>
                          {asset.photos.map((ph:string,i:number)=>(
                            <img key={i} src={ph} alt="" onClick={(e)=>{e.stopPropagation();setPhotoModal({project:asset,idx:i});}}
                              style={{flex:1,height:50,objectFit:'cover',borderRadius:5,border:`1px solid ${S.border}`,cursor:'pointer',transition:'all 0.2s'}}
                              onMouseEnter={e=>{e.currentTarget.style.borderColor=S.green;e.currentTarget.style.transform='scale(1.05)';}}
                              onMouseLeave={e=>{e.currentTarget.style.borderColor=S.border;e.currentTarget.style.transform='scale(1)';}}/>
                          ))}
                        </div>
                        <p style={{color:S.text2,fontSize:12,lineHeight:1.6,marginBottom:8,paddingTop:8,borderTop:`1px solid ${S.border2}`}}>{asset.desc}</p>
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:8}}>
                          {[['Площадь',asset.area],['Сдача',asset.completion],['Долей',asset.totalShares],['Цена',`$${asset.pricePerShare}`]].map(([k,v])=>(
                            <div key={k} style={{background:S.bg3,borderRadius:6,padding:'6px 10px',border:`1px solid ${S.border2}`}}>
                              <div style={{fontSize:9,color:S.text3,textTransform:'uppercase',letterSpacing:0.5}}>{k}</div>
                              <div style={{fontSize:12,fontWeight:600,marginTop:2}}>{v}</div>
                            </div>
                          ))}
                        </div>
                        <button onClick={(e)=>{e.stopPropagation();openModal(asset,1,e);}} className="btn"
                          style={{width:'100%',background:`linear-gradient(135deg,${asset.color},${asset.color}cc)`,color:'#0d1117',border:'none',padding:'10px',borderRadius:8,fontSize:13,fontWeight:700,boxShadow:`0 4px 12px ${asset.color}40`}}>
                          💰 Купить долю · ${asset.pricePerShare}
                        </button>
                      </div>
                      {!isExp?(
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                          <div>
                            <div style={{fontSize:9,color:S.text3,textTransform:'uppercase',letterSpacing:0.5}}>Цена доли</div>
                            <div style={{fontSize:16,fontWeight:700,fontFamily:'monospace'}}>${asset.pricePerShare}</div>
                          </div>
                          <span style={{color:asset.color,fontSize:11}}>▼ подробнее</span>
                        </div>
                      ):<div style={{textAlign:'center',color:S.text3,fontSize:11,marginTop:6}}>▲ свернуть</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PORTFOLIO */}
        {activePage==='portfolio'&&(
          <div style={{animation:'fadeUp 0.3s ease'}}>
            {/* User Profile Card */}
            <div style={{background:'linear-gradient(135deg,#0f1a2e,#0a1628)',border:`1px solid #1a2d4a`,borderRadius:12,padding:'20px 24px',marginBottom:20,display:'flex',alignItems:'center',gap:16}}>
              <div style={{width:56,height:56,borderRadius:'50%',background:`linear-gradient(135deg,${S.green},#0099CC)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,color:S.bg3,flexShrink:0,boxShadow:`0 4px 16px ${S.green}40`}}>
                {wallet==='guest'?'👤':wallet?.slice(0,2).toUpperCase()}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:16,fontWeight:700,marginBottom:2}}>
                  {wallet==='guest'?'Гость':'Инвестор SolBrick'}
                </div>
                <div style={{fontSize:12,color:S.text2,fontFamily:'monospace',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                  {wallet==='guest'?'Подключите кошелёк':wallet}
                </div>
                <div style={{display:'flex',gap:8,marginTop:6}}>
                  <span style={{background:'#0d2d1e',color:S.green,fontSize:10,padding:'2px 8px',borderRadius:4,fontWeight:600}}>● Solana Devnet</span>
                  {wallet!=='guest'&&<span style={{background:'#0d1f3d',color:S.blue,fontSize:10,padding:'2px 8px',borderRadius:4,fontWeight:600}}>◎ {solBalance.toFixed(3)} SOL</span>}
                </div>
              </div>
              {wallet==='guest'&&(
                <button onClick={connectWallet} className="btn"
                  style={{background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:'8px 14px',borderRadius:8,fontSize:12,fontWeight:700,whiteSpace:'nowrap'}}>
                  🔗 Подключить
                </button>
              )}
            </div>
            <h2 style={{fontSize:18,fontWeight:700,margin:'0 0 4px'}}>Мой портфель</h2>
            <p style={{color:S.text2,fontSize:13,margin:'0 0 16px'}}>Ваши инвестиции на Solana</p>
            {!wallet?(
              <div style={{textAlign:'center',padding:48,background:S.bg2,border:`1px solid ${S.border}`,borderRadius:14}}>
                <div style={{fontSize:48,marginBottom:12}}>🔗</div>
                <p style={{color:S.text2,fontSize:14,marginBottom:20}}>Подключите кошелёк</p>
                <button onClick={connectWallet} className="btn" style={{background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:'12px 24px',borderRadius:10,fontSize:14,fontWeight:700}}>Подключить Phantom</button>
              </div>
            ):(
              <>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:16}}>
                  {[{l:'Портфель',v:`$${totalPortfolio}`,c:S.green,i:'💼'},{l:'Свободно',v:`$${usdBalance.toLocaleString()}`,c:S.blue,i:'💵'},{l:'SOL',v:`◎ ${solBalance.toFixed(3)}`,c:'#A78BFA',i:'◎'},{l:'Проектов',v:Object.keys(portfolio).length,c:'#F59E0B',i:'🏗'}].map((s,i)=>(
                    <div key={i} style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:10,padding:'14px 16px',transition:'all 0.2s'}}
                      onMouseEnter={e=>e.currentTarget.style.borderColor=s.c}
                      onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
                      <div style={{fontSize:11,color:S.text3,textTransform:'uppercase',letterSpacing:0.5,marginBottom:4}}>{s.i} {s.l}</div>
                      <div style={{fontSize:20,fontWeight:700,color:s.c,fontFamily:'monospace'}}>{s.v}</div>
                    </div>
                  ))}
                </div>
                {Object.keys(portfolio).length===0?(
                  <div style={{textAlign:'center',padding:32,background:S.bg2,border:`1px solid ${S.border}`,borderRadius:12}}>
                    <p style={{color:S.text2,fontSize:13}}>Нет инвестиций</p>
                    <button onClick={()=>setActivePage('home')} className="btn" style={{background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:'8px 16px',borderRadius:8,fontSize:13,fontWeight:700,marginTop:10}}>К проектам</button>
                  </div>
                ):(
                  <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:12,overflow:'hidden'}}>
                    {Object.entries(portfolio).map(([id,shares],i)=>{
                      const p=assets.find(a=>a.id===parseInt(id))!;
                      return (
                        <div key={id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 16px',borderTop:i>0?`1px solid ${S.border2}`:'none',transition:'background 0.2s'}}
                          onMouseEnter={e=>e.currentTarget.style.background=S.bg3}
                          onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                          <div style={{display:'flex',alignItems:'center',gap:12}}>
                            <img src={p.photos[0]} alt="" style={{width:44,height:44,borderRadius:8,objectFit:'cover',border:`1px solid ${p.color}40`}}/>
                            <div>
                              <div style={{fontSize:13,fontWeight:500}}>{p.name}</div>
                              <div style={{fontSize:11,color:S.text2}}>{shares} долей · ROI {p.roi}</div>
                            </div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div style={{fontSize:16,fontWeight:700,color:p.color,fontFamily:'monospace'}}>${shares*p.pricePerShare}</div>
                            <div style={{fontSize:10,color:S.green,marginTop:2}}>+{p.roi} в год</div>
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
        {activePage==='calculator'&&(
          <div style={{animation:'fadeUp 0.3s ease'}}>
            <h2 style={{fontSize:20,fontWeight:600,margin:'0 0 4px'}}>Калькулятор доходности</h2>
            <p style={{color:S.text2,fontSize:13,margin:'0 0 20px'}}>Рассчитайте потенциальный доход</p>
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:16}}>
              <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:12,padding:20}}>
                {[{label:'Сумма инвестиции',value:calcAmount,min:20,max:100000,step:20,setter:setCalcAmount,fmt:(v:number)=>`$${v.toLocaleString()}`},{label:'Срок (лет)',value:calcYears,min:1,max:10,step:1,setter:setCalcYears,fmt:(v:number)=>`${v} лет`},{label:'Ожидаемый ROI',value:calcRoi,min:5,max:30,step:0.5,setter:setCalcRoi,fmt:(v:number)=>`${v}%`}].map(p=>(
                  <div key={p.label} style={{marginBottom:22}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontSize:13}}>
                      <span style={{color:S.text2}}>{p.label}</span>
                      <span style={{color:S.green,fontWeight:600,fontFamily:'monospace'}}>{p.fmt(p.value)}</span>
                    </div>
                    <input type="range" min={p.min} max={p.max} step={p.step} value={p.value} onChange={e=>p.setter(Number(e.target.value))}/>
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:S.text3,marginTop:3}}>
                      <span>{p.fmt(p.min)}</span><span>{p.fmt(p.max)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{background:'#0d2d1e',border:`1px solid ${S.green}30`,borderRadius:12,padding:20,marginBottom:14}}>
                  <div style={{fontSize:11,color:S.green,fontWeight:600,marginBottom:12,textTransform:'uppercase',letterSpacing:0.5}}>📊 Результат</div>
                  <div style={{fontSize:34,fontWeight:700,color:S.green,fontFamily:'monospace',marginBottom:14}}>${calcResult.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                    {[['Вложено',`$${calcAmount.toLocaleString()}`],['Прибыль',`+$${(calcResult-calcAmount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}`]].map(([k,v])=>(
                      <div key={k} style={{background:S.bg3,borderRadius:8,padding:'10px 14px'}}>
                        <div style={{fontSize:10,color:S.text3,marginBottom:3}}>{k}</div>
                        <div style={{fontSize:15,fontWeight:600,color:k==='Прибыль'?S.green:S.text,fontFamily:'monospace'}}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:12,padding:16}}>
                  <div style={{fontSize:11,color:S.text2,fontWeight:600,marginBottom:12,textTransform:'uppercase',letterSpacing:0.5}}>Рост по годам</div>
                  {Array.from({length:Math.min(calcYears,5)},(_,i)=>{
                    const yv=calcAmount*Math.pow(1+calcRoi/100,i+1);
                    return (
                      <div key={i} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                        <span style={{fontSize:11,color:S.text2,width:28}}>{i+1}г.</span>
                        <div style={{flex:1,background:S.bg3,borderRadius:2,height:4}}>
                          <div style={{background:`linear-gradient(90deg,${S.green},#0099CC)`,borderRadius:2,height:4,width:`${Math.min((yv/calcResult)*100,100)}%`,transition:'width 0.8s ease'}}/>
                        </div>
                        <span style={{fontSize:11,color:S.green,fontFamily:'monospace',width:76,textAlign:'right'}}>${yv.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTIONS */}
        {activePage==='transactions'&&(
          <div style={{animation:'fadeUp 0.3s ease'}}>
            <h2 style={{fontSize:20,fontWeight:600,margin:'0 0 4px'}}>История транзакций</h2>
            <p style={{color:S.text2,fontSize:13,margin:'0 0 20px'}}>Все on-chain операции через Solana</p>
            {transactions.length===0?(
              <div style={{textAlign:'center',padding:48,background:S.bg2,border:`1px solid ${S.border}`,borderRadius:14}}>
                <div style={{fontSize:40,marginBottom:12}}>📭</div>
                <p style={{color:S.text2,fontSize:13,marginBottom:16}}>Транзакций пока нет</p>
                <button onClick={()=>setActivePage('home')} className="btn" style={{background:`linear-gradient(135deg,${S.green},#0099CC)`,color:S.bg3,border:'none',padding:'10px 20px',borderRadius:8,fontSize:13,fontWeight:700}}>Купить первую долю</button>
              </div>
            ):(
              <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:12,overflow:'hidden'}}>
                {transactions.map((tx,i)=>(
                  <div key={tx.id} style={{padding:'14px 16px',borderTop:i>0?`1px solid ${S.border2}`:'none',transition:'background 0.2s'}}
                    onMouseEnter={e=>e.currentTarget.style.background=S.bg3}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:500}}>{tx.project}</div>
                        <div style={{fontSize:11,color:S.text2,marginTop:2}}>{tx.amount} долей · {tx.date}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontSize:14,fontWeight:700,color:S.green,fontFamily:'monospace'}}>{tx.cost>0?`$${tx.cost}`:'—'}</div>
                        <div style={{fontSize:10,color:S.blue,fontFamily:'monospace',marginTop:2}}>{tx.hash}...</div>
                      </div>
                    </div>
                    <div style={{display:'inline-flex',alignItems:'center',gap:4,background: tx.onchain?'#0d1f3d':'#0d2d1e',border:`1px solid ${tx.onchain?S.blue+'40':S.green+'30'}`,color:tx.onchain?S.blue:S.green,fontSize:10,padding:'2px 8px',borderRadius:4,fontWeight:600}}>
                      {tx.onchain?'⛓ ON-CHAIN · Solana Devnet':'✅ BUY · Confirmed on Solana'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MAP */}
        {activePage==='map'&&(
          <div style={{animation:'fadeUp 0.3s ease'}}>
            <h2 style={{fontSize:20,fontWeight:600,margin:'0 0 4px'}}>Карта проектов</h2>
            <p style={{color:S.text2,fontSize:13,margin:'0 0 20px'}}>Все объекты SolBrick на карте Казахстана</p>
            <div style={{background:S.bg2,border:`1px solid ${S.border}`,borderRadius:12,overflow:'hidden'}}>
              <svg viewBox="0 0 700 380" style={{width:'100%',display:'block',background:'#0d1829'}}>
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00C896" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#00C896" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                {/* Kazakhstan border */}
                <path d="M 338 50 L 352 47 L 366 45 L 380 47 L 392 43 L 405 41 L 418 43 L 428 47 L 440 45 L 453 41 L 466 43 L 478 47 L 490 51 L 503 57 L 514 65 L 522 75 L 528 87 L 531 99 L 529 111 L 524 121 L 516 129 L 508 135 L 514 145 L 520 157 L 518 169 L 510 177 L 498 182 L 484 185 L 468 188 L 452 193 L 436 200 L 422 209 L 412 220 L 405 232 L 400 244 L 393 255 L 383 262 L 371 265 L 357 264 L 342 259 L 327 253 L 312 247 L 297 243 L 282 242 L 267 245 L 254 252 L 242 260 L 230 266 L 217 268 L 204 265 L 191 258 L 179 250 L 167 242 L 155 235 L 141 230 L 125 228 L 109 230 L 94 235 L 80 241 L 67 244 L 54 242 L 42 236 L 32 226 L 24 214 L 19 201 L 17 187 L 19 173 L 25 161 L 33 150 L 25 140 L 20 128 L 18 116 L 22 104 L 30 94 L 42 85 L 56 79 L 71 74 L 87 71 L 102 70 L 112 73 L 108 83 L 112 94 L 120 103 L 132 109 L 147 112 L 162 112 L 175 108 L 185 100 L 191 90 L 192 79 L 188 70 L 195 64 L 208 59 L 222 55 L 237 52 L 252 50 L 267 48 L 282 47 L 297 47 L 312 48 L 325 49 Z" fill="#1a3050" stroke="#2a5f8a" strokeWidth="1.5" opacity="0.9"/>
                {/* Caspian Sea */}
                <ellipse cx="28" cy="175" rx="18" ry="35" fill="#0d2040" stroke="#1a4060" strokeWidth="1" opacity="0.8"/>
                <text x="28" y="178" fill="#4A9EFF" fontSize="7" textAnchor="middle" fontFamily="Segoe UI">Каспий</text>
                {/* Cities */}
                {[
                  {x:240,y:232,name:"Шымкент",color:"#00C896",projects:2,hot:false},
                  {x:338,y:115,name:"Астана",color:"#A78BFA",projects:2,hot:false},
                  {x:408,y:198,name:"Алматы",color:"#FF6B35",projects:2,hot:true},
                  {x:200,y:220,name:"Туркестан",color:"#F59E0B",projects:1,hot:true},
                  {x:46,y:178,name:"Актау",color:"#06B6D4",projects:1,hot:false},
                  {x:468,y:110,name:"Семей",color:"#84CC16",projects:1,hot:false},
                ].map((city,i)=>(
                  <g key={i} style={{cursor:'pointer'}} onClick={()=>{setActivePage('home');setSearchQuery(city.name);}}>
                    <circle cx={city.x} cy={city.y} r="20" fill="url(#glow)" opacity="0.5"/>
                    <circle cx={city.x} cy={city.y} r={city.hot?11:9} fill={city.color} opacity="0.25"/>
                    <circle cx={city.x} cy={city.y} r={city.hot?7:6} fill={city.color} opacity="0.7"/>
                    <circle cx={city.x} cy={city.y} r={city.hot?4:3} fill={city.color}/>
                    {city.hot&&<circle cx={city.x} cy={city.y} r="12" fill="none" stroke={city.color} strokeWidth="1" opacity="0.5" strokeDasharray="3,3"/>}
                    <text x={city.x} y={city.y+22} fill="white" fontSize="10" textAnchor="middle" fontFamily="Segoe UI" fontWeight="600">{city.name}</text>
                    <text x={city.x} y={city.y+33} fill={city.color} fontSize="8" textAnchor="middle" fontFamily="Segoe UI">{city.projects} объект{city.projects>1?'а':''}</text>
                  </g>
                ))}
                <text x="350" y="25" fill="#5f6368" fontSize="12" textAnchor="middle" fontFamily="Segoe UI">🇰🇿 Казахстан · 9 проектов SolBrick</text>
              </svg>
              <div style={{padding:'16px',borderTop:`1px solid ${S.border}`,display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
                <span style={{fontSize:12,color:S.text2,marginRight:4}}>Нажми на город:</span>
                {[{city:"Шымкент",count:2,color:"#00C896"},{city:"Астана",count:2,color:"#A78BFA"},{city:"Алматы",count:2,color:"#FF6B35"},{city:"Туркестан",count:1,color:"#F59E0B"},{city:"Актау",count:1,color:"#06B6D4"},{city:"Семей",count:1,color:"#84CC16"}].map((c,i)=>(
                  <button key={i} onClick={()=>{setActivePage('home');setSearchQuery(c.city);}} className="btn"
                    style={{display:'flex',alignItems:'center',gap:6,background:S.bg3,border:`1px solid ${S.border}`,borderRadius:8,padding:'6px 12px',color:S.text,fontSize:12}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:c.color}}/>
                    {c.city} · {c.count}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}


        {!isMobile&&(
          <div style={{marginTop:40,paddingTop:16,borderTop:`1px solid ${S.border2}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontSize:11,color:S.text3}}>SolBrick © 2026 · National Solana Hackathon by Decentrathon</span>
            <span style={{fontSize:11,color:S.text3}}>Built on <span style={{color:'#9945FF'}}>Solana</span> · Anchor 0.32.1</span>
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      {isMobile&&(
        <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:S.bg2,borderTop:`1px solid ${S.border}`,display:'flex',justifyContent:'space-around',padding:'8px 0 18px',backdropFilter:'blur(20px)'}}>
          {[['home','🏠','Проекты'],['portfolio','💼','Портфель'],['calculator','🧮','Расчёт'],['transactions','📋','История'],['map','🗺','Карта']].map(([page,icon,label])=>(
            <button key={page} onClick={()=>setActivePage(page as Page)}
              style={{background:'transparent',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'4px 8px',color:activePage===page?S.green:S.text2,transition:'all 0.2s'}}>
              <span style={{fontSize:20,transition:'transform 0.2s',transform:activePage===page?'scale(1.15)':'scale(1)'}}>{icon}</span>
              <span style={{fontSize:10,fontWeight:activePage===page?600:400}}>{label}</span>
              {activePage===page&&<div style={{width:4,height:4,background:S.green,borderRadius:'50%',animation:'pulse 2s infinite'}}/>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
