$(function(){

	var points = [],
      polygons = [];
	var c = $("#canvas").get(0);
	var ctx = c.getContext('2d');
   var x,y;

	var pivot = {};

   var initial;
   var drawable=false;
	var rotating = false;

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
      points = [];

   });

	$("#grid").click(function(){
		drawBoard(c,ctx);
	});

	$("#canvas").click(function(e){

      if(drawable||rotating){
			event = e;
			event = event || window.event;
			x = event.pageX - c.offsetLeft,
			y = event.pageY - c.offsetTop;
			y = convert(y);

			Dot.draw(x,y,ctx);

			if (!rotating) {


	   		points.push({
	   			x:x,
	   			y:y
	   		})
			}
			else {
				pivot.x = x;
				pivot.y = y;
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

		var angle = $("#angle").val();

		clearScreen(c,ctx);

		polygons[0].rotate(pivot,angle);
		Dot.draw(pivot.x,pivot.y,ctx);

	});

	$("#edging").click(function(){
		clearScreen(c,ctx);
		drawBoard(c,ctx);
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
		cleaned = true;
		drawed = false;
		polygons=[];
		clearScreen(c,ctx);
		var angle = $("#angle").val("");
	});

	$("#")


});
