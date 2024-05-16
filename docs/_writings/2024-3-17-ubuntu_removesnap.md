---
title: Ubuntu 22.04 LTS 移除 Snap
date: 2024-3-17
tags: 
  - Ubuntu
  - IT技术
author: 小皮咖
location: 广州  
description: Ubuntu remove snap
---

之前安装 Ubunu 22.04 LTS 系统后，发现 firefox 打开就崩溃，查了下网上说了 snap 的缘故，删除即可恢复正常。步骤如下：

1. 打开终端，输入 snap list 查看已安装的软件。 

<!-- more -->

<tongji/>

![](/images/snap-01.png)

2. 停止 snapd 服务
```shell
sudo systemctl disable snapd.service
sudo systemctl disable snapd.socket
sudo systemctl disable snapd.seeded.service
```
3. 依次移除 snap 安装的软件
```shell
sudo snap remove firefox
sudo snap remove snap-store
sudo snap remove gtk-common-themes
sudo snap remove gnome-3-38-2004
sudo snap remove core18
sudo snap remove snapd-desktop-integration
```
4. 删除残留的 snap 缓存数据
```shell
sudo rm -rf /var/cache/snapd/
```
5. 完全清除 snapd 
```shell
sudo apt autoremove --purge snapd
```
6. 清除用户目录 snap 
```shell
rm -rf ~/snap
```
7. 重新用 apt 安装 firefox

在安装之前，防止 Ubuntu 自动用 snap 安装 firefox，先创建文件：
```shell
sudo nano /etc/apt/preferences.d/firefox-no-snap
```
输入下面配置并 ctrl + X 保存：
```shell
Package: firefox*
Pin: release o=Ubuntu*
Pin-Priority: -1
```
然后添加 apt 仓库：
```shell
sudo add-apt-repository ppa:mozillateam/ppa
```
最后再安装 firefox
```shell
sudo apt update
sudo apt install firefox
```
大功告成！！snap 版的 firefox 无法使用还是挺难受的，删除 snap 方法分享给大家，希望能够帮助到你😄

<comment/>