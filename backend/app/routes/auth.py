from fastapi import APIRouter, HTTPException
from app.models import UserSignupSchema, UserLoginSchema
from app.database import user_collection
from app.utils import get_password_hash, verify_password
router = APIRouter()


# --- SIGNUP API ---
@router.post("/signup")
async def create_user(user: UserSignupSchema):
    # 1. चेक करो Email पहले से है क्या?
    existing_email = await user_collection.find_one({"email": user.email})
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. चेक करो Username पहले से है क्या?
    existing_username = await user_collection.find_one({"username": user.username})
    if existing_username:
        raise HTTPException(status_code=400, detail="Username not available")

    # 3. पासवर्ड सुरक्षित करो
    hashed_password = get_password_hash(user.password)

    # 4. डाटा सेव करो
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }
    await user_collection.insert_one(new_user)

    return {"message": "User created successfully!"}


# --- LOGIN API ---
@router.post("/login")
async def login_user(user: UserLoginSchema):
    # 1. यूजर ढूँढो
    db_user = await user_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # 2. पासवर्ड मैच करो
    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"message": "Login successful", "username": db_user["username"]}
