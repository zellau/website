var canvas;
var gl;

var texSize = 512;

var image1 = new Array()
	for (var i =0; i<texSize; i++)  image1[i] = new Array();
	for (var i =0; i<texSize; i++) 
		for ( var j = 0; j < texSize; j++) 
			image1[i][j] = new Float32Array(4);
	for (var i =0; i<texSize; i++) for (var j=0; j<texSize; j++) {
		var c = (((i & 0x8) == 0) ^ ((j & 0x8)  == 0));
		image1[i][j] = [c, c, c, 1];
	}

//Convert floats to ubytes for texture

var image2 = new Uint8Array(4*texSize*texSize);

for ( var i = 0; i < texSize; i++ ) 
    for ( var j = 0; j < texSize; j++ ) 
       for(var k =0; k<4; k++) 
            image2[4*texSize*i+4*j+k] = 255*image1[i][j][k];

var speed;
var rotation=[];
var distance=[];
var movement=[];
var texCoordsArray = [];
var lookat;
var eye;
var light;
var shade;
var txtre;
var sinwave;
var sine=0;
var bsine=0;

var lightDirection;
var lightAngle;
var fallOff;

var lightPosition;
var lightAmbient = vec4( 1.0, 1.0, 1.0, 1.0);
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 30.0;

var ambientColor, diffuseColor, specularColor;

var torsoId = 0;
var headId = 1;
var snoutId = 2;
var noseId = 3;
var leftEyeId = 4;
var rightEyeId = 5;
var leftEarId = 6;
var rightEarId = 7;
var leftArmId = 8;
var rightArmId = 9;
var leftLegId = 10;
var leftCalfId = 11;
var rightLegId = 12;
var rightCalfId = 13;
var tailId = 14;

var llPause;
var lcPause;
var rlPause;
var rcPause;
var leftArmAngle;
var rightArmAngle;
var leftLegAngle;
var rightLegAngle;
var leftCalfAngle;
var rightCalfAngle;
var leftLegSign;
var rightLegSign;
var leftCalfSign;
var rightCalfSign;
var armSign;
var legChange;
var calfChange;
var armChange;
var armMin;
var armMax;
var legMin;
var legMax;
var calfMin;
var calfMax;

var transz = translate(1, 1, -10);

var stack = [];
var figure = [];
var modelView = mat4();

var MVMLoc;
var projection;
var color;

var vcolor;
var points;
var plane=[
    vec4(100, -3.3, 100, 1),
    vec4(-100, -3.3, 100, 1),
    vec4(100, -3.3, -100, 1),
    vec4(-100, -3.3, 100, 1),
    vec4(100, -3.3, -100, 1),
    vec4(-100, -3.3, -100, 1)
];
var pNormals=[];

var texCoord = [
                vec2(0, 0),
                vec2(0, 1),
                vec2(1, 1),
                vec2(1, 0)
            ];

var verts=[
	vec4(0.0, 0.0, -1.0,1),
	vec4(0.0, 0.942809, 0.333333, 1),
	vec4(-0.816497, -0.471405, 0.333333, 1),
	vec4(0.816497, -0.471405, 0.333333,1)
];

var tverts1=[];
var tverts2=[];
var tverts3=[];
var tNormals1=[];
var tNormals2=[];
var tNormals3=[];
var vertices=[];
var normalsArray = [];

var program;

