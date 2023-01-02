from src.server.instance import server
from src.controllers.models import *

if __name__ == '__main__':
    app = server.app
    app.run(debug=True)