const getBoxTooltips = (samples) => {
    return {
        trigger: 'item',
        axisPointer: {
            type: 'shadow',
            shadowStyle: {
                color: 'rgba(0,0,0,0.05)'
            }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: [8, 12],
        textStyle: {
            color: '#666',
            fontSize: 13
        },
        formatter: function (param) {
            return [
                `<div style='margin-bottom:8px;padding:4px 8px;background:#f5f7fa;border-radius:4px;font-weight:500;'>
                    ${param.data[0]}
                </div>`,
                '<hr style="margin: 5px 0; border:0; border-top: 1px solid #eee">',
                `<div style='display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:center;'>
                    <span style='color:#666;'>Max:</span>
                    <span style='font-weight:500;'>${parseFloat(param.data[5]).toFixed(2)}</span>
                    <span style='color:#666;'>Q3:</span>
                    <span style='font-weight:500;'>${parseFloat(param.data[4]).toFixed(2)}</span>
                    <span style='color:#666;'>Median:</span>
                    <span style='font-weight:500;'>${parseFloat(param.data[3]).toFixed(2)}</span>
                    <span style='color:#666;'>Q1:</span>
                    <span style='font-weight:500;'>${parseFloat(param.data[2]).toFixed(2)}</span>
                    <span style='color:#666;'>Min:</span>
                    <span style='font-weight:500;'>${parseFloat(param.data[1]).toFixed(2)}</span>
                    <span style='color:#666;'>Samples:</span>
                    <span style='font-weight:500;'>${Array.isArray(samples[0]) ? samples[param.componentIndex][param.dataIndex] : samples[param.dataIndex]}</span>
                </div>`
            ].join('')
        }
    }
}

// Base chart options
const options = {
    title: [],
    dataset: [],
    tooltip: {},
    legend: {
        show: true,
        orient: 'vertical',
        right: 10,
        top: 60,
        data: [],
        textStyle: {
            fontSize: 13,
            color: '#666'
        },
        itemGap: 16,
        itemWidth: 12,
        itemHeight: 12,
        borderRadius: 2
    },
    grid: {
        left: '12%',
        right: '12%',
        bottom: '10%',
        top: '15%',
        containLabel: true
    },
    yAxis: {
        type: 'category',
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#ddd'
            }
        },
        axisLabel: {
            color: '#666',
            fontSize: 12,
            margin: 16
        }
    },
    xAxis: {
        type: 'value',
        name: 'iBAQ Log',
        nameLocation: 'center',
        nameGap: 40,
        nameTextStyle: {
            fontSize: 13,
            fontWeight: 500,
            color: '#666'
        },
        splitArea: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                color: '#eee'
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        },
        axisLabel: {
            color: '#666',
            fontSize: 11
        },
        min: 1
    },
    toolbox: {
        feature: {
            saveAsImage: {
                type: 'png',
                title: 'Save as PNG',
                pixelRatio: 2,
                backgroundColor: '#fff'
            }
        },
        right: 20,
        top: 20
    }
}

export {getBoxTooltips,options}