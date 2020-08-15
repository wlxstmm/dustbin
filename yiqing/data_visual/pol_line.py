import pyecharts.options as opts
from pyecharts.charts import Line
from data_handle.data_reader import pol_data

newArr = pol_data.drop(index=(pol_data.loc[(pol_data['Region_CN']=='湖北')].index))

x_data = newArr["Region_CN"].tolist()
y_data = newArr["total_confirmed"].tolist()

pol_line = (
    Line(
        init_opts=opts.InitOpts(
            width='95vw',
            height='95vh',
        )
    )
    .set_global_opts(
        tooltip_opts=opts.TooltipOpts(is_show=False),
        title_opts=opts.TitleOpts(title="人口——确诊人数折线图"),
        xaxis_opts=opts.AxisOpts(
            type_="category",
            name="人口数（大~小）",
            axislabel_opts={"rotate": 45}
        ),
        yaxis_opts=opts.AxisOpts(
            type_="value",
            name="确诊人数",
            axistick_opts=opts.AxisTickOpts(is_show=True),
            splitline_opts=opts.SplitLineOpts(is_show=True),
        ),
    )
    .add_xaxis(xaxis_data=x_data)
    .add_yaxis(
        series_name="",
        y_axis=y_data,
        symbol="emptyCircle",
        is_symbol_show=True,
        label_opts=opts.LabelOpts(is_show=True),
    )
    .render("visual_render/basic_line_chart2.html")
)