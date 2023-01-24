from flask import Flask, send_file
from flask_restx import Api, Resource, reqparse
from werkzeug.datastructures import FileStorage
from PIL import Image
import json
import matplotlib.pyplot as plt
import math
import base64
from io import BytesIO
import pytesseract
import cv2 
import imutils

import torch
import torchvision
from torchvision.io import read_image
from torchvision.utils import draw_bounding_boxes
import torchvision.transforms as transforms
import numpy as np
import glob 
import webcolors

from src.server.instance import server
from src.database.db import db

app, api = server.app, server.api

models = db.getModels()
models_info = db.getModelsInfo()

# vars globais
parser = api.parser()
parser.add_argument('image', type=FileStorage, location='files', required=True)
parser.add_argument('step', type=int, required=True)
parser.add_argument('connector', type=int)
pytesseract.pytesseract.tesseract_cmd = '/app/.apt/usr/bin/tesseract'


def box_center(box):
    xmin = box[0]
    ymin = box[1]
    xmax = box[2]
    ymax = box[3]

    center_x = (xmax - xmin) / 2
    center_y = (ymax - ymin) / 2

    return xmin + center_x, ymin + center_y


def getDropId(grid_box, values):
    count = 0
    min_id = None
    min_diff = None

    while count < len(values):
        real_box = values[count]

        x_grid, y_grid = box_center(grid_box)
        x_real, y_real = box_center(real_box)

        diff = math.sqrt(((x_grid - x_real) * (x_grid - x_real)) +
                         ((y_grid - y_real) * (y_grid - y_real)))

        if count == 0 or diff < min_diff:
            min_diff = diff
            min_id = count

        count += 1

    return min_id


def getConectorId(grid_box, values):
    count = 0
    min_id = None
    min_diff = None

    while count < len(values):
        real_box = values[count]

        x_grid, y_grid = box_center(grid_box)
        x_real, y_real = box_center(real_box)

        diff = math.sqrt(((x_grid - x_real) * (x_grid - x_real)) +
                         ((y_grid - y_real) * (y_grid - y_real)))

        if count == 0 or diff < min_diff:
            min_diff = diff
            min_id = count

        count += 1

    return min_id


def pil2datauri(img):
    # converts PIL image to datauri
    data = BytesIO()
    img.save(data, "JPEG")
    data64 = base64.b64encode(data.getvalue())
    return u'data:img/jpeg;base64,'+data64.decode('utf-8')


def getFirstAvailableDrop(grid, values):

 for grid_box in grid:
  box_list = [grid_box['xmin'], grid_box['ymin'], grid_box['xmax'], grid_box['ymax']]
  id = getDropId(box_list, values)
  row = values[id]
  label = row[6]
  num_drop = grid_box['label']

  if label == 'DropLivre':
    return np.append(row, [num_drop], axis=0)

def verifyOcupationDrop(num_drop, grid, values):
  grid_box = grid[num_drop-1]
  box_list = [grid_box['xmin'], grid_box['ymin'], grid_box['xmax'], grid_box['ymax']]
  id = getDropId(box_list, values)
  row = values[id]
  label = row[6]

  if str(num_drop) != grid_box['label']:
    print('Erro: drop diferente do suposto')
  
  return label == 'DropOcupado'

def verifyOcupationConnector(num_connector, grid, values):
  grid_box = grid[num_connector-1]
  box_list = [grid_box['xmin'], grid_box['ymin'], grid_box['xmax'], grid_box['ymax']]
  id = getConectorId(box_list, values)
  row = values[id]
  label = row[6]

  if str(num_connector) != grid_box['label']:
    print('Erro: conetor diferente do suposto')
  
  return label == 'ConectorOcupado'

def most_common_used_color(img):
    # Get width and height of Image
    width, height = img.size
 
    # Initialize Variable
    r_total = 0
    g_total = 0
    b_total = 0
 
    count = 0
 
    # Iterate through each pixel
    for x in range(0, width):
        for y in range(0, height):
            # r,g,b value of pixel
            r, g, b = img.getpixel((x, y))
 
            r_total += r
            g_total += g
            b_total += b
            count += 1
 
    return (r_total/count, g_total/count, b_total/count)

