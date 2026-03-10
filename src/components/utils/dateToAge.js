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
