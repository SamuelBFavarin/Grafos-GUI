 //GRAFO
    // --GRAFO POSSUI UM CONJUNTO DE VÉRTICES E UM CONJUNTO DE LIGAÇÕES (ARESTAS OU ARCOS)
    // --GRAFO PODE SER PONDERADO E/OU DIRECIONADO
    function Grafo(_direcionado,_ponderado){
        this.vertices = [];
        this.ligacao  = [];
        this.direcionado = _direcionado;
        this.ponderado = _ponderado;
    };

    // ADICIONA VERTICE PELO NOME
    // --INSERE O VERTICE NO CONJUNTO DE VERTICES
    // --CRIA NO CONJUNTO DE LIGAÇÃO UM ARRAY ONDE RECEBERÁ TODAS AS LIGAÇÕES DO VÉRTICE
    Grafo.prototype.addVertice = function (vertice){
        this.vertices.push(vertice);
        this.ligacao[vertice] = [];
    };

    //EXISTE VERTICE
    // --RECEBE O NOME DO VERTICE POR PARAMETRO, PROCURA NO OCNJUNTO DE VÉRTICES SE EXISTE
    Grafo.prototype.existeVertice = function (vertice) {
        var logger = document.getElementById('log');

        for(i=0; i<this.vertices.length; i++){
            if(this.vertices[i] === vertice){
                console.log(this.vertices[i]);
                console.log('Existe vértice!!!');

                $.notify("Existe Vértice! Verifique o console", {
                    globalPosition: "top right",
                    showDuration: 400,
                    className: "success",
                    gap: 2
                })
                
                logger.innerHTML += this.vertices[i] + '<br />';  

                return true;
            }
        }
        console.log('Vértice não encontrado');

        $.notify("Vértice não encontrado!", {
           globalPosition: "top right",
           showDuration: 400,
           className: "warn",
           gap: 2
        });

        logger.innerHTML = '<br />';  
        return false;
    };

    //ADICIONA ARCO NÃO PONDERADO
    //--RECEBE UM VERTICE DE ORIGEM, E UM VÉRTICE DE DESTINO
    //--ATRIBUI 1 AO PESO E CHAMA a função addArco() PONDERADO
    Grafo.prototype.addArco = function (vertice1,vertice2) {
        if(this.direcionado) {
            this.peso = 1;
            this.addArcoPonderado(vertice1, vertice2, this.peso);
        }else{
            console.log('Impossível adicionar Arco em grafos não direcionados');

            $.notify("Impossível adicionar Arco em grafos não direcionados!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        }
    };

    //ADICIONA ARCO PONDERADO
    //--RECEBE O VERTICE DE ORIGEM, O VERTICE DE DESTINO E O PESO
    //--INSERE NO CONJUNTO DE LIGAÇÕES, NA POSIÇÃO DO VERTICE UM ARRAY COM O DESTINO E O PESO
    Grafo.prototype.addArcoPonderado = function (vertice1,vertice2,_peso){
        if (this.direcionado) {
            this.ligacao[vertice1].push([vertice2, _peso]);
            
            $.notify("Arco adicionado com sucesso!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "success",
                gap: 2
            });

        } else {
            console.log('Impossível adicionar Arco em grafos não direcionados');

            $.notify("Impossível adicionar Arco em grafos não direcionados!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        }
    };

    //ADICIONA ARESTA NÃO PONDERADA
    //--RECEBE UM VERTICE DE ORIGEM, E UM VÉRTICE DE DESTINO
    //--ATRIBUI 1 AO PESO E CHAMA a função addAresta() PONDERADA
    Grafo.prototype.addAresta = function (vertice1,vertice2) {
        if(!this.direcionado) {
            this.peso = 1;
            this.addArestaPonderada(vertice1, vertice2, this.peso);

            $.notify("Aresta adicionado com sucesso!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "success",
                gap: 2
            });

        }else{
            console.log('Impossível adicionar Aresta em grafos direcionados');

            $.notify("Impossível adicionar Aresta em grafos direcionados!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        }
    };

    //ADICIONA ARESTA PONDERADA
    //--RECEBE O VERTICE DE ORIGEM, O VERTICE DE DESTINO E O PESO
    //--INSERE NO CONJUNTO DE LIGAÇÕES, NA POSIÇÃO DO VERTICE DE ORIGEM UM ARRAY COM O DESTINO NA POSIÇÃO 0 E O PESO NA POSIÇÃO 1
    //--INSERE NO CONJUNTO DE LIGAÇÕES, NA POSIÇÃO DO VERTICE DE DESTINO UM ARRAY COM O ORIGEM NA POSIÇÃO 0 E O PESO NA POSIÇÃO 1
    Grafo.prototype.addArestaPonderada = function (vertice1,vertice2,_peso){
        if (!this.direcionado) {
            this.ligacao[vertice1].push([vertice2, _peso]);
            this.ligacao[vertice2].push([vertice1, _peso]);

             $.notify("Aresta Ponderada adicionado com sucesso!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "success",
                gap: 2
            });

        } else {
            console.log('Impossível adicionar Aresta em grafos direcionados');

            $.notify("Impossível adicionar Aresta em grafos direcionados!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        }
    };

    // EXISTE LIGAÇÃO
    //-- SE FOR DIRECIONADO - PROCURA SE EXISTE O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES DO VERTICE ORIGEM
    //-- SE NÃO FOR DIRECIONADO - PROCURA SE EXISTE O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES DO VERTICE ORIGEM E
    //                            E SE  EXISTE O VERTICE ORIGEM NO CONJUNTO DE LIGAÇÕES DO VERTICE DESTINO
    Grafo.prototype.existeLigacao = function (origem,destino) {
        if(this.direcionado){
            for(i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    console.log('Existe Arco!!!');
                   
                    $.notify("Existe Arco!", {
                        globalPosition: "top right",
                        showDuration: 400,
                        className: "success",
                        gap: 2
                     });

                    return true;
                }
            }
            console.log('Arco não encontrado!!!');

            $.notify("Arco não encontrado!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "warn",
                gap: 2
            });
            return false;
        }else{
            for(i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    for(j =0; j<this.ligacao[destino].length; j++){
                        if(this.ligacao[destino][j][0] === origem){
                            console.log('Existe Aresta!!!');
                            
                            $.notify("Existe Aresta!", {
                                globalPosition: "top right",
                                showDuration: 400,
                                className: "success",
                                gap: 2
                            });

                            return true;
                        }
                    }
                }
            }
            console.log('Aresta não encontrada!!!');

            $.notify("Aresta não encontrada!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "warn",
                gap: 2
            });
            return false;
        }
    };

    // RETORNAR LIGAÇÕES
    // --RETORNA A LISTA DE TODAS AS LIGAÇÕES DE UM VERTICE
    Grafo.prototype.retornarLigacoes = function (vertice) {
        console.log(this.ligacao[vertice]);

        $.notify("Ligações retornadas! Verifica o console", {
            globalPosition: "top right",
            showDuration: 400,
            className: "success",
            gap: 2
         });

        var logger = document.getElementById('log');  
        for(i=0;i < this.ligacao[vertice].length; i++) {           
            logger.innerHTML += ' [ ' + this.ligacao[vertice][i][0] + ' ] ';     
        }
    };

    // REMOVE ARESTA OU ARCO
    //--SE FOR DIRECIONADO - BUSCA O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES ORIGEM E EXCLUI
    //--SE NÃO FOR DIRECIONADO - BUSCA O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES ORIGEM E
    //                           O VERTICE ORIGEM NO CONJUNTO DE LIGAÇÕES DESTINO E EXCLUI
    Grafo.prototype.removerLigacao = function (origem,destino) {
        if(this.direcionado){
            for(i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    this.ligacao[origem][i].pop();
                    this.ligacao[origem][i].pop();
                }
            }
        }else{
            for(i =0; i<this.ligacao[origem].length; i++ ) {
                if (this.ligacao[origem][i][0] === destino) {
                    for(j =0; j<this.ligacao[destino].length; j++){
                        if(this.ligacao[destino][j][0] === origem){
                            this.ligacao[origem][i].pop();
                            this.ligacao[origem][i].pop();
                            this.ligacao[destino][j].pop();
                            this.ligacao[destino][j].pop();
                        }
                    }
                }
            }
        }
    };

    //REMOVE VERTICE PELO NOME
    Grafo.prototype.removerVertice = function (vertice) {
        var index_vertice = this.vertices.indexOf(vertice);
        if (index_vertice == -1){
            console.log("Vértice não existe");

            $.notify("Vértice não existe!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "warn",
                gap: 2
            });

            return null;
        }

        this.vertices.splice(index_vertice, 1);
        for(var pos=0; pos < this.vertices.length; pos++) {
            this.removerLigacao(this.vertices[pos], vertice);
        }
        delete this.ligacao[vertice];

            $.notify("Vertice removido com sucesso!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "success",
                gap: 2
            });
    };

    Grafo.prototype.bfsSemDestino = function (origem){
        var fila = [];
        fila.push(origem);
        var visitado = [];
        var naoVisitado = [];

        for(l=0;l<this.vertices.length;l++){
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

        $.notify("Vértice encontrado! Veja o Console", {
            globalPosition: "top right",
            showDuration: 400,
            className: "success",
            gap: 2
        });

        var logger = document.getElementById('log');
        logger.innerHTML += visitado + '<br />';  

        console.log(visitado);
    };

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

                    $.notify("Vértice encontrado! Veja o Console", {
                        globalPosition: "top right",
                        showDuration: 400,
                        className: "success",
                        gap: 2
                    });

                    var logger = document.getElementById('log');
                    logger.innerHTML += temp + '<br />';  

                    for(var i = 0; i < visitado.length; i++) {
                        logger.innerHTML += visitado[i] + '<br />';  
                    }
                    return;
                }
            }
        }
        console.log("Vertice não encontrado");

            $.notify("Vértice não encontrado!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "warn",
                gap: 2
            });
    };

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
        
        $.notify("Caminho encontrado! Veja o console", {
            globalPosition: "top right",
            showDuration: 400,
            className: "success",
            gap: 2
        });

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

    Grafo.prototype.dfsComDestino = function (origem,destino){
        var visitados   = [];
        var pilha       = [];
        pilha.push(origem);
        //visita a partir da origem
        while (pilha.length > 0){
            var nodo = pilha.pop();
            if (visitados.indexOf(nodo) == -1){
                visitados.push(nodo);
                for (var i = 0; i < this.ligacao[nodo].length; i++){
                    pilha.push(this.ligacao[nodo][i][0]);
                    if(this.ligacao[nodo][i][0] === destino){
                        console.log('Caminho encontrado');
                        visitados.push(this.ligacao[nodo][i][0]);
                        console.log(visitados);

                        $.notify("Caminho encontrado! Veja o Console", {
                            globalPosition: "top right",
                            showDuration: 400,
                            className: "success",
                            gap: 2
                        });

                        var logger = document.getElementById('log');  
                        logger.innerHTML += visitados + '<br />';

                        return;
                    }
                }
            }
        }
        console.log('Caminho não encontrado');

        $.notify("Caminho não encontrado!", {
            globalPosition: "top right",
            showDuration: 400,
            className: "warn",
            gap: 2
        });

    };

    // DESENHA MATRIZ DE ADJACENCIA
    // --CRIA UMA MATRIZ COM TODOS OS VERTICES, E BUSCA NO CONJUNTO DE LIGAÇÕES DE DETERMINADO VERTICE SE DETERMINADO PESO
    //   SE NÃO FOR ENCONTRADO É ATRIBUIDO 0 A POSIÇÃO SEM PESO
    // -- PRINTA A MATRIZ DE ADJACENCIA E A LISTA DE ADJACENCIA
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


    var grafo = new Grafo(false,false);

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
    }

    function adicionaVertice(){
        
        var vertice = document.getElementById('inputAddVertice');
      
        if(vertice.value != ''){
            grafo.addVertice(vertice.value);

            $.notify("Vertice adicionado com sucesso!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "success",
                gap: 2
            });
      
        vertice.value = '';
      
      }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
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
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
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
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
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
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        }
    }

 function adicionaArcoPonderado(){

     var vertice1 = document.getElementById('inputAddArestaPond1');
     var vertice2 = document.getElementById('inputAddArestaPond2');
     var peso = document.getElementById('inputAddPesoPond');

     alert(vertice1.value);
     alert(vertice2.value);
     alert(peso.value);
     if(vertice1.value != '' && vertice2.value != '' && peso.value != ''){
         grafo.addArcoPonderado(vertice1.value, vertice2.value, peso.value);
         vertice1.value = '';
         vertice2.value = '';
         peso.value = '';
     }else{
         $.notify("Valores não podem ser vazios!", {
             globalPosition: "top right",
             showDuration: 400,
             className: "error",
             gap: 2
         });
     }
 }

    function removeVertice(){
        
        var vertice = document.getElementById('inputDelVertice');

        if(vertice.value != ''){ 
            grafo.removerVertice(vertice.value);
            vertice.value = '';
        }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        }
    }

    function removeLigacao(){
        
        var origem = document.getElementById('inputDelLigacao1');
        var destino = document.getElementById('inputDelLigacao2');

        if(origem.value != '' && destino.value != ''){  
            grafo.removerLigacao(origem.value, destino.value);  
            origem.value = '';
            destino.value = '';

            $.notify("Ligação removida com sucesso!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "success",
                gap: 2
            });
        }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        } 
    }

    function dfsComDestino(){
        
        var origem = document.getElementById('inputOrigemDfsOrigem');
        var destino = document.getElementById('inputDestinoDfsDestino');

        if(origem.value != '' && destino.value != ''){ 
            grafo.dfsComDestino(origem.value, destino.value);  
            origem.value = '';
            destino.value = '';
        }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        } 
    }

    function bfsComDestino(){
        
        var origem = document.getElementById('inputOrigemBfsOrigem');
        var destino = document.getElementById('inputDestinoBfsDestino');

        if(origem.value != '' && destino.value != ''){    
            grafo.bfsComDestino(origem.value, destino.value);  
            origem.value = '';
            destino.value = '';
        }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        } 
    }

    function dfsSemDestino(){

        var origem = document.getElementById('inputOrigemDfs');

        if(origem.value != ''){
            grafo.dfsSemDestino(origem.value);
            origem.value = '';
        }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        }
    }

    function bfsSemDestino(){

        var origem = document.getElementById('inputOrigemBfs');

        if(origem.value != ''){
            grafo.bfsSemDestino(origem.value);
            origem.value = '';
        }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        }
    }

    function retornaLigacoes(){

        var vertice = document.getElementById('inputRetornarLigacoes');

        if(vertice.value != ''){
            grafo.retornarLigacoes(vertice.value);
            vertice.value = '';
        }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
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
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                className: "error",
                gap: 2
            });
        } 
    }

    function existeVertice(){
        
        var vertice = document.getElementById('inputExisteVertice');

        if(vertice.value != ''){
            grafo.existeVertice(vertice.value);
            vertice.value = '';
        }else{
            $.notify("Valores não podem ser vazios!", {
                globalPosition: "top right",
                showDuration: 400,
                lassName: "error",
                gap: 2
            });
        }
    }

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