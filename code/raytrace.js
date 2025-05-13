var lightPosition = vec3(3, 2, 0);
var lightAmbient = vec3( 1.0, 1.0, 1.0 );
var lightDiffuse = vec3( 1.0, 1.0, 1.0 );
var lightSpecular = vec3( 1.0, 1.0, 1.0 );

var maxDepth=3;

var camera = vec3(0, 0, 0);
var lookat = vec3(0, 0, -1);
var center = vec3(-.65, -.8, -2.6);		//bottom
var radius = .2;
var center1 = vec3(-.65, -.48, -2.6);		//middle
var radius2 = .25;
var radius1 = .22;
var center2 = vec3(-.65, -.2, -2.6);//-2.9	//top
var centerR = vec3(-1, -.28, -2);//-2
var radiusR = .15;
var centerG = vec3(0, -.28, -1);
var radiusG = .15;
var triverts = [
             vec3(0, .5, -5),
             vec3(1, -.5, -5),
             vec3(-1, -.5, -5),

        ];

var planeB=[];
var planeW=[];

var cvertices = [
                 
vec3(1.5, -.5, -2), //back
vec3(1.5, -1, -2),
vec3(1, -1, -2),
vec3(1, -1, -2),
vec3(1, -.5, -2),
vec3(1.5, -.5, -2),

vec3(1.5, -.5, -2), //left side
vec3(1.5, -1, -2),
vec3(1.5, -1, -2.5),
vec3(1.5, -.5, -2),
vec3(1.5, -1, -2.5),
vec3(1.5, -.5, -2.5),

vec3(1.5, -.5, -2), //top
vec3(1.5, -.5, -2.5),
vec3(1, -.5, -2.5),
vec3(1.5, -.5, -2),
vec3(1, -.5, -2.5),
vec3(1, -.5, -2),

vec3(1.5, -.5, -2.5), //front
vec3(1.5, -1, -2.5),
vec3(1, -1, -2.5),
vec3(1, -1, -2.5),
vec3(1, -.5, -2.5),
vec3(1.5, -.5, -2.5),

vec3(1, -.5, -2), //right side
vec3(1, -1, -2),
vec3(1, -1, -2.5),
vec3(1, -.5, -2),
vec3(1, -1, -2.5),
vec3(1, -.5, -2.5),    

vec3(1.5, -1, -2), //bottom
vec3(1.5, -1, -2.5),
vec3(1, -1, -2.5),
vec3(1.5, -1, -2),
vec3(1, -1, -2.5),
vec3(1, -1, -2),
];

var ax, ay;

//var zb=[];

window.onload = function init()
{
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");
	var canvasData = context.getImageData(0, 0, 512, 512);
	var data = canvasData.data;
		
	for (var i=0; i<5; i++){
		for (var j=0; j<5; j++){
			var bA=vec3(-2+.8*i, -1, 0-.8*j);
			var bB=vec3(-2+.8*i, -1, -.4-.8*j);
			var bC=vec3(-1.6+.8*i, -1, 0-.8*j);
			var bD=vec3(-1.6+.8*i, -1, -.4-.8*j);
			
			var wC=vec3(-1.2+.8*i, -1, 0-.8*j);
			var wD=vec3(-1.2+.8*i, -1, -.4-.8*j);
			
			var b = vec3(.4, 0, -.4);
			var w = vec3(-.4, 0, -.4);
			
			var bE = add(b, bA);
			var bF = add(b, bB);
			var bG = add(b, bC);
			var bH = add(b, bD);
			
			var wE = add(w, bC);
			var wF = add(w, bD);
			var wG = add(w, wC);
			var wH = add(w, wD);
						
			planeB.push(bH);
			planeB.push(bG);
			planeB.push(bF);
			planeB.push(bF);
			planeB.push(bG);
			planeB.push(bE);
			
			planeB.push(bD);
			planeB.push(bC);
			planeB.push(bB);
			planeB.push(bB);
			planeB.push(bC);
			planeB.push(bA);
			
			planeW.push(wD);
			planeW.push(wC);
			planeW.push(bD);
			planeW.push(bD);
			planeW.push(wC);
			planeW.push(bC);
			
			planeW.push(wH);
			planeW.push(wG);
			planeW.push(wF);
			planeW.push(wF);
			planeW.push(wG);
			planeW.push(wE);
		}
	}

	document.getElementById("lookatX").onchange =
		function() { 
		lookat[0] = document.getElementById("lookatX").value;
		render(data, canvasData, context);
	};
	
	document.getElementById("lookatY").onchange =
		function() { 
		lookat[1] = document.getElementById("lookatY").value;
		render(data, canvasData, context);
	};
	
	document.getElementById("lookatZ").onchange =
		function() { 
		lookat[2] = document.getElementById("lookatZ").value;
		render(data, canvasData, context);
	};
	
	document.getElementById("eyeX").onchange =
		function() { 
		camera[0] = document.getElementById("eyeX").value;
		render(data, canvasData, context);
	};
	
	document.getElementById("eyeY").onchange =
		function() { 
		camera[1] = document.getElementById("eyeY").value;
		render(data, canvasData, context);
	};
	
	document.getElementById("eyeZ").onchange =
		function() { 
		camera[2] = document.getElementById("eyeZ").value;
		render(data, canvasData, context);
	};

	
	render(data, canvasData, context);
};

