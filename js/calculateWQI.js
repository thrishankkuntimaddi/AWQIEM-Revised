const Papa = require('papaparse');
const fs = require('fs');

function calculateWQI(pH, conductivity, temp) {
    const pH_ideal = 7.0;
    const pH_standard = 8.5;
    const cond_ideal = 500;
    const cond_standard = 1500;
    const temp_ideal = 25;
    const temp_standard = 30;

    const qi_pH = (pH >= 6.5 && pH <= 8.5) ? 0 : 100 * Math.abs(pH - pH_ideal) / (pH_standard - pH_ideal);
    const qi_cond = 100 * Math.abs(conductivity - cond_ideal) / (cond_standard - cond_ideal);
    const qi_temp = 100 * Math.abs(temp - temp_ideal) / (temp_standard - temp_ideal);

    const w_pH = 0.375;
    const w_cond = 0.375;
    const w_temp = 0.25;

    const WQI = (qi_pH * w_pH) + (qi_cond * w_cond) + (qi_temp * w_temp);
    let status = '';
    if (WQI <= 25) status = 'Excellent';
    else if (WQI <= 50) status = 'Good';
    else if (WQI <= 75) status = 'Poor';
    else if (WQI <= 100) status = 'Very Poor';
    else status = 'Unsuitable';

    return { WQI: Number(WQI.toFixed(2)), status };
}

fs.readFile('/Users/thrishankkuntimaddi/Documents/Projects/AWQIEM-Revised/WQI-datasets/GroundWater2021.csv', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading CSV file:', err);
        return;
    }

    Papa.parse(data, {
        header: true,
        complete: function(results) {
            const waterQualityData = results.data
                .filter(row => row['Station Code'] && row['pH Min'] && row['Conductivity (µmhos/cm) Min'])
                .map(row => {
                    const pH = (parseFloat(row['pH Min']) + parseFloat(row['pH Max'])) / 2;
                    const conductivity = (parseFloat(row['Conductivity (µmhos/cm) Min']) + parseFloat(row['Conductivity (µmhos/cm) Max'])) / 2;
                    const temp = (parseFloat(row['Temperature Min']) + parseFloat(row['Temperature Max'])) / 2;
                    const { WQI, status } = calculateWQI(pH, conductivity, temp);
                    return {
                        stationCode: row['Station Code'],
                        stationName: row['Station Name'],
                        state: row['STATE'],
                        pH: pH,
                        conductivity: conductivity,
                        temp: temp,
                        WQI: WQI,
                        status: status
                    };
                });

            console.log('WQI Results:');
            console.log(waterQualityData);
            const csv = Papa.unparse(waterQualityData);
            fs.writeFileSync('WQI_Results_2021.csv', csv);
        }
    });
});