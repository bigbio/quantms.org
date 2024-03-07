const getBoxTooltips = (samples) => {
    return {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        },
        textStyle: {},
        formatter: function (param) {
            return [
                "<div style='margin-bottom:5px;width:100%;border-radius:3px;text-align:center;family'><p>" +
                param.data[0] +
                ' </p></div>',
                '<hr size=1 style="margin: 3px 0">',
                "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Max:</span>" +
                parseFloat(param.data[5]).toFixed(2) +
                '<br/>',
                "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Q3:</span>" +
                parseFloat(param.data[4]).toFixed(2) +
                '<br/>',
                "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Median:</span>" +
                parseFloat(param.data[3]).toFixed(2) +
                '<br/>',
                "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Q1:</span>" +
                parseFloat(param.data[2]).toFixed(2) +
                '<br/>',
                "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Min:</span>" +
                parseFloat(param.data[1]).toFixed(2) +
                '<br/>',
                "<span style='text-align:left;color:#8f9a7a;margin-right:15px;'>Samples:</span>" +
                (Array.isArray(samples[0])?samples[param.componentIndex][param.dataIndex]:samples[param.dataIndex]) +
                '<br/>',
            ].join('')
        }
    }
}

// option
const options = {
    // backgroundColor: '#f4f5f2',
      title: [
      ],
      dataset: [
      ],
      tooltip: {},
    // color: tagsColor,
    legend: {
      show: true,
      orient: 'vertical',
      right: 10,
      top: 60,
      data: []
      // bottom: 20,
      },
    grid: {
        left: '10%',
        right: '10%',
        bottom: 60
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
        }
      },
      xAxis: {
        type: 'value',
        name: 'iBAQLog',
        nameLocation: 'center',
        nameGap: 40,
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        },
        min: 1,
        //max: 10
      },
      toolbox: {
        feature: {
          saveAsImage: {
            type: 'png',
            title: 'save as .png',
            pixelRatio: 10
          }
        }
      },
      series: [
      ]
}

export {getBoxTooltips,options}