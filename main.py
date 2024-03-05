from flask import Flask

import pages

def create_app():
    app = Flask(__name__)
    app.register_blueprint(pages.bp)
    return app
    
app = create_app()
    
if __name__ == "__main__":
	
	app.run()
