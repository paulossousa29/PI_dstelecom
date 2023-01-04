from flask import Flask
from flask_restx import Api, Resource, reqparse
from werkzeug.datastructures import FileStorage
from PIL import Image
import matplotlib.pyplot as plt

import torch

from src.server.instance import server
from src.database.db import db

app, api = server.app, server.api

models = db.getModels()
models_info = db.getModelsInfo()

parser = api.parser()
parser.add_argument('image', type=FileStorage, location='files', required=True)

@api.route('/detect')
class ObjectDetection(Resource):
    def get(self,):
        return models_info

    @api.expect(parser)
    def post(self,): 
        args = parser.parse_args()
        print(f'Args: {args}')
        uploaded_file = args['image']  # This is FileStorage instance

        print(f'Uploaded file: {uploaded_file}')

        img = Image.open(uploaded_file)
        print(img)
        
        model = models[0]
        results = model(img)

        print(results)

        outputs = results.pandas().xyxy[0]
        outputs['class'] = outputs.index
        labels = outputs[['class','name']]
        outputs_json = labels.to_json(orient='records')
        print(outputs_json)
        #output_names_json = label_outputs['name']

        return outputs_json, 200