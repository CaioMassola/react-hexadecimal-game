const randomColor = (): string => {

    const values: string = '0123456789ABCDEF';
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += values[Math.floor(Math.random() * 16)];
    }
    return color;
};

const getColors = (): string[] => {
    const colors: string[] = [];
    while (colors.length < 3) {
        const color = randomColor();
        if (!colors.includes(color)) {
            colors.push(color);
        }
    }
    return colors;
};

const colorOption = (colors: string[]) => {
    return colors[Math.floor(Math.random() * colors.length)];
}


export { getColors, colorOption }