/***************************************************************************************************************************
 Vinícius Machado 15/09/17
 As funções a seguir são usadas para a interface WEB (Botões, inputs, console), chamando as funções da classe grafo acima.
 Evitem mexer pelos controles dos buttons etc
****************************************************************************************************************************/
    function adicionaGrafo(opcao){
        if(opcao === 1){
            grafo =  new Grafo(true,true);
        }else if(opcao === 2){
            grafo =  new Grafo(true,false);
        }else if(opcao === 3){
            grafo =  new Grafo(false,true);
        }else if(opcao === 4){
            grafo =  new Grafo(false,false);
        }
        imprimeNotificacao("Grafo criado com sucesso!", "success");
		
    }

    function adicionaVertice(){
        
        var vertice = document.getElementById('inputAddVertice');
      
        if(vertice.value != ''){
            grafo.addVertice(vertice.value);
            imprimeNotificacao("Vertice adicionado com sucesso", "success");
            vertice.value = '';
      
      }else{
        imprimeNotificacao("Valores não podem ser vazios!", "error");
      }
    }

    function adicionaAresta(){

        var vertice1 = document.getElementById('inputAddAresta1');
        var vertice2 = document.getElementById('inputAddAresta2');

        if(vertice1.value != '' && vertice2.value != ''){
          
          grafo.addAresta(vertice1.value, vertice2.value);  
          vertice1.value = '';
          vertice2.value = '';

        }else{
           imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    }

     function adicionaArco(){

        var vertice1 = document.getElementById('inputAddAresta1');
        var vertice2 = document.getElementById('inputAddAresta2');

        if(vertice1.value != '' && vertice2.value != ''){
          
          grafo.addArco(vertice1.value, vertice2.value);  
          vertice1.value = '';
          vertice2.value = '';

        }else{
           imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    }

    function adicionaArestaPonderada(){
        
        var vertice1 = document.getElementById('inputAddArestaPond1');
        var vertice2 = document.getElementById('inputAddArestaPond2');
        var peso = document.getElementById('inputAddPesoPond');

        if(vertice1.value != '' && vertice2.value != '' && peso.value != ''){
            grafo.addArestaPonderada(vertice1.value, vertice2.value, peso.value);  
            vertice1.value = '';
            vertice2.value = '';
            peso.value = '';
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    }

 function adicionaArcoPonderado(){

     var vertice1 = document.getElementById('inputAddArestaPond1');
     var vertice2 = document.getElementById('inputAddArestaPond2');
     var peso = document.getElementById('inputAddPesoPond');
	 
     if(vertice1.value != '' && vertice2.value != '' && peso.value != ''){
         grafo.addArcoPonderado(vertice1.value, vertice2.value, peso.value);
         vertice1.value = '';
         vertice2.value = '';
         peso.value = '';
     }else{
        imprimeNotificacao("Valores não podem ser vazios!", "error");
     }
 }

    function removeVertice(){
        
        var vertice = document.getElementById('inputDelVertice');

        if(vertice.value != ''){ 
            grafo.removerVertice(vertice.value);
            vertice.value = '';
        }else{
           imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    }

    function removeLigacao(){
        
        var origem = document.getElementById('inputDelLigacao1');
        var destino = document.getElementById('inputDelLigacao2');

        if(origem.value != '' && destino.value != ''){  
            grafo.removerLigacao(origem.value, destino.value);  
            origem.value = '';
            destino.value = '';
            imprimeNotificacao("Ligação removida com sucesso!", "success");
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        } 
    }

//***********************ÁREA DE BUSCAS**********************

    function dfsComDestino(){
        
        var origem = document.getElementById('inputOrigemBuscaDestino');
        var destino = document.getElementById('inputDestinoBuscaDestino');

        if(origem.value != '' && destino.value != ''){ 
            grafo.dfsComDestino(origem.value, destino.value);  
            origem.value = '';
            destino.value = '';
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        } 
    }

    function bfsComDestino(){
        
        var origem = document.getElementById('inputOrigemBuscaDestino');
        var destino = document.getElementById('inputDestinoBuscaDestino');

        if(origem.value != '' && destino.value != ''){    
            grafo.bfsComDestino(origem.value, destino.value);  
            origem.value = '';
            destino.value = '';
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        } 
    }

    function dfsSemDestino(){

        var origem = document.getElementById('inputOrigemBuscaSemDestino');

        if(origem.value != ''){
            grafo.dfsSemDestino(origem.value);
            origem.value = '';
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    }

    function bfsSemDestino(){

        var origem = document.getElementById('inputOrigemBuscaSemDestino');

        if(origem.value != ''){
            grafo.bfsSemDestino(origem.value);
            origem.value = '';
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    }

	function dijkstraSemDestino(){
		var origem = document.getElementById('inputOrigemBuscaSemDestino');
		if (origem.value != ''){
			if (grafo.vertices.indexOf(origem.value) == -1){
				imprimeNotificacao("Vértice não existe!", "error");
				return false;
			}
			grafo.dijkstra(origem.value);
		} else{
			imprimeNotificacao("Valores não podem ser vazios!", "error");
		}
	}
	
	function dijkstraComDestino(){
		var origem   = document.getElementById('inputOrigemBuscaDestino');
		var destino  = document.getElementById('inputDestinoBuscaDestino');
		if (origem.value != '' && destino.value != ''){
			if (grafo.vertices.indexOf(origem.value) == -1 || grafo.vertices.indexOf(destino.value) == -1){
				imprimeNotificacao("Vértice não existe!", "error");
				return false;
			}
			grafo.dijkstra(origem.value, destino.value);
		} else{
			imprimeNotificacao("Valores não podem ser vazios!", "error");
		}
	}
//***********************ÁREA DE DIVERSOS**********************

    function retornaLigacoes(){

        var vertice = document.getElementById('inputRetornarLigacoes');

        if(vertice.value != ''){
            grafo.retornarLigacoes(vertice.value);
            vertice.value = '';
        }else{
           imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    }

    function existeLigacao(){

        var origem = document.getElementById('inputExisteLigacaoOrigem');
        var destino = document.getElementById('inputExisteLigacaoDestino');

        if(origem.value != '' && destino.value != ''){  
            grafo.existeLigacao(origem.value, destino.value);  
            origem.value = '';
            destino.value = '';
        }else{
           imprimeNotificacao("Valores não podem ser vazios!", "error");
        } 
    }

    function existeVertice(){
        
        var vertice = document.getElementById('inputExisteVertice');

        if(vertice.value != ''){
            grafo.existeVertice(vertice.value);
            vertice.value = '';
        }else{
            imprimeNotificacao("Valores não podem ser vazios!", "error");
        }
    }

//***********************ÁREA DE IMPRESSÃO**********************

    function imprimeVertices() {
        var logger = document.getElementById('log'); 
        logger.innerHTML += '<br />'; 
        logger.innerHTML += grafo.vertices + '<br />'; 
    }

    function imprimeMatriz() {
        var logger = document.getElementById('log');  
        logger.innerHTML += '<br />';

        this.matriz = new Array();
        for(i=0;i < grafo.vertices.length; i++) {
            this.matriz[i] = new Array();
            for(j=0; j < grafo.vertices.length; j++){
                this.matriz[i][j] = 0;
                for(k=0; k< grafo.ligacao[grafo.vertices[i]].length; k++){
                    if(grafo.ligacao[grafo.vertices[i]][k][0] === grafo.vertices[j]) {
                        this.matriz[i][j] = grafo.ligacao[grafo.vertices[i]][k][1];   
                    }   
                }
            }
        }

        logger.innerHTML += '  [ ## ]  ';

        for(i=0;i < grafo.vertices.length; i++) {
            logger.innerHTML += '  [' + grafo.vertices[i] + ']  '; 
        }
        
        logger.innerHTML += '<br />'; 

        for(i=0;i < this.matriz.length; i++) {
          
            logger.innerHTML += '  [ ' + grafo.vertices[i] + ' ]  ';   
           
            for(j=0; j < this.matriz.length; j++){
               logger.innerHTML += '  [  ' + this.matriz[i][j] + ' ]  '; 
            }
            logger.innerHTML += '<br />'; 
        }  
    }

 function imprimeLista() {
     var logger = document.getElementById('log');
     logger.innerHTML += '<br />';

     console.log(grafo.ligacao);
     for(var i=0;i<grafo.vertices.length;i++){
         logger.innerHTML += grafo.vertices[i] + ' -> ';
         for(var j=0; j<grafo.ligacao[grafo.vertices[i]].length; j++){
             logger.innerHTML += ' | ' + grafo.ligacao[grafo.vertices[i]][j][0]
         }
         logger.innerHTML += '<br>';
     }
 }

function limparConsole(){
    var logger = document.getElementById('log');  
    logger.innerHTML = '<br />';
}

//*********************** ÁREA DE COLORAÇÃO **********************

function coloreWelshAndPowell(){

    if(grafo.vertices.length > 0){
         grafo.desenhaCanvasLigacoes("welshAndPowell");
     }else{
        imprimeNotificacao("Não existem Vértices!", "warn"); 
     }
}

function coloreDsatur(){

    if(grafo.vertices.length > 0){
        grafo.desenhaCanvasLigacoes("dsatur");
     }else{
        imprimeNotificacao("Não existem Vértices!", "warn"); 
     }
}
//*********************** ÁREA DE ÁRVORE MÍNIMA / FLUXO MÁXIMO **********************

function desenhaPrim(){

    if(grafo.vertices.length > 0){
        grafo.desenhaCanvasLigacoes("prim");
     }else{
        imprimeNotificacao("Não existem Vértices!", "warn"); 
     }
}


function desenhaKruskal(){
    
    if(grafo.vertices.length > 0){
        grafo.desenhaCanvasLigacoes("kruskal");
     }else{
        imprimeNotificacao("Não existem Vértices!", "warn"); 
     }
}

function solucaoFordFukerson(){
    
    if(grafo.vertices.length > 0){
        grafo.fordFukerson();
    }else{
        imprimeNotificacao("Não existem Vértices!", "warn"); 
    }
}

//***************  TESTE DE PLANARIDADE  ***************

function testePlanaridade() {
    var result = grafo.ePlanar();
    var resposta = '';
    if(result === 0){
        resposta = 'É PLANAR';
    }
    else if(result === 1){
        resposta = 'PODE SER PLANAR';
    }
    else if(result === 2){
        resposta = 'NÃO PODE SER PLANAR';
    }
    document.getElementById('resultadoPlanariade').innerHTML = resposta;
}