import torch

class Database():
    def __init__(self,):
        self.models = [
            torch.hub.load('ultralytics/yolov5', 'custom', path='static/weights/estadoPDO/best.pt', device='cpu', force_reload=True),
            torch.hub.load('ultralytics/yolov5', 'custom', path='static/weights/conectores/best.pt', device='cpu', force_reload=True),
            torch.hub.load('ultralytics/yolov5', 'custom', path='static/weights/drops/best.pt', device='cpu', force_reload=True)
        ]
        self.models_info = [
            {
                "id": 0,
                "description": "Deteção do PDO aberto e fechado e do tabuleiro aberto e fechado"
            },
            {
                "id": 1,
                "description": "Deteção de conectores ocupados e livres"
            },
            {
                "id": 2,
                "description": "Deteção de drops ocupados e livres"
            }
        ]
    
    def getModels(self,):
        return self.models 

    def getModelsInfo(self,):
        return self.models_info

db = Database()
