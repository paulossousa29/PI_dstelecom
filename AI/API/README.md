Rotas de acesso à API:

    - GET https://api-dst.herokuapp.com/detect -> Devolve um JSON com a informação dos modelos pré-treinados da API
    - POST https://api-dst.herokuapp.com/detect -> Utilizada para enviar uma imagem à API. No body deste POST deve ser incluída a imagem,
    a indicação do passo em que se está no trabalho, e se necessário o conector que se pretende identificar.
