# Enviro pHAT temperature logger and grapher #

Nodejs, Expressjs, Mongodb, Mongoose, D3.js concoction to show the [Enviro pHAT](https://shop.pimoroni.com/products/enviro-phat) by [pimoroni](https://shop.pimoroni.com/) BMP280 temperature/pressure sensor readings over time, charted by [D3.js](https://d3js.org/) 

![alt text](http://imgur.com/Mu6fTQs "Pi Zero with Enviro Phat installed.")

### Usage ###

Clone this repository to your raspbery pi. Change directory to the foler. Then run the following.

```
npm install
```
Add the two processes to the root users crontab to get the pymongo script taking readings and inserting into the mongo database and the express front-end serving up.

``` 
sudo vi crontab -u root -e
...
@reboot /usr/local/bin/node /home/pi/enviro-phat/index.js 
* * * * * python /home/pi/enviro-phat/read-temp.py
...
sudo reboot
```
Wait for the raspberry pi to finish booting and see the results by visiting [http://raspberrypi.local:3000](http://raspberrypi.local:3000)

You should see something like the screen below.
