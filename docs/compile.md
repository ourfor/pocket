## 手动编译、构建

后端使用`Gradle`作为依赖管理和构建的工具,在`server`目录下面👇, 执行
```bash
gradle clean package
```
或者
```bash
./gradlew clean package
```
即可执行构建任务, 构建完成后, 构建产物在`build/libs`目录下面

前端使用`Yarn`作为构建工具, 在`client`目录下面👇, 执行
```bash
yarn # 安装依赖, 执行一次即可
yarn build # 打包
```
在`dist`目录下面即为构建产物.