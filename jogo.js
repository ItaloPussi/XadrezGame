//inicia algumas letiáveis principais
	let possibilities = Array();
	let general = Array();
	let capture = Array();

	let follow = true;
	let peao_jogado = false;

	let previous_player = '';
	let previous_move = '';

	let verify;
	let auxId;
	let color_aux;

	let i_anterior;
	let controle_danos = false;

	//Variáveis relacionadas ao Rockie
	let rockie = Array();
	 rockie['white'] = [true,'18','88'];
	 rockie['black'] = [true,'11','81'];


	 let elements = document.getElementsByClassName('square'); 

	
//-------------------------------------------------------------------------------------------------------------
// ✓ Função para limpar seleções anteriores
	function clean(){
		for(let i = 0;i<=63;i++){
			elements[i].classList.remove('active');
		}
		
	}
//-------------------------------------------------------------------------------------------------------------
// ✓ Função para ordenar o Array;
	function order(){
		let k = possibilities.filter((este, a) => possibilities.indexOf(este) ===a)
		if(k.indexOf("")!=-1){
			let q = k.indexOf("");
			let l = k.splice(q,1)
		}
		possibilities=k;
	}
//-------------------------------------------------------------------------------------------------------------
// ✓ Função para  quando o jogador errar

	function error(){
		let audio = new Audio('fail.mp3');
				audio.addEventListener('canplaythrough', function() {
					
				  audio.play();
				});
		previous_move = '';
		clean()
		follow = true;

	}
//--------------------------------------------------------------------------------------------------------------
// ✓ função de calculo de areas possíveis para peças de movimento unico
	function calc(item){
			let calc = parseInt(auxId) + item;
			
			if(calc>10 && calc<89){
				possibilities.push(calc);
				
			}
		}
