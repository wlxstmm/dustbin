import pandas as pd
from sklearn.svm import SVC
from sklearn.metrics import classification_report # 预测报告
import warnings
from data_analysis.data_scaler import confirm_train_Scaler, confirm_train_label, confirm_test_Scaler, confirm_test_label

warnings.filterwarnings("ignore")#去除警告

print('训练集形状：',confirm_train_Scaler.shape,'\n',
 '训练集标签形状：',confirm_train_label.shape,'\n',
 '测试集形状',confirm_test_Scaler.shape,'\n',
 '测试集标签形状',confirm_test_label.shape)
# 构建 SVM 模型，并预测测试集结果。
svm = SVC().fit(confirm_train_Scaler,confirm_train_label)
print('建立的 SVM 模型为：\n',svm)
# SVM 模型预测结果
confirm_target_pred = svm.predict(confirm_test_Scaler)
print('测试集的预测结果为：\n',confirm_target_pred)
print('SVM 模型分类报告：\n',classification_report(confirm_test_label,confirm_target_pred))