sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function(Controller) {
    "use strict";
    return Controller.extend("com.katan.controller.Root", {
        onInit:function(){
            /*
            var imageMap = this.byId("addressImage");
            imageMap.setModel(this.getView().getModel("address"));
            */

            // Get the chart control and init the data for it based on the model
            
        },
        setCertificateChartData:function(oEvent){
            var chartControl = oEvent.getSource()
            var bindingContext = chartControl.getBindingContext();
            var boundData = bindingContext.getModel().getProperty(bindingContext.getPath());

            var chartData = {
                labels: ["Points Scored", "Missed Points"],
                datasets:[
                    {
                        data:[boundData["Score"], boundData["Max Score"] - boundData["Score"]],
                        backgroundColor: ["#4BC0C0", "#FF6384"]
                    }
                ]
            }

            chartControl.setData(chartData);
            


        }

    });

});