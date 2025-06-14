// Folder: /hrms-leave-system/employee.js
document.addEventListener('DOMContentLoaded', function() {
    // Apply for leave form submission
    const leaveForm = document.getElementById('leave-form');
    if (leaveForm) {
        leaveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const leaveType = document.getElementById('leave-type').value;
            const fromDate = document.getElementById('from-date').value;
            const toDate = document.getElementById('to-date').value;
            const duration = document.getElementById('duration').value;
            const reason = document.getElementById('reason').value;
            
            // Simple validation
            if (!leaveType || !fromDate || !toDate || !duration || !reason) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Show success message
            showNotification('Leave application submitted successfully!', 'success');
            
            // Reset form
            leaveForm.reset();
        });
    }
    
    // Set current date as default in date inputs
    const today = new Date().toISOString().split('T')[0];
    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');
    
    if (fromDateInput) fromDateInput.min = today;
    if (toDateInput) toDateInput.min = today;
    
    // Initialize logout dropdown
    const logoutDropdown = document.querySelector('.logout-dropdown');
    if (logoutDropdown) {
        logoutDropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.display = 'block';
        });
        
        logoutDropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.display = 'none';
        });
    }
});

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}