def closest_colour(requested_colour):
    min_colours = {}
    for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
        r_c, g_c, b_c = webcolors.hex_to_rgb(key)
        rd = (r_c - requested_colour[0]) ** 2
        gd = (g_c - requested_colour[1]) ** 2
        bd = (b_c - requested_colour[2]) ** 2
        min_colours[(rd + gd + bd)] = name
    return min_colours[min(min_colours.keys())]

def get_colour_name(requested_colour):
    try:
        closest_name = actual_name = webcolors.rgb_to_name(requested_colour)
    except ValueError:
        closest_name = closest_colour(requested_colour)
        actual_name = None
    return actual_name, closest_name

# PASSO 1: Identificar a referencia do PDO e verificar se coincide com a ordem de trabalho
def step1(img):
    output = {}
    model_ids = [0, 4]

    # 1. Verificar se o PDO está fechado com o modelo de Object Detection
    # Se não reconhecer um PDO fechado apontamos essa falha no relatório final

    print('Modelo de deteção do estado do PDO!')

    original_size = img.size
    img = img.resize((640, 640))

    model = models[model_ids[0]]
    results = model(img)
    outputs = results.pandas().xyxy[0]
    outputs['class'] = outputs.index
    labels = outputs[['class', 'name']]

    img = img.resize(original_size)

    '''if 'PDOFechado' in labels['name'].unique():
    print('PDO está fechado')
  else:
    #Apontar falha no relatório final
    outputs_json = labels.to_json(orient='records')
    print('Outputs do passo 1 (verificar o estado do PDO):', outputs_json)
    output = {'error': 'Não foi detetado um PDO fechado'}'''

    # 2. Tentamos verificar a referência do PDO
    # Se falhar também incluimos a falha no relatório final
    print('Modelo para detetar referência')
    image = img.convert('RGB')
    image = np.array(image) 
    #Convert to BGR
    image = image[:, :, ::-1].copy() 
    #image = cv2.imread(img_path)
    #image = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    ret, thresh = cv2.threshold(gray, 150, 255, 0)

    blurred = cv2.GaussianBlur(thresh, (5, 5), 0)

    edged = cv2.Canny(blurred, 150, 255)

    contours = cv2.findContours(
        edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(contours)
    displayContornos = []

    for cnt in contours:
        peri = cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, 0.03 * peri, True)
        if len(approx) == 4:
            displayContornos.append(approx)

    reference = None
    max_area = 0

    for c in displayContornos:
        if max_area < cv2.contourArea(c):
            (_, _, wR, hR) = cv2.boundingRect(c)
            if wR > hR:
                max_area = cv2.contourArea(c)
                reference = c

    (x, y, w, h) = cv2.boundingRect(reference)
    rect = cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 1)

    roi = image[y:y+h, x:x+w]

    myconfig = r"--psm 11 --oem 3"

    ref = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)

    _, threshIm = cv2.threshold(ref, 125, 255, cv2.THRESH_BINARY)
    blurred = cv2.GaussianBlur(threshIm, (5, 5), 0)

    string = pytesseract.image_to_string(blurred, config=myconfig)

    final_string = ''
    aux_string = ''

    sections = string.split('/')

    if len(sections[0]) > 3:
        sections[0] = sections[0][1:]
        for s in sections:
            aux_string += s + '/'
        string = aux_string[:-1]

    for c in string:
        if c.isalpha() or c.isnumeric() or c == '/':
            final_string += c
        elif c == '$':
            c = 'S'
            final_string += c

    print('Element: ',final_string)

    output = {'element': final_string}

    return output, 200

