const steps = [0, 1000, 1200, 1400, 1600, 1900, 2100, 2400, 3300];
const colors = ['text-cf-gray', 'text-cf-lime', 'text-cf-green', 'text-cf-cyan', 'text-cf-blue', 'text-cf-violet', 'text-cf-orange', 'text-cf-red'];

const getRatingIconColor = (rating) => {
    const circle = document.createElement('span');
    let percentage = 0;
    let color = "";
    for (let i = steps.length - 2; i >= 0; i--) {
        if (rating >= steps[i]) {
            percentage = (rating - steps[i]) / ((steps[i + 1] - steps[i]) / 100);
            color = colors[i];
            break;
        }
    }
    percentage = Math.round(10 * percentage) / 10;
    circle.className = `inline-block rounded-full h-4 w-4 ${color} border border-solid border-current`;
    circle.style = `background: linear-gradient(to top, currentColor 0%, currentColor ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%, rgba(0, 0, 0, 0) 100%);`
    return {
        icon: circle,
        colorClass: color
    };
}