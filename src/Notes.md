#List of APIs

##authRouter
POST /Login
POST /Logout
POST /Signup

##profileRouter
GET /Profile
GET /Feed
GET /Matches
PATCH /updateProfile
PATCH /changePassword

##sendOrReviewConnections
Post /send/likeRequest
Post /send/ignoreRequest
GET /review/acceptRequest

To Do:
- Send Conection Request API - Ignore and Interest
-Create a new Schema for Connection Request and a collection
- Enum in Mongoose
- schema pre
validations include : 
- Shouldn't send to self
- toId should be valid
-status shouldn't contain anything other than ignored or liked