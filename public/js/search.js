function toggleSearchBar() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm.style.display === 'none' || searchForm.style.display === '') {
      searchForm.style.display = 'flex';
    } else {
      searchForm.style.display = 'none';
    }
  }
  
  function performSearch(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const query = document.getElementById('searchQuery').value.toLowerCase(); // Get the search query
    const sections = document.querySelectorAll('h1, h2, h3, p'); // Get all sections to search
  
    if (query.trim() !== "") {
        let found = false; // Flag to track if any match is found
        sections.forEach(section => {
            const visibleText = getVisibleText(section).toLowerCase(); // Get the visible text content of the section
            const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'); // Create a regular expression with the search query
            const highlightedContent = visibleText.replace(regex, '<span class="highlight">$&</span>'); // Highlight the matching text
            if (highlightedContent !== visibleText) { // If a match is found
                section.innerHTML = section.innerHTML.replace(visibleText, highlightedContent); // Update the HTML content of the section with highlighted text
                section.scrollIntoView({ behavior: 'smooth' }); // Scroll to the section
                found = true; // Set found flag to true
            }
        });
  
        if (!found) {
            alert("No matches found.");
        }
    } else {
        alert("Please enter a search query.");
    }
  }
  
  function getVisibleText(element) {
    const style = window.getComputedStyle(element);
    const display = style.display;
    const visibility = style.visibility;
    if (display === 'none' || visibility === 'hidden') {
        return '';
    }
    return Array.from(element.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent)
        .join('');
  }
  
  function removeHighlight() {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
        element.outerHTML = element.innerHTML; // Replace highlighted element with its inner HTML
    });
  }
  
  // Event listener for the search button
  document.getElementById('searchToggleBtn').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click from propagating to the document
    toggleSearchBar();
  });
  
  // Event listener for clicks outside the search form
  document.addEventListener('click', function(event) {
    const searchForm = document.getElementById('searchForm');
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    if (!searchForm.contains(event.target) && event.target !== searchToggleBtn) {
        searchForm.style.display = 'none';
        removeHighlight(); // Remove the highlighted text when clicking outside the search form
    }
  });
  
  // Event listener for clicks anywhere on the page to remove the highlighting
  document.addEventListener('click', function(event) {
    removeHighlight(); // Remove the highlighted text when clicking anywhere on the page
  });
  
  // Event listener for Enter key press in the search input field
  document.getElementById('searchQuery').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch(event);
    }
  });
  