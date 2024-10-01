// fields: Event Code,Week Number,Event Name,Team Count,City,State
require('dotenv').config();

var token = btoa(process.env.TOKEN);

console.log("Event Code,Week Number,Event Name,Team Count,City,State");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Basic ${token}`);
myHeaders.append("If-Modified-Since", "");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://frc-api.firstinspires.org/v3.0/2025/events", requestOptions)
    .then(response => {
        response.json()
            .then(async result => {
                for (element of result["Events"]) {
                    await fetch("https://frc-api.firstinspires.org/v3.0/2025/teams?eventCode=" + element["code"], requestOptions)
                        .then(response2 => {
                            response2.json()
                                .then(result2 => {
                                    console.log(`${element["code"]},${element["weekNumber"]},${element["name"]},${result2["teamCountTotal"]},${element["city"]},${element["stateprov"]}`)
                                })
                        })
                        .catch(error => console.log('error', error));
                }
            })
    })
.catch(error => console.log('error', error));