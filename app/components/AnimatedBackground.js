'use client';
import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let manaParticles = [];
    let systemParticles = [];
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    // Mana particle class - appears and disappears like in Solo Leveling
    class ManaParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1.5;
        this.baseSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.life = 1.0;
        this.decay = Math.random() * 0.003 + 0.001;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.type = Math.random() < 0.7 ? 'blue' : 'cyan';
        this.glowIntensity = Math.random() * 0.4 + 0.3;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.rotation = 0;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.rotation += this.rotationSpeed;
        
        // Pulsing effect
        this.pulsePhase += this.pulseSpeed;
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
        this.size = this.baseSize * pulse * this.life;
        
        // Slow down over time more gradually
        this.speedX *= 0.998;
        this.speedY *= 0.998;
      }

      draw() {
        if (this.life <= 0) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        const alpha = this.life * this.glowIntensity;
        const color = this.type === 'blue' ? '0, 150, 255' : '0, 255, 255';
        
        // Outer glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 3);
        gradient.addColorStop(0, `rgba(${color}, ${alpha * 0.8})`);
        gradient.addColorStop(0.3, `rgba(${color}, ${alpha * 0.4})`);
        gradient.addColorStop(0.7, `rgba(${color}, ${alpha * 0.2})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Inner core - diamond shape for mana crystal look
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size * 0.7, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size * 0.7, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
        
        // Bright center
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.fill();
        
        ctx.restore();
      }

      isDead() {
        return this.life <= 0;
      }
    }

    // System UI particle class - small floating data bits
    class SystemParticle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.baseOpacity = this.opacity;
        this.drift = Math.random() * 0.2 + 0.05;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX + Math.sin(time * this.drift + this.phase) * 0.05;
        this.y += this.speedY + Math.cos(time * this.drift * 0.8 + this.phase) * 0.04;
        
        // Boundary wrapping
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        
        // Subtle opacity pulse
        this.opacity = this.baseOpacity * (0.7 + 0.3 * Math.sin(time * 0.3 + this.phase));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, ${this.opacity})`;
        ctx.fill();
        
        // Tiny glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 200, 255, ${this.opacity * 0.3})`;
        ctx.fill();
      }
    }

    // Initialize particles
    const initializeParticles = () => {
      manaParticles = [];
      systemParticles = [];
      
      // System particles - always present
      const systemCount = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 60);
      for (let i = 0; i < systemCount; i++) {
        systemParticles.push(new SystemParticle());
      }
    };

    // Spawn mana particles randomly
    const spawnManaParticle = () => {
      if (manaParticles.length < 20 && Math.random() < 0.15) {
        manaParticles.push(new ManaParticle());
      }
    };

    // Main animation loop
    const animate = () => {
      time += 0.015;
      
      // Clear canvas with pure black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw system particles
      systemParticles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Draw connections between nearby particles
        for (let j = index + 1; j < systemParticles.length; j++) {
          const other = systemParticles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            const opacity = (80 - distance) / 80 * 0.1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      // Spawn and update mana particles
      spawnManaParticle();
      
      manaParticles = manaParticles.filter(particle => {
        particle.update();
        particle.draw();
        return !particle.isDead();
      });
      
      // Add occasional system glitches/flashes - much more subtle
      if (Math.random() < 0.003) {
        const flashX = Math.random() * canvas.width;
        const flashY = Math.random() * canvas.height;
        const flashSize = Math.random() * 8 + 3;
        
        ctx.beginPath();
        ctx.arc(flashX, flashY, flashSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${Math.random() * 0.1 + 0.02})`;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    resizeCanvas();
    animate();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Blurred gradient background */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background: "linear-gradient(135deg, #000000 40%, rgba(0,100,200,0.3) 84%, rgba(0,150,255,0.2) 100%)",
          filter: "blur(40px)",
          transition: "background 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden="true"
      />
      
      {/* Animated canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{
          mixBlendMode: 'screen',
          opacity: 0.8
        }}
        aria-hidden="true"
      />
      
      {/* Subtle overlay for depth */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0.5) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
