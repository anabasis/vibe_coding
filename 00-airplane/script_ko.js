// 게임 상태 관리
let gameState = {
  isRunning: false,
  isPaused: false,
};

// Three.js 기본 설정
let scene, camera, renderer, airplane, controls;
let keys = {};

// 게임 설정
const GAME_CONFIG = {
  airplaneSpeed: 0.3,
  rotationSpeed: 0.02,
  cameraDistance: 10,
  cameraHeight: 5,
};

// 초기화 함수
function init() {
  // Three.js 장면 생성
  scene = new THREE.Scene();

  // 카메라 설정 (3인칭 시점)
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // 렌더러 설정
  const canvas = document.getElementById("gameCanvas");
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x87ceeb); // 밝은 파란색 하늘
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 조명 설정
  setupLighting();

  // 비행기 생성
  createAirplane();

  // 환경 생성 (구름, 땅)
  createEnvironment();

  // 카메라 위치 설정
  updateCamera();

  // 이벤트 리스너 설정
  setupEventListeners();

  // 게임 시작 버튼 이벤트
  document.getElementById("startButton").addEventListener("click", startGame);
}

// 조명 설정
function setupLighting() {
  // 환경광
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);

  // 방향광 (태양)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(50, 50, 50);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  scene.add(directionalLight);
}

// 비행기 생성 (카툰 스타일)
function createAirplane() {
  const airplaneGroup = new THREE.Group();

  // 비행기 몸체 (빨간색) - 카툰 스타일
  const bodyGeometry = new THREE.ConeGeometry(0.4, 3.5, 6);
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0;
  body.rotation.x = Math.PI / 2;
  body.castShadow = true;
  airplaneGroup.add(body);

  // 메인 날개 (노란색) - 카툰 스타일로 더 크게
  const wingGeometry = new THREE.BoxGeometry(5, 0.4, 1.5);
  const wingMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const wing = new THREE.Mesh(wingGeometry, wingMaterial);
  wing.position.set(0, 0, 0);
  wing.castShadow = true;
  airplaneGroup.add(wing);

  // 꼬리 날개 (수직 안정판)
  const tailGeometry = new THREE.BoxGeometry(0.3, 2, 0.4);
  const tailMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.position.set(-1.5, 0, 0);
  tail.castShadow = true;
  airplaneGroup.add(tail);

  // 수평 꼬리 날개
  const horizontalTailGeometry = new THREE.BoxGeometry(0.15, 2.5, 0.8);
  const horizontalTailMaterial = new THREE.MeshLambertMaterial({
    color: 0xffff00,
  });
  const horizontalTail = new THREE.Mesh(
    horizontalTailGeometry,
    horizontalTailMaterial
  );
  horizontalTail.position.set(-1.5, 0, 0);
  horizontalTail.castShadow = true;
  airplaneGroup.add(horizontalTail);

  // 프로펠러 (카툰 스타일)
  const propGeometry = new THREE.BoxGeometry(0.08, 1.5, 0.08);
  const propMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
  const propeller = new THREE.Mesh(propGeometry, propMaterial);
  propeller.position.set(1.8, 0, 0);
  airplaneGroup.add(propeller);

  // 비행기 초기 위치
  airplaneGroup.position.set(0, 5, 0);
  airplaneGroup.rotation.set(0, 0, 0);

  scene.add(airplaneGroup);
  airplane = airplaneGroup;
}

// 환경 생성 (구름, 땅)
function createEnvironment() {
  // 땅 생성 (초록색 평면)
  const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
  const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90ee90 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2;
  ground.receiveShadow = true;
  scene.add(ground);

  // 구름 생성
  createClouds();
}

// 구름 생성 (카툰 스타일)
function createClouds() {
  const cloudCount = 20;

  for (let i = 0; i < cloudCount; i++) {
    const cloud = createCloud();

    // 랜덤 위치 설정
    cloud.position.set(
      (Math.random() - 0.5) * 300,
      Math.random() * 25 + 15,
      (Math.random() - 0.5) * 300
    );

    // 랜덤 크기
    const scale = Math.random() * 2.5 + 1.5;
    cloud.scale.set(scale, scale, scale);

    scene.add(cloud);
  }
}

