	for(let i = 1;i<=8;i++){
		let ref
		let nova
		let elemento
		if(i % 2 !=0){
			ref = document.getElementById('eatwhite')
			nova =document.createElement('div')
			nova.className+='column columni normal'
		}else{
			ref = document.getElementById('eatwhite')
			nova =document.createElement('div')
			nova.className+='column columni alternate'
		}
		
			for(let j = 1;j<=8;j++){
				elemento = document.createElement('div')
				elemento.className+='square '
				elemento.id+=`${i}${j}`
				elemento.onclick = ()=>{principal(`${i}${j}`)}

				if(j == 2){
					elemento.className+='pb'
				}else if(j ==7){
					elemento.className+='pw'
				}else if(j==1 && (i==1 || i ==8)){
					elemento.className+='rb'
				}else if(j==8 && (i==1 || i ==8)){
					elemento.className+='rw'
				}else if(j==1 && (i==2 || i ==7)){
					elemento.className+='hb'
				}else if(j==8 && (i==2 || i ==7)){
					elemento.className+='hw'
				}else if(j==1 && (i==3 || i ==6)){
					elemento.className+='bb'
				}else if(j==8 && (i==3 || i ==6)){
					elemento.className+='bw'
				}else if(j==1 && i==5){
					elemento.className+='kb'
				}else if(j==8 && i==5){
					elemento.className+='kw'
				}else if(j==1 && i==4){
					elemento.className+='qb'
				}else if(j==8 && i==4){
					elemento.className+='qw'
				}
				nova.appendChild(elemento)
			}
		let parentDiv = document.getElementById('board')
		parentDiv.insertBefore(nova,ref)
					
	}

	let possibilities = Array();
	let general = Array();
	let emptySquareSelected

	let capture = false;
	let peao_jogado = false;

	let previous_player = '';
	let previousMove = '';

	let verify;
	let selectedID;
	let color_aux;

	let rockie = Array();
	 rockie['white'] = [true,'18','88'];
	 rockie['black'] = [true,'11','81'];


	 let squares = document.getElementsByClassName('square'); 

	
//-------------------------------------------------------------------------------------------------------------
// ✓ clear previous selections
	function clean(){
		for(let square = 0;square<=63;square++){
			squares[square].classList.remove('active');
		}
		
	}
//-------------------------------------------------------------------------------------------------------------
// Função para ordenar o Array;
	function order(){
		let k = possibilities.filter((este, a) => possibilities.indexOf(este) ===a)
		if(k.indexOf('')!=-1){
			let q = k.indexOf('');
			let l = k.splice(q,1)
		}
		possibilities=k;
	}
//-------------------------------------------------------------------------------------------------------------
// Função para  quando o(s) jogadores errarem determinado movimento

	function error(){
		let audio = new Audio('fail.mp3');
				audio.addEventListener('canplaythrough', function() {
					
				  audio.play();
				});
		previousMove = '';
		clean()
		capture = false;

	}
//--------------------------------------------------------------------------------------------------------------
// função de calculo de areas possíveis para peças de movimento unico 
	function calc(item){
			let calc = parseInt(selectedID) + item;
			
			if(calc>10 && calc<89){
				possibilities.push(calc);
				
			}
		}
// função de calculo de areas possíveis para peças de movimento em linha
	function calc2(value, index){
			let aux7 = value;
			let aux8 = selectedID;
			let aux9 = parseInt(aux8) + parseInt(value);
			let continue_calc = true;
			let continue_calc2 = true;
			while(continue_calc == true){
				
				while(continue_calc2 == true){
					verify = document.getElementById(aux9)
					if(verify != null && verify.classList[1] == undefined ) {
						possibilities.push(aux9)
					}else{
						if(verify != null && verify.classList[1].split('')[1] != color_aux){
							possibilities.push(aux9)
						}
						continue_calc2 = false;
					}
					aux9+= value;
				}
				continue_calc = false;

			}
		}

	function eatpiece(id,a){
		document.getElementById(id).classList.remove(a)
		let img = document.createElement('IMG');
		img.src = 'img/'+a+'.png';
     	img.style.width = '30px';
    	img.style.height = '30px';

     	a[1]=='b' ? document.getElementById('eatwhite').appendChild(img) : document.getElementById('eatblack').appendChild(img);
	}
