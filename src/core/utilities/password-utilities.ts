import * as bcrypt from 'bcrypt';

export const passwordHash = (password): Promise<string> => {
    return new Promise((resolve, reject)=>{
      bcrypt.hash(password, 10, (err, hash) => {
        // Now we can store the password hash in db.
        if(err){
          reject(err);
        }else{
          resolve(hash);
        }
      });
    })
  }

  export const passwordCompare = (password, hash): Promise<boolean> =>{
    return new Promise((resolve, reject)=>{
      bcrypt.compare(password, hash, (err, hash) => {
        // Now we can store the password hash in db.
        if(err){
          reject(err);
        }else{
          resolve(hash);
        }
      });
    })
  }