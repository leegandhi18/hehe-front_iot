/**
 * Three.js의 카메라 설정 파트
 */
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'

class Camera {
  constructor() {
    // 두번째 param에서 카메라 가로세로 비율 작성
    this.camera = new CinematicCamera(1000, 1.6, 1, 2000)

    this.setCamera()
  }

  setCamera() {
    this.camera.position.set(5, 5, 10)
  }

  get cameraElement() {
    return this.camera
  }
}

export { Camera }
