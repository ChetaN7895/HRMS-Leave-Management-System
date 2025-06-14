// Folder: /hrms-leave-system/manager.js
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to approval buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('approve-btn') || 
            e.target.closest('.approve-btn')) {
            const btn = e.target.classList.contains('approve-btn') ? 
                         e.target : e.target.closest('.approve-btn');
            const requestId = btn.getAttribute('data-id');
            handleApproval(requestId, 'approve');
        }
        
        if (e.target.classList.contains('reject-btn') || 
            e.target.closest('.reject-btn')) {
            const btn = e.target.classList.contains('reject-btn') ? 
                         e.target : e.target.closest('.reject-btn');
            const requestId = btn.getAttribute('data-id');
            handleApproval(requestId, 'reject');
        }
    });
    
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

// Handle approval/rejection of leave requests
function handleApproval(requestId, action) {
    // Find the row to remove
    const row = document.querySelector(`[data-id="${requestId}"]`).closest('tr');
    
    // Show notification based on action
    if (action === 'approve') {
        showNotification('Leave request approved successfully!', 'success');
    } else {
        showNotification('Leave request rejected successfully!', 'success');
    }
    
    // Remove the row from the table
    row.remove();
    
    // Update dashboard stats
    updateDashboardStats();
}

// Update dashboard stats after approval/rejection
function updateDashboardStats() {
    const pendingCount = document.querySelectorAll('.status-pending').length;
    const approvedCount = document.querySelectorAll('.status-approved').length;
    const rejectedCount = document.querySelectorAll('.status-rejected').length;
    
    // Update stats on dashboard if available
    const pendingStat = document.querySelector('.stat-card.pending .stat-value');
    const approvedStat = document.querySelector('.stat-card.approved .stat-value');
    const rejectedStat = document.querySelector('.stat-card.rejected .stat-value');
    
    if (pendingStat) pendingStat.textContent = pendingCount;
    if (approvedStat) approvedStat.textContent = approvedCount;
    if (rejectedStat) rejectedStat.textContent = rejectedCount;
}

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