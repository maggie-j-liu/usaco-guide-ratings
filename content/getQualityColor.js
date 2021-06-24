const qualityColors = ['text-gray', 'text-green-300', 'text-green-400', 'text-green-600', 'text-green-800']
const getQualityColor = (quality) => {
    return qualityColors[quality - 1];
}