from src.server.instance import server
from src.controllers.models import *

#Inicia a app
if __name__ == '__main__':
    app = server.app
    app.run(debug=True)