function drawScene(l, cam, color, depth, zbuff){
	var col = vec3(255, 255, 255);
	
	var rAmbient = vec3(50, 50, 100);
	var rDiffuse = vec3(0, 0, 0);
	var rSpecular = vec3(255, 255, 255);
	var rShininess = 5;
	
	var middleAmbient = vec3(104, 104, 104);
	var middleDiffuse = vec3(154, 154, 154);
	var middleSpecular = vec3(127.5, 127.5, 127.5);
	var middleShininess = 32;
	
	var bottomAmbient = vec3(104, 255, 104);
	var bottomDiffuse = vec3(154, 104, 154);
	var bottomSpecular = vec3(1.0, 1.0, 1.0);
	var bottomShininess = 100;
	
	var materialAmbient = vec3(204, 105, 255);
	var materialDiffuse = vec3(154, 154, 154);
	var materialSpecular = vec3(1.0, 1.0, 1.0);
	var materialShininess = 100;
	
	var floorAmbient = vec3( 204, 153, 0.0 );
	var floorDiffuse = vec3( 204, 153, 0.0 );
	var floorSpecular = vec3( 1.0, 1.0, 1.0 );
	var floorShininess = 150.0;
	
	var cubeAmbient = scaleV(255, vec3(0.329412, 0.223529, 0.027451));  
    var cubeDiffuse = scaleV(255, vec3(0.780392, 0.568627, 0.113725));  
    var cubeSpecular = scaleV(255, vec3(0.992157, 0.941176, 0.807843));   
    var cubeShininess = 27.8974;
	
	for (var c=0; c<cvertices.length; c+=3){
		var x = drawTriangle(cvertices[c], cvertices[c+1], cvertices[c+2], cubeAmbient, cubeDiffuse, cubeSpecular, cubeShininess, 255, camera, l, color, depth, zbuff, 0);
		if (x[1]<zbuff){
			color=x[0];
			zbuff=x[1];
		}
	}
	for (var c=0; c<planeB.length; c+=3){
		var x = drawTriangle(planeB[c], planeB[c+1], planeB[c+2], vec3(55, 155, 255), floorDiffuse, floorSpecular, floorShininess, 255, camera, l, color, depth, zbuff, 1);
		if (x[1]<zbuff){
			color=x[0];
			zbuff=x[1];
		}
	}
	for (var c=0; c<planeW.length; c+=3){
		var x = drawTriangle(planeW[c], planeW[c+1], planeW[c+2], vec3(255, 255, 255), floorDiffuse, floorSpecular, floorShininess, 255, camera, l, color, depth, zbuff, 1);
		if (x[1]<zbuff){
			color=x[0];
			zbuff=x[1];
		}
	}
	//middle sphere
	var x=drawSphere(center1, radius1, middleAmbient, middleDiffuse, middleSpecular, middleShininess, 255, camera, l, color, depth, zbuff, 2);
	if (x[1]<zbuff){
		color=x[0];
		zbuff=x[1];
	}
	//bottom sphere
	var x=drawSphere(center, radius2, bottomAmbient, bottomDiffuse, bottomSpecular, bottomShininess, 255, camera, l, color, depth, zbuff, 3);
	if (x[1]<zbuff){
		color=x[0];
		zbuff=x[1];
	}
	//top sphere
	var x=drawSphere(center2, radius, materialAmbient, materialDiffuse, materialSpecular, materialShininess, 255, camera, l, color, depth, zbuff, 4);
	if (x[1]<zbuff){
		color=x[0];
		zbuff=x[1];
	}
	//reflective sphere
	var x=drawSphere(centerR, radiusR, rAmbient, rDiffuse, rSpecular, rShininess, 255, camera, l, color, depth, zbuff, 5);
	if (x[1]<zbuff){
		color=x[0];
		zbuff=x[1];
	}
	//glass sphere
	var x=glassSphere(centerG, radiusG, rAmbient, rDiffuse, rSpecular, rShininess, 255, camera, l, color, depth, zbuff, 6);
	if (x[1]<zbuff){
		color=x[0];
		zbuff=x[1];
	}
	//light
	if (depth<maxDepth){
		var x=drawSphere(centerG, .1, col, col, col, 150, 255, camera, l, color, depth, zbuff, 7);
		if (x[1]<zbuff){
			color=x[0];
			zbuff=x[1];
		}
	}
	return color;
}

