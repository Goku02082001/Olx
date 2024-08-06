const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
    
    const interval = Math.floor(seconds / 31536000); 
    if (interval > 1) return `${interval} years ago`;
    
    const intervalMonths = Math.floor(seconds / 2592000);
    if (intervalMonths > 1) return `${intervalMonths} months ago`;
    
    const intervalDays = Math.floor(seconds / 86400);
    if (intervalDays > 1) return `${intervalDays} days ago`;
    
    const intervalHours = Math.floor(seconds / 3600); 
    if (intervalHours > 1) return `${intervalHours} hours ago`;
    
    const intervalMinutes = Math.floor(seconds / 60); 
    if (intervalMinutes > 1) return `${intervalMinutes} minutes ago`;
    
    return `${Math.floor(seconds)} seconds ago`;
  };
  
  export default timeAgo;
  