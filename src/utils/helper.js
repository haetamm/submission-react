export function formatDate(dateStr) {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('id-ID', options);
    
    return formattedDate;
}

