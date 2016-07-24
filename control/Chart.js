jQuery.sap.registerModulePath('chart.js', 'lib/Chart.js/2.1.6/'); 
jQuery.sap.require({modName: "chart.js.Chart", type: "min"});
//jQuery.sap.require({modName: "chart.js.Chart"});

sap.ui.define([
		'sap/ui/core/Control'
		],
		function(Control) {	
			"use strict";

			return Control.extend("com.katan.control.Chart", {
				metadata:{
					properties:{
						chartType:{type : "string"},
						width:{type : "sap.ui.core.CSSSize", defaultValue : "100%"},
						height:{type : "sap.ui.core.CSSSize"},
						data:{type : "object"},
						options:{type : "object", defaultValue : 
							{
								responsive: true,
    							maintainAspectRatio: true
							}
						}
					},
					aggregations:{
					},
					events : {
						initChart : {}
					}
				},
				_getChart:function(){
					// Returns the chart.js object instance for this control
					return this._chart;
				},
				init:function(){
					
				},
				onAfterRendering:function(){
					var myChart = this._getChart();
					// Now create a new one
					// Can retrieve data via json method...!!!!
					myChart = new Chart( this._getCanvas(), { 
						"type": this.getChartType(),
						"data": this.getData(),
						"options": this.getOptions()
					});

					this._setChart(myChart);	
				},
				renderer:function(oRM, oControl) {
					// The chart scales to the size of the outer div when responsive
					oRM.write("<div");
					oRM.writeControlData(oControl);
					oRM.writeClasses();

					// Add the style to the div (including height settings as Chart.js mods the canvas height when set to responsive)
					oRM.addStyle("width", oControl.getWidth());
					oRM.addStyle("height", oControl.getHeight());
					oRM.writeStyles();

					// Close the div tag
					oRM.write(">");

					// Add a canvas to the DOM
					oRM.write("<canvas");
					oRM.writeAttribute("id", oControl._getCanvasId());
						
					oRM.write("></canvas>");
					oRM.write("</div>");

					// Fire chart initialisation
					oControl.fireEvent("initChart");
				},
				setData:function(iData){
					// Overridden set data method so can trigger an update of the chart
					this.setProperty("data", iData, true);

					try{
						var myChart = this._getChart();
						myChart.data = iData;	
						myChart.update();
					}
					catch(e){
					}
					
				},
				setOptions:function(iOptions){
				// Overridden set options method so can trigger an update of the chart

					// Set Default Options
					iOptions["responsive"] = true;
					iOptions["maintainAspectRatio"] = true;

					this.setProperty("options", iOptions, true);

					try{
						var myChart = this._getChart();
						myChart.options = iOptions;	
						myChart.update();
					}
					catch(e){
					}
				},
				_setChart:function(myChart){
					// Sets the chart.js object instance for the chart control
					this._chart = myChart;
				},
				_getCanvasId:function(){
					// Returns the Id of the canvas for the chart control
					return this.getId() + "-chart_canvas";
				},
				_getCanvas:function(){
					// Get the canvas for the chart control
					var chartCanvas = document.getElementById(this._getCanvasId());
					return chartCanvas.getContext("2d");
				}
			});	
	}
);	