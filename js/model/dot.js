function Dot () {
}

Dot.draw = function(x,y,ctx) {
	ctx.beginPath();
	ctx.arc(x,y,2,0,2*Math.PI);
	ctx.strokeStyle = "#f00";
	ctx.stroke();
	ctx.closePath();
};
