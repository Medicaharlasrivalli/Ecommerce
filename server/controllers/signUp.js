const {db}=require('../database/mysql_connect')
const signupUser=(req,res) =>{
    console.log(req.body)
    const {fname,lname,uname,email,password,dob,phone}=req.body
    const sql="INSERT INTO users (first_name,last_name,user_name,email,password,date_of_birth,phone_number) VALUES (?,?,?,?,?,?,?) ";
    const email_check="SELECT email from users where email in (?)";
    const id_num="SELECT id from users ORDER BY id DESC LIMIT 1";
    db.query(id_num,(err,r)=>{
    //   console.log(r[0].id+1)
    //   const id=r[0].id+1
      db.query(email_check,[email],(err,result)=>{
        console.log(result)
        if (result.length==0){
          console.log("Email is not there")
          db.query(sql,[fname,lname,uname,email,password,dob,phone],(err,result) => {
            console.log(err);
            if (err) return res.json({ Message: "Error" });
            else return res.json({ Status: "Success" });
          })
          
        }
        else{
          return res.json({Status:"Unsuccess"})
        }
      })
    })
  }
module.exports={signupUser}