// 개별 구름 생성 (카툰 스타일)
function createCloud() {
  const cloudGroup = new THREE.Group();

  // 구름을 여러 개의 구로 구성
  const cloudGeometry = new THREE.SphereGeometry(1.2, 6, 4);
  const cloudMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9,
  });

  // 구름의 각 부분 (카툰 스타일로 더 둥글게)
  const parts = [
    { x: 0, y: 0, z: 0, scale: 1.2 },
    { x: 1.5, y: 0, z: 0, scale: 1 },
    { x: -1.5, y: 0, z: 0, scale: 1 },
    { x: 0, y: 1, z: 0, scale: 0.8 },
    { x: 0.8, y: 0.8, z: 0.8, scale: 0.6 },
    { x: -0.8, y: 0.8, z: -0.8, scale: 0.6 },
    { x: 0.5, y: 0.5, z: -0.5, scale: 0.5 },
    { x: -0.5, y: 0.5, z: 0.5, scale: 0.5 },
  ];

  parts.forEach((part) => {
    const cloudPart = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudPart.position.set(part.x, part.y, part.z);
    cloudPart.scale.set(part.scale, part.scale, part.scale);
    cloudGroup.add(cloudPart);
  });

  return cloudGroup;
}

// 카메라 업데이트 (3인칭 시점)
function updateCamera() {
  if (!airplane) return;

  // 비행기 뒤쪽에서 따라가는 카메라
  const airplanePosition = airplane.position;
  const airplaneRotation = airplane.rotation;

  // 카메라 목표 위치 계산
  const offset = new THREE.Vector3(
    -GAME_CONFIG.cameraDistance * Math.cos(airplaneRotation.y),
    GAME_CONFIG.cameraHeight,
    -GAME_CONFIG.cameraDistance * Math.sin(airplaneRotation.y)
  );

  const targetPosition = airplanePosition.clone().add(offset);

  // 카메라 위치를 부드럽게 이동
  camera.position.lerp(targetPosition, 0.1);

  // 카메라가 비행기를 바라보도록 설정
  camera.lookAt(airplanePosition);
}

// 이벤트 리스너 설정
function setupEventListeners() {
  // 키보드 이벤트
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // 윈도우 리사이즈 이벤트
  window.addEventListener("resize", onWindowResize);

  // 마우스 클릭으로 게임 포커스
  document.addEventListener("click", () => {
    if (gameState.isRunning) {
      document.body.requestPointerLock();
    }
  });
}

// 키 다운 이벤트
function onKeyDown(event) {
  keys[event.code] = true;

  // ESC 키로 일시정지
  if (event.code === "Escape") {
    togglePause();
  }
}

// 키 업 이벤트
function onKeyUp(event) {
  keys[event.code] = false;
}

// 윈도우 리사이즈 이벤트
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 게임 시작
function startGame() {
  gameState.isRunning = true;
  document.getElementById("instructions").classList.add("hidden");
  document.body.requestPointerLock();
  animate();
}

// 일시정지 토글
function togglePause() {
  gameState.isPaused = !gameState.isPaused;
  if (!gameState.isPaused) {
    animate();
  }
}

// 비행기 업데이트
function updateAirplane() {
  if (!airplane || !gameState.isRunning || gameState.isPaused) return;

  // 비행기 회전 (키보드 입력에 따라)
  if (keys["ArrowUp"]) {
    airplane.rotation.x += GAME_CONFIG.rotationSpeed;
  }
  if (keys["ArrowDown"]) {
    airplane.rotation.x -= GAME_CONFIG.rotationSpeed;
  }
  if (keys["ArrowLeft"]) {
    airplane.rotation.z += GAME_CONFIG.rotationSpeed;
  }
  if (keys["ArrowRight"]) {
    airplane.rotation.z -= GAME_CONFIG.rotationSpeed;
  }

  // 회전 제한
  airplane.rotation.x = Math.max(
    -Math.PI / 3,
    Math.min(Math.PI / 3, airplane.rotation.x)
  );
  airplane.rotation.z = Math.max(
    -Math.PI / 3,
    Math.min(Math.PI / 3, airplane.rotation.z)
  );

  // 비행기 전진 (항상 앞으로 이동)
  const forward = new THREE.Vector3(0, 0, GAME_CONFIG.airplaneSpeed);
  forward.applyQuaternion(airplane.quaternion);
  airplane.position.add(forward);

  // 비행기 자동 수평 복귀 (약간의 복원력)
  airplane.rotation.x *= 0.98;
  airplane.rotation.z *= 0.98;

  // 비행기 높이 제한
  airplane.position.y = Math.max(1, airplane.position.y);

  // 프로펠러 회전
  const propeller = airplane.children[4];
  if (propeller) {
    propeller.rotation.x += 0.6;
  }
}

// 애니메이션 루프
function animate() {
  if (!gameState.isRunning) return;

  requestAnimationFrame(animate);

  updateAirplane();
  updateCamera();

  renderer.render(scene, camera);
}

// 게임 초기화 실행
init();

