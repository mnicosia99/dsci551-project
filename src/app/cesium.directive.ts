import { ComponentFactoryResolver, Directive, ElementRef, OnInit } from '@angular/core';
// import { Viewer } from 'cesium';
// import { Ion } from "cesium";

import { DataService } from './data.service';
import { CocSummaries } from './CocSummaries';
import { Coc } from './Coc';

import { h337 } from 'heatmapjs'
import { Shelter } from './Shelter';
import { Shelters } from './Shelters';
import { Entity } from "Cesium";

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  countyMap = new Map<string, string[]>();
  fundingByCounty = new Map<string, number>();
  homelessByCounty = new Map<string, number>();
  shelters = new Map<string, any>();

  constructor(private el: ElementRef, private dataService: DataService) { }

  ngOnInit() {

    // Cesium access token
    // Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMmM3ZmRlNi1iZmE4LTQ5M2YtYmRjMC0wNTk0YWNmZjdkYmYiLCJpZCI6ODEyOTQsImlhdCI6MTY0Mzc5MDg4Mn0.7eoO197BvOOyQ7LqHsRPcYaiRWy8xjuuiSw9PDmzHa8'
    Cesium.Ion.defaultAccessToken = null;

    // Bing map api key
    // Cesium.BingMapsApi.defaultKey = 'ArGN3RpBzGTOBzxAxFvg9Ov3mY11C06ySc4HZFadx8pPgduyqpCK9QvULKft7jLA';

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

    const LAT = 42.4894;
    const LONG = -120.4679;
    var center = Cesium.Cartesian3.fromDegrees(LONG, LAT);
    viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, -800000.0, 2100000.0));

    viewer.scene.mode = Cesium.SceneMode.SCENE2D;

    let bounds = {
      west: LONG - 1,
      east: LONG + 1,
      south: LAT - 1,
      north: LAT + 1
    };
  
    // init heatmap
    var cfg = {
      // radius should be small ONLY if scaleRadius is true (or small radius is intended)
      // if scaleRadius is false it will be the constant radius used in pixels
      "radius": 2,
      "maxOpacity": .8,
      // scales the radius based on map zoom
      "scaleRadius": true,
      // if set to false the heatmap uses the global maximum for colorization
      // if activated: uses the data maximum within the current map boundaries
      //   (there will always be a red spot with useLocalExtremas true)
      "useLocalExtrema": true,
      // which field name in your data represents the latitude - default "lat"
      latField: 'lat',
      // which field name in your data represents the longitude - default "lng"
      lngField: 'lng',
      // which field name in your data represents the data value - default "value"
      valueField: 'count'
    };

    // var hm = heatmap
    // var heatMap = this.el.nativeElement.window.create(
    //   viewer, // your cesium viewer
    //   bounds, // bounds for heatmap layer
    //   cfg     // heatmapjs options
    // );
    
    // random example data
    let data = [{"x":LONG - 0.05,"y":LAT - 0.2,"value":76},{"x":LONG - .25,"y":LAT + .01,"value":63},{"x":147.138368102,"y":-41.4358360603,"value":1},{"x":147.1385627739,"y":-41.4358799123,"value":21},{"x":147.1385138501,"y":-41.4359327669,"value":28},{"x":147.1385031219,"y":-41.4359730105,"value":41},{"x":147.1384127393,"y":-41.435928255,"value":75},{"x":147.1384551136,"y":-41.4359450132,"value":3},{"x":147.1384927196,"y":-41.4359158649,"value":45},{"x":147.1384938639,"y":-41.4358498311,"value":45},{"x":147.1385183299,"y":-41.4360213794,"value":93},{"x":147.1384007925,"y":-41.4359860133,"value":46},{"x":147.1383604844,"y":-41.4358298672,"value":54},{"x":147.13851025,"y":-41.4359098303,"value":39},{"x":147.1383874733,"y":-41.4358511035,"value":34},{"x":147.1384981796,"y":-41.4359355403,"value":81},{"x":147.1384504107,"y":-41.4360332348,"value":39},{"x":147.1385582664,"y":-41.4359788335,"value":20},{"x":147.1383967364,"y":-41.4360581999,"value":35},{"x":147.1383839615,"y":-41.436016316,"value":47},{"x":147.1384082712,"y":-41.4358423338,"value":36},{"x":147.1385092651,"y":-41.4358577623,"value":69},{"x":147.138360356,"y":-41.436046789,"value":90},{"x":147.138471893,"y":-41.4359184292,"value":88},{"x":147.1385605689,"y":-41.4360271359,"value":81},{"x":147.1383585714,"y":-41.4359362476,"value":32},{"x":147.1384939114,"y":-41.4358844253,"value":67},{"x":147.138466724,"y":-41.436019121,"value":17},{"x":147.1385504355,"y":-41.4360614056,"value":49},{"x":147.1383883832,"y":-41.4358733544,"value":82},{"x":147.1385670669,"y":-41.4359650236,"value":25},{"x":147.1383416534,"y":-41.4359310876,"value":82},{"x":147.138525285,"y":-41.4359394661,"value":66},{"x":147.1385487719,"y":-41.4360137656,"value":73},{"x":147.1385496029,"y":-41.4359187277,"value":73},{"x":147.1383989222,"y":-41.4358556562,"value":61},{"x":147.1385499424,"y":-41.4359149305,"value":67},{"x":147.138404523,"y":-41.4359563326,"value":90},{"x":147.1383883675,"y":-41.4359794855,"value":78},{"x":147.1383967187,"y":-41.435891185,"value":15},{"x":147.1384610005,"y":-41.4359044797,"value":15},{"x":147.1384688489,"y":-41.4360396127,"value":91},{"x":147.1384431875,"y":-41.4360684409,"value":8},{"x":147.1385411067,"y":-41.4360645847,"value":42},{"x":147.1385237178,"y":-41.4358843181,"value":31},{"x":147.1384406464,"y":-41.4360003831,"value":51},{"x":147.1384679169,"y":-41.4359950456,"value":96},{"x":147.1384194314,"y":-41.4358419739,"value":22},{"x":147.1385049792,"y":-41.4359574813,"value":44},{"x":147.1384097378,"y":-41.4358598672,"value":82},{"x":147.1384993219,"y":-41.4360352975,"value":84},{"x":147.1383640499,"y":-41.4359839518,"value":81}];
    let valueMin = 0;
    let valueMax = 100;
    
    // add data to heatmap
    // heatMap.setWGS84Data(valueMin, valueMax, data);

    var citizensBankPark = viewer.entities.add({
      id: '1234',
      position : Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
      billboard : {
        image : 'assets/images/noun-social-services-620.png',
        width : 64,
        height : 64
      },
      label : {
        text : 'Citizens Bank Park',
        font : '14pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 2,
        verticalOrigin : Cesium.VerticalOrigin.TOP,
        pixelOffset : new Cesium.Cartesian2(0, 32)
      }
    });

    const LABEL_LAT = 40.4894;
    const LABEL_LONG = -127.2679;
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(LABEL_LONG, LABEL_LAT),
      label: {
        font: "30px Helvetica",
        text: "Funding < 100/Person ",
        fillColor: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE
      },
    });
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(LABEL_LONG, LABEL_LAT - 1),
      label: {
        font: "30px Helvetica",
        text: "Funding < 500/Person ",
        fillColor: Cesium.Color.ORANGE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE
      },
    });
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(LABEL_LONG, LABEL_LAT - 2),
      label: {
        font: "30px Helvetica",
        text: "Funding < 1200/Person",
        fillColor: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE
      },
    });
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(LABEL_LONG, LABEL_LAT - 3),
      label: {
        font: "30px Helvetica",
        text: "Funding < 3000/Person",
        fillColor: Cesium.Color.GREEN,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE
      },
    });
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(LABEL_LONG, LABEL_LAT - 4),
      label: {
        font: "30px Helvetica",
        text: "Funding > 3000/Person",
        fillColor: Cesium.Color.BLUE,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE
      },
    });

    let fundingRatioByCounty = new Map<string, any>();

    this.dataService.sendGetRequestShelters().subscribe((shelters: Shelters) => {
      shelters.shelters.forEach((shelter: Shelter) => {
        if (shelter.coordinates != undefined) {
          var aShelter = viewer.entities.add({
            id: shelter.shelter_name,
            position : Cesium.Cartesian3.fromDegrees(shelter.coordinates.lon, shelter.coordinates.lat),
            billboard : {
              image : 'assets/images/noun-social-services-620-w.png',
              width : 32,
              height : 32
            },
            // label : {
            //   text : 'Citizens Bank Park',
            //   font : '14pt monospace',
            //   style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            //   outlineWidth : 2,
            //   verticalOrigin : Cesium.VerticalOrigin.TOP,
            //   pixelOffset : new Cesium.Cartesian2(0, 32)
            // }
          });
          aShelter.description = "<h2>" + shelter.shelter_name + "</h2><h2>" + shelter.address + "</h2><h2>" + shelter.phone_number + "</h2>"
          // aShelter.addProperty("address");
          // aShelter.address = shelter.address;
          // aShelter.addProperty("phone");
          // aShelter.phone = shelter.phone_number;
          this.shelters.set(shelter.shelter_name, aShelter)
        }
      });
    });

    viewer.camera.moveEnd.addEventListener( () => {
      // console.log("Camera height: " + viewer.camera.positionCartographic.height)
      this.shelters.forEach((entity: any, id: string) => {
        if (viewer.camera.positionCartographic.height < 700000) {
          // add entity if it does not exist
          if (viewer.entities.getById(id) == undefined) {
            viewer.entities.add(entity)
          }
        } else {
          // remove entity
          if (viewer.entities.getById(id) != undefined) {
            viewer.entities.removeById(id)
          }
        }        
      })
    });
    this.dataService.sendGetRequestCocSummaries().subscribe((coc_summary: CocSummaries) => {
      if (coc_summary == null) {
        console.log('Instance is null or undefined');
      } else {
        coc_summary.coc_summaries.forEach((coc: Coc) => {
          coc.counties.forEach((county: string) => {
            // sum up funding by county
            let countyFunding = this.fundingByCounty.get(county);
            if (countyFunding == undefined) {
              countyFunding = 0;
            }
            countyFunding += coc.hud_grant_total;
            this.fundingByCounty.set(county, countyFunding)

            // sum up homeless count by county
            let countyHomeless = this.homelessByCounty.get(county);
            if (countyHomeless == undefined) {
              countyHomeless = 0;
            }
            countyHomeless += coc.total_homeless;
            this.homelessByCounty.set(county, countyHomeless)
          })
        });

        this.homelessByCounty.forEach((count: number, county: string) => {
          let funding = this.fundingByCounty.get(county);
          let homeless = this.homelessByCounty.get(county);
          if (homeless == undefined) {
            homeless = 0;
          }
          if (funding == undefined) {
            funding = 0;
          }
          let ratio = funding / homeless;
          if (ratio < 100) {
            fundingRatioByCounty.set(county, Cesium.Color.RED)
          } else if (ratio < 500) {
            fundingRatioByCounty.set(county, Cesium.Color.ORANGE)
          } else if (ratio < 1200) {
            fundingRatioByCounty.set(county, Cesium.Color.YELLOW)
          } else if (ratio < 3000) {
            fundingRatioByCounty.set(county, Cesium.Color.GREEN)
          } else {
            fundingRatioByCounty.set(county, Cesium.Color.BLUE)
          }
        });
      }

    
      fundingRatioByCounty.forEach((funding: any, county: string) => {
        const oc = new Cesium.Color(
          funding.red,
          funding.green,
          funding.blue, 0.33
        );
        viewer.dataSources.add(
          Cesium.GeoJsonDataSource.load(
            '../assets/cesium/generated/' + county.toLowerCase().replace(/ /g, "_") + '-data.geojson', 
            {
              stroke: Cesium.Color.WHITE,
              fill: oc,
              strokeWidth: 3,
              markerSymbol: county
            }
          )
        );
      });
    })

    //Add basic drag and drop functionality
    // viewer.extend(Cesium.viewerDragDropMixin);

    //Show a pop-up alert if we encounter an error when processing a dropped file
    // viewer.dropError.addEventListener(function(dropHandler, name, error) {
    //     console.log(error);
    //     window.alert(error);
    // });
  }  
}
