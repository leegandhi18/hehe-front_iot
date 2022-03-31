/**
 * Three.js의 컨트롤러 설정 파트
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Control {
  constructor(camera, domElement) {
    this.controls = new OrbitControls(camera, domElement)

    this.setControl()
  }

  setControl() {
    this.controls.minDistance = 30
    this.controls.maxDistance = 60
    this.controls.target.set(0, 0, 0)
    this.controls.enableDamping = true
  }

  get controlElement() {
    return this.controls
  }
}

export { Control }
