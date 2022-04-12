const pastDays = (date: Date): number => {
    const day = 24 * 60 * 60 * 1000;
    return Math.floor(date.getTime()/day);
}

export default pastDays;