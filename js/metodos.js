$(function(){

	$("#btn1").click(function(){
		var x1 = $("#h_numx1").val();
	    var y1 = $("#h_numy1").val();
    	var x2 = $("#h_numx2").val();
    	dibujarpunto(x1,y1,x2);

	});

	$("#clear").click(function(){
        location.reload();
	});

	$("#dibujar_vertical").click(function(){
		var x1 = $("#v_numx1").val();
	    var y1 = $("#v_numy1").val();
    	var y2 = $("#v_numy2").val();
		dibujar_linea_vertical(x1,y1,y2);
	});

	$("#dibujar_diagonal").click(function(){
		var x1 = $("#d_numx1").val();
		var y1 = $("#d_numy1").val();
		var x2 = $("#d_numx2").val();
		dibujar_linea_diagonal(x1,y1,x2);
	});

	$("#metodo_directo").click(function(){
		var x1=$("#md_numx1").val();
		var y1=$("#md_numy1").val();
		var x2=$("#md_numx2").val();
		var y2=$("#md_numy2").val();

		metodo_directo(x1,y1,x2,y2);
	});

	$("#add_simple").click(function(){
		var x1=$("#adds_numx1").val();
		var y1=$("#adds_numy1").val();
		var x2=$("#adds_numx2").val();
		var y2=$("#adds_numy2").val();

		add_simple(x1,y1,x2,y2);
	});

	$("#add_entero").click(function(){
		var x1=$("#adde_numx1").val();
		var y1=$("#adde_numy1").val();
		var x2=$("#adde_numx2").val();
		var y2=$("#adde_numy2").val();

		add_entero(x1,y1,x2,y2);

	});


    $("#draw_circle").click(function(){
        //var x=$("#c_numx").val();
        //var y=$("#c_numy").val();
        var xc=$("#c_numxc").val();
        var yc=$("#c_numyc").val();
        var r=$("#c_radio").val();

        draw_circle(xc,yc,r);
    });

    $("#draw_circle_polar").click(function(){
        //var x=$("#cp_numx").val();
        //var y=$("#cp_numy").val();
        var xc=$("#cp_numxc").val();
        var yc=$("#cp_numyc").val();
        var r=$("#cp_radio").val();

        draw_parameters_polar(xc,yc,r);
    });

    $("#draw_circle_polar_increment").click(function(){
        var x=$("#cpi_numx").val();
        var y=$("#cpi_numy").val();
        var xc=$("#cpi_numxc").val();
        var yc=$("#cpi_numyc").val();
        var r=$("#cpi_radio").val();

        draw_parameters_increment(xc,yc,r);
    });

    $("#draw_cohen").click(function(){

        var xmin = 100;
        var ymin = xmin;
        var xmax = 400;
        var ymax = xmax;

        var x2init = $("#numx1").val();
        var y2init = $("#numy1").val();

        var x2end = $("#numx2").val();
        var y2end = $("#numy2").val();

        var X1 = [xmin,xmax];
        var Y1 = [ymin,ymax];

        var X2 = [x2init,x2end];
        var Y2 = [y2init,y2end];

        draw_square(xmin,ymin,xmax,ymax);

        algorith_cohen(X1,Y1,X2,Y2)

    });
});

function limpiarGrafico()
{
    var c= document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    cargarLienzo();
}

function limpiarNumero()
{

    document.getElementById("numx1").value = "";
    document.getElementById("numy1").value = "";
    document.getElementById("numx2").value = "";
    document.getElementById("numy2").value = "";
}

