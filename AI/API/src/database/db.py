import torch

class Database():
    def __init__(self,):
        self.models = [
            torch.hub.load('ultralytics/yolov5', 'custom', path='static/weights/model0/best.pt', device='cpu', force_reload=True),
            torch.hub.load('ultralytics/yolov5', 'custom', path='static/weights/model1/best.pt', device='cpu', force_reload=True)
        ]
        self.models_info = [
            {
                "id": 0,
                "description": "Deteção do PDO aberto e fechado e do tabuleiro aberto e fechado"
            },
            {
                "id": 1,
                "description": "Deteção de conectores ocupados e livres, bem como drops ocupados e livres"
            }
        ]
    
    def getModels(self,):
        return self.models 

    def getModelsInfo(self,):
        return self.models_info

db = Database()
