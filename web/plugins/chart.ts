import { use } from "echarts/core";

// 手动导入ECharts模块以减小包的大小
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from "echarts/components";
import VChart from "vue-echarts";

export default defineNuxtPlugin((nuxtApp) => {
  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    BarChart,
    GridComponent
  ]);
});
