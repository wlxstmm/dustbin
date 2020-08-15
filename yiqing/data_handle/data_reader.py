import pandas as pd

pol_data = pd.read_csv("../dataset/各省人口.csv", encoding="gbk")  # 人口表


pol_data['hubei_distance'] = 0  # 新建一列用于存放各省和湖北的距离
pol_data['density'] = 0 #新加一列用于存放各省人均GDP
pol_data['total_confirmed'] = 0  # 新加一列用于存放各省总确诊人数


dis_data = pd.read_csv("../dataset/地理距离.csv", encoding="gb2312")  # 地理距离表
for i in range(0, 30):  # 将地理距离放入df中
    for j in range(0, 30):
        if pol_data.iloc[i, 0] == dis_data.iloc[j, 0]:
            pol_data.iloc[i, 2] = dis_data.iloc[j, 1]

density_data = pd.read_excel("../dataset/各省密度.xls")  # 确诊人数表
for i in range(0, 30):  # 将确诊人数放入df中
    for j in range(0, 30):
        if pol_data.iloc[i, 0] == density_data.iloc[j, 0]:
            pol_data.iloc[i, 3] = density_data.iloc[j, 1]

confirm_data = pd.read_excel("../dataset/各省确诊人数.xls")  # 确诊人数表
for i in range(0, 30):  # 将确诊人数放入df中
    for j in range(0, 30):
        if pol_data.iloc[i, 0] == confirm_data.iloc[j, 0]:
            pol_data.iloc[i, 4] = confirm_data.iloc[j, 90]

print(pol_data)#合并


confirm_detail = pd.read_excel("../dataset/2至4月各省确诊人数统计.xls")

confirm_detail["hubei_distance"] = 0
confirm_detail["density"] = 0

for i in range(0, confirm_detail.shape[0]):
    for j in range(0, dis_data.shape[0]):
        if confirm_detail.iloc[i, 0] == dis_data.iloc[j, 0]:
            confirm_detail.iloc[i, 4] = dis_data.iloc[j, 1]
    for k in range(0, density_data.shape[0]):
        if confirm_detail.iloc[i, 0] == density_data.iloc[k, 0]:
            confirm_detail.iloc[i, 5] = density_data.iloc[k, 1]

