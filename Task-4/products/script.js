// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        category: "electronics",
        price: 99.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop"
    },
    {
        id: 2,
        title: "Smart Watch",
        category: "electronics",
        price: 199.99,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop"
    },
    {
        id: 3,
        title: "Cotton T-Shirt",
        category: "clothing",
        price: 24.99,
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=300&fit=crop"
    },
    {
        id: 4,
        title: "Denim Jeans",
        category: "clothing",
        price: 59.99,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=300&fit=crop"
    },
    {
        id: 5,
        title: "Programming Book",
        category: "books",
        price: 39.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=300&fit=crop"
    },
    {
        id: 6,
        title: "Laptop",
        category: "electronics",
        price: 899.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop"
    },
    {
        id: 7,
        title: "Running Shoes",
        category: "clothing",
        price: 79.99,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=300&fit=crop"
    },
    {
        id: 8,
        title: "Cookbook",
        category: "books",
        price: 29.99,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=300&fit=crop"
    }
];

class ProductList {
    constructor() {
        this.products = products;
        this.filteredProducts = [...products];
        this.currentPage = 1;
        this.productsPerPage = 6;
        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        this.productsGrid = document.getElementById('productsGrid');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.priceFilter = document.getElementById('priceFilter');
        this.sortFilter = document.getElementById('sortFilter');
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.pageInfo = document.getElementById('pageInfo');
    }

    attachEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        this.categoryFilter.addEventListener('change', () => this.applyFilters());
        this.priceFilter.addEventListener('change', () => this.applyFilters());
        this.sortFilter.addEventListener('change', () => this.applyFilters());
        this.prevPageBtn.addEventListener('click', () => this.changePage(-1));
        this.nextPageBtn.addEventListener('click', () => this.changePage(1));
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        this.filteredProducts = this.products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        this.currentPage = 1;
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.products];

        // Apply category filter
        const category = this.categoryFilter.value;
        if (category !== 'all') {
            filtered = filtered.filter(product => product.category === category);
        }

        // Apply price filter
        const priceRange = this.priceFilter.value;
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(product => {
                if (max) {
                    return product.price >= min && product.price <= max;
                } else {
                    return product.price >= min;
                }
            });
        }

        // Apply search filter
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.title.toLowerCase().includes(searchTerm)
            );
        }

        // Apply sorting
        const sortBy = this.sortFilter.value;
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
        }

        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.render();
    }

    changePage(delta) {
        const newPage = this.currentPage + delta;
        const maxPage = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        if (newPage >= 1 && newPage <= maxPage) {
            this.currentPage = newPage;
            this.render();
        }
    }

    render() {
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        this.productsGrid.innerHTML = '';
        productsToShow.forEach(product => {
            const productCard = this.createProductCard(product);
            this.productsGrid.appendChild(productCard);
        });

        // Update pagination
        const maxPage = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        this.pageInfo.textContent = `Page ${this.currentPage} of ${maxPage}`;
        this.prevPageBtn.disabled = this.currentPage === 1;
        this.nextPageBtn.disabled = this.currentPage === maxPage;
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const stars = '★'.repeat(Math.floor(product.rating)) + 
                     (product.rating % 1 ? '½' : '') + 
                     '☆'.repeat(5 - Math.ceil(product.rating));

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-rating">${stars} (${product.rating})</div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;

        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            alert(`Added ${product.title} to cart!`);
        });

        return card;
    }
}

// Initialize the Product List
const productList = new ProductList(); 