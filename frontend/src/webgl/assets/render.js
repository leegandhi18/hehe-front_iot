/**
 * Three.js의 렌더링 실행 파트
 */

class Render {
  constructor() {
    this.status = true
  }

  start() {
    this.status = window.requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
      this.controls.update()
      if (this.edukit && Object.keys(this.edukit).length === 7) {
        let yAxis = parseFloat(this.edukit.staticMesh1.position.y.toFixed(1))
        let nowyAxisMoterValue = this.normalization(8, 0.5, this.edukit.yAxis, 1).toFixed(1)
        if (yAxis < nowyAxisMoterValue) {
          this.edukit.staticMesh1.position.y += 0.05
          this.edukit.staticMesh2.position.y += 0.05
          this.edukit.staticMesh3.position.y += 0.05
        } else if (yAxis > nowyAxisMoterValue) {
          this.edukit.staticMesh1.position.y -= 0.05
          this.edukit.staticMesh2.position.y -= 0.05
          this.edukit.staticMesh3.position.y -= 0.05
        }

        let xAxis = parseFloat(this.edukit.staticMesh1.position.x.toFixed(1))
        let nowxAxisMoterValue = this.normalization(5, 10, this.edukit.xAxis, 2).toFixed(1)
        if (xAxis > nowxAxisMoterValue) {
          this.edukit.staticMesh1.position.x -= 0.015
          this.edukit.staticMesh2.rotation.z -= 0.0048
          this.edukit.staticMesh2.position.x -= 0.0055
          this.edukit.staticMesh2.position.z += 0.005
        } else if (xAxis < nowxAxisMoterValue) {
          this.edukit.staticMesh1.position.x += 0.015
          this.edukit.staticMesh2.rotation.z += 0.0048
          this.edukit.staticMesh2.position.x += 0.0055
          this.edukit.staticMesh2.position.z -= 0.005
        }

        let zAxis = parseFloat(this.edukit.staticMesh1.position.z.toFixed(1))
        let nowzAxisMoterValue = this.normalization(8, 2.6, this.edukit.xAxis, 2).toFixed(1)
        if (zAxis < nowzAxisMoterValue) {
          this.edukit.staticMesh1.position.z += 0.017
        } else if (zAxis > nowzAxisMoterValue) {
          this.edukit.staticMesh1.position.z -= 0.017
        }
      }
      this.start()
    })
  }

  stop() {
    window.cancelAnimationFrame(this.status)
  }

  status(value) {
    this.status = value
  }

  normalization(max, min, value, moterNumber) {
    const MAX_MOTER1 = 1301828 // yAxis Moter
    const MIN_MOTER1 = -27
    const MAX_MOTER2 = 25021563 // xAxis Moter
    const MIN_MOTER2 = -4375
    return moterNumber === 1
      ? ((max - min) * (value + MIN_MOTER1)) / (MAX_MOTER1 + MIN_MOTER1) + min
      : ((max - min) * (value + MIN_MOTER2)) / (MAX_MOTER2 + MIN_MOTER2) + min
  }
}

export { Render }