# PASSO 2: Verificar a disponibilidade do conetor
def step2(img, original_size, connector):
    output = {}
    status = 200

    if connector == None:
        output = {'error': 'Não foi recebido o número do conector!'}
        status = 501
    else:
        model = models[1]
        results = model(img)
        outputs = results.pandas().xyxy[0]

        outputs.drop(outputs[outputs['confidence'] < 0.55].index, inplace=True)
        values = outputs.values
        print(values[:3])

        # Open grid
        f = open(
            'static/grids/Conectores/grid_conectors_esquerda_pra_direita.json', 'r')
        grid = json.load(f)
        f.close()

        # Get ref box
        grid_box = grid['grid'][connector-1]
        label = grid_box['label']
        grid_box = [grid_box['xmin'], grid_box['ymin'],
                    grid_box['xmax'], grid_box['ymax']]

        # Get id
        id_escolhido = getConectorId(grid_box, values)

        # Identificar na imagem
        transform = transforms.Compose([
            transforms.PILToTensor()
        ])
        img = transform(img)

        boxes = []
        #labels = []
        colors = []

        if len(values) > 0:
            row = values[id_escolhido]

            label = row[6]
            xmin = row[0]
            ymin = row[1]
            xmax = row[2]
            ymax = row[3]

            labels = [str(connector)]

            box = [xmin, ymin, xmax, ymax]
            boxes.append(box)

            color = 'red' if label == 'ConectorOcupado' else 'yellow'
            colors.append(color)

            boxes = torch.tensor(boxes, dtype=torch.float)

            img = draw_bounding_boxes(img,
                                      boxes=boxes,
                                      labels=labels,
                                      colors=colors,
                                      width=4)

            '''img = draw_bounding_boxes(img,
                              boxes=boxes,
                              colors=colors,
                              width=3)'''

            img = torchvision.transforms.ToPILImage()(img)
            img = img.resize(original_size)

            img_uri = pil2datauri(img)

            print('imagem detetada')
            #print('image uri: ', img_uri)
            output = {'image': {
                'uri': img_uri,
                'type': 'image/jpeg',
                'name': 'image.jpeg'
            }}
        else:
            output = {'error': 'O resultado da deteção não teve sucesso!'}
    print('modelo com id == 1')

    return output, status

# PASSO 3: Medir a potencia ótica no conetor
def step3():
    return {'power1490': -20, 'power1550': -10}, 200

# PASSO 4: Verificar o slot para a saída do cabo de drop
def step4(img, original_size):
    output = {}

    model = models[2]
    results = model(img)
    outputs = results.pandas().xyxy[0]

    #outputs.drop(outputs[outputs['confidence'] < 0.55].index, inplace=True)
    #num_ocupados = len(outputs.loc[outputs['name'] == 'DropOcupado'].values)
    values = outputs.values
    print(values[:3])

    # Open grid
    f = open('static/grids/Drops/grid.json', 'r')
    grid = json.load(f)
    f.close()

    if len(values) > 0:
        # Get available drop
        d = getFirstAvailableDrop(grid['grid'], values)

        # Identificar na imagem
        transform = transforms.Compose([
            transforms.PILToTensor()
        ])
        img = transform(img)

        boxes = []
        labels = []
        colors = []

        label = d[6]
        xmin = d[0]
        ymin = d[1]
        xmax = d[2]
        ymax = d[3]
        num_drop = d[7]

        labels.append(num_drop)

        box = [xmin, ymin, xmax, ymax]
        boxes.append(box)

        color = 'red' if label == 'DropOcupado' else 'yellow'
        colors.append(color)

        boxes = torch.tensor(boxes, dtype=torch.float)

        img = draw_bounding_boxes(img,
                                  boxes=boxes,
                                  labels=labels,
                                  colors=colors,
                                  width=4)

        img = torchvision.transforms.ToPILImage()(img)
        img = img.resize(original_size)

        print('Drop devolvido pela função: ', num_drop)
        server.setDrop(int(num_drop))
        print('Drop guardado no servidor: ', str(server.getDrop()))

        img_uri = pil2datauri(img)

        print('imagem detetada no passo 4')
        #print('image uri: ', img_uri)
        output = {'image': {
            'uri': img_uri,
            'type': 'image/jpeg',
            'name': 'image.jpeg'
        }}

    else:
        output = {'error': 'O resultado da deteção não teve sucesso!'}

    return output, 200

