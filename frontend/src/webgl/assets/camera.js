/**
 * Three.js의 카메라 설정 파트
 */
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'

class Camera {
  constructor() {
    this.camera = new CinematicCamera(1000, 1, 1, 2000)

    this.setCamera()
  }

  setCamera() {
    this.camera.position.set(10, 10, 10)
  }

  get cameraElement() {
    return this.camera
  }
}

export { Camera }
