import { Directive, ElementRef, OnInit } from '@angular/core';
// import { Viewer } from 'cesium';
// import { Ion } from "cesium";
import { DataService } from './data.service';
import { CocSummaries } from './CocSummaries';
import { Coc } from './Coc';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  countyMap = new Map<string, string[]>();
  fundingByCounty = new Map<string, number>();
  homelessByCounty = new Map<string, number>();

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
          console.log(county)
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

      console.log(fundingRatioByCounty)
    
      fundingRatioByCounty.forEach((funding: any, county: string) => {
        console.log('../assets/cesium/generated/' + county.toLowerCase().replace(/ /g, "_") + '-data.geojson')
        const oc = new Cesium.Color(
          funding.red,
          funding.green,
          funding.blue, 0.5
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
