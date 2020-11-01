const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
var fs = require('fs');



app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/view/thumbnail/:roomId', (req, res) => {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('db.txt')
    });
    var room_id = req.params.roomId;
    var done = {};
    var st = {}
    var cnt = 1;
    lineReader.on('line', function (line) {
        var l = line.split(' ');
        if (l[0] == room_id)
        {
            if (!done[l[1]]) {
                st[cnt]={
                    "username": l[1],
                    "photo": l[2],
                    "time": l[3]
                };
                cnt+=1
                done[l[1]] = 1;
            }
        }
    });
    lineReader.on('close', () => {
        res.send(st);
    })
    
})

app.get('/view/:roomId/:username', (req, res) => {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('db.txt')
    });
    var cnt = 1
    var st = {}
    var room_id = req.params.roomId;
    lineReader.on('line', function (line) {
        var l = line.split(' ');
        if (l[0] == room_id)
        {
            if (l[1]==req.params.username) {
                st[cnt] = {
                    "username": l[1],
                    "photo": l[2],
                    "time": l[3]
                };
                cnt+=1
            }
        }
    });
    lineReader.on('close', () => {
        res.send(st);
    })
})

app.post('/check/:roomId', (req, res) => {
    console.log("Update");
    var room_id = req.params.roomId;
    var photo = req.body.frame;
    var userId = req.body.username;
    var time = req.body.timeStamp;

    fs.appendFile('db.txt', room_id+" "+userId+" "+photo+" "+time+"\n", function (err) {
        if (err) res.send( err);
        //console.log('Updated!');
        res.send("updated");
    });
    

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})