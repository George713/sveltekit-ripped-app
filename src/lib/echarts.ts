import * as charts from 'echarts';

export const echarts = (node: HTMLElement, option: any) => {
    const chart = charts.init(node,);
    chart.setOption(option);
}