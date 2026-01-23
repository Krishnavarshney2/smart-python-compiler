from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth
from dotenv import load_dotenv
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import subprocess
from fastapi.staticfiles import StaticFiles 
from groq import Groq

from app.routes import auth
app = FastAPI()

# --- CORS SETUP (The Fix) ---
# हम यहाँ ["*"] कर रहे हैं, जिसका मतलब है "सबको आने दो"
# यह Development के लिए बेस्ट है ताकि localhost vs 127.0.0.1 का झगड़ा न हो।
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow ALL origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow ALL methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow ALL headers
)

# Routes जोड़ना
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
load_dotenv(override=True)
api_key = os.getenv("GROQ_API_KEY")
print(f"DEBUG: Loaded API Key -> {api_key}")
if not api_key:
    print("WARNING: GROQ_API_KEY not found in .env file!")

client = Groq(api_key=api_key)




# 1. Data Model: Frontend se kya aayega?
class CodeRequest(BaseModel):
    code: str
    language: str = "python"  # Future proofing (abhi sirf python)

# 2. Chat Request Model (NEW)
class ChatRequest(BaseModel):
    message: str       # User ka sawal
    code: str          # Current Code (Context)
    language: str = "python"


@app.get("/")
def read_root():
    return {"message": "NeuroCode Backend is Running! 🚀"}
    
# 2. The Execution Endpoint
@app.post("/execute")
async def execute_code(request: CodeRequest):
    try:
        # Step 1: Subprocess ka use karke code run karna
        # sys.executable: Matlab usi python ko use kro jo server chala rha h
        # "-c": Command line mode
        process = subprocess.run(
            [sys.executable, "-c", request.code],
            capture_output=True, # Output (Print) ko capture kro
            text=True,           # Text format me output do (bytes nahi)
            timeout=5            # Safety: 5 second se jyada code na chale (Infinite loop rokne ke liye)
        )

        # Step 2: Check karo output hai ya error
        if process.returncode == 0:
            return {"output": process.stdout} # Success Output
        else:
            return {"error": process.stderr}  # Error Message

    except subprocess.TimeoutExpired:
        return {"error": "Time Limit Exceeded! Your code took too long to run."}
    except Exception as e:
        return {"error": str(e)}



# 👇 REPLACE THIS WHOLE FUNCTION in main.py 👇

@app.post("/chat")
async def chat_with_ai(request: ChatRequest):
    try:
        # --- 🧠 PRODUCTION LEVEL BRAIN ---
        system_prompt = """
        You are 'NeuroCode AI', an intelligent coding assistant.
        
        ### 🧠 PRIME DIRECTIVE:
        You have access to the user's code in their editor, BUT you must judge if it's relevant.
        
        ### 🚦 DECISION FLOW (Follow Strictly):
        
        1. **CASUAL / GENERAL CHAT:**
           - If user says "Hi", "Hello", "Thanks", "Who are you?", or asks a generic question like "What is Python?":
           - **ACTION:** Ignore the code in the editor. Just answer normally and concisely. DO NOT mention "You provided code".
        
        2. **CODE ASSISTANCE (Fix/Debug/Explain):**
           - If user refers to the code (e.g., "Fix this", "Explain this", "Why is it failing?", "Optimize"):
           - **ACTION:** Analyze the provided code and output in this STRICT format:
             1. **🔍 Diagnosis:** One sentence on the issue.
             2. **🛠️ The Fix:** The corrected code block only.
             3. **💡 Insight:** Why the fix works.
        """

        # ✨ MAGIC TRICK: Put the QUESTION FIRST, Code LAST
        # Isse AI pehle sawal par focus karega, Code ko sirf 'Reference' manega.
        user_content = f"""
        ### 👤 USER QUESTION:
        {request.message}

        --------------------------------------------------
        ### 📂 CONTEXT (User's Current Code - Use ONLY if needed):
        ```{request.language}
        {request.code}
        ```
        """

        # Call Groq API
        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ],
            model="llama-3.3-70b-versatile", 
            temperature=0.5, # Thoda aur strict/focused
            max_tokens=1024,
        )

        return {"response": completion.choices[0].message.content}

    except Exception as e:
        return {"response": f"❌ System Error: {str(e)}"}