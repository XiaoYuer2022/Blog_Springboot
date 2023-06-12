import requests
import datetime
import time
import random
import signal
import os


# API 接口提供者：https://docs.tenapi.cn/random/acg.html


def handler(signum, frame):
    write_log('程序被Ctrl+C终止!')
    exit(0)


def count_file():
    try:
        # 以下代码是获取程序工作环境下的目录，不对
        # original_dir = os.getcwd()
        # print(f"ori_dir={original_dir}")
        # 切换到指定目录
        # os.chdir('images')
        # 使用 listdir() 方法列出所有文件
        # 统计文件数量
        # file_count = len(os.listdir())
        # 返回原工作目录
        # os.chdir(original_dir)

        # 以下代码是获取py文件所在目录
        original_dir = os.path.abspath(os.path.dirname(__file__))
        os.chdir(original_dir + '/images')
        file_count = len(os.listdir())
        os.chdir(original_dir)

        return file_count
    except FileNotFoundError as e:
        write_log(f'指定目录images不存在，图片文件数量统计失败！错误信息：{e}')
        return -1


# 日志写入函数 日志等级：日志信息和状态码
def write_log(message, log_ture=1, level="debug"):
    try:
        current_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
        if log_ture == 1:
            with open(this_file_locate_dir+"/log.txt", "a+") as f:
                f.write(f"[{level}] {current_time}：{message}\n")
                f.close()
        else:
            pass
    except FileNotFoundError as e:
        print(f'指定文件log.txt不存在，日志写入失败！错误信息：{e}')
        return -1


def get_image_post():
    '''
    发送请求示例：
    curl https://tenapi.cn/v2/acg -X POST -d 'format=json'
    '''

    '''
    返回格式如下：
    {
      "code": 200,
      "msg": "success",
      "data": {
        "width": 1920,
        "height": 1200,
        "url": "https://tvax1.sinaimg.cn/large/9bd9b167gy1g4lhi9v5wdj21hc0xcamc.jpg"
      }
    }
    '''

    # 向指定url发送POST请求，并获得响应
    url = 'https://tenapi.cn/v2/acg'
    # data = 'format=json'
    data = {
        'format': 'json'
    }
    try:
        write_log("[0] 正在发送POST请求")
        response = requests.post(url, data=data)  # 发送请求
        write_log("[1] 已成功发送")
        json_data = response.json()  # 解析返回的JSON字符串，获取图片链接
        if json_data.get('code') == 200:
            image_data = json_data.get('data')
            image_url = image_data.get('url')
            write_log(f"[2] 准备从'{image_url}'中下载图片...")
            # 下载图片
            # 获取当前工作目录的绝对路径
            current_dir = os.path.abspath(os.path.dirname(__file__))
            # 使用相对路径拼接文件夹名
            images_dir = os.path.join(current_dir, "images")
            # 创建一个名为 'images' 的子目录
            if not os.path.exists(images_dir):
                os.makedirs(images_dir)
            now = datetime.datetime.now()
            # filename = "images/image_" + now.strftime('%Y%m%d_%H%M%S') + ".jpg"
            # filename_2 = os.path.join(images_dir, "image_" + str(count_file()+1) + ".jpg")
            # 当文件数量统计的目录不存在时，count_file()就会返回-1
            image_file_count_num = count_file() + 1
            if image_file_count_num == 0:
                return -1
            filename_2 = images_dir + "/image_" + str(image_file_count_num) + ".jpg"
            response = requests.get(image_url)
            with open(filename_2, 'wb') as f:
                f.write(response.content)
                write_log(f"[3] 写入文件名：{filename_2} 完成！")
                return 0
        else:
            error_code = format(json_data.get('code'))
            write_log(f'接口返回错误！错误码：{error_code}')
            return -2

    except requests.exceptions.RequestException as e:
        write_log(f'与服务器连接出现问题，请检查网络！错误信息：{e}')
        return -1
    except FileNotFoundError as e:
        write_log(f'指定文件或目录创建失败，FileNotFoundError！错误信息：{e}')
        return -1


def hourlytask(times):
    try:
        count = 1
        while True:
            next_interval = 5 * random.randint(1, 59)  # 计算下一次触发的时间间隔，随机值大于0小于5*60，即1到5分钟之内
            # 执行定时任务
            time_str = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
            write_log(f'当前时间：{time_str}，正在运行第{count}次')
            if get_image_post() == 0:
                # 等待下一次触发的时间到来
                if count >= times:
                    break
                next_min = int(next_interval / 60)
                next_sec = next_interval - next_min * 60
                count = count + 1
                write_log(f'下一次触发将在 {next_min}分钟{next_sec}秒 后执行！')
                time.sleep(next_interval)

            else:
                write_log("[end] 接口访问异常，已终止访问")
                break
    except KeyboardInterrupt:
        write_log("[end] 程序被 KeyboardInterrupt 强行停止！")


if __name__ == '__main__':
    try:
        this_file_locate_dir = os.path.abspath(os.path.dirname(__file__))
        os.chdir(this_file_locate_dir)
        #print(f"当前目录：{this_file_locate_dir}")
        signal.signal(signal.SIGINT, handler)
        time_want = 10
        write_log(f"[start] 计划运行{time_want}次")
        hourlytask(time_want)  # 运行几次
        write_log(f"[end] 程序正常结束")
    except KeyboardInterrupt:
        write_log("[end] 程序被 KeyboardInterrupt 强行停止！")

'''
说明：
1、图片文件数量统计：需要目录数据
2、写日志，也需要目录数据
3、存放图片资源，也需要目录数据

解决办法：
main函数一进来就切换工作目录到：py文件所在位置
'''
