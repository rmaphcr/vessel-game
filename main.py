from flask import Flask, request, json, jsonify, send_file

import pages

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
#remove this bit of the code when uploading to google cloud

try:
	#this should run if I'm hosting the game locally on my laptop
	cred = credentials.Certificate('vessel-game-987106f68973.json')

	fb_app = firebase_admin.initialize_app(cred)

	db = firestore.client()

except:
	
	#this should run instead if it can't find the json file: a.k.a If I'm hosting it on google cloud
	fb_app = firebase_admin.initialize_app()
	
	db = firestore.client()

def create_app():
    app = Flask(__name__)
    app.register_blueprint(pages.bp)
    return app
    
app = create_app()

@app.route("/dbwrite", methods = ['POST'])
def dbwrite():

	#This function just takes whatever json string it's handed and writes it to the cloud database
	#No error checking (yet) so just make sure you catch rubbish before it gets here

    jsonString = json.dumps(request.json)
    resultJson = json.loads(jsonString)
    
    print(resultJson)

    dbDict = {
             'session ID' : resultJson.get('sessionID'),
             'number' : resultJson.get('number'),
             'mistakes' : resultJson.get('mistakes'),
             'time' : resultJson.get('time'),
             'intersections' : resultJson.get('intersections'),
             'vessels' : resultJson.get('vessels'),
             'motion': resultJson.get('motion'),
             'FOV' : resultJson.get('FOV')
             }
    
    ref = db.collection("JSON-strings").add(dbDict) #Adds the 
    respDict = {"wrote":True} #Just sends a token response back to the frontend to keep it happy
    return jsonify(respDict)
    
if __name__ == "__main__":
	
	app.run()
