# Rotas de acesso à API:
* GET https://api-dst.herokuapp.com/detect -> Devolve um JSON com uma descrição dos modelos existentes na API.
* POST https://api-dst.herokuapp.com/detect -> Utilizada para enviar uma imagem à API. No body deste POST deve ser incluída a imagem, a indicação do passo em que se está no trabalho, e se necessário o conector que se pretende identificar.
    
# Ficheiros mais importantes:
* main.py: Ficheiro responsável por iniciar a execução de todo o código que diz respeito à API.
* requirements.txt: Contém todos os packages necessários para a API instalar corretamente. Podem ser instalados com o comando 'pip install -r requirements.txt'.
* Procfile: Ficheiro criado exclusivamente para configurar o ambiente do Heroku. Lança um serviço para a API executar na cloud através do gunicorn.
* Aptfile: Ficheiro também utilizado para configurar alguns packages no Heroku, nomeadamente os packages associados à tarefa de reconhecimento de carateres.
* Pasta 'static/': Pasta utilizada para armazenar conteúdos estáticos necessários na execução da API.
* 'static/grids/': Contém ficheiros json com as coordenadas de referência das caixas de identificação dos conectores e dos drops. Para obter estas coordenadas escolhemos uma imagem de referência para os conectores, e outra para os drops, e fizemos uma etiquetagem de todos os drops e conectores (utilizando a ferramenta Roboflow). Sempre que uma nova imagem for captada pelo utilizador da aplicação as deteções da mesma serão comparadas com as caixas de referência, que estão indicadas nos ficheiros desta pasta.
* 'static/weights/': Pesos resultantes de todos os modelos treinados (utilizando o YOLO versão 5). Para os treinar e criar os datasets utilizamos a ferramenta Roboflow.
* Pasta 'src/': Contém todo o código da aplicação, separado em várias pastas.
* Ficheiro 'src/server/instance.py': Código de lançamento do servidor (que engloba a api).
* Ficheiro 'src/database/db.py': Aqui são armazenados os modelos já treinados, que são imediatamente carregados quando a API inicia. Estes são carregados através dos pesos que constam na pasta 'static/weights'. Também existe uma descrição de cada um dos modelos, para se saber o que eles fazem.
* Ficheiro 'src/controllers/models.py': Ficheiro mais importante pois contém o código relativo às tarefas inteligentes da aplicação. Neste código há processamento das imagens e dos carateres das mesmas, nos seguintes passos de trabalho: 1, 2, 3, 4, 5, 7, 9 e 12.
    
# Outras ferramentas que serviram de apoio à construção desta API:
* Roboflow: https://roboflow.com/ -> Utilizado para criar os datasets, etiquetar imagens e gerir os modelos de Object Detection.
* YOLOv5: https://github.com/ultralytics/yolov5 -> Utilizado para aproveitar os pesos dos modelos do YOLOv5. Esses pesos foram adaptados para detetar objetos do PDO, através de transfer learning.