window.onload = function init()
{	
	texCoordsArray = texCoord.concat(texCoord, texCoord, texCoord);
	texCoordsArray = texCoordsArray.concat(texCoordsArray, texCoordsArray, texCoordsArray);
	texCoordsArray = texCoordsArray.concat(texCoordsArray, texCoordsArray, texCoordsArray);
	texCoordsArray = texCoordsArray.concat(texCoordsArray, texCoordsArray, texCoordsArray);
	texCoordsArray = texCoordsArray.concat(texCoordsArray, texCoordsArray, texCoordsArray);
	texCoordsArray = texCoordsArray.concat(texCoordsArray, texCoordsArray, texCoordsArray);
	texCoordsArray = texCoordsArray.concat(texCoordsArray, texCoordsArray, texCoordsArray);
	var t1 = subtract(plane[0], plane[1]);
	var t2 = subtract(plane[0], plane[2]);
	var normala = normalize(cross(t1, t2));
	normala = vec4(normala);
	var t1 = subtract(plane[3], plane[4]);
	var t2 = subtract(plane[3], plane[5]);
	var normalb = normalize(cross(t2, t1));
	normalb = vec4(normalb);

	pNormals = [
	       normala,         
	       normala,         
	       normala,                 
	       normalb,         
	       normalb,         
	       normalb
    ];
	
	tverts1=[	//peacock
		 	vec4(0.0, -3.3, -7.0, 1),
	 	   	vec4(0.0, -2.3, -6.0, 1),
	 	   	vec4(-0.707, -3.3, -5.293, 1)
	];
	tverts2=[	//snake
		 	vec4(0.0, -3.3, -7.0, 1),
	 	   	vec4(0.0, -2.3, -6.0, 1),
	 	   	vec4(0.707, -3.3, -5.293, 1)
	]
	tverts3=[	//me
	 	   	vec4(-0.707, -3.3, -5.293, 1),
		   vec4(0.0, -2.3, -6.0, 1),
	 	   	vec4(0.707, -3.3, -5.293, 1)
	];
	var t1 = subtract(tverts1[0], tverts1[1]);
	var t2 = subtract(tverts1[0], tverts1[2]);
	var normala = normalize(cross(t1, t2));
	normala = vec4(normala);
	var t1 = subtract(tverts2[0], tverts2[1]);
	var t2 = subtract(tverts2[0], tverts2[2]);
	var normalb = normalize(cross(t1, t2));
	normalb = vec4(normalb);
	var t1 = subtract(tverts3[0], tverts3[1]);
	var t2 = subtract(tverts3[0], tverts3[2]);
	var normald = normalize(cross(t1, t2));
	normald = vec4(normald);

	tNormals1 = [
	       normala,         
	       normala,         
	       normala,         
	       normala
	];
	tNormals2=[
	       normalb,         
	       normalb,         
	       normalb,         
	       normalb
	];
	tNormals3=[
	       normald,         
	       normald,         
	       normald,         
	       normald
    ];
	
	speed = document.getElementById("speed").value;
	lookat = vec3(document.getElementById("lookatX").value, document.getElementById("lookatY").value, document.getElementById("lookatZ").value);
	eye = vec3(document.getElementById("eyeX").value, document.getElementById("eyeY").value, document.getElementById("eyeZ").value);
	rotation.push(parseFloat(document.getElementById("rotate").value)+90);
	distance.push(0);
	if (document.getElementsByName("texture")[1].checked){
		shade = 0.0;
	}
	else{
		shade = 1.0;
	}
	if (document.getElementsByName("texture")[0].checked){
		txtre = 0.0;
	}
	else{
		txtre = 1.0;
	}
	
	lightPosition = [parseFloat(document.getElementById("lPosX").value), parseFloat(document.getElementById("lPosY").value), parseFloat(document.getElementById("lPosZ").value), 1.0];
	lightDirection = [parseFloat(document.getElementById("lDirX").value), parseFloat(document.getElementById("lDirY").value), parseFloat(document.getElementById("lDirZ").value), 1.0];
	lightAngle=document.getElementById("angle").value;
	fallOff=document.getElementById("falloff").value;
	
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    gl.uniform1f( gl.getUniformLocation(program, 
    "shading"), shade );
    gl.uniform1f( gl.getUniformLocation(program, 
    "vtexture"), txtre );
	
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
    
    //create buffers

	tetrahedron(verts[0], verts[1], verts[2], verts[3], 5);
	//define variables
	
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord");
    gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoord);
	    
