import requests

url = 'http://127.0.0.1:5000/detect'
files = {'file': open('../static/images/test.jpg','rb')}
requests.post(url,files=files)