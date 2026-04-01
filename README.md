# 🏗️ SolBrick — Токенизация недвижимости на Solana

**Демо:** https://solbrick.vercel.app  
**Хакатон:** National Solana Hackathon by Decentrathon 2026

## 🎯 Проблема
В Казахстане купить недвижимость = от $50,000+. Недоступно для большинства людей. Рынок непрозрачный, посредники берут комиссии, активы неликвидны.

## 💡 Решение
SolBrick токенизирует строительные объекты на Solana. Каждый объект делится на доли от $20. Любой человек становится совладельцем реального актива.

## ⚡ Почему Solana
- **Ownership on-chain** — право собственности в блокчейне
- **Реальный баланс SOL** через `@solana/web3.js`
- **On-chain транзакции** из истории кошелька
- **Смарт-контракт** на Anchor Framework

## 🔧 Технологии
- **Blockchain:** Solana Devnet
- **Smart Contract:** Anchor Framework 0.32.1 (Rust)
- **Program ID:** `2vi5oMpNoo7Qvbjf9sYM3rr4NhZzQnR5ViSsuX1wErG3`
- **Frontend:** React + TypeScript
- **AI Assistant:** Claude AI (Anthropic)
- **Database:** Supabase
- **Deploy:** Vercel

## 📊 Функционал MVP
- ✅ 9 токенизированных проектов по всему Казахстану
- ✅ Подключение Phantom Wallet
- ✅ Реальный баланс SOL из Solana Devnet
- ✅ Реальные on-chain транзакции
- ✅ Покупка долей через смарт-контракт
- ✅ Калькулятор доходности
- ✅ Карта проектов по Казахстану
- ✅ AI Assistant на базе Claude AI
- ✅ Мобильная версия
- ✅ Аналитика посетителей (Supabase)

## 🗺️ Проекты
| Проект | Город | Цена доли | ROI |
|--------|-------|-----------|-----|
| ЖК Алтын Орда | Шымкент | $50 | 12.4% |
| Бизнес-центр Нур Плаза | Алматы | $100 | 18.2% |
| Торговый комплекс Сайрам | Шымкент | $25 | 9.8% |
| Жилой квартал Астана Парк | Астана | $75 | 15.1% |
| Гостиница Silk Road | Туркестан | $60 | 22.5% |
| Логистический центр KazHub | Алматы | $20 | 11.3% |
| Апарт-отель Caspian View | Актау | $80 | 16.7% |
| ЖК Семей Хайтс | Семей | $35 | 10.5% |
| Медицинский центр MedCity | Астана | $90 | 20.1% |

## 🚀 Запуск
```bash
cd app
npm install
npm start
```

## 🏗️ Архитектура
```
Пользователь → Phantom Wallet → React Frontend
                                      ↓
                         Anchor Program (Solana Devnet)
                                      ↓
                    create_asset · buy_shares · get_holding
```

## 👨‍💻 Команда
**Nureke** — Full Stack Developer
