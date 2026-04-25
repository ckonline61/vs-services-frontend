# 🤖 AI CarBot Setup — Gemini API (Free)

The chatbot already works **without any API key** using a built-in FAQ knowledge base (covers 19+ common car questions in Hinglish).

For **ChatGPT-quality replies** to ANY question, add a free Google Gemini API key:

## Step 1: Get a free Gemini API key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with any Google account
3. Click **"Create API key"** (top-right)
4. Choose **"Create API key in new project"**
5. Copy the key (starts with `AIzaSy...`)

**Free tier limits (more than enough):**
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute
- gemini-1.5-flash model (very fast, ChatGPT-3.5 quality)

## Step 2: Add to Render environment

1. Open https://dashboard.render.com → `vs-services-api` service
2. Click **"Environment"** tab on the left
3. Click **"Add Environment Variable"**
4. Add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** *paste your AIzaSy... key here*
5. Click **"Save Changes"**
6. Render will auto-redeploy in ~60 seconds

## Step 3: Test it

In the mobile app:
1. Tap the floating purple **🤖 button** (bottom-right of any main screen)
2. OR: Profile → CarBot AI Assistant
3. Ask anything: "Mere car ka engine awaaz kar raha hai"
4. Reply will say `✨ AI` at the bottom (instead of `📚 KB`)

## How it works

```
User question → Backend `/api/chatbot`
                    ↓
              Is GEMINI_API_KEY set?
              ├── YES → Send to Gemini API → Return AI reply
              └── NO  → Match against FAQ keywords → Return canned reply
```

## What CarBot knows (without Gemini)

Even without an API key, CarBot answers:

| Topic | Sample Q |
|---|---|
| Engine oil | "Oil kab change karein?" |
| Service interval | "Service kitne km pe?" |
| Tyre pressure | "PSI kitna?" |
| Battery | "Battery dead signs" |
| AC | "AC kam thanda" |
| Brakes | "Brake noise" |
| Wash | "Car wash cost" |
| Puncture | "Puncture support" |
| Insurance/PUC | "Insurance reminder" |
| Mileage | "Kam mileage" |
| Booking | "Book kaise karein" |
| Cancellation | "Cancel booking" |
| Payment | "Payment options" |
| Coupons | "Active offers" |
| Refer | "Referral" |
| Branches | "Address" |
| Emergency | "Breakdown" |

For anything outside this list, it says "Common queries pucho ya call karo +91 8839533202".

**With Gemini key**, CarBot answers ANY car-related question with full context awareness.

## Cost

- **Gemini API**: 100% free for the limits above. No card required.
- **Render**: Free tier (already in use).
- **OpenStreetMap maps**: 100% free.

Total cost = ₹0/month for everything.

## Privacy

- Chat history is stored only in user's phone localStorage (not on server).
- Backend forwards messages to Gemini API but doesn't log them.
- Last 6 messages are sent as context for follow-up questions.
- No PII (name/mobile) is sent to Gemini.
