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
    monListData.append(round(febNum / len(disListName), 1))     # 求出2月平均每省的确诊人数
    monListData.append(round(marNum / len(disListName), 1))     # 3月
    monListData.append(round(aprNum / len(disListName), 1))     # 4月
    # 返回该区间的2、3、4月每省平均确诊人数数据
    return monListData

time = ["二月", "三月", "四月"]
disNear = []
disMid = []
disFar = []

for i in range(0, confirm_detail.shape[0]):
    if confirm_detail.iloc[i, 4] < 1000:
        disNear.append(confirm_detail.iloc[i, 0])
    elif confirm_detail.iloc[i, 4] >= 1000 and confirm_detail.iloc[i, 4] < 2000:
        disMid.append(confirm_detail.iloc[i, 0])
    else:
        disFar.append(confirm_detail.iloc[i, 0])

dataNear = workAverMem(disNear)
dataMid = workAverMem(disMid)
dataFar = workAverMem(disFar)

dis_bar = (
    Bar(
        init_opts=opts.InitOpts(
            width='95vw',
            height='95vh'
        )
    )

    .add_xaxis(time)
    .add_yaxis("1000km以内平均每省确诊人数", dataNear, stack="stack1")
    .add_yaxis("1000~2000km平均每省确诊人数", dataMid, stack="stack1")
    .add_yaxis("2000km以上平均每省确诊人数", dataFar, stack="stack1")
    .set_series_opts(label_opts=opts.LabelOpts(is_show=False))
    .set_global_opts(title_opts=opts.TitleOpts(title="距离——平均确诊人数堆叠柱状图"))
    .render("visual_render/dis&averCom_bar_stack.html")
)

