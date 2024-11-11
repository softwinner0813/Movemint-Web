"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useLayoutEffect, useState, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import am5themesDark from "@amcharts/amcharts5/themes/Dark";
import { DatePicker } from "antd";
import moment from "moment";
import { getTransactionsByDate } from "@/services/api";
import { useUser } from "@/lib/userContext";

const { RangePicker } = DatePicker;

const filterData = [
  "Day",
  "Week",
  "Month",
  "Year",
  "Custom",
];

const SalesOverviewChart = () => {
  const [data, setData] = useState([]);
  const [filterType, setFilterType] = useState('Year');
  const [dateRange, setDateRange] = useState([moment().startOf('year'), moment().endOf('year')]);
  const { userData } = useUser();

  const handleFilterChange = (value) => {
    setFilterType(value);
    switch (value) {
      case 'Day':
        setDateRange([moment().startOf('day'), moment().endOf('day')]);
        break;
      case 'Week':
        setDateRange([moment().startOf('week'), moment().endOf('week')]);
        break;
      case 'Month':
        setDateRange([moment().startOf('month'), moment().endOf('month')]);
        break;
      case 'Year':
        setDateRange([moment().startOf('year'), moment().endOf('year')]);
        break;
      case 'Custom':
        setDateRange([null, null]);
        break;
      default:
        break;
    }
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  useEffect(() => {
    const fetchData = async () => {
      let [startDate, endDate] = dateRange;
      try {
        const response = await getTransactionsByDate(startDate, endDate, userData.mover.id);
        if (response.result) {
          let tempData = response.data;
          tempData.forEach(temp => {
            temp.date = (new Date(temp.date)).getTime();
          });
          setData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    if (dateRange != null && dateRange.length == 2 && dateRange[0] != null && dateRange[1] != null) {
      fetchData();
    }
  }, [dateRange]);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    const myTheme = am5.Theme.new(root);
    myTheme.rule("Label").set("fontSize", 12);
    myTheme.rule("Grid").set("strokeOpacity", 1);

    root.setThemes([
      am5themesDark.new(root),
      am5themes_Animated.new(root),
      am5themes_Responsive.new(root),
      myTheme,
    ]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 90,
        }),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 90,
        }),
      })
    );

    xAxis.get("renderer").grid.template.setAll({
      strokeWidth: 0,
      visible: false,
    });

    // Generate random data
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    let value = 20;
    function generateData() {
      value = am5.math.round(Math.random() * 10 - 4.8 + value, 1);
      if (value < 0) {
        value = Math.random() * 10;
      }

      if (value > 100) {
        value = 100 - Math.random() * 10;
      }
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value,
      };
    }

    function generateDatas(count) {
      const data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        stroke: am5.color(0x0d70bc),
        fill: am5.color(0xffffff),
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY.formatNumber('#,###.00')}",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
    });

    series.fills.template.setAll({
      fillOpacity: 0.4, // 40% opacity
      visible: true,
      fillGradient: am5.LinearGradient.new(root, {
        stops: [
          {
            color: am5.color(0x4379ee),
            opacity: 0.2,
          },
          {
            color: am5.color(0xffffff),
            opacity: 0.2,
          },
        ],
        //target: chart.plotContainer,
        rotation: 90,
      }),
    });

    // Actual bullet
    series.bullets.push(function () {
      const bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fill: series.get("stroke"),
      });
      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    const rangeDataItem = yAxis.makeDataItem({});
    yAxis.createAxisRange(rangeDataItem);

    // create container for all elements, you can put anything you want top it
    const container = am5.Container.new(root, {
      centerY: am5.p50,
      draggable: true,
      layout: root.horizontalLayout,
    });

    container.adapters.add("x", function () {
      return 0;
    });

    // restrict from being dragged outside of plot
    container.adapters.add("y", function (y) {
      return Math.max(0, Math.min(chart.plotContainer.height(), y));
    });

    // change range when y changes
    container.events.on("dragged", function () {
      updateLabel();
    });

    // this is needed for the bullets to be interactive, above the plot
    yAxis.topGridContainer.children.push(container);

    // create bullet and set container as a bullets sprite
    rangeDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        sprite: container,
      })
    );

    // decorate grid of a range
    rangeDataItem.get("grid").setAll({
      strokeOpacity: 1,
      visible: true,
      stroke: am5.color(0x000000),
      strokeDasharray: [2, 2],
    });

    // Set data
    const temp = generateDatas(30);
    series.data.setAll(data);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <Card className="border-none bg-background rounded-[14px]">
      <CardHeader className="flex gap-4 md:flex-row justify-between md:items-center">
        <CardTitle>Sales Overview (YTD)</CardTitle>
        {filterType === 'Custom' && (
          <RangePicker value={dateRange} onChange={handleDateRangeChange} className="border border-gray-700 bg-gray-800 hover:bg-gray-800 focus:bg-gray-800 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        )}
        <Select value={filterType} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px] text-white/70">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {filterData.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {/* <Line ref={chartRef} className="mt-12" data={data} options={options} /> */}
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </CardContent>
    </Card>
  );
};

export default SalesOverviewChart;
