
        // PLO Radar Chart
        function drawPLORadarChart() {
            const canvas = document.getElementById('ploRadarChart');
            const ctx = canvas.getContext('2d');
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 200;

            // PLO data
            const ploData = [
                { name: 'Engineering Knowledge', score: 1.00 },
                { name: 'Problem Analysis', score: 1.00 },
                { name: 'Design Solutions', score: 1.00 },
                { name: 'Investigation', score: 1.00 },
                { name: 'Modern Tools', score: 1.00 },
                { name: 'Engineer & Society', score: 1.00 },
                { name: 'Environment', score: 1.00 },
                { name: 'Ethics', score: 1.00 },
                { name: 'Teamwork', score: 1.00 },
                { name: 'Communication', score: 1.00 },
                { name: 'Project Management', score: 0.67 },
                { name: 'Lifelong Learning', score: 1.00 }
            ];

            const numPoints = ploData.length;
            const angleStep = (2 * Math.PI) / numPoints;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw background circles
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            for (let i = 1; i <= 5; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
                ctx.stroke();
            }

            // Draw axis lines and labels
            ctx.strokeStyle = '#d0d0d0';
            ctx.fillStyle = '#333';
            ctx.font = '12px Segoe UI';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let i = 0; i < numPoints; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                // Draw axis line
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.stroke();

                // Draw label
                const labelX = centerX + Math.cos(angle) * (radius + 25);
                const labelY = centerY + Math.sin(angle) * (radius + 25);
                
                // Split long labels
                const words = ploData[i].name.split(' ');
                if (words.length > 1) {
                    ctx.fillText(words[0], labelX, labelY - 8);
                    ctx.fillText(words.slice(1).join(' '), labelX, labelY + 8);
                } else {
                    ctx.fillText(ploData[i].name, labelX, labelY);
                }
            }

            // Draw score labels on circles
            ctx.fillStyle = '#999';
            ctx.font = '10px Segoe UI';
            for (let i = 1; i <= 5; i++) {
                const score = (i / 5).toFixed(1);
                ctx.fillText(score, centerX + 10, centerY - (radius * i) / 5);
            }

            // Draw data polygon
            ctx.beginPath();
            ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;

            for (let i = 0; i < numPoints; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const score = ploData[i].score;
                const x = centerX + Math.cos(angle) * (radius * score);
                const y = centerY + Math.sin(angle) * (radius * score);

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Draw data points
            ctx.fillStyle = '#667eea';
            for (let i = 0; i < numPoints; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const score = ploData[i].score;
                const x = centerX + Math.cos(angle) * (radius * score);
                const y = centerY + Math.sin(angle) * (radius * score);

                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fill();

                // Add score labels on points
                ctx.fillStyle = '#333';
                ctx.font = '10px Segoe UI';
                ctx.fillText(score.toFixed(2), x + 10, y - 10);
                ctx.fillStyle = '#667eea';
            }

            // Add title
            ctx.fillStyle = '#333';
            ctx.font = 'bold 16px Segoe UI';
            ctx.textAlign = 'center';
            ctx.fillText('PLO Radar Chart', centerX, 30);
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-menu a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Add animation delays for staggered effect
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.2}s`;
        });

        // Add scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe timeline items and project cards
        document.querySelectorAll('.timeline-item, .project-card, .plo-item').forEach(item => {
            observer.observe(item);
        });

        // Add hover effects for interactive elements
        document.querySelectorAll('.project-card, .timeline-content, .plo-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = this.style.transform || '';
                if (!this.style.transform.includes('scale')) {
                    this.style.transform += ' scale(1.02)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = this.style.transform.replace(' scale(1.02)', '');
            });
        });
    