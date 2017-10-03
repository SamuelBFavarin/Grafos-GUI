/***************************************************************************************************************************
 Vinícius Machado 24/09/17
 As funções a seguir são usadas como bibliotecas para os botões e interações com os usuários.
 Este arquivo deve ser SEMPRE carregado antes de qualquer script que for utilizar a classe GRAFO
****************************************************************************************************************************/


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

    //ADICIONA ARCO NÃO PONDERADO
    //--RECEBE UM VERTICE DE ORIGEM, E UM VÉRTICE DE DESTINO
    //--ATRIBUI 1 AO PESO E CHAMA a função addArco() PONDERADO
    Grafo.prototype.addArco = function (vertice1,vertice2) {
        if(this.direcionado) {
            this.peso = 1;
            this.addArcoPonderado(vertice1, vertice2, this.peso);
        }else{
            console.log('Impossível adicionar Arco em grafos não direcionados');      
            imprimeNotificacao("Impossível adicionar Arco em grafos não direcionados!", "error");
        }
    };

    //ADICIONA ARCO PONDERADO
    //--RECEBE O VERTICE DE ORIGEM, O VERTICE DE DESTINO E O PESO
    //--INSERE NO CONJUNTO DE LIGAÇÕES, NA POSIÇÃO DO VERTICE UM ARRAY COM O DESTINO E O PESO
    Grafo.prototype.addArcoPonderado = function (vertice1,vertice2,_peso){
        if (this.direcionado) {
            this.ligacao[vertice1].push([vertice2, _peso]);  
            imprimeNotificacao("Arco adicionado com sucesso!", "success");
        } else {
            console.log('Impossível adicionar Arco em grafos não direcionados');
            imprimeNotificacao("Impossível adicionar Arco em grafos não direcionados!", "error");
        }
    };

    //ADICIONA ARESTA NÃO PONDERADA
    //--RECEBE UM VERTICE DE ORIGEM, E UM VÉRTICE DE DESTINO
    //--ATRIBUI 1 AO PESO E CHAMA a função addAresta() PONDERADA
    Grafo.prototype.addAresta = function (vertice1,vertice2) {
        if(!this.direcionado) {
            this.peso = 1;
            this.addArestaPonderada(vertice1, vertice2, this.peso);
            imprimeNotificacao("Aresta adicionado com sucesso!", "success");
        }else{
            console.log('Impossível adicionar Aresta em grafos direcionados');
            imprimeNotificacao("Impossível adicionar Aresta em grafos direcionados!", "error");
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
            
        } else {
            console.log('Impossível adicionar Aresta em grafos direcionados');
            imprimeNotificacao("Impossível adicionar Aresta em grafos direcionados!", "error");
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
                    for(j =0; j<this.ligacao[destino].length; j++){
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

    // RETORNAR LIGAÇÕES
    // --RETORNA A LISTA DE TODAS AS LIGAÇÕES DE UM VERTICE
    Grafo.prototype.retornarLigacoes = function (vertice) {

        imprimeNotificacao("Ligações retornadas! Verifica o console", "success");
        var logger = document.getElementById('log');  
        for(i=0;i < this.ligacao[vertice].length; i++) {           
            logger.innerHTML += ' [ ' + this.ligacao[vertice][i][0] + ' ] ';     
        }

        return this.ligacao[vertice];
    };

    // REMOVE ARESTA OU ARCO
    //--SE FOR DIRECIONADO - BUSCA O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES ORIGEM E EXCLUI
    //--SE NÃO FOR DIRECIONADO - BUSCA O VERTICE DESTINO NO CONJUNTO DE LIGAÇÕES ORIGEM E
    //                           O VERTICE ORIGEM NO CONJUNTO DE LIGAÇÕES DESTINO E EXCLUI
    Grafo.prototype.removerLigacao = function (origem,destino) {
        if(this.direcionado){
            for(i =0; i<this.ligacao[origem].length; i++ ) {
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
                    for(j =0; j<this.ligacao[destino].length; j++){
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

    //REMOVE VERTICE PELO NOME, VERIFICANDO SE EXISTE O VERTICE NA POSIÇÃO PASSADA POR PARAMETRO.
	//CASO NÃO EXISTA RETORNA -1;
	//BUSCA EM TODOS OS VERTICES E EXCLUÍ A LIGAÇÃO
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

	//BFS SEM DESTINO
	//PROCURA AS LIGAÇÕES DA PRIMEIRA POSIÇÃO DA FILA E TESTA SE JA FORAM VISITADAS
	//COLOCA OS VERTICES ENCONTRADOS NA FILA
	//DELETA O PRIMEIRO DA FILA
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

                    for(var i = 0; i < visitado.length; i++) {
                        logger.innerHTML += visitado[i] + '<br />';  
                    }
                    return;
                }
            }
        }
        console.log("Vertice não encontrado");
        imprimeNotificacao("Vértice não encontrado!", "warn");
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
                        console.log('Caminho encontrado');
                        visitados.push(this.ligacao[nodo][i][0]);
                        console.log(visitados);

                        imprimeNotificacao("Caminho encontrado! Veja o Console", "success");

                        var logger = document.getElementById('log');  
                        logger.innerHTML += visitados + '<br />';

                        return;
                    }
                }
            }
        }
        console.log('Caminho não encontrado');
        imprimeNotificacao("Caminho não encontrado!", "warn");

    };

    //Vinícius Machado 02/10/17 - WELSH AND POWELL FUNCIONANDO!
    Grafo.prototype.welshAndPowell = function (){

        var grauEmOrdem = [];
        var verticePeso;
        var troca;
        var temp;

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

    //02/10/17 - Vinícius Machado
    Grafo.prototype.dsatur = function (){

        var grauEmOrdem = [];
        var verticePeso;
        var troca;

        for(var i=0;i < this.vertices.length; i++) {
            verticePeso = new Array();
            verticePeso[0] = this.vertices[i]; //Vértice
            verticePeso[1] = this.retornarLigacoes(this.vertices[i]).length; //Grau
            verticePeso[2] = "Sem Cor"; //Cor inicial como "Sem cor"
            verticePeso[3] = 0; //Grau Saturaão

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
                
                //Percorre todos os vertices e escolhe o de maior grau de saturação
                for(i = 0; i < grauEmOrdem.length; i++){  

                    if(grauEmOrdem[i][2] == "Sem Cor"){   
                       
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

    }


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

    //Vinícius 01/10/17
    Grafo.prototype.desenhaCanvasLigacoes = function (){
        
        //Config do canvas
        canvas  = document.getElementById('myCanvas');
	    ctx     = canvas.getContext('2d');
	    canvas.width  = 1330;
	    canvas.height = 650;
        
        //Variáveis do vértice
        var vertices = [];
        var auxVertices = [];
	    
        //Variaveis das ligações
        var ligacoes = [];
        var auxLigacoes = [];

        //Percorre todos os vertice
        for (i = 0; i < this.vertices.length; i++){
            
            //Insere no vertices um array com a vertice + cor
            auxVertices = new Array();
            auxVertices[0] = this.vertices[i];
            auxVertices[1] = 'red';

            vertices.push(auxVertices);
            
            //Percorre todas as ligacoes com o indice do vertice para jogar no Array de ligacoes
            for(j = 0; j < (this.ligacao[this.vertices[i]].length); j ++){
                
                auxLigacoes = new Array();
                auxLigacoes[0] = this.vertices[i];
                auxLigacoes[1] = this.ligacao[this.vertices[i]][j][0];
                
                ligacoes.push(auxLigacoes);
            }
        }
         
         console.log(vertices);
         console.log(ligacoes);
         //start(canvas, vertices, ligacoes, grafo);
         start(canvas, this.welshAndPowell(), ligacoes, grafo);

    };

    Grafo.prototype.retornaCssColors = function (){

        var css = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet",
        "Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan",
        "DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon",
        "DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey",
        "DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow",
        "HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral",
        "LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray",
        "LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid",
        "MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose",
        "Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise",
        "PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon",
        "SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan",
        "Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

        return css;
    };

    Grafo.prototype.dijkstra = function(origem){
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
            var vertice = abertos.shift();			
            $(this.ligacao[vertice]).each(function(index, adjacente){
				if (abertos.indexOf(adjacente[0]) === -1){
					return;
				}
				if (distancias[adjacente[0]] === Infinity){
					//se infinito, atribui o peso
					distancias[adjacente[0]] = adjacente[1];
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
        }
		console.log(distancias);
		console.log(anterior);
    };

    var grafo = new Grafo(false, true);