function inShadow(p, id){
	var shadow;
	var l = normalize(subtract(p, lightPosition));
	if (id!==0){
		for (var c=0; c<cvertices.length; c+=3){
			shadow = (shadowTriangle(cvertices[c], cvertices[c+1], cvertices[c+2], p, l )|| shadow);
		}
	}
	if (id!==2&&id!==4){
		//middle sphere
		x=(!shadow);
		shadow = (shadowSphere(center1, radius1, p, l) || shadow);
	}
	if (id!==3&&id!==2){
		//bottom sphere
		shadow = (shadowSphere(center, radius2, p, l)||shadow);
	}
	if (id!==4){
		//top sphere
		shadow = (shadowSphere(center2, radius, p, l) || shadow);
	}
	if (id!==5){
		//reflective sphere
		shadow = (shadowSphere(centerR, radiusR, p, l) || shadow);
	}
	
	return (shadow&&id!==5);
}

//this is hopefully the correct method
function drawTriangle(vert1, vert2, vert3, amb, dif, spec, shiny, a, o, l, color, depth, zbuff, id){
	var inside=true;

	var e1 = normalize(subtract(vert1, vert2));				//edge
	var e2 = normalize(subtract(vert1, vert3));		//edge
	var n = scaleV(-1, normalize(cross(e1, e2)));					//normal
	var sub = subtract (vert1, o);
	var t = dot(n, sub)/(dot(n, l));
	var multT = scaleV(t, l);
	var p = add(o, multT);
	if (dot(n, l)===0){
		return [color, zbuff];
	}
		
	var line = normalize(subtract(vert1, vert2));
	var rightD = normalize(subtract(vert1, vert3));
	var pointD = subtract(vert1, p);
	var triCross = normalize(cross(line, rightD));
	var pCross = normalize(cross(line, pointD));
	if ( length(subtract(triCross, pCross))>.1 ){
		inside=false;
	}
		
	line = normalize(subtract(vert2, vert3));
	rightD = normalize(subtract(vert2, vert1));
	pointD = subtract(vert2, p);
	triCross = normalize(cross(line, rightD));
	pCross = normalize(cross(line, pointD));
	if ( length(subtract(triCross, pCross))>.1 ){
		inside=false;
	}
		
	line = normalize(subtract(vert3, vert1));
	rightD = normalize(subtract(vert3, vert2));
	var test = subtract(vert3, p);
	pointD = subtract(vert3, p);
	triCross = normalize(cross(line, rightD));
	pCross = normalize(cross(line, pointD));
	if ( length(subtract(triCross, pCross))>.1 ){
		inside=false;
	}
	if (inside && zbuff>length(subtract(o, p)) ){//&& zb[i][j]>length(subtract(o, p)) ){
		color=getColor(p, n, amb, dif, spec, shiny);
		if (inShadow(p, id)){
			color=scaleV(1/2, color);
		}
		if (depth>1){
			var r=reflect(n, l);
			var rColor = drawScene(r, p, vec3(0, 255, 255), depth-1, 5000);
			color = interpolateCols(color, rColor, shiny);//scaleV(1/shiny, rColor));
		}
		zbuff = length(subtract(o, p));
	}

	return [color, zbuff];
}