//--------------------------------------------------------------------------------------------------------------
// Função responsável pela movimentação das peças
	function toMove(selectedSquareID, possibilities,color){
		selectedSquareID = selectedSquareID;
		let aux3 = general['piece']

		if(possibilities.indexOf(parseInt(selectedSquareID)) != -1){
		
			previous_player = general['color']
			document.getElementById(previousMove).classList.remove(general['piece'])
     		
			let a = document.getElementById(selectedSquareID).classList[1]
			a != 'active' ? eatpiece(selectedSquareID,a) : true;
			if(a =='kb' ||a== 'kw'){
				location.reload();
			}

			//Conferências relacionadas a possibilidades de Rockie
			if((previousMove == 18 || previousMove == 88) && general['piece'] == 'rw'){
				let aux10 = rockie['white'].indexOf(previousMove)
				rockie['white'][aux10] = '';
			}
			if((previousMove == 11 || previousMove == 81) && general['piece'] == 'rb'){
				let aux10 = rockie['black'].indexOf(previousMove)
				rockie['black'][aux10] = '';
			}

			document.getElementById(selectedSquareID).classList.add(general['piece']);
			if((selectedSquareID == 28 || selectedSquareID == 78) && general['piece'] == 'kw' && rockie['white'][0]==true ){
				selectedSquareID = parseInt(selectedSquareID);
				selectedSquareID == 28 ? selectedSquareID -=10 : selectedSquareID+=10;
				document.getElementById(selectedSquareID).classList.remove('rw');
				selectedSquareID == 18 ? selectedSquareID+=20 : selectedSquareID-=20;
				document.getElementById(selectedSquareID).classList.add('rw');
				rockie['white'] = [];
			}
			if((selectedSquareID == 21 || selectedSquareID == 71) && general['piece'] == 'kb' && rockie['black'][0]==true ){
				selectedSquareID = parseInt(selectedSquareID);
				selectedSquareID == 21 ? selectedSquareID -=10 : selectedSquareID+=10;
				document.getElementById(selectedSquareID).classList.remove('rb');
				selectedSquareID == 11 ? selectedSquareID+=20 : selectedSquareID-=20;
				document.getElementById(selectedSquareID).classList.add('rb');
				rockie['black'] = [];
			}

			if(general['piece'] == 'kb'){
				rockie['black'][0] = false;
			}
			if(general['piece'] == 'kw'){
				rockie['white'][0] = false;
			}

			clean();

			if(aux3 == 'pb' || aux3 == 'pw'){
				peao_jogado = true;
			}
			possibilities = []

		}else{

			error()
		}
		if((aux3 == 'pb' || aux3 == 'pw') && (selectedSquareID.split('')[1] == 8 || selectedSquareID.split('')[1] == 1) && peao_jogado == true){
			document.getElementById(selectedSquareID).classList.remove(aux3);
			selectedSquareID.split('')[1] == 8 ? document.getElementById(selectedSquareID).classList.add('qb') : document.getElementById(selectedSquareID).classList.add('qw');
			clean();
		}
		color_aux = '';
		eat = [];
		clean();
		general = [];
		peao_jogado = false;
		previousMove = '';
		capture= false;
	}
//--------------------------------------------------------------------------------------------------------------
// Função principal responsável pelas informações iniciais e direcionamento para funções auxiliares
	function principal(selectedSquareID){
		// ✓ clears any previous selections, collects the element and 'selects' the clicked location
			clean()
			let selectedSquare = document.getElementById(selectedSquareID);
			selectedSquare.classList.add('active');
		//------------------------------------------------------------------------------------------------------
		// ✓ identifies which piece was clicked and its color	
			let identifyPiece = selectedSquare.classList;
			identifyPiece = identifyPiece[1];
			let [initialPieceCharacter, color]= identifyPiece.split('')
			initialPieceCharacter === 'a' ? emptySquareSelected = true : emptySquareSelected = false
		//------------------------------------------------------------------------------------------------------	
		// ✓ identifies whether the player is repeatedly clicking on the same location
			if(previousMove == selectedSquareID){
				return false;
			}
		//------------------------------------------------------------------------------------------------------	
		// ✓ if the player chooses to eat the opposing piece
			if(capture === true && !emptySquareSelected){
				let previousPiece = document.getElementById(previousMove);
				previousPiece = previousPiece.classList[1];
				let previousColor = previousPiece[1]
				if(previousColor === color){
					error()
					return false;
				}else{
					toMove(selectedSquareID, possibilities,color)
					return false;
				}
		
			}
		//------------------------------------------------------------------------------------------------------		
		// verificações se é o jogador correto que está jogando
			if((color== 'b' && previous_player == '') || (color == previous_player)  || (previousMove == '' && emptySquareSelected)){
			 	error();
				return false;
			}
		//------------------------------------------------------------------------------------------------------		
		// ✓ Cleans and prepares some variables
			if(!emptySquareSelected){
				possibilities = []
				selectedID = selectedSquareID;
				previousMove= selectedSquareID;

			}
		//------------------------------------------------------------------------------------------------------
		// ✓  Identifies the clicked part and redirects it to its respective function
			switch(initialPieceCharacter){
				case 'r':
					rook(selectedSquareID,color);
					break;
				case 'h':
					horse(selectedSquareID,color);
					break;
				case 'b':
					bishop(selectedSquareID,color);
					break;
				case 'k':
					king(selectedSquareID,color);
					break;
				case 'q':
					queen(selectedSquareID,color);
					break;
				case 'p':
					pawn(selectedSquareID,color);
					break;
				default:
					capture = false;
					toMove(selectedSquareID, possibilities,color);
					break;
			}
		//------------------------------------------------------------------------------------------------------
		// ✓ Checks for movement possibilities
			if(!emptySquareSelected && possibilities.length==0){
				error();
				return false;
			}
		//------------------------------------------------------------------------------------------------------

	}
