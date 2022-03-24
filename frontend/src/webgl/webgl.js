/**
 * 모든 파트를 통합하는 메인 파일입니다
 * 매개변수: 3D 렌더링을 등록 할 Element Type Instance
 * 반환: 3D 렌더링이 등록된 Element Type Instance
*/
import { Scene } from "./assets/scene"
import { Renderer } from "./assets/renderer"
import { Control } from "./assets/control"
import { Render } from "./assets/render";
import { Event } from "./assets/event";

import { Gui } from "./plugins/gui"

export default async (element) => {
    element.style.width = "700px";
    element.style.height = "700px";

    // Scene Setting
    let scene = new Scene("edukit");
    let cameraElement = scene.camera.cameraElement;
    let sceneElement = scene.sceneElement;

    // Renderer Setting
    let renderer = new Renderer(element);
    let renderElement = renderer.domElement;
    let rendererElement = renderer.rendererElement;

    // Control Setting
    let control = new Control(cameraElement, renderElement);
    let controlElement = control.controlElement;
    
    // Render Setting
    let render = new Render;
    render.element = element;
    render.controls = controlElement;
    render.scene = sceneElement;
    render.edukit = scene.resource.edukit;
    render.camera = cameraElement;
    render.renderer = rendererElement;

    // Rendering Start
    render.start();

    // WebGL Context Lost Handling
    renderElement.addEventListener("webglcontextlost", event => {
        event.preventDefault();
        render.stop();
    }, false);

    // WebGL Context Restored Handling
    renderElement.addEventListener("webglcontextrestored", () => {
        render.start();
    }, false);

    // Dat.GUI Setting
    let gui = new Gui(element);
    let options = {
        "yAxis": -27,
        "xAxis": -4375,
    }
    gui.addOptions(options);
    gui.addFolder("Example");

    gui.addExample("yAxis", -27, 1301828, scene.resource.edukit);
    gui.addExample("xAxis", -4375, 25021563, scene.resource.edukit);

    // MQTT Event Setting
    new Event(element, scene.resource.edukit);

    return element;
}