function drawSphere(c, rad, ambient, dif, spec, shiny, a, o, l, color, depth, zbuff, id){
	var parens = dot(l, subtract(o, c));	
	var discriminate = Math.pow(parens, 2)-Math.pow(length(subtract(o, c)), 2)+Math.pow(rad, 2);
	var d, d1;
	if (discriminate<0){
		//ray doesn't hit anything
	}else{
		d=-parens+Math.sqrt(discriminate);
		d1=-parens-Math.sqrt(discriminate);
		d=Math.min(d, d1);
		if (zbuff>d){
			var p = add(o, scaleV(d, l));	//maybe? how do i find the point?
			var N = normalize(subtract(p, c));
			
			color = getColor(p, N, ambient, dif, spec, shiny);
			if (inShadow(p, id)){
				color=scaleV(1/2, color);
			}
			//var color = ambient;
			if (depth>1&&id!==7){
				var r=reflect(N, l);
				var rColor = drawScene(r, p, vec3(255, 255, 255), depth-1, 5000);
				color = interpolateCols(color, rColor, shiny);//scaleV(1/shiny, rColor));
			}
			zbuff=d;
		}
	}

	return [color, zbuff];
};

function glassSphere(c, rad, ambient, dif, spec, shiny, a, o, l, color, depth, zbuff, id){
	var parens = dot(l, subtract(o, c));	
	var discriminate = Math.pow(parens, 2)-Math.pow(length(subtract(o, c)), 2)+Math.pow(rad, 2);
	if (discriminate<0){
		//ray doesn't hit anything
	}else{
		var d, d1, x;
		d=-parens+Math.sqrt(discriminate);
		d1=-parens-Math.sqrt(discriminate);
		x=Math.max(d, d1);
		d=Math.min(d, d1);
		if (zbuff>d){
			var p = add(o, scaleV(d, l));	//maybe? how do i find the point?
			var N = normalize(subtract(c, p));
			
			color = getColor(p, N, ambient, dif, spec, 1);
			if (inShadow(p, id)){
				color=scaleV(1/2, color);
			}
			if (depth>1){
				var r=transmit(N, l);
				var rColor = drawScene(r, p, vec3(0, 255, 255), depth-1, 5000);
				color = interpolateCols(color, rColor, 1);//scaleV(1/shiny, rColor));
			}else{
				var rColor = vec3(0, 255, 255);
				color = interpolateCols(color, rColor, 1);
			}
			zbuff=d;
		}
	}

	return [color, zbuff];
};

function shadowTriangle(vert1, vert2, vert3, o, l){
	var inside=true;

	var e1 = normalize(subtract(vert1, vert2));				//edge
	var e2 = normalize(subtract(vert1, vert3));		//edge
	var n = scaleV(-1, normalize(cross(e1, e2)));					//normal
	var sub = subtract (vert1, o);
	var t = dot(n, sub)/(dot(n, l));
	var multT = scaleV(t, l);
	var p = add(o, multT);
	if (dot(n, l)===0){
		return false;
	}
		
	var line = normalize(subtract(vert1, vert2));
	var rightD = normalize(subtract(vert1, vert3));
	var pointD = subtract(vert1, p);
	var triCross = normalize(cross(line, rightD));
	var pCross = normalize(cross(line, pointD));
	if ( length(subtract(triCross, pCross))>.001 ){
		inside=false;
	}
		
	line = normalize(subtract(vert2, vert3));
	rightD = normalize(subtract(vert2, vert1));
	pointD = subtract(vert2, p);
	triCross = normalize(cross(line, rightD));
	pCross = normalize(cross(line, pointD));
	if ( length(subtract(triCross, pCross))>.001 ){
		inside=false;
	}
		
	line = normalize(subtract(vert3, vert1));
	rightD = normalize(subtract(vert3, vert2));
	var test = subtract(vert3, p);
	pointD = subtract(vert3, p);
	triCross = normalize(cross(line, rightD));
	pCross = normalize(cross(line, pointD));
	if ( length(subtract(triCross, pCross))>.001 ){
		inside=false;
	}

	return inside;
}

