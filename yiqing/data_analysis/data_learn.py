import pandas as pd
from sklearn.cluster import KMeans #导入分类器库
# 导入 FMI 方法的评价函数
from sklearn.metrics import fowlkes_mallows_score
from sklearn.metrics import silhouette_score
from sklearn.metrics import calinski_harabasz_score
import matplotlib.pyplot as plt
#from data_analysis.data_scaler import confirm_train_Scaler, confirm_train_label
# 读取训练集数据
confirm_train_Scaler = pd.read_csv('../dataset/confirm_train_Scaler.csv')
confirm_train_label = pd.read_csv('../dataset/confirm_train_label.csv',header = None)
confirm_train_label.columns = ['label'] # 重命名列名
# 构建并训练模型
kmeans = KMeans(n_clusters = 3,random_state=6).fit(confirm_train_Scaler)
print('构建 k-means 模型为：\n',kmeans)

kmeans = KMeans(n_clusters= 3).fit(confirm_train_Scaler)
score = fowlkes_mallows_score(confirm_train_label['label'].tolist(),kmeans.labels_)
print('confirm数据集的类中心为 3 时，其 FMI 的评价分值为：%f'%score)
for i in range(2,4):
 ##构建并训练模型
    kmeans = KMeans(n_clusters = i,random_state=6).fit(confirm_train_Scaler)
    score = fowlkes_mallows_score(confirm_train_label['label'],kmeans.labels_)
    print('confirm数据聚%d 类 FMI 评价分值为：%f' %(i,score))

silhouettteScore = []
for i in range(2,4):
    kmeans = KMeans(n_clusters = i,random_state=6).fit(confirm_train_Scaler)
    score = silhouette_score(confirm_train_Scaler,kmeans.labels_)
    silhouettteScore.append(score)
plt.figure(figsize=(10,6))
plt.plot(range(2,4),silhouettteScore,linewidth=1.5, linestyle="-")
plt.show()

for i in range(2,4):
 ##构建并训练模型
    kmeans = KMeans(n_clusters = i,random_state=1).fit(confirm_train_Scaler)
    score = calinski_harabasz_score(confirm_train_Scaler,kmeans.labels_)
    print('confirm数据聚%d 类 calinski_harabaz 指数为：%f'%(i,score))