// ✓ função de calculo de areas possíveis para peças de movimento em linha
	function calc2(value, index){
			let aux7 = value;
			let aux8 = auxId;
			let aux9 = parseInt(aux8) + parseInt(value);
			let continue_calc = true;
			let continue_calc2 = true;
			while(continue_calc == true){
				
				while(continue_calc2 == true){
					verify = document.getElementById(aux9)
					if(verify != null && verify.classList[1] == undefined ) {
						possibilities.push(aux9)
					}else{
						if(verify != null && verify.classList[1].split("")[1] != color_aux){
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
		let img = document.createElement("IMG");
		img.src = "img/"+a+".png";
     	img.style.width = "30px";
    	img.style.height = "30px";

     	a[1]=="b" ? document.getElementById('eatwhite').appendChild(img) : document.getElementById('eatblack').appendChild(img);
	}
//--------------------------------------------------------------------------------------------------------------
// ✓ Função responsável pela movimentação das peças
	function toMove(id_square, possibilities,color){
		let id = id_square;
		let aux3 = general["piece"]

		if(possibilities.indexOf(parseInt(id)) != -1){
		
			previous_player = general["color"]
			document.getElementById(previous_move).classList.remove(general["piece"])
     		
			let a = document.getElementById(id).classList[1]
			a != 'active' ? eatpiece(id,a) : true;
			if(a =='kb' ||a== 'kw'){
				location.reload();
			}

			//Conferências relacionadas a possibilidades de Rockie
			if((previous_move == 18 || previous_move == 88) && general["piece"] == 'rw'){
				let aux10 = rockie['white'].indexOf(previous_move)
				rockie['white'][aux10] = '';
			}
			if((previous_move == 11 || previous_move == 81) && general["piece"] == 'rb'){
				let aux10 = rockie['black'].indexOf(previous_move)
				rockie['black'][aux10] = '';
			}

			document.getElementById(id).classList.add(general["piece"]);
			if((id == 28 || id == 78) && general["piece"] == 'kw' && rockie['white'][0]==true ){
				id = parseInt(id);
				id == 28 ? id -=10 : id+=10;
				document.getElementById(id).classList.remove('rw');
				id == 18 ? id+=20 : id-=20;
				document.getElementById(id).classList.add('rw');
				rockie['white'] = [];
			}
			if((id == 21 || id == 71) && general["piece"] == 'kb' && rockie['black'][0]==true ){
				id = parseInt(id);
				id == 21 ? id -=10 : id+=10;
				document.getElementById(id).classList.remove('rb');
				id == 11 ? id+=20 : id-=20;
				document.getElementById(id).classList.add('rb');
				rockie['black'] = [];
			}

			if(general["piece"] == 'kb'){
				rockie['black'][0] = false;
			}
			if(general["piece"] == 'kw'){
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
		if((aux3 == 'pb' || aux3 == 'pw') && (id.split("")[1] == 8 || id.split("")[1] == 1) && peao_jogado == true){
			document.getElementById(id).classList.remove(aux3);
			id.split("")[1] == 8 ? document.getElementById(id).classList.add("qb") : document.getElementById(id).classList.add("qw");
			clean();
		}
		color_aux = '';
		eat = [];
		clean();
		general = [];
		peao_jogado = false;
		previous_move = '';
		follow= true;
	}
//--------------------------------------------------------------------------------------------------------------
// ✓ Função principal responsável pelas informações iniciais e direcionamento para funções auxiliares
	function principal(id){
		// ✓ limpa quaisquer seleções anteriores, coleta o elemento e 'seleciona' o local clicado
			clean()
			let piece = document.getElementById(id);
			piece.classList.add('active');
		//------------------------------------------------------------------------------------------------------
		// ✓ identifica qual peça foi clicada e sua respectiva cor	
			let identify_piece = piece.classList;
			identify_piece = identify_piece[1];
			identify_piece = identify_piece.split("")
		//------------------------------------------------------------------------------------------------------	
		// ✓ identifica se o jogador está clicando repetivamente no mesmo local
			if(previous_move == id){
				error();
				return false;
			}
		//------------------------------------------------------------------------------------------------------	
		// ✓ Caso o jogador opte por comer a peça adversária
			if(follow === false && identify_piece[0] != 'a'){
				let aux11 = document.getElementById(previous_move);
				aux11 = aux11.classList[1];
				aux11 = aux11[1]
				if(aux11 === identify_piece[1]){
					error()
					return false;
				}else{
					toMove(id, possibilities,identify_piece[1])
					return false;
				}
		
			}
		//------------------------------------------------------------------------------------------------------		
		// ✓ verificações se é o jogador correto que está jogando
			if((identify_piece[1] == 'b' && previous_player == '') || (identify_piece[1] == previous_player)  || (previous_move == "" && identify_piece[1] == 'c')){
			 	error();
				return false;
			}
		//------------------------------------------------------------------------------------------------------		
		// ✓ Limpa e prepara algumas letiáveis
		if(identify_piece[0]!='a'){
			possibilities = []
			auxId = id;
			previous_move= id;

		}
		//------------------------------------------------------------------------------------------------------
		// ✓ Identifica a peça clicada e redireciona para sua respectiva função
			switch(identify_piece[0]){
				case 'r':
					rook(id,identify_piece[1]);
					break;
				case 'h':
					horse(id,identify_piece[1]);
					break;
				case 'b':
					bishop(id,identify_piece[1]);
					break;
				case 'k':
					king(id,identify_piece[1]);
					break;
				case 'q':
					queen(id,identify_piece[1]);
					break;
				case 'p':
					pawn(id,identify_piece[1]);
					break;
				case 'a':
					follow = true;
					toMove(id, possibilities,identify_piece[1]);
					break;
			}
		//------------------------------------------------------------------------------------------------------
		//Verifica se há possibilidades de movimentação
		if(identify_piece[0]!='a' && possibilities.length==0){
			error();
			return false;
		}
	}
//--------------------------------------------------------------------------------------------------------------
// ✓ Função Cavalo
	function horse(id,color){
		function check_horse(value, index){
			verify = document.getElementById(value) != null ? document.getElementById(value).classList : true;
			if(verify == true){
				possibilities[index] = '';
			}
			if(verify[1] == undefined){
				return false
			}
			if(verify[1].split("")[1] == color){
				possibilities[index] = '';
				
			}
		}

		let aux = [-12,8,19,-21,12,-8,-19,21]
		aux.forEach(calc)
		possibilities.forEach(check_horse)	

		if(color == 'b'){
			general["piece"] = 'hb';
			general["color"] = 'b';
		}else{
			general["piece"] = 'hw';
			general["color"] = 'w';
		}
		follow = false;
		order()
	}
//--------------------------------------------------------------------------------------------------------------
// ✓ Função peão
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
			if(index >1 && (verify[1] == undefined || verify[1].split("") ==color)){
				possibilities[index] = '';
				return false;
			}
		}
		
		if(color == 'b'){
			let aux = [1,2,11,-9]
			id[1]!=2 ? aux[1] = 1 : true;

			aux.forEach(calc)
			possibilities.forEach(check_pawn)
	 		
			general["piece"] = 'pb';
			general["color"] = 'b';	
		}else{
			let aux = [-1,-2,-11,9]
			id[1]!=7 ? aux[1] = -1 : true;

			aux.forEach(calc)
			possibilities.forEach(check_pawn)

			general["piece"] = 'pw';
			general["color"] = 'w';
		}
		follow = false;
		order()
	}
//--------------------------------------------------------------------------------------------------------------
// ✓ Movimentação do bispo
	function bishop(id,color){
		

		color_aux = color;
		let aux = [9,-9,11,-11]
		aux.forEach(calc2)

		if(color == 'b'){
			general["piece"] = 'bb';
			general["color"] = 'b';
		}else{
			general["piece"] = 'bw';
			general["color"] = 'w';
		}
		follow = false;

	}
//--------------------------------------------------------------------------------------------------------------
// ✓ Movimentação da torre
	function rook(id,color){
		

		color_aux = color;
		let aux = [1,-1,10,-10]
		aux.forEach(calc2)

		if(color == 'b'){
			general["piece"] = 'rb';
			general["color"] = 'b';
		}else{
			general["piece"] = 'rw';
			general["color"] = 'w';
		}
		follow = false;
	}
//--------------------------------------------------------------------------------------------------------------
// ✓ Movimentação da rainha
	function queen(id,color){
		
		color_aux = color;
		let aux = [1,-1,9,-9,10,-10,11,-11]
		aux.forEach(calc2)

		if(color == 'b'){
			general["piece"] = 'qb';
			general["color"] = 'b';
		}else{
			general["piece"] = 'qw';
			general["color"] = 'w';

		}
		follow = false;

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
			if(verify[1].split("")[1] == color){
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
			general["piece"] = 'kb';
			general["color"] = 'b';
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
			general["piece"] = 'kw';
			general["color"] = 'w';
		}
		follow = false;
		order()

	}
//-------------------------------------------------------------------------------------------------------------
