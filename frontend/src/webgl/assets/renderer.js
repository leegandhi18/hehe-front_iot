/**
 * Three.js의 렌더링 설정 파트
 */
import { WebGLRenderer } from 'three'

class Renderer {
  constructor(element) {
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true })

    this.setRenderer(element)
  }

  setRenderer(element) {
    this.renderer.setPixelRatio(1)
    this.renderer.shadowMap.enabled = true
    this.renderer.setSize(element.clientWidth || 600, element.clientHeight || 600)

    element.appendChild(this.renderer.domElement)
  }

  get domElement() {
    return this.renderer.domElement
  }

  get rendererElement() {
    return this.renderer
  }
}

export { Renderer }
