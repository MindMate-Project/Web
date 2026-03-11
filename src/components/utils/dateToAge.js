export default function dateToAge(birthDateString) {
    if (!birthDateString) return null;
    
    const today = new Date();
    const birthDate = new Date(birthDateString);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // If the birth month hasn't occurred yet this year, 
    // or if it's the birth month but the birth day hasn't occurred yet, subtract 1 from age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