function shadowSphere(c, rad, o, l){
	var parens = dot(l, subtract(o, c));	
	var discriminate = Math.pow(parens, 2)-Math.pow(length(subtract(o, c)), 2)+Math.pow(rad, 2);
	var d, d1;
	if (discriminate<0){
		//ray doesn't hit anything
		return false;
	}else{
		d=-parens+Math.sqrt(discriminate);
		d1=-parens-Math.sqrt(discriminate);
		d=Math.min(d, d1);
		return true;
	}
};

function getColor(p, n, amb, diff, spec, shiny){
	var L = normalize(subtract(lightPosition, p));
	var E = normalize(scaleV(-1, p));
	
	var H = normalize(add(L, E));
	
	var ambient = mult(amb, lightAmbient);
	
	var Kd = Math.max(dot(L, n), 0.0);
	var diffuse = scaleV(Kd, mult(diff, lightDiffuse));
	
	var Ks = Math.pow( Math.max(dot(n, H), 0.0), shiny);
	var specular = scaleV(Ks, mult(spec, lightSpecular));
    
    if( dot(L, n) < 0.0 ) specular = vec3(0.0, 0.0, 0.0);

	var color = add(add(ambient, diffuse), specular);
	
	return color;
}

function interpolateCols(oCol, rCol, shininess){
	var color = scaleV(10/shininess, rCol);
	return scaleV(1/(1+10/shininess), add(oCol, color));
}

function scaleV( s, u )
{
    if ( !Array.isArray(u) ) {
        throw "scale: second parameter " + u + " is not a vector";
    }

    result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( s * u[i] );
    }
    
    return result;
}

function reflect(n, v){
	var d = -dot(n, v);
	var s = normalize(scaleV(2*d, n));
	return normalize(add(v, s));

}

function transmit(n, v){
	var d = dot(v, n);
	var s = scaleV(2*d, n);
	var r = normalize(add(v, s));
	return r;
}

function setVars(){
	var cDir=subtract(lookat, camera);
	var zAxis = vec3(0, 0, -1);
	if (cDir[0]===0){
		ax = 0;
	} else {
		ax = 180/Math.PI*Math.acos(dot(zAxis, normalize(vec3(cDir[0], 0, cDir[2]))));
	}
	if (cDir[1]===0){
		ay = 0;
	}else{
		ay = 180/Math.PI*Math.acos(dot(zAxis, normalize(vec3(0, cDir[1], cDir[2]))));
	}
}

function getL(l){
	var rx = rotate(ax, [0, 1, 0]);
	var ry = rotate(ay, [1, 0, 0]);
	var r = mult(rx, ry);
	var m = applyMatrix(r, l);
	return normalize(m);
}

function applyMatrix(m, v){
	var result = [];
	for (var i = 0; i<m.length; i++){
		var r = 0;
		if (m[0].length != (v.length+1)){
	        throw "applyMatrix(): dimensions do not match";
		}
		for (var j = 0; j<v.length; j++){
			r+=m[i][j]*v[j];
		}
		result.push(r);
	}
	return vec3(result[0], result[1], result[2]);
}

function render(data, canvasData, context){
	setVars();
	for (var i=0; i<512; i++){
		var hit=false;
		for (var j=0; j<512; j++){
			zbuff=500000;
 			var y=-(i-256)/256;
			var x=(j-256)/256;
			var pPlane = normalize(vec3(x, y, -1));
			var l = normalize(vec3( x, y, -1));
			l = getL(l);
			
			var col = vec3(0, 0, 100);
			var materialAmbient = vec3(254, 104, 104);
			var materialDiffuse = vec3(254, 154, 154);
			var materialSpecular = vec3(0.0, 0.0, 0.0);
			var materialShininess = 100;
			var color = drawScene(l, camera, vec3(0, 255, 255), maxDepth, zbuff );
			data[(512*i+j)*4]=color[0];
			data[(512*i+j)*4+1]=color[1];
			data[(512*i+j)*4+2]=color[2];
			data[(512*i+j)*4+3]=255;
		}
	}
	canvasData.data = data;
	context.putImageData(canvasData, 0, 0);
};