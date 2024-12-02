let currentPage = 1;
const itemsPerPage = 50;
let searchTerm = '';

// Fetch and display items
async function fetchItems() {
    try {
        const response = await fetch(`/api/items?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`);
        const items = await response.json();
        displayItems(items);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function displayItems(items) {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-card';
        itemElement.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description || ''}</p>
                <small>Created: ${new Date(item.date_created).toLocaleString()}</small>
            </div>
            <div class="item-actions">
                <button onclick="editItem(${item.id})" class="edit-btn">Edit</button>
                <button onclick="deleteItem(${item.id})" class="delete-btn">Delete</button>
            </div>
        `;
        itemsList.appendChild(itemElement);
    });
}

// Modal handling
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
const itemForm = document.getElementById('itemForm');

function openModal(item = null) {
    modal.style.display = 'block';
    if (item) {
        document.getElementById('modalTitle').textContent = 'Edit Item';
        document.getElementById('itemId').value = item.id;
        document.getElementById('name').value = item.name;
        document.getElementById('description').value = item.description || '';
    } else {
        document.getElementById('modalTitle').textContent = 'Add New Item';
        itemForm.reset();
        document.getElementById('itemId').value = '';
    }
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Form submission 
itemForm.onsubmit = async (e) => {
    e.preventDefault();
    const itemId = document.getElementById('itemId').value;
    const itemData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value
    };

    try {
        const url = itemId ? `/api/items/${itemId}` : '/api/items';
        const method = itemId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });

        if (response.ok) {
            modal.style.display = 'none';
            fetchItems();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        console.error('Error saving item:', error);
        alert('Error saving item');
    }
};

// Edit item
async function editItem(id) {
    try {
        const response = await fetch(`/api/items/${id}`);
        const item = await response.json();
        openModal(item);
    } catch (error) {
        console.error('Error fetching item:', error);
    }
}

// Delete item
async function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchItems();
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }
}

// Search functionality
function searchItems() {
    searchTerm = document.getElementById('searchInput').value;
    currentPage = 1;
    fetchItems();
}

// Pagination
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchItems();
    }
}

function nextPage() {
    currentPage++;
    fetchItems();
}

// Initial load
fetchItems();