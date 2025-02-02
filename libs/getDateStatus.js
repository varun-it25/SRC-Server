export function getDateStatus(dateString: string) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    const timeDiff = inputDate - currentDate;

    if (timeDiff === 0) {
        return "Today";
    }
    
    else if (timeDiff > 0) {
        return "Upcoming";
    }
    
    else {
        return "Completed";
    }
}