import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from data_handle.data_reader import pol_data as confirm

import warnings
warnings.filterwarnings("ignore")#去除警告

for i in range(len(confirm)):
    if confirm.iloc[i,4]<50:
        confirm.iloc[i,4] = 1
    elif confirm.iloc[i,4]>=50 and confirm.iloc[i,4]<200:
        confirm.iloc[i,4] = 2
    elif confirm.iloc[i,4]>=200 and confirm.iloc[i,4]<800:
        confirm.iloc[i,4] = 3
    else:
        confirm.iloc[i,4] = 4
# print(confirm)

confirm_data = confirm.iloc[:,1:4]#名称、人口、距离、密度
confirm_label = confirm.iloc[:,4]#确诊人数等级
print('confirm数据集的标签为：\n',confirm_label)
print('confirm数据集的数据为：\n',confirm_data)


confirm_train,confirm_test,confirm_train_label,confirm_test_label = train_test_split\
(confirm_data,confirm_label,test_size=3, random_state=2)#划分测试集和数据集
confirm_test_label.to_csv('../dataset/confirm_test_label.csv',index = False)
confirm_train_label.to_csv('../dataset/confirm_train_label.csv',index = False)
print('confirm原始数据集数据的形状为：',confirm_data.shape)
print('confirm训练集数据的形状为：',confirm_train.shape)
print('confirm训练集标签的形状为：',confirm_train_label.shape)
print('confirm测试集数据的形状为：',confirm_test.shape)
print('confirm测试集标签的形状为：',confirm_test_label.shape)

#标准化训练集
Scaler = MinMaxScaler().fit(confirm_train) # 生成规则
# 将规则应用于训练集
confirm_train_Scaler = Scaler.transform(confirm_train)
# 将 confirm_train_Scaler 转为 DataFrame
confirm_train_Scaler = pd.DataFrame(confirm_train_Scaler)
# 重命名
confirm_train_Scaler.columns = confirm_train.columns
confirm_train_Scaler.to_csv('../dataset/confirm_train_Scaler.csv', index = False)
print('离差标准化后confirm训练集的数据为：\n',confirm_train_Scaler.head())

# 标准化测试集
Scaler = MinMaxScaler().fit(confirm_test) # 生成规则
# 将规则应用于训练集
confirm_test_Scaler = Scaler.transform(confirm_test)
# 将 test转为 DataFrame
confirm_test_Scaler = pd.DataFrame(confirm_test_Scaler)
# 重命名
confirm_test_Scaler.columns = confirm_test.columns
confirm_test_Scaler.to_csv('../dataset/confirm_test_Scaler.csv', index = False)
print('离差标准化后confirm测试集的数据为：\n',confirm_test_Scaler.head())








