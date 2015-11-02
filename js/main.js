$(function(){

	var points = [];
   var polygons = [];
	var c = $("#canvas").get(0);
	var ctx = c.getContext('2d');
   var x,y;

	var pivot = {};

	var pivot_move = {};
	var pivot_scale = {};

   var initial;
   var drawable=false;
	var rotating = false;
	var moving = false;
	var scaling = false;
	var griding = false;
	var drawn = false;
	var planing = false;
	var reflect_x = false;
	var reflect_y = false;
	var reflect_cero = false;
	var transform = new Object();

   $("#start").click(function(){
      drawable = true;
      c.style.cursor = "crosshair";
		$(this).addClass("active");
   });

   $("#end").click(function(){
		if(drawable){
	      drawable = false;
	      c.style.cursor = "default";
			drawn = true;
	      var polygon = new Polygon(points,ctx);
	      polygon.draw();
	      polygons.push(polygon);
			console.log(polygon);
	      points = [];
			$("#start").removeClass("active");
		}
		else {
			alert('Por favor inicie la edicion');
		}
   });

	$("#grid").click(function(){
		if(griding){
			griding = false;
			clearScreen(c,ctx);
			if(drawn)
				polygons[0].draw();
		}
		else{
			griding = true;
			drawBoard(c,ctx);
		}

	});

	$("#plane").click(function(){
		if(planing){
			planing = false;
			clearScreen(c,ctx);
		}
		else{
			planing = true;
			drawPlane(c,ctx);
		}

	});

	$("#canvas").click(function(e){

      if(drawable||rotating||scaling||moving){
			event = e;
			event = event || window.event;
			x = event.pageX - c.offsetLeft,
			y = event.pageY - c.offsetTop;
			y = convert(y);

			Dot.draw(x,y,ctx);

			if(moving){
				if(polygons.length>=1){
					transform.move = [ polygons[0].points[0].x,polygons[0].points[0].y ];

					clearScreen(c,ctx);
					if(griding)
						drawBoard(c,ctx);
					polygons[0].move(x,y);
					var _points = [x,y];

					console.log(transform.move);
				}
			}
			if(rotating){
				pivot.x = x;
				pivot.y = y;
			}
			if(scaling){
				pivot_scale.x = x;
				pivot_scale.y = y;
			}

			if(!moving&&!rotating&&!scaling)
			{
				points.push({
	   			x:x,
	   			y:y
	   		})
			}

      }
      else {
         alert('Si quiere dibujar por favor inicie la edicion o realize alguna accion');
      }

	});

	$("#rotate").click(function(){
		if(drawn){
			if(rotating){
				clearScreen(c,ctx);
				if(griding)
					drawBoard(c,ctx);
				var angle = $("#angle").val();
				Dot.draw(pivot.x,pivot.y,ctx);
				polygons[0].rotate(pivot,angle);
				transform.rotate = [pivot,angle];
			}
		}
		else {
			alert('Por favor termine la edicion');
		}
	});


	$("#scale").click(function(){

		if(scaling){
			clearScreen(c,ctx);
			var E = {
				x: $("#Ex").val(),
				y: $("#Ey").val()
			};
			polygons[0].scale(E,pivot_scale);
			transform.scale = [E,pivot_scale];

		}
	});

	$("#edging").click(function(){
		if(drawn){
			clearScreen(c,ctx);
			if(griding)
				drawBoard(c,ctx);
			var Af = {
				x: $("#Afx").val(),
				y: $("#Afy").val()
			};
			polygons[0].edging(Af);
			transform.edge = Af;
		}else {
			alert('Por favor termine la edicion antes de continuar');
		}
	});

	$("#reflexion_x").click(function(){
		if(planing){
			reflect_x = true;
			clearScreen(c,ctx);
			drawPlane(c,ctx);
			polygons[0].reflect(reflect_x,reflect_y,reflect_cero);
			reflect_x = false;
		}else {
			alert('Por favor, muestre el plano cartesiano');
		}
	});

	$("#reflexion_y").click(function(){
		if(planing){
			reflect_y = true;
			clearScreen(c,ctx);
			drawPlane(c,ctx);
			polygons[0].reflect(reflect_x,reflect_y,reflect_cero);
			reflect_y = false;
		}else {
			alert('Por favor, muestre el plano cartesiano');
		}
	});

	$("#reflexion_0").click(function(){
		if(planing){
			reflect_cero = true;
			clearScreen(c,ctx);
			drawPlane(c,ctx);
			polygons[0].reflect(reflect_x,reflect_y,reflect_cero);
			reflect_cero = false;
		}else {
			alert('Por favor, muestre el plano cartesiano');
		}
	});


	$("#clear").click(function(){
		clearScreen(c,ctx);

		cleaned = true;
		drawed = false;
		drawable=false;
		rotating = false;
		drawn = false;

		polygons=[];
		$("#angle").val("");
		$("#Ex").val("");
		$("#Ey").val("");
		$("#Afx").val("");
		$("#Afy").val("");
	});

	$("#clearFields").click(function(){
		$("#Ex").val("");
		$("#Ey").val("");
		$("#Afx").val("");
		$("#Afy").val("");
		$("#angle").val("");
	});


	$("#btn_move").click(function(){
		if(drawn){
			if(!moving){
				c.style.cursor = "move";
				moving = true;
				$(this).addClass("active");
			}
			else{
				c.style.cursor = "default";
				moving = false;
				$(this).removeClass("active");
			}
		}
		else {
			alert('Por favor termine la edicion antes de continuar');
		}
	});

	$("#btn_scaling").click(function(){
		scaling = true;
	});

	$("#ref_dot").click(function(){
		if(!moving)
			rotating = true;
		else {
			alert('Desactive el movimiento por favor');
		}
	});

	$("#reverse_move").click(function(){

		clearScreen(c,ctx);
		if(griding)
			drawBoard(c,ctx);

		polygons[0].move(transform.move[0],transform.move[1]);
	});

	$("#reverse_scale").click(function(){

		clearScreen(c,ctx);
		if(griding)
			drawBoard(c,ctx);

		var x = transform.scale[0].x;
		var y = transform.scale[0].y;

		polygons[0].scale(
			{
				x:1/x,
				y:1/y
			}
			,transform.scale[1]);
	});

	$("#reverse_rotate").click(function(){
		clearScreen(c,ctx);
		if(griding)
			drawBoard(c,ctx);

		polygons[0].rotate(transform.rotate[0],-transform.rotate[1]);
	});

	$("#reverse_edge").click(function(){
		clearScreen(c,ctx);
		if(griding)
			drawBoard(c,ctx);
		polygons[0].edging(
			{
				x:-transform.edge.x,
				y:-transform.edge.y
			}
		);
	});

});