//    var image = new Image();
//    image.onload = function() { 
//        configureTexture( image );
//    };
//    image.src = "SA2011_black.gif";
    
    MVMLoc = gl.getUniformLocation(program, "modelView"); 
    projection = gl.getUniformLocation(program, "vprojection"); 
	
	var fov=80;
	var aspect=canvas.width/canvas.height;
	var near = .1;
	var far = 100;
	persp = perspective(fov, aspect, near, far);
	gl.uniformMatrix4fv(projection, 0, flatten(persp));
	
	for (var i = 0; i<15; ++i){
		figure[i] = createNode(null, null, null, null);
	}
	for (var i = 0; i<15; ++i){
		initNodes(i);
	}
	
	document.getElementById("speed").onchange =
		function() { 
		speed = document.getElementById("speed").value;
	};
	
	document.getElementById("lookatX").onchange =
		function() { 
		lookat[0] = document.getElementById("lookatX").value;
	};
	
	document.getElementById("lookatY").onchange =
		function() { 
		lookat[1] = document.getElementById("lookatY").value;
	};
	
	document.getElementById("lookatZ").onchange =
		function() { 
		if (eye[2]!=document.getElementById("lookatZ").value){
			lookat[2] = document.getElementById("lookatZ").value;
		}
	};
	
	document.getElementById("eyeX").onchange =
		function() { 
		eye[0] = document.getElementById("eyeX").value;
//		if (document.getElementsByName("light")[0].checked){
//			lightPosition[0] = parseFloat(eye[0])+10;
//		}
	};
	
	document.getElementById("eyeY").onchange =
		function() { 
		eye[1] = document.getElementById("eyeY").value;
//		if (document.getElementsByName("light")[0].checked){
//			lightPosition[1] = parseFloat(eye[1])+20;
//		}
	};
	
	document.getElementById("eyeZ").onchange =
		function() { 
		if (lookat[2]!=document.getElementById("eyeZ").value){//lookat and eye Zs being equal breaks the program
			eye[2] = document.getElementById("eyeZ").value;
		}
//		if (document.getElementsByName("light")[0].checked){
//			lightPosition[2] = parseFloat(eye[2])+30;
//		}
	};
	
	document.getElementById("lPosX").onchange =
		function() { 
		lightPosition[0] = document.getElementById("lPosX").value;
	};
	
	document.getElementById("lPosY").onchange =
		function() { 
		lightPosition[1] = document.getElementById("lPosY").value;
	};
	
	document.getElementById("lPosZ").onchange =
		function() { 
		lightPosition[2] = document.getElementById("lPosZ").value;
	};
	
	document.getElementById("lDirX").onchange =
		function() { 
		lightDirection[0] = document.getElementById("lDirX").value;
	    gl.uniform4fv( gl.getUniformLocation(program, 
	    "lightDirection"),flatten(lightDirection) );
	};
	
	document.getElementById("lDirY").onchange =
		function() { 
		lightDirection[1] = document.getElementById("lDirY").value;
	    gl.uniform4fv( gl.getUniformLocation(program, 
	    "lightDirection"),flatten(lightDirection) );
	};
	
	document.getElementById("lDirZ").onchange =
		function() { 
		lightDirection[2] = document.getElementById("lDirZ").value;
	    gl.uniform4fv( gl.getUniformLocation(program, 
	    "lightDirection"),flatten(lightDirection) );
	};
	
	document.getElementById("angle").onchange =
		function() { 
		lightAngle = parseFloat(document.getElementById("angle").value);
		
	    gl.uniform1f( gl.getUniformLocation(program, 
	    "angle"), lightAngle );
	};
	
	document.getElementById("falloff").onchange =
		function() { 
		fallOff = parseFloat(document.getElementById("falloff").value);
		
	    gl.uniform1f( gl.getUniformLocation(program, 
	    "falloff"), fallOff );
	};
	
	document.getElementById("rotate").onchange =
		function() { 
		var rot = parseFloat(document.getElementById("rotate").value);
		rotation.push(rot+90);
		distance.push(0);
		
	};
