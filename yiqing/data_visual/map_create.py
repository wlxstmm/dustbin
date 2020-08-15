from pyecharts import options as opts
from pyecharts.charts import Map
from data_handle.data_reader import pol_data

city = pol_data["Region_CN"].tolist()
data = pol_data["total_confirmed"].tolist()

listData = [[city[i], data[i]] for i in range(len(city))]

map_create = (
    Map()
    .add(
        series_name="确诊人数",
        data_pair=listData,
        maptype="china",
        is_map_symbol_show=False,

    )
    .set_series_opts(label_opts=opts.LabelOpts(is_show=False))
    .set_global_opts(
        title_opts=opts.TitleOpts(title="空间-确诊人数渐变图"),
        visualmap_opts=opts.VisualMapOpts(
            is_piecewise=True,
            pieces=[
                {"min": 2000, "label": '>2000人', "color": "#FF3030"},
                {"min": 1000, "max": 1999, "label": '1000-2000人', "color": "#FF4500"},
                {"min": 500, "max": 999, "label": '500-999人', "color": "#FF7F50"},
                {"min": 100, "max": 499, "label": '100-499人', "color": "#FFA500"},
                {"min": 0, "max": 99, "label": '100人以内', "color": "#FFDEAD"},
            ]
        )
    )
    .render("visual_render/space&confirmed.html")
)