function algorith_cohen(X1,Y1,X2,Y2){

    var xmin;
    var ymin;
    var xmax;
    var ymax;



        var x1;
        var x2;
        var y1;
        var y2;

        function dibujar()
        {
            limpiarGrafico();
            x1 = Number(document.getElementById("numx1").value);
            y1 = Number(document.getElementById("numy1").value);
            x2 = Number(document.getElementById("numx2").value);
            y2 = Number(document.getElementById("numy2").value);

            recta(x1,y1,x2,y2);
        }


        function recta(x1,y1,x2,y2)
        {
            var c = document.getElementById("myCanvas");
            ctx = c.getContext("2d");
            ctx.lineWidth = 1;
            ctx.strokeStyle = "blue";

            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
            ctx.closePath();
        }

        function ubicar(a,b)
        {
            var cadena;
            if (a<=xmin && b<=ymin)
            {
                cadena = "IZ";
            }
            else if (a>=xmin && a<=xmax && b<=ymin)
            {
                cadena = "I";
            }
            else if (a>=xmax && b<=ymin)
            {
                cadena = "ID";
            }
            else if (a>=xmax && b>=ymin && b<=ymax)
            {
                cadena = "D";
            }
            else if (a<=xmin && b>=ymin && b<=ymax)
            {
                cadena = "Z";
            }
            else if (a<=xmin && b>=ymax)
            {
                cadena = "SZ";
            }
            else if (a>=xmin && a<=xmax && b>=ymax)
            {
                cadena = "S";
            }
            else if (a>=xmax && b>=ymax)// a>=xmax && b>=ymax
            {
                cadena = "SD";
            }
            else
            {
                cadena = "C";
            }
            return cadena;
        }

        var ubicacion_a = "";
        var ubicacion_b = "";
        var interseccion;

        function intersecar(ubi_a,ubi_b)
        {
            var igual = 0;
            for (var i=0; i<ubi_a.length; i++)
            {
                var dato_a = ubi_a.charAt(i);
                for (var j=0; j<ubi_b.length; j++)
                {
                    var dato_b = ubi_b.charAt(j);
                    if (dato_a == dato_b)
                    {
                        igual = 1;
                        j = ubi_b.length;
                        i = ubi_a.length;
                    }
                }
            }
            if (igual == 1)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        var bandera = 0;

        function recortar()
        {

            if (x1>=xmin && x1<=xmax && y1>=ymin && y1<=ymax && x2>=xmin && x2<=xmax && y2>=ymin && y2<=ymax)
            {
                limpiarGrafico();
                recta(x1,y1,x2,y2);
                bandera = 1;
            }
            else
            {
                ubicacion_a = ubicar(x1,y1);
                ubicacion_b = ubicar(x2,y2);
                interseccion = intersecar(ubicacion_a,ubicacion_b);
            }
            if (interseccion == 1)
            {
                limpiarGrafico();
            }
            else //interseccion = 0 .. significa que hay que recortar.
            {

                if (bandera == 0)
                {
                    limpiarGrafico();

                    var nuevo_x1;
                    var nuevo_y1;
                    var nuevo_x2;
                    var nuevo_y2;

                    var m = (y2-y1) / (x2-x1);
                    switch (ubicacion_a)
                    {
                        case "IZ":
                            nuevo_x1 = xmin;
                            nuevo_y1 = m * (nuevo_x1 - x1) + y1;
                            if (nuevo_y1 < ymin)
                            {
                                nuevo_y1 = ymin;
                                nuevo_x1 = (1/m) * (nuevo_y1 - y1) + x1;
                            }
                            break;
                        case "I":
                            nuevo_y1 = ymin;
                            nuevo_x1 = (1/m) * (nuevo_y1 - y1) + x1;
                            break;
                        case "ID":
                            nuevo_x1 = xmax;
                            nuevo_y1 = m * (nuevo_x1 - x1) + y1;
                            if (nuevo_y1 < ymin)
                            {
                                nuevo_y1 = ymin;
                                nuevo_x1 = (1/m) * (nuevo_y1 - y1) + x1;
                            }
                            break;
                        case "D":
                            nuevo_x1 = xmax;
                            nuevo_y1 = m * (nuevo_x1 - x1) + y1;
                            break;
                        case "Z":
                            nuevo_x1 = xmin;
                            nuevo_y1 = m * (nuevo_x1 - x1) + y1;
                            break;
                        case "SZ":
                            nuevo_x1 = xmin;
                            nuevo_y1 = m * (nuevo_x1 - x1) + y1;
                            if (nuevo_y1 > ymax)
                            {
                                nuevo_y1 = ymax;
                                nuevo_x1 = (1/m) * (nuevo_y1 - y1) + x1;
                            }
                            break;
                        case "S":
                            nuevo_y1 = ymax;
                            nuevo_x1 = (1/m) * (nuevo_y1 - y1) + x1;
                            break;
                        case "SD":
                            nuevo_x1 = xmax;
                            nuevo_y1 = m * (nuevo_x1 - x1) + y1;
                            if (nuevo_y1 > ymax)
                            {
                                nuevo_y1 = ymax;
                                nuevo_x1 = (1/m) * (nuevo_y1 - y1) + x1;
                            }
                            break;
                        case "C":
                            nuevo_x1 = x1;
                            nuevo_y1 = y1;
                            break;
                    }
                    switch (ubicacion_b)
                    {
                        case "IZ":
                            nuevo_x2 = xmin;
                            nuevo_y2 = m * (nuevo_x2 - x2) + y2;
                            if (nuevo_y2 < ymin)
                            {
                                nuevo_y2 = ymin;
                                nuevo_x2 = (1/m) * (nuevo_y2 - y2) + x2;
                            }
                            break;
                        case "I":
                            nuevo_y2 = ymin;
                            nuevo_x2 = (1/m) * (nuevo_y2 - y2) + x2;
                            break;
                        case "ID":
                            nuevo_x2 = xmax;
                            nuevo_y2 = m * (nuevo_x2 - x2) + y2;
                            if (nuevo_y2 < ymin)
                            {
                                nuevo_y2 = ymin;
                                nuevo_x2 = (1/m) * (nuevo_y2 - y2) + x2;
                            }
                            break;
                        case "D":
                            nuevo_x2 = xmax;
                            nuevo_y2 = m * (nuevo_x2 - x2) + y2;
                            break;
                        case "Z":
                            nuevo_x2 = xmin;
                            nuevo_y2 = m * (nuevo_x2 - x2) + y2;
                            break;
                        case "SZ":
                            nuevo_x2 = xmin;
                            nuevo_y2 = m * (nuevo_x2 - x2) + y2;
                            if (nuevo_y2 > ymax)
                            {
                                nuevo_y2 = ymax;
                                nuevo_x2 = (1/m) * (nuevo_y2 - y2) + x2;
                            }
                            break;
                        case "S":
                            nuevo_y2 = ymax;
                            nuevo_x2 = (1/m) * (nuevo_y2 - y2) + x2;
                            break;
                        case "SD":
                            nuevo_x2 = xmax;
                            nuevo_y2 = m * (nuevo_x2 - x2) + y2;
                            if (nuevo_y2 > ymax)
                            {
                                nuevo_y2 = ymax;
                                nuevo_x2 = (1/m) * (nuevo_y2 - y2) + x2;
                            }
                            break;
                        case "C":
                            nuevo_x2 = x2;
                            nuevo_y2 = y2;
                            break;
                    }
                    recta(nuevo_x1,nuevo_y1,nuevo_x2,nuevo_y2);
                }
            }
        }

}


function sumar(k)
{
    return (k);
}

function limpiar()
{

    $("#numx1").val("");
    $("#numy1").val("");
    $("#numx2").val("");

    var c= $("#canvas").get(0);
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    cargarLienzo();
}

function dibujarpunto(x1,y1,x2)
{

    x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);

    if (x1>=0 && x1<=500 && y1>=0 && y1<=500 && x2>=0 && x2<=500)
    {
        x1 = sumar(x1);
        y1 = sumar(y1);
        x2 = sumar(x2);
        var canvas = $("#canvas").get(0);
        var i = 0;

        if (x1<x2)
        {
            while (x1+i<=x2)
            {
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                ctx.fillRect(x1+i,y1,1,1);
                i++;
            }
        }

        else
        {
            while (x1-i>=x2)
            {
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                ctx.fillRect(x1-i,y1,1,1);
                i++;
            }
        }
    }
    else
    {
        alert("Revise los valores ingresados, alguno no es válido.");
        $("#numx1").value = "";
        $("#numy1").value = "";
        $("#numx2").value = "";
    }
}

