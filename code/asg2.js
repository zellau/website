
var canvas;
var gl;

var speed;

var numVertices  = 36;

var axis = 0;
var xAxis = 0;
var yAxis = 0;
var zAxis = 0;
var theta = 0;
var MVMLoc;
var interp;

    var vertices = [
        vec3(-.05, .05, -.05), //back
        vec3(-.05, -.05, -.05),
        vec3(.05, -.05, -.05),
        vec3(.05, -.05, -.05),
        vec3(.05, .05, -.05),
        vec3(-.05, .05, -.05),
        
        vec3(-.05, .05, -.05), //left side
        vec3(-.05, -.05, -.05),
        vec3(-.05, -.05, .05),
        vec3(-.05, .05, -.05),
        vec3(-.05, -.05, .05),
        vec3(-.05, .05, .05),
        
        vec3(-.05, .05, -.05), //top
        vec3(-.05, .05, .05),
        vec3(.05, .05, .05),
        vec3(-.05, .05, -.05),
        vec3(.05, .05, .05),
        vec3(.05, .05, -.05),
        
        vec3(-.05, .05, .05), //front
        vec3(-.05, -.05, .05),
        vec3(.05, -.05, .05),
        vec3(.05, -.05, .05),
        vec3(.05, .05, .05),
        vec3(-.05, .05, .05),
        
        vec3(.05, .05, -.05), //right side
        vec3(.05, -.05, -.05),
        vec3(.05, -.05, .05),
        vec3(.05, .05, -.05),
        vec3(.05, -.05, .05),
        vec3(.05, .05, .05),    
        
        vec3(-.05, -.05, -.05), //bottom
        vec3(-.05, -.05, .05),
        vec3(.05, -.05, .05),
        vec3(-.05, -.05, -.05),
        vec3(.05, -.05, .05),
        vec3(.05, -.05, -.05),
    ];

    var vertexColors = [
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green

        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green

        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue

   ];
        
   var vertexInterp=[
                        
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black

        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue

        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 0.0, 1.0, 1.0, 1.0 ),   // cyan
        
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
        vec4( 1.0, 1.0, 0.0, 1.0 )  // yellow

    ];

var translation = [
    vec3(0, 10, 0),
    vec3(0, 10, 0),
    vec3(0, 10, 0),
    vec3(0, 10, 0),
    vec3(0, 10, 0),
    vec3(0, 10, 0),
    vec3(0, 10, 0),
    vec3(0, 10, 0),
];

