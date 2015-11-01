$(function(){

	var points = [],
      polygons = [];
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

   $("#start").click(function(){
      drawable = true;
      c.style.cursor = "crosshair";
   });

   $("#end").click(function(){
      drawable = false;
      c.style.cursor = "default";

      var polygon = new Polygon(points,ctx);
      polygon.draw();
      polygons.push(polygon);
		console.log(polygon);
      points = [];

   });

	$("#grid").click(function(){
		drawBoard(c,ctx);
	});

	$("#canvas").click(function(e){

      if(drawable||rotating||scaling){
			event = e;
			event = event || window.event;
			x = event.pageX - c.offsetLeft,
			y = event.pageY - c.offsetTop;
			y = convert(y);

			Dot.draw(x,y,ctx);

			if(moving){
				pivot_move.x = x;
				pivot_move.y = y;
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
         alert('Si quiere dibujar por favor inicie la edicion');
      }

	});


	$("#draw").click(function(){

		var polygon =  new Polygon(points,ctx);
		// Dibujar el poligono
		polygon.draw();

		polygons.push(polygon);
		points = [];

	});

	$("#rotate").click(function(){

		if(rotating){
			clearScreen(c,ctx);
			var angle = $("#angle").val();
			clearScreen(c,ctx);
			polygons[0].rotate(pivot,angle);
			Dot.draw(pivot.x,pivot.y,ctx);
		}
	});

	$("#btn_scaling").click(function(){
		scaling = true;
	});

	$("#scale").click(function(){

		if(scaling){
			clearScreen(c,ctx);
			var E = {
				x: $("#Ex").val(),
				y: $("#Ey").val()
			}
			polygons[0].scale(E,pivot_scale);
		}
	});

	$("#edging").click(function(){
		var Af = {
			x: $("#Afx").val(),
			y: $("#Afy").val()
		}
		polygons[0].edging(Af);
	});

	$("#ref_dot").click(function(){
		rotating = true;

	});

	$("#clear").click(function(){
		clearScreen(c,ctx);

		cleaned = true;
		drawed = false;
		drawable=false;
		rotating = false;

		polygons=[];
		$("#angle").val("");
	});

	$("#btn_move").click(function(){
		if(!moving){
			c.style.cursor = "move";
			moving = true;
		}
		else{
			c.style.cursor = "default";
			moving = false;
		}
	});


});