function dibujar_linea_vertical(x1,y1,y2)
{
    x1 = Number(x1);
    y1 = Number(y1);
    y2 = Number(y2);

    if (x1>=-0 && x1<=500 && y1>=0 && y1<=550 && y2>=0 && y2<=500)
    {
        x1 = sumar(x1);
        y1 = sumar(y1);
        y2 = sumar(y2);

        var i = 0;

        if (y1<y2)
        {
            while (y1+i<=y2)
            {
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                ctx.fillRect(x1,y1+i,1,1);
                i++;
            }
        }

        else
        {
            while (y1-i>=y2)
            {
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                ctx.fillRect(x1,y1-i,1,1);
                i++;
            }
        }
    }
    else
    {
        window.alert("Revise los valores ingresados, alguno no es válido.");
        document.getElementById("numx1").value = "";
        document.getElementById("numy1").value = "";
        document.getElementById("numy2").value = "";
    }
}

function dibujar_linea_diagonal(x1,y1,x2)
{

    x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);

    if (x1>=0 && x1<=500 && y1>=0 && y1<=500 && x2>=0 && x2<=500)
    {

        x1 = sumar(x1);
        y1 = sumar(y1);
        x2 = sumar(x2);
        var i = 0;

        if (x1<x2)
        {
            while (x1+i<=x2)
            {
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                ctx.fillRect(x1+i,y1+i,1,1);
                i++;
            }
        }
        else
        {
            while (x1-i>=x2)
            {
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                ctx.fillRect(x1-i,y1+i,1,1);
                i++;
            }
        }
    }
    else
    {
        window.alert("Revise los valores ingresados, alguno no es válido.");
        document.getElementById("numx1").value = "";
        document.getElementById("numy1").value = "";
        document.getElementById("numx2").value = "";
        document.getElementById("numy2").value = "";
    }
}

