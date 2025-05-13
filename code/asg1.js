var gl;
var points;
var vertices;
	
window.onload = function init(){	
	var theta = document.getElementById("theta").value;
	var subdivide = parseFloat(document.getElementById("subdivide").value);
	var spiral = document.getElementsByName("spiral")[0].value;
	var shape = document.getElementById("menu").value;
	var trivert = [
				    vec2(-0.75, -0.433),
				    vec2(0.75, -0.433),
				    vec2(0, 0.866)
			    ];
	
	var squarevert = [
			             vec2(-0.5, -0.5),
					     vec2(-0.5, 0.5),
					     vec2( 0, 0),
					     vec2(-0.5, 0.5),
			             vec2(0.5, 0.5),
			             vec2( 0, 0),
			             vec2(0.5, 0.5),
					     vec2(0.5, -0.5),
			             vec2(0, 0),
			             vec2(0.5, -0.5),
			             vec2(-0.5, -0.5),
			             vec2(0, 0)
					 ];
	
	var m = document.getElementById("menu");
	m.onchange = function() {
		switch (m.value) {
			case "0":
				vertices = trivert;
				
				points = [];
				for (var i = 0; i <vertices.length; i+=3){
					var ax = vertices[i][0]*Math.cos(thetarad) - vertices[i][1]*Math.sin(thetarad);
					var ay = vertices[i][0]*Math.sin(thetarad) + vertices[i][1]*Math.cos(thetarad);
					var bx = vertices[i+1][0]*Math.cos(thetarad) - vertices[i+1][1]*Math.sin(thetarad);
					var by = vertices[i+1][0]*Math.sin(thetarad) + vertices[i+1][1]*Math.cos(thetarad);
					var cx = vertices[i+2][0]*Math.cos(thetarad) - vertices[i+2][1]*Math.sin(thetarad);
					var cy = vertices[i+2][0]*Math.sin(thetarad) + vertices[i+2][1]*Math.cos(thetarad);

					var a = vec2(ax, ay);
					var b = vec2(bx, by);
					var c = vec2(cx, cy);

					divideTriangle(a, b, c, subdivide);
				}
				
				break;
			case "1":
				vertices = squarevert;

				points = [];
				for (var i = 0; i <vertices.length; i+=3){
					var ax = vertices[i][0]*Math.cos(thetarad) - vertices[i][1]*Math.sin(thetarad);
					var ay = vertices[i][0]*Math.sin(thetarad) + vertices[i][1]*Math.cos(thetarad);
					var bx = vertices[i+1][0]*Math.cos(thetarad) - vertices[i+1][1]*Math.sin(thetarad);
					var by = vertices[i+1][0]*Math.sin(thetarad) + vertices[i+1][1]*Math.cos(thetarad);
					var cx = vertices[i+2][0]*Math.cos(thetarad) - vertices[i+2][1]*Math.sin(thetarad);
					var cy = vertices[i+2][0]*Math.sin(thetarad) + vertices[i+2][1]*Math.cos(thetarad);

					var a = vec2(ax, ay);
					var b = vec2(bx, by);
					var c = vec2(cx, cy);

					divideTriangle(a, b, c, subdivide);
				}
				
				break;
		}
		shape = m.value;
		// Load the data into the GPU

		var bufferId = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

		// Associate out shader variables with our data buffer

		var vPosition = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition );

		render();
	};
	
	document.getElementById("theta").onchange =
		function() { 
			theta = event.srcElement.value; 
			
			thetarad = theta/360.0*2.0*3.14159;
			points = [];
			for (var i = 0; i <vertices.length; i+=3){
				var ax = vertices[i][0]*Math.cos(thetarad) - vertices[i][1]*Math.sin(thetarad);
				var ay = vertices[i][0]*Math.sin(thetarad) + vertices[i][1]*Math.cos(thetarad);
				var bx = vertices[i+1][0]*Math.cos(thetarad) - vertices[i+1][1]*Math.sin(thetarad);
				var by = vertices[i+1][0]*Math.sin(thetarad) + vertices[i+1][1]*Math.cos(thetarad);
				var cx = vertices[i+2][0]*Math.cos(thetarad) - vertices[i+2][1]*Math.sin(thetarad);
				var cy = vertices[i+2][0]*Math.sin(thetarad) + vertices[i+2][1]*Math.cos(thetarad);

				var a = vec2(ax, ay);
				var b = vec2(bx, by);
				var c = vec2(cx, cy);

				divideTriangle(a, b, c, subdivide);
			}
						
			document.getElementById("ttext").innerHTML = event.srcElement.value;
			
			if (spiral == "true"){
				gl.uniform1f(thetaLoc, theta);
			}else{
				gl.uniform1f(thetaLoc, 0);
			}

			var bufferId = gl.createBuffer();
			gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
			gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
				

			var vPosition = gl.getAttribLocation( program, "vPosition" );
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( vPosition );
			
			render();
			
		};

	document.getElementById("subdivide").onchange =
		function() { 
			subdivide = parseFloat(event.srcElement.value);
			document.getElementById("subtext").innerHTML = subdivide;
			
			points = [];
			for (var i = 0; i <vertices.length; i+=3){
				var ax = vertices[i][0]*Math.cos(thetarad) - vertices[i][1]*Math.sin(thetarad);
				var ay = vertices[i][0]*Math.sin(thetarad) + vertices[i][1]*Math.cos(thetarad);
				var bx = vertices[i+1][0]*Math.cos(thetarad) - vertices[i+1][1]*Math.sin(thetarad);
				var by = vertices[i+1][0]*Math.sin(thetarad) + vertices[i+1][1]*Math.cos(thetarad);
				var cx = vertices[i+2][0]*Math.cos(thetarad) - vertices[i+2][1]*Math.sin(thetarad);
				var cy = vertices[i+2][0]*Math.sin(thetarad) + vertices[i+2][1]*Math.cos(thetarad);

				var a = vec2(ax, ay);
				var b = vec2(bx, by);
				var c = vec2(cx, cy);
				
				divideTriangle(a, b, c, subdivide);
			}
			
			// Load the data into the GPU

			var bufferId = gl.createBuffer();
			gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
			gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

			// Associate out shader variables with our data buffer

			var vPosition = gl.getAttribLocation( program, "vPosition" );
			gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
			gl.enableVertexAttribArray( vPosition );
			
			render();
			
		};
		
	document.getElementsByName("spiral")[0].onchange =
	document.getElementsByName("spiral")[1].onchange =
		function() { 
			spiral = event.srcElement.value; 

			if (spiral == "true"){
				gl.uniform1f(thetaLoc, theta);
			}else{
				gl.uniform1f(thetaLoc, 0);
			}
			
			render();
		};

	var canvas = document.getElementById( "gl-canvas" );

	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" );
	}
	
	if (shape == "1"){

		// Four Vertices

		vertices = squarevert;

		points = [];
		divideTriangle(vertices[0], vertices[1], vertices[2], subdivide);
		divideTriangle(vertices[3], vertices[4], vertices[5], subdivide);
		divideTriangle(vertices[6], vertices[7], vertices[8], subdivide);
		divideTriangle(vertices[9], vertices[10], vertices[11], subdivide);
		
	} else {
	
		// Three Vertices
	
		vertices = trivert;

		points = [];
		divideTriangle(vertices[0], vertices[1], vertices[2], subdivide);

	}

	// Configure WebGL

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

	// Load shaders and initialize attribute buffers

	program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	var thetaLoc = gl.getUniformLocation(program, "theta");
	
