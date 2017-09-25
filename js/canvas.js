	//DESENHA LINHA
	function drawLine(Inx,Iny,Outx,Outy){
			ctx.moveTo(Inx,Iny);
			ctx.lineTo(Outx,Outy);
			ctx.fillStyle="black";
			ctx.stroke();
			/*ctx.moveTo(Inx,Iny);
			ctx.bezierCurveTo(Inx,Iny+50,Outx,Outy+50, Outx, Outy);
        	ctx.stroke();*/
	}

	function drawCircle(name,x,y,color){
		ctx.beginPath();
		ctx.arc(x,y,20,0,2*Math.PI);
		ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';
        ctx.stroke();
		ctx.fillStyle = color;
		ctx.fill();
        ctx.font = "12px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(name, x, y+5);
    }

    function update(circles,ligacoes){
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
            drawLine(origem[1],origem[2],destino[1],destino[2]);
        }

        //desenha os circulos
        for(var l=0; l<circles.length;l++){
            drawCircle(circles[l][0],circles[l][1],circles[l][2],circles[l][3]);
        }
	}

	//INICIA 
	function start(canvas,vertices,ligacoes){
	    circles = [];
	    // cria vetor de circulos com a posição e o nome do vertice
	    for(var i=0; i<vertices.length;i++){
	        posX = Math.floor((Math.random() * $("#myCanvas").width()) + 1);
	        posY = Math.floor((Math.random() * $("#myCanvas").height()) + 1);
            circle = [vertices[i][0],posX,posY,vertices[i][1]];
            circles.push(circle);
		}

		update(circles,ligacoes);
        update(circles,ligacoes);

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
                update(circles,ligacoes);
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
                update(circles,ligacoes);
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

	//ACONTECE QUANDO CARREGA
	window.onload = function () {

	    canvas  = document.getElementById('myCanvas');
	    ctx     = canvas.getContext('2d');

	    canvas.style.width ='100%';
        canvas.style.height='100%';
        // ...then set the internal size to match
        canvas.width  = $("#myCanvas").width();
        canvas.height = $("#myCanvas").height();

	    var vertices = [];
	    var ligacoes = [];
	   
        vertices.push(['q0','red']);
        vertices.push(['q1','blue']);
        vertices.push(['q2','green']);
        vertices.push(['q3','purple']);
        vertices.push(['q4','grey']);
        vertices.push(['q5','pink']);
		
		ligacoes.push(['q0','q1']);
        ligacoes.push(['q0','q2']);
        ligacoes.push(['q0','q3']);
        ligacoes.push(['q1','q3']);
        ligacoes.push(['q0','q4']);
        ligacoes.push(['q2','q5']);
        ligacoes.push(['q2','q1']);
        ligacoes.push(['q5','q4']);
        
        start(canvas,vertices,ligacoes);

        

	};