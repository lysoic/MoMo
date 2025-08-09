document.addEventListener('DOMContentLoaded', function() {
// Background music control for The Ashen Knight page
const backgroundMusic = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');

// 如果是Ashen Knight页面且背景音乐元素存在
if (backgroundMusic && window.location.pathname.includes('ashen-knight.html')) {
    backgroundMusic.volume = 0.5; // 设置音量为50%
    let isMusicPlaying = false;
    
    // 音乐控制按钮点击事件
    if (musicControl) {
        musicControl.addEventListener('click', function() {
            if (isMusicPlaying) {
                // 如果音乐正在播放，则暂停
                backgroundMusic.pause();
                musicControl.classList.remove('active');
                isMusicPlaying = false;
                console.log('音乐已暂停');
            } else {
                // 如果音乐未播放，则播放
                backgroundMusic.play().then(() => {
                    musicControl.classList.add('active');
                    isMusicPlaying = true;
                    console.log('音乐开始播放');
                }).catch(error => {
                    console.log('播放失败:', error);
                });
            }
        });
    }
    
    // 当用户离开页面时暂停音乐
    window.addEventListener('beforeunload', function() {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // 重置播放位置
        if (musicControl) {
            musicControl.classList.remove('active');
        }
        isMusicPlaying = false;
    });
}
    
    // Check if we're on the entrance page
    if (document.querySelector('.entrance-page')) {
        const entranceSymbol = document.querySelector('.entrance-symbol');
        
        entranceSymbol.addEventListener('click', function() {
            window.location.href = 'ashen-knight.html';
        });
    }
    
    // Chronicle page chapter functionality
    const chapters = document.querySelectorAll('.chapter');
    
    if (chapters.length > 0) {
        chapters.forEach(chapter => {
            const header = chapter.querySelector('.chapter-header');
            
            header.addEventListener('click', function() {
                chapter.classList.toggle('active');
            });
        });
    }
    
    // Quote carousel functionality
    const quoteText = document.getElementById('quote-text');
    if (quoteText) {
        const quotes = [
            "永生不灭，直至焚尽虚妄。",
            "你是上帝展示在我失明的眼睛前的音乐、天穹、宫殿、江河、天使、深沉的玫瑰，隐秘而没有穷期。",
            "I want you, lurching, staggering, bitterly weak in flesh and blood, to platitude me with breathless mouths.",
            "达斯菲尔成为人类骑士的第一步不是宣誓而是忘却自己的忠诚，地狱往事会伴随着她的人间之旅，一直。"
        ];
        
        let currentQuoteIndex = 0;
        const quoteIndicators = document.querySelectorAll('.quote-indicator');
        const quotePrev = document.querySelector('.quote-prev');
        const quoteNext = document.querySelector('.quote-next');
        
        // Function to type out the quote with typewriter effect
        function typeQuote(text, element) {
            element.textContent = '';
            element.classList.add('typewriter');
            
            let i = 0;
            const speed = 50; // typing speed in milliseconds
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Remove typewriter class when done typing
                    setTimeout(() => {
                        element.classList.remove('typewriter');
                    }, 500);
                }
            }
            
            type();
        }
        
        // Function to update active indicator
        function updateIndicators() {
            quoteIndicators.forEach((indicator, index) => {
                if (index === currentQuoteIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Initialize with first quote
        typeQuote(quotes[currentQuoteIndex], quoteText);
        
        // Previous quote button
        if (quotePrev) {
            quotePrev.addEventListener('click', function() {
                currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
                typeQuote(quotes[currentQuoteIndex], quoteText);
                updateIndicators();
            });
        }
        
        // Next quote button
        if (quoteNext) {
            quoteNext.addEventListener('click', function() {
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                typeQuote(quotes[currentQuoteIndex], quoteText);
                updateIndicators();
            });
        }
        
        // Indicator clicks
        quoteIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentQuoteIndex = index;
                typeQuote(quotes[currentQuoteIndex], quoteText);
                updateIndicators();
            });
        });
    }
    
    // Navigation functionality
    const navIcon = document.querySelector('.nav-icon');
    const navPanel = document.querySelector('.nav-panel');
    
    if (navIcon && navPanel) {
        navIcon.addEventListener('click', function() {
            navPanel.classList.toggle('open');
        });
        
        // Close navigation when clicking outside
        document.addEventListener('click', function(event) {
            if (!navPanel.contains(event.target) && !navIcon.contains(event.target)) {
                navPanel.classList.remove('open');
            }
        });
    }
    
    // World page navigation functionality
    const worldNavItems = document.querySelectorAll('.world-nav-item');
    const worldSections = document.querySelectorAll('.world-section');
    
    if (worldNavItems.length > 0) {
        worldNavItems.forEach(navItem => {
            navItem.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                
                // Remove active class from all nav items
                worldNavItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Remove active class from all sections
                worldSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Add active class to clicked nav item
                this.classList.add('active');
                
                // Show corresponding section
                const targetSection = document.getElementById(`${sectionId}-section`);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }
    
    // Gallery image description modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.querySelector('.image-modal');
    
    if (galleryItems.length > 0 && imageModal) {
        const modalImage = imageModal.querySelector('.modal-image img');
        const modalDescription = imageModal.querySelector('.modal-description p');
        const modalClose = imageModal.querySelector('.modal-close');
        
        // Open modal with image description
        galleryItems.forEach((item) => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const description = this.getAttribute('data-description') || '';
                
                modalImage.setAttribute('src', imgSrc);
                modalDescription.textContent = description;
                imageModal.classList.add('open');
            });
        });
        
        // Close modal
        modalClose.addEventListener('click', function() {
            imageModal.classList.remove('open');
        });
        
        // Close modal when clicking outside
        imageModal.addEventListener('click', function(event) {
            if (event.target === imageModal) {
                imageModal.classList.remove('open');
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && imageModal.classList.contains('open')) {
                imageModal.classList.remove('open');
            }
        });
    }
    
    // Tooltip functionality for Ashen Knight page
    const tooltipContainers = document.querySelectorAll('.weapon-info, .status-info');
    
    if (tooltipContainers.length > 0) {
        tooltipContainers.forEach(container => {
            const value = container.querySelector('.data-value');
            const tooltip = container.querySelector('.weapon-tooltip, .status-tooltip');
            
            if (value && tooltip) {
                value.addEventListener('mouseenter', function() {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                });
                
                value.addEventListener('mouseleave', function() {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                });
            }
        });
    }
    
    // Q&A Section functionality
    const options = document.querySelectorAll('.option');
    if (options.length > 0) {
        options.forEach(option => {
            option.addEventListener('click', function() {
                // 移除所有选项的选中状态
                options.forEach(opt => opt.classList.remove('selected'));
                
                // 添加当前选项的选中状态
                this.classList.add('selected');
                
                // 获取选项编号
                const optionNumber = this.getAttribute('data-option');
                
                // 隐藏所有答案
                const answers = document.querySelectorAll('.answer');
                answers.forEach(answer => {
                    answer.style.display = 'none';
                });
                
                // 显示选中的答案
                const selectedAnswer = document.getElementById(`answer-${optionNumber}`);
                if (selectedAnswer) {
                    selectedAnswer.style.display = 'block';
                }
            });
        });
    }
});
