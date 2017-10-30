// PRIM
    // ALGORITMO DE GERADOR DA ÁRVORE MÍNIMA
    // Samuel Favarin 27/10/17
    Grafo.prototype.prim = function() {
        // conjunto de arestas
        var s = new Array();
        // conjunto de vertices já utilizados
        var a = new Array();
        // conjunto de vértices não utilizados
        var q = this.vertices;
        // vertice inicial - arbitrário
        a.push(this.vertices[2]);
        q = this.removeElementoArray(q,'C');

        console.log("S-> ",s);
        console.log("A-> ",a);
        console.log("Q-> ",q);
        console.log("  ");


        while(q.length>0) {
            for (var i = 0; i < a.length; i++) {
                var ligacoes_do_vertice = this.ligacao[a[i]];
                var menorPeso = 999;
                var menorVertice = null;
                var menorOrigem = null;
                //console.log(ligacoes_do_vertice);
                for (var j = 0; j < ligacoes_do_vertice.length; j++) {
                    console.log(q);
                    console.log(ligacoes_do_vertice[j][0]);
                    // for para procurar elemento
                    for(var e=0; e<q.length; e++){
                        if(q[e] === ligacoes_do_vertice[j][0]) {
                            if (ligacoes_do_vertice[j][1] < menorPeso) {
                                menorPeso = ligacoes_do_vertice[j][1];
                                menorVertice = ligacoes_do_vertice[j][0];
                                menorOrigem = a[i];
                            }
                        }
                    }
                }
                console.log("vertice destino: ", menorOrigem);
                console.log("Menor vertice: ", menorVertice);
                if (a.indexOf(menorVertice) === -1) a.push(menorVertice);
                if (a.indexOf(menorOrigem) === -1) a.push(menorOrigem);
                q = this.removeElementoArray(q, menorVertice);
                if (s.indexOf(a[i] + menorVertice) === -1 && s.indexOf(menorVertice + a[i]) === -1) {
                    s.push(a[i] + menorVertice);
                }
                console.log("S-> ", s);
                console.log("A-> ", a);
                console.log("Q-> ", q);
                console.log("  ");

            }
        }
    };