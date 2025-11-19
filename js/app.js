document.addEventListener('DOMContentLoaded', () => {
    // ===================== إعدادات البريد الإلكتروني =====================
    const EMAIL_CONFIG = {
        serviceEmail: 'your-business@email.com',
        adminEmail: 'admin@yourbusiness.com', 
        whatsappNumber: '201234567890'
    };

    // ===================== تخزين البيانات =====================
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

    // ===================== 1. وظيفة شاشة التحميل (Preloader) =====================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }

    // ===================== 2. وظيفة قائمة الموبايل الجانبية (Mobile Navigation) =====================
    const navToggle = document.getElementById('nav-toggle');
    const closeBtn = document.getElementById('close-btn');
    const mobileMenu = document.getElementById('mobile-nav-menu');

    if (navToggle && mobileMenu && closeBtn) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ===================== 3. وظيفة البانر الرئيسي (Main Banner Slider) =====================
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevMainBtn = document.getElementById('prev-btn');
    const nextMainBtn = document.getElementById('next-btn');

    const imageSources = [
        './images/Sample.jpg',
        './images/Sample.jpg',
        './images/Sample.jpg',
        './images/Sample.jpg',
        './images/Sample.jpg'
    ];
    let currentMainIndex = 0;

    function updateMainImage(index) {
        if (index >= 0 && index < imageSources.length) {
            mainImage.style.opacity = 0;

            setTimeout(() => {
                mainImage.src = imageSources[index];
                
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnails[index].classList.add('active');
                
                mainImage.style.opacity = 1;
                currentMainIndex = index;
            }, 300);
        }
    }

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                updateMainImage(index);
            });
        });

        prevMainBtn.addEventListener('click', () => {
            const newIndex = (currentMainIndex - 1 + imageSources.length) % imageSources.length;
            updateMainImage(newIndex);
        });

        nextMainBtn.addEventListener('click', () => {
            const newIndex = (currentMainIndex + 1) % imageSources.length;
            updateMainImage(newIndex);
        });
    }

    // ===================== 4. وظيفة سلايدر المنتجات الأصلية =====================
    function initializeOriginalSlider() {
        const slider = document.getElementById('product-slider');
        const prevProductBtn = document.getElementById('prev-product-btn');
        const nextProductBtn = document.getElementById('next-product-btn');
        const productCards = document.querySelectorAll('#product-slider .product-card');

        if (slider && productCards.length > 0) {
            let currentIndex = 0;
            const totalCards = productCards.length;
            
            function getCardsPerView() {
                const container = document.querySelector('#products .product-slider-container');
                if (!container) return 4;
                const containerWidth = container.offsetWidth;
                if (containerWidth < 350) return 1;
                if (containerWidth < 550) return 2;
                if (containerWidth < 800) return 3;
                return 4;
            }

            function updateSliderPosition() {
                if (productCards.length === 0) return;
                
                const cardWidth = productCards[0].offsetWidth + 20;
                slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }

            window.addEventListener('resize', updateSliderPosition);
            setTimeout(updateSliderPosition, 100);

            if (prevProductBtn) {
                prevProductBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateSliderPosition();
                    }
                });
            }

            if (nextProductBtn) {
                nextProductBtn.addEventListener('click', () => {
                    const currentCardsPerView = getCardsPerView();
                    if (currentIndex < totalCards - currentCardsPerView) {
                        currentIndex++;
                        updateSliderPosition();
                    }
                });
            }
        }
    }

    // ===================== 5. وظيفة السلايدر الجديدة =====================
    function initializeNewSlider() {
        const newSlider = document.getElementById('new-product-slider');
        const prevNewBtn = document.getElementById('prev-new-btn');
        const nextNewBtn = document.getElementById('next-new-btn');
        const newProductCards = document.querySelectorAll('#new-product-slider .product-card');

        if (newSlider && newProductCards.length > 0) {
            let newCurrentIndex = 0;
            const newTotalCards = newProductCards.length;
            
            function getNewCardsPerView() {
                const container = document.querySelector('#new-products .product-slider-container');
                if (!container) return 4;
                const containerWidth = container.offsetWidth;
                if (containerWidth < 350) return 1;
                if (containerWidth < 550) return 2;
                if (containerWidth < 800) return 3;
                return 4;
            }

            function updateNewSliderPosition() {
                if (newProductCards.length === 0) return;
                
                const cardWidth = newProductCards[0].offsetWidth + 20;
                newSlider.style.transform = `translateX(-${newCurrentIndex * cardWidth}px)`;
            }

            window.addEventListener('resize', updateNewSliderPosition);
            setTimeout(updateNewSliderPosition, 100);

            if (prevNewBtn) {
                prevNewBtn.addEventListener('click', () => {
                    if (newCurrentIndex > 0) {
                        newCurrentIndex--;
                        updateNewSliderPosition();
                    }
                });
            }

            if (nextNewBtn) {
                nextNewBtn.addEventListener('click', () => {
                    const currentCardsPerView = getNewCardsPerView();
                    if (newCurrentIndex < newTotalCards - currentCardsPerView) {
                        newCurrentIndex++;
                        updateNewSliderPosition();
                    }
                });
            }
        }
    }

    // ===================== 6. تفاعل أيقونات الكروت (القلب والسلة) =====================
    
    function initializeProductInteractions() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = btn.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                
                const productCard = btn.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                const productCategory = productCard.querySelector('.product-category').textContent;
                const productImage = productCard.querySelector('img').src;
                
                if (icon.classList.contains('fas')) {
                    addToFavorites(productName, productPrice, productCategory, productImage);
                    showNotification(`Added ${productName} to favorites`);
                } else {
                    removeFromFavorites(productName);
                    showNotification(`Removed ${productName} from favorites`);
                }
            });
        });

        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productCard = btn.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent;
                const productCategory = productCard.querySelector('.product-category').textContent;
                const productImage = productCard.querySelector('img').src;
                
                addToCart(productName, productPrice, productCategory, productImage);
                showNotification(`Added ${productName} to cart`);
            });
        });

        // فتح صفحة المنتج عند الضغط على الكارد
        const allProductCards = document.querySelectorAll('.product-card');
        allProductCards.forEach(card => {
            card.addEventListener('click', () => {
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.product-price').textContent;
                const productCategory = card.querySelector('.product-category').textContent;
                const productImage = card.querySelector('img').src;
                
                openProductModal(productName, productPrice, productCategory, productImage);
            });
        });
    }

    // ===================== 7. فتح صفحة السلة عند الضغط على أيقونة السلة في النافبار =====================
    const cartIcons = document.querySelectorAll('.icon-btn[aria-label="Shopping Cart"], .mobile-icon-link:has(i.fa-shopping-cart)');
    cartIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            openCartModal();
        });
    });

    // ===================== 8. فتح صفحة المفضلة عند الضغط على أيقونة القلب في النافبار =====================
    const favoriteIcons = document.querySelectorAll('.icon-btn[aria-label="Favorites"], .mobile-icon-link:has(i.fa-heart)');
    favoriteIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            openFavoritesModal();
        });
    });

    // ===================== 9. معالجة نموذج الاشتراك =====================
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            const email = sanitizeInput(emailInput.value);
            
            if (validateEmail(email)) {
                sendSubscriptionEmail(email);
                showNotification('Thank you for subscribing to our newsletter');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // ===================== 10. زر العودة إلى الأعلى =====================
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================== 11. وظائف مساعدة =====================

    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4444' : '#88A369'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    function addToCart(name, price, category, image) {
        const priceNumber = parseInt(price.replace(' EGP', '').replace(',', ''));
        
        const existingItem = cartItems.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.total = existingItem.quantity * existingItem.price;
        } else {
            cartItems.push({
                name: sanitizeInput(name),
                price: priceNumber,
                category: sanitizeInput(category),
                image: image,
                quantity: 1,
                total: priceNumber
            });
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCounter();
    }

    function addToFavorites(name, price, category, image) {
        const priceNumber = parseInt(price.replace(' EGP', '').replace(',', ''));
        
        favoriteItems.push({
            name: sanitizeInput(name),
            price: priceNumber,
            category: sanitizeInput(category),
            image: image
        });
        
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
        updateFavoritesCounter();
    }

    function removeFromFavorites(name) {
        favoriteItems = favoriteItems.filter(item => item.name !== name);
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
        updateFavoritesCounter();
        updateFavoriteButtons();
    }

    function updateFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(btn => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const icon = btn.querySelector('i');
            
            const isFavorite = favoriteItems.some(item => item.name === productName);
            if (isFavorite) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    }

    function updateCartCounter() {
        const cartCounters = document.querySelectorAll('.cart-counter');
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        cartCounters.forEach(counter => {
            counter.textContent = totalItems;
            counter.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }

    function updateFavoritesCounter() {
        const favoriteCounters = document.querySelectorAll('.favorite-counter');
        const totalItems = favoriteItems.length;
        
        favoriteCounters.forEach(counter => {
            counter.textContent = totalItems;
            counter.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }

    function calculateCartTotal() {
        return cartItems.reduce((total, item) => total + item.total, 0);
    }

    function sendSubscriptionEmail(email) {
        sendToServer('subscription', { email: email });
    }

    function sendOrderEmail(orderDetails) {
        const orderData = {
            customer_name: sanitizeInput(orderDetails.name),
            customer_email: sanitizeInput(orderDetails.email),
            customer_phone: sanitizeInput(orderDetails.phone),
            customer_address: sanitizeInput(orderDetails.address),
            order_total: orderDetails.total,
            order_items: orderDetails.items.map(item => ({
                name: sanitizeInput(item.name),
                quantity: item.quantity,
                price: item.price,
                total: item.total
            }))
        };
        
        sendToServer('order', orderData);
        showNotification('Your order has been sent successfully! We will contact you soon.');
    }

    function sendWhatsAppOrder(orderDetails) {
        let message = `New Order\n\n`;
        message += `Name: ${sanitizeInput(orderDetails.name)}\n`;
        message += `Email: ${sanitizeInput(orderDetails.email)}\n`;
        message += `Phone: ${sanitizeInput(orderDetails.phone)}\n`;
        message += `Address: ${sanitizeInput(orderDetails.address)}\n\n`;
        message += `Items:\n`;
        
        orderDetails.items.forEach(item => {
            message += `- ${sanitizeInput(item.name)} (${item.quantity} x ${item.price} EGP) = ${item.total} EGP\n`;
        });
        
        message += `\nTotal: ${orderDetails.total} EGP`;
        
        const whatsappUrl = `https://wa.me/${EMAIL_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    function sendToServer(type, data) {
        const timestamp = new Date().toISOString();
        const storageKey = `nefertour_${type}_${timestamp}`;
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    function openProductModal(name, price, category, image) {
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const isFavorite = favoriteItems.some(item => item.name === name);
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
                <button class="close-modal" style="float: right; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <img src="${image}" alt="${name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
                <h2>${sanitizeInput(name)}</h2>
                <p>${sanitizeInput(category)}</p>
                <p style="font-size: 1.5rem; font-weight: bold; margin: 15px 0;">${price}</p>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="add-to-cart-modal" style="flex: 1; padding: 12px; background: #88A369; color: white; border: none; border-radius: 5px; cursor: pointer;">Add to Cart</button>
                    <button class="favorite-modal" style="padding: 12px 20px; background: none; border: 1px solid #88A369; border-radius: 5px; cursor: pointer; color: ${isFavorite ? '#B35858' : '#88A369'}">
                        ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.add-to-cart-modal').addEventListener('click', () => {
            addToCart(name, price, category, image);
            showNotification(`Added ${name} to cart`);
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.favorite-modal').addEventListener('click', () => {
            const favoriteBtn = modal.querySelector('.favorite-modal');
            if (favoriteBtn.textContent === 'Add to Favorites') {
                addToFavorites(name, price, category, image);
                favoriteBtn.textContent = 'Remove from Favorites';
                favoriteBtn.style.color = '#B35858';
                showNotification(`Added ${name} to favorites`);
            } else {
                removeFromFavorites(name);
                favoriteBtn.textContent = 'Add to Favorites';
                favoriteBtn.style.color = '#88A369';
                showNotification(`Removed ${name} from favorites`);
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    function openCartModal() {
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const total = calculateCartTotal();
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <button class="close-modal" style="float: right; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="margin-bottom: 20px;">Shopping Cart</h2>
                <div class="cart-items">
                    ${cartItems.length === 0 ? 
                        '<p style="text-align: center; padding: 20px;">Your cart is empty</p>' : 
                        cartItems.map(item => `
                            <div style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #eee;">
                                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
                                <div style="flex: 1;">
                                    <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                                    <p style="margin: 0; color: #666; font-size: 0.9rem;">${item.category}</p>
                                    <p style="margin: 5px 0; font-weight: bold;">${item.price} EGP</p>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <button class="decrease-quantity" data-name="${item.name}" style="background: #f0f0f0; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="increase-quantity" data-name="${item.name}" style="background: #f0f0f0; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">+</button>
                                    <button class="remove-item" data-name="${item.name}" style="background: none; border: none; color: #ff4444; cursor: pointer; margin-left: 10px;">✕</button>
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
                <div class="cart-total" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                    <p style="font-size: 1.2rem; font-weight: bold;">Total: ${total} EGP</p>
                    ${cartItems.length > 0 ? `
                        <button class="checkout-btn" style="margin-top: 15px; padding: 12px 30px; background: #88A369; color: white; border: none; border-radius: 5px; cursor: pointer;">Checkout</button>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', () => {
                const productName = btn.getAttribute('data-name');
                const item = cartItems.find(item => item.name === productName);
                if (item) {
                    item.quantity += 1;
                    item.total = item.quantity * item.price;
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartCounter();
                    refreshCartModal();
                }
            });
        });
        
        modal.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', () => {
                const productName = btn.getAttribute('data-name');
                const item = cartItems.find(item => item.name === productName);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    item.total = item.quantity * item.price;
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartCounter();
                    refreshCartModal();
                }
            });
        });
        
        modal.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const productName = btn.getAttribute('data-name');
                cartItems = cartItems.filter(item => item.name !== productName);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCartCounter();
                refreshCartModal();
            });
        });
        
        const checkoutBtn = modal.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
                openCheckoutModal();
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    function refreshCartModal() {
        const existingModal = document.querySelector('.cart-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
            openCartModal();
        }
    }

    function openFavoritesModal() {
        const modal = document.createElement('div');
        modal.className = 'favorites-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
                <button class="close-modal" style="float: right; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="margin-bottom: 20px;">Favorites</h2>
                <div class="favorites-items">
                    ${favoriteItems.length === 0 ? 
                        '<p style="text-align: center; padding: 20px;">No favorite items</p>' : 
                        favoriteItems.map(item => `
                            <div style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #eee;">
                                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
                                <div style="flex: 1;">
                                    <h4 style="margin: 0 0 5px 0;">${item.name}</h4>
                                    <p style="margin: 0; color: #666; font-size: 0.9rem;">${item.category}</p>
                                    <p style="margin: 5px 0; font-weight: bold;">${item.price} EGP</p>
                                </div>
                                <div style="display: flex; gap: 10px;">
                                    <button class="add-to-cart-from-fav" data-name="${item.name}" data-price="${item.price}" data-category="${item.category}" data-image="${item.image}" style="background: #88A369; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Add to Cart</button>
                                    <button class="remove-from-fav" data-name="${item.name}" style="background: none; border: none; color: #ff4444; cursor: pointer;">✕</button>
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelectorAll('.add-to-cart-from-fav').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                const price = btn.getAttribute('data-price');
                const category = btn.getAttribute('data-category');
                const image = btn.getAttribute('data-image');
                
                addToCart(name, price, category, image);
                showNotification(`Added ${name} to cart`);
            });
        });
        
        modal.querySelectorAll('.remove-from-fav').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                removeFromFavorites(name);
                refreshFavoritesModal();
            });
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    function refreshFavoritesModal() {
        const existingModal = document.querySelector('.favorites-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
            openFavoritesModal();
        }
    }

    function openCheckoutModal() {
        const modal = document.createElement('div');
        modal.className = 'checkout-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
        `;
        
        const total = calculateCartTotal();
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 90%;">
                <button class="close-modal" style="float: right; background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                <h2 style="margin-bottom: 20px;">Checkout</h2>
                <form id="checkout-form">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px;">Full Name *</label>
                        <input type="text" name="name" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px;">Email Address *</label>
                        <input type="email" name="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px;">Phone Number *</label>
                        <input type="tel" name="phone" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px;">Delivery Address *</label>
                        <textarea name="address" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; height: 80px;"></textarea>
                    </div>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 0; font-weight: bold; text-align: center;">Total: ${total} EGP</p>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button type="submit" class="submit-order" style="flex: 1; padding: 12px; background: #88A369; color: white; border: none; border-radius: 5px; cursor: pointer;">Place Order</button>
                        <button type="button" class="whatsapp-order" style="flex: 1; padding: 12px; background: #25D366; color: white; border: none; border-radius: 5px; cursor: pointer;">WhatsApp Order</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('#checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const orderDetails = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                total: total,
                items: cartItems
            };
            
            sendOrderEmail(orderDetails);
            document.body.removeChild(modal);
            
            cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCounter();
        });
        
        modal.querySelector('.whatsapp-order').addEventListener('click', () => {
            const form = modal.querySelector('#checkout-form');
            const formData = new FormData(form);
            const orderDetails = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                total: total,
                items: cartItems
            };
            
            sendWhatsAppOrder(orderDetails);
            document.body.removeChild(modal);
            
            cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCounter();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // ===================== تهيئة جميع المكونات =====================
    initializeOriginalSlider();
    initializeNewSlider();
    initializeProductInteractions();
    updateCartCounter();
    updateFavoritesCounter();
    updateFavoriteButtons();
});