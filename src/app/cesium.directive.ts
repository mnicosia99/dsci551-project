import { Directive, ElementRef, OnInit } from '@angular/core';
import { Viewer } from 'cesium';
import { Ion } from "cesium";

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {

    // Cesium access token
    // Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmM3ZmRlNi1iZmE4LTQ5M2YtYmRjMC0wNTk0YWNmZjdkYmYiLCJpZCI6ODEyOTQsImlhdCI6MTY0Mzc5MDg4Mn0.7eoO197BvOOyQ7LqHsRPcYaiRWy8xjuuiSw9PDmzHa8'
    Cesium.Ion.defaultAccessToken = null;

    // Bing map api key
    // Cesium.BingMapsApi.defaultKey = 'ArGN3RpBzGTOBzxAxFvg9Ov3mY11C06ySc4HZFadx8pPgduyqpCK9QvULKft7jLA';

    // const viewer = new Viewer(this.el.nativeElement);

    var viewer = new Cesium.Viewer(this.el.nativeElement, {
      imageryProvider: new Cesium.BingMapsImageryProvider({
        url : "https://dev.virtualearth.net",
        key: "ArGN3RpBzGTOBzxAxFvg9Ov3mY11C06ySc4HZFadx8pPgduyqpCK9QvULKft7jLA",
        mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
      }),
      baseLayerPicker : false,
      animation: false,
      timeline: false,
      geocoder : false,
      homeButton: false,
      fullscreenButton: false,
      scene2DOnly: true,
      selectionIndicator: false,
      sceneModePicker: false
    });

    // Denver
    // lat 39.7392N
    // long 104.9903W
    const DENVER_LAT = 39.7392;
    const DENVER_LON = -104.9903;
    // LA
    // lat 34.0522N
    // long 118.2437W
    const LA_LAT = 39.7392;
    const LA_LON = -118.2437;
    const LAT = LA_LAT;
    const LON = LA_LON;
    var center = Cesium.Cartesian3.fromDegrees(LON, LAT);
    viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, -800000.0, 1000000.0));

    const oc = new Cesium.Color(
      Cesium.Color.BLUE.red,
      Cesium.Color.BLUE.green,
      Cesium.Color.BLUE.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-orange.json', {
      stroke: Cesium.Color.WHITE,
      fill: oc,
      strokeWidth: 3,
      markerSymbol: 'Orange'
    }));

    const la = new Cesium.Color(
      Cesium.Color.RED.red,
      Cesium.Color.RED.green,
      Cesium.Color.RED.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-la.json', {
      stroke: Cesium.Color.WHITE,
      fill: la,
      strokeWidth: 3,
      "fillOpacity": .75,
      markerSymbol: 'Los Angeles'
    }));

    const riv = new Cesium.Color(
      Cesium.Color.GREEN.red,
      Cesium.Color.GREEN.green,
      Cesium.Color.GREEN.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-riverside.json', {
      stroke: Cesium.Color.WHITE,
      fill: riv,
      strokeWidth: 3,
      markerSymbol: 'Riverside'
    }));

    const sb = new Cesium.Color(
      Cesium.Color.YELLOW.red,
      Cesium.Color.YELLOW.green,
      Cesium.Color.YELLOW.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-sb.json', {
      stroke: Cesium.Color.WHITE,
      fill: sb,
      strokeWidth: 3,
      markerSymbol: 'San Bernardino'
    }));

    const sd = new Cesium.Color(
      Cesium.Color.ORANGE.red,
      Cesium.Color.ORANGE.green,
      Cesium.Color.ORANGE.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-sd.json', {
      stroke: Cesium.Color.WHITE,
      fill: sd,
      strokeWidth: 3,
      "fillOpacity": .75,
      markerSymbol: 'San Diego'
    }));

    const imperial = new Cesium.Color(
      Cesium.Color.RED.red,
      Cesium.Color.RED.green,
      Cesium.Color.RED.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-imperial.json', {
      stroke: Cesium.Color.WHITE,
      fill: imperial,
      strokeWidth: 3,
      markerSymbol: 'Imperial',
      label: 'Imperial'
    }));

    const kern = new Cesium.Color(
      Cesium.Color.ORANGE.red,
      Cesium.Color.ORANGE.green,
      Cesium.Color.ORANGE.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-kern.json', {
      stroke: Cesium.Color.WHITE,
      fill: kern,
      strokeWidth: 3,
      markerSymbol: 'Kern'
    }));

    const santabarbara = new Cesium.Color(
      Cesium.Color.BLUE.red,
      Cesium.Color.BLUE.green,
      Cesium.Color.BLUE.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-santabarbara.json', {
      stroke: Cesium.Color.WHITE,
      fill: santabarbara,
      strokeWidth: 3,
      markerSymbol: 'Santa Barbara'
    }));

    const slo = new Cesium.Color(
      Cesium.Color.GREEN.red,
      Cesium.Color.GREEN.green,
      Cesium.Color.GREEN.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-slo.json', {
      stroke: Cesium.Color.WHITE,
      fill: slo,
      strokeWidth: 3,
      markerSymbol: 'SLO'
    }));

    const ventura = new Cesium.Color(
      Cesium.Color.GREEN.red,
      Cesium.Color.GREEN.green,
      Cesium.Color.GREEN.blue, 0.4);
    viewer.dataSources.add(Cesium.GeoJsonDataSource.load('../assets/cesium/gz_2010_us_050_00_5m-ventura.json', {
      stroke: Cesium.Color.WHITE,
      fill: ventura,
      strokeWidth: 3,
      markerSymbol: 'Ventura'
    }));

    viewer.scene.mode = Cesium.SceneMode.SCENE2D;

    //Add basic drag and drop functionality
    viewer.extend(Cesium.viewerDragDropMixin);

    //Show a pop-up alert if we encounter an error when processing a dropped file
    viewer.dropError.addEventListener(function(dropHandler, name, error) {
        console.log(error);
        window.alert(error);
    });
  }  
}
