from pyecharts import options as opts
from pyecharts.charts import Bar
from data_handle.data_reader import confirm_detail


def workAverMem(disListName):
    monListData = []
    febNum = 0
    marNum = 0
    aprNum = 0
    for item in disListName:
        for i in range(0, confirm_detail.shape[0]):
            if item == confirm_detail.iloc[i, 0]:
                febNum += confirm_detail.iloc[i, 1]
                marNum += confirm_detail.iloc[i, 2]
                aprNum += confirm_detail.iloc[i, 3]
    monListData.append(round(febNum / len(disListName), 1))
    monListData.append(round(marNum / len(disListName), 1))
    monListData.append(round(aprNum / len(disListName), 1))
    return monListData

time = ["二月", "三月", "四月"]
denHigh = []
denMid = []
denLow = []

for i in range(0, confirm_detail.shape[0]):
    if confirm_detail.iloc[i, 5] < 200 and confirm_detail.iloc[i, 5] > 0:
        denLow.append(confirm_detail.iloc[i, 0])
    elif confirm_detail.iloc[i, 5] >= 200 and confirm_detail.iloc[i, 5] < 700:
        denMid.append(confirm_detail.iloc[i, 0])
    elif confirm_detail.iloc[i, 5] >= 700:
        denHigh.append(confirm_detail.iloc[i, 0])


dataLow = workAverMem(denLow)
dataMid = workAverMem(denMid)
dataHigh = workAverMem(denHigh)

print(dataLow)
print(dataMid)
print(dataHigh)

polDensity_bar = (
    Bar(
        init_opts=opts.InitOpts(
            width='95vw',
            height='95vh'
        )
    )

    .add_xaxis(time)
    .add_yaxis("高人口密度地区平均确诊人数（≥700 人/平方千米）", dataHigh, stack="stack1")
    .add_yaxis("中人口密度地区平均确诊人数（≥200 人/平方千米）", dataMid, stack="stack1")
    .add_yaxis("低人口密度地区平均确诊人数（＜200 人/平方千米）", dataLow, stack="stack1")
    .set_series_opts(label_opts=opts.LabelOpts(is_show=False))
    .set_global_opts(title_opts=opts.TitleOpts(title="人口密度——平均确诊人数"))
    .render("visual_render/polDen&averCom_bar_stack.html")
)

