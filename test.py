import subprocess
from flask import Flask, request,jsonify
app = Flask(__name__) 
  
@app.route('/ip',methods=['GET'])
def ping():
   try: 
        ip = request.args.get('ipAddr')
        print(ip)
        ans = subprocess.check_output(["ping", ip], text=True) 
        print(ans)
        return jsonify({'summarynetworkstats':ans})
   except subprocess.CalledProcessError as e: 
        print(f"Command failed with return code {e.returncode}") 
  
if __name__ == '__main__': 
    app.run(debug=True, port=5000)
