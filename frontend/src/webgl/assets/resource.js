/**
 * 3D 모델 파일 가져오는 파트
 **/

import { Group } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import * as THREE from 'three'

class Resource {
  constructor(file) {
    this.loader = new FBXLoader()
    this.obj = new Group()

    this.edukit = {}
    this.setResource(file)
  }

  setResource(file) {
    if (!file) {
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({ color: 0x0a0ffa })
      const cube = new THREE.Mesh(geometry, material)

      if (cube.isMesh) {
        cube.castShadow = true
        cube.receiveShadow = true
      }

      this.obj.add(cube)
    } else if (file === 'edukit') {
      this.loader.load('fbx/body.FBX', object => {
        let obj = (this.edukit.body = object)
        obj.name = 'body'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.0005

        obj.position.x -= 15

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.loader.load('fbx/StaticMesh1.FBX', object => {
        // 3호기 집게
        let obj = (this.edukit.staticMesh1 = object)
        obj.name = 'StaticMesh1'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.5

        obj.position.x = 10
        obj.position.y = 0.5
        obj.position.z = 2.6

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -160 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.loader.load('fbx/StaticMesh2.FBX', object => {
        // 3호기 집게 축
        let obj = (this.edukit.staticMesh2 = object)
        obj.name = 'StaticMesh2'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.5

        obj.position.x = 6.7
        obj.position.y = -1.3
        obj.position.z = 2.8

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -10 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.loader.load('fbx/StaticMesh3.FBX', object => {
        // 3호기 Y축
        let obj = (this.edukit.staticMesh3 = object)
        obj.name = 'StaticMesh3'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.5

        obj.position.x = 5
        obj.position.z = 1.4

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -170 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.loader.load('fbx/StaticMesh4.FBX', object => {
        // 3호기 몸체
        let obj = (this.edukit.staticMesh4 = object)
        obj.name = 'StaticMesh4'

        obj.scale.x = obj.scale.y = obj.scale.z = 0.5

        obj.position.x = 5

        obj.rotation.x = -90 * (Math.PI / 180)
        obj.rotation.z = -170 * (Math.PI / 180)

        obj.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        if (obj) this.obj.add(obj)
      })

      this.edukit.yAxis = -27
      this.edukit.xAxis = -4375
    }
  }

  setRotationAlign() {}
}

export { Resource }
