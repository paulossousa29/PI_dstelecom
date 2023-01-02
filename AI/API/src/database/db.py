import torch

class Database():
    def __init__(self,):
        self.models = [
            torch.hub.load('ultralytics/yolov5', 'custom', path='static/weights/best.pt', device='cpu')
        ]
        self.models_info = [
            {
                "id": 0,
                "description": "Deteção do PDO aberto e fechado e do tabuleiro aberto e fechado"
            }
        ]
    
    def getModels(self,):
        return self.models 

    def getModelsInfo(self,):
        return self.models_info

db = Database()
