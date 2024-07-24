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
    const sections = document.querySelectorAll('h1, h2, h3, h4 , h5 , h6, p, a'); // Get all sections to search

    if (query.trim() !== "") {
        let found = false; // Flag to track if any match is found
        sections.forEach(section => {
            const content = section.innerHTML.toLowerCase(); // Get the HTML content of the section
            const regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'); // Create a regular expression with the search query
            const highlightedContent = content.replace(regex, '<span class="highlight">$1</span>'); // Highlight the matching text
            if (highlightedContent !== content) { // If a match is found
                section.innerHTML = highlightedContent; // Update the HTML content of the section with highlighted text
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
    }
  });

  //Event listener to close the search bar if clicked outside
document.body.addEventListener('click', function(event) {
  const searchForm = document.getElementById('searchForm');
  const searchQuery = document.getElementById('searchQuery');
  if (!searchForm.contains(event.target) && event.target !== searchQuery) {
      searchForm.style.display = 'none';
  }
});

//Event listener to remove highlights if clicked anywhere on the page
document.body.addEventListener('click', function(event) {
  removeHighlight();
});


// Function to remove highlights
function removeHighlight() {
  const highlightedElements = document.querySelectorAll('.highlight');
  highlightedElements.forEach(element => {
      element.outerHTML = element.innerHTML;
  });
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}