//--------------------------------------------------------------------------------------------------------------
// Função Cavalo
	function horse(id,color){
		function check_horse(value, index){
			verify = document.getElementById(value) != null ? document.getElementById(value).classList : true;
			if(verify == true){
				possibilities[index] = '';
			}
			if(verify[1] == undefined){
				return false
			}
			if(verify[1].split('')[1] == color){
				possibilities[index] = '';
				
			}
		}

		let aux = [-12,8,19,-21,12,-8,-19,21]
		aux.forEach(calc)
		possibilities.forEach(check_horse)	

		general['piece'] = 'h'+color
		general['color'] = color
		capture = true;
		order()
	}
//--------------------------------------------------------------------------------------------------------------
// Função peão
	function pawn(id,color){
		function check_pawn(value, index){
			verify = document.getElementById(value) != null ? document.getElementById(value).classList : true;
			if(index == 0 && verify[1] != undefined){
				possibilities[0] = '';
				possibilities[1] = '';
				return false;
			}
			if(index == 1 && verify[1] != undefined){
				possibilities[1] = '';
				return false;
			}
			if(index >1 && (verify[1] == undefined || verify[1].split('') ==color)){
				possibilities[index] = '';
				return false;
			}
		}
		let aux
		if(color == 'b'){
			aux = [1,2,11,-9]
			id[1]!=2 ? aux[1] = 1 : true;

		}else{
			aux = [-1,-2,-11,9]
			id[1]!=7 ? aux[1] = -1 : true;
		}
		aux.forEach(calc)
		possibilities.forEach(check_pawn)
		general['piece'] = 'p'+color
		general['color'] = color
		capture = true;
		order()
	}
//--------------------------------------------------------------------------------------------------------------
// Movimentação do bispo
	function bishop(id,color){
		

		color_aux = color;
		let aux = [9,-9,11,-11]
		aux.forEach(calc2)

		general['piece'] = 'b'+color
		general['color'] = color
		capture = true;

	}
//--------------------------------------------------------------------------------------------------------------
// Movimentação da torre
	function rook(id,color){
		

		color_aux = color;
		let aux = [1,-1,10,-10]
		aux.forEach(calc2)

		general['piece'] = 'r'+color
		general['color'] = color
		capture = true;
	}
//--------------------------------------------------------------------------------------------------------------
// Movimentação da rainha
	function queen(id,color){
		
		color_aux = color;
		let aux = [1,-1,9,-9,10,-10,11,-11]
		aux.forEach(calc2)

		general['piece'] = 'q'+color
		general['color'] = color
		capture = true;

	}
//-------------------------------------------------------------------------------------------------------------
// ✓Função rei
	function king(id,color){
		function check_king(value, index){
			verify = document.getElementById(value) != null ? document.getElementById(value).classList : true;
			if(document.getElementById(value) ==null){
				possibilities[index] = '';
				return false;
			}

			if(verify[1] == undefined){
				return false;
			}
			if(verify[1].split('')[1] == color){
				possibilities[index] = '';
				
			}
		}

		let aux = [1,-1,9,-9,10,-10,11,-11]		
		aux.forEach(calc)
		possibilities.forEach(check_king)

		if(color == 'b'){
			
			if(rockie['black'][0] == true &&(rockie['black'][1] != '' || rockie['black'][2] != '')){
				if(document.getElementById(71).classList[1] == undefined && document.getElementById(61).classList[1] == undefined ){
					possibilities.push(71)
				}
				if(document.getElementById(21).classList[1] == undefined && document.getElementById(31).classList[1] == undefined && document.getElementById(41).classList[1] == undefined ){
					possibilities.push(21)
				}
				color_aux = 'b';

			}
		}else{
			if(rockie['white'][0] == true &&(rockie['white'][1] != '' || rockie['white'][2] != '')){
				if(document.getElementById(78).classList[1] == undefined && document.getElementById(68).classList[1] == undefined ){
					possibilities.push(78)
				}
				if(document.getElementById(28).classList[1] == undefined && document.getElementById(38).classList[1] == undefined && document.getElementById(48).classList[1] == undefined ){
					possibilities.push(28)

				}
				color_aux = 'w';

			}
		}
		general['piece'] = 'k'+color
		general['color'] = color
		capture = true;
		order()

	}
//-------------------------------------------------------------------------------------------------------------
