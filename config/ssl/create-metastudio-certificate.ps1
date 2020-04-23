openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout metastudio.key -out metastudio.pem -config req.cnf -sha256
