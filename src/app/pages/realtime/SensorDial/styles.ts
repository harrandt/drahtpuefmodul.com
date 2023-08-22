import { buildStyles } from 'react-circular-progressbar';

const baseStyle = {
    textSize: '1rem',
    // How long animation takes to go from one percentage to another, in seconds
    pathTransitionDuration: 0,
    strokeLinecap: 'butt',
    trailColor: '#eee',
};

export const stylesForBigDifference = buildStyles({
    ...baseStyle,
    pathColor: '#f00',
    textColor: '#f00',
});

export const stylesForSmallDifference = buildStyles({
    ...baseStyle,
    pathColor: '#e57523',
    textColor: '#e57523',
});

export const stylesForPerfectValue = buildStyles({
    ...baseStyle,
    pathColor: '#21c148',
    textColor: '#21c148',
});
