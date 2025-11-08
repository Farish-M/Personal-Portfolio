// Main JavaScript - Handles dynamic project rendering

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});

function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    // Clear container first
    projectsContainer.innerHTML = '';
    
    // Loop through projects array and create HTML for each
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    // Create main card div
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Create image section
    const imageDiv = document.createElement('div');
    imageDiv.className = 'project-image';
    
    // If image path is provided and not placeholder, use it as background
    if (project.image && !project.image.includes('path/to')) {
        imageDiv.style.backgroundImage = `url('${project.image}')`;
        imageDiv.style.backgroundSize = 'cover';
        imageDiv.style.backgroundPosition = 'center';
    } else {
        // Use placeholder text
        imageDiv.textContent = 'Project Screenshot';
    }
    
    // Create content section
    const contentDiv = document.createElement('div');
    contentDiv.className = 'project-content';
    
    // Create title
    const title = document.createElement('h3');
    title.textContent = project.title;
    
    // Create description
    const description = document.createElement('p');
    description.textContent = project.description;
    
    // Create tags container
    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'project-tags';
    
    // Add each tag
    project.tags.forEach(tagText => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tagText;
        tagsDiv.appendChild(tag);
    });
    
    // Optional: Add links if provided
    if (project.liveLink || project.githubLink) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'project-links';
        linksDiv.style.marginTop = '15px';
        linksDiv.style.display = 'flex';
        linksDiv.style.gap = '10px';
        
        if (project.liveLink) {
            const liveLink = document.createElement('a');
            liveLink.href = project.liveLink;
            liveLink.target = '_blank';
            liveLink.textContent = '🔗 Live Demo';
            liveLink.className = 'project-link';
            linksDiv.appendChild(liveLink);
        }
        
        if (project.githubLink) {
            const githubLink = document.createElement('a');
            githubLink.href = project.githubLink;
            githubLink.target = '_blank';
            githubLink.textContent = '💻 GitHub';
            githubLink.className = 'project-link';
            linksDiv.appendChild(githubLink);
        }
        
        contentDiv.appendChild(title);
        contentDiv.appendChild(description);
        contentDiv.appendChild(tagsDiv);
        contentDiv.appendChild(linksDiv);
    } else {
        contentDiv.appendChild(title);
        contentDiv.appendChild(description);
        contentDiv.appendChild(tagsDiv);
    }
    
    // Assemble the card
    card.appendChild(imageDiv);
    card.appendChild(contentDiv);
    
    return card;
}