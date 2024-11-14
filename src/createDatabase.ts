import sqlite3 from 'sqlite3';
import fs from 'fs';

sqlite3.verbose();
const dbPath = './db/Barber2Old.db';
fs.access(dbPath,fs.constants.F_OK,(err)=>{
    if(err){
        const db = new sqlite3.Database(dbPath,(err)=>{
            if(err){
                console.error('数据库创建失败!',err);
            }else{
                console.log('数据库创建成功!');
            }
        });
    }else {
        console.log('数据库已经存在!');
    }
});