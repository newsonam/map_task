
'use client'

import { useEffect, useRef, useState } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from "ol/layer/Tile";
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from "ol/proj";
import 'ol/ol.css';
import { Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import Draw from 'ol/interaction/Draw.js';


const BaseMap = (props: any, { children }: any) => {
  const { center, zoom } = props;
  const mapElement: any = useRef();
  const typeSelect: any = useRef();
  const measure: any = useRef();


  const baseLayer = new TileLayer(
    {
      source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        crossOrigin: 'anonymous',
      })
    });

  const raster = new TileLayer({
    source: new OSM(),
  });

  const source = new VectorSource({ wrapX: false });

  const vector = new VectorLayer({
    source: source,
  });

  // when component is mounted initially , initial map is shown
  let initialmap: any;
  useEffect(() => {
    initialmap = new Map({
      target: mapElement.current,
      layers: [
        baseLayer, raster, vector
      ],
      view: new View({
        center: fromLonLat(center),
        zoom: (zoom)
      })
    });

    initialmap.updateSize();
  

    addInteraction();
    return () => {
      initialmap.dispose(); // Dispose the map when the component unmounts to prevent memory leaks
    };


  }, []);

  let draw: any; // global variable for draw

  // this function manages drawing different geometry types like point , linestring , polygon ,and circle on the map
  function addInteraction() {
    const value = typeSelect.current.value;
    if (value !== 'None') {
      draw = new Draw({
        source: source,
        type: typeSelect.current.value,

      });
      initialmap.addInteraction(draw);
    }
  }

  // select element onchange event handler
  const handleChange = () => {
    initialmap.removeInteraction(draw);
    addInteraction();
  }



  return (
    <>
      <div className="input-group">
        <label className="input-group-text" htmlFor="type">Geometry type:</label>
        {/* select element to change geometry types */}
        <select className="form-select" id="type" ref={typeSelect} onChange={handleChange}>
          <option value="Point">Point</option>
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
          <option value="None">None</option>
        </select>

      </div>
      <div id="map" ref={mapElement}> {children} </div>
    </>

  )

}
export default BaseMap;