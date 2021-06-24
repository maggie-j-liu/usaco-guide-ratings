const getQualityIconColor = (quality) => {
    const colors = ['text-gray', 'text-green-300', 'text-green-400', 'text-green-600', 'text-green-800']
    const color = colors[quality - 1];
    const percentage = quality * 100 / 5;
    const circle = getCircle(color, percentage);
    return {
        colorClass: color,
        icon: circle,
    }
}