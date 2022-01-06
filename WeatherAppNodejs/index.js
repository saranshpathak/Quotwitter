const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("Home.html","utf-8");


const getValue = (temporaryVal,originalVal)=>{
  let temp = temporaryVal.replace("{%tempVal%}",original.main.temp);
  temp = temp.replace("{%tempMin%}",original.main.temp);
  temp = temp.replace("{%tempMin%}",original.main.temp_min);
  temp = temp.replace("{%tempMax%}",original.main.temp_max);
  temp = temp.replace("{%city%}",original.name);
  temp = temp.replace("{%country%}",original.sys.country);
  return temp;
}


const server = http.createServer((req,res) =>{
    if(req.url == "/"){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=868aa41ef0e7214aba11cfb3172212a6",)
.on("data", (chunk) =>{
  const objdata = JSON.parse(chunk);
  const arrdata = [objdata];

  const realTimeData =  arrdata.map((val)=>
    getValue(homeFile,val)).join("");
    res.write(realTimeData);
})
.on("end", (err)=> {
  if (err) return console.log('connection closed due to errors', err);
 
res.end();
});
    }
});
server.listen(8000,"127.0.0.1");