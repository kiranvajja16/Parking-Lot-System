function calculateFare(hours) {
    if (hours <= 3) return 30;
    if (hours <= 6) return 85;
    return 120;
}

module.exports = calculateFare;