function metodo_directo(x1,y1,x2,y2)
{
    x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);
    y2 = Number(y2);

    if (x1>=0 && x1<=500 && y1>=0 && y1<=500 && x2>=0 && x2<=500 && y2>=0 && y2<=500)
    {
        var m = (y2-y1)/(x2-x1);
        var b = (y1) - m*(x1);

        var i = 0;

        if (x1<x2)
        {
            while (x1+i<=x2)
            {
                var y = m * (x1+i) + b;
                y = Math.round(y);
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                x = sumar(x1+i);
                y = sumar(y);
                ctx.fillRect(x,y,1,1);
                i=i+1;
            }
        }
        else
        {
            while (x1-i>=x2)
            {
                var y = m * (x1-i) + b;
                y = Math.round(y);
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "red";
                x = sumar(x1-i);
                y = sumar(y);
                ctx.fillRect(x,y,1,1);
                i++;
            }
        }
    }
    else
    {
        window.alert("Revise los valores ingresados, alguno no es válido.");
        document.getElementById("numx1").value = "";
        document.getElementById("numy1").value = "";
        document.getElementById("numx2").value = "";
        document.getElementById("numy2").value = "";
    }
}

function add_simple(x1,y1,x2,y2)
{
    x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);
    y2 = Number(y2);

    if (x1>=0 && x1<=500 && y1>=0 && y1<=500 && x2>=0 && x2<=580 && y2>=0 && y2<=500)
    {
        var dif_x = x2-x1;
        var dif_y = y2-y1;
        var m = dif_y / dif_x;

        var i = 0;

        if (Math.abs(m) < 1)
        {
        	if (x1<x2)
        	{;
        		while (x1+i<=x2)
                {
                    var x = x1 + i;
                    var y = y1 + m;
                    y1 = y;
                    y = Math.round(y);
                    var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";
                    x = sumar(x);
                    y = sumar(y);
                    ctx.fillRect(x,y,1,1);
                    i=i+1;
                }
        	}
        	else
        	{
        		while (x1-i>=x2)
                {
                    var x = x1 - i;
                    var y = y1 - m;
                    y1 = y;
                    y = Math.round(y);
                    var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";
                    x = sumar(x);
                    y = sumar(y);
                    ctx.fillRect(x,y,1,1);
                    i=i+1;
                }
        	}
        }
        else
        {
        	if (y1<y2)
        	{
        		while (y1+i<=y2)
                {
                    var x = x1 + 1/m;
                    var y = y1 + i;
                    x1 = x;
                    x = Math.round(x);
                    var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";
                    x = sumar(x);
                    y = sumar(y);
                    ctx.fillRect(x,y,1,1);
                    i=i+1;
                }
        	}
        	else
        	{
        		while (y1-i>=y2)
                {
                    var x = x1 - 1/m;
                    var y = y1 - i;
                    x1 = x;
                    x = Math.round(x);
                    var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";
                    x = sumar(x);
                    y = sumar(y);
                    ctx.fillRect(x,y,1,1);
                    i=i+1;
                }
        	}
        }
    }
    else
    {
        window.alert("Revise los valores ingresados, alguno no es válido.");
        document.getElementById("numx1").value = "";
        document.getElementById("numy1").value = "";
        document.getElementById("numx2").value = "";
        document.getElementById("numy2").value = "";
    }
}

function draw_circle(xc,yc,r){

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";


    //var r = Math.pow(Math.pow(x-xc,2)+Math.pow(y-yc,2),1/2);

    r = parseInt(r);

    xc = parseInt(xc);
    yc = parseInt(yc);

    for (var x = xc-r; x <= xc+r; x++) {
        y = yc + Math.pow(Math.pow(r,2)-Math.pow(x-xc,2),1/2);

        ctx.fillRect(x,y,1,1);
    };

    for (var x = xc-r; x <= xc+r; x++) {
        y = yc - Math.pow(Math.pow(r,2)-Math.pow(x-xc,2),1/2);

        ctx.fillRect(x,y,1,1);
    };
}

