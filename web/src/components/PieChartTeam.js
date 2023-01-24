import React, { useState } from "react";
import { Chart } from "react-google-charts";

import ip from '../config/ip';


const Pie = (id) => {
  const options = {
    title: "Estatísticas Equipa 1",
    is3D: true,
  };

  const [relatorios, setRelatorio] = useState([]);

  async function getRelatorios(id){
    const res = await fetch(ip.backend_ip + "equiRel/" + id);
    const relatoriosAux = await res.json();
    setRelatorio(relatoriosAux);
  }

  function estatistica (){
    let i ;
    let passo_1, passo_3, passo_5, passo_7, passo_9, passo_11, passo_12, passo_13;
    for (i = 0; i < relatorios.length; i++){
      passo_1 += relatorios[i].passo_1
      passo_3 += relatorios[i].passo_3
      passo_5 += relatorios[i].passo_5
      passo_7 += relatorios[i].passo_7
      passo_9 += relatorios[i].passo_9
      passo_11 += relatorios[i].passo_11
      passo_12 += relatorios[i].passo_12
      passo_13 += relatorios[i].passo_13
    }
    const data = [
      ["Passos", "Numero de erros"],
      ["Passo 1", passo_1],
      ["Passo 3", passo_3],
      ["Passo 5", passo_5],
      ["Passo 7", passo_7],
      ["Passo 9", passo_9],
      ["Passo 11", passo_11],
      ["Passo 12", passo_12],
      ["Passo 13", passo_13],
    ];
    return data;
  }


  React.useEffect(() => {
    getRelatorios(id);
  }, []);


  return (
    <Chart
      chartType="PieChart"
      data={estatistica()}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default Pie;