//	document.getElementById("fix").onchange =
//		document.getElementById("cam").onchange =
//		function(){
//			if (document.getElementsByName("light")[0].checked){
//				lightPosition = [parseFloat(eye[0])+10, parseFloat(eye[1])-(-20), parseFloat(eye[2])+30, 1.0];
//			}
//			else{
//				lightPosition = standardLight;
//			}
//	};
	
	document.getElementById("shade").onchange =
		document.getElementById("texture").onchange =
		document.getElementById("both").onchange =
		function(){
			if (document.getElementsByName("texture")[1].checked){
				shade = 0.0;
			}
			else{
				shade = 1.0;
			}
			if (document.getElementsByName("texture")[0].checked){
				txtre = 0.0;
			}
			else{
				txtre = 1.0;
			}
			gl.uniform1f( gl.getUniformLocation(program, 
		    "shading"), shade );
			gl.uniform1f( gl.getUniformLocation(program, 
		    "vtexture"), txtre );
		};
	
    window.addEventListener("keypress", keyPressed, false);
    
    function keyPressed(e) {
    		if (e.charCode == 114){ //r
    			distance=[0];
    			rotation=[parseFloat(document.getElementById("rotate").value)+90];
    		}
    };

    gl.uniform1f( gl.getUniformLocation(program, 
    "angle"), lightAngle );
    gl.uniform1f( gl.getUniformLocation(program, 
    "falloff"), fallOff );
    gl.uniform4fv( gl.getUniformLocation(program, 
    "lightDirection"),flatten(lightDirection) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
       "specularProduct"),flatten(specularProduct) );	
    gl.uniform4fv( gl.getUniformLocation(program, 
       "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, 
       "shininess"),materialShininess );
    
    render();

};

function render()
{
	
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  newMaterial("floor");
  
  configureTexture1(image2);

  var matrix=lookAt(lookat, eye, [0,1,0]);

  setUpBuffers(pNormals, plane);
  
  gl.uniformMatrix4fv(MVMLoc, false, flatten(mult(transz, matrix)));

  gl.drawArrays( gl.TRIANGLES, 0, plane.length );
  
  setUpBuffers(tNormals1, tverts1);
    
  newMaterial("blank");
  
  var image = document.getElementById("face2");
  
  configureTexture( image );
  
  gl.uniformMatrix4fv(MVMLoc, false, flatten(mult(transz, matrix)));
  
  gl.drawArrays(gl.TRIANGLES, 0, tverts1.length);
  
  setUpBuffers(tNormals2, tverts2);
  
  var image = document.getElementById("face1");
  
  configureTexture( image );
  
  gl.uniformMatrix4fv(MVMLoc, false, flatten(mult(transz, matrix)));
  
  gl.drawArrays(gl.TRIANGLES, 0, tverts2.length);
  
  setUpBuffers(tNormals3, tverts3);
  
  var image = document.getElementById("myFace");
  
  configureTexture( image );
  
  gl.uniformMatrix4fv(MVMLoc, false, flatten(mult(transz, matrix)));
  
  gl.drawArrays(gl.TRIANGLES, 0, tverts3.length);

  setUpBuffers(normalsArray, vertices);

  var image = document.getElementById("texImage");
  
  configureTexture( image );
  
  sine+=speed*.03;
  bsine+=speed*.06;
  sinwave=Math.sin(sine);
  distance.push(distance.pop()+speed*.02);
  matrix=mult(matrix, translate(-8, 0, 0));
  for (var i=0; i<rotation.length; i++){
	  if (i>0){
		  var ru=rotate(-rotation[i-1], [0, 1, 0]);
		  matrix=mult(matrix, ru);
	  }
	  var ri=rotate(rotation[i], [0, 1, 0]);
	  var di=translate(0, .2, distance[i]);
	  matrix=mult(matrix, ri);
	  matrix=mult(matrix, di);
  }
  movement[torsoId] = translate(0, Math.sin(bsine)*.2, 0);
  movement[headId] = rotate(10*sinwave, [0, 0, 1]);
  movement[snoutId] = mat4();
  movement[noseId] = mat4();
  movement[leftEyeId] = mat4();
  movement[rightEyeId] = mat4();
  movement[leftEarId] = mat4();
  movement[rightEarId] = mat4();
  movement[leftArmId] = mult(translate(0, 0, sinwave*.2), rotate(20*sinwave, [0, 1, 0]));
  movement[rightArmId] = mult(translate(0, 0, -sinwave*.2), rotate(20*sinwave, [0, 1, 0]));
  movement[leftLegId] = mult(translate(0, 0, -sinwave*.2), rotate(20*sinwave, [1, 0, 0]));
  movement[leftCalfId] = mult(translate(0, 0, -sinwave*.2), rotate(20*sinwave, [1, 0, 0]));
  movement[rightLegId] = mult(translate(0, 0, sinwave*.2), rotate(-20*sinwave, [1, 0, 0]));
  movement[rightCalfId] = mult(translate(0, 0, sinwave*.2), rotate(-20*sinwave, [1, 0, 0]));
  movement[tailId] = mat4();

  figure[torsoId].transform = matrix;
  traverse(torsoId);
  requestAnimFrame(render);
};

