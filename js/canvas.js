function drawLine(Inx,Iny,Outx,Outy, grafo){
		if(grafo['isDirecionado'] === true){
            
            var headlen = 35;	
            //origem -> destino
            var dx = Inx-Outx;
            var dy = Iny-Outy;
            var angle = Math.atan2(dy,dx);
            ctx.moveTo(Outx, Outy);
            ctx.lineTo(Inx, Iny);
            
            ctx.lineTo(Inx - headlen * Math.cos(angle - Math.PI/17), Iny - headlen * Math.sin(angle - Math.PI/17));
            ctx.moveTo(Inx, Iny); 
            ctx.lineTo(Inx  -headlen * Math.cos(angle + Math.PI/17), Iny - headlen * Math.sin(angle + Math.PI/17));
            ctx.fillStyle="black"; 
            ctx.stroke();
            ctx.closePath();
            
            ctx.beginPath();
            if(grafo['isPonderado'] === true) {
                ctx.font="18px Arial";
                ctx.fillStyle = 'red';
                ctx.fillText('peso', Inx, Iny-45);
                ctx.closePath();
            }
            
        }else{
                ctx.beginPath();
                ctx.moveTo(Inx,Iny);
                ctx.lineTo(Outx,Outy);
                ctx.fillStyle="black";
                ctx.stroke();
                ctx.closePath();
            }
		var posXPeso = 0, posYPeso = 0;
		if(Inx < Outx){
			if(Iny < Outy){
				posXPeso = (Outx+Inx)/2;
				posYPeso = (Outy + Iny)/2;
			}else{
				posXPeso = (Outx+Inx)/2;
				posYPeso = (Iny + Outy)/2
			}
		}else{
			if(Iny < Outy){
				posXPeso = (Inx + Outx)/2 ;
				posYPeso = (Outy + Iny)/2;
			}else{
				posXPeso = (Inx + Outx)/2 ;
				posYPeso = (Iny + Outy)/2;
			}
		}
		if(grafo['isPonderado'] === true){
            ctx.beginPath();
            ctx.font="18px Arial";
            ctx.fillStyle = 'red';
            ctx.fillText('peso', posXPeso, posYPeso);
            ctx.closePath();
		}
	}
    
    function getPointOnCircle(Inx, Iny) {
        radius = 20;
        var angleInDegrees = getAngleBetweenPoints(Inx, endPt);

    
        var x = radius * Math.cos(angleInDegrees * Math.PI / 180) + Inx;
        var y = radius * Math.sin(angleInDegrees * Math.PI / 180) + Iny;

        return { x: x, y: y };
    }

    
	function drawCircle(name,x,y,color){
		ctx.beginPath();
		ctx.arc(x,y,20,0,2*Math.PI);
		ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.stroke();
		ctx.fillStyle = color;
		ctx.fill();
        ctx.font = "16px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(name, x, y+5);
    }
    function update(circles,ligacoes,grafo){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        //desenha as ligações entre os circulos
        for(var j=0; j<ligacoes.length;j++){
            var origem;
            var destino;
            for(var k=0; k<circles.length; k++){
                if(circles[k][0] === ligacoes[j][0]){
                    origem = circles[k];
                }
                if(circles[k][0] === ligacoes[j][1]){
                    destino = circles[k];
                }
            }
            drawLine(origem[1],origem[2],destino[1],destino[2],grafo);
        }
        //desenha os circulos
        for(var l=0; l<circles.length;l++){
            drawCircle(circles[l][0],circles[l][1],circles[l][2],circles[l][3]);
        }
	}
	//INICIA 
	function start(canvas,vertices,ligacoes,grafo){
	    circles = [];
	    // cria vetor de circulos com a posição e o nome do vertice
	    for(var i=0; i<vertices.length;i++){
	        posX = Math.floor((Math.random() * 1330) + 1);
	        posY = Math.floor((Math.random() * 650) + 1);
            circle = [vertices[i][0],posX,posY,vertices[i][1]];
            circles.push(circle);
		}
		update(circles,ligacoes,grafo);
        update(circles,ligacoes,grafo);
		var circuloClicado = 'vazio';
		canvas.onmousedown = function(e){
			var rect = canvas.getBoundingClientRect();
			posX = e.clientX - rect.left;
			posY = e.clientY - rect.top;
            for(var h=0; h<circles.length; h++){
                if(posX < circles[h][1]+20 && posX > circles[h][1]-20){
                    if(posY < circles[h][2]+20 && posY > circles[h][2]-20){
                        console.log('clicou: '+circles[h][0]);
                        circuloClicado = h;
					}
                }
            }
		};
		
		canvas.onmouseup = function(e){
			var rect = canvas.getBoundingClientRect();
			posX = e.clientX - rect.left;
			posY = e.clientY - rect.top;
            if(circuloClicado !== 'vazio'){
                circles[circuloClicado][1] = posX;
                circles[circuloClicado][2] = posY;
                circuloClicado = 'vazio';
                update(circles,ligacoes,grafo);
            }
		};
		
		canvas.onmousemove = function(e){
			var rect = canvas.getBoundingClientRect();
			posX = e.clientX - rect.left;
			posY = e.clientY - rect.top;
			if(circuloClicado !== 'vazio'){
                console.log('x: ',posX,' y: ',posY);
                circles[circuloClicado][1] = posX;
                circles[circuloClicado][2] = posY;
                update(circles,ligacoes,grafo);
			}
			onCircle = 0;
            for(var h=0; h<circles.length; h++){
                if(posX < circles[h][1]+20 && posX > circles[h][1]-20){
                    if(posY < circles[h][2]+20 && posY > circles[h][2]-20){
                        onCircle++;
                    }
                }
            }
            if(onCircle>0) canvas.style.cursor = "pointer";
			else canvas.style.cursor = "auto";
		};
		
	};
;