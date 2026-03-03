# אזולאי ושות' — עורכי דין וגישור

דף נחיתה עם סוכן AI (רותי) למשרד עו"ד שמעון אזולאי, דימונה.

## מבנה הפרויקט

```
Azoulay-law/
├── Index.html                          # דף הנחיתה הראשי
└── supabase/
    ├── config.toml                     # הגדרות Supabase
    └── functions/
        └── claude-proxy/
            └── index.ts               # Supabase Edge Function (Deno/TypeScript)
```

## הגדרת ה-AI Agent — שלבי פריסה

### 1. יצירת פרויקט Supabase
1. היכנסו ל-[supabase.com](https://supabase.com) וצרו פרויקט חדש
2. שמרו את **Project URL** ואת **anon key**

### 2. פריסת ה-Edge Function
```bash
# התקנת Supabase CLI
npm install -g supabase

# התחברות
supabase login

# פריסה (מתוך תיקיית הפרויקט)
supabase functions deploy claude-proxy --project-ref YOUR_PROJECT_REF

# הגדרת API Key של Anthropic
supabase secrets set ANTHROPIC_API_KEY=sk-ant-... --project-ref YOUR_PROJECT_REF
```

### 3. עדכון ה-URL ב-Index.html
בקובץ `Index.html`, מצאו את השורה:
```js
const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
```
והחליפו את `YOUR_PROJECT_REF` ב-Project Reference האמיתי שלכם.

## פרטי העסק

| שדה | ערך |
|-----|-----|
| שם | עו"ד שמעון אזולאי |
| משרד | אזולאי ושות' ~ עורכי דין וגישור |
| כתובת | שד' יגאל אלון 209/31, דימונה |
| טלפון | 054-6969157 |
| אימייל | office.lawsa@gmail.com |
| וואטסאפ | https://wa.me/972546969157 |
| אתר | https://azoulay-law.co.il |
| שעות | א'-ה' 09:00-17:00, ו' 09:00-13:00 |

## תחומי התמחות
- דיני משפחה (גירושין, מזונות, משמורת, ירושה)
- חוזים (ניסוח, בדיקה, ייעוץ)
- הוצאה לפועל (גביית חובות, עיקולים)
- חדלות פרעון (פשיטת רגל, הפטר)
- דיני עבודה (פיטורין, פיצויים, הפליה)
- גישור

## אבטחה — מה ה-Edge Function מגינה עליו
- **Prompt injection** — זיהוי וחסימה של ניסיונות לשנות את הוראות ה-AI
- **מידע פנימי** — ה-system prompt אינו נחשף לעולם
- **נושאים לא רלוונטיים** — ה-AI מופנה בחזרה לנושאי המשרד בלבד
- **הגנה מפני ייעוץ משפטי** — אין הבטחת תוצאות, תמיד הפניה לעורך הדין
- **הגבלת גודל** — מקסימום 20 הודעות בהיסטוריה, 2000 תווים להודעה

## טכנולוגיות
- **Frontend**: HTML/CSS/JS (ללא frameworks)
- **Backend**: Supabase Edge Functions (Deno/TypeScript)
- **AI Model**: claude-sonnet-4-6
- **Response Format**: JSON `{ reply, collect_lead, quick_actions }`
