# install toxiproxy from https://github.com/Shopify/toxiproxy
ps aux|grep toxiproxy|grep -v grep|awk '{print $2}'|xargs kill
/usr/bin/toxiproxy-server &
node index.js