function setUpBuffers(norms, pos){
	  var nBuffer = gl.createBuffer();
	  gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
	  gl.bufferData( gl.ARRAY_BUFFER, flatten(norms), gl.STATIC_DRAW );
	  
	  var vNormal = gl.getAttribLocation( program, "vNormal" );
	  gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
	  gl.enableVertexAttribArray( vNormal);
	  
	  var vBuffer = gl.createBuffer();
	  gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	  gl.bufferData( gl.ARRAY_BUFFER, flatten(pos), gl.STATIC_DRAW );

	  var vPosition = gl.getAttribLocation( program, "vPosition" );
	  gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
	  gl.enableVertexAttribArray( vPosition );
}

function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}

function divideTriangle(a, b, c, count) {
    if ( count > 0 ) {
                
        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);
                
        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);
                                
        divideTriangle( a, ab, ac, count - 1 );
        divideTriangle( ab, b, bc, count - 1 );
        divideTriangle( bc, c, ac, count - 1 );
        divideTriangle( ab, bc, ac, count - 1 );
    }
    else { 
        triangle( a, b, c );
    }
}

function triangle(a, b, c){
	vertices.push(a);
	vertices.push(b);
	vertices.push(c);

	var t1 = subtract(a, b);
    var t2 = subtract(a, c);
    var normal = normalize(cross(t1, t2));
    normal = vec4(normal);

    normalsArray.push(normal);
    normalsArray.push(normal);
    normalsArray.push(normal);
}

function traverse(Id) {
	   
	   if(Id == null) return; 
	   stack.push(modelView);
	   modelView = mult(modelView, figure[Id].transform);
	   modelView = mult(modelView, movement[Id]);
	   figure[Id].render();
	   if(figure[Id].child != null) traverse(figure[Id].child); 
	    modelView = stack.pop();
	   if(figure[Id].sibling != null) traverse(figure[Id].sibling); 
}

