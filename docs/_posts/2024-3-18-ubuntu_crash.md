---
title: Ubuntu 上安装 clash for window
date: 2024-3-18
tags: 
  - Ubuntu
  - IT技术
author: 小皮咖
location: 广州  
---

## 下载与安装

首先下载 [Clash For Windows](https://github.com/Fndroid/clash_for_windows_pkg/releases/download/0.20.30)，[备份地址点击👉这里](https://github.com/lantongxue/clash_for_windows_pkg/releases/tag/0.20.39), [👉还有这里](https://archive.org/download/clash_for_windows_pkg)

在其中找到需要的版本，然后下载即可，如果国内下载较慢的话，可以使用大佬提供的代理，使用方式是在下载链接的前面加上 `https://ghproxy.com/` 即可，例如一个下载链接为 :

(以当前最新版本为例子：0.20.30)

`https://github.com/Fndroid/clash_for_windows_pkg/releases/download/0.20.30/Clash.for.Windows-0.20.30-x64-linux.tar.gz`


<!-- more -->

<tongji/>

**则代理后的链接为 ：**

`https://ghproxy.com/https://github.com/Fndroid/clash_for_windows_pkg/releases/download/0.20.30/Clash.for.Windows-0.20.30-x64-linux.tar.gz`

下载后应该是名为 `Clash.for.Windows-0.20.30-x64-linux.tar.gz` 的文件，然后解压：

```shell
tar -zxvf Clash.for.Windows-0.20.30-x64-linux.tar.gz # 这里是对应压缩包的名字
```

解压后会出现对应的文件夹，文件夹中会有一个名为 cfw 的文件，按理说现在在文件中直接打开终端，然后运行`./cfw` 就会直接打开 Clash For Windows 了，与 Windows 版本基本平常无差。


一般我会将应用下载在 `/home/你的用户名/.app` 文件夹下面，下面以此为例 :

将解压后的压缩包 `Clash.for.Windows-0.20.30-x64-linux` 重命名为 `clash` 并移动到 `/home/你的用户名/.app` 下面，这一步自行操作

链接一个启动项来方便配置
```shell
mkdir -p ~/.local/bin
```
```shell
ln -s /home/你的用户名/.app/clash/cfw /home/你的用户名/.local/bin/cfw 
```
简单解释一下，这里首先创建了本地的一个 bin 目录，然后软链接了我们解压出的 cfw 到对应路径下，注意不要直接 cp 过去，这样会找不到动态库。

*Ps：Ubuntu 的策略貌似是如果不存在 `~/.local/bin` 目录那么是不会添加到环境变量的，但是如果有了，重启就会自动添加。因此现在可能没法在终端直接输入 cfw 来启动 Clash，重启才行，不过没事，对下述过程没影响。*

重启后打开终端输入 cfw 则可快速启动 clash !

## 配置快速启动图标

每次在终端打开当然是有点烦的，因此最好可以直接在快速启动栏找到，像下面这样：

![小猫图标就是 clash](/images/crash-01.png)


首先下载 clash logo，目前压缩包里是没有logo 的，[下载地址](https://pan.quark.cn/s/dc9e2ef5b8b0)

下载完成后将图片保存到 `/home/你的名字/.app/clash` 文件夹下，命名 logo.png
```shell
sudo vim ~/.local/share/applications/clash.desktop # 编辑一个文件
```
**写入如下内容**
```
[Desktop Entry]
Name=Clash Fow Windows
Exec=/home/suporka/.local/bin/cfw
Icon=/home/suporka/.app/clash/logo.png
Type=Application
StartupNotify=true
```
**然后添加可执行权限：**
```shell
sudo chmod +x ~/.local/share/applications/clash.desktop
```
这里也是在 .local 文件夹下操作的，这样只会影响到当前环境，当然你也可以在 `/usr/share/applications` 路径下创建。

## 打开系统代理

linux 版本里是没有一键开启系统代理的，需要自己配置，window 和 mac 是有 System Proxy 这一选项的

![](/images/crash-02.png)

在ubuntu中打开设置，找到网络，点击网络代理

![](/images/crash-03.png)

点击手动配置，按照图中配置即可，默认的端口是 7890

![](/images/crash-04.png)

这样 clash for window 就能正常使用啦!O(∩_∩)O

<comment/>