Basic Documentation code still needs work.
API Server listens on port 9000 with routes /searchname and /addname.
Search (/searchname) name body request param is named xname for username to search.
API route /addname takes 2 JSON parts xname and xpass.

searchfunction imported by api server has all logic to log into Jellyfin server username and password can be changed from there.
