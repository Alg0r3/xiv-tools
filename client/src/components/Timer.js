const getEorzeTime = () => {
    const eorzeaTimeConst = 3600 / 175;
    const earthUnix = Date.now();
    const eorzeaUnix = earthUnix * eorzeaTimeConst;
    let eorzeaHours = Math.trunc((eorzeaUnix / (1000 * 3600)) % 24);
    let eorzeaMinutes = Math.trunc((eorzeaUnix / (1000 * 60)) % 60);

    if (eorzeaHours < 10) eorzeaHours = '0' + eorzeaHours;
    if (eorzeaMinutes < 10) eorzeaMinutes = '0' + eorzeaMinutes;

    return `${eorzeaHours}:${eorzeaMinutes}`;
};

const getEorzeaTimeChunk = (time = 0) => {
    const earthUnix = Date.now() + time;
    const seed = Math.trunc(earthUnix / (1000 * 175 * 8));
    const eorzeaDate = new Date(seed * (1000 * 3600 * 8));

    if (eorzeaDate.getUTCHours() < 10) return `0${eorzeaDate.getUTCHours()}:00`;
    else return `${eorzeaDate.getUTCHours()}:00`;
};

const timer = [];
let time = 1400000;

for (let i = 0; i < 8; i++) {
    timer.push(
        <td key={time/1000}>{getEorzeaTimeChunk(time)}</td>
    );
    time += 1400000;
}

const Timer = () => {
    return(
        <>
            <td></td>
            <td>{getEorzeaTimeChunk(-1400000)}</td>
            <td>{getEorzeTime()}</td>
            {timer}
        </>
    );
};

export default Timer;
