from pydantic import BaseModel, EmailStr, Field


# Sign Up के लिए (3 चीजें चाहिए)
class UserSignupSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)


# Login के लिए (2 चीजें चाहिए)
class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str
