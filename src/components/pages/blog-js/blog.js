// Blog Page JavaScript - Handles rendering, search, and filtering

let currentFilter = 'all';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts(blogPosts);
    setupEventListeners();
});

// Render blog posts to the grid
function renderBlogPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    const noResults = document.getElementById('noResults');
    
    // Clear grid
    blogGrid.innerHTML = '';
    
    // If no posts, show no results message
    if (posts.length === 0) {
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }
    
    // Create card for each post
    posts.forEach(post => {
        const card = createBlogCard(post);
        blogGrid.appendChild(card);
    });
}

// Create individual blog card
function createBlogCard(post) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    
    // Create image section
    const imageDiv = document.createElement('div');
    imageDiv.className = 'blog-card-image';
    
    if (post.image && !post.image.includes('images/blog')) {
        imageDiv.style.backgroundImage = `url('${post.image}')`;
    } else {
        // Placeholder with category color
        imageDiv.innerHTML = `<div class="blog-placeholder">${post.category.toUpperCase()}</div>`;
    }
    
    // Create content section
    const contentDiv = document.createElement('div');
    contentDiv.className = 'blog-card-content';
    
    // Category badge
    const categoryBadge = document.createElement('span');
    categoryBadge.className = `blog-category ${post.category}`;
    categoryBadge.textContent = post.category.charAt(0).toUpperCase() + post.category.slice(1);
    
    // Title
    const title = document.createElement('h2');
    title.textContent = post.title;
    
    // Excerpt
    const excerpt = document.createElement('p');
    excerpt.className = 'blog-excerpt';
    excerpt.textContent = post.excerpt;
    
    // Meta info (date and read time)
    const meta = document.createElement('div');
    meta.className = 'blog-meta';
    meta.innerHTML = `
        <span class="blog-date">${post.date}</span>
        <span class="blog-read-time">${post.readTime}</span>
    `;
    
    // Tags
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'blog-tags';
    post.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'blog-tag';
        tagSpan.textContent = tag;
        tagsDiv.appendChild(tagSpan);
    });
    
    // Read more link
    const readMore = document.createElement('a');
    readMore.href = `blog-post.html?slug=${post.slug}`; // For individual blog posts later
    readMore.className = 'blog-read-more';
    readMore.textContent = 'Read More →';
    
    // Assemble content
    contentDiv.appendChild(categoryBadge);
    contentDiv.appendChild(title);
    contentDiv.appendChild(excerpt);
    contentDiv.appendChild(meta);
    contentDiv.appendChild(tagsDiv);
    contentDiv.appendChild(readMore);
    
    // Assemble card
    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter and render
            currentFilter = btn.dataset.category;
            filterAndRenderPosts();
        });
    });
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        filterAndRenderPosts();
    });
}

// Filter and render posts based on current filter and search term
function filterAndRenderPosts() {
    let filteredPosts = blogPosts;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === currentFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredPosts = filteredPosts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm) ||
                   post.excerpt.toLowerCase().includes(searchTerm) ||
                   post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        });
    }
    
    renderBlogPosts(filteredPosts);
}