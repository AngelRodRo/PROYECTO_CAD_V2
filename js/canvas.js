function clearScreen(c,ctx){
	ctx.clearRect(0,0,c.width,c.height);
}

function drawBoard(c,context){
    for (var x = 0; x <= c.width; x += 4) {
        context.moveTo(0.25 + x, 0);
        context.lineTo(0.25 + x , c.height);
    }


    for (var x = 0; x <= c.height; x += 4) {
        context.moveTo(0, 0.25 + x);
        context.lineTo(c.width, 0.25 + x);
    }

    context.strokeStyle = "#9A9A9A";
    context.stroke();
}

function drawPlane(c,context)
{
    context.moveTo(275,0);
    context.lineTo(275,500);

    context.strokeStyle = "#9A9A9A";
    context.stroke();

    context.moveTo(0,250);
    context.lineTo(550,250);

    context.strokeStyle = "#9A9A9A";
    context.stroke();
}


function convert(y)
{

    y = Number(y);
    var yprima = $("#canvas").get(0).height  - y;
    return yprima;
}
