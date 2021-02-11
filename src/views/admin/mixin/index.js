export default {
    data() {
        return {
            cardNum: [
                {
                    text: "银行卡",
                    icon: "icon-icon-copy",
                    bgColor: "#fa82b3",
                    num: "1040",
                },
                {
                    text: "微信",
                    icon: "icon-weixin",
                    bgColor: "#fc7a7a",
                    num: "1040",
                },
                {
                    text: "支付宝",
                    icon: "icon-zhifubao",
                    bgColor: "#93a7fc",
                    num: "1040",
                },
                {
                    text: "数字钱包",
                    icon: "icon-bitebi",
                    bgColor: "#8acaed",
                    num: "1040",
                },
                {
                    text: "现金",
                    icon: "icon-hongbao001",
                    bgColor: "#6fb4ff",
                    num: "1004",
                },
                {
                    text: "新增",
                    icon: "icon-jia",
                    bgColor: "#eeeeee",
                },
            ],
            chartData: [{
                prop: "chartType",
                placeholder: "图表类型",
                className: "",
                options: [
                    { value: "pie", label: "扇形图" },
                    { value: "line", label: "条形图" },
                    { vlaue: "bar", label: "柱状图" },
                ],
            },
            {
                prop: "timeRange",
                placeholder: "时间周期",
                className: "time-range",
                options: [
                    {
                        value: "week",
                        label: "近一周",
                    },
                    {
                        value: "month",
                        label: "近一月",
                    },
                    {
                        value: "year",
                        label: "近一年",
                    },
                ],
            }]
        }
    }
}