//	program.vPosition = gl.getAttribLocation(program, "vPosition");
	
	//gl.enableVertexAttribArray(program.vPosition);
	//gl.vertexAttribPointer(program.vPosition, 4, gl.FLOAT, false, 0, 0);
		
	// Load the data into the GPU

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
		

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	var tri_colors = [
	     0, 0, 1, 1,
	     0, 0, 1, 1,
	     0, 0, 1, 1,
	     1, 0, 0, 1,
	     1, 0, 0, 1,
	     1, 0, 0, 1,
	     0, 1, 1, 1,
	     0, 1, 1, 1,
	     0, 1, 1, 1,
	     1, .5, .75, 1,
	     1, .5, .75, 1,
	     1, .5, .75, 1,
	     1, 0, 1, 1,
	     1, 0, 1, 1,
	     1, 0, 1, 1,
	     1, 1, 0, 1,
	     1, 1, 0, 1,
	     1, 1, 0, 1,
	     0, 0, .5, 1,
	     0, 0, .5, 1,
	     0, 0, .5, 1,
	     0, .5, 0, 1,
	     0, .5, 0, 1,
	     0, .5, 0, 1,
	     .5, 0, 0, 1,
	     .5, 0, 0, 1,
	     .5, 0, 0, 1,
	     0, .5, 1, 1,
	     0, .5, 1, 1,
	     0, .5, 1, 1,
	     .5, 0, 1, 1,
	     .5, 0, 1, 1,
	     .5, 0, 1, 1,
	     .5, 1, 0, 1,
	     .5, 1, 0, 1,
	     .5, 1, 0, 1,
	     0, 1, .5, 1,
	     0, 1, .5, 1,
	     0, 1, .5, 1,
	     1, 0, .5, 1,
	     1, 0, .5, 1,
	     1, 0, .5, 1,
	     1, .5, 0, 1,
	     1, .5, 0, 1,
	     1, .5, 0, 1
	];
	
	var tri_colors = tri_colors.concat(tri_colors, tri_colors, tri_colors);
	var tri_colors = tri_colors.concat(tri_colors, tri_colors, tri_colors);
	var tri_colors = tri_colors.concat(tri_colors, tri_colors, tri_colors);
	var tri_colors = tri_colors.concat(tri_colors, tri_colors, tri_colors);
	var tri_colors = tri_colors.concat(tri_colors, tri_colors, tri_colors);
	var tri_colors = tri_colors.concat(tri_colors, tri_colors, tri_colors);

	var triangle_colors = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, triangle_colors );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(tri_colors), gl.STATIC_DRAW );
	
	// Associate out shader variables with our data buffer

	var color = gl.getAttribLocation( program, "color" );
	gl.vertexAttribPointer( color, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( color );

	render();

};

function render() {
	var theta = document.getElementById("theta").value;
	var subdivide = document.getElementById("subdivide").value;
	var spiral = document.getElementsByName("spiral").value;
	var shape = document.getElementById("menu").value;

	gl.clear( gl.COLOR_BUFFER_BIT );
	var angles = points.length;
	
	gl.drawArrays( gl.TRIANGLES, 0, angles );
}

/* display one triangle */

function triangle( a, b, c ){
	points.push( a, b, c );
}

function divideTriangle( a, b, c, count ){
	// check for end of recursion
	if ( count === 0 ) {
		triangle( a, b, c );
	}
	else {
		//bisect the sides

		var ab = mix( a, b, 0.5 );
		var ac = mix( a, c, 0.5 );
		var bc = mix( b, c, 0.5 );
		
		--count; 
		
		// three new triangles

		divideTriangle( a, ab, ac, count );
		divideTriangle( c, ac, bc, count );
		divideTriangle( b, bc, ab, count );
		divideTriangle( ab, ac, bc, count );
	}
}