import {IoElement, html} from "../lib/io.js";
import "../src/three-ui.js";
import {ThreeDemoScene} from "./scene.js";
import * as THREE from "../../three.js/build/three.module.js";

const scene = new ThreeDemoScene({path: 'demo/scene2/cubes2.glb'});
const camera = new THREE.PerspectiveCamera();
camera.fov = 60;
camera.position.set(1, 1, 1);
camera.lookAt(new THREE.Vector3(0, 0.75, 0));

export class ThreeDemo extends IoElement {
  static get style() {
    return html`
    <style>
      :host {
        display: block;
      }
      :host > div {
        display: flex;
        margin: var(--io-theme-spacing);
      }
      :host > three-viewport {
        display: flex;
        height: 100px;
      }
      :host > div > .label {
        display: inline-block;
        border: 1px solid transparent;
        padding: var(--io-theme-padding);
        padding-left: calc(3 * var(--io-theme-padding));
        padding-right: calc(3 * var(--io-theme-padding));
      }

    </style>
    `;
  }
  static get properties() {
    return {
      value: function() { return scene; }
    }
  }
  objectMutated(event) {
    // TODO: optimize
    this.$.renderer0.rendered = false;
    this.$.renderer1.rendered = false;
    this.$.renderer2.rendered = false;
    this.$.renderer3.rendered = false;
  }
  resized() {
    this.$.renderer0.rendered = false;
    this.$.renderer1.rendered = false;
    this.$.renderer2.rendered = false;
    this.$.renderer3.rendered = false;
  }
  constructor(props) {
    super(props);
    this.template([
      ['three-viewport', {id: 'renderer0', scene: scene, camera: camera}],
      ['three-viewport', {id: 'renderer1', scene: scene, camera: camera}],
      ['three-viewport', {id: 'renderer2', scene: scene, camera: camera}],
      ['three-viewport', {id: 'renderer3', scene: scene, camera: camera}],
      ['three-inspector', {value: this.bind('value')}],
    ]);
  }
}

ThreeDemo.Register();