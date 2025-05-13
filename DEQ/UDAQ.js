var area = true;
var nonroad = true;
var mobile = true;
var point = true;

var counties=[];
var pollutants=[];

var dataset;

var selectedPollutant;
var selectedCounty;

window.onload = function init()
{
	
	d3.csv("Baseline2014_EI_10_03_2013.csv", function(data){
		
		dataset = data;
		
		//fill counties array
		for (var i=0;i<dataset.length;i++){
			var d=dataset[i];
			if(counties.indexOf(d.County)<0){
				counties.push(d.County);
			}
		}
		
		//fill pollutants array
		for (var i=0;i<dataset.length;i++){
			var d=dataset[i];
			if(pollutants.indexOf(d.PolName)<0){
				pollutants.push(d.PolName);
			}
		}
		
		//put counties in selector box
		var countyOptionBase = "<li onclick=\"selectCounty(this)\" value=\"";
		var closeOptionTag = "</li>";
		var countyOptions = "";
		for (var i=0; i<counties.length; i++){
			countyOptions+=countyOptionBase+counties[i]+"\">"+counties[i]+closeOptionTag+'\n';
		}
		countyOptions += countyOptionBase+"None\">None"+closeOptionTag+'\n';
		document.getElementById("county-selector").innerHTML = countyOptions;
		
		//put counties in selector box
		var pollutantOptionBase = "<li onclick=\"selectPollutant(this)\" value=\"";
		var closeOptionTag = "</li>";
		var pollutantOptions = "";
		for (var i=0; i<pollutants.length; i++){
			pollutantOptions+=pollutantOptionBase+pollutants[i]+"\">"+pollutants[i]+closeOptionTag+'\n';
		}
		pollutantOptions += pollutantOptionBase+"None\">None"+closeOptionTag+'\n';
		document.getElementById("pollutant-selector").innerHTML = pollutantOptions;
		
		updateSVG();
		
		window.onresize=updateSVG;
	});

	document.getElementById ("point-button").addEventListener ("click", pointClick);
	document.getElementById ("area-button").addEventListener ("click", areaClick);
	document.getElementById ("mobile-button").addEventListener ("click", mobileClick);
	document.getElementById ("non-road-button").addEventListener ("click", nonRoadClick);
	
	window.selectCounty = function(clicked){
		if (selectedCounty != null){
			// selectedPollutant.className = "";
			var li = document.getElementsByTagName("li");
			for (var i=0; i<li.length; i++){
				if (li[i].innerHTML == selectedCounty){
					li[i].className = "";
				}
			}
		}
		//display selected county at the top; highlight selected county
		if (clicked.innerHTML == "None"){
			document.getElementById("selected-county").innerHTML = "Select County";
			selectedCounty = null;
		} else {
			document.getElementById("selected-county").innerHTML = clicked.innerHTML;
			selectedCounty = clicked.innerHTML;
			clicked.className = "selected";
		}
		//close options
		document.getElementById("county-selector").style.display="none";
		setTimeout(setCountyToNormal, 500);
	}
	
	window.selectCountyPol = function(e){
		var classes = this.getAttribute("class").split("-")
		selectedPollutant = classes[0];
		var li = document.getElementsByTagName("li");
		for (var i=0; i<li.length; i++){
			if (li[i].innerHTML == selectedPollutant){
				li[i].className = "selected";
			}
		}
		document.getElementById("selected-pollutant").innerHTML = selectedPollutant;
		selectedCounty = classes[1];
		for (var i=0; i<li.length; i++){
			if (li[i].innerHTML == selectedCounty){
				li[i].className = "selected";
			}
		}
		document.getElementById("selected-county").innerHTML = selectedCounty;
		updateSVG();
	}
	
	function setCountyToNormal(){
		document.getElementById("county-selector").style.display="";
		updateSVG();
	}
	
	window.selectPollutant = function(clicked){
		if (selectedPollutant != null){
			// selectedPollutant.className = "";
			var li = document.getElementsByTagName("li");
			for (var i=0; i<li.length; i++){
				if (li[i].innerHTML == selectedPollutant){
					li[i].className = "";
				}
			}
		}
		//display selected pollutant at the top; highlight selected pollutant
		if (clicked.innerHTML == "None"){
			document.getElementById("selected-pollutant").innerHTML = "Select Pollutant";
			selectedPollutant = null;
		} else {
			document.getElementById("selected-pollutant").innerHTML = clicked.innerHTML;
			clicked.className = "selected";
			selectedPollutant = clicked.innerHTML
		}
		//close options
		document.getElementById("pollutant-selector").style.display="none";
		setTimeout(setPollutantToNormal, 500);
	}
	
	function setPollutantToNormal(){
		document.getElementById("pollutant-selector").style.display="";
		updateSVG();
	}
	
	function updateSVG(){
		if (selectedCounty != null && selectedPollutant != null){
			makePieChart();
		} else {
			makeBarGraph();
		}
	}
	
	function makeBarGraph(){
		var svg = d3.select("#canvas");
		var canvasWidth = document.getElementById("canvas").width.baseVal.value;
		var canvasHeight = document.getElementById("canvas").height.baseVal.value;
		svg.selectAll("text").remove();
		svg.selectAll("rect").remove();
		svg.selectAll("path").remove();
		svg.selectAll("g").remove();
		for (var i = 0; i < counties.length; i++){
			var x = 100 + ((canvasWidth-100)/counties.length)*i;
			text = svg.append("text").text(counties[i]).attr("transform","translate("+x+",80)rotate(290)").attr("fill","#E7E1CF");	
		}
		for (var i = 0; i < pollutants.length; i++){
			var countyPol = new Array();
			var maxCounty = 0;
			if (selectedPollutant == null){
				var y = 100 + ((canvasHeight-100)/pollutants.length)*i;
				text = svg.append("text").text(pollutants[i]).attr("x",10).attr("y",y).attr("fill","#E7E1CF");	
				rect = svg.append("rect").attr("x",65).attr("y",y-15).attr("width", canvasWidth-100).attr("height",100).attr("fill","#393938").attr("stroke","#E7E1CF");
				for (var j=0;j<dataset.length;j++){
					var d=dataset[j];
					if (d.PolName == pollutants[i] && (selectedPollutant == null || selectedPollutant == d.PolName)){
						if((d.Source=="Mobile" && mobile) || (d.Source=="Point" && point) ||
								(d.Source=="Area" && area) || (d.Source=="NonRoad" && nonroad)){
							if(countyPol[d.County] == undefined){
								countyPol[d.County] = parseFloat(d["Tons/day"]);
							} else {
								countyPol[d.County] += parseFloat(d["Tons/day"]);
							}
							if (countyPol[d.County] > maxCounty){
								maxCounty = countyPol[d.County];
							}
						}
					}
				}
			} else if (pollutants[i] == selectedPollutant) {
				var y = 100;
				text = svg.append("text").text(pollutants[i]).attr("x",10).attr("y",y).attr("fill","#E7E1CF");	
				rect = svg.append("rect").attr("x",65).attr("y",y-15).attr("width", canvasWidth-100).attr("height",100).attr("fill","#393938").attr("stroke","#E7E1CF");
				for (var j=0;j<dataset.length;j++){
					var d=dataset[j];
					if (d.PolName == pollutants[i] && (selectedPollutant == null || selectedPollutant == d.PolName)){
						if((d.Source=="Mobile" && mobile) || (d.Source=="Point" && point) ||
								(d.Source=="Area" && area) || (d.Source=="NonRoad" && nonroad)){
							if(countyPol[d.County] == undefined){
								countyPol[d.County] = parseFloat(d["Tons/day"]);
							} else {
								countyPol[d.County] += parseFloat(d["Tons/day"]);
							}
							if (countyPol[d.County] > maxCounty){
								maxCounty = countyPol[d.County];
							}
						}
					}
				}
			}
			for (var j = 0; j < counties.length; j++){
				var x = 80 + ((canvasWidth-100)/counties.length)*j;
				var width = (canvasWidth-100)/(counties.length*2);
				var height = 80*(countyPol[counties[j]]/(maxCounty));
				var container = svg.append("g");
				if (selectedCounty == null || selectedCounty == counties[j]){
					rect = container.append("rect").attr("x",x).attr("y",y+84-height).attr("fill","#D9DE41").attr("width", width).attr("height",height).attr("class",pollutants[i]+"-"+counties[j]).attr("onclick","selectCountyPol.call(this,event)");
					text = container.append("text").text(Math.round(countyPol[counties[j]]*100)/100 + " Tons/day").attr("x",x+width/2).attr("y",y).attr("fill","#E7E1CF").attr("class","amount").attr("text-anchor","middle");
				}
				//text = svg.append("text").text(countyPol[counties[j]]).attr("x",x).attr("y",y).attr("fill","white");
				//text = svg.append("text").text(counties[i]).attr("transform","translate("+x+",80)rotate(290)").attr("fill","#E7E1CF");	
			}
		}
	}
	
	function makePieChart(){
		var svg = d3.select("#canvas");
		svg.selectAll("text").remove();
		svg.selectAll("rect").remove();
		svg.selectAll("g").remove();
		svg.selectAll("path").remove();
		var canvasWidth = document.getElementById("canvas").width.baseVal.value;
		var canvasHeight = document.getElementById("canvas").height.baseVal.value;
		var widthHeight = Math.min(canvasWidth, canvasHeight);
		
		var totalMobile = 0;
		var totalPoint = 0;
		var totalArea = 0;
		var totalNonRoad = 0;
		var mobileGen = new Array();
		var pointGen = new Array();
		var areaGen = new Array();
		var nonRoadGen = new Array();
		for (var j=0;j<dataset.length;j++){
			var d=dataset[j];
			if (d.County == selectedCounty && d.PolName == selectedPollutant) {
				if((d.Source=="Mobile" && mobile)){
					totalMobile += parseFloat(d["Tons/day"]);
					if (mobileGen[d["General Emissions Description"]] == undefined){
						mobileGen[d["General Emissions Description"]] = parseFloat(d["Tons/day"]);
					} else {
						mobileGen[d["General Emissions Description"]] += parseFloat(d["Tons/day"]);
					}
				} else if (d.Source=="Point" && point) {
					totalPoint += parseFloat(d["Tons/day"]);
					if (pointGen[d["General Emissions Description"]] == undefined){
						pointGen[d["General Emissions Description"]] = parseFloat(d["Tons/day"]);
					} else {
						pointGen[d["General Emissions Description"]] += parseFloat(d["Tons/day"]);
					}
				} else if (d.Source=="Area" && area) {
					totalArea += parseFloat(d["Tons/day"]);
					if (areaGen[d["General Emissions Description"]] == undefined){
						areaGen[d["General Emissions Description"]] = parseFloat(d["Tons/day"]);
					} else {
						areaGen[d["General Emissions Description"]] += parseFloat(d["Tons/day"]);
					}
				} else if (d.Source=="NonRoad" && nonroad) {
					totalNonRoad += parseFloat(d["Tons/day"]);
					if (nonRoadGen[d["General Emissions Description"]] == undefined){
						nonRoadGen[d["General Emissions Description"]] = parseFloat(d["Tons/day"]);
					} else {
						nonRoadGen[d["General Emissions Description"]] += parseFloat(d["Tons/day"]);
					}
				}
			}
		}
		
		var total = totalMobile + totalArea + totalPoint + totalNonRoad;
		var soFar = 0;
		var mobileColor = "rgb(163,179,121)";
		var pointColor = "rgb(197,120,85)";
		var areaColor = "rgb(121,149,163)";
		var nonRoadColor = "rgb(215,208,76)";
		
		var arc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3+10)
				.startAngle(soFar)
				.endAngle(soFar - (totalMobile/total * Math.PI * 2));
		soFar -= totalMobile/total * Math.PI * 2
			
			svg.append("path")
				.attr("d", arc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",mobileColor)
				
		var arc1 = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3+10)
				.startAngle(soFar)
				.endAngle(soFar - totalPoint/total * Math.PI * 2);
		soFar -= totalPoint/total * Math.PI * 2
			
			svg.append("path")
				.attr("d", arc1)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",pointColor)
				
		var arc2 = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3+10)
				.startAngle(soFar)
				.endAngle(soFar - totalArea/total * Math.PI * 2);
		soFar -= totalArea/total * Math.PI * 2
			
			svg.append("path")
				.attr("d", arc2)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",areaColor)
				
		var arc3 = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3+10)
				.startAngle(soFar)
				.endAngle(soFar - totalNonRoad/total * Math.PI * 2);
		soFar -= totalNonRoad/total * Math.PI * 2
			
			svg.append("path")
				.attr("d", arc3)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",nonRoadColor);
		
		soFar = 0;
		var textHeight = 20;
		var textX = 10;
		var backLayer = svg.append("g");
		var x = 0;
		for (key in mobileGen) {
			var start = soFar;

			var color = mix(mobileColor, "rgb("+x+","+x+","+x+")");
			x += 50;
			if (x > 250){
				x = 0;
			}
			
			var container = backLayer.append("g");
			
			var arc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3)
				.startAngle(soFar)
				.endAngle(soFar - mobileGen[key]/total * Math.PI * 2);
				
			var largeArc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3 + 5)
				.startAngle(soFar)
				.endAngle(soFar - mobileGen[key]/total * Math.PI * 2);
			
			container.append("path")
				.attr("d", arc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",color)
				.attr("id","group "+key.replace(/\s/g, '-'))
				.attr("class","mobile")
				.attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)");
				
			container.append("path")
				.attr("d", largeArc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",color)
				.attr("id","group "+key.replace(/\s/g, '-'))
				.attr("class","mobile highlight-arc")
				.attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)");
				
			soFar -= mobileGen[key]/total * Math.PI * 2
			if (textHeight > canvasHeight*4/5){
				textHeight = 20;
				textX += canvasWidth/4
			}
			
			var h = textHeight+15;
			var max = 0;
			for (var i=0;i<dataset.length;i++){
				var d=dataset[i];
				if (d.County == selectedCounty && d.PolName == selectedPollutant
				&& d.Source == "Mobile" && d["General Emissions Description"] == key && d["Tons/day"] != 0){
					h += 15;
					if (parseFloat(d["Tons/day"]) > max){
						max = parseFloat(d["Tons/day"]);
					}
				}
			}
			if (h-textHeight-15>0){
				svg.append("rect").attr("x",textX).attr("y",textHeight + 3).attr("width", 400).attr("height",h-textHeight-11).attr("fill","rgb(57,57,56)").attr("stroke","#E7E1CF").attr("class","genSrc mobile "+key.replace(/\s/g, '-'));
			}
			h = textHeight+18;
			for (var i=0;i<dataset.length;i++){
				var d=dataset[i];
				// if(counties.indexOf(d.County)<0){
				if (d.County == selectedCounty && d.PolName == selectedPollutant
				&& d.Source == "Mobile" && d["General Emissions Description"] == key && d["Tons/day"] != 0){
					svg.append("text").text((d["Specific Emissions Description"].length > 42)? d["Specific Emissions Description"].substring(0, 39)+"...": d["Specific Emissions Description"]).attr("x",textX).attr("y",h).attr("maxWidth",300).attr("fill","#E7E1CF").attr("class", "specSrc mobile "+key.replace(/\s/g, '-'));
					svg.append("rect").attr("x",textX+395-(d["Tons/day"]/max)*100).attr("y",h-13).attr("fill",mobileColor).attr("width", (d["Tons/day"]/max)*100).attr("height",13).attr("class", "specSrc mobile "+key.replace(/\s/g, '-'));
					h += 15;
				}
			}
			container.append("rect").attr("x",textX-6).attr("y",textHeight-14).attr("fill",mobileColor).attr("width",5).attr("height",15);
			text = container.append("text").text(key).attr("x",textX).attr("y",textHeight).attr("fill",color).attr("class","genSrc mobile").attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)").attr("id","group "+key.replace(/\s/g, '-'));
			textHeight += 15;
		}
		
		x = 0;
		for (key in pointGen) {
			var start = soFar;
			
			var color = mix(pointColor, "rgb("+x+","+x+","+x+")");
			x += 50;
			if (x > 250){
				x = 0;
			}
			
			var container = backLayer.append("g");
			
			var largeArc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3 + 5)
				.startAngle(soFar)
				.endAngle(soFar - pointGen[key]/total * Math.PI * 2);
			
			var arc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3)
				.startAngle(soFar)
				.endAngle(soFar - pointGen[key]/total * Math.PI * 2);
			
			container.append("path")
				.attr("d", arc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",color)
				.attr("stroke",pointColor)
				.attr("id","group "+key.replace(/\s/g, '-'))
				.attr("class","point")
				.attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)");
				
			container.append("path")
				.attr("d", largeArc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",color)
				.attr("stroke",pointColor)
				.attr("id","group "+key.replace(/\s/g, '-'))
				.attr("class","point highlight-arc")
				.attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)");
				
			soFar -= pointGen[key]/total * Math.PI * 2
			if (textHeight > canvasHeight*4/5){
				textHeight = 20;
				textX += canvasWidth/4
			}
			
			var h = textHeight+15;
			max = 0;
			for (var i=0;i<dataset.length;i++){
				var d=dataset[i];
				// if(counties.indexOf(d.County)<0){
				if (d.County == selectedCounty && d.PolName == selectedPollutant
				&& d.Source == "Point" && d["General Emissions Description"] == key && d["Tons/day"] != 0){
					h += 15;
					if (parseFloat(d["Tons/day"]) > max){
						max = parseFloat(d["Tons/day"]);
					}
				}
			}
			if (h-textHeight-15>0){
				svg.append("rect").attr("x",textX).attr("y",textHeight+3).attr("width", 400).attr("height",h-textHeight-11).attr("fill","rgb(57,57,56)").attr("stroke","#E7E1CF").attr("class","genSrc point "+key.replace(/\s/g, '-'));
			}
			h = textHeight+18;
			for (var i=0;i<dataset.length;i++){
				var d=dataset[i];
				// if(counties.indexOf(d.County)<0){
				if (d.County == selectedCounty && d.PolName == selectedPollutant
				&& d.Source == "Point" && d["General Emissions Description"] == key && d["Tons/day"] != 0){
					svg.append("text").text((d["Specific Emissions Description"].length > 42)? d["Specific Emissions Description"].substring(0, 39)+"...": d["Specific Emissions Description"]).attr("x",textX).attr("y",h).attr("maxWidth",300).attr("fill","#E7E1CF").attr("class", "specSrc point "+key.replace(/\s/g, '-'));
					svg.append("rect").attr("x",textX+395-(d["Tons/day"]/max)*100).attr("y",h-13).attr("fill",pointColor).attr("width", (d["Tons/day"]/max)*100).attr("height",13).attr("class", "specSrc point "+key.replace(/\s/g, '-'));
					h += 15;
				}
			}
			container.append("rect").attr("x",textX-6).attr("y",textHeight-14).attr("fill",pointColor).attr("width",5).attr("height",15);
			text = container.append("text").text(key).attr("x",textX).attr("y",textHeight).attr("fill",color).attr("class","genSrc point").attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)").attr("id","group "+key.replace(/\s/g, '-'));
			textHeight += 15;
		}
		
		x = 0;
		for (key in areaGen) {
			var start = soFar;
			
			var container = backLayer.append("g");
			
			var color = mix(areaColor, "rgb("+x+","+x+","+x+")");
			x += 50;
			if (x > 250){
				x = 0;
			}
						
			var largeArc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3 + 5)
				.startAngle(soFar)
				.endAngle(soFar - areaGen[key]/total * Math.PI * 2);
			
			var arc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3)
				.startAngle(soFar)
				.endAngle(soFar - areaGen[key]/total * Math.PI * 2);
			
			container.append("path")
				.attr("d", arc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",color)
				.attr("stroke",areaColor)
				.attr("id","group "+key.replace(/\s/g, '-'))
				.attr("class","area")
				.attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)");
				
			container.append("path")
				.attr("d", largeArc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",color)
				.attr("stroke",areaColor)
				.attr("id","group "+key.replace(/\s/g, '-'))
				.attr("class","area highlight-arc")
				.attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)");
				
			soFar -= areaGen[key]/total * Math.PI * 2
			if (textHeight > canvasHeight*4/5){
				textHeight = 20;
				textX += canvasWidth/4
			}
			
			var h = textHeight+15;
			max = 0;
			for (var i=0;i<dataset.length;i++){
				var d=dataset[i];
				// if(counties.indexOf(d.County)<0){
				if (d.County == selectedCounty && d.PolName == selectedPollutant
				&& d.Source == "Area" && d["General Emissions Description"] == key && d["Tons/day"] != 0){
					h += 15;
					if (parseFloat(d["Tons/day"]) > max){
						max = parseFloat(d["Tons/day"]);
					}
				}
			}
			if (h-textHeight-15>0){
				svg.append("rect").attr("x",textX).attr("y",textHeight + 3).attr("width", 400).attr("height",h-textHeight-11).attr("fill","rgb(57,57,56)").attr("stroke","#E7E1CF").attr("class","genSrc area "+key.replace(/\s/g, '-'));
			}
			h = textHeight+18;
			for (var i=0;i<dataset.length;i++){
				var d=dataset[i];
				// if(counties.indexOf(d.County)<0){
				if (d.County == selectedCounty && d.PolName == selectedPollutant
				&& d.Source == "Area" && d["General Emissions Description"] == key && d["Tons/day"] != 0){
					svg.append("text").text((d["Specific Emissions Description"].length > 42)? d["Specific Emissions Description"].substring(0, 39)+"...": d["Specific Emissions Description"]).attr("x",textX).attr("y",h).attr("maxWidth",300).attr("fill","#E7E1CF").attr("class", "specSrc area "+key.replace(/\s/g, '-'));
					svg.append("rect").attr("x",textX+395-(d["Tons/day"]/max)*100).attr("y",h-13).attr("fill",areaColor).attr("width", (d["Tons/day"]/max)*100).attr("height",13).attr("class", "specSrc area "+key.replace(/\s/g, '-'));
					h += 15;
				}
			}
			container.append("rect").attr("x",textX-6).attr("y",textHeight-14).attr("fill",areaColor).attr("width",5).attr("height",15);
			text = container.append("text").text(key).attr("x",textX).attr("y",textHeight).attr("fill",color).attr("class","genSrc area").attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)").attr("id","group "+key.replace(/\s/g, '-'));
			textHeight += 15;
		}
		
		x = 0;
		for (key in nonRoadGen) {
			var start = soFar;
			
			var rand = Math.floor((Math.random() * 256));
			var color = mix(nonRoadColor, "rgb("+x+","+x+","+x+")");
			x += 50;
			if (x > 250){
				x = 0;
			}
			
			var container = backLayer.append("g");
			
			var largeArc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3 + 5)
				.startAngle(soFar)
				.endAngle(soFar - nonRoadGen[key]/total * Math.PI * 2);
			
			var arc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/3)
				.startAngle(soFar)
				.endAngle(soFar - nonRoadGen[key]/total * Math.PI * 2);
			
			container.append("path")
				.attr("d", arc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",color)
				.attr("id","group "+key.replace(/\s/g, '-'))
				.attr("class","nonroad")
				.attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)");
				
			container.append("path")
				.attr("d", largeArc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("fill",color)
				.attr("id","group "+key.replace(/\s/g, '-'))
				.attr("class","nonroad highlight-arc")
				.attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)");
				
			soFar -= nonRoadGen[key]/total * Math.PI * 2
			if (textHeight > canvasHeight*4/5){
				textHeight = 20;
				textX += canvasWidth/4
			}
			
			var h = textHeight+15;
			max = 0;
			for (var i=0;i<dataset.length;i++){
				var d=dataset[i];
				// if(counties.indexOf(d.County)<0){
				if (d.County == selectedCounty && d.PolName == selectedPollutant
				&& d.Source == "NonRoad" && d["General Emissions Description"] == key && d["Tons/day"] != 0){
					h += 15;
					if (parseFloat(d["Tons/day"]) > max){
						max = parseFloat(d["Tons/day"]);
					}
				}
			}
			if (h-textHeight-15>0){
				svg.append("rect").attr("x",textX).attr("y",textHeight + 3).attr("width", 400).attr("height",h-textHeight-11).attr("fill","rgb(57,57,56)").attr("stroke","#E7E1CF").attr("class","genSrc nonroad "+key.replace(/\s/g, '-'));
			}
			h = textHeight+18;
			for (var i=0;i<dataset.length;i++){
				var d=dataset[i];
				// if(counties.indexOf(d.County)<0){
				if (d.County == selectedCounty && d.PolName == selectedPollutant
				&& d.Source == "NonRoad" && d["General Emissions Description"] == key && d["Tons/day"] != 0){
					svg.append("text").text((d["Specific Emissions Description"].length > 42)? d["Specific Emissions Description"].substring(0, 39)+"...": d["Specific Emissions Description"]).attr("x",textX).attr("y",h).attr("maxWidth",300).attr("fill","#E7E1CF").attr("class", "specSrc nonroad "+key.replace(/\s/g, '-'));
					svg.append("rect").attr("x",textX+395-(d["Tons/day"]/max)*100).attr("y",h-13).attr("fill",nonRoadColor).attr("width", (d["Tons/day"]/max)*100).attr("height",13).attr("class", "specSrc nonroad "+key.replace(/\s/g, '-'));
					h += 15;
				}
			}
			container.append("rect").attr("x",textX-6).attr("y",textHeight-14).attr("fill",nonRoadColor).attr("width",5).attr("height",15);
			text = container.append("text").text(key).attr("x",textX).attr("y",textHeight).attr("fill",color).attr("class","genSrc nonroad").attr("onmouseover","show.call(this,event)").attr("onmouseout","hide.call(this,event)").attr("id","group "+key.replace(/\s/g, '-'));
			textHeight += 15;
		}
		
		var arc = d3.svg.arc()
				.innerRadius(0)
				.outerRadius(widthHeight/6)
				.startAngle(0)
				.endAngle(Math.PI * 2);
				
		backLayer.append("path")
				.attr("d", arc)
				.attr("transform","translate("+(canvasWidth*3/5)+","+(canvasHeight/2)+")")
				.attr("class","center-label")
				.attr("stroke","white");
				
		backLayer.append("text").text(selectedPollutant).attr("x",canvasWidth*3/5).attr("y",canvasHeight/2+(widthHeight/6-100)/2).attr("fill","white").attr("text-anchor","middle").attr("font-size", widthHeight/6-50);
		backLayer.append("text").text(Math.floor(100*total)/100+" Tons/day").attr("x",canvasWidth*3/5).attr("y",canvasHeight/2+(widthHeight/6-30)/2).attr("fill","white").attr("text-anchor","middle").attr("font-size", (widthHeight/6-60)/2);

		// var arc = d3.svg.arc()
	    // 	.innerRadius(0)
	    // 	.outerRadius(widthHeight/2)
	    // 	.startAngle(45 * (Math.PI/180)) //converting from degs to radians
	    // 	.endAngle(3) //just radians
	    
	    // var arc1 = d3.svg.arc()
	    // 	.innerRadius(0)
	    // 	.outerRadius(widthHeight/2)
	    // 	.startAngle(3) //converting from degs to radians
	    // 	.endAngle(4) //just radians

	    // svg.append("path")
	    // 	.attr("d", arc)
	    // 	.attr("transform", "translate("+(canvasWidth/2)+","+(canvasHeight/2)+")")

	    // svg.append("path")
	    // 	.attr("d", arc1)
	    // 	.attr("transform", "translate("+(canvasWidth/2)+","+(canvasHeight/2)+")")
	    // 	.attr("fill","green")
		
		//svg.selectAll("arc").remove();
		//arc = svg.append("arc").attr("fill","green").attr("x", 150).attr("y", 240).attr("startAngle",0).attr("endAngle",Math.PI).attr("outerRadius",500);
	}
	
	function pointClick(){
		if (point){
			document.getElementById("point-button").src="image-point-gray.png";
			point = false;
		} else {
			document.getElementById("point-button").src="image-point.png";
			point = true;
		}
		updateSVG();
	}
	
	function mobileClick(){
		if (mobile){
			document.getElementById("mobile-button").src="image-mobile-gray.png";
			mobile = false;
		} else {
			document.getElementById("mobile-button").src="image-mobile.png";
			mobile = true;
		}
		updateSVG();
	}
	
	function areaClick(){
		if (area){
			document.getElementById("area-button").src="image-area-gray.png";
			area = false;
		} else {
			document.getElementById("area-button").src="image-area.png";
			area = true;
		}
		updateSVG();
	}

	function nonRoadClick(){
		if (nonroad){
			document.getElementById("non-road-button").src="image-non-road-gray.png";
			nonroad = false;
		} else {
			document.getElementById("non-road-button").src="image-non-road.png";
			nonroad = true;
		}
		updateSVG();
	}
	
	function mix(color1, color2) {
		
		var vals1 = color1.split("(")[1];
		vals1 = vals1.split(")")[0];
		
		var vals2 = color2.split("(")[1];
		vals2 = vals2.split(")")[0];
		
		var red1 = getRed(vals1);
		var red2 = getRed(vals2);
		
		var green1 = getGreen(vals1);
		var green2 = getGreen(vals2);
		
		var blue1 = getBlue(vals1);
		var blue2 = getBlue(vals2);
		
		var red = Math.floor((red1+red2)/2);
		var green = Math.floor((green1+green2)/2);
		var blue = Math.floor((blue1+blue2)/2);
		
		return "rgb("+red+","+green+","+blue+")";

	}
	
	function getRed(vals){
		var cols = vals.split(",");
		return parseInt(cols[0])
	}
	
	function getGreen(vals){
		var cols = vals.split(",");
		return parseInt(cols[1])
	}
	
	function getBlue(vals){
		var cols = vals.split(",");
		return parseInt(cols[2])
	}
}