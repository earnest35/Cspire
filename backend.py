import os
import subprocess 
import json
from flask import Flask,jsonify,request 
from flask_cors import CORS

#Ping can give the ping,throughput and jittering requirements
"""
def ping():
   try: 
        ans = subprocess.check_output(["ping", "google.com"], text=True) 
        print(ans)
        return ans
   except subprocess.CalledProcessError as e: 
        print(f"Command failed with return code {e.returncode}")
ping()
"""
#This gives the location part of the requirements
"""
def location():
   try: 
        location = subprocess.check_output(["curl", "ipinfo.io"], text=True) 
        location_json = json.loads(location)
        region = location_json["region"]
        city = location_json["city"]
        country = location_json["country"]
        detailed_location = region + ","  + city + ","+country
        print(detailed_location)
        return detailed_location
   except subprocess.CalledProcessError as e: 
        print(f"Command failed with return code {e.returncode}")
location()
"""
"""
def network_type():
    try:
          network_type = subprocess.check_output(["ipconfig","/all"])
          #network_type_json = json.loads(network_type)
          print(network_type)
    except subprocess.CalledProcessError as e:
          print(f"Command failed with return code {e.returncode}")
network_type()
"""
###FLASK###
app = Flask(__name__)
CORS(app)
@app.route('/ip')
def ping():
   try: 
        ip = request.args.get('ipAddr')
        print(ip)
        ans = subprocess.check_output(["ping", ip], text=True) 
        print(ans)
        return jsonify({'summarynetworkstats':ans})
   except subprocess.CalledProcessError as e: 
        print(f"Command failed with return code {e.returncode}")
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(debug=True,host='0.0.0.0')



  
 