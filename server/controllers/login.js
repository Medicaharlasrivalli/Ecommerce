const {db}=require('../database/mysql_connect')
const { v4: uuidv4 } = require('uuid');
class Session {
  constructor(username, expiresAt) {
      this.username = username
      this.expiresAt = expiresAt
  }
  isExpired() {
      this.expiresAt < (new Date())
  }
}
const sessions = {}
const loginUser=(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body;
    const sql = "SELECT * from users where user_name=? or email=?";
    db.query(sql,[email,email],(err,result)=>{
  
      console.log(result)
      if (err) return res.json({ Message: "Error" });
      else{
        if (result.length==0){
          return res.json({Status:"Unsuccess",msg:"Account not found please signup"})
        }
        else{
          if (result[0].password===password){
            const sessionToken=uuidv4();
            const now = new Date()
            const expiresAt = new Date(+now + 10 * 1000)
            const session = new Session(email, expiresAt)
            sessions[sessionToken] = session
            return res.json({Status:"Success",user:result[0]})
          }
          else{
            return res.json({Status:"Unsuccess",msg:"Incorrect Password"})
          }
        }
        
      }
    })
  }

  module.exports={loginUser}