function initNodes(id){
	var m = mat4();
	switch (id){
	case torsoId:			//torso
		m = mat4();
		figure[torsoId] = createNode(m, torso, null, headId);
		break;
	case headId:			//head
		m = translate(0, 2, 0);
		figure[headId] = createNode(m, head, leftArmId, snoutId);
		break;
	case snoutId:			//snout
		m = translate(0, -.1, .8);
		figure[snoutId] = createNode(m, snout, leftEyeId, noseId);
		break;
	case noseId:			//nose
		m = translate(0, .3, .25);
		figure[noseId] = createNode(m, nose, null, null);
		break;
	case leftEyeId: 		//left eye
		m = translate(-.4, .6, .5);
		figure[leftEyeId] = createNode(m, leftEye, rightEyeId, null);
		break;
	case rightEyeId:			//right eye
		m = translate(.4, .6, .5);
		figure[rightEyeId] = createNode(m, rightEye, leftEarId, null);
		break;
	case leftEarId: 		//left ear
		m = translate(-.65, .8, -.2);
		figure[leftEarId] = createNode(m, leftEar, rightEarId, null);
		break;
	case rightEarId:			//right ear
		m = translate(.65, .8, -.2);
		figure[rightEarId] = createNode(m, rightEar, null, null);
		break;
	case leftArmId:			//left arm
		m = mult(rotate(10, [0, 0, 1]), translate(-1.3, 1, 0));
		figure[leftArmId] = createNode(m, leftArm, rightArmId, null);
		break;
	case rightArmId:			//right arm
		m = mult(rotate(-10, [0, 0, 1]), translate(1.3, 1, 0));
		figure[rightArmId] = createNode(m, rightArm, leftLegId, null);
		break;
	case leftLegId:		//left leg
		m = translate(-.5, -1.6, 0);
		figure[leftLegId] = createNode(m, leftLeg, rightLegId, leftCalfId);
		break;
	case leftCalfId:		//left calf
		m = mult(translate(0, -1, -.2), rotate(20, [1, 0, 0]));
		figure[leftCalfId] = createNode(m, leftCalf, null, null);
		break;
	case rightLegId:		//right leg
		m = translate(.5, -1.6, 0);
		figure[rightLegId] = createNode(m, rightLeg, tailId, rightCalfId);
		break;
	case rightCalfId:		//right calf
		m = mult(translate(0, -1, -.2), rotate(20, [1, 0, 0]));
		figure[rightCalfId] = createNode(m, rightCalf, null, null);
		break;
	case tailId:		//tail
		m = translate(0, -1, -.7);
		figure[tailId] = createNode(m, tail, null, null);
		break;
	}
}

function createNode(transform, render, sibling, child){
	var node ={
			transform: transform,
			render: render,
			sibling: sibling,
			child: child
	};
	
	return node;
}

function torso() {
	
	newMaterial("chrome");

    var instanceMatrix = mult(modelView, scaleM(1, 1.5, .8));
    instanceMatrix = mult(transz, instanceMatrix);
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(1.0, 0.0, 0.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );
}

