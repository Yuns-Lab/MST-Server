# 运行指南

此项目基于 Node.JS 开发，我们建议您使用 Docker 来运行本项目

---

1. 使用指令 Clone 本仓库：
```
git clone https://github.com/Yuns-Lab/MST-Server ./mst-server/
```

2. 进入项目文件夹
```
cd ./mst-server/
```

3. 构建 Docker Image

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;执行此指令前，确保你安装了 Docker

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果你还没有安装 Docker，请先安装

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果是在 Windows 系统下安装了 Docker Desktop，请确保它启动了
```
docker build -t mst-server .
```

4. 运行 Docker Container

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在 `[your_port]` 处填写你需要绑定该服务到的端口
```
docker run -p [your_port]:6001 -it mst-server
```

5. 运行

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你应当看到控制台输出了如下信息

```
Server is running, you can use your server ip + port (default 6001) tovisit this service
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用你的服务器 ip + 端口 6001（或者你配置的 Docker 映射端口）访问即可，你应当会看到 Welcome 字样
