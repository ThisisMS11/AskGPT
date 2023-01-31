// write a function to convert yy/mm/dd to dd/mm/yy

function convertDate(date) {
    let newDate = date.split('/');
    let year = newDate[0];
    let month = newDate[1];
    let day = newDate[2];
    return `${day}/${month}/${year}`;
}

console.log(convertDate('2002/10/11'));