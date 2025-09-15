import moment from "moment";

export function validateEmail(email) {
    console.log("==============",email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export function getInitials(name){
    if (!name) return '';
    const names = name.split(' ');
    let initials = '';
    if (names.length > 0) {
        initials += names[0].charAt(0).toUpperCase();
    }
    if (names.length > 1) {
        initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    return initials;
}

export function addThousandsSeparator (num) {

    if (num == null || num == undefined || isNaN(num)) {
        return ""
    }

    const [integerPart, fractionalPart] = num.toString().split(".");
    const fromattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

    return fractionalPart ? `${fromattedInteger}.${fractionalPart}` : fromattedInteger;
}


export function prepareExpenseBarChartData(data) {
    return data.map((item) => ({
        category: item?.category,
        amount: item?.amount
    }));
}

export function prepareIncomeBarChartData(data) {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    return sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM YYYY'),
        amount: item?.amount,
        source: item?.source
    }));
}

export function prepareExpenseLineChartData(data){
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }));
    
    return chartData;
}
