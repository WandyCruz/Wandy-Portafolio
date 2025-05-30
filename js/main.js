let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function initSpace() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('space-canvas'), 
    alpha: true,
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];
  
  for (let i = 0; i < 800; i++) {
    vertices.push(
      (Math.random() - 0.5) * 1500,
      (Math.random() - 0.5) * 1500,
      (Math.random() - 0.5) * 1500
    );
    
    const intensity = Math.random() * 0.3 + 0.1;
    colors.push(intensity, intensity * 1.2, intensity * 1.5);
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  
  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  
  camera.position.z = 800;
  
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  
  animate();
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / windowHalfX;
  mouseY = (event.clientY - windowHalfY) / windowHalfY;
}

function animate() {
  requestAnimationFrame(animate);
  
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  particles.rotation.y = targetX * 0.5;
  particles.rotation.x = targetY * 0.5;

  particles.rotation.x += 0.002;
  particles.rotation.y += 0.003;
  
  renderer.render(scene, camera);
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section-container');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const sectionName = link.dataset.section;
      
      navLinks.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      link.classList.add('active');
      const targetSection = document.getElementById(`content-${sectionName}`);
      
      if (targetSection) {
        setTimeout(() => {
          targetSection.classList.add('active');
        }, 100);
      }
    });
  });
  
  navLinks[0].classList.add('active');
}

function handleResize() {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSpace();
  initNavigation();
  window.addEventListener('resize', handleResize);
});



  const floatProfile = document.getElementById('profile-float');
  const profileContent = document.getElementById('profile-content');

  floatProfile.addEventListener('mouseenter', () => {
    floatProfile.style.width = '12rem'; // 48 tailwind units = 12rem
    profileContent.style.opacity = '1';
    profileContent.style.pointerEvents = 'auto';
  });

  floatProfile.addEventListener('mouseleave', () => {
    floatProfile.style.width = '3.5rem'; // 14 tailwind units = 3.5rem
    profileContent.style.opacity = '0';
    profileContent.style.pointerEvents = 'none';
  });


      