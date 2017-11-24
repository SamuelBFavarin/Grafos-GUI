Grafo.prototype.montaCaminhoControle = function(){
        
        var fonte = this.getFonte();
        var sorvedor = this.getSorvedor();
        var caminho = this.dfsBalanceadoComDestino(fonte,sorvedor);
        var caminhoControle = [];

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

    Grafo.prototype.existeArcoNoCaminho = function(caminho, vertice1, vertice2){

        for(var i = 0; i < caminho.lengh; i++){
            if(caminho[i][0] == vertice1 && caminho[i][1] == vertice2){
                return true;
            }
        }

        return false;    
    };

    Grafo.prototype.somaValorA = function(caminho, vertice1, vertice2, a){

       for(var i = 0; i < caminho.lengh; i++){
            if(caminho[i][0] == vertice1 && caminho[i][1] == vertice2){
                caminho[i][2] = caminho[i][2] + a;
            }
        }

        return caminho;

    };

    Grafo.prototype.fordFukerson = function (){
        
        var solucao = 0; //Criar um inteiro S para solução iniciado com 0.
        var grafoAuxiliar = Object.assign({}, grafo); //Criar um grafo auxiliar como uma cópia do grafo original
        var caminho = this.montaCaminhoControle(); //Monta o caminho com ligação + peso
        this.atribuirGrafoOriginal(); // transforma grafo no modelo de grafo original
        var menor;

        //Enquanto nao ser falso, ou enquanto existir um caminho...
        while(caminho){
            
            //Busca o menor arco e soma na solução
            menor = this.retornaMenorArco(caminho);
            solucao += menor;
            
            //Precisei fazer isso pois da loop infinito no for 
            var tamanho = caminho.length;
            
            for(var i = 0; i < tamanho; i++){
                
                caminho[i][2] = caminho[i][2] - menor;

                if(this.existeArcoNoCaminho(caminho, caminho[i][1], caminho[i][0])){
                    caminho = this.somaValorA(caminho, caminho[i][1], caminho[i][0], menor);
                }else{
                    var arcoVU = [];
                    arcoVU[0] = caminho[i][1];
                    arcoVU[1] = caminho[i][0];
                    arcoVU[2] = menor;
                    caminho.push(arcoVU);
                }

            }
            caminho = this.montaCaminhoControle(); //Refaz tudo, dfs + controle
       }

        return solucao;

    };