function head(){
	
	newMaterial("polished copper");

	var headS = scaleM(1, 1, .9);
	var instanceMatrix = mult(modelView, headS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 1.0, 0.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function snout(){
	
	newMaterial("obsidian");
	
	var snoutS = scaleM(.7, .5, .35);
	var instanceMatrix = mult(modelView, snoutS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 0.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function nose(){
	
	newMaterial("polished copper");

	var noseS = scaleM(.2, .15, .1);
	var instanceMatrix = mult(modelView, noseS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 1.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow = vec4( 0.4, 0.4, 0.4, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );
}

function leftEye(){
	
	newMaterial("gold");

	var eyeS = scaleM(.2, .2, .2);
	var instanceMatrix = mult(modelView, eyeS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(1.0, 0.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 1.0, 0.1, 0.1, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function rightEye(){
	var eyeS = scaleM(.2, .2, .2);
	var instanceMatrix = mult(modelView, eyeS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(1.0, 0.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 1.0, 0.1, 0.1, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function leftEar(){
	
	newMaterial("emerald");

	var earS = scaleM(.3, .3, .05);
	var instanceMatrix = mult(modelView, earS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(1.0, 0.0, 0.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.3, 0.3, 0.3, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );
    
    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function rightEar(){
	var earS = scaleM(.3, .3, .05);
	var instanceMatrix = mult(modelView, earS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(1.0, 0.0, 0.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.3, 0.3, 0.3, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );
}

function leftArm(){
	
	newMaterial("pearl");

	var limbS = scaleM(1, .3, .3);
	var instanceMatrix = mult(modelView, limbS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(1.0, 1.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );
}

function rightArm(){
	var limbS = scaleM(1, .3, .3);
	var instanceMatrix = mult(modelView, limbS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 1.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function leftLeg(){
	var limbS = scaleM(.3, .7, .3);
	var instanceMatrix = mult(modelView, limbS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 1.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );
    
    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function leftCalf(){
	var limbS = scaleM(.3, .7, .3);
	var instanceMatrix = mult(modelView, limbS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 1.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function rightLeg(){
	var limbS = scaleM(.3, .7, .3);
	var instanceMatrix = mult(modelView, limbS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 1.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function rightCalf(){
	var limbS = scaleM(.3, .7, .3);
	var instanceMatrix = mult(modelView, limbS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 1.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function tail(){
	
	newMaterial("polished copper");

	var tailS = scaleM(.2, .2, .1);
	var instanceMatrix = mult(modelView, tailS);
	instanceMatrix = mult(transz, instanceMatrix);
	
    gl.uniformMatrix4fv(MVMLoc, false, flatten(instanceMatrix));
    
    var col = vec4(0.0, 1.0, 1.0, 1.0);
	gl.uniform4fv(color, flatten(col));
	
	var glow= vec4( 0.0, 0.0, 0.0, 1.0);
	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "glow"),flatten(glow) );

    gl.drawArrays( gl.TRIANGLES, 0, vertices.length );

}

function scaleM( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}

function newMaterial(material){
	switch (material){
	case "chrome":			
		materialAmbient = vec4(0.25, 0.25, 0.25, 1.0);
		materialDiffuse = vec4(0.4, 0.4, 0.4, 1.0);
		materialSpecular = vec4(0.774597, 0.774597, 0.774597, 1.0);
		materialShininess = 76.8;
		break;
	case "polished copper":			
		materialAmbient = vec4(0.2295, 0.08825, 0.0275,  1.0);
		materialDiffuse = vec4(0.5508, 0.2118, 0.066,  1.0);
		materialSpecular = vec4(0.580594, 0.223257, 0.0695701, 1.0);
		materialShininess = 51.2;
		break;
	case "emerald":			
		materialAmbient = vec4(0.0215, 0.1745, 0.0215, 0.55);
		materialDiffuse = vec4(0.07568, 0.61424, 0.07568, 0.55);
		materialSpecular = vec4(0.633, 0.727811, 0.633, 0.55);
		materialShininess = 76.8;
		break;
	case "gold":			
		materialAmbient = vec4(0.24725, 0.1995, 0.0745, 1.0);
		materialDiffuse = vec4(0.75164, 0.60648, 0.22648, 1.0);
		materialSpecular = vec4(0.628281, 0.555802, 0.366065, 1.0);
		materialShininess = 51.2;
		break;
	case "obsidian":			
		materialAmbient = vec4(0.05375, 0.05, 0.06625, 0.82);
		materialDiffuse = vec4(0.18275, 0.17, 0.22525, 0.82);
		materialSpecular = vec4(0.332741, 0.328634, 0.346435, 0.82);
		materialShininess = 38.4;
		break;
	case "pearl":			
		materialAmbient = vec4(0.25, 0.20725, 0.20725, 0.922);
		materialDiffuse = vec4(1.0, 0.829, 0.829, 0.922);
		materialSpecular = vec4(0.296648, 0.296648, 0.296648, 0.922);
		materialShininess = 76.8;
		break;
	case "floor":			
		materialAmbient = vec4( 0.1, 0.0, 0.1, 1.0 );
		materialDiffuse = vec4( 0.8, 0.6, 0.0, 1.0 );
		materialSpecular = vec4( 0.0, 0.0, 0.0, 1.0 );
		materialShininess = 150.0;
		break;
	case "blank":			
		materialAmbient = vec4( 0.8, 0.8, 0.8, 1.0 );
		materialDiffuse = vec4( 0.8, 0.8, 0.8, 1.0 );
		materialSpecular = vec4( 0.0, 0.0, 0.0, 1.0 );
		materialShininess = 100.0;
		break;
	}
		
    
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
    
    gl.uniform4fv( gl.getUniformLocation(program, 
    "ambientProduct"),flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
    "diffuseProduct"),flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, 
    "specularProduct"),flatten(specularProduct) );	
    gl.uniform4fv( gl.getUniformLocation(program, 
    "lightPosition"),flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, 
    "shininess"),materialShininess );
}

function configureTexture(image) {	
    texture = gl.createTexture();
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, 
    	gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
        gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
}

function configureTexture1(image) {	
    texture = gl.createTexture();
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, 
        gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
        gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
}