# PASSO 5: Passar o cabo de drop pelo slot
def step5(img):
    # Fazer uma nova deteção à imagem
    output = {}
    drop = server.getDrop()
    print('Drop a ser verificado: ', str(drop))

    model = models[2]
    results = model(img)
    outputs = results.pandas().xyxy[0]

    outputs.drop(outputs[outputs['confidence'] < 0.55].index, inplace=True)
    values = outputs.values
    print(values[:3])

    # Open grid
    f = open('static/grids/Drops/grid.json', 'r')
    grid = json.load(f)
    f.close()
    
    # Verifico se a deteção indica que é um drop ocupado
    if verifyOcupationDrop(drop, grid['grid'], values):
        output = {'result': 'true'}
    else:
        output = {'result': 'false'}

    server.setDrop(None)

    return output, 200

# PASSO 7: Identificar o tabuleiro verde para fusão
def step7(img):
    output = {}

    model = models[0]
    results = model(img)

    crops = results.crop()
    if len(crops) > 0:
        array = crops[0]['im']
        img = cv2.cvtColor(array, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(img)

        common_color = most_common_used_color(img)
        _, closest_name = get_colour_name(common_color)
    else:
        output = {'error': 'Nenhum tabuleiro aberto detetado!'}

    if 'green' in closest_name:
        output = {'result': 'true'}
    else:
        output = {'result': 'false'}

    return output, 200

# PASSO 9: Ligar no conetor
def step9(img, connector):
    output = {}

    # Fazer uma nova deteção à imagem
    model = models[1]
    results = model(img)
    outputs = results.pandas().xyxy[0]

    outputs.drop(outputs[outputs['confidence'] < 0.55].index, inplace=True)
    values = outputs.values
    print(values[:3])

    # Open grid
    f = open('static/grids/Conectores/grid_conectors_esquerda_pra_direita.json', 'r')
    grid = json.load(f)
    f.close()
    
    # Verifico se a deteção indica que é um conector ocupado
    if verifyOcupationConnector(connector, grid['grid'], values):
        output = {'result': 'true'}
    else:
        output = {'result': 'false'}

    # Caso seja retornar true
    return output, 200

# PASSO 11: Verificar revestimento dos cabos
def step11():
    return {'result': 'true'}, 200

# PASSO 12: Fechar o Tabuleiro
def step12(img):
    output = {}

    # 1. Verificar se o PDO está fechado com o modelo de Object Detection
    # Se não reconhecer um PDO fechado apontamos essa falha no relatório final

    print('Modelo de deteção do estado do PDO!')
    model = models[0]
    results = model(img)
    outputs = results.pandas().xyxy[0]
    outputs['class'] = outputs.index
    labels = outputs[['class', 'name']]

    if 'PDOFechado' in labels['name'].unique():
        print('PDO está fechado')
        output = {'result': 'true'}
    else:
        # Apontar falha no relatório final
        outputs_json = labels.to_json(orient='records')
        print('Outputs do passo 12 (verificar o estado do PDO):', outputs_json)
        output = {'error': 'Não foi detetado um PDO fechado'}

    return output, 200

# PASSO 13: Colocar a tag no cabo de drop
def step13():
    return {'access': 'FTTH_DST_00362667'}, 200


@api.route('/detect')
class ObjectDetection(Resource):
    def get(self,):
        return models_info

    @api.expect(parser)
    def post(self,):
        args = parser.parse_args()
        print(f'Args: {args}')
        uploaded_file = args['image']  # This is FileStorage instance
        step = args['step']
        connector = args['connector']
        print('Step: ', step)
        print('Connector: ', connector)

        if step == None:
            return {'error': 'Erro ao reconhecer o passo do trabalho.'}, 500

        else:
            print(f'Uploaded file: {uploaded_file}')

            img = Image.open(uploaded_file)

            if step != 1:
                original_size = img.size
                img = img.resize((640, 640))

            if step == 1:
                return step1(img)
            elif step == 2:
                return step2(img, original_size, connector)
            elif step == 3:
                return step3()
            elif step == 4:
                return step4(img, original_size)
            elif step == 5:
                return step5(img)
            elif step == 7:
                return step7(img)
            elif step == 9:
                return step9(img, connector)
            elif step == 11:
                return step11()
            elif step == 12:
                return step12(img)
            elif step == 13:
                return step13()
            else:
                return {'error': 'Passo errado'}, 502