function draw_parameters_polar(xc,yc,r){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";

    r = parseInt(r);
    xc = Number(xc);
    yc = Number(yc);

    var r2 = Math.pow(Math.pow(r-xc,2)+Math.pow(r-yc,2),1/2);

    for (var i = 0; i <= 360; i++) {

        var alpha = i*Math.PI/180;

        var x = xc + r2*Math.cos(alpha);
        var y = yc + r2*Math.sin(alpha);


        ctx.fillRect(x,y,1,1);
    };

}

function draw_parameters_increment(xc,yc,r){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";

    r = Number(r);
    xc = Number(xc);
    yc = Number(yc);


    var r2 = Math.pow(Math.pow(r-xc,2)+Math.pow(r-yc,2),1/2);

    x = xc;
    y = yc;

    for (var i = 0; i <= 360; i++) {

        var alpha = i*Math.PI/180;


        var x = x + r2*Math.cos(alpha);
        var y = y + r2*Math.sin(alpha);


        ctx.fillRect(x,y,1,1);
    };

}

function draw_square(xmin,ymin,xmax,ymax){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";

    ctx.lineWidth = 1;

    ctx.beginPath();

    //Recta vertical izquierda
    ctx.moveTo(xmin,ymin);
    ctx.lineTo(xmin,ymax);
    ctx.stroke();

    //Recta horizontal izquierda
    ctx.moveTo(xmin,ymin);
    ctx.lineTo(xmax,ymin);
    ctx.stroke();

    //Recta vertical derecha
    ctx.moveTo(xmax,ymin);
    ctx.lineTo(xmax,ymax);
    ctx.stroke();
    ctx.closePath();

    //Recta horizontal derecha
    ctx.moveTo(xmin,ymax);
    ctx.lineTo(xmax,ymax);
    ctx.stroke();
    ctx.closePath();


}

function add_entero(x1,y1,x2,y2)
{

    x1 = Number(x1);
    y1 = Number(y1);
    x2 = Number(x2);
    y2 = Number(y2);



        var dif_x = x2-x1;
        var dif_y = y2-y1;
        var m = dif_y - dif_x;

        var error = 0;

        var i = 0;

        //window.alert("x1 es menor que x2, y1 es menor que y2");
		while (x1+i<=x2)
        {
            if (m>=0 && m<1)
            {
            	//window.alert("caso 1");
            	if (error<0)
            	{
            		var x = x1+1;
            		var y = y1;
            		error = error + dif_y;
            		var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";

                    x1 = x;
                    y1 = y;

                    ctx.fillRect(x,y,1,1);
            	}
            	else
            	{
            		var y = y1 + 1;
            		var x = x1 + 1;
            		error = error + (dif_y - dif_x);
            		var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";

                    x1 = x;
                    y1 = y;

                    ctx.fillRect(x,y,1,1);
            	}
            }
            else if (m>=1)
            {
            	//window.alert("caso 2");
            	if (error<0)
            	{
            		var y = y1+1;
            		var x = x1+1;
            		error = error + (dif_y - dif_x);
            		var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";

                    x1 = x;
                    y1 = y;

                    ctx.fillRect(x,y,1,1);
            	}
            	else
            	{
            		var y = y1 + 1;
            		var x = x1;
            		error = error - dif_x;
            		var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";

                    x1 = x;
                    y1 = y;

                    ctx.fillRect(x,y,1,1);
            	}
            }
            else if (m>-1 && m<0)
            {
            	//window.alert("caso 3");
            	if (error<0)
            	{
            		var x = x1-1;
            		var y = y1;
            		error = error + dif_y;
            		var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";

                    x1 = x;
                    y1 = y;

                    ctx.fillRect(x,y,1,1);
            	}
            	else
            	{
            		var y = y1 + 1;
            		var x = x1 - 1;
            		error = error + (dif_x + dif_y);
            		var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";

                    x1 = x;
                    y1 = y;

                    ctx.fillRect(x,y,1,1);
            	}
            }
            else //if (m<=-1 && dif_y>0 && dif_x<0)
            {
            	//window.alert("caso 4");
            	if (error<0)
            	{
            		var x = x1-1;
            		var y = y1+1;
            		error = error + (dif_x + dif_y);;
            		var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";

                    x1 = x;
                    y1 = y;

                    ctx.fillRect(x,y,1,1);
            	}
            	else
            	{
            		var y = y1 + 1;
            		var x = x1;
            		error = error + dif_x ;
            		var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.fillStyle = "red";

                    x1 = x;
                    y1 = y;

                    ctx.fillRect(x,y,1,1);
            	}
            }
            i++;
        }

}
