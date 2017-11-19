/***************************************************************************************************************************
 *
 * grafosLib.js
 *
 * Principal função do projeto.
 * As funções a seguir são usadas como bibliotecas para os botões e interações com os usuários.
 * Este arquivo deve ser SEMPRE carregado antes de qualquer script que for utilizar a classe GRAFO
 *
 *
 * Contém:
 *  >>Funçoes Básicas: Criação do Grafo, Vertices, Arestas, definção de Ponderado e Direcionado
 *  >>Funções de Busca: BFS, DFS e Djikstra
 *  >>Funções de Coloração: Desatur e Welsh And Powell
 *  >>Funções de Árvore mínima: Kruskal e Prim
 *  >>Funções de verificação: Planaridade
 *  >>Funções de Desenho: Desenho de Matriz de Adjacencia, Lista de Adjacencia
 *
 *
 *  Estrutura de um Grafo:
 *      >>vertices
 *          >>Array de nomes dos vértices criados
 *          >> estrutura: [nomeVertice,nomeVertice]
 *          >> ex.: ['A','B','C','D']
 *      >>ligacao
 *          >>Array com ligrações dos vértices.
 *          >>Cada vértice representa uma posição no array
 *          >>Cada posição tem um array das ligações do vértices,
 *            onde a posição 0 representa o vizinho e a posição 1 representa o peso da ligação
 *          >> estrutura: [
 *                          A[
 *                              [nomeVizinho,peso],
 *                              [nomeVizinho,peso],
 *                          ],
 *                          B[
 *                              [nomeVizinho,peso]
 *                          ]
 *                        ]
 *      >>dicerionado
 *          >>Representa com tipo boolean se o grafo é direcionado ou não
 *      >>ponderado
 *          >>Representa com tipo boolean se o grafo é direcionado ou não
 *

****************************************************************************************************************************/


    /*####################################################################################################################################/
     CLASSE GRAFO - Samuel Brati Favarin

     >> GRAFO POSSUI UM CONJUNTO DE VÉRTICES E UM CONJUNTO DE LIGAÇÕES (ARESTAS OU ARCOS)
     >> GRAFO PODE SER PONDERADO E/OU DIRECIONADO
     /*###############################################################################################################################*/

    function Grafo(_direcionado,_ponderado){
        this.vertices = [];
        this.ligacao  = [];
        this.direcionado = _direcionado;
        this.ponderado = _ponderado;
    }

    /*####################################################################################################################################/
     ADICIONA VERTICE PELO NOME - Samuel Brati Favarin

     >> INSERE O VERTICE NO CONJUNTO DE VERTICES
     >> CRIA NO CONJUNTO DE LIGAÇÃO UM ARRAY ONDE RECEBERÁ TODAS AS LIGAÇÕES DO VÉRTICE
     /*###############################################################################################################################*/

    Grafo.prototype.addVertice = function (vertice){
        this.vertices.push(vertice);
        this.ligacao[vertice] = [];
    };

    /*####################################################################################################################################/
        EXISTE VERTICE - Samuel Brati Favarin

     >> RECEBE O NOME DO VERTICE POR PARAMETRO, PROCURA NO OCNJUNTO DE VÉRTICES SE EXISTE
     /*###############################################################################################################################*/

    Grafo.prototype.existeVertice = function (vertice) {
        var logger = document.getElementById('log');

        for(var i=0; i<this.vertices.length; i++){
            if(this.vertices[i] === vertice){
                console.log(this.vertices[i]);
                console.log('Existe vértice!!!');
                
                imprimeNotificacao("Existe Vértice! Verifique o console", "success");
                
                logger.innerHTML += this.vertices[i] + '<br />';  

                return true;
            }
        }
        console.log('Vértice não encontrado');
        
        imprimeNotificacao("Vértice não encontrado!", "warn");

        logger.innerHTML = '<br />';  
        return false;
    };

    /*####################################################################################################################################/
     ADICIONA ARCO NÃO PONDERADO - Samuel Brati Favarin

     >> RECEBE UM VERTICE DE ORIGEM, E UM VÉRTICE DE DESTINO
     >> ATRIBUI 1 AO PESO E CHAMA a função addArco() PONDERADO
     /*###############################################################################################################################*/

    Grafo.prototype.addArco = function (vertice1,vertice2) {
        if(this.direcionado) {
            this.peso = 1;
            this.addArcoPonderado(vertice1, vertice2, this.peso);
        }else{
            console.log('Impossível adicionar Arco em grafos não direcionados');      
            imprimeNotificacao("Impossível adicionar Arco em grafos não direcionados!", "error");
        }
    };

    /*####################################################################################################################################/
     ADICIONA ARCO PONDERADO - Samuel Brati Favarin

     >> RECEBE O VERTICE DE ORIGEM, O VERTICE DE DESTINO E O PESO
     >> INSERE NO CONJUNTO DE LIGAÇÕES, NA POSIÇÃO DO VERTICE UM ARRAY COM O DESTINO E O PESO
     /*###############################################################################################################################*/

    Grafo.prototype.addArcoPonderado = function (vertice1,vertice2,_peso){
        if (this.direcionado) {
            this.ligacao[vertice1].push([vertice2, _peso]);  
            //imprimeNotificacao("Arco adicionado com sucesso!", "success");
        } else {
            console.log('Impossível adicionar Arco em grafos não direcionados');
            //imprimeNotificacao("Impossível adicionar Arco em grafos não direcionados!", "error");
        }
    };

    /*####################################################################################################################################/
     ADICIONA ARESTA NÃO PONDERADA - Samuel Brati Favarin

     >> RECEBE UM VERTICE DE ORIGEM, E UM VÉRTICE DE DESTINO
     >> ATRIBUI 1 AO PESO E CHAMA a função addAresta() PONDERADA
     /*###############################################################################################################################*/

    Grafo.prototype.addAresta = function (vertice1,vertice2) {
        if(!this.direcionado) {
            this.peso = 1;
            this.addArestaPonderada(vertice1, vertice2, this.peso);
        }else{
            console.log('Impossível adicionar Aresta em grafos direcionados');
            imprimeNotificacao("Impossível adicionar Aresta em grafos direcionados!", "error");
        }
    };

    /*####################################################################################################################################/
     ADICIONA ARESTA PONDERADA - Samuel Brati Favarin

     >> RECEBE O VERTICE DE ORIGEM, O VERTICE DE DESTINO E O PESO
     >> INSERE NO CONJUNTO DE LIGAÇÕES, NA POSIÇÃO DO VERTICE DE ORIGEM UM ARRAY COM O DESTINO NA POSIÇÃO 0 E O PESO NA POSIÇÃO 1
     >> INSERE NO CONJUNTO DE LIGAÇÕES, NA POSIÇÃO DO VERTICE DE DESTINO UM ARRAY COM O ORIGEM NA POSIÇÃO 0 E O PESO NA POSIÇÃO 1
     /*###############################################################################################################################*/

    Grafo.prototype.addArestaPonderada = function (vertice1,vertice2,_peso){
        if (!this.direcionado) {
            this.ligacao[vertice1].push([vertice2, _peso]);
            this.ligacao[vertice2].push([vertice1, _peso]);
	        //imprimeNotificacao("Aresta adicionado com sucesso!", "success");
        } else {
            console.log('Impossível adicionar Aresta em grafos direcionados');
            imprimeNotificacao("Impossível adicionar Aresta em grafos direcionados!", "error");
        }
    };

    /*####################################################################################################################################/
     EXISTE LIGAÇÕES - Samuel Brati Favarin

     >>SE FOR DIRECIONADO - PROCURA SE EXISTE O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES DO VERTICE ORIGEM
     >> SE NÃO FOR DIRECIONADO - PROCURA SE EXISTE O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES DO VERTICE ORIGEM E
        SE  EXISTE O VERTICE ORIGEM NO CONJUNTO DE LIGAÇÕES DO VERTICE DESTINO


     >>  _existeLigacao() = Mesma implementação da função existeLigacao() porém sem print no console
                         >> utilizada na contagem do numero de arestas, implementada na função calculaNumAresta()
     /*###############################################################################################################################*/

    Grafo.prototype.existeLigacao = function (origem,destino) {
        if(this.direcionado){
            for(var i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    console.log('Existe Arco!!!');
                    imprimeNotificacao("Existe Arco!", "success");
                    return true;
                }
            }
            console.log('Arco não encontrado!!!');
            imprimeNotificacao("Arco não encontrado!", "error");
            return false;
        }else{
            for(i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    for(var j =0; j<this.ligacao[destino].length; j++){
                        if(this.ligacao[destino][j][0] === origem){
                            console.log('Existe Aresta!!!');
                            imprimeNotificacao("Existe Aresta!", "success");
                            return true;
                        }
                    }
                }
            }
            console.log('Aresta não encontrada!!!');
            imprimeNotificacao("Aresta não encontrada!", "warn");
            return false;
        }
    };


    Grafo.prototype._existeLigacao = function (origem,destino) {
        if(this.direcionado){
            for(var i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    return true;
                }
            }
            return false;
        }else{
            for(i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    for(var j =0; j<this.ligacao[destino].length; j++){
                        if(this.ligacao[destino][j][0] === origem){
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    };

     /*####################################################################################################################################/
        RETORNAR LIGAÇÕES - Samuel Brati Favarin

            >>RETORNA A LISTA DE TODAS AS LIGAÇÕES DE UM VERTICE
     /*###############################################################################################################################*/

    Grafo.prototype.retornarLigacoes = function (vertice) {

        imprimeNotificacao("Ligações retornadas! Verifica o console", "success");
        var logger = document.getElementById('log');  
        for(var i=0;i < this.ligacao[vertice].length; i++) {
            logger.innerHTML += ' [ ' + this.ligacao[vertice][i][0] + ' ] ';     
        }

        return this.ligacao[vertice];
    };

    /*####################################################################################################################################/
     REMOVE ARESTA OU ARCO - Samuel Brati Favarin

         >>SE FOR DIRECIONADO - BUSCA O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES ORIGEM E EXCLUI
         >>SE NÃO FOR DIRECIONADO - BUSCA O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES ORIGEM E
           O VERTICE ORIGEM NO CONJUNTO DE LIGAÇÕES DESTINO E EXCLUI
     /*###############################################################################################################################*/

    Grafo.prototype.removerLigacao = function (origem,destino) {
        if(this.direcionado){
            for(var i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    //DELETA PESO
					this.ligacao[origem][i].pop();
					//DELETA VERTICE
                    this.ligacao[origem][i].pop();
					this.ligacao[origem].splice(i, 1);
					break;
                }
            }
        }else{
            for(i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    for(var j =0; j<this.ligacao[destino].length; j++){
                        if(this.ligacao[destino][j][0] === origem){
							// DELETA PESO
                            this.ligacao[origem][i].pop();
							//DELETA VERTICE
                            this.ligacao[origem][i].pop();
							//DELETA PESO
                            this.ligacao[destino][j].pop();
							//DELETA VERTICE
                            this.ligacao[destino][j].pop();
							this.ligacao[origem].splice(i, 1);
							this.ligacao[destino].splice(j, 1);
							break;
                        }
                    }
                }
            }
        }
    };

    /*####################################################################################################################################/
     REMOVE VERTICE PELO NOME, VERIFICANDO SE EXISTE O VERTICE NA POSIÇÃO PASSADA POR PARAMETRO - Samuel Brati Favarin

         >>CASO NÃO EXISTA RETORNA -1;
         >>BUSCA EM TODOS OS VERTICES E EXCLUÍ A LIGAÇÃO
     /*###############################################################################################################################*/

    Grafo.prototype.removerVertice = function (vertice) {
        var index_vertice = this.vertices.indexOf(vertice);
        if (index_vertice == -1){
            console.log("Vértice não existe");
            imprimeNotificacao("Vértice não existe!", "warn");
            return null;
        }

        this.vertices.splice(index_vertice, 1);
        for(var pos=0; pos < this.vertices.length; pos++) {
            this.removerLigacao(this.vertices[pos], vertice);
        }
        delete this.ligacao[vertice];
        imprimeNotificacao("Vértice removido com sucesso!", "success");
    };


    /*####################################################################################################################################/
     BFS SEM DESTINO - Samuel Brati Favarin

        >>PROCURA AS LIGAÇÕES DA PRIMEIRA POSIÇÃO DA FILA E TESTA SE JA FORAM VISITADAS
        >>COLOCA OS VERTICES ENCONTRADOS NA FILA
        >>DELETA O PRIMEIRO DA FILA
     /*###############################################################################################################################*/
    Grafo.prototype.bfsSemDestino = function (origem){
        var fila = [];
        fila.push(origem);
        var visitado = [];
        var naoVisitado = [];

        for(var l=0;l<this.vertices.length;l++){
            naoVisitado[this.vertices[l]] = true;
        }

        naoVisitado[origem] = false;
        var percorreuTudo = false;

        while(!percorreuTudo){
            while(fila.length > 0) {
                origem = fila.shift();
                visitado.push(origem);
                for(var i = 0; i < this.ligacao[origem].length; i++) {
                    if(naoVisitado[this.ligacao[origem][i][0]]) {
                        naoVisitado[this.ligacao[origem][i][0]] = false;
                        fila.push(this.ligacao[origem][i][0]);
                    }
                }

            }
            percorreuTudo = true;
            var primeiroEncontrado = 0;
			//TESTA SE EXISTE MAIS VÉRTICES A PERCORRER
            for(var k =0; k < this.vertices.length; k++){
                if(naoVisitado[this.vertices[k]]){
                    if(primeiroEncontrado<=0){
                        fila.push(this.vertices[k]);
                        naoVisitado[this.vertices[k]] = false;
                    }
                    percorreuTudo = false;
                    primeiroEncontrado++;
                }
            }
        }
        imprimeNotificacao("Vértice encontrado! Veja o Console", "success");
        var logger = document.getElementById('log');
        logger.innerHTML += visitado + '<br />';  

        console.log(visitado);
    };

    /*####################################################################################################################################/
        BFS COM DESTINO - Samuel Brati Favarin
     /*###############################################################################################################################*/
    Grafo.prototype.bfsComDestino = function(origem,destino){
        var fila = [];
        fila.push(origem);
        var visitado = [];
        var temp = origem;
        visitado[origem] = true;

        while(fila.length) {
            origem = fila.shift();
            for(var i = 0; i < this.ligacao[origem].length; i++) {
                if(!visitado[this.ligacao[origem][i][0]]) {
                    visitado[this.ligacao[origem][i][0]] = true;
                    visitado.push(this.ligacao[origem][i][0]);
                    fila.push(this.ligacao[origem][i][0]);
                }
                if (this.ligacao[origem][i][0] === destino){
                    
                    console.log('Vertice encontrado');
                    console.log(visitado);
                    imprimeNotificacao("Vértice encontrado! Veja o Console", "success");

                    var logger = document.getElementById('log');
                    logger.innerHTML += temp + '<br />';  

                    for(var j = 0; j < visitado.length; j++) {
                        logger.innerHTML += visitado[j] + '<br />';
                    }
                    return;
                }
            }
        }
        console.log("Vertice não encontrado");
        imprimeNotificacao("Vértice não encontrado!", "warn");
    };

    /*####################################################################################################################################/
        DFS SEM DESTINO - José
     /*###############################################################################################################################*/

    Grafo.prototype.dfsSemDestino = function (origem){
        var visitados   = [];
        var pilha       = [];

        pilha.push(origem);
        //visita a partir da origem
        this._dfsSemDestino(origem, visitados, pilha);
        for (var i = 0; i < Object.keys(this.ligacao).length; i++){
            var key = Object.keys(this.ligacao)[i];
            if (visitados.indexOf(key) == -1){
                pilha.push(key);
                this._dfsSemDestino(key, visitados, pilha);
            }
        }

        console.log(visitados);
        imprimeNotificacao("Caminho encontraado! Veja o console", "success");
        var logger = document.getElementById('log');  
        logger.innerHTML += visitados + '<br />';    
    };

    Grafo.prototype._dfsSemDestino = function(origem, visitados, pilha){
        while (pilha.length > 0){
            var nodo = pilha.pop();
            if (visitados.indexOf(nodo) == -1){
                visitados.push(nodo);
                for (var i = 0; i < this.ligacao[nodo].length; i++){
                    pilha.push(this.ligacao[nodo][i][0]);
                }
            }	
        }
    };

    /*####################################################################################################################################/
         DFS COM DESTINO - José
     /*##################################################################################################################################*/
    Grafo.prototype.dfsComDestino = function (origem,destino){
        var visitados   = [];
        var pilha       = [];
        pilha.push(origem);
        //visita a partir da origem
        while (pilha.length > 0){
            var nodo = pilha.pop();
			//SE O VERTICE NÃO FOI VISITADO
            if (visitados.indexOf(nodo) == -1){
                visitados.push(nodo);
                for (var i = 0; i < this.ligacao[nodo].length; i++){
                    pilha.push(this.ligacao[nodo][i][0]);
                    if(this.ligacao[nodo][i][0] === destino){
                        //console.log('Caminho encontrado');
                        visitados.push(this.ligacao[nodo][i][0]);
                        //console.log(visitados);
                        imprimeNotificacao("Caminho encontrado! Veja o Console", "success");
                        var logger = document.getElementById('log');  
                        logger.innerHTML += visitados + '<br />';
                        return visitados;
                    }
                }
            }
        }return false;
        //console.log('Caminho não encontrado');
        imprimeNotificacao("Caminho não encontrado!", "warn");

    };

    /*####################################################################################################################################/
     WELSH and POWELL E SUAS FUNÇÕES AUXILIARES /02/10/17 - Vinícius Machado

     /*##################################################################################################################################*/
    Grafo.prototype.welshAndPowell = function (){

        var grauEmOrdem = [];
        var verticePeso;
        var troca;
        //var temp;

        for(var i=0;i < this.vertices.length; i++) {
            verticePeso = new Array();
            verticePeso[0] = this.vertices[i]; //Vértice
            verticePeso[1] = this.retornarLigacoes(this.vertices[i]).length; //Grau
            verticePeso[2] = "Sem Cor"; //Cor inicial como "Sem cor"

            grauEmOrdem.push(verticePeso); //Inserindo para poder ver vertice e seus graus!
        } 

        troca = 1;
        
        // 1 . Ordenação pelos graus de cada vértice, verificar área do console
        while (troca == 1){
            troca = 0;        
            for (i = 0; i <= grauEmOrdem.length-2; i++){ 
                if (grauEmOrdem[i][1] < grauEmOrdem[i+1][1]){
                    troca = 1;
                    aux = grauEmOrdem[i];
                    grauEmOrdem[i] = grauEmOrdem[i + 1];
                    grauEmOrdem[i + 1] = aux;
                }
            }
        }

        // 2. Criando vetor de cores https://gist.github.com/bobspace/2712980#file-css_colors-js
        var CSS_COLOR_NAMES = this.retornaCssColors();

        //Caso seja um grafo nulo, sem ligações, aplicar cor g= 1;
        var g = 1;
        for(i = 0; i < this.vertices.length; i++){
            if(this.ligacao[this.vertices[i]].length != 0){
                g = 0;
            }
        }

        //Grafo nulo, cor única!
        if(g == 1){
            for(i = 0; i < grauEmOrdem.length; i++){
              grauEmOrdem[i][2] = CSS_COLOR_NAMES[ Math.floor(Math.random() * CSS_COLOR_NAMES.length) ];
            }
        }else{
            //Grafo não nulo, verificar cada vértice vizinho e aplicar cor ou não
            var countSemCor = grauEmOrdem.length;
            var corAtual = CSS_COLOR_NAMES[g];
            var flag;
    
            while(countSemCor > 0){
                
                g = g + 1;
                corAtual = CSS_COLOR_NAMES[g];
                
                //Percorre todos os vertices + grau
                for(i = 0; i < grauEmOrdem.length; i++){  

                    if(grauEmOrdem[i][2] == "Sem Cor"){   
                        flag = true;              
                        //Percorro todas as ligações do vertice grauEmOrdem[i][2]
                        for(j = 0; j < this.ligacao[grauEmOrdem[i][0]].length; j ++){                                          
                            /*
                                Percorres entao as cores desses vertices vizinhos
                                e verifico se o vizinho do vertice do indece "i" tem a mesma cor,
                                caso tenha o flag recebe = false 
                            */
                            for(k = 0; k < grauEmOrdem.length; k++ ){                                
                                if(grauEmOrdem[k][0] == this.ligacao[grauEmOrdem[i][0]][j][0]){
                                    if(grauEmOrdem[k][2] == corAtual) {
                                        flag = false;
                                    }
                                }                   
                            }
                        }
                        //Caso nenhum vizinho tenha a cor, atribuo a cor ao vertice atual de "I"
                        if(flag == true){
                            grauEmOrdem[i][2] = corAtual;
                        }
                    }else{
                        countSemCor = countSemCor - 1;
                    }
                }
            }
        }

       //Imprimindo no console
       var logger = document.getElementById('log');  

       for(i = 0; i < grauEmOrdem.length; i++){
           logger.innerHTML += grauEmOrdem[i] + '<br />';
       }

       return grauEmOrdem;
    };

    Grafo.prototype._getAdjacencias = function(grauEmOrdem, adjacentes){
        var arrayAdjacentes = [];
        for (var i = 0; i < grauEmOrdem.length; i++){
            for (var j = 0; j < adjacentes.length; j++){
                if (grauEmOrdem[i][0] == adjacentes[j][0]){
                    arrayAdjacentes.push(grauEmOrdem[i]);
                }
            }
        }
        return arrayAdjacentes;
    };

    /*####################################################################################################################################/
            DSATUR E SUAS FUNÇÕES AUXILIARES /02/10/17 - Vinícius Machado

            retornaMaiorGrauSaturaçao() = Retorna o vetor de vertice que tenha maior grua de saturação, ou em caso de empate, maior grau de ligação
     /*##################################################################################################################################*/

    Grafo.prototype.dsatur = function (){
        var grauEmOrdem = [];
        var verticePeso;
        var troca;
        var nao_verificados = [];
        for(var i=0;i < this.vertices.length; i++) {
            verticePeso = new Array();
            verticePeso[0] = this.vertices[i]; //Vértice
            verticePeso[1] = this.retornarLigacoes(this.vertices[i]).length; //Grau
            verticePeso[2] = "Sem Cor"; //Cor inicial como "Sem cor"
            verticePeso[3] = 0; //Grau Saturaão

            grauEmOrdem.push(verticePeso); //Inserindo para poder ver vertice e seus graus!
            nao_verificados.push(this.vertices[i]);
        }
        troca = 1;
        // 1 . Ordenação pelos graus de cada vértice, verificar área do console
        while (troca == 1){
            troca = 0;        
            for (i = 0; i <= grauEmOrdem.length-2; i++){ 
                if (grauEmOrdem[i][1] < grauEmOrdem[i+1][1]){
                    troca = 1;
                    aux = grauEmOrdem[i];
                    grauEmOrdem[i] = grauEmOrdem[i + 1];
                    grauEmOrdem[i + 1] = aux;
                }
            }
        }

        // 2. Criando vetor de cores https://gist.github.com/bobspace/2712980#file-css_colors-js
        var CSS_COLOR_NAMES = this.retornaCssColors();

        //Caso seja um grafo nulo, sem ligações, aplicar cor g= 1;
        var g = 1;
        for(i = 0; i < this.vertices.length; i++){
            if(this.ligacao[this.vertices[i]].length != 0){
                g = 0;
            }
        }
		var loop = 0;
        var flag;
        //Grafo nulo, cor única!
        if(g == 1){
            for(i = 0; i < grauEmOrdem.length; i++){
              grauEmOrdem[i][2] = CSS_COLOR_NAMES[ Math.floor(Math.random() * CSS_COLOR_NAMES.length) ];
            }
        }else{
            var verticeMaiorGrau;
            var vizinhosAdjacencias;
            var total = this.retornaTotalSemCor(grauEmOrdem);
            var cores = [];

            while(total	> 0){   
				
                //Percorre todos os vertices e escolhe o de maior grau de saturação
                verticeMaiorGrau = this.retornaMaiorGrauSaturacao(grauEmOrdem);
                var adjacencias = this._getAdjacencias(grauEmOrdem, this.ligacao[verticeMaiorGrau[0]]);
    
                //Encontrei a menor cor possivel no vetor de cores
                for(var x = 0; x < CSS_COLOR_NAMES.length; x++){
                    flag = true;
                    for(var z = 0; z < adjacencias.length; z++){
                        if(verticeMaiorGrau[2] != CSS_COLOR_NAMES[x]){
                            if(CSS_COLOR_NAMES[x] == adjacencias[z][2]){
                                flag = false;
                            }
                        }        
                    }
                    if(flag == true){
                        verticeMaiorGrau[2] = CSS_COLOR_NAMES[x];
                        break;
                    }
                }
                
                //Percorro todas as ligações do vertice de maior grau
                for(var j = 0; j < adjacencias.length; j ++){
                    vizinhosAdjacencias = this._getAdjacencias(grauEmOrdem, this.ligacao[adjacencias[j][0]]);
                    cores = [];

                    //Insere todas as cores dos vizinhos dos adjacentes em um vetor de cores
                    for(var k = 0;k < vizinhosAdjacencias.length; k++){
                        cores.push(vizinhosAdjacencias[k][2]);
                    }

                    //Remove cores duplicadas
                    var unique = cores.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                    })     

                    //Atualizo o grua de saturação pelo total de cores diferente que foi inserido no vetor de cores
                    adjacencias[j][3] = unique.length;

                }

                nao_verificados.splice(verticeMaiorGrau[0], 1);
                total = this.retornaTotalSemCor(grauEmOrdem);
            }

        //Imprimindo no console
        var logger = document.getElementById('log');  

        for(i = 0; i < grauEmOrdem.length; i++){
            logger.innerHTML += grauEmOrdem[i] + '<br />';
            }
        
        }
       return grauEmOrdem;
    };


    Grafo.prototype.retornaMaiorGrauSaturacao = function(listaDsatur){
        var naoPintados = [];
        for(i = 0; i < listaDsatur.length; i++){
            if(listaDsatur[i][2] == "Sem Cor"){
                naoPintados.push(listaDsatur[i]);
            }
        }
        var maior = naoPintados[0];
        for(j = 0; j < naoPintados.length; j++){

            if(naoPintados[j][3] > maior[3]){
                maior = naoPintados[j];
            }
            if(naoPintados[j][1] > maior[1]){
                maior = naoPintados[j];
            }
        }
        return maior;
    };

    Grafo.prototype.retornaTotalSemCor = function(listaVertices){
    var total = 0;
        for ( i = 0; i < listaVertices.length; i++){
            if(listaVertices[i][2] == "Sem Cor"){
                total = total + 1;
            }
        }
    return total;
    };

    /*####################################################################################################################################/
            DESENHA MATRIZ DE ADJACENCIA Samuel Brati Favarin

        >>CRIA UMA MATRIZ COM TODOS OS VERTICES, E BUSCA NO CONJUNTO DE LIGAÇÕES DE DETERMINADO VERTICE SE DETERMINADO PESO
            SE NÃO FOR ENCONTRADO É ATRIBUIDO 0 A POSIÇÃO SEM PESO
        >> PRINTA A MATRIZ DE ADJACENCIA E A LISTA DE ADJACENCIA

     /*##################################################################################################################################*/
    Grafo.prototype.imprimirGrafo = function () {
        this.matriz = new Array();
        for(i=0;i < this.vertices.length; i++) {
            this.matriz[i] = new Array();
            for(j=0; j < this.vertices.length; j++){
                this.matriz[i][j] = 0;
                for(k=0; k< this.ligacao[this.vertices[i]].length; k++){
                    if(this.ligacao[this.vertices[i]][k][0] === this.vertices[j]) {
                        this.matriz[i][j] = this.ligacao[this.vertices[i]][k][1];
                    }
                }
            }
        }
        console.log('Matriz de Adjacencia: ');
        console.log(this.matriz);
        console.log('Lista de Adjacencia: ');
        console.log(this.ligacao);

    };
    /*####################################################################################################################################/
               DESENHAR GRAFO EM CANVAS 30/10/17 VINÍCIUS
     /*##################################################################################################################################*/
    Grafo.prototype.desenhaCanvasLigacoes = function (tipo){

        //Config do canvas
        canvas  = document.getElementById('myCanvas');
	    ctx     = canvas.getContext('2d');
	    canvas.width  = 1330;
	    canvas.height = 650;

        //Variáveis do vértice
        var vertices = [];
        var auxVertices = [];

        //Variaveis das ligações - Atualizado por Vinícius A.M 30/10/2017
        var ligacoes = this.iniciaControle(this.ligacao, this.vertices);
        var auxLigacoes = [];

        //Percorre todos os vertice - Atualizado por Vinícius A.M 30/10/2017
        for (i = 0; i < this.vertices.length; i++){

            //Insere no vertices um array com a vertice + cor
            auxVertices = new Array();
            auxVertices[0] = this.vertices[i];
            auxVertices[1] = 'red';

            vertices.push(auxVertices);
        }

         console.log(vertices);
         console.log(ligacoes);

         if(tipo == "welshAndPowell"){
            start(canvas, this.welshAndPowell(), ligacoes, grafo);
         }else if(tipo == "dsatur"){
            start(canvas, this.dsatur(), ligacoes, grafo);
         }else if(tipo == "kruskal"){
            start(canvas, this.welshAndPowell(), this.kruskal(), grafo);
         }else if(tipo == "prim"){
            start(canvas, this.dsatur(), this.prim(), grafo);
         }
    };

    Grafo.prototype.retornaCssColors = function (){
        var css = ["PaleGreen","Magenta","Aqua","Moccasin","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet",
            "Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan",
            "DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon",
            "DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey",
            "DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow",
            "HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral",
            "LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray",
            "LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
            "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose",
            "NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleTurquoise",
            "PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon",
            "SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan",
            "Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

        return css;
    };


    /*####################################################################################################################################/
        DIJKSTRA e FUNÇÕES AUXILIARES - José
     /*##################################################################################################################################*/

    Grafo.prototype._menorCaminho = function(abertos, pesos){
        var menorCaminho = abertos[0];
        for (var i = 0; i < abertos.length; i++){
            if (pesos[abertos[i]] < pesos[menorCaminho]){
                menorCaminho = abertos[i];
            }
        }
        return menorCaminho;
    };

    Grafo.prototype._dijkstra = function(origem){
        var vertices = this.vertices;
		if (vertices.indexOf(origem) === -1){
			return false;
		}
        var distancias = [];
        var anterior = [];
        var abertos = [];

        //iniciar valores
        $(vertices).each(function(index, v){
            distancias[v] = Infinity;
            anterior[v] = undefined;
			abertos.push(v);
        });

        distancias[origem] = 0;
        while (abertos.length > 0){
            var vertice = this._menorCaminho(abertos, distancias);
            $(this.ligacao[vertice]).each(function(index, adjacente){
				if (distancias[adjacente[0]] === Infinity){
                    //se infinito, atribui o peso
                    distancias[adjacente[0]] = distancias[vertice] + adjacente[1];
					//atribui o vertice analisado como anterior
					anterior[adjacente[0]] = vertice;
				} else{
					var novo = distancias[vertice] + adjacente[1];
					if (novo < distancias[adjacente[0]]){
						distancias[adjacente[0]] = novo;
						anterior[[adjacente[0]]] = vertice;
					}
				}
            });
            abertos.splice(abertos.indexOf(vertice), 1);
        }
		return distancias;
    };

	Grafo.prototype.dijkstra = function(origem, destino){
		var distancias = this._dijkstra(origem);
		var logger = document.getElementById('log');

		if (destino !== undefined){
			logger.innerHTML = "Distância: "+distancias[destino];
		} else {
            for (var i = 0; i < Object.keys(distancias).length; i++) {
                var key = Object.keys(distancias)[i];
                logger.innerHTML += key + ": "+distancias[key] + '<br />';
            }
        }
    };

    /*####################################################################################################################################/
            Samuel Brati Favarin  30/10/10 - ALGORITMO DE GERADOR DA ÁRVORE MÍNIMA PRIM
    /*###################################################################################################################################*/
    Grafo.prototype.prim = function() {
        // conjunto de resultante de arestas
        var s = new Array();
        //vertor pronto para printar no canvas
        var resultatoParaCanvas = new Array();
        // conjuntos de vertices não utilizados
        var q = this.vertices;
        // conjunto de vertices utilizados
        var utilizados = new Array();
        // controles de arestas
        var arestas = this.iniciaControle(this.ligacao, this.vertices);
        //definindo posição arbitrária iniciar a arvore
        var primeiroElemento = q[0];
        //coloca o primeiro elemento no vertice de utilizados
        utilizados.push(q[0]);
        //remove o primeiro elemento do vertices que não utilizados
        q = this.removeElementoArray(q,primeiroElemento);
        //cria uma variavel para receber menor aresta temporária
        var menorAresta = null;

        while(q.length>0){
            //recebe um peso maior para compara com as outras arestas
            var menorPeso = this.recebeMaiorPeso(arestas);
            for(var i=0; i<utilizados.length; i++){
                for(var j=0; j< q.length; j++){
                    for(var k=0; k< arestas.length; k++){
                        if(arestas[k][0] === utilizados[i] && arestas[k][1] === q[j] ||
                            arestas[k][0] === q[j] && arestas[k][1] === utilizados[i]){
                            if(menorPeso> arestas[k][2]){
                                menorPeso = arestas[k][2];
                                menorAresta = arestas[k];
                            }
                        }
                    }
                }
            }
            console.log(menorAresta);
            //atualização dos vetores nos vetores
            if (utilizados.indexOf(menorAresta[0]) === -1) utilizados.push(menorAresta[0]);
            if (utilizados.indexOf(menorAresta[1]) === -1) utilizados.push(menorAresta[1]);
            q = this.removeElementoArray(q,menorAresta[0]);
            q = this.removeElementoArray(q,menorAresta[1]);
            s.push(menorAresta[0]+menorAresta[1]);
            resultatoParaCanvas.push(menorAresta);
        }

        console.log('Vetor de ligações: ');
        console.log(s);
        console.log('Vetor de vertices não utilizados: ');
        console.log(q);
        console.log('Vetor de vertices utilizados: ');
        console.log(utilizados);
        console.log('Vetor para canvas: ');
        return resultatoParaCanvas;
    };

    Grafo.prototype.removeElementoArray = function (array, elemento) {
        var index = array.indexOf(elemento);
        var novoArray = new Array();
        for (var i = 0; i < array.length; i++) {
            if (i != index) {
                novoArray.push(array[i])
            }
        }
        return novoArray;
    };

    Grafo.prototype.recebeMaiorPeso = function (arestas) {
        var maiorValor = 0;
        for(var i=0; i<arestas.length; i++){
            if(arestas[i][2] > maiorValor){
                maiorValor = arestas[i][2];
            }
        }
        return maiorValor+1;
    };


    /*####################################################################################################################################/
        FUNÇÃO CONTROLE, UTILIZADA NO KURSKAL E NO PRIM Samuel Brati e Vinicius Adriano - 30/10/10
     /*###################################################################################################################################*/

    Grafo.prototype.iniciaControle = function (conjuntoArestas, conjuntoVertices){

        var conjuntoControle = new Array();
        var temp = [];
        var verticeAtual;
        var ligacaoAtual;
        var pesoAtual;
        var flag;

        //Monta um array com ligações e peso
        for(var i = 0; i < conjuntoVertices.length; i++){
            for(var j = 0; j < conjuntoArestas[conjuntoVertices[i]].length; j++){

                flag = true;
                temp = [];
                verticeAtual = conjuntoVertices[i];
                ligacaoAtual = conjuntoArestas[conjuntoVertices[i]][j][0];
                pesoAtual = conjuntoArestas[conjuntoVertices[i]][j][1];

                //Veritico se existe duplicidade de ligação, exemplo AD e DA
                for(var k = 0; k < conjuntoControle.length; k++){

                    if( (conjuntoControle[k][0] == ligacaoAtual) &&
                        (conjuntoControle[k][1] == verticeAtual) &&
                        (conjuntoControle[k][2] == pesoAtual) ){
                        flag = false;
                    }
                }

                //Se não encontrou duplicidade...
                if(flag == true){
                    temp[0] = verticeAtual;
                    temp[1] = ligacaoAtual;
                    temp[2] = pesoAtual;
                    conjuntoControle.push(temp); //Irei juntar tudo em um vetor mais organizado
                }
            }
        }

        return conjuntoControle;
    };

    /*####################################################################################################################################/
           Vinícius A.M 27/10/17 - INÍCIO DO KRUSKAL E SEUS DERIVADOS
    /*###################################################################################################################################*/
    Grafo.prototype.kruskal = function () {
        
        var s = new Array();// conjunto de arestas vazias
        var q = this.iniciaControle(this.ligacao, this.vertices);// conjunto de arestas do grafo. Ex : {AC, BD, EF}
        var floresta = this.iniciaFloresta(); //Retorna a floresta inicada com os vértices do grafo       
        var menor;
        var indexU, indexV;

        //Enquanto Q não estiver vazio
        while(q.length > 0){
            
            menor = this.menorAresta(q); //Aresta {u, v}

            //Remove a aresta {u, v} do conjunto Q
            for(var i = 0; i < q.length; i++){
                if(q[i] == menor){
                    q.splice(i, 1);
                }
            }

            indexU = this.retornaIndex(menor[0], floresta); 
            indexV = this.retornaIndex(menor[1], floresta);
            //Irei comparar os indexes de u, v dentro da floresta
            if(indexU != indexV){
                s.push(menor);
                floresta[indexU] += floresta[indexV];
                floresta.splice(indexV, 1);
            }
        }

        //Arvore mínima
        console.log(s);  
        var logger = document.getElementById('log');        

        for(var i = 0; i < s.length; i ++){

            logger.innerHTML += s[i] + '<br />';
        }

        return s;
        
    };

    Grafo.prototype.iniciaFloresta = function (){

        var floresta = new Array();
        var temp;

        //Preenchendo a floresta com os vértices já existentes
        for(var i = 0; i < this.vertices.length; i++){
            temp = new Array();
            temp.push(this.vertices[i]);
            floresta.push(temp);
        }

        return floresta;
    };

    Grafo.prototype.menorAresta = function(conjuntoControle){
        var menor = conjuntoControle[0];
        //Busca a menor aresta e retorna
        for(var i = 0; i < conjuntoControle.length; i++){
            if(conjuntoControle[i][2] < menor[2]){
                menor = conjuntoControle[i];
            }
        }
        return menor;
    };

    Grafo.prototype.retornaIndex = function(aresta, floresta){
        for(var i = 0; i < floresta.length; i++){
            if(floresta[i] == aresta){
                return i;
            }
            for(var j = 0; j < floresta[i].length; j++){
                if(floresta[i][j] == aresta){
                    return i;
                }
            }
        }
    };




    /*####################################################################################################################################/
        Samuel Brati Favarin  30/10/17 - PLANARIDADE e FUNÇÕES AUXILIARES

          >> O retorno dessa função não pode ser binário
          >> 0 = é planar
          >> 1 = pode ser planar
          >> 2 = não pode ser planar

     /*###################################################################################################################################*/

    Grafo.prototype.ePlanar = function () {
        var v = this.vertices.length;
        var a = this.calculaNumArestas();
        if(v<=2){
            console.log('É PLANAR');
            return 0;
        }
		else if(this.temCicloTres()){
			if (v>=3 && a <= (3*v)-6){
				console.log('PODE SER PLANAR');
                return 1;
			}else{
				return 2;
			}
		}else if(!this.temCicloTres()){
			if (v>=3 && a <= (2*v)-4){
				console.log('PODE SER PLANAR');
                return 1;
			}else{
				return 2;
			}
		}
        else {
			console.log('NÃO PODE SER PLANAR');
			return 2;
		}
           
    };
	
	Grafo.prototype.teste1 = function (){
		
	}

    Grafo.prototype.temCicloTres = function () {
        for(var i=0; i<this.vertices.length; i++){
            var nodo = this.vertices[i];
            for(var j=0; j<this.ligacao[nodo].length; j++){
                var vizinho = this.ligacao[nodo][j][0];
                for(var k=0; k< this.ligacao[vizinho].length; k++){
                    var vizinho_de_vizinho = this.ligacao[vizinho][k][0];
                    for(l=0; l< this.ligacao[vizinho_de_vizinho].length; l++){
                        if(this.ligacao[vizinho_de_vizinho][l][0] === nodo){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    Grafo.prototype.calculaNumArestas = function () {
        var cont=0;
        for(var i=0; i<this.vertices.length; i++){
            for(var j=0; j<this.vertices.length; j++){
                var origem = this.vertices[i];
                var destino = this.vertices[j];
                if(this._existeLigacao(origem,destino)){
                    cont++;
                }
            }
        }
        if(this.isDirecionado){
            return cont;
        }else{
            return cont/2;
        }
    };




    /*####################################################################################################################################/
        Samuel, José  e Vinícus 17/11/17 - Fluxo Máximo e funções auxiliares
     /*###################################################################################################################################*/


    Grafo.prototype.getFonte = function (){
        var flag;
        for(var i = 0; i < this.vertices.length; i++){ 
            flag = true;
            for(var j = 0; j <this.vertices.lengh; j++){ 
                if(this._existeLigacao(this.vertices[i], this.vertices[j]) && this._existeLigacao(this.vertices[j], this.vertices[i])){
                    flag = false;
                }
            }
            if(flag){return this.vertices[i];}
        }
    };
    
    Grafo.prototype.getSorvedor = function (){
        for(var i = 0; i < this.vertices.length; i++){ 
            if(this.ligacao[this.vertices[i]].length === 0) return this.vertices[i];
        }
    };

    Grafo.prototype.atribuirGrafoOriginal = function(){
        for(var i=0; i<this.vertices.length; i++){
            for(var j=0; j<this.ligacao[this.vertices[i]].length; j++){
                this.ligacao[this.vertices[i]][j].push(0);
            }
        }
    }
    
    Grafo.prototype.montaCaminhoControle = function(){
        
        var fonte = this.getFonte();
        var sorvedor = this.getSorvedor();
        var caminho = this.dfsComDestino(fonte,sorvedor);
        var caminhoControle = new Array();

        if(caminho == false){
            return false;
        }

        for(var i = 0; i < caminho.length-1; i++){
            var atual = caminho[i];
            var proximo = caminho[i+1];
            for(var j = 0; j < this.ligacao[atual].length; j++){
                if(this.ligacao[atual][j][0] == proximo){
                    var temp = [];
                    temp[0] = atual;
                    temp[1] = this.ligacao[atual][j][0];
                    temp[2] = this.ligacao[atual][j][1];
                    caminhoControle.push(temp);
                }
            }
        }

        return caminhoControle;

    };

    Grafo.prototype.retornaMenorArco = function(caminho){
        var menor = caminho[0][2];

        for(var i = 0; i < caminho.length; i++){
            if(caminho[i][2] < menor){
                menor = caminho[i][2];
            }
        }

        return menor;
    };

    Grafo.prototype.fordFukerson = function (){
        
        var solucao = 0; //Criar um inteiro S para solução iniciado com 0.
        var grafoAuxiliar = Object.assign({}, grafo); //Criar um grafo auxiliar como uma cópia do grafo original
        var caminho = this.montaCaminhoControle(); //Monta o caminho com ligação + peso
        this.atribuirGrafoOriginal(); // transforma grafo no modelo de grafo original
        var menor;
        
        console.log(caminho);

        while(caminho){
            
            menor = this.retornaMenorArco(caminho);
            solucao += menor;

            for(var i = 0; i < caminho.length; i++){
                caminho[i][2] = caminho[i][2] - menor;

                /*
                  Se existir um arco (v,u)
                    Somar o valor de A no arco (v,u)
                  Senão
                    Criar um arco (v,u) com o valor de A
                  */
            }

            caminho = this.montaCaminhoControle(); //Refaz tudo, dfs + controle
        }

        return solucao;

    };

 
grafo = new Grafo(true, true);

grafo.addVertice('F');
grafo.addVertice('B');
grafo.addVertice('C');
grafo.addVertice('S');
grafo.addArcoPonderado('F','B', 5);
grafo.addArcoPonderado('F','C', 4);
grafo.addArcoPonderado('B','S', 5);
grafo.addArcoPonderado('C','S', 4);

//grafo.iniciaControle(grafo.ligacao, grafo.vertices)
//grafo.menorAresta(grafo.iniciaControle(grafo.ligacao, grafo.vertices));
