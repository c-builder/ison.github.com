# Git 使用教程 - 从入门到精通

## 目录
1. [Git 简介](#1-git-简介)
2. [安装与配置](#2-安装与配置)
3. [基础概念](#3-基础概念)
4. [基础操作](#4-基础操作)
5. [分支管理](#5-分支管理)
6. [远程仓库](#6-远程仓库)
7. [撤销与回退](#7-撤销与回退)
8. [标签管理](#8-标签管理)
9. [高级操作](#9-高级操作)
10. [协作开发](#10-协作开发)
11. [常见问题解决](#11-常见问题解决)
12. [最佳实践](#12-最佳实践)

---

## 1. Git 简介

### 1.1 什么是 Git？

Git 是一个分布式版本控制系统，用于跟踪文件的变化，协调多人协作开发，以及管理项目的不同版本。

### 1.2 核心优势

```
✅ 分布式版本控制，无需中央服务器
✅ 快速高效，大部分操作在本地完成
✅ 强大的分支管理能力
✅ 完整的历史记录
✅ 支持非线性开发（多个分支并行）
✅ 数据完整性保证
```

### 1.3 Git vs SVN

| 特性 | Git | SVN |
|------|-----|-----|
| 版本控制类型 | 分布式 | 集中式 |
| 网络依赖 | 不需要 | 需要 |
| 分支操作 | 快速 | 较慢 |
| 历史记录 | 完整 | 完整 |
| 学习曲线 | 较陡 | 较平缓 |

### 1.4 Git 工作流程

```
工作区 (Working Directory)
    ↓ git add
暂存区 (Staging Area / Index)
    ↓ git commit
本地仓库 (Local Repository)
    ↓ git push
远程仓库 (Remote Repository)
```

---

## 2. 安装与配置

### 2.1 安装 Git

#### Windows
1. 访问 [Git 官网](https://git-scm.com/download/win)
2. 下载安装程序
3. 运行安装程序，使用默认选项即可
4. 验证安装：`git --version`

#### macOS
```bash
# 使用 Homebrew
brew install git

# 或下载安装程序
# 访问 https://git-scm.com/download/mac
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

### 2.2 初始配置

#### 配置用户信息
```bash
# 设置用户名
git config --global user.name "你的名字"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

#### 常用配置选项
```bash
# 设置默认编辑器
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "vim"          # Vim

# 设置默认分支名
git config --global init.defaultBranch main

# 设置换行符处理（Windows）
git config --global core.autocrlf true

# 设置换行符处理（Linux/macOS）
git config --global core.autocrlf input

# 设置颜色输出
git config --global color.ui auto

# 设置别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

### 2.3 SSH 密钥配置

#### 生成 SSH 密钥
```bash
# 生成密钥对
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# 按提示操作，默认保存在 ~/.ssh/id_rsa
```

#### 添加 SSH 密钥到 GitHub/GitLab
```bash
# 复制公钥内容
cat ~/.ssh/id_rsa.pub

# 在 GitHub/GitLab 设置中添加 SSH 密钥
# GitHub: Settings -> SSH and GPG keys -> New SSH key
# GitLab: Preferences -> SSH Keys
```

#### 测试 SSH 连接
```bash
# GitHub
ssh -T git@github.com

# GitLab
ssh -T git@gitlab.com
```

---

## 3. 基础概念

### 3.1 三个区域

#### 工作区 (Working Directory)
- 当前项目目录
- 可以直接编辑文件
- 未跟踪的文件在工作区

#### 暂存区 (Staging Area / Index)
- 准备提交的文件存放区域
- 通过 `git add` 添加到暂存区
- 也称为索引区

#### 本地仓库 (Local Repository)
- `.git` 目录
- 存储所有版本历史
- 通过 `git commit` 提交到仓库

### 3.2 文件状态

```
未跟踪 (Untracked)
    ↓ git add
已暂存 (Staged)
    ↓ git commit
已提交 (Committed)
    ↓ 修改文件
已修改 (Modified)
    ↓ git add
已暂存 (Staged)
```

### 3.3 提交 (Commit)

- 提交是项目在某个时间点的快照
- 每个提交都有唯一的 SHA-1 哈希值
- 提交包含：作者、时间、提交信息、文件变更

### 3.4 分支 (Branch)

- 分支是提交的指针
- 默认分支通常是 `main` 或 `master`
- 可以创建多个分支并行开发

### 3.5 远程仓库 (Remote)

- 托管在服务器上的 Git 仓库
- 常见平台：GitHub、GitLab、Gitee、Bitbucket
- 用于团队协作和备份

---

## 4. 基础操作

### 4.1 初始化仓库

```bash
# 在当前目录初始化
git init

# 初始化并指定默认分支名
git init -b main

# 克隆远程仓库
git clone https://github.com/user/repo.git

# 克隆并指定本地目录名
git clone https://github.com/user/repo.git my-project

# 克隆指定分支
git clone -b develop https://github.com/user/repo.git
```

### 4.2 查看状态

```bash
# 查看工作区状态
git status

# 简短格式
git status -s
git status --short

# 查看文件变更
git diff

# 查看已暂存的变更
git diff --staged
git diff --cached

# 查看特定文件的变更
git diff filename
```

### 4.3 添加文件

```bash
# 添加单个文件
git add filename

# 添加多个文件
git add file1 file2 file3

# 添加所有文件
git add .

# 添加所有匹配模式的文件
git add *.js
git add src/

# 交互式添加
git add -i
git add -p  # 部分暂存
```

### 4.4 提交更改

```bash
# 提交暂存区的文件
git commit -m "提交信息"

# 提交并跳过暂存区（仅限已跟踪文件）
git commit -am "提交信息"

# 修改最后一次提交
git commit --amend

# 修改最后一次提交信息
git commit --amend -m "新的提交信息"

# 提交时添加详细说明
git commit -m "简短说明" -m "详细说明"
```

### 4.5 查看历史

```bash
# 查看提交历史
git log

# 单行显示
git log --oneline

# 图形化显示分支
git log --graph --oneline --all

# 显示文件变更统计
git log --stat

# 显示具体变更内容
git log -p

# 限制显示数量
git log -5

# 按作者筛选
git log --author="名字"

# 按时间筛选
git log --since="2023-01-01"
git log --until="2023-12-31"

# 搜索提交信息
git log --grep="关键词"
```

### 4.6 查看文件内容

```bash
# 查看文件内容
git show HEAD:filename

# 查看特定提交的文件
git show commit-hash:filename

# 查看文件历史
git log --follow filename

# 查看文件的变更历史
git log -p filename
```

---

## 5. 分支管理

### 5.1 创建和切换分支

```bash
# 查看所有分支
git branch

# 查看所有分支（包括远程）
git branch -a

# 创建新分支
git branch branch-name

# 创建并切换到新分支
git checkout -b branch-name
git switch -c branch-name  # Git 2.23+

# 切换到分支
git checkout branch-name
git switch branch-name  # Git 2.23+

# 切换到上一个分支
git checkout -
```

### 5.2 分支操作

```bash
# 重命名分支
git branch -m old-name new-name

# 删除本地分支
git branch -d branch-name

# 强制删除分支
git branch -D branch-name

# 删除远程分支
git push origin --delete branch-name
git push origin :branch-name
```

### 5.3 合并分支

```bash
# 合并分支到当前分支
git merge branch-name

# 合并时创建合并提交
git merge --no-ff branch-name

# 合并时只允许快进
git merge --ff-only branch-name

# 合并时压缩提交
git merge --squash branch-name
```

### 5.4 变基 (Rebase)

```bash
# 将当前分支变基到目标分支
git rebase target-branch

# 交互式变基
git rebase -i HEAD~3

# 继续变基（解决冲突后）
git rebase --continue

# 中止变基
git rebase --abort

# 跳过当前提交
git rebase --skip
```

### 5.5 分支策略

#### Git Flow
```
main/master     - 主分支，生产环境
develop         - 开发分支
feature/*       - 功能分支
release/*       - 发布分支
hotfix/*        - 热修复分支
```

#### GitHub Flow
```
main            - 主分支
feature/*       - 功能分支
```

---

## 6. 远程仓库

### 6.1 远程仓库操作

```bash
# 查看远程仓库
git remote

# 查看远程仓库详细信息
git remote -v

# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 添加远程仓库（SSH）
git remote add origin git@github.com:user/repo.git

# 修改远程仓库地址
git remote set-url origin new-url

# 删除远程仓库
git remote remove origin

# 重命名远程仓库
git remote rename old-name new-name
```

### 6.2 推送和拉取

```bash
# 推送到远程仓库
git push origin branch-name

# 首次推送并设置上游
git push -u origin branch-name

# 推送所有分支
git push --all origin

# 推送标签
git push --tags origin

# 强制推送（谨慎使用）
git push --force origin branch-name

# 从远程拉取
git pull origin branch-name

# 拉取但不合并
git fetch origin

# 拉取所有远程分支
git fetch --all
```

### 6.3 跟踪远程分支

```bash
# 查看跟踪关系
git branch -vv

# 设置跟踪远程分支
git branch --set-upstream-to=origin/branch-name branch-name

# 创建并跟踪远程分支
git checkout -b local-branch origin/remote-branch
git checkout --track origin/remote-branch
```

---

## 7. 撤销与回退

### 7.1 撤销工作区更改

```bash
# 撤销工作区的修改（危险操作）
git checkout -- filename
git restore filename  # Git 2.23+

# 撤销所有工作区修改
git checkout -- .
git restore .  # Git 2.23+
```

### 7.2 撤销暂存区更改

```bash
# 取消暂存
git reset HEAD filename
git restore --staged filename  # Git 2.23+

# 取消所有暂存
git reset HEAD .
git restore --staged .  # Git 2.23+
```

### 7.3 回退提交

```bash
# 软回退（保留工作区和暂存区）
git reset --soft HEAD~1

# 混合回退（保留工作区，清空暂存区）
git reset --mixed HEAD~1
git reset HEAD~1  # 默认是 mixed

# 硬回退（清空工作区和暂存区，危险）
git reset --hard HEAD~1

# 回退到指定提交
git reset --hard commit-hash
```

### 7.4 恢复文件

```bash
# 从暂存区恢复文件
git restore --staged filename

# 从提交恢复文件
git restore --source=HEAD filename

# 从特定提交恢复文件
git restore --source=commit-hash filename
```

### 7.5 撤销提交但保留更改

```bash
# 撤销最后一次提交，保留更改
git reset --soft HEAD~1

# 修改最后一次提交
git commit --amend
```

---

## 8. 标签管理

### 8.1 创建标签

```bash
# 创建轻量标签
git tag v1.0.0

# 创建附注标签
git tag -a v1.0.0 -m "版本 1.0.0"

# 在指定提交创建标签
git tag -a v1.0.0 commit-hash -m "版本 1.0.0"

# 创建带签名的标签
git tag -s v1.0.0 -m "签名标签"
```

### 8.2 查看标签

```bash
# 查看所有标签
git tag

# 查看标签信息
git show v1.0.0

# 按模式查找标签
git tag -l "v1.*"
```

### 8.3 删除标签

```bash
# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete v1.0.0
git push origin :refs/tags/v1.0.0
```

### 8.4 推送标签

```bash
# 推送单个标签
git push origin v1.0.0

# 推送所有标签
git push --tags origin
```

---

## 9. 高级操作

### 9.1 暂存更改 (Stash)

```bash
# 暂存当前更改
git stash

# 暂存并添加说明
git stash save "说明信息"

# 查看暂存列表
git stash list

# 应用最近的暂存
git stash apply

# 应用指定暂存
git stash apply stash@{0}

# 应用并删除暂存
git stash pop

# 删除暂存
git stash drop stash@{0}

# 清空所有暂存
git stash clear

# 暂存未跟踪的文件
git stash -u
git stash --include-untracked
```

### 9.2 清理文件

```bash
# 删除未跟踪的文件
git clean -f

# 删除未跟踪的文件和目录
git clean -fd

# 预览将要删除的文件
git clean -n

# 交互式清理
git clean -i
```

### 9.3 查找问题

```bash
# 查找引入 bug 的提交
git bisect start
git bisect bad
git bisect good commit-hash
git bisect reset

# 查找文件中的内容
git grep "关键词"

# 查找特定提交范围
git log -S "关键词" --source --all
```

### 9.4 子模块 (Submodule)

```bash
# 添加子模块
git submodule add https://github.com/user/repo.git path/to/submodule

# 初始化子模块
git submodule init

# 更新子模块
git submodule update

# 克隆包含子模块的项目
git clone --recursive https://github.com/user/repo.git
```

### 9.5 重写历史

```bash
# 交互式变基（修改历史）
git rebase -i HEAD~3

# 修改提交信息
# 在交互式变基中将 pick 改为 reword

# 合并提交
# 在交互式变基中将 pick 改为 squash

# 删除提交
# 在交互式变基中删除对应行
```

---

## 10. 协作开发

### 10.1 Fork 工作流

```
1. Fork 远程仓库
2. 克隆 Fork 的仓库到本地
3. 创建功能分支
4. 开发并提交
5. 推送到 Fork 的仓库
6. 创建 Pull Request
```

### 10.2 处理冲突

```bash
# 合并时出现冲突
git merge branch-name

# 查看冲突文件
git status

# 手动解决冲突后
git add resolved-file
git commit

# 使用工具解决冲突
git mergetool
```

### 10.3 Pull Request / Merge Request

#### 创建 PR/MR
1. 推送功能分支到远程
2. 在 GitHub/GitLab 创建 Pull Request
3. 填写描述和相关信息
4. 等待代码审查

#### 审查和合并
- 代码审查者可以评论和建议
- 通过审查后可以合并
- 可以选择不同的合并策略

### 10.4 代码审查

```bash
# 查看其他人的提交
git log --author="作者名"

# 查看特定作者的更改
git log --author="作者名" --oneline

# 查看文件变更统计
git diff --stat branch1..branch2
```

---

## 11. 常见问题解决

### 11.1 提交到错误分支

```bash
# 方法1：使用 cherry-pick
git log  # 找到提交的 hash
git checkout correct-branch
git cherry-pick commit-hash
git checkout wrong-branch
git reset --hard HEAD~1

# 方法2：创建新分支
git branch correct-branch
git reset --hard HEAD~1
git checkout correct-branch
```

### 11.2 误删文件

```bash
# 从最后一次提交恢复
git checkout HEAD -- filename

# 从特定提交恢复
git checkout commit-hash -- filename
```

### 11.3 提交信息错误

```bash
# 修改最后一次提交信息
git commit --amend -m "正确的提交信息"

# 修改历史提交信息（需要变基）
git rebase -i HEAD~3
# 将 pick 改为 reword
```

### 11.4 大文件问题

```bash
# 从历史中移除大文件
git filter-branch --tree-filter 'rm -f large-file' HEAD

# 使用 git-filter-repo（推荐）
git filter-repo --path large-file --invert-paths
```

### 11.5 合并冲突解决

```bash
# 查看冲突
git status

# 使用合并工具
git mergetool

# 手动解决后
git add resolved-files
git commit
```

### 11.6 撤销已推送的提交

```bash
# 创建新提交撤销更改
git revert commit-hash

# 强制推送（团队协作时谨慎使用）
git reset --hard HEAD~1
git push --force origin branch-name
```

---

## 12. 最佳实践

### 12.1 提交规范

#### 提交信息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 类型 (type)
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

#### 示例
```bash
git commit -m "feat(user): 添加用户登录功能"
git commit -m "fix(auth): 修复登录 token 过期问题"
git commit -m "docs: 更新 API 文档"
```

### 12.2 分支命名规范

```
feature/功能名称      # 功能分支
bugfix/问题描述      # Bug 修复分支
hotfix/紧急修复      # 热修复分支
release/版本号       # 发布分支
```

### 12.3 工作流程建议

1. **频繁提交**：小步快跑，频繁提交
2. **清晰的提交信息**：描述做了什么，为什么做
3. **保持分支整洁**：及时删除已合并的分支
4. **定期同步**：经常拉取远程更新
5. **代码审查**：提交 PR 前自我审查

### 12.4 .gitignore 配置

```gitignore
# 依赖
node_modules/
vendor/

# 构建输出
dist/
build/
*.log

# 环境变量
.env
.env.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# 操作系统
.DS_Store
Thumbs.db

# 临时文件
*.tmp
*.temp
```

### 12.5 常用别名配置

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### 12.6 安全建议

1. **不要提交敏感信息**：密码、密钥、API Key
2. **使用 .gitignore**：忽略不需要版本控制的文件
3. **谨慎使用 force push**：避免覆盖他人工作
4. **定期备份**：重要项目要有备份
5. **使用 SSH 密钥**：比 HTTPS 更安全

---

## 附录：常用命令速查表

### 基础命令
```bash
git init                    # 初始化仓库
git clone <url>             # 克隆仓库
git status                  # 查看状态
git add <file>              # 添加文件
git commit -m "msg"         # 提交
git log                     # 查看历史
git diff                    # 查看差异
```

### 分支命令
```bash
git branch                  # 查看分支
git branch <name>           # 创建分支
git checkout <name>         # 切换分支
git merge <name>            # 合并分支
git rebase <name>           # 变基
```

### 远程命令
```bash
git remote -v               # 查看远程
git remote add <name> <url> # 添加远程
git push <remote> <branch> # 推送
git pull <remote> <branch>  # 拉取
git fetch <remote>          # 获取
```

### 撤销命令
```bash
git restore <file>          # 撤销工作区
git restore --staged <file> # 取消暂存
git reset HEAD~1            # 回退提交
git revert <commit>         # 撤销提交
```

### 其他命令
```bash
git stash                   # 暂存更改
git tag <name>              # 创建标签
git clean -fd               # 清理文件
git cherry-pick <commit>    # 选择提交
```

---

## 总结

Git 是一个强大的版本控制系统，掌握 Git 对于开发者来说至关重要。通过本教程，你应该能够：

- ✅ 理解 Git 的基本概念和工作原理
- ✅ 掌握常用的 Git 命令
- ✅ 能够进行分支管理和合并
- ✅ 能够与团队协作开发
- ✅ 解决常见的 Git 问题
- ✅ 遵循最佳实践

### 学习资源

- [Git 官方文档](https://git-scm.com/doc)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)
- [GitHub 学习资源](https://github.com/git/git)
- [GitLab 文档](https://docs.gitlab.com/)

### 实践建议

1. **多练习**：在实际项目中多使用 Git
2. **阅读文档**：遇到问题查阅官方文档
3. **使用图形工具**：如 SourceTree、GitKraken 辅助理解
4. **参与开源**：通过贡献开源项目提升技能

---

**祝你使用 Git 愉快！** 🎉