window.onload = function init()
{
	speed = parseFloat(document.getElementById("speed").value)+1.0;
	var anim = true;

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);;

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // color array atrribute buffer
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexInterp), gl.STATIC_DRAW );

    var vCol = gl.getAttribLocation( program, "vCol" );
    gl.vertexAttribPointer( vCol, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vCol );

    // vertex array attribute buffer
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    //translation attribute buffer

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(translation), gl.STATIC_DRAW );
    
    
//    var vtrans = gl.getAttribLocation( program, "vtrans" );
  //  gl.vertexAttribPointer( vtrans, 3, gl.FLOAT, false, 0, 0 );
    //gl.enableVertexAttribArray( vtrans );

    MVMLoc = gl.getUniformLocation(program, "modelView"); 
    interp = gl.getUniformLocation(program, "interp");
    
    window.addEventListener("keypress", keyPressed, false);
    
    function keyPressed(e) {
    		if (e.charCode == 102){ //f
    			if (anim){
	    			speed += 1;
	    			if (speed>(document.getElementById("speed").max+1)){
	    				speed=7.0;
	    			}
	    			document.getElementById("speed").value = speed-1;
    			}
    		}
    		if (e.charCode == 115){ //s
    			if (anim){
	    			speed -= 1;
	    			if (speed<(document.getElementById("speed").min+1)){
	    				speed = 1;
	    			}
	    			document.getElementById("speed").value = speed-1;
    			}
    		}
    		if (e.charCode == 120){ //x
    			if (speed==0){
    				xAxis += 5;
    			}
    		}
    		if (e.charCode == 121){ //y
    			if (speed==0){
    				yAxis += 5;
    			}
    		}
    		if (e.charCode == 122){ //y
    			if (speed==0){
    				zAxis += 5;
    			}
    		}
    }
    
	document.getElementById("speed").onchange =
		function() { 
			if (anim){
				speed = parseFloat(event.srcElement.value)+1.0;			
				
				// Load the data into the GPU
	
				var bufferId = gl.createBuffer();
				gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
				gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
	
				// Associate out shader variables with our data buffer
	
				var vPosition = gl.getAttribLocation( program, "vPosition" );
				gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
				gl.enableVertexAttribArray( vPosition );
			}
		};
		
	document.getElementById("anim").onclick =
		function() { 
			anim = !anim; 

			if (anim == true){
				speed = parseFloat(document.getElementById("speed").value)+1.0;
			}else{
				speed = 0;
			}
			
		};

    
    render();
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta += speed;

    var angles = radians( theta );
    var c = Math.cos( angles );
    var s = Math.sin( angles );

    //find variables for x, y, z
    var xangles = radians( xAxis );
    var xc = Math.cos( xangles );
    var xs = Math.sin( xangles );
    
    var yangles = radians( yAxis );
    var yc = Math.cos( yangles );
    var ys = Math.sin( yangles );
    
    var zangles = radians( zAxis );
    var zc = Math.cos( zangles );
    var zs = Math.sin( zangles );
    
    var x = mat4( -xs, 0.0, xc, 0.0,
		    0.0, 1.0,  0.0, 0.0,
		    xc, 0.0,  xs, 0.0,
		    0.0, 0.0,  0.0, 1.0 );

    var y = mat4( yc, -ys, 0.0, 0.0,
		    ys,  yc, 0.0, 0.0,
		    0.0,  0.0, 1.0, 0.0,
		    0.0,  0.0, 0.0, 1.0 );
    
    var z = mat4( 1.0,  0.0,  0.0, 0.0,
		    0.0,  zc,  zs, 0.0,
		    0.0, -zs,  zc, 0.0,
		    0.0,  0.0,  0.0, 1.0 );
        
    // Remeber: thse matrices are column-major
    var rx = mat4( 1.0,  0.0,  0.0, 0.0,
		    0.0,  -s,  c, 0.0,
		    0.0, c,  s, 0.0,
		    0.0,  0.0,  0.0, 1.0 );

    var ry = mat4( -s, 0.0, c, 0.0,
		    0.0, 1.0,  0.0, 0.0,
		    c, 0.0,  s, 0.0,
		    0.0, 0.0,  0.0, 1.0 );
    
    var rz = mat4( c, -s, 0.0, 0.0,
		    s,  c, 0.0, 0.0,
		    0.0,  0.0, 1.0, 0.0,
		    0.0,  0.0, 0.0, 1.0 );
    
    var rzNeg = mat4( s, c, 0.0, 0.0,
		    c,  -s, 0.0, 0.0,
		    0.0,  0.0, 1.0, 0.0,
		    0.0,  0.0, 0.0, 1.0 );
    
    for (var j=0; j<3; j++){
    	var transwheel;//figure out measures for 1&2
    	if (j==0){
    		transwheel = mat4( 1.0, 0.0, 0.0, 0.0,
    				0.0,  1.0, 0.0, 0.462,
    				0.0,  0.0, 1.0, 0.0,
    				0.0,  0.0, 0.0, 1.0 );
    	}
    	if (j==1){
    		transwheel = mat4( 1.0, 0.0, 0.0, 0.4,
    				0.0,  1.0, 0.0, -0.231,
    				0.0,  0.0, 1.0, 0.0,
    				0.0,  0.0, 0.0, 1.0 );
    	}
    	if (j==2){
    		transwheel = mat4( 1.0, 0.0, 0.0, -0.4,
    				0.0,  1.0, 0.0, -0.231,
    				0.0,  0.0, 1.0, 0.0,
    				0.0,  0.0, 0.0, 1.0 );
    	}
	    
	    for (var i=0; i<4; i++){
	    	var trans;
	    	var solid;
	    
	    	if (i==0){
	    		solid = 1;
	    		trans = mat4( 1.0, 0.0, 0.0, 0.0,
	    				0.0,  1.0, 0.0, 0.15,
	    				0.0,  0.0, 1.0, 0.0,
	    				0.0,  0.0, 0.0, 1.0 );
	    	}
	    	if (i==1){
	    		solid = 1;
	    		trans = mat4( 1.0, 0.0, 0.0, 0.0,
	    				0.0,  1.0, 0.0, -0.15,
	    				0.0,  0.0, 1.0, 0.0,
	    				0.0,  0.0, 0.0, 1.0 );
	    	}
	    	if (i==2){
	    		solid = 0;
	    		trans = mat4( 1.0, 0.0, 0.0, 0.15,
	    				0.0,  1.0, 0.0, 0.0,
	    				0.0,  0.0, 1.0, 0.0,
	    				0.0,  0.0, 0.0, 1.0 );
	    	}
	    	if (i==3){
	    		solid = 0;
	    		trans = mat4( 1.0, 0.0, 0.0, -0.15,
	    				0.0,  1.0, 0.0, 0.0,
	    				0.0,  0.0, 1.0, 0.0,
	    				0.0,  0.0, 0.0, 1.0 );
	    	}
	    	
	    	var modelView = mult(y, mult(x, z)); //rotate by x, y, z
	    	modelView = mult(rx, modelView); //rotate individual cubes
	    	modelView = mult(rzNeg, modelView); //undo pinwheel tilt
	    	modelView = mult(trans, modelView); //translate individual cubes
	    	modelView = mult(rz, modelView); //rotate pinwheels
	    	modelView = mult(rzNeg, modelView); //undo rotation from entire pinwheel
	    	modelView = mult(transwheel, modelView); //translate pinwheels
	    	modelView = mult(rzNeg, modelView); //rotate entire thing
	    
	    	gl.uniformMatrix4fv(MVMLoc, 0, flatten(modelView));
	    	gl.uniform1i(interp, solid);
	    
	    	gl.drawArrays( gl.TRIANGLES, 0, vertices.length );
	    	
	    }
    }

    requestAnimFrame( render );
}
