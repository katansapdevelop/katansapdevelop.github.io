jQuery.sap.registerModulePath('chart.js', 'lib/Chart.js/2.1.6/'); 
//jQuery.sap.require({modName: "chart.js.Chart", type: "min"});
jQuery.sap.require({modName: "chart.js.Chart"});

sap.ui.define([
		'sap/ui/core/Control'
		],
		function(Control) {	
			"use strict";

			return Control.extend("com.katan.control.Chart", {
				metadata:{
					properties:{
						chartType:{type : "string"},
						width:{type : "int", defaultValue : "100"},
						height:{type : "int", defaultValue : "200"},
						data:{},
						options:{}
					},
					aggregations:{
					},
					events:{
					}
				},
				getChart:function(){
					// Returns the chart object
					return this._chart;
				},
				_setChart:function(myChart){
					// Sets the chart object to the control
					this._chart = myChart;
				},
				_getCanvasId:function(){
					// Returns the Id of the canvas for the chart
					return this.getId() + "_chart_canvas";
				},
				_getCanvas:function(){
					var chartCanvas = document.getElementById(this._getCanvasId());
					return chartCanvas.getContext("2d");
				},
				init:function(){
				},
				renderer:function(oRM, oControl) {
					// The chart scales to the size of the outer div when responsive
					oRM.write("<div");
					oRM.writeControlData(oControl);
					oRM.writeClasses();

					// Add the style to the div (including height settings as Chart.js mods the canvas height when set to responsive)
					oRM.addStyle("width", oControl.getWidth() + "px");
					oRM.addStyle("height", oControl.getHeight() + "px");
					oRM.writeStyles();

					// Close the div tag
					oRM.write(">");

					// Add a canvas to the DOM
					oRM.write("<canvas");
					oRM.writeAttribute("id", oControl._getCanvasId());
						
					oRM.write("></canvas>");
					oRM.write("</div>");
				},
				onAfterRendering:function(){
					var myData = 
					{
    					datasets: [
    						{
								data: [11,16,7,3,14],
        						backgroundColor: ["#FF6384","#4BC0C0","#FFCE56","#E7E9ED","#36A2EB"], 
        						label: 'My dataset' // for legend
    						}
    					],
    					labels: ["Red","Green","Yellow","Grey","Blue"]
					};

					var myChart = this.getChart();
					// Now create a new one
					// Can retrieve data via json method...!!!!
					myChart = new Chart( this._getCanvas(), { 
						"type": this.getChartType(),
						"data": myData,
						"options": {
							responsive: true,
    						maintainAspectRatio: true
						}
					});

					this._setChart(myChart);	
				}
			});	
	}
);	