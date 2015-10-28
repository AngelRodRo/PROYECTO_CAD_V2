function Line(point_start,point_end,ctx){
	this.point_start = point_start;
	this.point_end = point_end;
	this.ctx = ctx;

}

Line.prototype.draw = function() {
	this.ctx.beginPath();
	this.ctx.moveTo(this.point_start.x,this.point_start.y);
	this.ctx.lineTo(this.point_end.x,this.point_end.y);
	this.ctx.strokeStyle = "#f00";
	this.ctx.stroke();
	this.ctx.closePath();
};
