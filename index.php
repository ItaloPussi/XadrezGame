<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Xadrez</title>
	<script type="text/javascript" src="jogo.js"></script>
	<link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>

	<div id="board">
	<div id="eatblack"></div>
	<div id="eatwhite"></div>
		<?php 
			
			for($i = 1;$i<=8;$i++){
				if($i % 2 !=0){
					echo "<div class='column column$i normal'>";
				}else{
					echo "<div class='column column$i alternate'>";
				}
				
					for($j = 1;$j<=8;$j++){
						if($j == 2){
							echo "<div class='square pb' id='$i$j' onclick='principal(this.id);'></div>";
						}else if($j ==7){
							echo "<div class='square pw' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==1 && ($i==1 || $i ==8)){
							echo "<div class='square rb' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==8 && ($i==1 || $i ==8)){
							echo "<div class='square rw' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==1 && ($i==2 || $i ==7)){
							echo "<div class='square hb' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==8 && ($i==2 || $i ==7)){
							echo "<div class='square hw' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==1 && ($i==3 || $i ==6)){
							echo "<div class='square bb' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==8 && ($i==3 || $i ==6)){
							echo "<div class='square bw' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==1 && $i==5){
							echo "<div class='square kb' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==8 && $i==5){
							echo "<div class='square kw' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==1 && $i==4){
							echo "<div class='square qb' id='$i$j' onclick='principal(this.id)'></div>";
						}else if($j==8 && $i==4){
							echo "<div class='square qw' id='$i$j' onclick='principal(this.id)'></div>";
						}else{
							echo "<div class='square' id='$i$j' onclick='principal(this.id)'></div>";
						}
						
						
					}
				echo "</div>";
					
			}
		?>
	</div>
	
</body>
</html>